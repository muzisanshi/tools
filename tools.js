/**
 * @desc: 		一个常用工具函数的库
 * @author: 	李磊
 * @date: 		2017.9.19
 * @version: 	v1.0
 * @contact:    QQ->1052048489 Email->1052048489@qq.com
 */

 ;(function(){
 	var tools = function(){

 		// 备份对象
 		var thiz = this;

 		/**
		 * @desc 打印函数
		 * @params mark->打印标记 msg->打印内容
 		 */
 		this.log = function(mark,msg){
 			var mk = "";
 			if(mark){mk=mark;}
 			var date = this.getDate();
 			console.log("["+date+"]  @"+mk+"  "+msg);
 		};

 		/**
		 * @desc 监听回车事件
		 * @params callback->执行回调
		 * @note 该函数依赖jQuery
 		 */
 		this.listenEnter = function(callback){
 			if($){
	 			$(document).keydown(function(event){
		            if(event.keyCode == 13) {  
		            	callback();
		            } 
		        });
	        }else{
				this.log("listenEnter","方法依赖jquery");
			}
 		};

 		/**
		 * @desc 设置coookie
		 * @params name->cookie名字 value->cookie的值 milis->过期时间，单位ms
 		 */
 		this.setCookie = function(name,value,milis){
			var exp = new Date();
			exp.setTime(exp.getTime() + milis);
			if(milis){
			    document.cookie = name + "="+ escape(value) + ";expires=" + exp.toGMTString()+";path=/";
			}else{
			    document.cookie = name + "="+ escape(value) + ";path=/";
			}
		}

		/**
		 * @desc 获取指定cookie
		 * @params name->cookie名字
		 * @return 指定cookie的值
 		 */
		this.getCookie = function(name){
	        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	        if(arr=document.cookie.match(reg)){
	            return unescape(arr[2]);
	        }else{
	            return null;
	        }
		};

		/**
		 * @desc 删除指定cookie
		 * @params name->cookie名字
 		 */
		this.delCookie = function(name){
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1000);
	        var cval=getCookie(name);
	        if(cval!=null){
	            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
	        }
	    };

	    /**
		 * @desc 把年月日时分秒转为时间戳（参数格式：yy-mm-dd hh:mm:ss）
		 * @params date->日期
		 * @return 时间戳，单位s
 		 */
	    this.getTimeStamp = function(date){
			if(date){
				var stamp = parseInt(Date.parse(new Date(date))/1000);
				return stamp;
			}
			return null;
		};

		/**
		 * @desc 把时间戳转换为年月日时分秒（返回格式：yy-mm-dd hh:mm:ss）
		 * @params stamp->日期，单位s
		 * @return 格式化后的日期，如果参数为空，返回当前日期
		 */
		this.getDate = function(stamp){
			var date = new Date();
			if(stamp){
				date = new Date(stamp*1000);
			}
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			if(month < 10){
				month = "0"+month;
			}
			var day = date.getDate();
			if(day < 10){
				day = "0"+day;
			}
			var hour = date.getHours();
			if(hour < 10){
				hour = "0"+hour;
			}
			var minute = date.getMinutes();
			if(minute < 10){
				minute = "0"+minute;
			}
			var second = date.getSeconds();
			if(second < 10){
				second = "0"+second;
			}

			var final = year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
			return final;
		};

		/**
		 * @desc 获取当前日期（返回格式：yy年mm月dd日）
		 * @return 格式化后的日期
		 */
		this.getCurDateShort = function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();

			var final = year+"年"+month+"月"+day+"日";
			return final;
		};

		/**
		 * @desc 表单里文件上传（ajax方式）
		 * @params url->上传地址 method->请求方法 formData->文件表单数据，类型是FormData callback->执行回调
		 * @note 该函数依赖jQuery
		 */
		this.upload = function(url,method,formData,callback){
			if($){
				if(formData){
					$.ajax({
		                type:method,
		                url:url,
		                data:formData,
		                cache: false,
		                contentType:false,
		                processData: false,
		                success:function(ret){
		                    callback(ret,null);
		                },
		                error:function(err){
		                	callback(null,err);
		                }
		            });
				}
			}else{
				this.log("upload","方法依赖jquery");
			}
		};

		/**
		 * @desc 获取当前的url，域名等信息
		 * @return 返回url，域名等信息，类型是对象
		 */
		this.getWebInfo = function(){
			var info = {};
			info.url = window.location.href;
			info.protocol = window.location.protocol.split(":")[0];
			info.host = window.location.host;
			info.path = window.location.pathname;
			info.params = window.location.search;
			return info;
		};

		/**
		 * @desc 获取当前url上的指定参数
		 * @params name->指定参数名字
		 * @return 返回url，域名等信息，类型是对象
		 */
		this.getWebParams = function(name){
			var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
		    var r = window.location.search.substr(1).match(reg);
		    if (r != null) {
		        return unescape(r[2]);
		    }
		    return null;
		};

		/**
		 * @desc 校验手机号码
		 * @params phone->手机号码
		 * @return 检验是否成功
		 */
		this.checkPhone = function(phone){
			// 判断输入号码是否有效
		    if(!phone && phone.trim()){
		        return false;
		    }
		    if(!(/^1[3|4|5|7|8][0-9]{9}$/.test(phone))){
		        return false;
		    }
		    return true;
		};

		/**
		 * @desc 校验邮箱格式
		 * @params email->邮箱
		 * @return 检验是否成功
		 */
		function checkEmail(email){
		　　var myReg=/^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
		　　if(myReg.test(email)){
		　　　　return true;
		　　}else{
		　　　　return false;
			}
		}

		/**
		 * @desc 倒计时
		 * @params second->倒计时秒数 callback->执行回调
		 */
	    this.countDown = function(second,callback){
		    var time = second;
		    var id = null;
		    this.countDown.stopCount = function(){
		        if(id){
		          	window.clearInterval(id);
		          	thiz.log("countDown","已停止倒计时！");
		        }
		    };
		    if(time>0 && !id){
		       	id = setInterval(function(){
		         	time --;
		          	if(callback){callback(time);}
		          	if(time == 0){
		            	window.clearInterval(id);
		          	}
		        },1000);
		    }
	    };
 	};
    window.tools = tools;
 })();