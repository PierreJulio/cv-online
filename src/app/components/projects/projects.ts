import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { DataService, Project } from '../../services/data.service';

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
  showAllProjects = true; // Afficher tous les projets par défaut
  projectsToShow = 5; // Augmenté pour inclure tous les projets

  constructor(
    private dataService: DataService
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

  requestMoreInfo(project: Project): void {
    // Scroll to contact section with a pre-filled message about the project
    const contactElement = document.querySelector('#contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
      
      // Trigger an event or use a service to pre-fill contact form
      setTimeout(() => {
        const messageField = document.querySelector('#message') as HTMLTextAreaElement;
        if (messageField) {
          messageField.value = `Bonjour Pierre,\n\nJe souhaiterais en savoir plus sur votre projet "${project.title}". Pouvez-vous me fournir plus de détails ?\n\nCordialement,`;
          messageField.focus();
        }
      }, 1000);
    }
  }
}
