let db = require('../lib/db');
let wrap = require('co-monk');

module.exports = wrap(db.get('tasks'));