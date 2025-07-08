import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ContactService, ContactForm } from '../../services/contact.service';
import { TranslationService } from '../../services/translation.service';

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

  constructor(
    private contactService: ContactService,
    private translationService: TranslationService
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
      this.submitError = error.message || this.translate('contact.error');
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
  }

  downloadVCard(): void {
    this.contactService.downloadVCard();
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank');
  }

  translate(key: string): string {
    return this.translationService.translate(key);
  }

  getFieldError(field: string): string {
    switch (field) {
      case 'name':
        return !this.contactForm.name.trim() ? this.translate('contact.nameRequired') : '';
      case 'email':
        if (!this.contactForm.email.trim()) return this.translate('contact.emailRequired');
        if (!this.contactService.validateEmail(this.contactForm.email)) return this.translate('contact.emailInvalid');
        return '';
      case 'subject':
        return !this.contactForm.subject.trim() ? this.translate('contact.subjectRequired') : '';
      case 'message':
        return !this.contactForm.message.trim() ? this.translate('contact.messageRequired') : '';
      default:
        return '';
    }
  }
}
