
import regexp from './modules/common-regexp';

const tools = {
	...regexp,
}

const global = global || window;
if(global) global.tools = tools;
