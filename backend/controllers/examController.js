import Exam from '../models/examModel.js';
import User from '../models/userModel.js';

export const addExam = async (req, res) => {
  try {
    const { name, subject, content, grade, questions } = req.body;
    const exam = await Exam.create({ name, subject, content, grade, questions });
    res.status(201).json({ message: 'Exam added successfully', exam });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add exam', error: error.message });
  }
};

export const getUserScores = async (req, res) => {
  try {
    const { examId } = req.params;
    // Find the exam by its ID
    const exam = await Exam.findById(examId).populate('userScores.userId');

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    // Extract user scores along with user data
    const userScoresData = exam.userScores.map(userScore => {
      return {
        username: userScore.userId.username,
        number: userScore.userId.number,
        grade: userScore.userId.grade,
        score: userScore.score
      };
    });

    res.status(200).json(userScoresData);
  } catch (error) {
    console.error('Failed to fetch user scores:', error);
    res.status(500).json({ message: 'Failed to fetch user scores' });
  }
};

export const addUserScoreToExam = async (req, res) => {
  try {
    const { exam, userId, score } = req.body;

    // Check if the user's userId already exists in the userScores array of the exam
    const examToUpdate = await Exam.findById(exam);
    if (!examToUpdate) {
      throw new Error('Exam not found');
    }

    const userExists = examToUpdate.userScores.some(userScore => userScore.userId.equals(userId));
    if (userExists) {
      return res.status(400).json({ message: 'User score already exists for this exam' });
    }

    // Add the user's score to the exam
    const updatedExam = await Exam.findByIdAndUpdate(
      exam,
      { $addToSet: { userScores: { userId, score } } },
      { new: true }
    );
    return res.status(200).json(updatedExam);
  } catch (error) {
    console.error('Failed to add user score to the exam:', error);
    return res.status(500).json({ message: 'Failed to add user score to the exam' });
  }
};

export const deleteExam = async (req, res) =>{
  try{
    const { id } = req.body;

    const exam = await Exam.findByIdAndDelete(id);
    if(!exam) {
      return res.status(404).json({ error: "Exam not found based on provided ID" });
    }
    res.status(200).send('Exam is deleted successfully');
  } catch(err){
    console.error('Error:', err.message);
    res.status(500).json({ error: "Internal server error" });
  }
}

export const getExam = async(req, res) => {
  try {
    const { id } = req.params;

    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).send('Failed to fetch exam (backend)');
    }
    res.status(200).json({ message: 'Successfully fetched exam', data: exam });
  } catch (err) {
    console.error('Error fetching exam:', err);
    return res.status(500).send({ error: 'Internal server error', message: err.message });
  }
}


export const getExams = async(req, res) => {
  try {
    const exams = await Exam.find();

    res.status(200).json({ message: 'Got exams successfully', data: exams });
  } catch(err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error', message: err.message });
  }
}
