/**
 * 常用工具函数
 */

const dotdotdot = require('dotdotdot');

// 获取url参数
const getUrlParam = (name) => {
	
	let q = window.location.search.substring(1);
	let p = q.split("&");
	for (let i=0;i<p.length;i++) {
		let pair = p[i].split("=");
		if(pair[0] === name){ return pair[1] }
	}
	return null;
	
}

// 限制输入小数点位数
const limitDecimal = (decimal,limit) => {
	if(limit <= 0){
		return decimal;
	}
	let sn = decimal.toString();
	let sps = sn.split('.');
	if(sps.length > 1 && sps[1].length >= limit){
		let deci = sps[0] + '.' + sps[1].substring(0,limit);
		return deci;
	}
	return sn;
}

// 自动判断是多少时间前，人性化处理
// time格式:yyyy-MM-dd hh:mm:ss
const getTimeAgo = (time) => {
	let finalStr = '刚刚';
	// 把传入日期转换为时间戳
	let a = new Date(time).getTime();
	let b = new Date().getTime();
	let di = (b - a) / 1000;// 得到秒
	// 计算年月日时分秒
	let y,M,d,h,m = 0;
	if(di < 60){
		return '刚刚';
	}
	m = di / 60;//计算分
	if(m < 60){
		return parseInt(m) + '分钟前';
	}
	h = m / 60;// 计算时
	if(h < 24){
		return parseInt(h) + '小时前';
	}
	d = h / 24;// 计算天
	if(d < 31){
		return parseInt(d) + '天前';
	}
	M = d / 30;// 计算月
	if(M < 12){
		return parseInt(M) + '月前';
	}
	y = M / 12;// 计算年
	if(y >= 1){
		return time;// 如果大于1年，直接显示日期
	}
	
	return finalStr;
}

