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
			
			return this.each(function(){
				//$.fn.countDownTime(opt.hour,opt.minute,opt.second,$(this),opt);
				var $obj =$(this);
				var timer = new $.fn.CountDownTime();
				timer.bind('counted',function(e){
				
					var hour,minute,second;
					if (e.s<10){
						second = "0"+e.s;
					}else{
						second = e.s;
					};
					if (e.m<10){
						minute = "0"+e.m;
					}else{
						minute = e.m;
					};
					if (e.h<10){
						hour = "0"+e.h;
					}else{
						hour = e.h;
					};
			
					if (opt.if_combine){
						$obj.html(hour+":"+minute+":"+second);
					}else{
						$obj.find(opt.target.h_p).html(hour);
						$obj.find(opt.target.m_p).html(minute);
						$obj.find(opt.target.s_p).html(second);
					}		
				});
				timer.doCount(opt.hour,opt.minute,opt.second)
			});
		},
		CountDownTime:function(){
			
			this.eventBox = {};
			this.tId;

			this.doCount = function(h,m,s){
				var that =this;
				if (h < 0 || m < 0 || s < 0 || m > 59 || s > 59){
					h = 0;
					m = 0;
					s = 0;
					tId&&clearTimeout(tId);
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
				this.trigger('counted',{h:h,m:m,s:s});
				tId = setTimeout(function(){

					that.doCount(h,m,s);
				},1000);
			};
			this.bind = function(type,fn){
				if (!this.eventBox[type]){
					this.eventBox[type] = [fn];
				}else{
					this.eventBox[type].push(fn);
				}
			};
			this.trigger=function(type){
				if (this.eventBox[type]){
					for (var i=0;i<this.eventBox[type].length;i++){
						this.eventBox[type][i].apply(this,[].slice.call(arguments,1));
					}
				}
			
			};
			
			
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
