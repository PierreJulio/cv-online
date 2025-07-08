import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfExportService {
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async exportToPdf(elementId: string = 'cv-app', filename: string = 'CV.pdf'): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn('PDF export is not available on server side');
      return;
    }

    try {
      // Dynamically import the required libraries
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf')
      ]);

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error(`Element with id '${elementId}' not found`);
      }

      // Show loading state
      this.showLoadingState(true);

      // Temporarily hide elements that shouldn't appear in PDF
      const elementsToHide = this.hideElementsForPdf();

      // Configure html2canvas options
      const canvas = await html2canvas(element, {
        scale: 2, // Higher resolution
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        height: element.scrollHeight,
        width: element.scrollWidth,
        scrollX: 0,
        scrollY: 0
      });

      // Restore hidden elements
      this.restoreHiddenElements(elementsToHide);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Calculate scaling to fit page width
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      // Center the image on the page
      const x = (pdfWidth - scaledWidth) / 2;
      const y = 0;

      // If content is too tall, split into multiple pages
      if (scaledHeight > pdfHeight) {
        let position = 0;
        const pageHeight = pdfHeight;
        const pageCount = Math.ceil(scaledHeight / pageHeight);

        for (let i = 0; i < pageCount; i++) {
          if (i > 0) {
            pdf.addPage();
          }
          
          const sourceY = (i * pageHeight) / ratio;
          const sourceHeight = Math.min(pageHeight / ratio, imgHeight - sourceY);
          
          // Create a new canvas for this page
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight * ratio;
          
          const pageCtx = pageCanvas.getContext('2d');
          if (pageCtx) {
            pageCtx.drawImage(
              canvas, 
              0, sourceY, imgWidth, sourceHeight,
              0, 0, imgWidth, sourceHeight * ratio
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png');
            pdf.addImage(pageImgData, 'PNG', x, y, scaledWidth, sourceHeight * ratio);
          }
        }
      } else {
        pdf.addImage(imgData, 'PNG', x, y, scaledWidth, scaledHeight);
      }

      // Save the PDF
      pdf.save(filename);

      // Hide loading state
      this.showLoadingState(false);

    } catch (error) {
      console.error('Error generating PDF:', error);
      this.showLoadingState(false);
      throw error;
    }
  }

  private hideElementsForPdf(): Array<{ element: HTMLElement, display: string }> {
    const hiddenElements: Array<{ element: HTMLElement, display: string }> = [];
    
    // Hide navigation, back-to-top button, and other interactive elements
    const selectorsToHide = [
      '.back-to-top',
      '.navbar',
      '.floating-nav',
      '.loading-overlay',
      '.tooltip',
      '.popover'
    ];

    selectorsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
      elements.forEach(element => {
        hiddenElements.push({
          element,
          display: element.style.display
        });
        element.style.display = 'none';
      });
    });

    return hiddenElements;
  }

  private restoreHiddenElements(hiddenElements: Array<{ element: HTMLElement, display: string }>): void {
    hiddenElements.forEach(({ element, display }) => {
      element.style.display = display;
    });
  }

  private showLoadingState(show: boolean): void {
    const loadingElement = document.querySelector('.pdf-loading');
    if (loadingElement) {
      (loadingElement as HTMLElement).style.display = show ? 'flex' : 'none';
    }

    // Optionally show a simple loading indicator
    if (show) {
      document.body.style.cursor = 'wait';
    } else {
      document.body.style.cursor = 'default';
    }
  }

  // Method to add PDF export button functionality
  addExportButton(containerId: string, buttonText: string = 'Export PDF'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const button = document.createElement('button');
    button.textContent = buttonText;
    button.className = 'btn btn-primary pdf-export-btn';
    button.onclick = () => this.exportToPdf();

    container.appendChild(button);
  }
}