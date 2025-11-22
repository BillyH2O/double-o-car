/**
 * Utilitaires pour les traductions du calendrier
 * Ces fonctions doivent être utilisées dans des composants client avec useTranslations
 */

export const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

export const DAY_KEYS = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
] as const;

/**
 * Obtient le nom du mois traduit
 * @param monthIndex Index du mois (0-11)
 * @param t Fonction de traduction depuis useTranslations("calendar")
 */
export function getMonthName(monthIndex: number, t: (key: string) => string): string {
  if (monthIndex < 0 || monthIndex > 11) {
    return '';
  }
  return t(`months.${MONTH_KEYS[monthIndex]}`);
}

/**
 * Obtient le nom du jour traduit
 * @param dayIndex Index du jour (0 = dimanche, 6 = samedi)
 * @param t Fonction de traduction depuis useTranslations("calendar")
 */
export function getDayName(dayIndex: number, t: (key: string) => string): string {
  if (dayIndex < 0 || dayIndex > 6) {
    return '';
  }
  return t(`days.${DAY_KEYS[dayIndex]}`);
}

/**
 * Obtient tous les noms de mois traduits
 */
export function getMonthNames(t: (key: string) => string): string[] {
  return MONTH_KEYS.map(key => t(`months.${key}`));
}

/**
 * Obtient tous les noms de jours traduits
 */
export function getDayNames(t: (key: string) => string): string[] {
  return DAY_KEYS.map(key => t(`days.${key}`));
}

