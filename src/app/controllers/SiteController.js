// Định nghĩa class contruction cho mỗi file routes
const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  // [GET] /
  // Accessing a Model
  home(req, res, next) {
    Course.find({})
      .then(courses => {
        res.render('home', {
          courses: mutipleMongooseToObject(courses)
        });
      })
      .catch(next);
  };

  // [GET] /search
  search(req, res) {
    res.render('search');
  }

}

module.exports = new SiteController();
