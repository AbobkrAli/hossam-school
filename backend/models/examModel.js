import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userScoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  score: { type: Number, required: true },
});

const questionSchema = new Schema({
  question: { type: String, required: true },
  answers: [{ type: String, required: true }],
  realAnswer: { type: String, required: true }
});

const examSchema = new Schema({
  name: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  grade: { type: String, required: true },
  questions: [questionSchema],
  userScores: [userScoreSchema] // Array of objects containing user data and their scores
});

export default model('Exam', examSchema);
