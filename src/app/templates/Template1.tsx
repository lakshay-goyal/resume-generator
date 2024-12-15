'use client';

import { ResumeData } from '../types';

export default function Template1({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-4 mb-6">
        <h1 className="text-4xl font-bold text-gray-800">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-3 mt-2 text-gray-600">
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      {/* Experience */}
      {data.experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{exp.position}</h3>
              <div className="text-gray-600">
                {exp.company} | {exp.startDate} - {exp.endDate}
              </div>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-lg font-semibold">{edu.school}</h3>
              <div className="text-gray-600">
                {edu.degree} in {edu.field} | {edu.startDate} - {edu.endDate}
              </div>
              {edu.gpa && <div className="text-gray-600">GPA: {edu.gpa}</div>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {Object.keys(data.skills).length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
          {Object.entries(data.skills).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
