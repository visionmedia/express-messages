
/**
 * Module dependencies.
 */

var express = require('express')
  , messages = require('../')
  , assert = require('assert');

module.exports = {
  'test messages dynamic helper': function(){
    var app = express.createServer(
      express.cookieParser(),
      express.session({ secret: 'wahoo' })
    );
    app.set('views', __dirname + '/fixtures');
    app.dynamicHelpers({ messages: messages });
    
    app.get('/', function(req, res, next){
      req.flash('info', 'info one');
      req.flash('info', 'info two');
      req.flash('error', 'error one');
      res.render('messages.ejs', {
        layout: false
      });
    });
    
    app.get('/none', function(req, res, next){
      res.render('messages.ejs', {
        layout: false
      });
    });

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

    assert.response(app,
      { url: '/' },
      { body: html });
    assert.response(app,
      { url: '/none' },
      { body: '' });
  }
};