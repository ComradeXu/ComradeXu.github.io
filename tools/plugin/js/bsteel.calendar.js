(function($){
	$.extend($,{
		changeWindowSize:function(options){//窗口改变大小后执行function
			var defaults = {
				currentObj:{
					cityObj:{
						targetObj:'',
						posObj:''
					},	
					dialogObj:''
				}
			};
			var options  = $.extend(true,defaults,options);
			$(window).bind('resize',function(){
				var $cityObj=options.currentObj.cityObj;
				var $targetObj=$cityObj.targetObj;
				var $posObj=$cityObj.posObj;
				var $dialogObj=options.currentObj.dialogObj;
				if(typeof($targetObj)!='string'&&$posObj.css('display')!='none'){
					$targetObj.posControl({controlObj:$posObj});//日历/城市重新定位	
				};
				if(typeof($dialogObj)!='string'&&$dialogObj.css('display')!='none'){
					$dialogObj.dialogCenter({isClose:true}).dragControl();//拖动定位
				};
			});
		}	
	});
	$.extend($.fn,{
		posControl:function(options){//日历/城市选择器定位
			var options  = $.extend({controlObj:null},options);	
			this.each(function(){
				var self=this;
				var $controlObj=options.controlObj;
				var L=$(self).offset().left,
					T=$(self).offset().top,
					h=$(self).outerHeight(true),
					w=$controlObj.outerWidth(true),
					W=$(window).width(),
					H=$controlObj.outerHeight(true),
					S=$(window).scrollTop(),
					t=$(window).height(),
					a=$(self).width(),
					l;
				var s=t-T-h-2+S;
				L+w>W?l=a+L-w:l=L;
				s>=H?$controlObj.css({'left':l,'top':T+h+2}):$controlObj.css({'left':l,'top':T-H-2});
			});
			return this;
		},
		calendarControl:function(options){
			var defaults = {
				num: 1,//联动日历数量(默认为1)
				autoDate: true, //是否自动添加默认日期（默认是true）,次参数为true时,isAutoComplete必须为true
				isAutoComplete: true, //是否结束日期自动添加默认(true)
				isDefault: true,//是否可以选择选择今天以前（默认true）
				isDisMax: true, //是否最大选择日期为今天(默认true)，此参数为false时，isDefault必须为false
				autoStopDate: false, //是否当选择完成开始日期后，结束日期自动触发选择弹出（默认false）
				dataFormat:1,//日期格式展示 1代表2013-01-01 2代表2013/01/01 3代表2013年01月01日 4代表20130101 (默认是1)
				disabledYear:null,
				clearBtn:true,
				callback:function(obj){//每次选择完成后回调
					
				}
			};
			var options  = $.extend(true,defaults,options);
			this.each(function(){
				var self=this,
					$checkInDate=$('.checkInDate',self),//出发日期
					$checkOutDate=$('.checkOutDate',self),//结束日期
					length=options.num,//联动日历数量
					dataFormatArray=[];
				var calendar={
					year:null, //初始化年
					month:null, //初始化月份
					apart:1,//默认出发日期与结束日期相隔天数
					init:function(){
						this.getDataFormat();//格式
						this.startdate=this.nowdate=new Date().getFullYear()+dataFormatArray[0]+this.formatDate(new Date().getMonth()+1)+dataFormatArray[1]+this.formatDate(new Date().getDate()+1)+dataFormatArray[2];//开始日期
						this.stopdate=null;//结束日期
						this.autoSetDate();//是否自动添加日期
						$checkInDate.css('cursor','pointer').die('click').live('click',{type:1},this.loadCalendar);//创建出发日期
						$checkOutDate.css('cursor','pointer').die('click').live('click',{type:2},this.loadCalendar);//创建结束日期
						$(document).bind('click',this.hideCalendar);	
					},
					getDataFormat:function(){
						switch(options.dataFormat){
							case  1 : dataFormatArray=['-','-',''];break;	
							case  2 : dataFormatArray=['/','/',''];break;	
							case  3 : dataFormatArray=['年','月','日'];break;	
							case  4 : dataFormatArray=['','',''];break;	
							default : break;	
						};	
					},
					getFirstDay:function(year,month){ //获取每个月第一天星期几
						var firstDay = new Date(year,month,1);
						return firstDay.getDay(); //getDay()方法来获取
					},
					getMonthLen:function(year,month){ //获取当月总共有多少天
						var nextMonth = new Date(year,month+1,1); //获取下个月的第一天
						nextMonth.setHours(nextMonth.getHours() - 3); //由于获取的天是0时,所以减去3小时则可以得出该月的天数
						return nextMonth.getDate(); //返回当天日期
					},
					returnWeekend:function(date){//获取星期
						switch(date.getDay()){
							case 0 : return '星期日';break;
							case 1 : return '星期一';break;
							case 2 : return '星期二';break;
							case 3 : return '星期三';break;
							case 4 : return '星期四';break;
							case 5 : return '星期五';break;
							case 6 : return '星期六';break;
							default : break ;
						};
					},
					formatDate:function(d){
						return d<10?d='0'+d:d=d;
					},
					returnDate:function(date){
						return date.getFullYear()+dataFormatArray[0]+calendar.formatDate(date.getMonth()+1)+dataFormatArray[1]+calendar.formatDate(date.getDate())+dataFormatArray[2];
					},
					returnNewDate:function(date){
						var l=date.length;
						if(l>8){
							var y=date.substring(0,4),
								m=date.substring(5,7),
								d=date.substring(8,10);	
						}else if(l==8){
							var y=date.substring(0,4),
								m=date.substring(4,6),
								d=date.substring(6,8);	
						};
						return new Date(y,Number(m)-1,d);
					},
					getWidth:function(n,o){
						var $group=$('.calendar-month',o),
							w=$('.calendar-group',o).outerWidth(true),
							h=[];
						for(var i=0;i<n;i++){
							h.push($group.eq(i).height());
						};
						o.css('width',n*w);
						$group.css('height',Math.max.apply(null,h));
					},
					autoSetDate:function(){
						if(options.autoDate==true){
							var currentdate=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate()+1);
								nextdate=new Date(currentdate.getFullYear(),currentdate.getMonth(),currentdate.getDate()+calendar.apart);
								today=calendar.returnDate(currentdate);
								nextDay=calendar.returnDate(nextdate);
							$checkInDate.val(today).next('span.weekend').text(calendar.returnWeekend(currentdate));
							$checkOutDate.val(nextDay).next('span.weekend').text(calendar.returnWeekend(nextdate));
						};
						if(options.disabledYear!=null){
							$checkOutDate.val(options.disabledYear);	
						};	
					},
					loadCalendar:function(e){
						e.stopPropagation();
						$('.branchList,#calendar-item,.city-pop-item').hide();
						var $target=$(e.target),
							type=e.data.type,
							v=$target.val(),
							date=null;
						v==''?date=new Date():date=calendar.returnNewDate(v);
						if($('#calendar-item').length<=0){
							$('body').append('<div id="calendar-item"><div id="calendar-main"><a href="javascript:;" class="plugin MonthBtn prevMonth" title="上一月"></a><a href="javascript:;" class="plugin MonthBtn nextMonth" title="下一月"></a></div></div>');
							if(options.clearBtn){
								$('#calendar-main').after('<div id="calendar-clear"><span>清空</span></div>');	
							};
						};
						$('#calendar-item .prevMonth').unbind('click').data('disabled',true).bind('click',{data:$target,type:type},calendar.prevCalendar);
						$('#calendar-item .nextMonth').unbind('click').data('disabled',true).bind('click',{data:$target,type:type},calendar.nextCalendar);
						$('#calendar-clear span').unbind('click').bind('click',{data:$target,type:type},calendar.clearCalendarDate);//清空
						calendar.createCalendar(date,$target,type);
					},
					clearCalendarDate:function(e){
						var $obj=e.data.data,
							type=e.data.type;
						$obj.val('').siblings('span.weekend').text('');
						calendar.hideCalendar();
						switch(type){
							case  1 : calendar.startdate=calendar.nowdate;break;	
							case  2 : calendar.stopdate=null;break;	
							default : break;	
						};
					},
					createCalendar:function(date,obj,type){ //创建日历方法
						var $calendar=$('#calendar-item'),month=date.getMonth(),now=new Date().getFullYear()+'-'+calendar.formatDate(new Date().getMonth()+1)+'-'+calendar.formatDate(new Date().getDate());
						calendar.clearCalendar();
						for(var i=0;i<length;i++){
							var newDate=new Date(date.getFullYear(),month,1);
							calendar.addCalendar(newDate,i);
							month++;
						};
						$('#'+now).addClass('now');
						var v=obj.val(),
							_y=v.substring(0,4),
							_m=v.substring(5,7),
							_d=v.substring(8,10);
						if(options.dataFormat==4){
							_y=v.substring(0,4);
							_m=v.substring(4,6);
							_d=v.substring(6,8);	
						};
						if(v==''){
							if(type==1){
								$('#'+new Date().getFullYear()+'-'+calendar.formatDate(new Date().getMonth()+1)+'-'+calendar.formatDate(new Date().getDate()+1)).addClass('check');	
							}else if(type==2){
								var _D=calendar.returnNewDate(calendar.startdate);
								$('#'+_D.getFullYear()+'-'+calendar.formatDate(_D.getMonth()+1)+'-'+calendar.formatDate(_D.getDate()+1)).addClass('check');	
							};	
						}else{
							$('#'+_y+'-'+_m+'-'+_d).addClass('check');	
						};
						$calendar.show().click(function(e){
							e.stopPropagation();
						});
						calendar.getWidth(length,$calendar);
						obj.posControl({controlObj:$calendar});
						$.changeWindowSize({
							currentObj:{cityObj:{
									targetObj:obj,
									posObj:$calendar
								}
							}
						});
						$('.prevMonth',$calendar).removeAttr('id').data('disabled',true);
						$('.nextMonth',$calendar).removeAttr('id').data('disabled',true);
						calendar.disabledCalendar(obj,type,now);//禁止选择
						$('.calendar-day a:not(".disabled")',$calendar).bind('click',{data:obj,type:type},calendar.getSelectDate);
					},
					addCalendar:function(date,n){
						calendar.year = date.getFullYear(); //获得当时的年份,并赋值到calendar属性year中,以便别的方法的调用
						calendar.month = date.getMonth(); //跟上面获取年份的目的一样
						var trueMonth=calendar.formatDate(calendar.month+1);
						$('#calendar-main').append('<div class="calendar-group"><div class="calendar-title">'+calendar.year+'年'+trueMonth+'月</div><div class="calendar-month"><div class="calendar-week"><span class="weekend">日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span class="weekend">六</span></div><div class="calendar-day"><ul><div class="clear"></div></ul><div class="calendar-singleMonth">'+trueMonth+'</div></div></div></div>');
						var monthLen = calendar.getMonthLen(calendar.year,calendar.month); //获取当月最后一天
						var firstDay = calendar.getFirstDay(calendar.year,calendar.month); //获取月份首天为星期几
						var str='';
						for(var i=0;i<monthLen+firstDay;i++){ //循环写入每天的值
							if(i>=firstDay&&i<monthLen+firstDay){
								var day=i-firstDay+1,trueDay=calendar.formatDate(day);
								i%7==0||(i+1)%7==0?str+='<li><a id="'+calendar.year+'-'+trueMonth+'-'+trueDay+'" href="javascript:;" class="weekend">'+day+'</a></li>':str+='<li><a id="'+calendar.year+'-'+trueMonth+'-'+trueDay+'" href="javascript:;">'+day+'</a></li>';	
							}else{
								str+='<li><a href="javascript:;" class="disabled"></a></li>';	
							};
						};
						$('.calendar-day ul').eq(n).prepend(str);
					},
					prevCalendar:function(e){
						if($(e.target).data('disabled')==true){
							calendar.createCalendar(new Date(calendar.year,calendar.month-length,1),e.data.data,e.data.type);	
						};	
					},
					nextCalendar:function(e){
						if($(e.target).data('disabled')==true){
							calendar.createCalendar(new Date(calendar.year,calendar.month-length+2,1),e.data.data,e.data.type);
						};	
					},
					disabledCalendar:function(obj,type,now){
						if(options.isDefault==true){
							var a=obj.val(),
								$current=$('#'+a);
							switch(type){
								case 1 : 
									var $now=$('#'+now),
										$next=$('#'+calendar.stopdate);
									if($now.length>0){
										$('.calendar-day:first li:lt('+$now.parent().index()+') a').addClass('disabled');
										$('#calendar-item .prevMonth').attr('id','disabledPrevMonth').data('disabled',false);
									};
									if($next.length>0){
										var c=$next.parent().index();
											d=$next.parents('.calendar-group').index()-2;
										$('#calendar-item .nextMonth').attr('id','disabledNextMonth').data('disabled',false);	
										$('#calendar-item .calendar-group:eq('+d+') li:gt('+c+') a').addClass('disabled');
										$('#calendar-item .calendar-group:gt('+d+') a').addClass('disabled');
									};
									break;
								case 2 : 
									var yy=calendar.startdate.substring(0,4),
										mm=calendar.startdate.substring(5,7),
										dd=calendar.startdate.substring(8,10);
									if(options.dataFormat==4){
										yy=calendar.startdate.substring(0,4);
										mm=calendar.startdate.substring(4,6);
										dd=calendar.startdate.substring(6,8);	
									};
									var $prev=$('#'+yy+'-'+mm+'-'+dd),
										I=$prev.parents('.calendar-group').index()-2,
										index=$prev.parent().index();
									if($prev.length>0){
										$('.calendar-group:lt('+I+')').find('a').addClass('disabled');
										$('.calendar-group:eq('+I+')').find('li:lt('+$prev.parent().index()+') a').addClass('disabled');
										$('#calendar-item .prevMonth').attr('id','disabledPrevMonth').data('disabled',false);
									};
									break;
								default: break;
							};
						};
						if(options.isDisMax==false){
							var $now=$('#'+now);
							if($now.length>0){
								var c=$now.parent().index();
									d=$now.parents('.calendar-group').index()-2;
								$('#calendar-item .nextMonth').attr('id','disabledNextMonth').data('disabled',false);	
								$('#calendar-item .calendar-group:eq('+d+') li:gt('+c+') a').addClass('disabled');
								$('#calendar-item .calendar-group:gt('+d+') a').addClass('disabled');
							};
							switch(type){
								case 1 : 
									var $next=$('#'+calendar.stopdate);
									if($next.length>0){
										var c=$next.parent().index();
											d=$next.parents('.calendar-group').index()-2;
										$('#calendar-item .nextMonth').attr('id','disabledNextMonth').data('disabled',false);	
										$('#calendar-item .calendar-group:eq('+d+') li:gt('+c+') a').addClass('disabled');
										$('#calendar-item .calendar-group:gt('+d+') a').addClass('disabled');
									};
									break;
								case 2 : 
									var $prev=$('#'+$checkInDate.val());
									if($prev.length>0){
										$('.calendar-day:first li:lt('+$prev.parent().index()+') a').addClass('disabled');
										$('#calendar-item .prevMonth').attr('id','disabledPrevMonth').data('disabled',false);
									};
									break;
								default: break;
							};
						};	
					},
					getSelectDate:function(e){
						var $target=$(e.target),
							date=$target.attr('id'),
							checkArr=date.split('-'),
							type=e.data.type,
							prevdate=calendar.returnNewDate(date),
							$input=e.data.data;
						switch(type){
							case 1 : 
								var v=$checkOutDate.val(),
									m=calendar.returnNewDate(calendar.startdate),
									d=new Date(m.getFullYear(),m.getMonth(),m.getDate()+calendar.apart);
								if((v==''||calendar.returnDate(d)==v)&&options.isAutoComplete==true){
									var nextdate=new Date(prevdate.getFullYear(),prevdate.getMonth(),prevdate.getDate()+calendar.apart);
									$checkOutDate.val(calendar.returnDate(nextdate)).next('span.weekend').text(calendar.returnWeekend(nextdate));	
								};
								var _v=checkArr[0]+dataFormatArray[0]+checkArr[1]+dataFormatArray[1]+checkArr[2]+dataFormatArray[2];
								$input.val(_v).next('span.weekend').text(calendar.returnWeekend(prevdate));
								calendar.startdate=_v;
								calendar.hideCalendar();
								if(options.autoStopDate==true&&$checkOutDate.parent().css('display')!='none'){
									$checkOutDate.trigger('click');		
								};
								break;
							case 2 : 
								$input.val(checkArr[0]+dataFormatArray[0]+checkArr[1]+dataFormatArray[1]+checkArr[2]+dataFormatArray[2]).next('span.weekend').text(calendar.returnWeekend(prevdate));
								calendar.stopdate=date;
								calendar.hideCalendar();
								break;
							default: break;
						};
						options.callback($input);
					},
					clearCalendar:function(){
						$('.calendar-group').remove();
					},
					hideCalendar:function(){
						$('#calendar-item').hide();
						$('#calendar-item .calendar-day a:not(".disabled")').unbind('click',calendar.getSelectDate);
						$('#calendar-item .prevMonth').unbind('click',calendar.prevCalendar);
						$('#calendar-item .nextMonth').unbind('click',calendar.nextCalendar);
					}	
				};
				calendar.init();
			});
			return this;
		},
		checkBirthDate:function(options){
			var self=this;
			var birth={
				init:function(){
					this.year=new Date().getFullYear()-20; //初始化年
					this.birthMonth=null; //选择的年份
					this.birthYear=null;//选择的月份
					this.birthDay=null;//选择的日期
					this.name=null;
					this.currentYear=new Date().getFullYear();//当前年份
					this.currentMonth=this.formatDate(new Date().getMonth()+1);//当前月份
					this.currentDay=new Date().getDate();//当前日期
					$(self).live('click',this.createBirth);//创建日期
					$(document).bind('click',this.hideBirth);//删除日期
				},
				formatDate:function(d){
					return d<10?d='0'+d:d=d;
				},
				getFirstDay:function(year,month){ //获取每个月第一天星期几
					var firstDay = new Date(year,month,1);
					return firstDay.getDay(); //getDay()方法来获取
				},
				getMonthLen:function(year,month){ //获取当月总共有多少天
					var nextMonth = new Date(year,month+1,1); //获取下个月的第一天
					nextMonth.setHours(nextMonth.getHours() - 3); //由于获取的天是0时,所以减去3小时则可以得出该月的天数
					return nextMonth.getDate(); //返回当天日期
				},
				createBirth:function(e){
					e.stopPropagation();
					birth.hideBirth();
					$('#calendar-item,.city-pop-item,.branchList').hide();
					var $target=$(e.target),$selectPrevBtn,$selectNextBtn;
					$('body').append('<div id="birth-calendar"><div id="birth-year"><div class="selectYearBtn selectPrevBtn"><em class="plugin"></em></div><div class="selectYearBtn selectNextBtn"><em class="plugin"></em></div><h3 class="birth-calendar-t">请您选择年份</h3><div class="selectBox"><div class="selectList"></div></div></div></div>');
					birth.name=$('#birth-calendar');
					birth.addYear(1,$target);
					$selectPrevBtn=$('.selectPrevBtn',birth.name);
					$selectNextBtn=$('.selectNextBtn',birth.name);
					$selectPrevBtn.removeAttr('id').data('disable',true).bind('click',{'data':$selectPrevBtn,obj:$target},birth.prevPageYear);
					$selectNextBtn.removeAttr('id').data('disable',true).bind('click',{'data':$selectNextBtn,obj:$target},birth.nextPageYear);
					$target.posControl({controlObj:birth.name});
					$.changeWindowSize({
						currentObj:{cityObj:{
								targetObj:$target,
								posObj:birth.name
							}
						}
					});
					birth.disSelectYear($selectNextBtn);
					birth.name.show().click(function(e){
						e.stopPropagation();
					});
				},
				disSelectYear:function(o){
					var $cur=$('#year'+birth.currentYear);
					var index=$cur.index();
					if($cur.length>0){
						o.data('disable',false).attr('id','disabledSelectNextBtn');	
						$cur.parent().find('li:gt('+index+')').addClass('disabled');
					};
				},
				disSelectMonth:function(){
					var $cur=$('#month'+birth.currentMonth);
					var index=$cur.index();
					if($cur.length>0){
						$cur.parent().find('li:gt('+index+')').addClass('disabled');
					};
				},
				disSelectDay:function(){
					var $cur=$('#day'+birth.formatDate(birth.currentDay));
					var index=$cur.index();
					if($cur.length>0){
						$cur.parent().find('li:gt('+index+')').addClass('disabled');
					};
				},
				addYear:function(n,obj){
					switch(n){
						case -1:$('.selectList').prepend('<ul class="selectList-s"></ul>');break;
						case  1:$('.selectList').append('<ul class="selectList-s"></ul>');break;
						default:break;
					};
					var str_y='';
					for(var i=11;i>=0;i--){
						str_y+='<li id="year'+(birth.year-i)+'">'+(birth.year-i)+'</li>';
					};
					switch(n){
						case -1:$('.selectList-s:first').prepend(str_y);break;
						case  1:$('.selectList-s:last').prepend(str_y);break;
						default:break;
					};
					$('#birth-year li').bind('click',{data:obj},birth.selectYear);
				},
				prevPageYear:function(e){
					var $target=e.data.data;
					$('.selectNextBtn',birth.name).removeAttr('id').data('disable',true);
					if($target.data('disable')==true){
						$target.data('disable',false);
						birth.year-=12;	
						birth.addYear(-1,e.data.obj);
						$('.selectList-s:first',birth.name).css('marginLeft',-194);
						$('.selectList-s:first',birth.name).stop(true,false).animate({'marginLeft':-5},500,function(){
							$('.selectList-s:last').remove();
							$target.data('disable',true);
							birth.disSelectYear($('.selectNextBtn',birth.name));	
						});
					};
				},
				nextPageYear:function(e){
					var $target=e.data.data;
					$target.removeAttr('id');
					if($target.data('disable')==true){
						$target.data('disable',false);
						birth.year+=12;				
						birth.addYear(1,e.data.obj);
						$('.selectList-s:first',birth.name).stop(true,false).animate({'marginLeft':-194},500,function(){
							$('.selectList-s:first',birth.name).remove();	
							$target.data('disable',true);
						});
					};
					birth.disSelectYear($target);
				},
				selectYear:function(e){
					var $target=$(e.target);
					if(!$target.hasClass('disabled')){
						birth.birthYear=$target.text();
						$('#birth-year').after('<div id="birth-month"><h3 class="birth-calendar-t">请您选择月份</h3><ul class="selectList-s"><li id="month01">01</li><li id="month02">02</li><li id="month03">03</li><li id="month04">04</li><li id="month05">05</li><li id="month06">06</li><li id="month07">07</li><li id="month08">08</li><li id="month09">09</li><li id="month10">10</li><li id="month11">11</li><li id="month12">12</li></ul></div>');
						$('#birth-year').remove();
						$('#birth-month').show();
						$('#birth-month li').bind('click',{data:e.data.data},birth.selectMonth);	
						if(birth.birthYear==birth.currentYear){
							birth.disSelectMonth();
						};
					};
				},
				selectMonth:function(e){
					var $target=$(e.target);
					if(!$target.hasClass('disabled')){
						birth.birthMonth=$target.text();
						$('#birth-month',birth.name).after('<div id="birth-days"><h3 class="birth-calendar-t">请您选择日期</h3><div id="birth-calendar-week"><span>日</span><span>一</span><span>二</span><span>三</span><span>四</span><span>五</span><span>六</span></div><ul class="selectList-d"></ul></div>');
						var monthLen = birth.getMonthLen(birth.birthYear,Number(birth.birthMonth)-1); //获取当月最后一天
						var firstDay = birth.getFirstDay(birth.birthYear,Number(birth.birthMonth)-1); //获取月份首天为星期几
						var str_d='';
						for(var i=0;i<42;i++){ 
							if(i>=firstDay&&i<monthLen+firstDay){
								str_d+='<li class="check" id="day'+birth.formatDate(i-firstDay+1)+'">'+(i-firstDay+1)+'</li>';		
							}else{
								str_d+='<li class="disabled"></li>';	
							};
						};
						$('.selectList-d',birth.name).append(str_d);
						$('#birth-month').remove();
						$('#birth-days').show();
						$('#birth-days li').bind('click',{data:e.data.data},birth.selectDay);
						if(birth.birthYear==birth.currentYear&&birth.birthMonth==birth.currentMonth){
							birth.disSelectDay();
						};
					};
				},
				selectDay:function(e){
					var $target=$(e.target);
					if(!$target.hasClass('disabled')){
						birth.birthDay=$target.text();
						birth.name.remove();
						e.data.data.val(birth.birthYear+'-'+birth.birthMonth+'-'+birth.formatDate(birth.birthDay));
						if(options&&options.callback){
							options.callback(e.data.data);
						};
					};
				},
				hideBirth:function(){
					$('#birth-calendar').remove();
				}
			};
			birth.init();//调用出生日期日历
		}
	});	
})(jQuery);