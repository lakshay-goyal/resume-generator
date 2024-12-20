'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { selectedTemplateAtom } from './store/resumeStore';
import React from 'react';
import template1 from './image/template1.png';
import template2 from './image/template2.png';
import template3 from './image/template3.png';
import template4 from './image/template4.png';
import template5 from './image/template5.png';
import template6 from './image/template6.png';

const templates = [
  {
    id: 'template1',
    name: 'Professional',
    description: 'Clean and traditional layout',
    imageUrl: template1,
  },
  {
    id: 'template2',
    name: 'Modern',
    description: 'Contemporary two-column design',
    imageUrl: template2,
  },
  {
    id: 'template3',
    name: 'Creative',
    description: 'Unique and eye-catching layout',
    imageUrl: template3,
  },
  {
    id: 'template4',
    name: 'Creative',
    description: 'Unique and eye-catching layout',
    imageUrl: template4,
  },
  {
    id: 'template5',
    name: 'Creative',
    description: 'Unique and eye-catching layout',
    imageUrl: template5,
  },
  {
    id: 'template6',
    name: 'Creative',
    description: 'Unique and eye-catching layout',
    imageUrl: template6,
  },
];

type Template = {
  id: string;
  name: string;
  description: string;
  imageUrl: string ; // Allow both string and imported image types
};

export default function Home() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useAtom(selectedTemplateAtom);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-white tracking-tight">
          Choose Your Resume Template
        </h1>
        <h2 className="text-3xl font-bold mb-8 text-gray-200">Available Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-gray-800 rounded-2xl overflow-hidden cursor-pointer 
                transition-all duration-300 ease-in-out group border
                ${selectedTemplate === template.id 
                  ? 'border-blue-500 scale-105 shadow-2xl' 
                  : 'border-gray-700 hover:scale-105 hover:shadow-2xl'}`}
              onClick={() => handlePreviewTemplate(template.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white">{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <span className="text-blue-400 font-semibold">Selected</span>
                  )}
                </div>
                <p className="text-gray-400 mb-6 h-12">{template.description}</p>
                <div className="rounded-lg overflow-hidden transform scale-[0.9] origin-top group-hover:scale-[0.95] transition-transform duration-300">
                  <img
                    src={typeof template.imageUrl === 'string' ? template.imageUrl : template.imageUrl.src}
                    alt={`${template.name} template preview`}
                    className="w-full h-[400px] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => handleTemplateSelect(selectedTemplate)}
            className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl text-lg font-semibold tracking-wide"
          >
            Continue with Selected Template
          </button>
        </div>
      </div>
    </div>
  );
}
