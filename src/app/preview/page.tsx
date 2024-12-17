'use client';

import { useState, useRef } from 'react';
// Remove the dynamic import line
import { useAtom } from 'jotai';
import { resumeDataAtom, selectedTemplateAtom } from '../store/resumeStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, ArrowLeft, Printer } from 'lucide-react';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import html2pdf from 'html2pdf.js';

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
};

export default function ResumePreviewer() {
  const [resumeData] = useAtom(resumeDataAtom);
  const [selectedTemplate] = useAtom(selectedTemplateAtom);
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Get the selected template component
  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates] || Template1;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    if (typeof window === 'undefined' || !resumeRef.current) return;
    
    setIsGenerating(true);
    const element = resumeRef.current;
    
    const opt = {
      margin: 0,
      filename: `${resumeData.personalInfo.fullName}_Resume.pdf`,
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

    try {
      await html2pdf(element, opt).save();
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Failed to generate PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl">
        {/* Action Buttons */}
        <div className="flex justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => router.push('/skills')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Button>
          <div className="flex gap-4">
            <Button 
              variant="secondary" 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print
            </Button>
            <Button 
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-2"
            >
              {isGenerating ? 'Generating...' : (
                <>
                  <Download className="w-4 h-4" /> Download PDF
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Web Preview */}
        <Card className="p-8 bg-white shadow-lg print:shadow-none">
          <div ref={resumeRef}>
            <SelectedTemplate data={resumeData} />
          </div>
        </Card>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
          .print\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}