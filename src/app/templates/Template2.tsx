'use client';

import { ResumeData } from '../types';

export default function Template2({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg">
      {/* Modern Header */}
      <header className="bg-blue-600 text-white p-6 -mx-8 -mt-8 mb-8">
        <h1 className="text-4xl font-bold">{data.personalInfo.fullName}</h1>
        <div className="flex flex-wrap gap-4 mt-3 text-blue-100">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 bg-gray-50 p-4 rounded">
          {/* Skills */}
          {Object.keys(data.skills).length > 0 && (
            <section className="mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-4">Skills</h2>
              {Object.entries(data.skills).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h3 className="font-semibold mb-2">{category}</h3>
                  <div className="flex flex-col gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          {/* Experience */}
          {data.experience.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <div className="text-gray-600 mb-2">
                    {exp.company} | {exp.startDate} - {exp.endDate}
                  </div>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">Education</h2>
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
        </div>
      </div>
    </div>
  );
}