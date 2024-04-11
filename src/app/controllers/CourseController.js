const Course = require('../models/Course'); // database
const { mongooseToObject } = require('../../util/mongoose');
const { render } = require('node-sass');

class CourseController{
    // [GET] /courses/course 
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                res.render('courses/show', {
                    course: mongooseToObject(course)
                });
            })
            .catch(next)
        };

    // [GET] /courses/create -> dung de tao ra UI create
    create(req, res, next) { 
        res.render('courses/create')
    };

    // [POST] /courses/create -> dung de (post) them data moi khoa hoc
    store(req, res, next) {
        const formData = req.body
        const course = new Course(formData)
        course
            .save()
            .then(() => res.redirect('/home'))
            .catch(next)  
    };

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
        .then(course => res.render('courses/edit', {
            course: mongooseToObject(course)
        }))
        .catch(next)
    };

    // [PUT] /courses/:id
    update(req, res, next) { 
        Course.findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    };

    // [PATCH] /courses/:id/restore
    restore(req, res, next) { 
        Course.restore({ _id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    };
    
    // [DELETE] /courses/:id
    destroy(req, res, next) { 
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    };

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) { 
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    };

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) { 
        switch(req.body.action) {
            case 'delete':
                Course.delete({ _id: req.body.courseIds })
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'restore':
                Course.restore({_id: req.body.courseIds})
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'force-delete':
                Course.deleteMany({_id: req.body.courseIds})
                    .then(() => res.redirect('back'))
                    .catch(next)
                    break;
            default:
                res.send('Error!!!');
        };
    };
    
};

module.exports = new CourseController();