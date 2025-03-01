'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';
import { FolderPlus, Plus, ChevronLeft, Eye } from 'lucide-react';

export default function Skills() {
  const router = useRouter();
  const [resumeData, setResumeData] = useAtom(resumeDataAtom);
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    console.log('Skills page loaded with data:', resumeData);
  }, [resumeData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Skills data being sent:', resumeData.skills);
      await router.push('/projects');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && selectedCategory) {
      try {
        const updatedSkills = { ...resumeData.skills };
        if (!updatedSkills[selectedCategory]) {
          updatedSkills[selectedCategory] = [];
        }
        updatedSkills[selectedCategory] = [
          ...updatedSkills[selectedCategory],
          newSkill.trim()
        ];
        
        setResumeData({
          ...resumeData,
          skills: updatedSkills,
        });
        setNewSkill('');
      } catch (error) {
        console.error('Error adding skill:', error);
      }
    }
  };

  const removeSkill = (category: string, skillIndex: number) => {
    const updatedSkills = { ...resumeData.skills };
    updatedSkills[category] = updatedSkills[category].filter((_, index) => index !== skillIndex);
    
    // Remove category if no skills remain
    if (updatedSkills[category].length === 0) {
      delete updatedSkills[category];
    }
    
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
    });
  };

  const addCategory = () => {
    if (newCategory.trim() && !resumeData.skills[newCategory.trim()]) {
      setResumeData({
        ...resumeData,
        skills: {
          ...resumeData.skills,
          [newCategory.trim()]: [],
        },
      });
      setNewCategory('');
      setSelectedCategory(newCategory.trim());
    }
  };

  const removeCategory = (category: string) => {
    const updatedSkills = { ...resumeData.skills };
    delete updatedSkills[category];
    setResumeData({
      ...resumeData,
      skills: updatedSkills,
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
            <div className="progress-step progress-step-active animate-pulse-subtle" />
            <div className="progress-step progress-step-inactive" />
            <div className="progress-step progress-step-inactive" />
          </div>

          <h1 className="form-header">Skills & Expertise</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Add new category */}
            <div className="form-section">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <FolderPlus className="input-icon w-5 h-5" />
                  <input
                    type="text"
                    placeholder="New Category (e.g., Programming Languages)"
                    className="form-input input-with-icon"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={addCategory}
                  className="btn-secondary"
                >
                  Add Category
                </button>
              </div>
            </div>

            {/* Add new skill */}
            <div className="form-section">
              <div className="flex gap-2">
                <select
                  className="form-input flex-1"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {Object.keys(resumeData.skills).map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <div className="relative flex-1">
                  <Plus className="input-icon w-5 h-5" />
                  <input
                    type="text"
                    placeholder="New Skill"
                    className="form-input input-with-icon"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn-secondary"
                >
                  Add Skill
                </button>
              </div>
            </div>

            {/* Display skills by category */}
            <div className="space-y-4">
              {Object.entries(resumeData.skills).map(([category, skills]) => (
                <div
                  key={category}
                  className="glass-effect p-4 rounded-lg space-y-2 animate-fade-in"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      {category}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove Category
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gray-700/60 backdrop-blur-sm px-3 py-1 rounded-full 
                          flex items-center gap-2 animate-fade-in hover:bg-gray-600/60 
                          transition-colors"
                      >
                        <span className="text-white">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(category, index)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => router.push('/experience')}
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
                  Next: Projects
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}