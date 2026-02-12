import User from '../models/User.js';
import { signToken } from '../services/authService.js';

export const signup = async (req, res) => {
  try {
    const newUser = await User.create({
      email: req.body.email,
      password: req.body.password,
    });
    
    const token = signToken(newUser._id);
    res.status(201).json({ status: 'success', token });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  //  Check if email and password exist
  const user = await User.findOne({ email }).select('+password');
  
 //Check if user exists && password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }

  //  Send token
  const token = signToken(user._id);
  res.status(200).json({ status: 'success', token });
};