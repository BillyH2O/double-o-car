# Système de Traductions Dynamiques pour les Véhicules

## Vue d'ensemble

Le système de traductions permet de stocker et récupérer les descriptions (`bio`) et équipements (`features`) des véhicules dans différentes langues (français, anglais, néerlandais).

## Architecture

### Base de données

- **Table `vehicles`** : Contient les données de base du véhicule avec `bio` et `features` comme valeurs par défaut (fallback)
- **Table `vehicle_translations`** : Stocke les traductions par langue
  - `vehicleId` : Référence au véhicule
  - `locale` : Code de langue ('fr', 'en', 'nl')
  - `bio` : Description traduite (optionnel)
  - `features` : Tableau d'équipements traduits

### Fonctionnement

1. **Récupération** : Les routes API récupèrent automatiquement les traductions selon la locale de la requête
2. **Fallback** : Si une traduction n'existe pas pour une langue, les valeurs par défaut du véhicule sont utilisées
3. **Transformation** : Le helper `transformVehicleWithTranslation` remplace `bio` et `features` par les valeurs traduites

## Utilisation

### Dans les composants

Les composants utilisent déjà `vehicle.bio` et `vehicle.features` qui sont automatiquement traduits :

```tsx
// ✅ Fonctionne automatiquement avec les traductions
<VehicleDescription vehicle={vehicle} />
<VehicleFeatures vehicle={vehicle} />
```

### Dans les routes API

Les routes API incluent automatiquement les traductions :

```typescript
// GET /api/vehicles/[slug]?locale=fr
// Retourne le véhicule avec bio et features en français

// GET /api/vehicles?locale=en
// Retourne tous les véhicules avec bio et features en anglais
```

La locale est récupérée depuis :
1. Le header `x-locale` (prioritaire)
2. Le paramètre query `locale`
3. La locale par défaut (`fr`)

### Dans les hooks

Les hooks passent automatiquement la locale :

```typescript
// useVehicleBySlug utilise automatiquement useLocale()
const { vehicle } = useVehicleBySlug(slug)

// useVehicles utilise automatiquement useLocale()
const { vehicles } = useVehicles(filters)
```

## Gestion des traductions (Admin)

### Ajouter une traduction

```typescript
import { prisma } from '@/lib/prisma'

// Ajouter une traduction pour un véhicule
await prisma.vehicleTranslation.upsert({
  where: {
    vehicleId_locale: {
      vehicleId: 'vehicle-id',
      locale: 'en',
    },
  },
  update: {
    bio: 'English description',
    features: ['GPS', 'Air Conditioning', 'Bluetooth'],
  },
  create: {
    vehicleId: 'vehicle-id',
    locale: 'en',
    bio: 'English description',
    features: ['GPS', 'Air Conditioning', 'Bluetooth'],
  },
})
```

### Mettre à jour une traduction

```typescript
await prisma.vehicleTranslation.update({
  where: {
    vehicleId_locale: {
      vehicleId: 'vehicle-id',
      locale: 'en',
    },
  },
  data: {
    bio: 'Updated English description',
    features: ['GPS', 'Air Conditioning', 'Bluetooth', 'Sunroof'],
  },
})
```

### Supprimer une traduction

```typescript
await prisma.vehicleTranslation.delete({
  where: {
    vehicleId_locale: {
      vehicleId: 'vehicle-id',
      locale: 'en',
    },
  },
})
```

## Helpers disponibles

### `getVehicleTranslation(vehicle, locale)`

Récupère la traduction d'un véhicule pour une locale avec fallback :

```typescript
import { getVehicleTranslation } from '@/lib/utils/vehicleTranslations'

const translation = getVehicleTranslation(vehicle, 'en')
// { bio: 'English bio or fallback', features: ['...'] }
```

### `transformVehicleWithTranslation(vehicle, locale)`

Transforme un véhicule avec traductions en véhicule avec traduction pour une locale :

```typescript
import { transformVehicleWithTranslation } from '@/lib/utils/vehicleTranslations'

const vehicleWithTranslation = transformVehicleWithTranslation(vehicle, 'en')
// Vehicle avec bio et features traduits pour 'en'
```

### `fetchWithLocale(url, options, locale)`

Fait un appel fetch avec la locale automatiquement ajoutée :

```typescript
import { fetchWithLocale } from '@/lib/utils/apiClient'

const response = await fetchWithLocale('/api/vehicles', undefined, 'en')
```

## Migration des données existantes

Pour migrer les données existantes vers le système de traductions :

1. Les véhicules existants gardent leur `bio` et `features` comme valeurs par défaut
2. Ajoutez des traductions progressivement via l'admin ou des scripts
3. Les traductions remplaceront automatiquement les valeurs par défaut quand elles existent

## Exemple complet

```typescript
// 1. Créer un véhicule avec bio et features par défaut (français)
const vehicle = await prisma.vehicle.create({
  data: {
    slug: 'renault-clio-2024',
    brand: 'Renault',
    model: 'Clio',
    year: 2024,
    bio: 'Description en français',
    features: ['GPS', 'Climatisation'],
    // ... autres champs
  },
})

// 2. Ajouter une traduction anglaise
await prisma.vehicleTranslation.create({
  data: {
    vehicleId: vehicle.id,
    locale: 'en',
    bio: 'English description',
    features: ['GPS', 'Air Conditioning'],
  },
})

// 3. Ajouter une traduction néerlandaise
await prisma.vehicleTranslation.create({
  data: {
    vehicleId: vehicle.id,
    locale: 'nl',
    bio: 'Nederlandse beschrijving',
    features: ['GPS', 'Airconditioning'],
  },
})

// 4. Récupérer avec traduction automatique
// GET /api/vehicles/renault-clio-2024?locale=en
// Retourne bio et features en anglais

// GET /api/vehicles/renault-clio-2024?locale=nl
// Retourne bio et features en néerlandais

// GET /api/vehicles/renault-clio-2024?locale=fr
// Retourne bio et features en français (valeurs par défaut)
```

## Notes importantes

- Les traductions sont optionnelles : si une traduction n'existe pas, les valeurs par défaut sont utilisées
- Les traductions sont automatiquement incluses dans les requêtes API
- La locale est détectée automatiquement depuis l'URL ou les headers
- Les composants existants fonctionnent sans modification

