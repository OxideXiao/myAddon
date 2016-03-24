;(function($){
	$.fn.extend({
		//add jump link to elements
		"addhyperLink":function(add){
			return this.each(function(){
				$(this).on('click',function(){
					window.location.href=""+add;
				});
			});
		},
		//cut the letters in the end which overflow the limitation, and replace them by other html content we wnat.
		"cutEnd":function(opt){
			opt = $.extend({
				maxLength:20,
				replaceSyb:'...'
			},opt);
			
			return this.each(function(){
				var str = $(this).html();
				if (str.length>opt.maxLength){
					str = str.substring(0,opt.maxLength);
					str+=opt.replaceSyb;
					$(this).html(str);
				}
			});
		},
		//
		"cd_Timer":function(opt){
			opt = $.extend({
				hour:0,
				minute:0,
				second:0,
				if_combine:false,
				target:{
					h_p:'',
					m_p:'',
					s_p:'',
				}				
			},opt);
			var h = opt.hour,m = opt.minute,s = opt.second;
			
			return this.each(function(){
				$.fn.countDownTime(opt.hour,opt.minute,opt.second,$(this),opt);
				
			});
		},
		countDownTime:function(h,m,s,$obj,opt){
			var hour,minute,second;
			var eventBox = {};

			this.doCount = function(h,m,s){
				if (h < 0 || m < 0 || s < 0 || m > 59 || s > 59){
					h = 0;
					m = 0;
					s = 0;
				}
	
				if (s > 0){
					s -= 1;
				}else if(m == 0 && h == 0){
					return
				}else{
					s = 59;
					if (m > 0){
						m -= 1;
					}else{
						m = 59;
						if (h > 0){
							h -= 1;
						}
					}
				};
				setTimeout(function(){
					this.doCount(h,m,s);
				},1000);
			};
			this.bind = function(type,fn){
				if (!eventBox[type]){
					eventBox[type] = [fn];
				}else{
					eventBox[type].push(fn);
				}
			}
			
			if (s<10){
				second = "0"+s;
			}else{
				second = s;
			};
			if (m<10){
				minute = "0"+m;
			}else{
				minute = m;
			};
			if (h<10){
				hour = "0"+h;
			}else{
				hour = h;
			};
			
			if (opt.if_combine){
				$obj.html(hour+":"+minute+":"+second);
			}else{
				$obj.find(opt.target.h_p).html(hour);
				$obj.find(opt.target.m_p).html(minute);
				$obj.find(opt.target.s_p).html(second);
			}		
		},
		"starSelector":function(opt){
			opt = $.extend({
				targets_name:'',
				ini:4
			},opt);
			funcs = {
				setDescri:function(ini,obj,tar){
					switch (ini){
					case 0:
						$(obj).find(tar).html('很差');
						break;
					case 1:
						$(obj).find(tar).html('差');
						break;
					case 2:
						$(obj).find(tar).html('一般');
						break;
					case 3:
						$(obj).find(tar).html('很好');
						break;
					case 4:
						$(obj).find(tar).html('完美');
						break;
					}
					
				}
			}
			
			return this.each(function(){
				var ini,
				$this =$(this)
				if($this.children('.select').length>0){
					ini = $this.children('.select').length-1;
				}else{
					ini =opt.ini;
				}
				funcs.setDescri(ini,this,'.descri');
				
				$this.find(opt.targets_name).on('mouseover',function(){
					var $star = $(this);
					$star.addClass("select").nextAll(opt.targets_name).removeClass('select');
					$star.prevAll(opt.targets_name).addClass('select');
					funcs.setDescri($star.prevAll(opt.targets_name).length,$star.parent(),'.descri');
				}).on('mouseout',function(){
					var $star = $(this);
					$star.parent().children(opt.targets_name).eq(ini).addClass('select')
					.siblings(opt.targets_name).removeClass('select');
					$star.parent().children(opt.targets_name).eq(ini).prevAll(opt.targets_name).addClass('select');
					funcs.setDescri(ini,$star.parent(),'.descri');
				}).on('click',function(){
					ini = $(this).prevAll(opt.targets_name).length;
				})
				
			});
		}
	});
})(jQuery);
