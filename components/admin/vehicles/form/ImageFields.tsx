import { useState } from "react"
import Image from "next/image"
import { VehicleFormData } from "@/lib/services/vehicleService"

interface ImageFieldsProps {
  formData: VehicleFormData
  updateField: <K extends keyof VehicleFormData>(field: K, value: VehicleFormData[K]) => void
  addImage: (image: string) => boolean
  removeImage: (index: number) => void
}

export function ImageFields({ formData, updateField, addImage, removeImage }: ImageFieldsProps) {
  const [newImage, setNewImage] = useState('')

  const handleAddImage = () => {
    if (addImage(newImage)) {
      setNewImage('')
    }
  }

  return (
    <>
      {/* Image principale */}
      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Image principale (URL) *</label>
        <input
          type="text"
          required
          value={formData.image}
          onChange={(e) => updateField('image', e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.jpg ou /image.jpg"
        />
        {formData.image && (
          <div className="mt-2">
            <Image src={formData.image} alt="Preview" className="max-w-xs rounded-lg" width={64} height={64} />
          </div>
        )}
      </div>

      {/* Images supplémentaires */}
      <div>
        <label className="block text-white font-montserrat font-semibold mb-2">Images supplémentaires</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
            className="flex-1 px-4 py-2 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg ou /image.jpg"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-montserrat"
          >
            Ajouter
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.images.map((img, index) => (
            <div key={index} className="relative">
              <Image src={img} alt={`Image ${index + 1}`} className="object-cover rounded-lg" width={80} height={80} />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

