const fs = require('fs');
const util = require('util');
const log_file = fs.createWriteStream(__dirname + '/access.log', {flags : 'a'});
const log_stdout = process.stdout;
const morgan = require('morgan')
const uuid = require('node-uuid')
const path = require('path')


console.log = function(id, d) { //
    const msg = (id? id : '-') + ' '+ new Date() + ' ' + util.format(d) + '\n';
    log_file.write(msg);
    log_stdout.write(msg);
};

const configure = (app) => {
    morgan.token('id', function getId (req) {
        return req.id
    })
    app.use(function assignId (req, res, next) {
        req.id = uuid.v4()
        next()
    })
    morgan.token('id', function getId (req) {
        return req.id
    })
    app.use(morgan(':id :method :url :response-time', {
        stream: fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
    }))
}

module.exports = {
    configure
}