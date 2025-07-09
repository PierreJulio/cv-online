import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
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
import { TranslationService } from './services/translation.service';
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
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected title = 'cv-online';
  
  private destroy$ = new Subject<void>();
  
  personalInfo: PersonalInfo | null = null;
  languages: Language[] = [];
  aboutDetails: AboutDetail[] = [];
  skillCategories: SkillCategory[] = [];
  showBackToTop = false;
  isLoading = false; // Désactivé pour éviter les problèmes

  constructor(
    private dataService: DataService,
    private translationService: TranslationService,
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.setupScrollListener();
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
        { label: this.translate('about.age'), value: this.calculateAge().toString() },
        { label: this.translate('about.location'), value: this.personalInfo.location },
        { label: this.translate('about.email'), value: this.personalInfo.email },
        { label: this.translate('about.phone'), value: this.personalInfo.phone }
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

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showBackToTop = window.pageYOffset > 300;
  }

  private setupScrollListener(): void {
    // Additional scroll setup if needed
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
