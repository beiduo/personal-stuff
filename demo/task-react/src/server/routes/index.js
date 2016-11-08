let parse = require('co-body');
let tasks = require('../models/tasks');

exports.getList = function* () {
    let results = yield tasks.find({}, {
        sort: {updated: -1}
    });
    results.forEach(function (task) {
        if (task.completed === 'true') {
            task.completed = true;
        } else {
            task.completed = false;
        }
    });
    this.body = {
        results: results
    };
}

exports.postTask = function* () {
    // let postBody = this.request.body;

    // postBody.created = new Date().getTime();
    // postBody.updated = postBody.created;

    // this.type = 'json';
    // let results = yield tasks.insert(postBody);
    this.body = {
        error: 'dfgsdfgsdf'
    };
}

exports.deleteTask = function* (id) {
    yield tasks.remove({_id: id});
    this.body = {};
}

exports.putTask = function* (id) {
    let postBody = this.request.body;
    postBody.updated = new Date().getTime();
    let exist = yield tasks.findOne({_id: id});
    for (let key in postBody) {
        if (postBody.hasOwnProperty(key)) {
            exist[key] = postBody[key];
        }
    }
    let results = yield tasks.update({
        _id: id
    }, exist);
    
    if (results.ok && results.nModified) {
        this.body = {
            results: yield tasks.findOne({_id: id})
        };
    } else {
        this.body = {
            error: 'updating failed'
        };
    }
}