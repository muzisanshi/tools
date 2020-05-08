
import regExp from './modules/common-regexp';

const tools = {
	regExp,
}

const global = global || window;
if(global) global.tools = tools;
