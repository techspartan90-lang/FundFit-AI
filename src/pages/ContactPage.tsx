import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SpecularButton from '../components/SpecularButton';
import { useAppStore } from '../store/useAppStore';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Please enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const { addToast } = useAppStore();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = (data: ContactFormValues) => {
    addToast('success', 'Thank you! Our institutional sales team will reach out within 2 hours.');
    reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl sm:text-5xl font-black text-white">Contact Institutional Sales & Support</h1>
        <p className="text-slate-400 text-sm">Have questions about API limits, custom risk factor models, or SOC-2 security?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Info Col */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white">Global Headquarters</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>500 Financial Center Blvd, Suite 1400, New York, NY 10005</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>institutional@fundfit.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>+1 (800) 555-FUND-FIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Col */}
        <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                {errors.name && <span className="text-[11px] text-rose-400 mt-1 block">{errors.name.message}</span>}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Work Email</label>
                <input
                  type="email"
                  {...register('email')}
                  placeholder="sarah@firm.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
                />
                {errors.email && <span className="text-[11px] text-rose-400 mt-1 block">{errors.email.message}</span>}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Subject</label>
              <input
                type="text"
                {...register('subject')}
                placeholder="Enterprise API & Custom Data Integration"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none"
              />
              {errors.subject && <span className="text-[11px] text-rose-400 mt-1 block">{errors.subject.message}</span>}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Message</label>
              <textarea
                rows={4}
                {...register('message')}
                placeholder="Details about your current portfolio tracking stack and expected user scale..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none resize-none"
              />
              {errors.message && <span className="text-[11px] text-rose-400 mt-1 block">{errors.message.message}</span>}
            </div>

            <SpecularButton
              type="submit"
              size="md"
              radius={12}
              tint="#10b981"
              tintOpacity={0.25}
              disabled={isSubmitting}
              className="w-full justify-center"
            >
              <span>{isSubmitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
              <Send className="w-4 h-4" />
            </SpecularButton>
          </form>
        </div>

      </div>
    </div>
  );
};
