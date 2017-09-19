/**
 * 一个常用工具函数的库。
 */

 ;function(){
 	var tools = function(){
 		return {
 			// 获取指定cookie
 			getCookie:function(name){
		        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		        if(arr=document.cookie.match(reg)){
		            return unescape(arr[2]);
		        }else{
		            return null;
		        }
 			},
 			// 删除指定cookie
 			delCookie:function(name){
		        var exp = new Date();
		        exp.setTime(exp.getTime() - 1000);
		        var cval=getCookie(name);
		        if(cval!=null){
		            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
		        }
		    }
 		};
 	};
    window.tools = tools;
 };