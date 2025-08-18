import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, PersonalInfo } from '../../services/data.service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  personalInfo: PersonalInfo | null = null;
  currentYear = new Date().getFullYear();

  quickLinks = [
    { key: 'home', href: '#home', label: 'Accueil' },
    { key: 'about', href: '#about', label: 'À propos' },
    { key: 'experience', href: '#experience', label: 'Expérience' },
    { key: 'skills', href: '#skills', label: 'Compétences' },
    { key: 'projects', href: '#projects', label: 'Projets' },
    { key: 'contact', href: '#contact', label: 'Contact' }
  ];

  constructor(
    private dataService: DataService
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
      });
  }

  scrollToSection(href: string): void {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }
}
