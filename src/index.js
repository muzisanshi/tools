
// 打包样式
require('./css/index.scss')

const common = require('./modules/common')
const regexp = require('./modules/regexp')
const crypto = require('./modules/crypto')
const Socket = require('./modules/websocket')

const tools = {
	...common,
	...regexp,
	...crypto,
	Socket,
}

const g = typeof window === 'undefined' ? global : window
if(g) g.tools = tools

module.exports = tools

