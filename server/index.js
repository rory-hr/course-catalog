require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const { getAllCourses, addCourse, deleteCourse } = require('./db.model'); 

const PORT = process.env.PORT || 3000;

// MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist/')));

// GET /api/courses
app.get('/api/courses', (req, res) => {
  console.log('GET /api/courses');
  getAllCourses((err, results) => {
    if (err) {
      console.error(err);
      res.status(400).send();
    } else {
      res.send(results);
    }
  });
});

// POST /api/courses
app.post('/api/courses', (req, res) => {
  console.log('POST /api/courses');
  addCourse(req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).send();
    } else {
      res.send(result);
    }
  });
});

// DELETE /api/courses/:id
app.delete('/api/courses/:id', (req, res) => {
  console.log(`DEL /api/courses/${req.params.id}`);
  deleteCourse(req.params.id, (err) => {
    if (err) {
      console.error(err);
      res.status(400).send();
    } else {
      res.status(200).send();
    }
  });
});

// START SERVER
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Server listening on port ${PORT}`);
  }
});
