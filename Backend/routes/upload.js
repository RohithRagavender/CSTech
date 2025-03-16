const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const xlsx = require('xlsx'); //  For XLS and XLSX files
const fs = require('fs');
const path = require('path');
const Agent = require('../models/Agent');
const auth = require('../middleware/auth');

const router = express.Router();

//  Multer Storage Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Fix MIME Type Issue for CSV, XLS, XLSX
const fileFilter = (req, file, cb) => {

  const allowedTypes = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ];

  if (allowedTypes.includes(file.mimetype) || /\.(csv|xls|xlsx)$/.test(file.originalname)) {
    cb(null, true);
  } else {
    cb(new Error('Only CSV, XLS, XLSX files are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Upload and Process File
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const filePath = path.join(__dirname, '../uploads', req.file.filename);
    const records = [];

    //  Determine File Type
    if (req.file.mimetype === 'text/csv' || req.file.originalname.endsWith('.csv')) {

      // Read CSV File using 'csv-parser' module
      fs.createReadStream(filePath)
        .pipe(csvParser())
        .on('data', (data) => {
          if (!data.FirstName || !data.Phone || !data.Notes) {
            return;
          }
          records.push(data);
        })
        .on('end', async () => {
          await handleData(records, res, filePath);
        });

    } else if (
      req.file.mimetype === 'application/vnd.ms-excel' || // XLS
      req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || // XLSX
      req.file.originalname.endsWith('.xls') ||
      req.file.originalname.endsWith('.xlsx')
    ) {
      //  Read XLS/XLSX File using 'xlsx' module  
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

      if (data.length === 0) {
        return res.status(400).json({ message: 'XLS/XLSX is empty or invalid format' });
      }

      data.forEach((record) => {
        if (record.FirstName && record.Phone && record.Notes) {
          records.push(record);
        }
      });

      await handleData(records, res, filePath);
    }
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});

//  Helper Function to Handle Distribution of Tasks to Agents 
const handleData = async (records, res, filePath) => {
  if (records.length === 0) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: 'File is empty or invalid format' });
  }


  //  Get Agents from DB 
  const agents = await Agent.find();
  if (agents.length < 5) {
    fs.unlinkSync(filePath);
    return res.status(400).json({ message: 'Not enough agents to distribute tasks' });
  }

  //  Shuffle Agents for Fair Distribution 
  const shuffledAgents = agents.sort(() => Math.random() - 0.5);

  //  Distribute Tasks Evenly Among Agents 
  let agentIndex = 0;
  for (let record of records) {
    shuffledAgents[agentIndex].tasks.push({
      firstName: record.FirstName,
      phone: record.Phone,
      notes: record.Notes
    });

    agentIndex = (agentIndex + 1) % shuffledAgents.length;
  }

  // Save Updated Agents to DB
  await Promise.all(shuffledAgents.map((agent) => agent.save()));

  // Clean Up Uploaded File
  fs.unlinkSync(filePath);

  res.status(200).json({ message: 'Tasks distributed successfully' });
};

module.exports = router;
