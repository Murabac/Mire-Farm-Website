'use client';

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getLocalizedContactInfo } from '@/lib/contact-helpers';
import { ContactInfo, LocalizedContactInfo } from '@/types/contact';

interface ContactSectionProps {
  contactInfoData: ContactInfo | null;
}

// Static text translations (language-switchable, not in database)
const staticText = {
  en: {
    title: "Let's Connect!",
    description: 'Get in touch with us for inquiries, orders, or partnership opportunities.',
    locationLabel: '📍 Location',
    phoneLabel: '📞 Phone',
    emailLabel: '✉️ Email',
    hoursLabel: '⏰ Hours',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    formEmailLabel: 'Email',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'Message',
    messagePlaceholder: 'Your message...',
    submitButton: 'Send Message',
    submitting: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send message. Please try again.',
  },
  so: {
    title: 'Nala Soo Xidhiidh!',
    description: 'Nala soo xidhiidh su\'aalo, dalabyo, ama fursado iskaashiga ah.',
    locationLabel: '📍 Goobta',
    phoneLabel: '📞 Taleefanka',
    emailLabel: '✉️ Emailka',
    hoursLabel: '⏰ Saacadaha',
    nameLabel: 'Magaca',
    namePlaceholder: 'Magacaaga',
    formEmailLabel: 'Emailka',
    emailPlaceholder: 'emailkaaga@example.com',
    messageLabel: 'Fariinta',
    messagePlaceholder: 'Fariintaada...',
    submitButton: 'Dir Fariinta',
    submitting: 'Waa la dirinayaa...',
    success: 'Fariinta waa la diray!',
    error: 'Fariinta ma dirayn. Fadlan mar kale isku day.',
  },
  ar: {
    title: 'دعنا نتصل!',
    description: 'تواصل معنا للاستفسارات أو الطلبات أو فرص الشراكة.',
    locationLabel: '📍 الموقع',
    phoneLabel: '📞 الهاتف',
    emailLabel: '✉️ البريد الإلكتروني',
    hoursLabel: '⏰ ساعات العمل',
    nameLabel: 'الاسم',
    namePlaceholder: 'اسمك',
    formEmailLabel: 'البريد الإلكتروني',
    emailPlaceholder: 'your@email.com',
    messageLabel: 'الرسالة',
    messagePlaceholder: 'رسالتك...',
    submitButton: 'إرسال الرسالة',
    submitting: 'جاري الإرسال...',
    success: 'تم إرسال الرسالة بنجاح!',
    error: 'فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.',
  },
};

// Fallback contact info
const fallbackContactInfo: LocalizedContactInfo = {
  id: 1,
  location: 'Arabsiyo Village, Gabiley Region, Somaliland',
  phone: '+252 63 4222 609',
  email: 'info@mirefarms.com',
  hours: 'Saturday - Thursday: 7:00 AM - 5:00 PM\nFriday: Closed',
};

export default function ContactSection({ contactInfoData }: ContactSectionProps) {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  const text = staticText[language] || staticText.en;

  // Get localized contact info
  const localizedContactInfo: LocalizedContactInfo = contactInfoData
    ? getLocalizedContactInfo(contactInfoData, language)
    : fallbackContactInfo;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form
        if (formRef.current) {
          formRef.current.reset();
        }
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
        // Clear error message after 5 seconds
        setTimeout(() => setSubmitStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-[#2C5F2D] via-[#3d7a3e] to-[#6B9E3E] text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl mb-4">{text.title}</h2>
          <p className="text-xl">
            {text.description}
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl mb-3">{text.locationLabel}</h3>
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {localizedContactInfo.location}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl mb-3">{text.phoneLabel}</h3>
              <p className="text-lg">{localizedContactInfo.phone}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl mb-3">{text.emailLabel}</h3>
              <p className="text-lg">{localizedContactInfo.email}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl mb-3">{text.hoursLabel}</h3>
              <p className="text-lg leading-relaxed whitespace-pre-line">
                {localizedContactInfo.hours}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-gray-700 mb-2 text-lg">{text.nameLabel}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#6B9E3E] text-gray-900 text-lg"
                  placeholder={text.namePlaceholder}
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700 mb-2 text-lg">{text.formEmailLabel}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#6B9E3E] text-gray-900 text-lg"
                  placeholder={text.emailPlaceholder}
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-700 mb-2 text-lg">{text.messageLabel}</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-[#6B9E3E] text-gray-900 text-lg"
                  placeholder={text.messagePlaceholder}
                  required
                ></textarea>
              </div>
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-xl">
                  {text.success}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
                  {text.error}
                </div>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#6B9E3E] text-white px-8 py-4 rounded-xl hover:bg-[#5a8433] transition-all transform hover:scale-105 shadow-lg text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isSubmitting ? text.submitting : text.submitButton}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

