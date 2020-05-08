
import test from './modules/common-regexp';

const tools = {
	test,
}

const global = global || window;
if(global) global.tools = tools;
