/**
 * 常用正则表达式
 */

// 校验表达式
const EXPS = {
	number:/^[0-9]*$/,
	alpha:/^[A-Za-z]+$/,
	alphanum:/^[A-Za-z0-9]+$/,
	intnum:/^-?\\d+$/,
	decimal:/^-?[0-9]+\.[0-9]+$/,
	chinese:/^[\u4e00-\u9fa5]{0,}$/,
	mobile:/^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/,
	email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
	idcard:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
	ipv4:/(\d+)\.(\d+)\.(\d+)\.(\d+)/,
	tag:/<(.*)>(.*)<\/(.*)>|<(.*)\/>/,// html标签
}

// 参数:t => 类型,s => 字符串
const test = (t,s) => {
	if(!t || !EXPS[t]) return;
	return EXPS[t].test(s);
}

// 校验n个数字
const nnum = (n,s) => {
	return new RegExp('^\\d{' + n + '}$').test(s);
}

// 校验至少n个数字
const gnum = (n,s) => {
	return new RegExp('^\\d{' + n + ',}$').test(s);
}

module.exports = {
	test,
	nnum,
	gnum,
}


