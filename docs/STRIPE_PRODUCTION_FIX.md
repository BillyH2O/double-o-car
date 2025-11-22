# Résolution des problèmes Stripe en production

## Problèmes courants et solutions

### 1. Variables d'environnement manquantes

**Problème** : Stripe fonctionne en localhost mais pas en production.

**Solution** : Vérifiez que toutes les variables d'environnement sont définies sur Vercel :

#### Variables requises sur Vercel :

1. **STRIPE_SECRET_KEY**
   - Mode test : `sk_test_...`
   - Mode production : `sk_live_...`
   - ⚠️ **Important** : Utilisez les clés **LIVE** en production, pas les clés TEST

2. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
   - Mode test : `pk_test_...`
   - Mode production : `pk_live_...`
   - ⚠️ **Important** : Utilisez les clés **LIVE** en production

3. **NEXT_PUBLIC_APP_URL**
   - Doit être l'URL complète de votre site en production
   - Exemple : `https://votre-domaine.com`
   - ⚠️ **Important** : Pas de slash à la fin

#### Comment ajouter les variables sur Vercel :

1. Allez sur votre projet Vercel
2. **Settings** > **Environment Variables**
3. Ajoutez chaque variable :
   - `STRIPE_SECRET_KEY` = votre clé secrète Stripe (mode LIVE)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = votre clé publique Stripe (mode LIVE)
   - `NEXT_PUBLIC_APP_URL` = `https://votre-domaine.com` (sans slash final)

### 2. Clés Stripe en mode TEST vs LIVE

**Problème** : Vous utilisez les clés de test en production.

**Solution** :
- En **local** : Utilisez les clés `sk_test_...` et `pk_test_...`
- En **production** : Utilisez les clés `sk_live_...` et `pk_live_...`

**Où trouver les clés LIVE** :
1. Connectez-vous au [Dashboard Stripe](https://dashboard.stripe.com)
2. Assurez-vous d'être en mode **"Live mode"** (toggle en haut à droite)
3. Allez dans **Developers** > **API keys**
4. Copiez les clés **Live** (pas les clés Test)

### 3. Domaines autorisés dans Stripe

**Problème** : Votre domaine n'est pas autorisé dans Stripe.

**Solution** :
1. Allez dans le [Dashboard Stripe](https://dashboard.stripe.com)
2. **Settings** > **Domains**
3. Ajoutez votre domaine de production (ex: `votre-domaine.com`)

### 4. Webhooks Stripe (optionnel mais recommandé)

Pour une meilleure gestion des paiements, configurez les webhooks :

1. Allez dans **Developers** > **Webhooks** dans le Dashboard Stripe
2. Cliquez sur **Add endpoint**
3. URL : `https://votre-domaine.com/api/webhooks/stripe`
4. Sélectionnez les événements :
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copiez le **Signing secret** et ajoutez-le comme variable :
   - `STRIPE_WEBHOOK_SECRET` = `whsec_...`

### 5. Vérification de la configuration

Pour vérifier que tout est bien configuré, ajoutez des logs temporaires :

```typescript
// Dans app/api/checkout/create/route.ts
console.log('Base URL:', getBaseUrl())
console.log('Stripe key exists:', !!process.env.STRIPE_SECRET_KEY)
console.log('Stripe key starts with:', process.env.STRIPE_SECRET_KEY?.substring(0, 7))
```

**Vérifications** :
- `Base URL` doit être votre URL de production (pas localhost)
- `Stripe key exists` doit être `true`
- `Stripe key starts with` doit être `sk_live` en production (pas `sk_test`)

### 6. Redéploiement après modification des variables

⚠️ **Important** : Après avoir ajouté/modifié des variables d'environnement sur Vercel, vous devez **redéployer** votre application.

1. Allez dans **Deployments**
2. Cliquez sur les **3 points** du dernier déploiement
3. Sélectionnez **Redeploy**

## Checklist de dépannage

- [ ] Variables d'environnement définies sur Vercel
- [ ] Clés Stripe en mode **LIVE** (pas TEST)
- [ ] `NEXT_PUBLIC_APP_URL` défini avec l'URL de production (sans slash final)
- [ ] Domaine ajouté dans Stripe Dashboard
- [ ] Application redéployée après modification des variables
- [ ] Vérification des logs Vercel pour les erreurs

## Erreurs courantes et solutions

### "STRIPE_SECRET_KEY is not set"
→ Ajoutez la variable `STRIPE_SECRET_KEY` sur Vercel

### "Invalid API Key provided"
→ Vérifiez que vous utilisez les clés **LIVE** en production

### Redirection vers localhost après paiement
→ Vérifiez que `NEXT_PUBLIC_APP_URL` est bien défini avec l'URL de production

### Session Stripe non trouvée
→ Vérifiez que les clés Stripe correspondent (même mode : test ou live)

