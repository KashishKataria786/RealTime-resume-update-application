import express from 'express';
import { addCourseData ,addExperience, getResumeData,addProject, addSkills, addSummary} from '../controllers/resumeData.controllers.js';
import { protect } from '../middlewares/accessControl.js';

const resumeDataRoutes = express.Router();

resumeDataRoutes.post('/add-course',protect, addCourseData);
resumeDataRoutes.post('/add-experience',protect,addExperience);
resumeDataRoutes.post('/add-project', protect, addProject)
resumeDataRoutes.get('/data', protect, getResumeData);
resumeDataRoutes.post('/add-skills', protect, addSkills);
resumeDataRoutes.post('/add-summary', protect, addSummary);
export default resumeDataRoutes