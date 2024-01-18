import express from 'express';
import cors from 'cors';  // Import the cors middleware
import user from './student.module.js';
import mongooseConnection from './connection.js';
import bodyParser from 'body-parser';
const app = express();

// Use cors middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

mongooseConnection
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error', err);
  });
// CREATING RECORD ({ C })
// Inserting records in database
app.post('/insert', async (req, res) => {
  try {
    const std=req.body;
    console.log(std);
    const { name, roll, age, gender } = req.body;
    const newUser = new user({
      name,
      roll,
      age,
      gender,
    });
    await newUser.save();
    console.log('Student data inserted:', newUser);
    res.send({
       student:std
    });
  } catch (error) {
    console.error('Error inserting student data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATING RECORD ({ U })
// Updating an existing record
app.put('/update', async (req, res) => {
  try {
    const { name, roll, age, gender } = req.body;
    const updatedUser = await user.findOneAndUpdate({ roll: roll }, { name, age, gender }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Student data updated:', updatedUser);
    res.json({ student: updatedUser });
  } catch (error) {
    console.error('Error updating student data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETING RECORD ({ D })
// Deleting an existing record
app.delete('/delete', async (req, res) => {
  try {
    const rollToDelete = req.query.roll;
    const deletedUser = await user.findOneAndDelete({ roll: rollToDelete });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    console.log('Student data deleted:', deletedUser);
    res.json({ student: deletedUser });
  } catch (error) {
    console.error('Error deleting student data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//READING RECORD ({ R })
app.get('/fetch', async (req, res) => {
  try {
    const fetchme = req.query.roll; // Use req.query to get parameters from the query string
    const student = await user.findOne({ roll: fetchme });
    console.log(student);
    if (student==null) {
      return res.status(404).json({ error: 'User not found' });
    }
    else{
      res.json({
        student
      });
    }
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
