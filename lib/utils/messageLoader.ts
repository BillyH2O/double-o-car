/**
 * Charge les traductions depuis les fichiers JSON
 * Utile pour les pages qui n'ont pas accès au contexte NextIntl
 */

import frMessages from '@/messages/fr.json';
import enMessages from '@/messages/en.json';
import nlMessages from '@/messages/nl.json';

const messages = {
  fr: frMessages,
  en: enMessages,
  nl: nlMessages,
} as const;

type Locale = 'fr' | 'en' | 'nl';

type Messages = typeof frMessages;
type NamespaceMessages = Messages[keyof Messages];
type NestedValue = string | Record<string, NestedValue>;

/**
 * Obtient une traduction depuis les fichiers de messages
 * @param locale - La locale ('fr', 'en', 'nl')
 * @param namespace - Le namespace (ex: 'common', 'footer', etc.)
 * @param key - La clé de traduction (peut être imbriquée avec des points, ex: 'errorCode' ou 'section1.title')
 * @returns La traduction ou une chaîne vide si non trouvée
 */
export function getTranslation(
  locale: Locale,
  namespace: string,
  key: string
): string {
  try {
    const localeMessages = messages[locale];
    const namespaceMessages = (localeMessages as Record<string, NamespaceMessages>)[namespace];
    
    if (!namespaceMessages) {
      return '';
    }
    
    // Gérer les clés imbriquées (ex: 'section1.title')
    const keys = key.split('.');
    let value: NestedValue = namespaceMessages as NestedValue;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return '';
      }
    }
    
    return typeof value === 'string' ? value : '';
  } catch (error) {
    console.error(`Error loading translation for ${locale}.${namespace}.${key}:`, error);
    return '';
  }
}

/**
 * Obtient toutes les traductions d'un namespace
 * @param locale - La locale ('fr', 'en', 'nl')
 * @param namespace - Le namespace (ex: 'common', 'footer', etc.)
 * @returns L'objet contenant toutes les traductions du namespace
 */
export function getNamespaceTranslations(
  locale: Locale,
  namespace: string
): Record<string, unknown> {
  try {
    const localeMessages = messages[locale];
    return (localeMessages as Record<string, NamespaceMessages>)[namespace] as Record<string, unknown> || {};
  } catch (error) {
    console.error(`Error loading namespace ${namespace} for locale ${locale}:`, error);
    return {};
  }
}

