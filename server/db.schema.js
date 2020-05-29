const { db } = require('./db');
const { Schema } = require('mongoose');

const CourseSchema = new Schema({
  Course: { type: String, required: true },
  Room: { type: String, required: false , default: 'TBD' },
  Professor: { type: String, required: false , default: 'TBD' },
  Email: { type: String, required: false , default: 'TBD' },
  Days: {
    Su: { type: Boolean, required: true },
    Tu: { type: Boolean, required: true },
    Mo: { type: Boolean, required: true },
    We: { type: Boolean, required: true },
    Th: { type: Boolean, required: true },
    Fr: { type: Boolean, required: true },
    Sa: { type: Boolean, required: true },
  }
});

module.exports.Courses = db.model('courses', CourseSchema);
