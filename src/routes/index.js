// Định nghĩa route cho các file routes
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');
const loginRouter = require('./login');


function route(app) {
  app.use('/news', newsRouter);

  app.use('/', siteRouter);

  app.use('/courses', coursesRouter);

  app.use('/me', meRouter);

  app.use('/', loginRouter);
}

module.exports = route;
