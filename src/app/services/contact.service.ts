import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {}

  // Mock contact form submission
  submitContactForm(formData: ContactForm): Observable<ContactResponse> {
    // Simulate API call with delay
    return of(formData).pipe(
      delay(2000), // Simulate network delay
      map(() => {
        // Simulate random success/failure for demo
        const isSuccess = Math.random() > 0.1; // 90% success rate
        
        if (isSuccess) {
          return {
            success: true,
            message: 'Thank you for your message! I will get back to you soon.'
          };
        } else {
          throw new Error('Failed to send message. Please try again.');
        }
      })
    );
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Get contact information
  getContactInfo(): Observable<any> {
    const contactInfo = {
      email: 'pierre.julio2024@gmail.com',
      phone: '+33 7 82 14 12 85',
      location: 'Labège, France',
      social: {
        linkedin: 'https://linkedin.com/in/pierre-julio',
        github: 'https://github.com/pierre-julio'
      },
      availability: {
        status: 'available',
        message: 'Disponible pour de nouvelles opportunités'
      }
    };

    return of(contactInfo).pipe(delay(500));
  }

  // Send email directly (would integrate with real email service)
  sendDirectEmail(to: string, subject: string, body: string): Observable<ContactResponse> {
    // In a real application, this would integrate with an email service
    // like EmailJS, SendGrid, or a backend API
    
    console.log('Sending email:', { to, subject, body });
    
    return of({
      success: true,
      message: 'Email sent successfully!'
    }).pipe(delay(1000));
  }

  // Download vCard (contact information)
  downloadVCard(): void {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Pierre JULIO
ORG:Développeur Full-Stack Web & IAM
TITLE:Développeur Full-Stack
EMAIL:pierre.julio2024@gmail.com
TEL:+33782141285
ADR:;;Labège;;31670;France
URL:https://pierre-julio.dev
NOTE:Développeur Full-Stack spécialisé en .NET Core, Blazor, React et technologies IAM
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pierre-julio.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
