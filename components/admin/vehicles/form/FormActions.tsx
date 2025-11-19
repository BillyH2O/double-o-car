import { useRouter } from "next/navigation"

interface FormActionsProps {
  isNew: boolean
  saving: boolean
}

export function FormActions({ isNew, saving }: FormActionsProps) {
  const router = useRouter()

  return (
    <div className="flex gap-4 pt-4">
      <button
        type="submit"
        disabled={saving}
        className="flex-1 bg-[#003CF0] hover:bg-[#0031c0] text-white py-3 rounded-lg font-montserrat font-semibold disabled:opacity-50"
      >
        {saving ? 'Enregistrement...' : isNew ? 'Créer' : 'Enregistrer'}
      </button>
      <button
        type="button"
        onClick={() => router.push('/admin/vehicles')}
        className="px-6 py-3 bg-white/20 hover:bg-white/30 text-white rounded-lg font-montserrat font-semibold"
      >
        Annuler
      </button>
    </div>
  )
}

