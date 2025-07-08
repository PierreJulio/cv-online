import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

export type Language = 'fr' | 'en';

export interface TranslationData {
  [key: string]: string | TranslationData;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLanguageSubject = new BehaviorSubject<Language>('fr');
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  private translations: Record<Language, TranslationData> = {
    fr: {
      // Navigation
      nav: {
        home: 'Accueil',
        about: 'À propos',
        experience: 'Expérience',
        skills: 'Compétences',
        projects: 'Projets',
        contact: 'Contact'
      },

      // Header
      header: {
        language: 'Changer de langue',
        theme: 'Changer le thème',
        export: 'Exporter en PDF'
      },

      // Hero Section
      hero: {
        greeting: 'Salut, je suis',
        title: 'Développeur Full Stack',
        subtitle: 'Passionné par les technologies web modernes',
        description: 'Je crée des applications web innovantes et performantes avec Angular, Node.js et les dernières technologies.',
        downloadCV: 'Télécharger CV',
        contactMe: 'Me contacter',
        scrollDown: 'Défiler vers le bas',
        yearsExperience: 'années d\'expérience',
        projectsCompleted: 'projets réalisés',
        clientsSatisfied: 'clients satisfaits'
      },

      // About Section
      about: {
        title: 'À propos de moi',
        subtitle: 'Découvrez mon parcours',
        description: 'Développeur passionné avec plus de 5 années d\'expérience dans le développement web. Je me spécialise dans la création d\'applications modernes, performantes et user-friendly.',
        age: 'Âge',
        location: 'Localisation',
        email: 'Email',
        phone: 'Téléphone',
        languages: 'Langues',
        downloadCV: 'Télécharger mon CV'
      },

      // Experience Section
      experience: {
        title: 'Expérience',
        subtitle: 'Mon parcours professionnel',
        current: 'Actuel',
        achievements: 'Réalisations',
        technologies: 'Technologies utilisées'
      },

      // Skills Section
      skills: {
        title: 'Compétences',
        subtitle: 'Mes technologies de prédilection',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Outils & Technologies',
        level: 'Niveau',
        years: 'ans'
      },

      // Projects Section
      projects: {
        title: 'Projets',
        subtitle: 'Mes réalisations récentes',
        viewLive: 'Voir le site',
        viewCode: 'Voir le code',
        technologies: 'Technologies',
        features: 'Fonctionnalités',
        loadMore: 'Voir plus de projets'
      },

      // Contact Section
      contact: {
        title: 'Contact',
        subtitle: 'Discutons de votre projet',
        description: 'Vous avez un projet en tête ? N\'hésitez pas à me contacter pour en discuter.',
        name: 'Nom',
        email: 'Email',
        subject: 'Sujet',
        message: 'Message',
        send: 'Envoyer',
        sending: 'Envoi en cours...',
        success: 'Message envoyé avec succès !',
        error: 'Erreur lors de l\'envoi du message.',
        nameRequired: 'Le nom est requis',
        emailRequired: 'L\'email est requis',
        emailInvalid: 'L\'email n\'est pas valide',
        subjectRequired: 'Le sujet est requis',
        messageRequired: 'Le message est requis',
        getInTouch: 'Restons en contact',
        location: 'Localisation',
        phone: 'Téléphone',
        availability: 'Disponibilité'
      },

      // Footer
      footer: {
        description: 'Développeur Full Stack passionné par les technologies web modernes.',
        quickLinks: 'Liens rapides',
        social: 'Réseaux sociaux',
        contact: 'Contact',
        rights: 'Tous droits réservés.',
        madeWith: 'Fait avec',
        and: 'et'
      },

      // Common
      common: {
        loading: 'Chargement...',
        error: 'Une erreur est survenue',
        retry: 'Réessayer',
        close: 'Fermer',
        save: 'Sauvegarder',
        cancel: 'Annuler',
        confirm: 'Confirmer',
        yes: 'Oui',
        no: 'Non',
        backToTop: 'Retour en haut',
        readMore: 'Lire la suite',
        showLess: 'Réduire'
      },

      // Languages
      languages: {
        title: 'Langues',
        french: 'Français',
        english: 'Anglais',
        spanish: 'Espagnol',
        levels: {
          native: 'Natif',
          fluent: 'Courant',
          intermediate: 'Intermédiaire',
          beginner: 'Débutant'
        }
      },

      // Theme
      theme: {
        toggleDark: 'Mode sombre',
        toggleLight: 'Mode clair'
      }
    },

    en: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        experience: 'Experience',
        skills: 'Skills',
        projects: 'Projects',
        contact: 'Contact'
      },

      // Header
      header: {
        language: 'Change language',
        theme: 'Change theme',
        export: 'Export to PDF'
      },

      // Hero Section
      hero: {
        greeting: 'Hi, I\'m',
        title: 'Full Stack Developer',
        subtitle: 'Passionate about modern web technologies',
        description: 'I create innovative and performant web applications with Angular, Node.js and cutting-edge technologies.',
        downloadCV: 'Download CV',
        contactMe: 'Contact Me',
        scrollDown: 'Scroll Down',
        yearsExperience: 'years of experience',
        projectsCompleted: 'projects completed',
        clientsSatisfied: 'satisfied clients'
      },

