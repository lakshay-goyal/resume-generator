'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import { resumeDataAtom, selectedTemplateAtom } from '../store/resumeStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, ArrowLeft, Printer } from 'lucide-react';
import Template1 from '../templates/Template1';
import Template2 from '../templates/Template2';
import Template3 from '../templates/Template3';
import Template4 from '../templates/Template4';
import Template5 from '../templates/Template5';
import Template6 from '../templates/Template6';

// Create a wrapper component for html2pdf
const Html2PdfWrapper = dynamic(
  () => import('../../components/Html2PdfWrapper').then(mod => mod.Html2PdfWrapper),
  { ssr: false }
);

const templates = {
  template1: Template1,
  template2: Template2,
  template3: Template3,
  template4: Template4,
  template5: Template5,
  template6: Template6,
};

export default function ResumePreviewer() {
  const [isClient, setIsClient] = useState(false);
  const [resumeData] = useAtom(resumeDataAtom);
  const [selectedTemplate] = useAtom(selectedTemplateAtom);
  const router = useRouter();
  const [isGenerating, setIsGenerating] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get the selected template component
  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates] || Template1;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPDF = () => {
    // Check for client-side environment and html2pdf availability
    if (!isClient || typeof window === 'undefined' || !resumeRef.current) return;
    
    setIsGenerating(true);
  };

  // If not client-side, return null or a placeholder
  if (!isClient) {
    return null;
  }

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
            <Html2PdfWrapper 
              ref={resumeRef}
              filename={`${resumeData.personalInfo.fullName}_Resume.pdf`}
              isGenerating={isGenerating}
              onGenerationStart={() => setIsGenerating(true)}
              onGenerationEnd={() => setIsGenerating(false)}
            >
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
            </Html2PdfWrapper>
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