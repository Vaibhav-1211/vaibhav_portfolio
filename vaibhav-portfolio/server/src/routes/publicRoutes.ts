import { Router } from 'express';
import { getProfile, getSkills, getExperience, getProjects, getEducation, submitContact } from '../controllers/publicController';
import rateLimit from 'express-rate-limit';

const router = Router();

const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: { message: 'Too many contact requests from this IP, please try again after 15 minutes' }
});

router.get('/profile', getProfile);
router.get('/skills', getSkills);
router.get('/experience', getExperience);
router.get('/projects', getProjects);
router.get('/education', getEducation);
router.post('/contact', contactLimiter, submitContact);

export default router;