      // About Section
      about: {
        title: 'About Me',
        subtitle: 'Discover my journey',
        description: 'Passionate developer with over 5 years of experience in web development. I specialize in creating modern, performant and user-friendly applications.',
        age: 'Age',
        location: 'Location',
        email: 'Email',
        phone: 'Phone',
        languages: 'Languages',
        downloadCV: 'Download my CV'
      },

      // Experience Section
      experience: {
        title: 'Experience',
        subtitle: 'My professional journey',
        current: 'Current',
        achievements: 'Achievements',
        technologies: 'Technologies used'
      },

      // Skills Section
      skills: {
        title: 'Skills',
        subtitle: 'My favorite technologies',
        frontend: 'Frontend',
        backend: 'Backend',
        tools: 'Tools & Technologies',
        level: 'Level',
        years: 'years'
      },

      // Projects Section
      projects: {
        title: 'Projects',
        subtitle: 'My recent achievements',
        viewLive: 'View Live',
        viewCode: 'View Code',
        technologies: 'Technologies',
        features: 'Features',
        loadMore: 'Load More Projects'
      },

      // Contact Section
      contact: {
        title: 'Contact',
        subtitle: 'Let\'s discuss your project',
        description: 'Have a project in mind? Don\'t hesitate to contact me to discuss it.',
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message.',
        nameRequired: 'Name is required',
        emailRequired: 'Email is required',
        emailInvalid: 'Email is not valid',
        subjectRequired: 'Subject is required',
        messageRequired: 'Message is required',
        getInTouch: 'Get In Touch',
        location: 'Location',
        phone: 'Phone',
        availability: 'Availability'
      },

      // Footer
      footer: {
        description: 'Full Stack Developer passionate about modern web technologies.',
        quickLinks: 'Quick Links',
        social: 'Social Media',
        contact: 'Contact',
        rights: 'All rights reserved.',
        madeWith: 'Made with',
        and: 'and'
      },

      // Common
      common: {
        loading: 'Loading...',
        error: 'An error occurred',
        retry: 'Retry',
        close: 'Close',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        yes: 'Yes',
        no: 'No',
        backToTop: 'Back to Top',
        readMore: 'Read More',
        showLess: 'Show Less'
      },

      // Languages
      languages: {
        title: 'Languages',
        french: 'French',
        english: 'English',
        spanish: 'Spanish',
        levels: {
          native: 'Native',
          fluent: 'Fluent',
          intermediate: 'Intermediate',
          beginner: 'Beginner'
        }
      },

      // Theme
      theme: {
        toggleDark: 'Dark mode',
        toggleLight: 'Light mode'
      }
    }
  };

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadLanguageFromStorage();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  setLanguage(language: Language): void {
    this.currentLanguageSubject.next(language);
    this.saveLanguageToStorage(language);
  }

  toggleLanguage(): void {
    const currentLang = this.getCurrentLanguage();
    const newLang: Language = currentLang === 'fr' ? 'en' : 'fr';
    this.setLanguage(newLang);
  }

  translate(key: string): string {
    const currentLang = this.getCurrentLanguage();
    const keys = key.split('.');
    let value: any = this.translations[currentLang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key "${key}" not found for language "${currentLang}"`);
        return key; // Return the key itself if translation not found
      }
    }

    return typeof value === 'string' ? value : key;
  }

  getTranslation(key: string, language?: Language): string {
    const lang = language || this.getCurrentLanguage();
    const keys = key.split('.');
    let value: any = this.translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  }

  // Check if a translation exists
  hasTranslation(key: string, language?: Language): boolean {
    const lang = language || this.getCurrentLanguage();
    const keys = key.split('.');
    let value: any = this.translations[lang];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return false;
      }
    }

    return typeof value === 'string';
  }

  // Get all available languages
  getAvailableLanguages(): Language[] {
    return Object.keys(this.translations) as Language[];
  }

  // Get language display name
  getLanguageDisplayName(language: Language): string {
    const displayNames: Record<Language, string> = {
      fr: 'Français',
      en: 'English'
    };
    return displayNames[language] || language;
  }

  private loadLanguageFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const savedLanguage = localStorage.getItem('cv-language') as Language;
        if (savedLanguage && this.getAvailableLanguages().includes(savedLanguage)) {
          this.currentLanguageSubject.next(savedLanguage);
        } else {
          // Default to browser language if available
          const browserLang = navigator.language.split('-')[0] as Language;
          if (this.getAvailableLanguages().includes(browserLang)) {
            this.currentLanguageSubject.next(browserLang);
          }
        }
      } catch (error) {
        console.warn('Error loading language from localStorage:', error);
      }
    }
  }

  private saveLanguageToStorage(language: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem('cv-language', language);
      } catch (error) {
        console.warn('Error saving language to localStorage:', error);
      }
    }
  }
}
