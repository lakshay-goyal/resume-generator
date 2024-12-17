'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { selectedTemplateAtom, resumeDataAtom } from './store/resumeStore';
import Template1 from './templates/Template1';
import Template2 from './templates/Template2';
import Template3 from './templates/Template3';
import React from 'react';

const templates = [
  {
    id: 'template1',
    name: 'Professional',
    description: 'Clean and traditional layout',
    component: Template1
  },
  {
    id: 'template2',
    name: 'Modern',
    description: 'Contemporary two-column design',
    component: Template2
  },
  {
    id: 'template3',
    name: 'Creative',
    description: 'Unique and eye-catching layout',
    component: Template3
  }
];

export default function Home() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);
  const [resumeData] = useAtom(resumeDataAtom);

  // Set default template if none selected
  React.useEffect(() => {
    if (!selectedTemplate) {
      setSelectedTemplate('template1');
    }
  }, [selectedTemplate, setSelectedTemplate]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    router.push('/personal-info');
  };

  const handlePreviewTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800 tracking-tight">
          Choose Your Resume Template
        </h1>

        {/* Template Selection */}
        <h2 className="text-3xl font-bold mb-8 text-gray-700">Available Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer 
                transition-all duration-300 ease-in-out group
                ${selectedTemplate === template.id 
                  ? 'ring-4 ring-blue-500 scale-105 shadow-2xl' 
                  : 'hover:scale-105 hover:shadow-2xl'}`}
              onClick={() => handlePreviewTemplate(template.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <span className="text-blue-500 font-semibold">Selected</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6 h-12">{template.description}</p>
                <div className="border-2 border-gray-100 rounded-lg overflow-hidden 
                  transform scale-[0.9] origin-top 
                  group-hover:scale-[0.95] transition-transform duration-300 w-full h-[400px]">
                  <template.component data={resumeData} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => handleTemplateSelect(selectedTemplate)}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl 
            hover:bg-blue-700 transition-all duration-300 
            transform hover:-translate-y-1 
            shadow-lg hover:shadow-xl 
            text-lg font-semibold tracking-wide"
          >
            Continue with Selected Template
          </button>
        </div>
      </div>
    </div>
  );
}