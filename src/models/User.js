import mongoose from 'mongoose';
import bcrypt from 'bcrypt.js';

const userSchema =new mongoose.Schema({
    email:{ type: String, required: true, unique: true, lowercase: true },
    password:{ type: String, required: true, select: false },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model('User', userSchema);