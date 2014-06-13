# winston-syslog

A Syslog transport for [winston][0]. I started out with https://github.com/indexzero/winston-syslog, but plugged in `node-syslog`.

## Installation

``` bash
  $ npm install winston 
  $ npm install winston-syslog2
```

## Usage

To use the Syslog transport in [winston][0], you simply need to require it and then either add it to an existing [winston][0] logger or pass an instance to a new [winston][0] logger:

``` js
  var winston = require('winston');
  
  //
  // Requiring `winston-syslog` will expose 
  // `winston.transports.Syslog`
  //
  require('winston-syslog');
  
  winston.add(winston.transports.Syslog);
```


## Log Levels
Because syslog only allows a subset of the levels available in [winston][0], levels that do not match will be ignored. Therefore, in order to use `winston-syslog` effectively, you should indicate to [winston][0] that you want to use the syslog levels:

``` js
  var winston = require('winston');
  winston.setLevels(winston.config.syslog.levels);
```

The `Syslog` transport will only log to the level that are available in the syslog protocol. These are (in increasing order of severity):

* debug
* info
* notice
* warning
* error
* crit
* alert
* emerg

[0]: https://github.com/indexzero/winston
[1]: http://www.ietf.org/rfc/rfc3164.txt
[2]: http://tools.ietf.org/html/rfc5424
[3]: https://github.com/squeeks/glossy
