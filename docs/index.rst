Express Messages
----------------

The ``express-messages`` module provides flash notification rendering. To use simply assign it to a dynamic helper:

    app.dynamicHelpers({ messages: require('express-messages') });

Installation
-------------

    $ npm instal express-messages

## Usage

Then in a view you may output the notifications:

    <%- messages() %>

Which outputs HTML as shown below:

    <div id="messages">
      <ul class="info">
        <li>Email queued</li>
        <li>Email sent</li>
      </ul>
      <ul class="error">
        <li>Email delivery failed</li>
      </ul>
    </div>