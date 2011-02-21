
0.3.4 / 2011-02-01 
==================

  * Fixed `app.namespace()` middleware support. [dandean]

0.3.2 / 2011-01-10 
==================

  * Fixed _namespace_ for latest connect
  * Fixed; using `express.router.methods`
    in namespace to expose them all

0.3.1 / 2011-01-06 
==================

  * Fixed structure to support npm better

0.3.0 / 2010-12-06 
==================

  * Added `express-configure` for async `configure()` support
    This helps to boot apps where async setup may be required,
    for example applying settings from Redis or another key/value store.
  * Added; exposing .namespace to the route function
  * Added `app.currentNamespace` getter
  * Added _./index.js_
  * Fixed `make test`

0.2.0 / 2010-11-30 
==================

  * Added `express-resource` for resourceful routing support

0.1.0 / 2010-11-30 
==================

  * Added `express-namespace` for route namespacing support

0.0.1 / 2010-09-06 
==================

  * Initial release
