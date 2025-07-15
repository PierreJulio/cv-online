// Configuration EmailJS
// Vous devez créer un compte sur https://www.emailjs.com/
// et remplacer ces valeurs par vos propres clés

export const EmailJSConfig = {
  // Service ID de votre service email (Gmail, Outlook, etc.)
  SERVICE_ID: 'service_hfoqinm',
  
  // Template ID de votre template d'email
  TEMPLATE_ID: 'template_ump1cwg',
  
  // Votre clé publique EmailJS
  PUBLIC_KEY: 'if2UJ7t881iVGF9K1'
};

/* 
INSTRUCTIONS POUR CONFIGURER EMAILJS :

1. Créez un compte sur https://www.emailjs.com/
2. Connectez votre service email (Gmail recommandé)
3. Votre template utilise ces variables :
   - {{title}} : Sujet du message
   - {{name}} : Nom de l'expéditeur
   - {{time}} : Date et heure d'envoi (généré automatiquement)
   - {{message}} : Contenu du message (inclut l'email de l'expéditeur)

4. Vos clés sont déjà configurées :
   - Service ID : service_hfoqinm
   - Template ID : template_ump1cwg
   - Public Key : if2UJ7t881iVGF9K1

5. Votre template actuel :
   Contact Us: {{title}}
   Message de {{name}} reçu le {{time}}
   Contenu: {{message}}
   
   Le formulaire envoie automatiquement l'email de contact dans le message.
*/
