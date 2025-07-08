import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, Experience as ExperienceInterface } from '../../services/data.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class Experience implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  experiences: ExperienceInterface[] = [];

  constructor(
    private dataService: DataService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadExperiences();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadExperiences(): void {
    this.dataService.getExperiences()
      .pipe(takeUntil(this.destroy$))
      .subscribe(experiences => {
        this.experiences = experiences;
      });
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  getCurrentText(): string {
    return this.translate('experience.current');
  }
}
