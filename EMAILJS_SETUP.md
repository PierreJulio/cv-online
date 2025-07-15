# Configuration EmailJS pour le formulaire de contact

## Étapes pour configurer l'envoi d'emails

### 1. Créer un compte EmailJS
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Créez un compte gratuit

### 2. Configurer un service email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez votre fournisseur email (Gmail recommandé)
- Suivez les instructions pour connecter votre compte email

### 3. Créer un template d'email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template comme base :

```
Sujet: Nouveau message de {{from_name}} - {{subject}}

Vous avez reçu un nouveau message depuis votre site web :

Nom: {{from_name}}
Email: {{from_email}}
Sujet: {{subject}}

Message:
{{message}}

---
Envoyé depuis votre CV en ligne
```

### 4. Récupérer vos clés
- **Service ID** : Dans "Email Services", copiez l'ID de votre service
- **Template ID** : Dans "Email Templates", copiez l'ID de votre template
- **Public Key** : Dans "Account" > "General", copiez votre User ID (Public Key)

### 5. Configurer l'application
Modifiez le fichier `src/app/config/emailjs.config.ts` :

```typescript
export const EmailJSConfig = {
  SERVICE_ID: 'votre_service_id',
  TEMPLATE_ID: 'votre_template_id',
  PUBLIC_KEY: 'votre_public_key'
};
```

### 6. Variables du template
Assurez-vous que votre template EmailJS contient ces variables :
- `{{from_name}}` : Nom de l'expéditeur
- `{{from_email}}` : Email de l'expéditeur
- `{{subject}}` : Sujet du message
- `{{message}}` : Contenu du message
- `{{to_email}}` : Votre email de réception (optionnel)

## Mode démo
Si EmailJS n'est pas configuré, l'application fonctionne en mode simulation et affiche un message de confirmation sans envoyer d'email réel.

## Dépannage
- Vérifiez que toutes les clés sont correctement copiées
- Assurez-vous que votre service email est bien connecté
- Consultez la console du navigateur pour les messages d'erreur
- Vérifiez les limites de votre plan EmailJS (100 emails/mois pour le plan gratuit)
