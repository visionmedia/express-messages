'use strict';

var app = require('express')()
  , flash = require('connect-flash')
  , messages = require('../')
  , request = require('supertest')
  , session = require('express-session')
  , test = require('tape');

app.set('views', __dirname + '/fixtures');
app.set('view engine', 'ejs');
app.set('view options', { layout: false });

app.use(session({
  secret: 'wahoo',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = messages(req, res);
  next();
});

test('default template should return empty string if messages is empty', function (t) {
  app.get('/empty/default', function (req, res) {
    res.render('default');
  });

  request(app)
    .get('/empty/default')
    .expect(200, '')
    .end(function (err) {
      t.error(err);
      t.end();
    });
});

test('custom template should return empty string if messages is empty', function (t) {
  app.get('/empty/custom', function (req, res) {
    res.render('custom');
  });

  request(app)
    .get('/empty/custom')
    .expect(200, '')
    .end(function (err) {
      t.error(err);
      t.end();
    });
});

test('default template', function (t) {
  var html = [
      '<div id="messages">'
    , '  <ul class="info">'
    , '    <li>info one</li>'
    , '    <li>info two</li>'
    , '  </ul>'
    , '  <ul class="error">'
    , '    <li>error one</li>'
    , '  </ul>'
    , '</div>'
  ].join('\n');

  app.get('/nonempty/default', function (req, res) {
    req.flash('info', 'info one');
    req.flash('info', 'info two');
    req.flash('error', 'error one');
    res.render('default');
  });

  request(app)
    .get('/nonempty/default')
    .expect(200, html)
    .end(function (err) {
      t.error(err);
      t.end();
    });
});

test('custom template', function (t) {
  var html = [
      '<ul class="messages">'
    , '  <li class="info">info one</li>'
    , '  <li class="info">info two</li>'
    , '  <li class="error">error one</li>'
    , '</ul>'
  ].join('\n');

  app.get('/nonempty/custom', function (req, res) {
    req.flash('info', 'info one');
    req.flash('info', 'info two');
    req.flash('error', 'error one');
    res.render('custom');
  });

  request(app)
    .get('/nonempty/custom')
    .expect(200, html)
    .end(function (err) {
      t.error(err);
      t.end();
    });
});
