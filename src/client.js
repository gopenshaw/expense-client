var rest = require('rest');
var pathPrefix = require('rest/interceptor/pathPrefix');
var mime = require('rest/interceptor/mime');

module.exports = rest
                  .wrap(pathPrefix, { prefix: 'http://localhost:8080' })
                  .wrap(mime, { mime: 'application/json' });
