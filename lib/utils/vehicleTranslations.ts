import { Vehicle, VehicleTranslation } from "@prisma/client";

type VehicleWithTranslations = Vehicle & {
  translations?: VehicleTranslation[];
};

/**
 * Récupère la traduction d'un véhicule pour une locale donnée avec fallback
 * @param vehicle - Le véhicule avec ses traductions
 * @param locale - La locale demandée ('fr', 'en', 'nl')
 * @returns Un objet avec bio et features traduits, ou les valeurs par défaut
 */
export function getVehicleTranslation(
  vehicle: VehicleWithTranslations,
  locale: string
): {
  bio: string | null;
  features: string[];
} {
  // Trouver la traduction pour la locale demandée
  const translation = vehicle.translations?.find((t) => t.locale === locale);

  return {
    // Utiliser la traduction si disponible, sinon fallback sur la valeur par défaut
    bio: translation?.bio ?? vehicle.bio ?? null,
    features: translation?.features ?? vehicle.features ?? [],
  };
}

/**
 * Récupère toutes les traductions d'un véhicule organisées par locale
 * @param vehicle - Le véhicule avec ses traductions
 * @returns Un objet avec les traductions organisées par locale
 */
export function getAllVehicleTranslations(vehicle: VehicleWithTranslations): {
  [locale: string]: {
    bio: string | null;
    features: string[];
  };
} {
  const result: {
    [locale: string]: {
      bio: string | null;
      features: string[];
    };
  } = {};

  // Ajouter les valeurs par défaut (fallback)
  result.default = {
    bio: vehicle.bio ?? null,
    features: vehicle.features ?? [],
  };

  // Ajouter toutes les traductions disponibles
  vehicle.translations?.forEach((translation) => {
    result[translation.locale] = {
      bio: translation.bio ?? null,
      features: translation.features ?? [],
    };
  });

  return result;
}

/**
 * Type pour un véhicule avec sa traduction pour une locale spécifique
 */
export type VehicleWithLocaleTranslation = Omit<Vehicle, "bio" | "features"> & {
  bio: string | null;
  features: string[];
  translationLocale: string;
};

/**
 * Transforme un véhicule avec traductions en véhicule avec traduction pour une locale
 * @param vehicle - Le véhicule avec ses traductions
 * @param locale - La locale demandée
 * @returns Le véhicule avec les champs traduits pour la locale
 */
export function transformVehicleWithTranslation(
  vehicle: VehicleWithTranslations,
  locale: string
): VehicleWithLocaleTranslation {
  const translation = getVehicleTranslation(vehicle, locale);

  // Extraire les champs non traduits du véhicule
  const {
    bio: _bio,
    features: _features,
    translations: _translations,
    ...vehicleWithoutTranslatableFields
  } = vehicle;
  
  // Variables intentionnellement ignorées (utilisées uniquement pour la destructuration)
  void _bio;
  void _features;
  void _translations;

  return {
    ...vehicleWithoutTranslatableFields,
    ...translation,
    translationLocale: locale,
  };
}

