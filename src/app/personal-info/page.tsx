'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useEffect } from 'react';

export default function PersonalInfo() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);

  useEffect(() => {
    console.log('Personal Info page loaded with data:', resumeData);
  }, [resumeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Personal Info being sent:', resumeData.personalInfo);
    router.push('/education');
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Personal Information
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={resumeData.personalInfo.fullName}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        fullName: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={resumeData.personalInfo.email}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={resumeData.personalInfo.phone}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        phone: e.target.value,
                      },
                    })
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
                  value={resumeData.personalInfo.location}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        location: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={resumeData.personalInfo.linkedin}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        linkedin: e.target.value,
                      },
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Portfolio Website
                </label>
                <input
                  type="url"
                  placeholder="https://yourwebsite.com"
                  className="w-full px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={resumeData.personalInfo.website}
                  onChange={(e) =>
                    setResumeData({
                      ...resumeData,
                      personalInfo: {
                        ...resumeData.personalInfo,
                        website: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
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
                Next: Education
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}