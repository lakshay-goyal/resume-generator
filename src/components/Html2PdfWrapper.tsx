'use client';

import React, { forwardRef, ReactNode, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

interface Html2PdfWrapperProps {
  children: ReactNode;
  ref: React.Ref<HTMLDivElement>;
  filename: string;
  isGenerating: boolean;
  onGenerationStart?: () => void;
  onGenerationEnd?: () => void;
}

export const Html2PdfWrapper = forwardRef<HTMLDivElement, Html2PdfWrapperProps>(
  ({ children, filename, isGenerating, onGenerationStart, onGenerationEnd }, ref) => {
    useEffect(() => {
      const generatePDF = async () => {
        if (!isGenerating) return;

        if (onGenerationStart) onGenerationStart();

        try {
          const element = ref && typeof ref === 'object' && 'current' in ref ? ref.current : null;
          
          if (!element) {
            throw new Error('Reference element not found');
          }

          const opt = {
            margin: 0,
            filename: filename,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
              scale: 2,
              useCORS: true,
              letterRendering: true
            },
            jsPDF: { 
              unit: 'mm', 
              format: 'a4', 
              orientation: 'portrait' 
            }
          };

          await html2pdf(element, opt).save();
        } catch (error) {
          console.error('PDF generation error:', error);
          alert('Failed to generate PDF');
        } finally {
          if (onGenerationEnd) onGenerationEnd();
        }
      };

      generatePDF();
    }, [isGenerating]);

    return <>{children}</>;
  }
);

Html2PdfWrapper.displayName = 'Html2PdfWrapper';