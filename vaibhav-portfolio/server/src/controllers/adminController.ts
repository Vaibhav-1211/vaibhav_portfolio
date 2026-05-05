import { Request, Response } from 'express';
import Profile from '../models/Profile';
import Skill from '../models/Skill';
import Experience from '../models/Experience';
import Project from '../models/Project';
import Education from '../models/Education';
import ContactMessage from '../models/ContactMessage';
import cloudinary from '../config/cloudinary';

export const updateProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;
    let profilePhotoUrl = data.profilePhoto;

    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const cldRes = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });
      profilePhotoUrl = cldRes.secure_url;
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      {},
      { ...data, profilePhoto: profilePhotoUrl },
      { new: true, upsert: true }
    );
    res.json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
};

// Generic CRUD handlers
const createItem = (Model: any) => async (req: Request, res: Response) => {
  try {
    const newItem = await Model.create(req.body);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
};

const updateItem = (Model: any) => async (req: Request, res: Response) => {
  try {
    const updatedItem = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
};

const deleteItem = (Model: any) => async (req: Request, res: Response) => {
  try {
    const deletedItem = await Model.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
};

// Skills
export const createSkill = createItem(Skill);
export const updateSkill = updateItem(Skill);
export const deleteSkill = deleteItem(Skill);

// Experience
export const createExperience = createItem(Experience);
export const updateExperience = updateItem(Experience);
export const deleteExperience = deleteItem(Experience);

// Projects
export const createProject = async (req: Request, res: Response): Promise<void> => {
  try {
    let image = req.body.image;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const cldRes = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });
      image = cldRes.secure_url;
    }
    
    // Convert stack string back to array if it comes as comma separated string due to form-data
    let stack = req.body.stack;
    if (typeof stack === 'string') {
        stack = stack.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const newProject = await Project.create({ ...req.body, image, stack });
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: 'Error creating project' });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  try {
    let image = req.body.image;
    if (req.file) {
      const b64 = Buffer.from(req.file.buffer).toString('base64');
      const dataURI = `data:${req.file.mimetype};base64,${b64}`;
      const cldRes = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });
      image = cldRes.secure_url;
    }

    let stack = req.body.stack;
    if (typeof stack === 'string') {
        stack = stack.split(',').map((s: string) => s.trim()).filter(Boolean);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, ...(image && { image }), ...(stack && { stack }) },
      { new: true }
    );
    if (!updatedProject) {
      res.status(404).json({ message: 'Project not found' });
      return;
    }
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Error updating project' });
  }
};
export const deleteProject = deleteItem(Project);

// Education
export const createEducation = createItem(Education);
export const updateEducation = updateItem(Education);
export const deleteEducation = deleteItem(Education);

// Messages
export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

export const markMessageRead = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!updatedMessage) {
      res.status(404).json({ message: 'Message not found' });
      return;
    }
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating message' });
  }
};
