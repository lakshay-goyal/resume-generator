'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';
import { School, Calendar, GraduationCap, MapPin, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

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
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="form-card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-active animate-pulse-subtle" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
          </div>

          <h1 className="form-header">Education Details</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {resumeData.education.map((edu, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-lg space-y-4 relative animate-fade-in"
              >
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 
                    transition-colors p-1 hover:bg-red-400/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="form-label">School/University</label>
                    <div className="relative">
                      <School className="input-icon w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="University Name"
                        className="form-input input-with-icon"
                        value={edu.school}
                        onChange={(e) =>
                          updateEducation(index, 'school', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Degree</label>
                    <div className="relative">
                      <GraduationCap className="input-icon w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Bachelor's, Master's, etc."
                        className="form-input input-with-icon"
                        value={edu.degree}
                        onChange={(e) =>
                          updateEducation(index, 'degree', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Field of Study</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Computer Science, Business, etc."
                        className="form-input"
                        value={edu.field}
                        onChange={(e) =>
                          updateEducation(index, 'field', e.target.value)
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
                        value={edu.location}
                        onChange={(e) =>
                          updateEducation(index, 'location', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Start Date</label>
                    <div className="relative">
                      <Calendar className="input-icon w-5 h-5" />
                      <input
                        type="month"
                        required
                        className="form-input input-with-icon"
                        value={edu.startDate}
                        onChange={(e) =>
                          updateEducation(index, 'startDate', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">End Date (or Expected)</label>
                    <div className="relative">
                      <Calendar className="input-icon w-5 h-5" />
                      <input
                        type="month"
                        required
                        className="form-input input-with-icon"
                        value={edu.endDate}
                        onChange={(e) =>
                          updateEducation(index, 'endDate', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">GPA (Optional)</label>
                    <input
                      type="text"
                      placeholder="3.8"
                      className="form-input"
                      value={edu.gpa}
                      onChange={(e) =>
                        updateEducation(index, 'gpa', e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}

            {!showAddForm ? (
              <button
                type="button"
                onClick={() => setShowAddForm(true)}
                className="btn-secondary w-full group"
              >
                <span className="inline-flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2 transition-transform group-hover:scale-125" />
                  Add Another Education
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={addEducation}
                className="btn-primary w-full group"
              >
                <span className="inline-flex items-center justify-center">
                  Save Education Entry
                  <Plus className="w-5 h-5 ml-2 transition-transform group-hover:rotate-90" />
                </span>
              </button>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/personal-info')}
                className="btn-secondary group"
              >
                <span className="inline-flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                  Back
                </span>
              </button>
              <button
                type="submit"
                className="btn-primary group"
              >
                <span className="inline-flex items-center">
                  Next: Experience
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
