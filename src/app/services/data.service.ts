import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  dateOfBirth: string;
  summary: string;
  profileImage: string;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
  icon?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  grade?: string;
  description?: string;
}

export interface Language {
  name: string;
  level: string;
  proficiency: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private personalInfoSubject = new BehaviorSubject<PersonalInfo>({
    name: 'Pierre JULIO',
    firstName: 'Pierre',
    lastName: 'JULIO',
    title: 'Développeur Full-Stack Web & IAM',
    email: 'pierre.julio2024@gmail.com',
    phone: '+33 7 82 14 12 85',
    location: 'Labège, France',
    dateOfBirth: '2001-11-20',
    summary: 'Développeur Full-Stack passionné par les technologies web modernes et la sécurité IAM. Spécialisé en .NET Core, Blazor, React et Angular avec une expertise en solutions d\'authentification et d\'autorisation.',
    profileImage: '/assets/images/pierre-julio-profile.jpg',
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/pierre-julio', icon: 'fab fa-linkedin' },
      { platform: 'GitHub', url: 'https://github.com/pierre-julio', icon: 'fab fa-github' }
    ]
  });

  private experiencesSubject = new BehaviorSubject<Experience[]>([
    {
      id: '1',
      company: 'Albarosa (Mission chez Airbus)',
      position: 'Développeur Full-Stack Web & IAM',
      startDate: '2023-09',
      endDate: null,
      description: 'Développement d\'applications web et participation à des projets IAM pour la sécurisation des applications.',
      technologies: ['Blazor .NET Core', 'SQL Server SSMS', 'OAuth', 'OpenID Connect', 'SAML', 'WordPress', 'Elementor'],
      achievements: [
        'Participation à des projets IAM (Airbus) pour la sécurisation des applications web',
        'Développement et optimisation d\'applications en Blazor .NET Core',
        'Gestion des bases de données sous SQL Server SSMS',
        'Conception d\'un site vitrine pour une couturière sous WordPress + Elementor'
      ]
    },
    {
      id: '2',
      company: 'Albarosa',
      position: 'Alternant - Développeur d\'Applications Web',
      startDate: '2022-09',
      endDate: '2023-09',
      description: 'Conception et développement d\'applications web avec intégration d\'API et automatisation.',
      technologies: ['Blazor', '.NET Core', 'API REST', 'GitLab CI/CD'],
      achievements: [
        'Conception et développement du système Laundry Order System avec Angular et .NET Core',
        'Intégration d\'API REST et automatisation des traitements',
        'Implémentation de CI/CD sur GitLab pour le déploiement automatisé'
      ]
    },
    {
      id: '3',
      company: 'Euroloisirs81',
      position: 'Stagiaire - Gestion Site E-Commerce',
      startDate: '2021-10',
      endDate: '2021-12',
      description: 'Administration et optimisation d\'un site e-commerce avec amélioration de l\'expérience utilisateur.',
      technologies: ['E-commerce', 'UX/UI', 'Administration web'],
      achievements: [
        'Administration et mise à jour du catalogue produit d\'un site e-commerce',
        'Optimisation de l\'ergonomie et de l\'expérience utilisateur (+20% d\'engagement)',
        'Gestion des commandes et suivi des transactions'
      ]
    },
    {
      id: '4',
      company: 'ER Agency',
      position: 'Stagiaire - Création de Site Vitrine',
      startDate: '2020-01',
      endDate: '2020-02',
      description: 'Conception et développement d\'un site vitrine responsive avec optimisation SEO.',
      technologies: ['WordPress', 'Elementor', 'SEO'],
      achievements: [
        'Conception et développement d\'un site vitrine responsive sous WordPress + Elementor',
        'Optimisation SEO pour un meilleur référencement naturel'
      ]
    }
  ]);

  private projectsSubject = new BehaviorSubject<Project[]>([
    {
      id: '1',
      title: 'Friend Ranking APP',
      description: 'Application de classement des amis sur différents paramètres avec interface utilisateur conviviale.',
      image: '/assets/images/project-ranking.svg',
      technologies: ['React', 'Next.js', 'Firebase'],
      liveUrl: 'https://friend-ranking-app.vercel.app',
      githubUrl: 'https://github.com/pierre-julio/friend-ranking',
      features: [
        'Classement des amis sur différents paramètres',
        'Interface utilisateur conviviale',
        'Conception réactive',
        'Authentification Firebase'
      ]
    },
    {
      id: '2',
      title: 'Pactify',
      description: 'Application de gestion des engagements avec support multi-participants et chat en temps réel.',
      image: '/assets/images/project-pactify.svg',
      technologies: ['Flutter', 'Firebase'],
      liveUrl: 'https://pactify-kappa.vercel.app/',
      githubUrl: 'https://github.com/pierre-julio/pactify',
      features: [
        'Création de pactes avec termes spécifiques',
        'Support multi-participants',
        'Chat en temps réel',
        'Signalement des transgressions'
      ]
    },
    {
      id: '3',
      title: 'Laundry Order System',
      description: 'Système de gestion de commandes pour pressing/laverie avec interface d\'administration complète.',
      image: '/assets/images/project-laundry.svg',
      technologies: ['Angular', '.NET Core', 'PrimeNG', 'Entity Framework'],
      liveUrl: 'https://laundry-order-system.vercel.app/login',
      githubUrl: 'https://github.com/PierreJulio/LaundryOrderSystem',
      features: [
        'Gestion des commandes de pressing',
        'Interface d\'administration',
        'Système de statuts des commandes',
        'Gestion des clients et services'
      ]
    }
  ]);

  private skillsSubject = new BehaviorSubject<Skill[]>([
    // Langages & Frameworks
    { name: '.NET Core', level: 100, category: 'Frontend', icon: 'fas fa-code' },
    { name: 'Blazor', level: 100, category: 'Frontend', icon: 'fas fa-fire' },
    { name: 'React', level: 70, category: 'Frontend', icon: 'fab fa-react' },
    { name: 'Next.js', level: 75, category: 'Frontend', icon: 'fas fa-arrow-right' },
    { name: 'Angular', level: 80, category: 'Frontend', icon: 'fab fa-angular' },
    { name: 'Node.js', level: 75, category: 'Backend', icon: 'fab fa-node-js' },
    { name: 'Flutter', level: 50, category: 'Frontend', icon: 'fas fa-mobile-alt' },

    // Bases de données
    { name: 'SQL Server SSMS', level: 90, category: 'Backend', icon: 'fas fa-database' },
    { name: 'Firebase', level: 60, category: 'Backend', icon: 'fas fa-fire' },
    { name: 'Entity Framework', level: 100, category: 'Backend', icon: 'fas fa-sitemap' },

    // Sécurité & IAM
    { name: 'OAuth', level: 80, category: 'Backend', icon: 'fas fa-shield-alt' },
    { name: 'OpenID Connect', level: 85, category: 'Backend', icon: 'fas fa-key' },
    { name: 'SAML', level: 85, category: 'Backend', icon: 'fas fa-lock' },
    { name: 'JWT', level: 100, category: 'Backend', icon: 'fas fa-certificate' },

    // Outils & Technologies
    { name: 'Docker', level: 85, category: 'Tools', icon: 'fab fa-docker' },
    { name: 'Git', level: 70, category: 'Tools', icon: 'fab fa-git-alt' },
    { name: 'GitHub', level: 90, category: 'Tools', icon: 'fab fa-github' },
    { name: 'GitLab', level: 40, category: 'Tools', icon: 'fab fa-gitlab' },
    { name: 'WordPress', level: 80, category: 'Tools', icon: 'fab fa-wordpress' },
    { name: 'Elementor', level: 80, category: 'Tools', icon: 'fas fa-puzzle-piece' },
    { name: 'API REST', level: 100, category: 'Backend', icon: 'fas fa-exchange-alt' },
    { name: 'GraphQL', level: 50, category: 'Backend', icon: 'fas fa-project-diagram' },
    { name: 'SEO', level: 70, category: 'Tools', icon: 'fas fa-search' }
  ]);

  private educationSubject = new BehaviorSubject<Education[]>([
    {
      id: '1',
      institution: 'IUT Paul Sabatier',
      degree: 'Licence professionnelle DReAM',
      field: 'Design et Réalisation d\'Application Mobile et Web',
      startDate: '2022-09',
      endDate: '2023-09',
      description: 'Spécialisation en développement d\'applications mobiles et web, design UX/UI.'
    },
    {
      id: '2',
      institution: 'Lycée Louis Rascol',
      degree: 'BTS Système Numérique',
      field: 'Système Numérique (Informatique et Réseaux)',
      startDate: '2020-09',
      endDate: '2022-09',
      description: 'Formation en informatique et réseaux, développement d\'applications.'
    },
    {
      id: '3',
      institution: 'Lycée Louis Rascol',
      degree: 'Bac STI2D',
      field: 'SIN (Système d\'Information et Numérique)',
      startDate: '2019-09',
      endDate: '2020-09',
      description: 'Spécialisation en systèmes d\'information et numérique.'
    }
  ]);

  private languagesSubject = new BehaviorSubject<Language[]>([
    { name: 'Français', level: 'Langue maternelle', proficiency: 100 },
    { name: 'Anglais', level: 'Intermédiaire', proficiency: 60 }
  ]);

  constructor() {}

  // Personal Info
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.personalInfoSubject.asObservable();
  }

  updatePersonalInfo(info: PersonalInfo): void {
    this.personalInfoSubject.next(info);
  }

  // Experiences
  getExperiences(): Observable<Experience[]> {
    return this.experiencesSubject.asObservable();
  }

  getExperienceById(id: string): Observable<Experience | undefined> {
    return of(this.experiencesSubject.value.find(exp => exp.id === id));
  }

  // Projects
  getProjects(): Observable<Project[]> {
    return this.projectsSubject.asObservable();
  }

  getFeaturedProjects(): Observable<Project[]> {
    return of(this.projectsSubject.value.slice(0, 3));
  }

  getProjectById(id: string): Observable<Project | undefined> {
    return of(this.projectsSubject.value.find(project => project.id === id));
  }

  // Skills
  getSkills(): Observable<Skill[]> {
    return this.skillsSubject.asObservable();
  }

  getSkillsByCategory(category: string): Observable<Skill[]> {
    return of(this.skillsSubject.value.filter(skill => skill.category === category));
  }

  // Education
  getEducation(): Observable<Education[]> {
    return this.educationSubject.asObservable();
  }

  // Languages
  getLanguages(): Observable<Language[]> {
    return this.languagesSubject.asObservable();
  }

  // Utility methods
  getYearsOfExperience(): number {
    const experiences = this.experiencesSubject.value;
    if (experiences.length === 0) return 0;
    
    const oldestExperience = experiences.sort((a, b) => 
      new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )[0];
    
    const startYear = new Date(oldestExperience.startDate).getFullYear();
    const currentYear = new Date().getFullYear();
    
    return currentYear - startYear;
  }

  getTotalProjects(): number {
    return this.projectsSubject.value.length;
  }

  getCompletedProjects(): number {
    return this.projectsSubject.value.filter(project => project.liveUrl).length;
  }
}
