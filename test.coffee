winston = require('winston');
require('./lib/winston-syslog').Syslog;
winston.add(winston.transports.Syslog, {})
winston.log('error', 'hi2')
winston.error('hi')
console.log('done')
