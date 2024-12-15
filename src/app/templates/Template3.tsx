'use client';

import { ResumeData } from '../types';

export default function Template3({ data }: { data: ResumeData }) {  // Changed from Template2 to Template3
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white">
      {/* Creative Header */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          {data.personalInfo.fullName}
        </h1>
        <div className="mt-4 flex justify-center gap-6 text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {/* Skills */}
      {Object.keys(data.skills).length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {Object.entries(data.skills).map(([category, skills]) => (
              skills.map((skill, index) => (
                <span
                  key={`${category}-${index}`}
                  className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-gray-800"
                >
                  {skill}
                </span>
              ))
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Experience</h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative pl-8 border-l-2 border-purple-200">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-purple-600"></div>
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <div className="text-gray-600 mb-2">
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
        <section>
          <h2 className="text-2xl font-bold text-purple-600 mb-6">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold">{edu.school}</h3>
                <div className="text-gray-600">
                  {edu.degree} in {edu.field}
                </div>
                <div className="text-gray-500">
                  {edu.startDate} - {edu.endDate}
                </div>
                {edu.gpa && <div className="text-gray-600 mt-2">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}