
const common = require('./modules/common');
const regexp = require('./modules/regexp');
const crypto = require('./modules/crypto');
const Socket = require('./modules/websocket');

const tools = {
	...common,
	...regexp,
	...crypto,
	Socket,
}

const global = window || {};
if(global) global.tools = tools;

module.exports = tools;
