winston = require('winston');
require('./lib/winston-syslog');

winston.remove(winston.transports.Console)
winston.add(winston.transports.Console, level:'debug', colorize: true)
winston.add(winston.transports.Syslog, daemon: 'dashboard', level: 'emerg')


winston.setLevels(winston.config.syslog.levels)
winston.log('error', 'hi2')
winston.debug('debug 7')
winston.info('info 6')
winston.notice('notice 5')
winston.warning('warning 4')
winston.error('error 3')
winston.crit('crit 2')
winston.alert('alert 1')
winston.emerg('emerg 0')
#winston.warning('hi warn')
console.log('done')