// 获取uuid
const getUuid = () => {
	let S4 = () => {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

// 判断file是否是图片
const isImg = (file) => {
	
	let types = ['png','jpg','gif','bmp','webp','svg','tif','ico'];
	let count = 0;
	
	types.map( it => {
		if(file.type.indexOf(it) !== -1){
			count ++;
		}
	})
	if(count > 0) return true;

	return false;
}

// 获取浏览器厂商
const getNavigatorType = () => {
	
	let ag = navigator.userAgent;
	let isOpera = ag.indexOf("Opera") > -1;
	if(isOpera){
			return "Opera";
	}
	if (ag.indexOf("Firefox") > -1) {
			return "Firefox";
	}
	
	if(ag.toLowerCase().indexOf("micromessenger") > -1){// 微信内置浏览器
			return "WX";
	}
	if(ag.indexOf(' qq') > -1 && ag.indexOf('mqqbrowser') < 0){
			return "QQInner";
	}
	if(ag.indexOf('mqqbrowser') > -1 && ag.indexOf(" qq") < 0){
			return "QQ";
	}
	
	if (ag.indexOf("Chrome") > -1){
			return "Chrome";
	}
	if (ag.indexOf("Safari") > -1) {
			return "Safari";
	}
	if (ag.indexOf("compatible") > -1 && ag.indexOf("MSIE") > -1 && !isOpera) {
			return "IE";
	}
	if (ag.toLowerCase().indexOf("edge") > -1) {
			return "IE";
	}
	if(ag.toLowerCase().indexOf("trident") > -1){
			return "IE";
	}

	// 默认返回其他浏览器
	return "Other";
}

// 计算日期是星期几
// date格式:yyyy-MM-dd hh:mm:ss
// 默认返回当前星期几
const getWeekByDate = (date) => {
	
  let splits = date.split(' ')[0].split('-');
  let d = date ? new Date(
		parseInt(splits[0]),
		parseInt(splits[1]) - 1,
		parseInt(splits[2]),
		0,0,0) : new Date();
		
  return d.getDay();
}

// 根据时间戳(ms)获取格式化日期yyyy-MM-dd hh:mm:ss
// 默认返回当前的日期
const getDateByStamp = (stamp) => {
	let date = stamp ? new Date(stamp) : new Date();
	let y = date.getFullYear();
	let M = date.getMonth() + 1;
	M = M < 10 ? '0' + M : M;
	let d = date.getDate();
	d = d < 10 ? '0' + d : d;
	let h = date.getHours();
	h = h < 10 ? '0' + h : h;
	let m = date.getMinutes();
	m = m < 10 ? '0' + m : m;
	let s = date.getSeconds();
	s = s < 10 ? '0' + s : s;
	
	return `${y}-${M}-${d} ${h}:${m}:${s}`;
}

// 把格式化日期转为时间戳(ms)
// date格式:yyyy-MM-dd hh:mm:ss
// 默认返回当前的时间戳
const getStampByDate = (date) => {
	if(!date) return new Date().getTime();
	let s1 = date.split(' ')[0].split('-');
	let s2 = date.split(' ')[1].split(':');
	
	return new Date(
		parseInt(s1[0]),
		parseInt(s1[1]) - 1,
		parseInt(s1[2]),
		
		parseInt(s2[0]),
		parseInt(s2[1]),
		parseInt(s2[2]),).getTime();
}

// 限制数组长度
const limitArrLen = (arr,len) => {
  if(arr.length > len){
    arr.splice(len,arr.length - len);
  }
  return arr;
}

// 调用百度api获取当前的地理坐标
const getLocationByBaidu = () => {
	
	const BAIDU_AK = "YrXSCjgAt3Qu06crwUcX7TIGtjjywlw8";
	return new Promise((resolve,reject) => {
		
		$.ajax({
			method:"get",
			url:"http://api.map.baidu.com/location/ip",
			data:{
				ak:BAIDU_AK,
				coor:"bd09ll"
			},
			dataType: "jsonp",
			jsonpCallback:"locationCallback",
			success:(ret) => {
				if(ret){
					resolve(ret);
				}
			},
			error:(err) => { reject(err) }
		});
		
	})
	
}

// 存储localStorage
const save = (key,value) => {
	if(localStorage){
		if(value instanceof Object){
			value = JSON.stringify(value);
		}
		localStorage.setItem(key,value);
	}
}

// 获取localStorage
const get = (key) => {
	let value = null;
	if(localStorage){
		try{
			value = localStorage.getItem(key);
		}catch(e){}
	}
	try{
		value = JSON.parse(value);
	}catch(e){}

	return value;
}

// 删除localStorage
const remove = (key) => {
	if(localStorage){
		localStorage.removeItem(key);
	}
}

// 改良后的log
const log = (mark,msg) => {
	let mk = mark || 'log';
	let ms = msg || '';
	
	console.log(`${getDateByStamp()} --------${mk}--------\n\n`,JSON.stringify(ms));
}

const table = (mark,obj) => {
	if(obj instanceof Object){
		console.log(mark);
		console.table(obj)
	}
}

const dir = (mark,obj) => {
	if(obj instanceof Object){
		console.log(mark);
		console.dir(obj)
	}
}

// JSON.stringfy实现的深拷贝
const copy = (target) => {
	if(!target) return;
	return JSON.parse(
		JSON.stringify(target)
	) 
}

// 比较版本
const compareVersion = (oldVer,newVer) => {
	let hasUpdate = false;
	if(oldVer&&newVer){
		let cvs = oldVer.split(".");
		let rvs = newVer.split(".");
		
		if(parseInt(cvs[0]) == parseInt(rvs[0])){
			
			if(parseInt(cvs[1]) == parseInt(rvs[1])){
				
				if(parseInt(cvs[2]) < parseInt(rvs[2])){
					hasUpdate = true;
				}

			}else if(parseInt(cvs[1]) < parseInt(rvs[1])){
				hasUpdate = true;
			}

		}else if(parseInt(cvs[0]) < parseInt(rvs[0])){
			hasUpdate = true;
		}
		
	}
	return hasUpdate;
}

//超出省略号显示,需要设置元素的高度
const ellipsis = (selector) => {
	$(selector).dotdotdot();
}

module.exports = {
	getUrlParam,
	limitDecimal,
	getTimeAgo,
	getUuid,
	isImg,
	getNavigatorType,
	getWeekByDate,
	getDateByStamp,
	getStampByDate,
	limitArrLen,
	getLocationByBaidu,
	save,
	get,
	remove,
	log,
	table,
	dir,
	copy,
	compareVersion,
	ellipsis,
}