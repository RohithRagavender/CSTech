const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    default: []
  }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || !this.password.startsWith('$2b$')) { 

      // Check if password is already hashed (bcrypt hashed passwords start with "$2b$") 
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (err) {
        console.error("Error Hashing Password:", err);
        next(err);
      }
    }
    next();
  });

const User = mongoose.model('User', UserSchema);
module.exports = User;
