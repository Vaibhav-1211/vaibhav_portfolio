import { Router } from 'express';
import { upload } from '../middleware/upload';
import {
  updateProfile,
  createSkill, updateSkill, deleteSkill,
  createExperience, updateExperience, deleteExperience,
  createProject, updateProject, deleteProject,
  createEducation, updateEducation, deleteEducation,
  getMessages, markMessageRead
} from '../controllers/adminController';

const router = Router();

// Profile
router.put('/profile', upload.single('profilePhoto'), updateProfile);

// Skills
router.post('/skills', createSkill);
router.put('/skills/:id', updateSkill);
router.delete('/skills/:id', deleteSkill);

// Experience
router.post('/experience', createExperience);
router.put('/experience/:id', updateExperience);
router.delete('/experience/:id', deleteExperience);

// Projects
router.post('/projects', upload.single('image'), createProject);
router.put('/projects/:id', upload.single('image'), updateProject);
router.delete('/projects/:id', deleteProject);

// Education
router.post('/education', createEducation);
router.put('/education/:id', updateEducation);
router.delete('/education/:id', deleteEducation);

// Messages
router.get('/messages', getMessages);
router.put('/messages/:id/read', markMessageRead);

export default router;
