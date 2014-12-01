# `redis-factory`

A factory for creating a redis client from a connection string.

## Installation (via [npm](https://npmjs.org/package/redis-factory))

```bash
$ npm install redis-factory
```

## Why?

The de facto [node.js redis library](https://github.com/mranney/node_redis) library doesn't support creating a client using a `redis://username:password@host:port/`-style connection string. This adds that support without hardcoding the version of the redis library you are using, so you an opt into using alternatives such as [romis](https://github.com/apechimp/romis).

## Usage

```javascript
(function () {
  'use strict';

  var redis = require('redis'),
    redisFactory = require('redis-factory'),
    connectionString = process.env.REDIS_URI || 'redis://localhost';

  module.exports = redisFactory(redis)(connectionString);

}());
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

## Author

[Lanetix](https://github.com/lanetix) ([engineering@lanetix.com](mailto:engineering@lanetix.com))

