class NewsController {
  index(req, res) {
    res.render('news');
  }

  show(req, res) {
    res.send('example');
  }
}

module.exports = new NewsController();
