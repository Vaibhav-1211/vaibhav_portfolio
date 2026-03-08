import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { body, validationResult } from 'express-validator';
import { projects, skills } from './data/portfolioData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date() });
});

app.get('/api/projects', (req: Request, res: Response) => {
    res.json(projects);
});

app.get('/api/skills', (req: Request, res: Response) => {
    res.json(skills);
});

app.post(
    '/api/contact',
    [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('subject').notEmpty().withMessage('Subject is required'),
        body('message').notEmpty().withMessage('Message is required'),
    ],
    (req: Request, res: Response): any => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, subject, message } = req.body;

        // In a real app, this would send an email or save to a DB.
        console.log(`[Contact Form Submission] Name: ${name}, Email: ${email}, Subject: ${subject}`);

        res.json({
            success: true,
            message: "Thank you for reaching out! I'll get back to you soon.",
        });
    }
);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
