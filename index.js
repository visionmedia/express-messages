
/*!
 * Express - Contrib - messages
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

module.exports = function (req, res) {
  return function (template, options) {
    var flash = req.flash()
      , types = Object.keys(flash)
      , output = '';

    if (types.length) {
      if (template) {
        options = options || {};
        options.messages = types.reduce(function (msgs, type) {
          flash[type].forEach(function (msg) {
            msgs.push({ type: type, message: msg });
          });
          return msgs;
        }, []);
        res.render(template, options, function (err, html) {
          if (html) {
            output = html;
          }
        });
      } else {
        var buf = [];
        buf.push('<div id="messages">');
        types.forEach(function (type) {
          var msgs = flash[type];
          if (msgs) {
            buf.push('  <ul class="' + type + '">');
            msgs.forEach(function (msg) {
              buf.push('    <li>' + msg + '</li>');
            });
            buf.push('  </ul>');
          }
        });
        buf.push('</div>');
        output = buf.join('\n');
      }
    }

    return output;
  };
};
