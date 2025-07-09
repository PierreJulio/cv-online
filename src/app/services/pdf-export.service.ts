import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from './data.service';
import { TranslationService } from './translation.service';
import { take, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private dataService: DataService,
    private translationService: TranslationService
  ) {}

  async exportATSCV(filename: string = 'Pierre_JULIO_CV.pdf'): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('PDF export is not available on server side');
      return;
    }

    try {
      // Dynamically import jsPDF
      const { default: jsPDF } = await import('jspdf');

      // Get all data from services using firstValueFrom for better performance
      const [personalInfo, experiences, education, skills, projects, languages] = await Promise.all([
        firstValueFrom(this.dataService.getPersonalInfo()),
        firstValueFrom(this.dataService.getExperiences()),
        firstValueFrom(this.dataService.getEducation()),
        firstValueFrom(this.dataService.getSkills()),
        firstValueFrom(this.dataService.getProjects()),
        firstValueFrom(this.dataService.getLanguages())
      ]);

      const currentLang = this.translationService.getCurrentLanguage();

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      let yPosition = 20;
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const contentWidth = pageWidth - (margin * 2);

      // Helper function to add new page if needed
      const checkPageBreak = (neededHeight: number) => {
        if (yPosition + neededHeight > pdf.internal.pageSize.getHeight() - 20) {
          pdf.addPage();
          yPosition = 20;
        }
      };

      // Set font
      pdf.setFont('helvetica');

      // HEADER SECTION
      pdf.setFontSize(24);
      pdf.setTextColor(51, 51, 51);
      pdf.text(`${(personalInfo as any).firstName} ${(personalInfo as any).lastName}`, margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(14);
      pdf.setTextColor(102, 102, 102);
      pdf.text(this.cleanText((personalInfo as any).title), margin, yPosition);
      yPosition += 15;

      // CONTACT INFO
      pdf.setFontSize(10);
      pdf.setTextColor(85, 85, 85);
      const contactInfo = [
        `Email: ${(personalInfo as any).email}`,
        `Tel: ${(personalInfo as any).phone}`,
        `Lieu: ${(personalInfo as any).location}`,
        `LinkedIn: ${(personalInfo as any).socialLinks.find((link: any) => link.platform === 'LinkedIn')?.url || ''}`
      ];
      
      contactInfo.forEach(info => {
        pdf.text(info, margin, yPosition);
        yPosition += 4;
      });
      yPosition += 8;

      // SUMMARY SECTION
      checkPageBreak(15);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('about.title'), margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(9);
      pdf.setTextColor(85, 85, 85);
      const cleanSummary = this.cleanText((personalInfo as any).summary);
      const summaryLines = pdf.splitTextToSize(cleanSummary, contentWidth);
      pdf.text(summaryLines, margin, yPosition);
      yPosition += summaryLines.length * 4 + 6;

      // EXPERIENCE SECTION
      checkPageBreak(20);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('experience.title'), margin, yPosition);
      yPosition += 6;

      (experiences as any[]).forEach((exp: any) => {
        checkPageBreak(15);
        
        // Job title and company
        pdf.setFontSize(10);
        pdf.setTextColor(51, 51, 51);
        pdf.text(`${this.cleanText(exp.position)} - ${this.cleanText(exp.company)}`, margin, yPosition);
        yPosition += 4;

        // Date
        pdf.setFontSize(9);
        pdf.setTextColor(102, 102, 102);
        const endDate = exp.endDate ? this.formatDate(exp.endDate) : this.translate('experience.present');
        pdf.text(`${this.formatDate(exp.startDate)} - ${endDate}`, margin, yPosition);
        yPosition += 4;

        // Description
        pdf.setFontSize(8);
        pdf.setTextColor(85, 85, 85);
        const cleanDesc = this.cleanText(exp.description);
        const descLines = pdf.splitTextToSize(cleanDesc, contentWidth);
        pdf.text(descLines, margin, yPosition);
        yPosition += descLines.length * 3 + 2;

        // Technologies
        if (exp.technologies.length > 0) {
          pdf.setFontSize(8);
          pdf.setTextColor(102, 102, 102);
          const techText = `Technologies: ${exp.technologies.join(', ')}`;
          const techLines = pdf.splitTextToSize(techText, contentWidth);
          pdf.text(techLines, margin, yPosition);
          yPosition += techLines.length * 3;
        }

        yPosition += 4;
      });

      // EDUCATION SECTION
      checkPageBreak(15);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('education.title'), margin, yPosition);
      yPosition += 6;

      (education as any[]).forEach((edu: any) => {
        checkPageBreak(10);
        
        pdf.setFontSize(10);
        pdf.setTextColor(51, 51, 51);
        pdf.text(`${this.cleanText(edu.degree)} - ${this.cleanText(edu.institution)}`, margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(9);
        pdf.setTextColor(102, 102, 102);
        const eduEndDate = edu.endDate ? this.formatDate(edu.endDate) : this.translate('education.present');
        pdf.text(`${this.formatDate(edu.startDate)} - ${eduEndDate}`, margin, yPosition);
        yPosition += 5;
      });

      // SKILLS SECTION
      checkPageBreak(20);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('skills.title'), margin, yPosition);
      yPosition += 6;

      const skillsByCategory = this.groupSkillsByCategory(skills as any[]);
      
      Object.entries(skillsByCategory).forEach(([category, categorySkills]) => {
        checkPageBreak(8);
        
        pdf.setFontSize(9);
        pdf.setTextColor(51, 51, 51);
        pdf.text(category, margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(8);
        pdf.setTextColor(85, 85, 85);
        const skillNames = (categorySkills as any[]).map(skill => skill.name).join(', ');
        const skillLines = pdf.splitTextToSize(skillNames, contentWidth);
        pdf.text(skillLines, margin + 5, yPosition);
        yPosition += skillLines.length * 3 + 3;
      });

      // PROJECTS SECTION
      checkPageBreak(15);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('projects.title'), margin, yPosition);
      yPosition += 6;

      (projects as any[]).forEach((project: any) => {
        checkPageBreak(10);
        
        pdf.setFontSize(10);
        pdf.setTextColor(51, 51, 51);
        pdf.text(this.cleanText(project.title), margin, yPosition);
        yPosition += 4;

        pdf.setFontSize(8);
        pdf.setTextColor(85, 85, 85);
        const cleanDesc = this.cleanText(project.description);
        const projectDescLines = pdf.splitTextToSize(cleanDesc, contentWidth);
        pdf.text(projectDescLines, margin, yPosition);
        yPosition += projectDescLines.length * 3 + 2;

        // Technologies
        pdf.setFontSize(8);
        pdf.setTextColor(102, 102, 102);
        const projectTechText = `Tech: ${project.technologies.join(', ')}`;
        const projectTechLines = pdf.splitTextToSize(projectTechText, contentWidth);
        pdf.text(projectTechLines, margin, yPosition);
        yPosition += projectTechLines.length * 3 + 3;
      });

      // LANGUAGES SECTION
      checkPageBreak(15);
      pdf.setFontSize(12);
      pdf.setTextColor(51, 51, 51);
      pdf.text(this.translate('languages.title'), margin, yPosition);
      yPosition += 6;

      pdf.setFontSize(10);
      pdf.setTextColor(85, 85, 85);
      (languages as any[]).forEach((lang: any) => {
        pdf.text(`${lang.name}: ${lang.level}`, margin, yPosition);
        yPosition += 5;
      });

      // Save PDF
      pdf.save(filename);

    } catch (error) {
      console.error('Error generating ATS CV:', error);
      throw error;
    }
  }

  private translate(key: string): string {
    return this.translationService.translate(key);
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  private groupSkillsByCategory(skills: any[]): { [key: string]: any[] } {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }

  private cleanText(text: string): string {
    if (!text) return '';
    
    return text
      // Remplacer les emojis par du texte simple
      .replace(/📱/g, 'Mobile')
      .replace(/💻/g, 'Web')
      .replace(/🎯/g, 'Focus')
      .replace(/🚀/g, 'Innovation')
      .replace(/⚡/g, 'Performance')
      .replace(/🔧/g, 'Tools')
      .replace(/📊/g, 'Analytics')
      .replace(/🌐/g, 'Web')
      .replace(/🔥/g, 'Hot')
      .replace(/💡/g, 'Idea')
      .replace(/🎨/g, 'Design')
      .replace(/📈/g, 'Growth')
      .replace(/🏆/g, 'Success')
      .replace(/🎯/g, 'Target')
      .replace(/🔬/g, 'Research')
      .replace(/🛠️/g, 'Tools')
      .replace(/🔗/g, 'Link')
      .replace(/📝/g, 'Document')
      .replace(/🎭/g, 'Theater')
      .replace(/🎪/g, 'Entertainment')
      .replace(/🎼/g, 'Music')
      .replace(/🎵/g, 'Music')
      .replace(/🎶/g, 'Music')
      // Remplacer les caractères accentués problématiques
      .replace(/[àáâãäå]/g, 'a')
      .replace(/[èéêë]/g, 'e')
      .replace(/[ìíîï]/g, 'i')
      .replace(/[òóôõö]/g, 'o')
      .replace(/[ùúûü]/g, 'u')
      .replace(/[ýÿ]/g, 'y')
      .replace(/[ñ]/g, 'n')
      .replace(/[ç]/g, 'c')
      .replace(/[ÀÁÂÃÄÅ]/g, 'A')
      .replace(/[ÈÉÊË]/g, 'E')
      .replace(/[ÌÍÎÏ]/g, 'I')
      .replace(/[ÒÓÔÕÖ]/g, 'O')
      .replace(/[ÙÚÛÜ]/g, 'U')
      .replace(/[ÝŸ]/g, 'Y')
      .replace(/[Ñ]/g, 'N')
      .replace(/[Ç]/g, 'C')
      // Remplacer les caractères spéciaux
      .replace(/['']/g, "'")
      .replace(/[""]/g, '"')
      .replace(/[–—]/g, '-')
      .replace(/[…]/g, '...')
      .replace(/[•]/g, '- ')
      .replace(/[€]/g, 'EUR')
      .replace(/[£]/g, 'GBP')
      .replace(/[¥]/g, 'JPY')
      .replace(/[©]/g, '(c)')
      .replace(/[®]/g, '(R)')
      .replace(/[™]/g, '(TM)')
      .replace(/[°]/g, ' deg')
      .replace(/[±]/g, '+/-')
      .replace(/[×]/g, 'x')
      .replace(/[÷]/g, '/')
      .replace(/[½]/g, '1/2')
      .replace(/[¼]/g, '1/4')
      .replace(/[¾]/g, '3/4')
      // Supprimer tous les autres caractères non-ASCII
      .replace(/[^\x00-\x7F]/g, '')
      // Nettoyer les espaces multiples
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Keep the original method for backward compatibility
  async exportToPdf(elementId: string = 'cv-app', filename: string = 'CV.pdf'): Promise<void> {
    return this.exportATSCV(filename);
  }
}