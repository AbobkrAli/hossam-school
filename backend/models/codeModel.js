import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const codeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  grade: { type: String, required: true }
});

export default model('Code', codeSchema);
