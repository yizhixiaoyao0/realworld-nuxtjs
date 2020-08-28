const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['noAuth'] = require('..\\middleware\\noAuth.js')
middleware['noAuth'] = middleware['noAuth'].default || middleware['noAuth']

export default middleware
