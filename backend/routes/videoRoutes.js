import express from 'express';
import { deleteVideo, getVideos, addVideo } from '../controllers/videoController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.delete('/delete-video',protectAdmin, deleteVideo);
router.post('/add-video',protectAdmin, addVideo);
router.get('/get-videos', getVideos);


export default router;