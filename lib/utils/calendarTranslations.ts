/**
 * Utilitaires pour les traductions du calendrier
 */

import { getNamespaceTranslations } from './messageLoader'

export const MONTH_KEYS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december'
] as const;

export const DAY_KEYS = [
  'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'
] as const;

/**
 * Obtient le nom du mois traduit (version statique)
 * @param monthIndex Index du mois (0-11)
 * @param locale Locale ('fr', 'en', 'nl')
 */
export function getMonthNameStatic(monthIndex: number, locale: 'fr' | 'en' | 'nl' = 'fr'): string {
  if (monthIndex < 0 || monthIndex > 11) {
    return '';
  }
  const translations = getNamespaceTranslations(locale, 'calendar') as Record<string, unknown>;
  const months = translations.months as Record<string, unknown>;
  return String(months[MONTH_KEYS[monthIndex]] || '');
}

/**
 * Obtient le nom du jour traduit (version statique)
 * @param dayIndex Index du jour (0 = dimanche, 6 = samedi)
 * @param locale Locale ('fr', 'en', 'nl')
 */
export function getDayNameStatic(dayIndex: number, locale: 'fr' | 'en' | 'nl' = 'fr'): string {
  if (dayIndex < 0 || dayIndex > 6) {
    return '';
  }
  const translations = getNamespaceTranslations(locale, 'calendar') as Record<string, unknown>;
  const days = translations.days as Record<string, unknown>;
  return String(days[DAY_KEYS[dayIndex]] || '');
}

/**
 * Obtient tous les noms de jours traduits (version statique)
 */
export function getDayNamesStatic(locale: 'fr' | 'en' | 'nl' = 'fr'): string[] {
  return DAY_KEYS.map(key => getDayNameStatic(DAY_KEYS.indexOf(key), locale));
}

/**
 * Obtient le nom du mois traduit (avec fonction de traduction)
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
 * Obtient le nom du jour traduit (avec fonction de traduction)
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
 * Obtient tous les noms de mois traduits (avec fonction de traduction)
 */
export function getMonthNames(t: (key: string) => string): string[] {
  return MONTH_KEYS.map(key => t(`months.${key}`));
}

/**
 * Obtient tous les noms de jours traduits (avec fonction de traduction)
 */
export function getDayNames(t: (key: string) => string): string[] {
  return DAY_KEYS.map(key => t(`days.${key}`));
}

