'use client';

import { ResumeData } from '../types';

export default function Template3({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-gray-900 mb-4">{data.personalInfo.fullName}</h1>
        <div className="flex justify-center gap-6 text-gray-600 text-sm">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index}>
                <div className="grid grid-cols-[1fr_auto] gap-4 mb-2">
                  <h3 className="text-lg font-medium text-gray-900">{exp.position}</h3>
                  <span className="text-gray-500 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-gray-600 mb-2">{exp.company}</div>
                <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-12">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index}>
                <div className="grid grid-cols-[1fr_auto] gap-4 mb-1">
                  <h3 className="text-lg font-medium text-gray-900">{edu.school}</h3>
                  <span className="text-gray-500 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-gray-600">
                  {edu.degree} in {edu.field}
                </div>
                {edu.gpa && (
                  <div className="text-gray-500 text-sm mt-1">GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {Object.keys(data.skills).length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-6">
            Skills
          </h2>
          <div className="space-y-4">
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category}>
                <h3 className="text-gray-700 font-medium mb-2">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-sm"
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