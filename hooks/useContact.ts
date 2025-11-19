"use client"

import { useCallback, useState } from 'react'
import { contactService, ContactFormData } from '@/lib/services/contactService'

export type { ContactFormData }

export type ContactStatus = 'idle' | 'ok' | 'error'

export function useContact() {
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState<ContactStatus>('idle')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const reset = useCallback(() => {
    setSending(false)
    setStatus('idle')
    setErrorMsg(null)
  }, [])

  const sendContact = useCallback(async (data: ContactFormData) => {
    try {
      setSending(true)
      setStatus('idle')
      setErrorMsg(null)

      await contactService.sendContact(data)

      setStatus('ok')
      return { ok: true }
    } catch (err) {
      setStatus('error')
      const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue'
      setErrorMsg(errorMessage)
      return { ok: false, error: errorMessage }
    } finally {
      setSending(false)
    }
  }, [])

  return { sending, status, errorMsg, sendContact, reset }
}


