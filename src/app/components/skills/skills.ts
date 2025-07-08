import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, Skill } from '../../services/data.service';
import { TranslationService } from '../../services/translation.service';

interface SkillCategory {
  key: string;
  title: string;
  skills: Skill[];
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  skillCategories: SkillCategory[] = [];

  constructor(
    private dataService: DataService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadSkills();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadSkills(): void {
    this.dataService.getSkills()
      .pipe(takeUntil(this.destroy$))
      .subscribe(skills => {
        this.organizeSkillsByCategory(skills);
      });
  }

  private organizeSkillsByCategory(skills: Skill[]): void {
    const frontendSkills = skills.filter(s => s.category === 'Frontend');
    const backendSkills = skills.filter(s => s.category === 'Backend');
    const toolsSkills = skills.filter(s => s.category === 'Tools');

    this.skillCategories = [
      {
        key: 'frontend',
        title: this.translate('skills.frontend'),
        skills: frontendSkills
      },
      {
        key: 'backend',
        title: this.translate('skills.backend'),
        skills: backendSkills
      },
      {
        key: 'tools',
        title: this.translate('skills.tools'),
        skills: toolsSkills
      }
    ];
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  getSkillLevelText(level: number): string {
    if (level >= 95) return 'Expert';
    if (level >= 85) return 'Avancé';
    if (level >= 75) return 'Intermédiaire';
    return 'Débutant';
  }

  getCategoryIcon(categoryKey: string): string {
    const icons = {
      'frontend': 'fas fa-palette',
      'backend': 'fas fa-server',
      'tools': 'fas fa-tools'
    };
    return icons[categoryKey as keyof typeof icons] || 'fas fa-code';
  }
}
