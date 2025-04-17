const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (no deprecated options)
mongoose.connect('mongodb://localhost:27017/joincourse')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Schema and Model
const studentSchema = new mongoose.Schema({
  name: String,
  address: String,
  mobile: String,
  course: String,
  fee: Number
});

const Student = mongoose.model('Student', studentSchema);

// ✅ Home route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Welcome to the Join Course API!');
});

// ✅ API Routes

// Get all students
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Get one student by ID
app.get('/students/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// Add new student
app.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

// Update student
app.put('/students/:id', async (req, res) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStudent);
});

// Delete student
app.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted successfully' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
