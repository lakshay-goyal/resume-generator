'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { resumeDataAtom } from '../store/resumeStore';
import { useState, useEffect } from 'react';

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
      console.log('Navigating to preview with data:', resumeData);
      await router.push('/preview');
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
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Skills
          </h1>

          <form 
            onSubmit={handleSubmit} 
            className="space-y-6"
          >
            {/* Add new category */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New Category (e.g., Programming Languages)"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addCategory}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white 
                    hover:bg-blue-700 transition duration-150"
                >
                  Add Category
                </button>
              </div>
            </div>

            {/* Add new skill */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  className="flex-1 px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
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
                <input
                  type="text"
                  placeholder="New Skill"
                  className="flex-1 px-4 py-2 rounded-md border border-gray-600 
                    bg-gray-700 text-white placeholder-gray-400
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500 
                    transition duration-150"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white 
                    hover:bg-blue-700 transition duration-150"
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
                  className="bg-gray-700 p-4 rounded-lg space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      {category}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Remove Category
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <div
                        key={index}
                        className="bg-gray-600 px-3 py-1 rounded-full 
                          flex items-center gap-2"
                      >
                        <span className="text-white">{skill}</span>
                        <button
                          type="button"
                          onClick={() => removeSkill(category, index)}
                          className="text-red-400 hover:text-red-300"
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
                className="px-6 py-2.5 rounded-md border border-gray-600 
                  text-gray-300 hover:bg-gray-700 transition duration-150"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-md bg-blue-600 text-white 
                  hover:bg-blue-700 transition duration-150"
              >
                Preview Resume
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}