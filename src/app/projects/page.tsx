'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';
import { 
  Code2, 
  Link as LinkIcon, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X,
  Eye,
  Tags
} from 'lucide-react';

export default function Projects() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTechnology, setNewTechnology] = useState('');

  useEffect(() => {
    console.log('Projects page loaded with data:', resumeData);
  }, [resumeData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Projects data being sent:', resumeData.projects);
    router.push('/preview');
  };

  const addProject = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      title: '',
      description: '',
      technologies: [],
      link: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    setResumeData({
      ...resumeData,
      projects: [...(resumeData.projects || []), newProject],
    });
    setShowAddForm(false);
  };

  const removeProject = (index: number) => {
    const updatedProjects = resumeData.projects.filter((_, i) => i !== index);
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const updateProject = (index: number, field: string, value: string | boolean | string[]) => {
    const updatedProjects = resumeData.projects.map((proj, i) => {
      if (i === index) {
        return { ...proj, [field]: value };
      }
      return proj;
    });
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
    });
  };

  const addTechnology = (index: number) => {
    if (newTechnology.trim()) {
      const updatedProjects = resumeData.projects.map((proj, i) => {
        if (i === index) {
          return {
            ...proj,
            technologies: [...proj.technologies, newTechnology.trim()]
          };
        }
        return proj;
      });
      setResumeData({
        ...resumeData,
        projects: updatedProjects,
      });
      setNewTechnology('');
    }
  };

  const removeTechnology = (projectIndex: number, techIndex: number) => {
    const updatedProjects = resumeData.projects.map((proj, i) => {
      if (i === projectIndex) {
        return {
          ...proj,
          technologies: proj.technologies.filter((_, index) => index !== techIndex)
        };
      }
      return proj;
    });
    setResumeData({
      ...resumeData,
      projects: updatedProjects,
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
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-active animate-pulse-subtle" />
            <div className="progress-step progress-step-inactive" />
          </div>

          <h1 className="form-header">Projects</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {resumeData.projects?.map((project, index) => (
              <div
                key={index}
                className="glass-effect p-6 rounded-lg space-y-4 relative animate-fade-in"
              >
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-300 
                    transition-colors p-1 hover:bg-red-400/10 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="input-group md:col-span-2">
                    <label className="form-label">Project Title</label>
                    <div className="relative">
                      <Code2 className="input-icon w-5 h-5" />
                      <input
                        type="text"
                        required
                        placeholder="My Awesome Project"
                        className="form-input input-with-icon"
                        value={project.title}
                        onChange={(e) =>
                          updateProject(index, 'title', e.target.value)
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
                        value={project.startDate}
                        onChange={(e) =>
                          updateProject(index, 'startDate', e.target.value)
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
                        required={!project.current}
                        disabled={project.current}
                        className="form-input input-with-icon disabled:opacity-50"
                        value={project.endDate}
                        onChange={(e) =>
                          updateProject(index, 'endDate', e.target.value)
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
                        checked={project.current}
                        onChange={(e) =>
                          updateProject(index, 'current', e.target.checked)
                        }
                      />
                      <span className="group-hover:text-blue-400 transition-colors">
                        This is an ongoing project
                      </span>
                    </label>
                  </div>

                  <div className="input-group md:col-span-2">
                    <label className="form-label">Project Link (Optional)</label>
                    <div className="relative">
                      <LinkIcon className="input-icon w-5 h-5" />
                      <input
                        type="url"
                        placeholder="https://github.com/your-project"
                        className="form-input input-with-icon"
                        value={project.link}
                        onChange={(e) =>
                          updateProject(index, 'link', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">Project Description</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your project, its features, and your role..."
                      className="form-input"
                      value={project.description}
                      onChange={(e) =>
                        updateProject(index, 'description', e.target.value)
                      }
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="form-label">Technologies Used</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="bg-gray-700/60 backdrop-blur-sm px-3 py-1 rounded-full 
                            flex items-center gap-2 animate-fade-in hover:bg-gray-600/60 
                            transition-colors"
                        >
                          <span className="text-white">{tech}</span>
                          <button
                            type="button"
                            onClick={() => removeTechnology(index, techIndex)}
                            className="text-red-400 hover:text-red-300 transition-colors"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tags className="input-icon w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Add technology (e.g., React, Node.js)"
                          className="form-input input-with-icon"
                          value={newTechnology}
                          onChange={(e) => setNewTechnology(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              addTechnology(index);
                            }
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => addTechnology(index)}
                        className="btn-secondary"
                      >
                        Add
                      </button>
                    </div>
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
                  Add Another Project
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={addProject}
                className="btn-primary w-full group"
              >
                <span className="inline-flex items-center justify-center">
                  Save Project
                  <Plus className="w-5 h-5 ml-2 transition-transform group-hover:rotate-90" />
                </span>
              </button>
            )}

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/skills')}
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
                  Preview Resume
                  <Eye className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 