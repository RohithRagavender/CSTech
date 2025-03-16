const express = require('express');
const bcrypt = require('bcryptjs');
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

const router = express.Router();

// Get a single agent by ID with tasks populated 
router.get('/:id', async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id).populate("tasks");
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    res.status(200).json(agent);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});


//  POST request for creating agents 
router.post('/', auth, async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    let agent = await Agent.findOne({ email });
    if (agent) {
      return res.status(400).json({ message: 'Agent already exists' });
    }

    agent = new Agent({ name, email, mobile, password });
    await agent.save();

    res.status(201).json({ message: 'Agent created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET request for fetching agents 
router.get('/', auth, async (req, res) => {
  try {
    const agents = await Agent.find().populate('tasks');
    res.status(200).json(agents);
  } catch (err) {
    console.error('Error fetching agents:', err.message);
    res.status(500).json({ message: 'Failed to load agents' });
  }
});

//  Update Agent 
router.put('/:id', auth, async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) return res.status(404).json({ message: 'Agent not found' });

    agent.name = name;
    agent.email = email;
    agent.mobile = mobile;

    await agent.save();

    res.status(200).json({ message: 'Agent updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

//  Delete Agent 
router.delete('/:id', auth, async (req, res) => {
  try {
    await Agent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Agent deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// ✅ Remove all tasks from agent
router.delete('/:id/tasks', async (req, res) => {
  try {
    const { id } = req.params;
    await Agent.findByIdAndUpdate(id, { $set: { tasks: [] } });
    res.status(200).json({ message: 'All tasks removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove tasks' });
  }
});


module.exports = router;
