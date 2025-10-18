import express from 'express';
import { addCourseData ,addExperience, getResumeData} from '../controllers/resumeData.controllers.js';
import { protect } from '../middlewares/accessControl.js';

const resumeDataRoutes = express.Router();

resumeDataRoutes.post('/add-course',addCourseData);
resumeDataRoutes.post('/add-experience',protect,addExperience);
resumeDataRoutes.get('/data', protect, getResumeData);
export default resumeDataRoutes