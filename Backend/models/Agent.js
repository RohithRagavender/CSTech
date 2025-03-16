const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AgentSchema = new mongoose.Schema({
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
  tasks: [
    {
      firstName: String,
      phone: String,
      notes: String
    }
  ]
});

//  Pre-save hook to hash the password before saving the agent 
AgentSchema.pre('save', async function (next) {
  if (this.isModified('password') || !this.password.startsWith('$2b$')) {
    try {
     
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
  
    } catch (err) {
      console.error('Error hashing password:', err);
      next(err);
    }
  }
  next();
});

const Agent = mongoose.model('Agent', AgentSchema);
module.exports = Agent;
 

// what is pre-save hook? 
// A pre-save hook is a middleware function that Mongoose runs before saving a document to the database. 
// It is defined on the schema level and is executed before the save() method is called on a document.
// In this case, the pre-save hook is used to hash the password before saving the agent to the database.
// The hook checks if the password is modified or not hashed (bcrypt hashed passwords start with "$2b$").
// If the password is not hashed, it generates a salt and hashes the password using bcrypt.

 // why i am using this hook?
// The pre-save hook is used to ensure that the password is always hashed before saving the agent to the database.
// This helps in securely storing the agent's password and protecting it from unauthorized access.
// By hashing the password before saving it, we can ensure that the agent's sensitive information is stored securely.