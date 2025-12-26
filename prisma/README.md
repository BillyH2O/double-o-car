# Configuration de la base de données

## Installation

1. Installez les dépendances :
```bash
npm install
```

2. Configurez votre fichier `.env` avec votre URL de connexion NeonDB :
```env
DATABASE_URL="postgresql://user:password@host:port/database?sslmode=require"
```

3. Générez le client Prisma :
```bash
npm run db:generate
```

4. Poussez le schéma vers la base de données :
```bash
npm run db:push
```

Ou créez une migration :
```bash
npm run db:migrate
```

## Commandes utiles

- `npm run db:generate` - Génère le client Prisma
- `npm run db:push` - Pousse le schéma vers la DB (développement)
- `npm run db:migrate` - Crée une migration (production)
- `npm run db:studio` - Ouvre Prisma Studio (interface graphique)

## Structure de la base de données

### User
- Gestion des utilisateurs (clients et administrateurs)
- Rôles : CLIENT, ADMIN

### Vehicle
- Informations sur les véhicules
- Prix par jour/semaine/mois
- Caractéristiques (carburant, transmission, etc.)
- Images multiples
- Disponibilité

### VehicleAvailability
- Gestion des périodes de disponibilité spécifiques
- Permet de bloquer des dates pour maintenance ou autres raisons

### Booking
- Réservations des clients
- Statuts : PENDING, CONFIRMED, ACTIVE, COMPLETED, CANCELLED
- Calcul automatique du prix total

### Article
- Articles de blog
- Gestion de publication (brouillon/publié)
- Slug pour URLs SEO-friendly





