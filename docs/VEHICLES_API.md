# API et Hooks pour les Véhicules

## Structure

### 1. API Route
**Fichier:** `app/api/vehicles/route.ts`

Endpoint GET qui récupère les véhicules depuis la base de données avec support de filtres :
- `isAvailable`: boolean - Filtrer par disponibilité
- `brand`: string - Filtrer par marque
- `fuelType`: string - Filtrer par type de carburant
- `transmission`: string - Filtrer par transmission

**Exemple d'utilisation:**
```
GET /api/vehicles?isAvailable=true&brand=Renault
```

### 2. Hook personnalisé
**Fichier:** `hooks/useVehicles.ts`

Hook React qui encapsule la logique de récupération des véhicules.

**Utilisation:**
```typescript
const { vehicles, loading, error, refetch } = useVehicles({
  isAvailable: true,
  brand: 'Renault',
  fuelType: 'ESSENCE',
  transmission: 'AUTOMATIC'
})
```

**Retour:**
- `vehicles`: Tableau de véhicules (type Prisma Vehicle)
- `loading`: boolean - État de chargement
- `error`: string | null - Message d'erreur éventuel
- `refetch`: Function - Fonction pour recharger les données

### 3. Mapper
**Fichier:** `lib/utils/vehicleMapper.ts`

Utilitaires pour convertir les véhicules de la base de données vers le format utilisé dans l'interface.

**Fonctions:**
- `mapVehicleToCar(vehicle: Vehicle): Car` - Convertit un véhicule
- `mapVehiclesToCars(vehicles: Vehicle[]): Car[]` - Convertit un tableau de véhicules

**Mapping effectué:**
- ID string → ID numérique (hash)
- Enum Prisma → Format français (ESSENCE → Essence, AUTOMATIC → Automatique)
- Ajout des logos par marque
- Conversion des prix Decimal → Number

### 4. Composant
**Fichier:** `components/CarList.tsx`

Composant qui affiche la liste des véhicules en utilisant le hook `useVehicles`.

**Fonctionnalités:**
- Chargement dynamique depuis la DB
- États de chargement et d'erreur
- Affichage conditionnel (vide, chargement, erreur, liste)
- Conversion automatique via le mapper

## Flux de données

```
Base de données (Prisma)
    ↓
API Route (/api/vehicles)
    ↓
Hook (useVehicles)
    ↓
Mapper (mapVehiclesToCars)
    ↓
Composant (CarList)
```

## Exemple complet

```typescript
// Dans un composant
import { useVehicles } from '@/hooks/useVehicles'
import { mapVehiclesToCars } from '@/lib/utils/vehicleMapper'

function MyComponent() {
  const { vehicles, loading, error } = useVehicles({ isAvailable: true })
  const cars = mapVehiclesToCars(vehicles)
  
  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  
  return (
    <div>
      {cars.map(car => (
        <div key={car.id}>{car.brand} {car.model}</div>
      ))}
    </div>
  )
}
```

## Avantages de cette architecture

1. **Séparation des responsabilités**: API, hooks, mappers et composants sont séparés
2. **Réutilisabilité**: Le hook peut être utilisé dans n'importe quel composant
3. **Type safety**: TypeScript garantit la cohérence des types
4. **Maintenabilité**: Code propre et facile à maintenir
5. **Testabilité**: Chaque partie peut être testée indépendamment





