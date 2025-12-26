/**
 * Génère un slug à partir d'une chaîne de caractères
 * Exemple: "Renault Clio V 2024" → "renault-clio-v-2024"
 */
export function generateSlug(brand: string, model: string, year: number, transmission?: string, fuelType?: string): string {
  const parts = [
    brand.toLowerCase(),
    model.toLowerCase(),
    year.toString(),
  ]
  
  // Ajouter transmission et fuelType pour différencier les variantes
  if (transmission) {
    parts.push(transmission.toLowerCase())
  }
  if (fuelType) {
    parts.push(fuelType.toLowerCase())
  }
  
  return parts
    .join('-')
    .replace(/[^a-z0-9-]/g, '') // Supprimer les caractères spéciaux
    .replace(/-+/g, '-') // Remplacer les tirets multiples par un seul
    .replace(/^-|-$/g, '') // Supprimer les tirets en début/fin
}





