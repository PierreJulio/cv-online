import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

// Import services
import { DataService, PersonalInfo } from '../../services/data.service';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  personalInfo: PersonalInfo | null = null;
  yearsOfExperience = 3;
  projectsCompleted = 15;

  constructor(
    private dataService: DataService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.loadPersonalInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPersonalInfo(): void {
    this.dataService.getPersonalInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(info => {
        this.personalInfo = info;
        // Calculate years of experience from the data
        if (info.dateOfBirth) {
          this.calculateYearsOfExperience();
        }
      });
  }

  private calculateYearsOfExperience(): void {
    // Pierre a commencé son premier stage en janvier 2020
    // Ajusté pour refléter 3 ans d'expérience pertinente
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    this.yearsOfExperience = currentYear - startYear;
  }

  scrollToContact(): void {
    const contactElement = this.document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  translate(key: string): string {
    // Méthode maintenue pour compatibilité, retourne la clé directement
    return key;
  }
}
