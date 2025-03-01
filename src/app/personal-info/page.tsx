'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useEffect } from 'react';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

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
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="form-card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="progress-step progress-step-active animate-pulse-subtle" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
          </div>

          <h1 className="form-header">
            Personal Information
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="input-group">
                <label className="form-label">Full Name</label>
                <div className="relative">
                  <User className="input-icon w-5 h-5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="form-input input-with-icon"
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
              </div>

              <div className="input-group">
                <label className="form-label">Email</label>
                <div className="relative">
                  <Mail className="input-icon w-5 h-5" />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="form-input input-with-icon"
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
              </div>

              <div className="input-group">
                <label className="form-label">Phone</label>
                <div className="relative">
                  <Phone className="input-icon w-5 h-5" />
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="form-input input-with-icon"
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
              </div>

              <div className="input-group">
                <label className="form-label">Location</label>
                <div className="relative">
                  <MapPin className="input-icon w-5 h-5" />
                  <input
                    type="text"
                    required
                    placeholder="City, Country"
                    className="form-input input-with-icon"
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
              </div>

              <div className="input-group">
                <label className="form-label">LinkedIn URL</label>
                <div className="relative">
                  <Linkedin className="input-icon w-5 h-5" />
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/username"
                    className="form-input input-with-icon"
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
              </div>

              <div className="input-group">
                <label className="form-label">Portfolio Website</label>
                <div className="relative">
                  <Globe className="input-icon w-5 h-5" />
                  <input
                    type="url"
                    placeholder="https://yourwebsite.com"
                    className="form-input input-with-icon"
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
            </div>

            <div className="flex justify-between pt-6">
              <button 
                type="button" 
                onClick={() => router.push('/')} 
                className="btn-secondary group"
              >
                <span className="inline-flex items-center">
                  <svg 
                    className="w-4 h-4 mr-2 transform transition-transform group-hover:-translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </span>
              </button>
              <button 
                type="submit" 
                className="btn-primary group"
              >
                <span className="inline-flex items-center">
                  Next: Education
                  <svg 
                    className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}