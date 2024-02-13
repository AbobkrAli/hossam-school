import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import multer from 'multer'; // Import multer
import cors from 'cors';
import fs from 'fs'; // Import fs module
// import { authAdminMiddleware } from './controllers/adminController.js';
import { signOut } from './middleware/authMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import examRoutes from './routes/examRoutes.js';
import videoRoutes from './routes/videoRoutes.js'
import { verifyJWTFromCookie } from './middleware/authMiddleware.js';

dotenv.config();

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://hossam-school-dnhj.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);



  
  connectDB();

  
  app.get('/api/check-user', (req, res) => {
    const jwtResult = verifyJWTFromCookie(req);  
    if (!jwtResult) {
      // Invalid or expired token, or no token found
      res.send({ role: 'Unauthorized' });
      return;
    }
  
    const { role, userId } = jwtResult;
    console.log(role, userId);
  
    if (role === 'user') {
      // User-specific logic
      res.send({ role: 'user', userId: userId });
    } else if (role === 'admin') {
      // Admin-specific logic
      res.send({ role: 'admin', userId: userId });
    } else {
      // Unexpected role
      res.send({ role: 'Unknown role' });
    }
  });
  

app.use('/api/signout', signOut)

// app.use('/sign-out', authAdminMiddleware, signOut)
app.use('/api/user', userRoutes)
app.use('/api/exam', examRoutes)
app.use('/api/video', videoRoutes)







app.get('/', (req, res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
