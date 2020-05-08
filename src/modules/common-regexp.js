/**
 * 常用正则表达式
 */

// 校验表达式
const EXPS = {
	number:/^[0-9]*$/,// 只有数字
}

// 参数:t => 类型,s => 字符串
export default (t,s) => {
	if(!t || !s || !EXPS[t]) return;
	return EXPS[t].test(s);
}
