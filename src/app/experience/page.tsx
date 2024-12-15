'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';

export default function Experience() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    console.log('Experience page loaded with data:', resumeData);
    console.log('Education data received:', resumeData.education);
  }, [resumeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Experience data being sent:', resumeData.experience);
    router.push('/skills');
  };

  const addExperience = (e: React.FormEvent) => {
    e.preventDefault();
    const newExperience = {
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    setResumeData({
      ...resumeData,
      experience: [...resumeData.experience, newExperience],
    });
    setShowAddForm(false);
  };

  const removeExperience = (index: number) => {
    const updatedExperience = resumeData.experience.filter((_, i) => i !== index);
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  const updateExperience = (index: number, field: string, value: string | boolean) => {
    const updatedExperience = resumeData.experience.map((exp, i) => {
      if (i === index) {
        return { ...exp, [field]: value };
      }
      return exp;
    });
    setResumeData({
      ...resumeData,
      experience: updatedExperience,
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Work Experience
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="bg-gray-700 p-6 rounded-lg space-y-4 relative"
              >
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300"
                >
                  Remove
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company Name"
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(index, 'company', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Job Title"
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={exp.position}
                      onChange={(e) =>
                        updateExperience(index, 'position', e.target.value)
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
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(index, 'location', e.target.value)
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
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(index, 'startDate', e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      End Date
                    </label>
                    <input
                      type="month"
                      required={!exp.current}
                      disabled={exp.current}
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150 disabled:opacity-50"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(index, 'endDate', e.target.value)
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2 text-gray-200">
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 bg-gray-700 text-blue-500 
                          focus:ring-blue-500 focus:ring-offset-gray-800"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(index, 'current', e.target.checked)
                        }
                      />
                      <span>I currently work here</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-200 mb-1">
                      Description
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your responsibilities and achievements..."
                      className="w-full px-4 py-2 rounded-md border border-gray-600 
                        bg-gray-700 text-white placeholder-gray-400
                        focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                        transition duration-150"
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(index, 'description', e.target.value)
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
                + Add Another Experience
              </button>
            )}

            {showAddForm && (
              <button
                type="button"
                onClick={addExperience}
                className="w-full py-2.5 rounded-md bg-blue-600 text-white 
                  hover:bg-blue-700 transition duration-150"
              >
                Save Experience Entry
              </button>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/education')}
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
                Next: Skills
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
