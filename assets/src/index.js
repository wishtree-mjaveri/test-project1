import React from 'react';
import ReactDOM from 'react-dom';
import ulog from 'ulog';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
const socketIOClient = require('socket.io-client');
const sailsIOClient = require('sails.io.js');

global.io = sailsIOClient(socketIOClient);
global.io.sails.url = 'http://localhost:1337';
global.log = ulog('my-module');
global.log.level = global.log.NONE;
// global.log.level = log.DEBUG;
// log.error('This logs an ERROR message')
// log.warn('This logs a WARN message')
// log.info('This logs an INFO message')
// log.log('This logs a LOG message')
// log.debug('This logs a DEBUG message')
// log.trace('This logs a TRACE message')
// ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();
ReactDOM.render(<App />, document.getElementById('root'));
