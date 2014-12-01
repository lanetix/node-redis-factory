(function () {
  'use strict';

  var _ = require('lodash'),
    url = require('url');

  function parseRedisUri(uri) {
    var redisUrl,
      redisAuth,
      defaults = {
        port: 6379,
        hostname: '127.0.0.1'
      };

    if (!uri || !uri.length) {
      return defaults;
    }

    redisUrl = url.parse(uri);
    if (redisUrl.auth) {
      redisAuth = redisUrl.auth.split(':');
    }

    return _.defaults({
      port: redisUrl.port ? redisUrl.port : undefined,
      hostname: redisUrl.hostname ? redisUrl.hostname : undefined,
      password: redisAuth && redisAuth.length >= 2 ? redisAuth[1] : undefined
    }, defaults);
  }

  module.exports = function (redis) {
    return function (connectionString, options) {
      var connection = parseRedisUri(connectionString),
        db = redis.createClient(connection.port, connection.hostname, options);

      if (connection.password) {
        // support for romis (https://www.npmjs.org/package/romis)
        //TODO: support callback: https://github.com/mranney/node_redis#clientauthpassword-callback
        if (db._redis) {
          db._redis.auth(connection.password);
        } else {
          db.auth(connection.password);
        }
      }

      return db;
    };
  };

}());

