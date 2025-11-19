# Règles d'Architecture - Services vs Hooks

## 🎯 Règle d'Or : Fetch Toujours dans les Services

**Les appels `fetch()` vers `/api/...` doivent TOUJOURS être dans les services, JAMAIS dans les hooks.**

---

## ✅ CORRECT : Fetch dans le Service

### Pattern Service + Hook (sans TanStack Query)

```typescript
// ✅ lib/services/brandService.ts
class BrandService {
  async getBrands(): Promise<Brand[]> {
    const response = await fetch('/api/admin/brands')  // ✅ Fetch ICI
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des marques')
    }
    return response.json()
  }
}

export const brandService = new BrandService()

// ✅ hooks/useBrands.ts
import { brandService } from "@/lib/services/brandService"

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  
  const fetchBrands = useCallback(async () => {
    const fetchedBrands = await brandService.getBrands()  // ✅ Appelle le service
    setBrands(fetchedBrands)
  }, [])

  useEffect(() => {
    fetchBrands()
  }, [fetchBrands])

  return { brands }
}
```

### Pattern avec TanStack Query

```typescript
// ✅ lib/services/brandService.ts (MÊME CODE)
class BrandService {
  async getBrands(): Promise<Brand[]> {
    const response = await fetch('/api/admin/brands')  // ✅ Fetch ICI
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des marques')
    }
    return response.json()
  }
}

export const brandService = new BrandService()

// ✅ hooks/useBrands.ts
import { useQuery } from '@tanstack/react-query'
import { brandService } from "@/lib/services/brandService"

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: () => brandService.getBrands(),  // ✅ Appelle le service
  })
}
```

---

## ❌ INCORRECT : Fetch dans le Hook

```typescript
// ❌ hooks/useBrands.ts (MAUVAIS)
export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([])
  
  const fetchBrands = useCallback(async () => {
    // ❌ NE JAMAIS FAIRE ÇA !
    const response = await fetch('/api/admin/brands')  // ❌ Fetch dans le hook
    const data = await response.json()
    setBrands(data)
  }, [])

  return { brands }
}
```

---

## Pourquoi cette règle ?

### 1. **Réutilisabilité**

**Avec Service :**
```typescript
// ✅ Vous pouvez utiliser le service partout
import { brandService } from "@/lib/services/brandService"

// Dans un composant React
const brands = await brandService.getBrands()

// Dans une API route (Server Component)
export async function GET() {
  const brands = await brandService.getBrands()  // ✅ Fonctionne !
  return Response.json(brands)
}

// Dans un script Node.js
const brands = await brandService.getBrands()  // ✅ Fonctionne !
```

**Sans Service (fetch dans le hook) :**
```typescript
// ❌ Vous ne pouvez utiliser que dans des composants React
// ❌ Impossible d'utiliser dans les API routes
// ❌ Impossible d'utiliser dans les scripts serveur
```

### 2. **Testabilité**

**Avec Service :**
```typescript
// ✅ Facile à tester (mock le service)
import { brandService } from "@/lib/services/brandService"

jest.mock('@/lib/services/brandService', () => ({
  brandService: {
    getBrands: jest.fn().mockResolvedValue([{ id: '1', name: 'Test' }])
  }
}))

test('should fetch brands', async () => {
  const brands = await brandService.getBrands()
  expect(brands).toHaveLength(1)
})
```

**Sans Service :**
```typescript
// ❌ Difficile à tester (doit mocker fetch global)
global.fetch = jest.fn().mockResolvedValue({
  ok: true,
  json: async () => [{ id: '1', name: 'Test' }]
})
```

### 3. **Séparation des Responsabilités**

```
Service  →  Communication API + Transformation données
Hook     →  Gestion état React + Logique UI
```

**Service** : Fonction pure, pas de React
**Hook** : Logique React, utilise le service

### 4. **Migration vers TanStack Query**

Si vous avez les fetch dans les services, migrer vers TanStack Query est trivial :

```typescript
// Avant (Service + Hook)
const { brands } = useBrands()  // Hook custom

// Après (TanStack Query)
const { data: brands } = useQuery({
  queryKey: ['brands'],
  queryFn: () => brandService.getBrands()  // ✅ Même service !
})
```

Si les fetch sont dans les hooks, vous devez tout refactorer.

---

## Structure Recommandée

```
lib/services/
  ├── brandService.ts      # ✅ Fetch ICI
  ├── vehicleService.ts    # ✅ Fetch ICI
  └── userService.ts       # ✅ Fetch ICI

hooks/
  ├── useBrands.ts         # ✅ Appelle brandService
  ├── useVehicles.ts       # ✅ Appelle vehicleService
  └── useUser.ts           # ✅ Appelle userService
```

---

## Exemples Complets

### Exemple 1 : GET Request

```typescript
// ✅ lib/services/vehicleService.ts
class VehicleService {
  async getVehicle(id: string): Promise<Vehicle> {
    const response = await fetch(`/api/admin/vehicles/${id}`)
    if (!response.ok) throw new Error('Not found')
    return response.json()
  }
}

// ✅ hooks/useVehicle.ts
export function useVehicle(id: string) {
  const { data, isLoading } = useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicle(id)  // ✅ Service
  })
  return { vehicle: data, loading: isLoading }
}
```

### Exemple 2 : POST Request

```typescript
// ✅ lib/services/vehicleService.ts
class VehicleService {
  async createVehicle(data: VehiclePayload): Promise<Vehicle> {
    const response = await fetch('/api/admin/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }
    return response.json()
  }
}

// ✅ hooks/useVehicleSubmit.ts
export function useVehicleSubmit() {
  const mutation = useMutation({
    mutationFn: (data: VehiclePayload) => 
      vehicleService.createVehicle(data)  // ✅ Service
  })
  return mutation
}
```

### Exemple 3 : Transformation de Données

```typescript
// ✅ lib/services/vehicleService.ts
class VehicleService {
  async getVehicle(id: string): Promise<Vehicle> {
    const response = await fetch(`/api/admin/vehicles/${id}`)
    const data = await response.json()
    
    // ✅ Transformation dans le service
    return {
      ...data,
      pricePerDay: Number(data.pricePerDay),
      year: parseInt(data.year),
    }
  }
}

// ✅ hooks/useVehicle.ts
export function useVehicle(id: string) {
  return useQuery({
    queryKey: ['vehicle', id],
    queryFn: () => vehicleService.getVehicle(id)  // ✅ Données déjà transformées
  })
}
```

---

## Checklist

Avant de créer un hook, vérifiez :

- [ ] Les `fetch()` sont dans un service
- [ ] Le hook appelle le service, pas `fetch()` directement
- [ ] Le service peut être utilisé en dehors de React
- [ ] Le service est facilement testable (mock)
- [ ] La migration vers TanStack Query serait simple

---

## Résumé

| Où mettre le fetch | ✅ Correct | ❌ Incorrect |
|-------------------|------------|--------------|
| **Service** | ✅ Oui | - |
| **Hook** | - | ❌ Non |
| **Composant** | - | ❌ Non |
| **API Route** | ✅ Oui (pour appels externes) | - |

**Règle simple : Fetch = Service, Hook = État React**

