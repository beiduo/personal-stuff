
let parse = require('co-body');
let getSlug = require('speakingurl');
let journals = require('../models/journals');

exports.getList = function* (page) {
    let skip = (Number(page) - 1) * 10;
    let results = yield journals.find({}, {
        limit : 10,
        skip : skip
    });
    for (let i = 0; i < results.length; i += 1) {
        results[i].id = results[i]._id;
        delete results[i]._id;
    }
    let resultsTotal = yield journals.find({});
    let total = Math.ceil(resultsTotal.length / 10);
    if (total === 0) {
        total += 1;
    }
    this.type = 'json';
    this.body = {
        results: {
            data: results,
            pagination: {
                current: page,
                total: total
            }
        }
    };
}

exports.getJournal = function* (alias) {
    let results = yield journals.find({alias: alias});
    let obj = {};
    if (results.length === 0) {
        obj.error = 'this journal is not exist';
    } else {
        obj.results = results[0];
    }
    this.body = obj;
}

exports.postJournal = function* () {
    let body = yield parse.json(this);
    
    body.update = new Date().getTime();
    body.create = new Date().getTime();

    if (!body.summary) {
        if (body.content.length > 400) {
            body.summary = body.content.slice(0, 400) + ' ...';
        } else {
            body.summary = body.content;
        }
    }
    if (!body.alias) {
        body.alias = body.title;
    }
    body.alias = getSlug(body.alias);

    let exists = yield journals.find({alias: body.alias});
    if (exists.length > 0) {
        body.alias += ('-' + String(body.create) + String(Math.floor(Math.random() * 1000)));
    }

    this.type = 'json';
    let results = yield journals.insert(body);
    this.body = {
        results: {
            alias: results.alias
        }
    };
}

exports.putJournal = function* () {
    let body = yield parse.json(this);
    
    body.update = new Date().getTime();

    if (!body.summary) {
        if (body.content.length > 400) {
            body.summary = body.content.slice(0, 400) + ' ...';
        } else {
            body.summary = body.content;
        }
    }
    if (!body.alias) {
        body.alias = body.title;
    }
    body.alias = getSlug(body.alias);

    let exists = yield journals.find({alias: body.alias});
    if (exists.length > 0 && exists[0]._id.toString() !== body.id) {
        body.alias += ('-' + String(body.update) + String(Math.floor(Math.random() * 1000)));
    }

    this.type = 'json';
    let results = yield journals.update({_id: body.id}, {
        alias: body.alias,
        title: body.title,
        content: body.content,
        update: body.update
    });
    if (results.ok && results.nModified) {
        this.body = {
            results: {
                alias: body.alias
            }
        };
    } else {
        this.body = {
            error: 'updating failed'
        };
    }
}

exports.deleteJournal = function* (alias) {
    let body = {};
    try {
        yield journals.remove({alias: alias});
    } catch (e) {
        this.body.error = 'remove failed';
    }
    this.body = body;
}