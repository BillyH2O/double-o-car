# Configuration Stripe

Ce document explique comment configurer Stripe pour le système de paiement.

## Variables d'environnement requises

Ajoutez les variables suivantes dans votre fichier `.env` :

```env
# Stripe Secret Key (côté serveur)
STRIPE_SECRET_KEY=sk_test_...

# Stripe Publishable Key (côté client)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# URL de base de l'application (pour les URLs de retour Stripe)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Où obtenir les clés Stripe

1. Créez un compte sur [Stripe](https://stripe.com)
2. Accédez au [Dashboard Stripe](https://dashboard.stripe.com)
3. Allez dans **Developers** > **API keys**
4. Copiez :
   - **Secret key** → `STRIPE_SECRET_KEY`
   - **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## Mode test vs production

- **Mode test** : Utilisez les clés commençant par `sk_test_` et `pk_test_`
- **Mode production** : Utilisez les clés commençant par `sk_live_` et `pk_live_`

## Migration de la base de données

Après avoir mis à jour le schéma Prisma, exécutez :

```bash
npm run db:push
# ou
npm run db:migrate
```

Cela ajoutera les champs suivants à la table `bookings` :
- `stripePaymentIntentId`
- `stripeCheckoutSessionId`

## Fonctionnement

1. L'utilisateur clique sur "Réserver ce véhicule"
2. Une session Stripe Checkout est créée via `/api/checkout/create`
3. L'utilisateur est redirigé vers Stripe pour le paiement
4. Après le paiement, Stripe redirige vers `/checkout/success`
5. La page success finalise la réservation via `/api/checkout/finalize`

## Webhooks (optionnel)

Pour une meilleure gestion des paiements, vous pouvez configurer des webhooks Stripe :

1. Allez dans **Developers** > **Webhooks** dans le Dashboard Stripe
2. Ajoutez une URL : `https://votre-domaine.com/api/webhooks/stripe`
3. Sélectionnez les événements : `checkout.session.completed`, `payment_intent.succeeded`
4. Copiez le **Signing secret** dans `STRIPE_WEBHOOK_SECRET`

