import { Component, OnInit, OnDestroy, HostListener, Inject, AfterViewInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

// Import components
import { Header } from './components/header/header';
import { Hero } from './components/hero/hero';
import { Experience } from './components/experience/experience';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

// Import services
import { DataService, PersonalInfo, Language, Skill } from './services/data.service';
import { ThemeService } from './services/theme.service';

interface AboutDetail {
  label: string;
  value: string;
}

interface SkillCategory {
  key: string;
  skills: Skill[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Hero,
    Experience,
    Skills,
    Projects,
    Contact,
    Footer
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  protected title = 'cv-online';
  
  private destroy$ = new Subject<void>();
  
  personalInfo: PersonalInfo | null = null;
  languages: Language[] = [];
  aboutDetails: AboutDetail[] = [];
  skillCategories: SkillCategory[] = [];
  showBackToTop = false;
  isLoading = false;

  constructor(
    private dataService: DataService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    // Load personal info
    this.dataService.getPersonalInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(info => {
        this.personalInfo = info;
        this.setupAboutDetails();
      });

    // Load languages
    this.dataService.getLanguages()
      .pipe(takeUntil(this.destroy$))
      .subscribe(languages => {
        this.languages = languages;
      });

    // Load skills for categories
    this.dataService.getSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe(skills => {
        this.skillCategories = [
          { key: 'frontend', skills: skills.filter((s: any) => s.category === 'Frontend') },
          { key: 'backend', skills: skills.filter((s: any) => s.category === 'Backend') },
          { key: 'tools', skills: skills.filter((s: any) => s.category === 'Tools') }
        ];
      });
  }

  private setupAboutDetails(): void {
    if (this.personalInfo) {
      this.aboutDetails = [
        { label: 'Âge', value: this.calculateAge().toString() },
        { label: 'Localisation', value: this.personalInfo.location },
        { label: 'Email', value: this.personalInfo.email },
        { label: 'Téléphone', value: this.personalInfo.phone }
      ];
    }
  }

  private calculateAge(): number {
    if (!this.personalInfo?.dateOfBirth) return 0;
    const today = new Date();
    const birthDate = new Date(this.personalInfo.dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  private setupScrollObserver(): void {
    // Guard: IntersectionObserver only available in browser (not on server)
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      // Server-side rendering or older browser — skip observer
      return;
    }

    // Observer simple pour les animations au scroll (navigateur uniquement)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('in-view');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observer toutes les sections
    const sections = Array.from(this.document.querySelectorAll('section')) as HTMLElement[];
    sections.forEach(section => {
      observer.observe(section);
    });
    
    // Fallback: si IntersectionObserver n'est pas supporté, utiliser un simple listener
    // (très basique, exécuté seulement dans le navigateur)
    if (typeof IntersectionObserver === 'undefined') {
      const onScroll = () => {
        const top = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight;
        sections.forEach(sec => {
          const rect = sec.getBoundingClientRect();
          if (rect.top >= -vh * 0.25 && rect.top <= vh * 0.75) {
            sec.classList.add('in-view');
          } else {
            sec.classList.remove('in-view');
          }
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      // run once
      setTimeout(onScroll, 50);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBackToTop = window.pageYOffset > 300;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  translate(key: string): string {
    return key;
  }
}
