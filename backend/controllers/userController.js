import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import Code from '../models/codeModel.js';
import {generateJWT} from '../utils/generateToken.js'

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, grade, reference } = req.body;
    
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const verifiedCode = await Code.findOne({ code:reference, grade });
    //make false !verifiedCode
    if (!verifiedCode) {
      return res.status(401).json({ message: 'Invalid verification code' });
    }

    // If email doesn't exist, proceed to create the user
    const user = await User.create({ username, email, password, number:phoneNumber, grade, reference });
    const token = generateJWT(user._id, user.isAdmin ? 'admin' : 'user');
    res.setHeader(
      "Set-Cookie",
      `jwt=${token}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=2592000` // Max-Age is equivalent to 30 days in seconds
    );
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to register user from bacend endpoint', error: error.message });
  }
};


export const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Hash the provided password using the salt stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Verify user with grade and code
    

    // Generate JWT token
    const token = generateJWT(user._id, user.isAdmin ? 'admin' : 'user');
    res.setHeader(
      "Set-Cookie",
      `jwt=${token}; Path=/; Secure; HttpOnly; SameSite=None; Max-Age=2592000` // Max-Age is equivalent to 30 days in seconds
    );
    // Send the token along with user data
    res.json({ message: 'User signed in successfully', token, user });
  } catch (error) {
    res.status(500).json({ message: 'Failed to sign in user', error: error.message });
  }
};




