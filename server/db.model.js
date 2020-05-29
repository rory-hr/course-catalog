const { Courses } = require('./db.schema');

module.exports.getAllCourses = (callback) => {
  Courses.find((err, results) => {
    if (err) {
      callback(err.reason);
    } else {
      callback(null, results);
    }
  });
};

module.exports.addCourse = (input, callback) => {
  const newCourse = new Courses(input);
  newCourse.save((err, result) => {
    if (err) {
      callback(err.reason);
    } else {
      callback(null, result);
    }
  });
};

module.exports.deleteCourse = (id, callback) => {
  Courses.findByIdAndDelete(id, (err) => {
    if (err) {
      callback(err.reason);
    } else {
      callback(null);
    }
  });
};
