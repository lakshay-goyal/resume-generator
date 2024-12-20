'use client';

import { ResumeData } from '../types';

export default function Template4({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Header */}
      <header className="bg-gray-900 text-white p-8 -m-8 mb-8">
        <h1 className="text-5xl font-bold mb-4">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-6 text-gray-300">
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {data.personalInfo.email}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {data.personalInfo.phone}
          </span>
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {data.personalInfo.location}
          </span>
        </div>
      </header>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-4 border-gray-900">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-gray-200">
                <h3 className="text-xl font-bold text-gray-800">{exp.position}</h3>
                <div className="text-gray-600 font-medium mb-2">
                  {exp.company} | {exp.startDate} - {exp.endDate}
                </div>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-4 border-gray-900">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{edu.school}</h3>
                <div className="text-gray-600">
                  {edu.degree} in {edu.field}
                </div>
                <div className="text-gray-500 text-sm mt-2">
                  {edu.startDate} - {edu.endDate}
                </div>
                {edu.gpa && (
                  <div className="mt-2 inline-block bg-gray-900 text-white px-3 py-1 rounded-full text-sm">
                    GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Object.keys(data.skills).length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 pb-2 border-b-4 border-gray-900">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}