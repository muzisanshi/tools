/**
 * @desc: 		一个常用工具函数的库
 * @author: 	李磊
 * @date: 		2017.9.19
 * @version: 	v1.0
 */

 ;(function(){
 	var tools = function(){
 		// 打印函数（mark参数是打印标记）
 		this.log = function(mark,msg){
 			var mk = "";
 			if(mark){mk=mark;}
 			var date = this.getDate();
 			console.log("["+date+"]  @"+mk+"  "+msg);
 		};
		// 获取指定cookie
		this.getCookie = function(name){
	        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	        if(arr=document.cookie.match(reg)){
	            return unescape(arr[2]);
	        }else{
	            return null;
	        }
		};
		// 删除指定cookie
		this.delCookie = function(name){
	        var exp = new Date();
	        exp.setTime(exp.getTime() - 1000);
	        var cval=getCookie(name);
	        if(cval!=null){
	            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
	        }
	    };
	    // 把年月日时分秒转为时间戳（参数格式：yy-mm-dd hh:mm:ss）
	    this.getTimeStamp = function(date){
			if(date){
				var stamp = parseInt(Date.parse(new Date(date))/1000);
				return stamp;
			}
			return null;
		};
		/**
		 * 把时间戳转换为年月日时分秒（返回格式：yy-mm-dd hh:mm:ss），如果
		 * 参数为空，返回当前日期
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
		// 获取当前日期（返回格式：yy年mm月dd日）
		this.getCurDateShort = function(){
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();

			var final = year+"年"+month+"月"+day+"日";
			return final;
		};
		// 表单里文件上传
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
 	};
    window.tools = tools;
 })();