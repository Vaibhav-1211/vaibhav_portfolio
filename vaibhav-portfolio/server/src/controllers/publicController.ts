import { Request, Response } from 'express';
import Profile from '../models/Profile';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Project from '../models/Project';
import Education from '../models/Education';
import ContactMessage from '../models/ContactMessage';

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const getSkills = async (req: Request, res: Response): Promise<void> => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching skills' });
  }
};

export const getExperience = async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.find().sort({ order: 1 });
    res.json(experience);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching experience' });
  }
};

export const getProjects = async (req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

export const getEducation = async (req: Request, res: Response): Promise<void> => {
  try {
    const education = await Education.find().sort({ order: 1 });
    res.json(education);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching education' });
  }
};

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, message } = req.body;
    const newMessage = await ContactMessage.create({ name, email, message });
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting contact message' });
  }
};
