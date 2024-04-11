const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class MeController {

    storedCourse(req, res, next) { 
        let courseQuery = Course.find({});

        if (req.query.hasOwnProperty('_sort')) {
            const isVailType = ['asc', 'desc'].includes(req.query.type);
            courseQuery = courseQuery.sort({
                [req.query.column]: isVailType ? req.query.type : 'desc',
            });
        };

        Promise.all([courseQuery, Course.countDocumentsWithDeleted({deleted: true})])
        .then(([course, deletedCount]) => {
            res.render('me/stored-courses', {
                // destructuring
                course: mutipleMongooseToObject(course),
                deletedCount,
            });
        })
        .catch(next)      
    };

    trashCourse(req, res, next) {
        Course.findWithDeleted({deleted: true})
        .then(course => {
            res.render('me/trash-courses', {
                course: mutipleMongooseToObject(course)
            })
        })
        .catch(next)
    };

};

module.exports = new MeController();