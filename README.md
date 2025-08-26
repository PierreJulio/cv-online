# 🚀 CV Online - Portfolio Web Moderne

[![Angular](https://img.shields.io/badge/Angular-20.0-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://pierre-julio-cv.vercel.app/)

> 🌟 **Un CV en ligne moderne et interactif** - Site web portfolio professionnel développé avec Angular 20, présentant les compétences, l'expérience et les projets d'un développeur Full-Stack.

**🔗 [Voir le site en direct →](https://pierre-julio-cv.vercel.app/)**

---

## 📋 Table des Matières

- [🎯 Aperçu](#-aperçu)
- [✨ Fonctionnalités](#-fonctionnalités)
- [🛠️ Technologies Utilisées](#️-technologies-utilisées)
- [🚀 Installation & Démarrage](#-installation--démarrage)
- [⚙️ Configuration](#️-configuration)
- [🎨 Personnalisation](#-personnalisation)
- [📦 Déploiement](#-déploiement)
- [📧 Contact](#-contact)
- [📝 Licence](#-licence)

---

## 🎯 Aperçu

Ce projet est un **CV en ligne moderne et interactif** conçu pour présenter de manière professionnelle les compétences, l'expérience et les réalisations d'un développeur. Il offre une expérience utilisateur fluide avec des animations élégantes et un design responsive.

### 🌟 Points Forts
- **Design Modern & Responsive** - Interface adaptée à tous les appareils
- **Animations Fluides** - Transitions et effets visuels soignés
- **Performance Optimisée** - Rendu côté serveur (SSR) avec Angular Universal
- **Formulaire de Contact Fonctionnel** - Intégration EmailJS pour l'envoi d'emails
- **Téléchargement CV** - Export PDF automatique disponible
- **SEO Optimisé** - Métadonnées et structure optimisées pour les moteurs de recherche

---

## ✨ Fonctionnalités

### 🏠 **Section Hero**
- Présentation personnelle avec photo de profil
- Statistiques dynamiques (années d'expérience, projets réalisés)
- Liens vers profils professionnels (Malt, LinkedIn, GitHub)
- Animation de code en arrière-plan

### 💼 **Expérience Professionnelle**
- Timeline interactive des expériences
- Détails des missions et technologies utilisées
- Liens vers les entreprises et projets

### 🛠️ **Compétences Techniques**
- Catégorisation par domaine (Frontend, Backend, Tools)
- Barres de progression animées
- Icônes et niveaux de maîtrise
- Résumé statistique des compétences

### 🚀 **Projets Réalisés**
- Portfolio des projets principaux
- Technologies utilisées pour chaque projet
- Liens vers démos et code source
- Images et descriptions détaillées

### 📬 **Contact**
- Formulaire de contact fonctionnel avec EmailJS
- Validation en temps réel des champs
- Informations de contact direct
- Téléchargement de vCard
- Liens vers les réseaux sociaux

### 📱 **Responsive Design**
- Adapté mobile, tablette et desktop
- Navigation fluide entre les sections
- Bouton "retour en haut" animé

---

## 🛠️ Technologies Utilisées

### **Frontend**
- **Angular 20** - Framework principal avec SSR
- **TypeScript 5.8** - Langage de développement
- **Bootstrap 5.3** - Framework CSS responsive
- **SCSS** - Préprocesseur CSS pour les styles
- **Font Awesome 6.7** - Icônes vectorielles

### **Fonctionnalités**
- **EmailJS** - Envoi d'emails via le formulaire de contact
- **html2canvas & jsPDF** - Génération de PDF
- **RxJS** - Programmation réactive
- **Angular Animations** - Animations et transitions

### **Développement & Build**
- **Angular CLI 20** - Outils de développement
- **Karma & Jasmine** - Tests unitaires
- **Express** - Serveur pour le SSR
- **Vercel** - Hébergement et déploiement

---

## 🚀 Installation & Démarrage

### **Prérequis**
- **Node.js** 18+ et **npm** 9+
- **Git** pour le clonage du repository

### **1. Clonage du Projet**
```bash
git clone https://github.com/PierreJulio/cv-online.git
cd cv-online
```

### **2. Installation des Dépendances**
```bash
npm install
```

### **3. Démarrage du Serveur de Développement**
```bash
npm start
# ou
ng serve
```

Le site sera accessible à l'adresse : **http://localhost:4200/**

### **4. Build de Production**
```bash
npm run build
```

Les fichiers de build seront générés dans le dossier `dist/`.

---

## ⚙️ Configuration

### **📧 Configuration EmailJS (Formulaire de Contact)**

Pour activer l'envoi d'emails via le formulaire de contact :

1. **Créer un compte** sur [EmailJS](https://www.emailjs.com/)
2. **Configurer un service email** (Gmail recommandé)
3. **Créer un template d'email** avec les variables : `{{title}}`, `{{name}}`, `{{time}}`, `{{message}}`
4. **Récupérer vos clés** :
   - Service ID
   - Template ID  
   - Public Key

5. **Modifier le fichier de configuration** :
```typescript
// src/app/config/emailjs.config.ts
export const EmailJSConfig = {
  SERVICE_ID: 'votre_service_id',
  TEMPLATE_ID: 'votre_template_id', 
  PUBLIC_KEY: 'votre_public_key'
};
```

📖 **Guide détaillé** : Consultez [EMAILJS_SETUP.md](EMAILJS_SETUP.md) pour des instructions complètes.

---

## 🎨 Personnalisation

### **📝 Modification du Contenu**
Les données du CV sont gérées via le service `DataService` :
```typescript
// src/app/services/data.service.ts
```

### **🎨 Personnalisation du Design**
- **Couleurs** : Modifiez les variables SCSS dans `src/styles.scss`
- **Typographie** : Changez les polices dans `src/index.html`
- **Layout** : Ajustez les composants dans `src/app/components/`

### **📄 Remplacement du CV PDF**
Remplacez le fichier : `public/assets/documents/Pierre_Julio_CV.pdf`

### **🖼️ Images**
- **Photo de profil** : `public/assets/images/pierre-julio-profile.jpg`
- **Images de projets** : `public/assets/images/project-*.svg`

---

## 📦 Déploiement

### **🚀 Déploiement sur Vercel (Recommandé)**
```bash
npm install -g vercel
vercel --prod
```

### **🐳 Docker**
```bash
# Build de l'image
docker build -t cv-online .

# Lancement du conteneur
docker run -p 4000:4000 cv-online
```

### **🌐 Autres Plateformes**
- **Netlify** : Build command `npm run build`, Publish directory `dist/cv-online`
- **GitHub Pages** : Utilisez `angular-cli-ghpages`
- **Firebase Hosting** : `ng deploy @angular/fire`

---

## 🛠️ Commandes Disponibles

```bash
# Développement
npm start              # Démarrer le serveur de développement
npm run build          # Build de production
npm run watch          # Build en mode watch
npm test               # Lancer les tests unitaires

# Server-Side Rendering
npm run build:ssr      # Build avec SSR
npm run serve:ssr      # Servir l'application SSR

# Qualité du code
npm run lint           # Vérifier le code avec ESLint
npm run format         # Formater le code avec Prettier
```

---

## 📧 Contact

**Pierre JULIO** - Développeur Web & Mobile  
📧 Email: [pierre.julio2024@gmail.com](mailto:pierre.julio2024@gmail.com)  
💼 LinkedIn: [pierre-julio](https://linkedin.com/in/pierre-julio)  
🐱 GitHub: [PierreJulio](https://github.com/PierreJulio)  
🌐 Portfolio: [pierre-julio-cv.vercel.app](https://pierre-julio-cv.vercel.app/)

---

## 📝 Licence

Ce projet est sous licence **MIT**. Vous êtes libre de l'utiliser, le modifier et le distribuer selon les termes de cette licence.

---

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
- 🐛 Signaler des bugs
- 💡 Proposer des améliorations  
- 🔧 Soumettre des pull requests
- ⭐ Donner une étoile au projet si il vous plaît !

---

<div align="center">

**⭐ Si ce projet vous a plu, n'hésitez pas à lui donner une étoile !**

[![Made with ❤️ by Pierre JULIO](https://img.shields.io/badge/Made%20with%20❤️%20by-Pierre%20JULIO-red?style=for-the-badge)](https://pierre-julio-cv.vercel.app/)

</div>
