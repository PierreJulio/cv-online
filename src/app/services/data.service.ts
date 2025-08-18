import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

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
  achievements?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  features?: string[];
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

  private experienceDataSubject = new BehaviorSubject<Experience[]>([]);
  private projectDataSubject = new BehaviorSubject<Project[]>([]);

  constructor() {
    console.log('DataService: Constructor called');
    
    // Initialize with static French data
    this.updateTranslatedData();
  }

  private updateTranslatedData(): void {
    console.log('DataService: Updating translated data');
    
    // Update personal info - now static
    const currentPersonalInfo = this.personalInfoSubject.value;
    this.personalInfoSubject.next({
      ...currentPersonalInfo,
      title: 'Développeur Full-Stack Web & IAM',
      summary: 'Développeur Full-Stack passionné par les technologies web modernes et la sécurité IAM. Spécialisé en .NET Core, Blazor, React et Angular avec une expertise en solutions d\'authentification et d\'autorisation.'
    });

    // Update experience data
    this.experienceDataSubject.next(this.getTranslatedExperiences());

    // Update project data
    this.projectDataSubject.next(this.getTranslatedProjects());
  }

  private getTranslatedExperiences(): Experience[] {
    return [
      {
        id: '1',
        company: 'Albarosa (Mission chez Airbus)',
        position: 'Développeur Full-Stack Web & IAM',
        startDate: '2023-09',
        endDate: null,
        description: 'Développement d\'applications web et participation à des projets IAM pour la sécurisation des applications.',
        technologies: ['Blazor .NET Core', 'SQL Server SSMS', 'OAuth', 'OpenID Connect', 'SAML', 'WordPress', 'Elementor'],
        achievements: [
          'Développement d\'applications IAM pour Airbus',
          'Intégration OAuth et SAML',
          'Gestion de bases de données SQL Server',
          'Création de sites WordPress'
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
          'Développement système de gestion de blanchisserie',
          'Intégration d\'APIs REST',
          'Mise en place CI/CD GitLab'
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
          'Administration site e-commerce',
          'Optimisation UX/UI',
          'Gestion des commandes'
        ]
      }
    ];
  }

  private getTranslatedProjects(): Project[] {
    return [
      {
        id: '1',
        title: 'Friend Ranking APP',
        description: 'Application de classement des amis sur différents paramètres avec interface utilisateur conviviale.',
        image: '/assets/images/project-ranking.svg',
        technologies: ['React', 'Next.js', 'Firebase'],
        liveUrl: 'https://friend-ranking-app.vercel.app',
        githubUrl: 'https://github.com/pierre-julio/friend-ranking',
        features: [
          'Système de classement d\'amis',
          'Interface React moderne',
          'Base de données Firebase',
          'Authentification utilisateur'
        ]
      },
      {
        id: '2',
        title: 'CV Online',
        description: 'CV en ligne interactif avec mode sombre/clair et design responsive.',
        image: '/assets/images/project-angular.svg',
        technologies: ['Angular', 'TypeScript', 'SCSS'],
        liveUrl: 'https://pierre-julio-cv.vercel.app',
        githubUrl: 'https://github.com/pierre-julio/cv-online',
        features: [
          'CV en ligne interactif',
          'Mode sombre/clair',
          'Responsive design',
          'Interface moderne'
        ]
      },
      {
        id: '3',
        title: 'Portfolio Blazor',
        description: 'Portfolio développé avec Blazor Server et .NET Core.',
        image: '/assets/images/project-blazor.svg',
        technologies: ['Blazor', '.NET Core', 'Bootstrap'],
        githubUrl: 'https://github.com/pierre-julio/blazor-portfolio',
        features: [
          'Portfolio Blazor Server',
          'Composants réutilisables',
          'Design Bootstrap',
          'Architecture .NET Core'
        ]
      }
    ];
  }

  // Personal Info
  getPersonalInfo(): Observable<PersonalInfo> {
    return this.personalInfoSubject.asObservable();
  }

  updatePersonalInfo(info: PersonalInfo): void {
    this.personalInfoSubject.next(info);
  }

  // Experience Data
  getExperiences(): Observable<Experience[]> {
    return this.experienceDataSubject.asObservable();
  }

  getExperienceData(): Observable<Experience[]> {
    return this.experienceDataSubject.asObservable();
  }

  updateExperienceData(data: Experience[]): void {
    this.experienceDataSubject.next(data);
  }

  // Project Data
  getProjects(): Observable<Project[]> {
    return this.projectDataSubject.asObservable();
  }

  getProjectData(): Observable<Project[]> {
    return this.projectDataSubject.asObservable();
  }

  updateProjectData(data: Project[]): void {
    this.projectDataSubject.next(data);
  }

  // Skills Data
  getSkills(): Observable<Skill[]> {
    return new BehaviorSubject<Skill[]>([
      { name: '.NET Core', level: 90, category: 'Backend', icon: 'fab fa-microsoft' },
      { name: 'Blazor', level: 85, category: 'Frontend', icon: 'fas fa-fire' },
      { name: 'Angular', level: 80, category: 'Frontend', icon: 'fab fa-angular' },
      { name: 'React', level: 75, category: 'Frontend', icon: 'fab fa-react' },
      { name: 'TypeScript', level: 85, category: 'Language', icon: 'fab fa-js-square' },
      { name: 'C#', level: 90, category: 'Language', icon: 'fas fa-code' },
      { name: 'SQL Server', level: 80, category: 'Database', icon: 'fas fa-database' },
      { name: 'OAuth/OIDC', level: 75, category: 'Security', icon: 'fas fa-shield-alt' }
    ]).asObservable();
  }

  getSkillsData(): Observable<Skill[]> {
    return this.getSkills();
  }

  // Education Data
  getEducation(): Observable<Education[]> {
    return new BehaviorSubject<Education[]>([
      {
        id: '1',
        institution: 'ESIEE-IT',
        degree: 'Master',
        field: 'Expert en Informatique et Systèmes d\'Information',
        startDate: '2022',
        endDate: '2024',
        description: 'Spécialisation en développement web et sécurité informatique'
      },
      {
        id: '2',
        institution: 'IUT Paul Sabatier Toulouse',
        degree: 'DUT',
        field: 'Informatique',
        startDate: '2020',
        endDate: '2022',
        description: 'Formation en programmation et développement logiciel'
      }
    ]).asObservable();
  }

  getEducationData(): Observable<Education[]> {
    return this.getEducation();
  }

  // Languages Data
  getLanguages(): Observable<Language[]> {
    return new BehaviorSubject<Language[]>([
      { name: 'Français', level: 'Natif', proficiency: 100 },
      { name: 'Anglais', level: 'Courant', proficiency: 85 },
      { name: 'Espagnol', level: 'Débutant', proficiency: 30 }
    ]).asObservable();
  }
}
