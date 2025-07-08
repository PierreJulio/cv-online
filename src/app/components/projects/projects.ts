import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, Project } from '../../services/data.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  projects: Project[] = [];
  visibleProjects: Project[] = [];
  showAllProjects = false;
  projectsToShow = 3;

  constructor(
    private dataService: DataService,
    private translationService: TranslationService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadProjects(): void {
    this.dataService.getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projects => {
        this.projects = projects;
        this.updateVisibleProjects();
      });
  }

  private updateVisibleProjects(): void {
    if (this.showAllProjects) {
      this.visibleProjects = this.projects;
    } else {
      this.visibleProjects = this.projects.slice(0, this.projectsToShow);
    }
  }

  toggleProjects(): void {
    this.showAllProjects = !this.showAllProjects;
    this.updateVisibleProjects();
  }

  openLink(url: string | undefined): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
