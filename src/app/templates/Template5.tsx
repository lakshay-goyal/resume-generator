'use client';

import { ResumeData } from '../types';

export default function Template2({ data }: { data: ResumeData }) {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg flex flex-col md:flex-row gap-8">
      {/* Left Column */}
      <div className="md:w-1/3 space-y-6">
        {/* Profile */}
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4" />
          <h1 className="text-2xl font-bold text-gray-800">{data.personalInfo.fullName}</h1>
          <div className="text-gray-600 mt-2 space-y-1">
            <div>{data.personalInfo.email}</div>
            <div>{data.personalInfo.phone}</div>
            <div>{data.personalInfo.location}</div>
          </div>
        </div>

        {/* Skills */}
        {Object.keys(data.skills).length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3 border-b border-gray-300 pb-2">
              Skills
            </h2>
            {Object.entries(data.skills).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="text-lg font-semibold mb-2">{category}</h3>
                <div className="space-y-2">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 px-3 py-1 rounded text-gray-700 text-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="md:w-2/3">
        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Experience
            </h2>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{exp.position}</h3>
                  <span className="text-gray-600 text-sm">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div className="text-gray-600 font-medium">{exp.company}</div>
                <p className="mt-2 text-gray-700">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-gray-300 pb-2">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold">{edu.school}</h3>
                  <span className="text-gray-600 text-sm">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
                <div className="text-gray-600">
                  {edu.degree} in {edu.field}
                </div>
                {edu.gpa && (
                  <div className="text-gray-600 text-sm mt-1">GPA: {edu.gpa}</div>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}