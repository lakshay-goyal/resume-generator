'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';

export default function Education() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [showAddForm, setShowAddForm] = useState(false);

  // Log when component mounts
  useEffect(() => {
    console.log('Education page loaded with data:', resumeData);
    console.log('Personal Info received:', resumeData.personalInfo);
  }, [resumeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Education data being sent:', resumeData.education);
    router.push('/experience');
  };

  const addEducation = (e: React.FormEvent) => {
    e.preventDefault();
    const newEducation = {
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      location: '',
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
    setShowAddForm(false);
  };

  const removeEducation = (index: number) => {
    const updatedEducation = resumeData.education.filter((_, i) => i !== index);
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = resumeData.education.map((edu, i) => {
      if (i === index) {
        return { ...edu, [field]: value };
      }
      return edu;
    });
    setResumeData({
      ...resumeData,
      education: updatedEducation,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Education Details
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-lg space-y-4 relative"
              >
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                >
                  Remove
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      School/University
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="University Name"
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(index, 'school', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Degree
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Bachelor's, Master's, etc."
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(index, 'degree', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Field of Study
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Computer Science, Business, etc."
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.field}
                      onChange={(e) =>
                        updateEducation(index, 'field', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="City, Country"
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(index, 'location', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Start Date
                    </label>
                    <input
                      type="month"
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(index, 'startDate', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      End Date (or Expected)
                    </label>
                    <input
                      type="month"
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(index, 'endDate', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      GPA (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="3.8"
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(index, 'gpa', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {!showAddForm && (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 rounded-md border border-gray-600 
                  text-gray-300 hover:bg-gray-700 transition duration-150"
              >
                + Add Another Education
              </button>
            )}

            {showAddForm && (
              <button
                type="button"
                onClick={addEducation}
                className="w-full py-2.5 rounded-md bg-blue-600 text-white 
                  hover:bg-blue-700 transition duration-150"
              >
                Save Education Entry
              </button>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/personal-info')}
                className="px-6 py-2.5 rounded-md border border-gray-600 
                  text-gray-300 hover:bg-gray-700 transition duration-150 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-offset-gray-800 focus:ring-gray-500"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-md bg-blue-600 text-white 
                  hover:bg-blue-700 transition duration-150 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-offset-gray-800 focus:ring-blue-500"
              >
                Next: Experience
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
