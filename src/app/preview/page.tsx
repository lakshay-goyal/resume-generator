'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { useAtom } from 'jotai';
import { resumeDataAtom, selectedTemplateAtom } from '../store/resumeStore';
import { useRouter } from 'next/navigation';
import { 
  Download, 
  ArrowLeft, 
  Printer, 
  FileCheck, 
  Loader2, 
  CheckCircle2 
} from 'lucide-react';
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
  const [showSuccess, setShowSuccess] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SelectedTemplate = templates[selectedTemplate as keyof typeof templates] || Template1;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPDF = () => {
    if (!isClient || typeof window === 'undefined' || !resumeRef.current) return;
    setIsGenerating(true);
  };

  const handleGenerationSuccess = () => {
    setIsGenerating(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto max-w-4xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="progress-step progress-step-inactive" />
          <div className="progress-step progress-step-inactive" />
          <div className="progress-step progress-step-inactive" />
          <div className="progress-step progress-step-inactive" />
          <div className="progress-step progress-step-inactive" />
          <div className="progress-step progress-step-active animate-pulse-subtle" />
        </div>

        <h1 className="form-header mb-8">Preview Your Resume</h1>

        {/* Action Buttons */}
        <div className="flex justify-between mb-6 animate-fade-in">
          <button 
            onClick={() => router.push('/skills')}
            className="btn-secondary group"
          >
            <span className="inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Back to Edit
            </span>
          </button>
          <div className="flex gap-4">
            <Html2PdfWrapper 
              ref={resumeRef}
              filename={`${resumeData.personalInfo.fullName}_Resume.pdf`}
              isGenerating={isGenerating}
              onGenerationStart={() => setIsGenerating(true)}
              onGenerationEnd={handleGenerationSuccess}
            >
              <button 
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className="btn-primary group relative"
              >
                <span className="inline-flex items-center">
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
                      Downloaded!
                    </>
                  ) : (
                    <>
                      <FileCheck className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                      Download PDF
                    </>
                  )}
                </span>
              </button>
            </Html2PdfWrapper>
          </div>
        </div>

        {/* Web Preview */}
        <div className="form-card overflow-hidden animate-fade-in">
          <div 
            ref={resumeRef}
            className="bg-white rounded-lg shadow-xl transition-transform duration-300 hover:scale-[1.002]"
          >
            <SelectedTemplate data={resumeData} />
          </div>
        </div>
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
          .print\\:hidden {
            display: none !important;
          }
          .form-card {
            background: none !important;
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}