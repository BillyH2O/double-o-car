# Guide de Refactorisation - Architecture Propre

## 🎯 Problème Identifié

Le fichier `page.tsx` mélangeait :
- ❌ Logique métier (gestion du formulaire)
- ❌ Appels API (fetch)
- ❌ Gestion d'état (useState)
- ❌ Rendu UI (JSX)

**Résultat** : Code difficile à maintenir, tester et réutiliser.

## ✅ Solution : Séparation des Responsabilités

### Structure Recommandée

```
lib/
  services/          # Couche API - Communication avec le backend
    vehicleService.ts
    brandService.ts

hooks/               # Logique métier réutilisable
  useVehicle.ts      # Récupération d'un véhicule
  useVehicleForm.ts  # Gestion du formulaire
  useVehicleSubmit.ts # Soumission du formulaire
  useBrands.ts       # Gestion des marques

components/
  admin/
    VehicleForm.tsx  # Composant UI pur (à créer)
```

## 📚 Architecture en Couches

### 1. **Services (`lib/services/`)**
**Rôle** : Communication avec l'API, transformation des données

```typescript
// lib/services/vehicleService.ts
class VehicleService {
  async getVehicle(id: string): Promise<Vehicle>
  async createVehicle(data: VehiclePayload): Promise<Vehicle>
  async updateVehicle(id: string, data: VehiclePayload): Promise<Vehicle>
  transformFormDataToPayload(formData): VehiclePayload
  transformVehicleToFormData(vehicle): VehicleFormData
}
```

**Avantages** :
- ✅ Centralise les appels API
- ✅ Gère les transformations de données
- ✅ Facile à tester (mock)
- ✅ Réutilisable partout

### 2. **Hooks (`hooks/`)**
**Rôle** : Logique métier réutilisable, gestion d'état

```typescript
// hooks/useVehicleForm.ts
export function useVehicleForm(initialVehicle?) {
  const [formData, setFormData] = useState(...)
  const addFeature = useCallback(...)
  const removeFeature = useCallback(...)
  // ...
  return { formData, addFeature, removeFeature, ... }
}
```

**Avantages** :
- ✅ Logique réutilisable
- ✅ Séparation claire des responsabilités
- ✅ Facile à tester
- ✅ Composants plus simples

### 3. **Composants (`components/`)**
**Rôle** : Rendu UI uniquement

```typescript
// components/admin/VehicleForm.tsx
export function VehicleForm({ formData, updateField, onSubmit, ... }) {
  return <form onSubmit={onSubmit}>...</form>
}
```

**Avantages** :
- ✅ Composants purs (props in → UI out)
- ✅ Facile à tester
- ✅ Réutilisables

## 🔄 Migration Progressive

### Étape 1 : Créer les Services
```bash
# Déjà fait ✅
lib/services/vehicleService.ts
lib/services/brandService.ts
```

### Étape 2 : Créer les Hooks
```bash
# Déjà fait ✅
hooks/useVehicle.ts
hooks/useVehicleForm.ts
hooks/useVehicleSubmit.ts
hooks/useBrands.ts
```

### Étape 3 : Refactoriser le Composant

**Avant** (600 lignes dans page.tsx) :
```typescript
export default function EditVehiclePage() {
  const [formData, setFormData] = useState(...)
  const [loading, setLoading] = useState(...)
  const fetchVehicle = async () => { /* 40 lignes */ }
  const handleSubmit = async () => { /* 30 lignes */ }
  const addFeature = () => { /* ... */ }
  // ... 500+ lignes de code
}
```

**Après** (50 lignes dans page.tsx) :
```typescript
export default function EditVehiclePage() {
  const { vehicle, loading } = useVehicle(id)
  const form = useVehicleForm(vehicle)
  const { submit, saving } = useVehicleSubmit(id, isNew)
  const { brands } = useBrands()

  return <VehicleForm {...form} onSubmit={submit} brands={brands} />
}
```

## 📊 Comparaison

| Aspect | Avant | Après |
|--------|-------|-------|
| **Lignes dans page.tsx** | ~600 | ~50 |
| **Réutilisabilité** | ❌ Non | ✅ Oui |
| **Testabilité** | ❌ Difficile | ✅ Facile |
| **Maintenabilité** | ❌ Faible | ✅ Élevée |
| **Séparation des responsabilités** | ❌ Non | ✅ Oui |

## 🧪 Tests

Avec cette architecture, vous pouvez facilement tester :

```typescript
// Test du service
describe('VehicleService', () => {
  it('should transform form data to payload', () => {
    const formData = { year: '2020', ... }
    const payload = vehicleService.transformFormDataToPayload(formData)
    expect(payload.year).toBe(2020)
  })
})

// Test du hook
describe('useVehicleForm', () => {
  it('should add feature', () => {
    const { addFeature, formData } = useVehicleForm()
    addFeature('GPS')
    expect(formData.features).toContain('GPS')
  })
})
```

## 🚀 Prochaines Étapes

1. ✅ Services créés
2. ✅ Hooks créés
3. ⏳ Créer le composant `VehicleForm.tsx`
4. ⏳ Refactoriser `page.tsx` pour utiliser les hooks
5. ⏳ Extraire les sous-composants (BrandSelector, ImageUploader, etc.)

## 💡 Bonnes Pratiques

1. **Services** : Toujours retourner des types explicites
2. **Hooks** : Utiliser `useCallback` pour les fonctions
3. **Composants** : Props typées, pas de logique métier
4. **Erreurs** : Gérer dans les hooks/services, pas dans les composants

## 📖 Références

- [React Hooks Best Practices](https://react.dev/reference/react)
- [Separation of Concerns](https://en.wikipedia.org/wiki/Separation_of_concerns)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

