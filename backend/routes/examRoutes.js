import express from 'express';
import { addExam, addUserScoreToExam, deleteExam, getExam, getExams, getUserScores } from '../controllers/examController.js';
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-exam',protectAdmin, addExam);
router.get('/get-exams',protectUser, getExams);
router.get('/:id/get-exam',protectUser, getExam);
router.get('/:examId/get-score',protectAdmin, getUserScores);
router.delete('/delete-exam',protectAdmin, deleteExam);
router.post('/addUserScoreToExam',protectUser, addUserScoreToExam)

export default router;
