import { useState } from "react"

interface AddAvailabilityModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { startDate: string; endDate: string; reason?: string; isFormalBooking?: boolean }) => Promise<void>
}

export function AddAvailabilityModal({ isOpen, onClose, onSubmit }: AddAvailabilityModalProps) {
  const [newPeriod, setNewPeriod] = useState({
    startDate: '',
    endDate: '',
    reason: '',
    isFormalBooking: false, // false = véhicule inactif, true = réservation présentielle
  })
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!newPeriod.startDate || !newPeriod.endDate) {
      alert('Veuillez remplir les dates')
      return
    }

    try {
      setSubmitting(true)
      await onSubmit({
        startDate: newPeriod.startDate,
        endDate: newPeriod.endDate,
        reason: newPeriod.reason || undefined,
        isFormalBooking: newPeriod.isFormalBooking,
      })
      setNewPeriod({ startDate: '', endDate: '', reason: '', isFormalBooking: false })
      onClose()
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la création de la période'
      alert(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  const handleClose = () => {
    setNewPeriod({ startDate: '', endDate: '', reason: '', isFormalBooking: false })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-black/20 rounded-2xl p-6 max-w-md w-full mx-4">
        <h3 className="text-white text-xl font-montserrat font-semibold mb-4">
          Ajouter une période d&apos;indisponibilité
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-white font-montserrat font-semibold mb-2 text-sm">
              Date de début *
            </label>
            <input
              type="date"
              required
              value={newPeriod.startDate}
              onChange={(e) => setNewPeriod({ ...newPeriod, startDate: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-white font-montserrat font-semibold mb-2 text-sm">
              Date de fin *
            </label>
            <input
              type="date"
              required
              value={newPeriod.endDate}
              onChange={(e) => setNewPeriod({ ...newPeriod, endDate: e.target.value })}
              min={newPeriod.startDate}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-white font-montserrat font-semibold mb-2 text-sm">
              Type d&apos;indisponibilité *
            </label>
            <select
              value={newPeriod.isFormalBooking ? 'formal' : 'unavailable'}
              onChange={(e) => setNewPeriod({ ...newPeriod, isFormalBooking: e.target.value === 'formal' })}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 [&>option]:bg-[#001141] [&>option]:text-white"
            >
              <option value="unavailable" className="bg-[#001141] text-white">
                Réservation formelle (véhicule inactif)
              </option>
              <option value="formal" className="bg-[#001141] text-white">
                Réservation présentielle (compte dans les stats)
              </option>
            </select>
            <p className="text-white/60 text-xs mt-1">
              {newPeriod.isFormalBooking 
                ? 'Cette période sera comptée comme une réservation dans les statistiques'
                : 'Cette période ne sera pas comptée comme une réservation (véhicule inactif)'}
            </p>
          </div>
          <div>
            <label className="block text-white font-montserrat font-semibold mb-2 text-sm">
              Raison (optionnel)
            </label>
            <input
              type="text"
              value={newPeriod.reason}
              onChange={(e) => setNewPeriod({ ...newPeriod, reason: e.target.value })}
              placeholder="Ex: Maintenance, Révision..."
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-montserrat font-semibold disabled:opacity-50"
          >
            {submitting ? 'Ajout...' : 'Ajouter'}
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg font-montserrat font-semibold"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  )
}

