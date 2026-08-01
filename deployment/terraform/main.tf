# =============================================================================
# FUND FIT AI - ENTERPRISE TERRAFORM INFRASTRUCTURE-AS-CODE (AWS)
# EKS Kubernetes Cluster, RDS PostgreSQL Multi-AZ, ElastiCache Redis & S3
# =============================================================================

terraform {
  required_version = ">= 1.7.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.40"
    }
  }
  backend "s3" {
    bucket         = "fundfit-terraform-state-prod"
    key            = "global/s3/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "fundfit-terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region
}

variable "aws_region" {
  default = "ap-south-1"
}

# 1. VPC & Networking Subnets
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.5.0"

  name = "fundfit-vpc-prod"
  cidr = "10.0.0.0/16"

  azs             = ["ap-south-1a", "ap-south-1b", "ap-south-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway   = true
  single_nat_gateway   = false
  enable_dns_hostnames = true

  tags = {
    Environment = "production"
    Project     = "FUND FIT AI"
  }
}

# 2. Amazon EKS Kubernetes Cluster
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "20.8.4"

  cluster_name    = "fundfit-eks-prod"
  cluster_version = "1.29"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
  cluster_endpoint_public_access = true

  eks_managed_node_groups = {
    general = {
      min_size     = 3
      max_size     = 20
      desired_size = 5

      instance_types = ["t3.xlarge"]
      capacity_type  = "ON_DEMAND"
    }
  }
}

# 3. Amazon RDS PostgreSQL 16 Multi-AZ Database
resource "aws_db_instance" "postgresql" {
  identifier           = "fundfit-rds-postgres-prod"
  engine               = "postgres"
  engine_version       = "16.1"
  instance_class       = "db.r6g.xlarge"
  allocated_storage    = 100
  max_allocated_storage = 1000
  multi_az             = true
  db_name              = "fundfit_db"
  username             = "fundfit_user"
  password             = "secure_production_password_2026"
  db_subnet_group_name = module.vpc.database_subnet_group_name
  skip_final_snapshot  = false
  deletion_protection  = true
}

# 4. Amazon ElastiCache Redis Cluster
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "fundfit-redis-prod"
  engine               = "redis"
  node_type            = "cache.r6g.large"
  num_cache_nodes      = 2
  parameter_group_name = "default.redis7"
  port                 = 6379
}

# 5. Amazon S3 Storage Bucket for Reports & Financial Documents
resource "aws_s3_bucket" "documents" {
  bucket = "fundfit-ai-documents-prod"
}

resource "aws_s3_bucket_server_side_encryption_configuration" "documents_crypto" {
  bucket = aws_s3_bucket.documents.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}
