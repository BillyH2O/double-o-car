# Structure du Projet Double-O Car

## 📁 Architecture

```
double-o-car/
├── app/
│   ├── page.tsx              # Page principale (orchestration des composants)
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Styles globaux
├── components/
│   ├── Header.tsx            # En-tête avec logo et navigation
│   ├── Footer.tsx            # Pied de page
│   ├── Hero.tsx              # Section hero (titre principal)
│   ├── VehicleBrands.tsx     # Section des marques de véhicules
│   ├── BookingForm.tsx       # Formulaire de réservation
│   ├── Simplicity.tsx        # Section "Louez en toute simplicité"
│   ├── Reviews.tsx           # Section des avis clients
│   └── CarList.tsx           # Page de résultats de recherche
├── data/
│   ├── reviews.ts            # Données des avis (tableau)
│   └── cars.ts               # Données des voitures (tableau)
├── types/
│   └── index.ts              # Types TypeScript
└── public/                   # Images et assets statiques
```

## 🔧 Composants

### Components Principaux

- **Header**: Navigation fixe en haut de page
- **Footer**: Liens et informations de copyright
- **Hero**: Message d'accueil principal
- **VehicleBrands**: Affichage des marques disponibles
- **BookingForm**: Formulaire de recherche de voiture
- **Simplicity**: Section avec image et texte promotionnel
- **Reviews**: Affichage des témoignages clients
- **CarList**: Liste des voitures disponibles (page de résultats)

## 📊 Données

### Reviews (Avis)
```typescript
{
  id: number;
  name: string;
  comment: string;
}
```

### Cars (Voitures)
```typescript
{
  id: number;
  brand: string;
  model: string;
  year: number;
  transmission: "Automatique" | "Manuelle";
  fuel: "Essence" | "Diesel";
  pricePerDay: number;
  image: string;
  logo: string;
}
```

## 🔄 Intégration Backend

Les données sont actuellement stockées dans des fichiers TypeScript (`data/reviews.ts` et `data/cars.ts`). Pour l'intégration backend :

### 1. Remplacer les imports statiques par des appels API

**Avant:**
```typescript
import { reviews } from "@/data/reviews";
```

**Après:**
```typescript
const reviews = await fetch('/api/reviews').then(r => r.json());
```

### 2. Créer les endpoints API

Créer les fichiers suivants dans `app/api/` :
- `app/api/reviews/route.ts`
- `app/api/cars/route.ts`

### 3. Ajouter la gestion d'état

Utiliser React Query, SWR ou useState/useEffect pour la gestion des données asynchrones.

### 4. Ajouter la validation

Utiliser Zod ou Yup pour valider les données du formulaire avant envoi au backend.

## 🎨 Styling

- **Tailwind CSS** pour tous les styles
- **Montserrat** comme police principale
- Classes utilitaires personnalisées définies dans `globals.css`

## 🚀 Prochaines Étapes

1. ✅ Structure modulaire créée
2. ✅ Données organisées en tableaux
3. ⏳ Ajouter les routes API
4. ⏳ Intégrer avec un backend (Node.js/Express, NestJS, etc.)
5. ⏳ Ajouter la validation des formulaires
6. ⏳ Implémenter la recherche et les filtres
7. ⏳ Ajouter l'authentification utilisateur
