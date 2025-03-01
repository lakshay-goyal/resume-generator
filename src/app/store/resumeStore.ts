import { atom } from 'jotai';
import { ResumeData } from '../types';

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    linkedin: 'https://linkedin.com/in/johndoe',
    website: 'https://johndoe.com',
  },
  education: [
    {
      school: 'Harvard University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2018-09',
      endDate: '2022-05',
      gpa: '3.8',
      location: 'Cambridge, MA',
    },
    {
      school: 'MIT',
      degree: 'Master of Science',
      field: 'Artificial Intelligence',
      startDate: '2022-09',
      endDate: '2024-05',
      gpa: '3.9',
      location: 'Cambridge, MA',
    }
  ],
  experience: [
    {
      company: 'Google',
      position: 'Software Engineer',
      location: 'Mountain View, CA',
      startDate: '2022-06',
      endDate: '2023-12',
      current: false,
      description: 'Developed and maintained large-scale applications using React and Node.js. Led a team of 5 developers for a critical project.',
    },
    {
      company: 'Microsoft',
      position: 'Senior Software Engineer',
      location: 'Seattle, WA',
      startDate: '2024-01',
      endDate: '',
      current: true,
      description: 'Leading frontend development team, implementing new features and optimizing performance.',
    }
  ],
  skills: {
    'Programming Languages': [
      'JavaScript',
      'TypeScript',
      'Python',
      'Java',
      'C++',
    ],
    'Frontend Development': [
      'React',
      'Next.js',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
    ],
    'Backend Development': [
      'Node.js',
      'Express',
      'MongoDB',
      'PostgreSQL',
      'REST APIs',
    ],
    'Tools & Technologies': [
      'Git',
      'Docker',
      'AWS',
      'CI/CD',
      'Agile',
    ],
  },
  projects: [
    {
      title: 'Personal Portfolio Website',
      description: 'Developed a responsive portfolio website using modern web technologies',
      technologies: ['React', 'Next.js', 'Tailwind CSS'],
      link: 'https://github.com/example/portfolio',
      startDate: '2023-01',
      endDate: '2023-03',
      current: false,
    }
  ],
};

export const resumeDataAtom = atom<ResumeData>(initialResumeData);
export const selectedTemplateAtom = atom<string>('template1');