var myAddon = {
	/*event emitter*/
	EventEmiter:function(){
		this.eventsBox = {};
		this.on = function(id,fn){
			if (!this.eventsBox[id]){
				this.eventsBox[id] = [fn];
			}else{
				this.eventsBox[id].push(fn);
			}
		};
		this.trigger=function(id,that,e){
			if(!that){
				that ={}
			}
			if (this.eventsBox[id]){
				for (var i=0;i<this.eventsBox[id].length;i++){
					this.eventsBox[id][i].apply(that,[].slice.call(arguments,2));
				}
			}
			
		};
	}
}

/*jquery addon*/
var myJAddon = {
	/*moving module*/
	moves:{
		PageMover:function(){
			var w,h,
				idx = 0,
				that = this,
				opt = {
				targetN:'',
				direction:'down',
				limit:6,
				moveEvent:['mouseWheel'],
				speed:500
			};
			this.eventer = new myAddon.EventEmiter;

			this.init = function(opt_n){
				opt = $.extend(opt,opt_n);

				this.control(opt.targetN,opt.direction);
			};
			
			this.control = function(tarN,direction){
				var $tObj = $(tarN);
				var dir;
				switch (direction){
					case 'donw':
						dir = -1;
						break;
					default:
						dir = -1;
						break;
				};

				this.resize($tObj,dir);
				$(window).on('resize',function(){
					that.resize($tObj,dir);
				});

				$(window).on('click',function(){
					that.movePage($tObj,dir,opt.speed);
				});	

					
			};
			this.resize = function(tar_obj,dir){
				w = $(window).width();
				h = $(window).height();
				tar_obj.css('marginTop',h*idx*dir);
			};
			this.movePage = function(tar_obj,dir,speed){
				if (idx +((-1)*dir)<0||idx +((-1)*dir)>opt.limit-1){
					return;
				}					

				var mt = parseInt(tar_obj.css('marginTop'));

				that.eventer.trigger('movestart',$(opt.targetN),{});
				tar_obj.animate({'marginTop':mt + dir*h},speed,function(){					
					that.eventer.trigger('moveend',$(opt.targetN),{});
				});
				idx +=((-1)*dir);
				
			};

		}
	}
	/*end of moving module*/
}