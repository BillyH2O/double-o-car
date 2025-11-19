import { SectionTitle } from '@/components/ui/text/SectionTitle'
import { Button } from '@/components/ui/button/button'
import { useContact } from '@/hooks/useContact'

type ContactFormProps = {
  title?: string
  label?: string
  text?: string
  onSubmit?: (form: { lastName: string; firstName: string; email: string; message: string }) => void
}

const ContactForm = ({
  title = 'FORMULAIRE DE CONTACT',
  label = 'Formulaire',
  text = "Contactez-nous via notre formulaire si vous avez des questions, ou demande spécifique",
  onSubmit,
}: ContactFormProps) => {
  const { sending, status, errorMsg, sendContact } = useContact()

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
      <SectionTitle label={label} title={title} text={text} darkMode={true} />

      {status === 'ok' ? (
        <div className="max-w-3xl mx-auto w-full rounded-xl border border-green-500/50 bg-green-500/20 backdrop-blur-sm text-green-300 px-4 py-3">
          Votre message a bien été envoyé. Merci, nous vous répondrons rapidement.
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="max-w-3xl mx-auto w-full rounded-xl border border-red-500/50 bg-red-500/20 backdrop-blur-sm text-red-300 px-4 py-3">
          {errorMsg}
        </div>
      ) : null}

      <form className="w-full max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm text-white">Nom</label>
          <input 
            id="lastName" 
            name="lastName" 
            type="text" 
            required 
            placeholder="Votre nom" 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm text-white">Prénom</label>
          <input 
            id="firstName" 
            name="firstName" 
            type="text" 
            required 
            placeholder="Votre prénom" 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="email" className="text-sm text-white">Email</label>
          <input 
            id="email" 
            name="email" 
            type="email" 
            required 
            placeholder="votre@email.com" 
            className="h-11 rounded-xl border-2 border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder:text-white/60 px-4 outline-none focus:border-[#003CF0] transition-colors" 
          />
        </div>
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="message" className="text-sm text-white">Message</label>
          <textarea 
            id="message" 
            name="message" 
            required 
            placeholder="Votre message" 
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
            {sending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </div>
      </form>
    </section>
  )
}

export default ContactForm

