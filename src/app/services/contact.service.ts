import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
import { EmailJSConfig } from '../config/emailjs.config';

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
  // Configuration EmailJS
  private readonly EMAIL_SERVICE_ID = EmailJSConfig.SERVICE_ID;
  private readonly EMAIL_TEMPLATE_ID = EmailJSConfig.TEMPLATE_ID;
  private readonly EMAIL_PUBLIC_KEY = EmailJSConfig.PUBLIC_KEY;

  constructor() {
    // Initialiser EmailJS avec votre clé publique
    if (this.EMAIL_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init(this.EMAIL_PUBLIC_KEY);
    }
  }

  // Submit contact form with real email sending
  submitContactForm(formData: ContactForm): Observable<ContactResponse> {
    // Vérifier si EmailJS est configuré
    if (this.EMAIL_SERVICE_ID === 'YOUR_SERVICE_ID' || 
        this.EMAIL_TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
        this.EMAIL_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      
      console.warn('EmailJS n\'est pas encore configuré. Utilisation du mode simulation.');
      // Retourner une simulation si EmailJS n'est pas configuré
      return of({
        success: true,
        message: '⚠️ Mode démo : EmailJS n\'est pas configuré. Votre message a été simulé avec succès !'
      }).pipe(delay(1000));
    }

    return new Observable(observer => {
      // Préparer les données pour EmailJS selon votre template
      const templateParams = {
        title: formData.subject, // {{title}} dans votre template
        name: formData.name,     // {{name}} dans votre template
        time: new Date().toLocaleString('fr-FR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }), // {{time}} dans votre template
        message: `${formData.message}\n\n---\nEmail de contact: ${formData.email}`, // {{message}} dans votre template
        from_email: formData.email // Pour référence si besoin
      };

      // Envoyer l'email via EmailJS
      emailjs.send(
        this.EMAIL_SERVICE_ID,
        this.EMAIL_TEMPLATE_ID,
        templateParams
      ).then(
        (response) => {
          console.log('Email envoyé avec succès!', response.status, response.text);
          observer.next({
            success: true,
            message: 'Votre message a été envoyé avec succès ! Je vous répondrai bientôt.'
          });
          observer.complete();
        },
        (error) => {
          console.error('Erreur lors de l\'envoi de l\'email:', error);
          observer.error(new Error('Échec de l\'envoi du message. Veuillez réessayer ou me contacter directement.'));
        }
      );
    });
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
