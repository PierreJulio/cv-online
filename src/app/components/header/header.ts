import { Component, OnInit, OnDestroy, HostListener, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { TranslationService } from '../../services/translation.service';
import { PdfExportService } from '../../services/pdf-export.service';

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
  currentLanguage = 'fr';

  navigationItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'experience', href: '#experience' },
    { key: 'skills', href: '#skills' },
    { key: 'projects', href: '#projects' },
    { key: 'contact', href: '#contact' }
  ];

  constructor(
    private themeService: ThemeService,
    private translationService: TranslationService,
    private pdfExportService: PdfExportService,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    // Subscribe to theme changes
    this.themeService.isDarkTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isDark => this.isDarkTheme = isDark);

    // Subscribe to language changes
    this.translationService.currentLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe(lang => this.currentLanguage = lang);
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

  toggleLanguage(): void {
    const newLang = this.currentLanguage === 'fr' ? 'en' : 'fr';
    this.translationService.setLanguage(newLang);
  }

  navigateTo(href: string): void {
    const element = this.document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      this.isMobileMenuOpen = false;
    }
  }

  async exportToPdf(): Promise<void> {
    try {
      await this.pdfExportService.exportToPdf();
    } catch (error) {
      console.error('Error exporting PDF:', error);
    }
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
