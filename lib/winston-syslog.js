/*
 * syslog.js: Transport for logging to a remote syslog consumer
 *
 * (C) 2014 Greg Warner
 * (C) 2011 Squeeks and Charlie Robbins
 * MIT LICENCE
 *
 */

var util = require('util'),
    winston = require('winston'),
    NodeSyslog = require('node-syslog'),
    _ = require('lodash');


var levels = {
  debug: NodeSyslog.LOG_DEBUG,
  info: NodeSyslog.LOG_INFO,
  notice: NodeSyslog.LOG_NOTICE,
  warning: NodeSyslog.LOG_WARNING,
  error: NodeSyslog.LOG_ERROR,
  crit: NodeSyslog.LOG_CRIT,
  alert: NodeSyslog.LOG_ALERT,
  emerg: NodeSyslog.LOG_EMERG

};

//
// ### function Syslog (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Syslog Transport 
//
var Syslog = exports.Syslog = function (options) {
  console.log('in constructor');
  winston.Transport.call(this, options);
  options = options || {};
  options = _.defaults(options,
      {
        daemon: 'node-syslog',
        options: NodeSyslog.LOG_PID | NodeSyslog.LOG_ODELAY,
        facility: NodeSyslog.LOG_LOCAL0
      }
  );
  NodeSyslog.init(options.daemon, options.options, options.facility);
};

//
// Inherit from `winston.Transport`.
//
util.inherits(Syslog, winston.Transport);

//
// Define a getter so that `winston.transports.Syslog`
// is available and thus backwards compatible.
//
winston.transports.Syslog = Syslog;

//
// Expose the name of this Transport on the prototype
//
Syslog.prototype.name = 'Syslog';
//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Target level to log to
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to log.
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Logs the `msg` and optional
// metadata, `meta`, to the specified `level`.
//
Syslog.prototype.log = function (level, msg, meta, callback) {
  console.log('sending message1: ');
  if (!_.has(levels, level)) {
    return callback(new Error('Cannot log unknown syslog level: ' + level));
  }
  console.log('sending message2');

  var data = typeof(meta) == 'object' && meta && Object.keys(meta).length ? winston.clone(meta) : {};
  data.message = msg;
  msg = typeof(meta) == 'object' && meta && Object.keys(meta).length ? JSON.stringify(data) : msg
  NodeSyslog.log(levels[level], msg);
  callback(null, true);

};
//
// ### function close ()
//
Syslog.prototype.close = function () {
  NodeSyslog.close();
}

