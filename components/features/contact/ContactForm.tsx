"use client"

import { SectionTitle } from '@/components/ui/text/SectionTitle'
import { Button } from '@/components/ui/button/button'
import { useContact } from '@/hooks/useContact'
import { useTranslations } from 'next-intl'

type ContactFormProps = {
  title?: string
  label?: string
  text?: string
  onSubmit?: (form: { lastName: string; firstName: string; email: string; message: string }) => void
}

const ContactForm = ({
  title,
  label,
  text,
  onSubmit,
}: ContactFormProps) => {
  const t = useTranslations('contact')
  const { sending, status, errorMsg, sendContact } = useContact()
  
  // Utiliser les traductions si les props ne sont pas fournies
  const formTitle = title || t('title')
  const formLabel = label || t('subtitle')
  const formText = text || t('description')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const formData = new FormData(formEl)
    const payload = {
      lastName: String(formData.get('lastName') || ''),
      firstName: String(formData.get('firstName') || ''),
      email: String(formData.get('email') || ''),
      message: String(formData.get('message') || ''),
    }

    if (onSubmit) {
      onSubmit(payload)
      return
    }

    const res = await sendContact(payload)
    if (res.ok) formEl.reset()
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-14 pb-24 flex flex-col gap-12">
      <SectionTitle label={formLabel} title={formTitle} text={formText} darkMode={true} />

      {status === 'ok' ? (
        <div className="max-w-3xl mx-auto w-full rounded-xl border border-green-500/50 bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-3">
          {t('success')}
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="max-w-3xl mx-auto w-full rounded-xl border border-red-500/50 bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-3">
          {errorMsg || t('error')}
        </div>
      ) : null}

      <form className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm text-white">{t('lastName')}</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            required 
            placeholder={t('lastNamePlaceholder')} 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm text-white">{t('firstName')}</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            required 
            placeholder={t('firstNamePlaceholder')} 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="email" className="text-sm text-white">{t('email')}</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder={t('emailPlaceholder')} 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="message" className="text-sm text-white">{t('message')}</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder={t('messagePlaceholder')} 
            rows={6} 
            className="rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 p-4 outline-none focus:border-[#003CF0] transition-colors resize-none" 
          />
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button 
            type="submit"
            disabled={sending}
            className="w-fit bg-[#003CF0] hover:bg-[#0034D0] text-white px-8 py-6 rounded-full font-semibold text-base hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {sending ? t('sending') : t('send')}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ContactForm

