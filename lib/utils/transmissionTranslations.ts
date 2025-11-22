/**
 * Traduit une valeur de transmission (MANUAL/AUTOMATIC ou Manuelle/Automatique) 
 * vers la traduction appropriée selon la locale
 * Utilise les fichiers de messages pour maintenir la cohérence (namespace vehicleFilters)
 * @param transmission - La valeur de transmission (brute ou traduite)
 * @param t - La fonction de traduction de next-intl avec le namespace vehicleFilters
 * @returns La traduction de la transmission
 */
export function translateTransmission(
  transmission: string,
  t: (key: string) => string
): string {
  // Normaliser la valeur en majuscules pour la comparaison
  const normalized = transmission.toUpperCase();
  
  // Utilise le namespace vehicleFilters pour maintenir la cohérence avec les fichiers de messages
  if (normalized === 'MANUAL' || normalized === 'MANUELLE') {
    return t('manual');
  }
  
  // Si c'est AUTOMATIC ou Automatique (après normalisation)
  // Utilise le namespace vehicleFilters pour maintenir la cohérence avec les fichiers de messages
  if (normalized === 'AUTOMATIC' || normalized === 'AUTOMATIQUE') {
    return t('automatic');
  }
  
  // Fallback : retourner la valeur originale si non reconnue
  return transmission;
}

