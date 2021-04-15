/**
* Logger.js
*
* @description :: This is a native logging service for UNDP-POPP Application
*
*/
const winston = require('winston');
const assert = require('assert');
const util = require('util');

const levelColor = {
  verbose: 'green', debug: 'cyan', info: 'white', warn: 'yellow', error: 'red',
};

const logLevels = {
  verbose: 0, debug: 1, info: 2, warn: 3, error: 4,
};

const fileLoggers = {};

const channelConfigValidation = {
  file(loggerConfig, channel) {
    assert.ok(loggerConfig.channels[channel].fileName, `No fileName specified for File channel ${channel}`);
  },
  sentry(loggerConfig, channel) {
    assert.ok(loggerConfig.channels[channel].dsn, `No dsn(key) specified for Sentry channel ${channel}`);
  },
};

const channelDefinition = {

  console(msg, level) {
    const method = levelColor[level];
    console.log(msg[method]);
  },
  file(msg, channel, channelConfig, level) {
    if (fileLoggers[channel]) {
      fileLoggers[channel][level](msg);
    } else {
      const logger = new (winston.Logger)({
        transports: [],
      });

      logger.add(winston.transports.DailyRotateFile, {
        filename: channelConfig.fileName,
        level: 'silly',
        datePattern: '-dd-MM-yyyy',
        handleExceptions: true,
        exitOnError: false,
      });

      fileLoggers[channel] = logger;
      logger[level](msg);
    }
  },
  errorFile(msg, channel, channelConfig, level) {
    if (fileLoggers[channel]) {
      fileLoggers[channel][level](msg);
    } else {
      const logger = new (winston.Logger)({
        transports: [],
      });

      logger.add(winston.transports.DailyRotateFile, {
        filename: channelConfig.fileName,
        level: 'silly',
        datePattern: '-dd-MM-yyyy',
        handleExceptions: true,
        exitOnError: false,
      });

      fileLoggers[channel] = logger;
      logger[level](msg);
    }
  },
};

function log(msg, level) {
  try {
    const { channels } = sails.config.logger.logLevelConfig[level];
    let message = '';
    if (typeof msg === 'string') { message = `${level}: ${msg}`; } else { message = `${level}: ${util.inspect(msg)}`; }
    channels.forEach((channel) => {
      if (channel === 'console') {
        channelDefinition.console(message, level);
      } else {
        const channelConfig = sails.config.logger.channels[channel];
        channelDefinition[channelConfig.type](message, channel, channelConfig, level);
      }
    });
  } catch (err) {
    sails.log.error(err);
  }
}
module.exports = {

  log(msg) {
    log(msg, 'verbose');
  },
  verbose(msg) {
    log(msg, 'verbose');
  },
  debug(msg) {
    log(msg, 'debug');
  },
  info(msg) {
    log(msg, 'info');
  },
  warn(msg) {
    log(msg, 'warn');
  },
  error(error, errMsg) {
    try {
      let msg;
      if (error instanceof Error) {
        msg = errMsg ? `${errMsg}\n${error.stack}` : error.stack;
      } else if (errMsg) { msg = `${error} ${errMsg}`; } else { msg = error; }
      log(msg, 'error');
    } catch (err) {
      sails.log.error(err);
    }
  },

  setup() {
    const loggerConfig = sails.config.logger;

    const levels = sails.config.logger.logLevelConfig;

    assert.ok(loggerConfig, 'Logger not configured.');

    Object.keys(logLevels).forEach((level) => {
      assert.ok((levels[level] && Array.isArray(levels[level].channels)), `Log Level ${level} not configured.`);

      levels[level].channels.forEach((channel) => {
        Object.keys(logLevels).forEach((level1) => {
          if (logLevels[level1] > logLevels[level]) {
            assert.ok(levels[level1].channels.indexOf(channel) > -1, `Channel ${channel} configured for lower log level ${level} but not for higher log level ${level1}`);
          }
        });
        if (channel === 'console') { return; }

        assert.ok(loggerConfig.channels, 'No Log Channels configured.');

        assert.ok(loggerConfig.channels[channel], `Log Channel ${channel} not configured.`);

        assert.ok(loggerConfig.channels[channel].type, `No channel type specified for ${channel}`);

        assert.ok(channelConfigValidation[loggerConfig.channels[channel].type], `No validation method specified in channelConfigValidation for ${loggerConfig.channels[channel].type} channel.`);

        channelConfigValidation[loggerConfig.channels[channel].type](loggerConfig, channel);
      });
    });
  },
};
