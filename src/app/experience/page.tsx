'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';
import { 
  Briefcase, 
  Building2, 
  MapPin, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X 
} from 'lucide-react';

export default function Experience() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    console.log('Experience page loaded with data:', resumeData);
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
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="form-card">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-active animate-pulse-subtle" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
          </div>

          <h1 className="form-header">Work Experience</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {resumeData.experience.map((exp, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-lg space-y-4 relative animate-fade-in"
              >
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 
                    transition-colors p-1 hover:bg-red-400/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group">
                    <label className="form-label">Company</label>
                    <div className="relative">
                      <Building2 className="input-icon w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Company Name"
                        className="form-input input-with-icon"
                        value={exp.company}
                        onChange={(e) =>
                          updateExperience(index, 'company', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">Position</label>
                    <div className="relative">
                      <Briefcase className="input-icon w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="Job Title"
                        className="form-input input-with-icon"
                        value={exp.position}
                        onChange={(e) =>
                          updateExperience(index, 'position', e.target.value)
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
                        value={exp.location}
                        onChange={(e) =>
                          updateExperience(index, 'location', e.target.value)
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
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(index, 'startDate', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="form-label">End Date</label>
                    <div className="relative">
                      <Calendar className="input-icon w-5 h-5" />
                      <input
                        type="month"
                        required={!exp.current}
                        disabled={exp.current}
                        className="form-input input-with-icon disabled:opacity-50"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(index, 'endDate', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="flex items-center space-x-2 text-gray-200 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-gray-600 bg-gray-700/60 text-blue-500 
                          focus:ring-blue-500 focus:ring-offset-gray-800"
                        checked={exp.current}
                        onChange={(e) =>
                          updateExperience(index, 'current', e.target.checked)
                        }
                      />
                      <span className="group-hover:text-blue-400 transition-colors">
                        I currently work here
                      </span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your responsibilities and achievements..."
                      className="form-input"
                      value={exp.description}
                      onChange={(e) =>
                        updateExperience(index, 'description', e.target.value)
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
                  Add Another Experience
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={addExperience}
                className="btn-primary w-full group"
              >
                <span className="inline-flex items-center justify-center">
                  Save Experience Entry
                  <Plus className="w-5 h-5 ml-2 transition-transform group-hover:rotate-90" />
                </span>
              </button>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/education')}
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
                  Next: Skills
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
