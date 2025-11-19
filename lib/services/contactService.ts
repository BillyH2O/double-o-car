export interface ContactFormData {
  lastName: string
  firstName: string
  email: string
  message: string
  phone?: string
  subject?: string
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

class ContactService {
  async sendContact(data: ContactFormData): Promise<void> {
    const payload: ContactPayload = {
      name: `${data.firstName} ${data.lastName}`.trim(),
      email: data.email,
      phone: data.phone,
      subject: data.subject || 'Contact site',
      message: data.message,
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(text || 'Erreur lors de l\'envoi du message')
    }
  }
}

export const contactService = new ContactService()

