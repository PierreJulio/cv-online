import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  isScrolled = false;
  isMobileMenuOpen = false;
  isDarkTheme = false;

  navigationItems = [
    { key: 'home', href: '#home', label: 'Accueil' },
    { key: 'about', href: '#about', label: 'À propos' },
    { key: 'experience', href: '#experience', label: 'Expérience' },
    { key: 'skills', href: '#skills', label: 'Compétences' },
    { key: 'projects', href: '#projects', label: 'Projets' },
    { key: 'contact', href: '#contact', label: 'Contact' }
  ];

  constructor(
    private themeService: ThemeService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.isDarkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => this.isDarkTheme = isDark);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.isMobileMenuOpen = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  navigateTo(href: string): void {
    const element = this.document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMobileMenuOpen = false;
    }
  }

  translate(key: string): string {
    // Méthode maintenue pour compatibilité, retourne la clé directement
    return key;
  }
}
