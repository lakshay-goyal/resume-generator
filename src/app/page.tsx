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
  }
];

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Hero Section with Button */}
        <div className="text-center mb-16 space-y-8">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 tracking-tight animate-fade-in">
            Choose Your Resume Template
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Select from our professionally designed templates to create your perfect resume
          </p>
          
          {/* Moved button to top */}
          <div className="flex flex-col items-center gap-4 my-8">
            <button
              onClick={() => handleTemplateSelect(selectedTemplate)}
              className="group relative px-12 py-5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl 
                hover:from-blue-400 hover:to-purple-500 transition-all duration-300 transform hover:-translate-y-1 
                shadow-lg hover:shadow-2xl hover:shadow-blue-500/20 text-xl font-semibold tracking-wide min-w-[300px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 text-white">
                Continue with Selected Template
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            <p className="text-gray-400 text-lg">
              Selected: <span className="text-blue-400 font-medium">{templates.find(t => t.id === selectedTemplate)?.name}</span>
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="w-10 h-2.5 rounded-full bg-blue-500"></div>
            <div className="w-10 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-10 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-10 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-10 h-2.5 rounded-full bg-gray-700"></div>
            <div className="w-10 h-2.5 rounded-full bg-gray-700"></div>
          </div>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`bg-gray-800/60 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer 
                transition-all duration-300 ease-in-out group
                ${selectedTemplate === template.id 
                  ? 'ring-4 ring-blue-500 scale-102 shadow-2xl shadow-blue-500/30' 
                  : 'hover:ring-2 hover:ring-blue-400/50 hover:scale-102 hover:shadow-xl'}`}
              onClick={() => handlePreviewTemplate(template.id)}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {template.name}
                  </h3>
                  {selectedTemplate === template.id && (
                    <span className="px-4 py-1.5 bg-blue-500/20 text-blue-400 text-sm font-medium rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-gray-400 mb-6">{template.description}</p>
                <div className="rounded-xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-300 shadow-xl">
                  <img
                    src={typeof template.imageUrl === 'string' ? template.imageUrl : template.imageUrl.src}
                    alt={`${template.name} template preview`}
                    className="w-full h-[400px] object-contain hover:object-contain transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
