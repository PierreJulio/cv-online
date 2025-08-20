import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ContactService, ContactForm } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  contactForm: ContactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  contactInfo: any = null;
  formSubmitted = false;
  touchedFields: { [key: string]: boolean } = {};

  constructor(
    private contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.loadContactInfo();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadContactInfo(): void {
    this.contactService.getContactInfo()
      .pipe(takeUntil(this.destroy$))
      .subscribe(info => {
        this.contactInfo = info;
      });
  }

  async onSubmit(): Promise<void> {
    this.formSubmitted = true;
    
    if (!this.isValidForm()) {
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    try {
      const response = await this.contactService.submitContactForm(this.contactForm).toPromise();
      if (response?.success) {
        this.submitSuccess = true;
        this.resetForm();
      }
    } catch (error: any) {
      this.submitError = error.message || 'Une erreur est survenue lors de l\'envoi du message';
    } finally {
      this.isSubmitting = false;
    }
  }

  private isValidForm(): boolean {
    return !!(this.contactForm.name.trim() && 
             this.contactForm.email.trim() && 
             this.contactForm.subject.trim() && 
             this.contactForm.message.trim() &&
             this.contactService.validateEmail(this.contactForm.email));
  }

  private resetForm(): void {
    this.contactForm = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    this.formSubmitted = false;
    this.touchedFields = {};
  }

  downloadVCard(): void {
    this.contactService.downloadVCard();
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }

  downloadCV(): void {
    // Create a temporary link to download CV
    const link = document.createElement('a');
    link.href = '/assets/documents/Pierre_Julio_CV.pdf';
    link.download = 'Pierre_Julio_CV.pdf';
    link.click();
  }

  getFieldError(field: string): string {
    // Ne montrer les erreurs que si le champ a été touché ou si le formulaire a été soumis
    if (!this.touchedFields[field] && !this.formSubmitted) {
      return '';
    }

    switch (field) {
      case 'name':
        return !this.contactForm.name.trim() ? 'Le nom est requis' : '';
      case 'email':
        if (!this.contactForm.email.trim()) return 'L\'email est requis';
        if (!this.contactService.validateEmail(this.contactForm.email)) return 'L\'email n\'est pas valide';
        return '';
      case 'subject':
        return !this.contactForm.subject.trim() ? 'Le sujet est requis' : '';
      case 'message':
        return !this.contactForm.message.trim() ? 'Le message est requis' : '';
      default:
        return '';
    }
  }

  onFieldTouch(field: string): void {
    this.touchedFields[field] = true;
  }
}
