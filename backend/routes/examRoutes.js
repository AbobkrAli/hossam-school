import express from 'express';
import { addExam, addUserScoreToExam, deleteExam, getExam, getExams, getUserScores } from '../controllers/examController.js';
import { protectAdmin, protectUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add-exam',protectAdmin, addExam);
router.get('/get-exams', getExams);
router.get('/:id/get-exam', getExam);
router.get('/:examId/get-score', getUserScores);
router.delete('/delete-exam',protectAdmin, deleteExam);
router.post('/addUserScoreToExam', addUserScoreToExam)

export default router;
