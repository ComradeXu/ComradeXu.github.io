;(function(a){function d(b){var c=b||window.event,d=[].slice.call(arguments,1),e=0,f=!0,g=0,h=0;return b=a.event.fix(c),b.type="mousewheel",c.wheelDelta&&(e=c.wheelDelta/120),c.detail&&(e=-c.detail/3),h=e,c.axis!==undefined&&c.axis===c.HORIZONTAL_AXIS&&(h=0,g=-1*e),c.wheelDeltaY!==undefined&&(h=c.wheelDeltaY/120),c.wheelDeltaX!==undefined&&(g=-1*c.wheelDeltaX/120),d.unshift(b,e,g,h),(a.event.dispatch||a.event.handle).apply(this,d)}var b=["DOMMouseScroll","mousewheel"];if(a.event.fixHooks)for(var c=b.length;c;)a.event.fixHooks[b[--c]]=a.event.mouseHooks;a.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=b.length;a;)this.addEventListener(b[--a],d,!1);else this.onmousewheel=d},teardown:function(){if(this.removeEventListener)for(var a=b.length;a;)this.removeEventListener(b[--a],d,!1);else this.onmousewheel=null}},a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);;(function($){
	$.extend($,{
		isAlphaBg:function(){//是否添加全屏透明大背景
			if($('#JQ-dialog-bg').length<=0){
				$('body').prepend('<div id="JQ-dialog-bg"></div>');
				$('#JQ-dialog-bg').css({'height':Math.max($('body').height(),$(window).height())});	
			};
			$('#JQ-dialog-bg').show();	
		},
		AsyncDialogBox:function(options){
			var defaults = {
				url:'',
				title:'',
				callback:function(){
						
				}
			};
			var options  = $.extend(true,defaults,options);
			var S={
				init:function(){
					$.ajax({
						url:options.url,
						type:"post",
						dataType:"text",
						beforeSend:function(){
							$.isAlphaBg();	
							$('body').append('<div class="JQ-dialog-loading"><div id="JQ-dialog-loading-bg"></div><div id="JQ-dialog-loading-main"><p><span class="middle"></span>正在处理中，请耐心等待...</p></div></div>');	
						},
						success:function(data){
							
						},
						error: function(){
							//$('.JQ-dialog-loading,#JQ-dialog-bg').remove();
						}	
					});
				}	
			};
			S.init();
		},
		stausDialogBox:function(options){
			
		}
	});
})(jQuery);
;(function($){
	$.extend($.fn,{
		scrollBar:function(options){//模拟滚动条
			var defaults = {
				scrollDraggerWidth:3,//滑块区域宽度 单位px
				scrollDraggerBackgroundColor:'#d0d0d0',//滑块区域背景颜色
				scrollDraggerBackgroundColorHover:'#aaaaaa',//滑块区域滑过背景颜色
				scrollDraggerMarginLeft:10,//滑块区域左边距 单位px
				scrollDraggerMarginRight:10,//滑块区域右边距 单位px
				scrollDraggerMarginTop:10,//滑块区域上边距 单位px
				scrollDraggerMarginBottom:10,//滑块区域下边距 单位px
				scrollBarWidth:7,//滑块自身宽度 单位px
				scrollBarBackgroundColor:'#999999',//滑块自身背景颜色
				scrollBarBackgroundColorHover:'#666666',//滑块自身滑过背景颜色
				scrollBarBackgroundColorDown:'#333333',//滑块自身按下背景颜色
				scrollMaxHeight:null,//盒子最大高度
				animateSpeed:300,//内容缓冲速度
				mouseWheelSpeed:30,//鼠标滑轮转动速度
				autoScrollTop:0,//滑块初始位置
				defaultClickBtn:false,//是否
				clickScrollSpeed:0.1,//点击上下按钮移动速度 （默认0.1代表10%）
				scrollClickBtn:{//上下按钮样式
					scrollUpBtn:['images/scrollTopBtn.png',13,10,5],//向上按钮样式 数组[string按钮背景地址,按钮宽度int,按钮高度int,按钮下边距int]
					scrollDownBtn:['images/scrollBottomBtn.png',13,10,5]//向下按钮样式 数组[string按钮背景地址,按钮宽度int,按钮高度int,按钮上边距int]
				},	
				callback:function(){//回调 每次滚动之后执行函数 
						
				}
			};
			var options  = $.extend(true,defaults,options);
			this.each(function(){
				var self=this,
					$content=$(self).children(':first'),//滚动内容
					scrollHeight=options.scrollMaxHeight==null?$(self).height():options.scrollMaxHeight,//盒子高度
					contentHeight=$content.height(),//内容高度
					scrollLineHeight=scrollHeight-options.scrollDraggerMarginTop-options.scrollDraggerMarginBottom;
				var S={
					init:function(){
						if(contentHeight>scrollHeight){
							this.currentPageY=0;//鼠标按下所在位置
							this.currentPositionTop=0;//滑动前滑动块所在位置
							this.contentScrollHeight=0;//内容初始化所在位置
							this.enableContentHeight=contentHeight-scrollHeight;//内容移动区域最大高度
							if(options.defaultClickBtn){
								var up=options.scrollClickBtn.scrollUpBtn,
									down=options.scrollClickBtn.scrollDownBtn;
								if($('.JQ-scroll-item',self).length<=0){
									$(self).append('<div class="JQ-scroll-item" style="position:absolute;display:none;"><span class="JQ-scroll-up-btn JQ-scroll-btn"data-type="up"style="display:block;position:absolute;cursor:default;"></span><div class="JQ-scroll-dragger"style="position:relative;"><span class="JQ-scroll-bar" style="display:block;cursor:default;position:absolute;"></span></div><span class="JQ-scroll-down-btn JQ-scroll-btn"data-type="down"style="display:block;position:absolute;cursor:default;"></span></div>');
								};
								this.scrollDraggerHeight=scrollLineHeight-up[2]-up[3]-down[2]-down[3];//滑块区域高度
								$('.JQ-scroll-up-btn',self).css({
									'background':'url('+up[0]+') no-repeat',
									'opacity':0.3,
									'width':up[1],
									'height':up[2],
									'left':-(up[1]-options.scrollDraggerWidth)/2,
									'top':0
								});
								$('.JQ-scroll-down-btn',self).css({
									'background':'url('+down[0]+') no-repeat',
									'opacity':0.3,
									'width':down[1],
									'height':down[2],
									'left':-(down[1]-options.scrollDraggerWidth)/2,
									'bottom':0
								});
								$('.JQ-scroll-dragger',self).css('top',up[2]+up[3])
								$('.JQ-scroll-btn',self).unbind('click').bind({
									'click':this.clickOnScrollBtn,
									'mouseover':this.mouseoverOnScrollBtn,
									'mouseleave':this.mouseleaveOnScrollBtn
								});
							}else{
								this.scrollDraggerHeight=scrollLineHeight;//滑块区域高度	
								if($('.JQ-scroll-item',self).length<=0){
									$(self).append('<div class="JQ-scroll-item" style="position:absolute;display:none;"><div class="JQ-scroll-dragger"style="position:relative;"><span class="JQ-scroll-bar" style="display:block;cursor:default;position:absolute;"></span></div></div>');	
								};
							};
							this.scrollBarHeight=parseInt(scrollHeight*this.scrollDraggerHeight/contentHeight);//滑块高度
							this.enableBarHeight=this.scrollDraggerHeight-this.scrollBarHeight;//滑块移动区域最大高度	
							$content.css({
								'float':'left',
								'margin-top':0,
								'width':$(self).width()-options.scrollDraggerWidth-options.scrollDraggerMarginLeft-options.scrollDraggerMarginRight
							}).unbind('mousewheel').bind('mousewheel',this.contentMouseWheel);//滚动区域滑轮
							this.bar=$('.JQ-scroll-bar',self);//滑块
							this.dragger=$('.JQ-scroll-dragger',self);//滑块区域
							this.bar.css({
								'top':0,
								'width':options.scrollBarWidth,
								'height':this.scrollBarHeight,
								'left':-(options.scrollBarWidth-options.scrollDraggerWidth)/2,
								'background':options.scrollBarBackgroundColor
							}).unbind('mousedown').bind('mousedown',this.mousedownOnBar);//滑块按下
							this.dragger.css({
								'width':options.scrollDraggerWidth,
								'background':options.scrollDraggerBackgroundColor,
								'height':this.scrollDraggerHeight
							}).unbind('click').bind({//滑块区域点击
								'mouseover':this.mouseoverOnDragger,
								'mouseleave':this.mouseleaveOnDragger,	
								'click':this.clickOnDragger	
							});
							$('.JQ-scroll-item',self).css({
								'top':options.scrollDraggerMarginTop,
								'width':options.scrollDraggerWidth,
								'height':scrollLineHeight,
								'right':options.scrollDraggerMarginRight
							}).show();
							S.barMoveOnDragger(options.autoScrollTop,0,false);//初始化滑块位置
						}else{
							$('.JQ-scroll-item',self).remove();	
							$content.unbind('mousewheel').css({'width':'100%','margin-top':0});
						};	
					},
					clickOnScrollBtn:function(e){
						var type=e.target.attributes['data-type'].nodeValue;
						S.currentPositionTop=S.bar.position().top;
						switch(type){
							case 'up'  : S.currentPositionTop-=options.clickScrollSpeed*S.enableBarHeight; break;
							case 'down': S.currentPositionTop+=options.clickScrollSpeed*S.enableBarHeight; break;	
							default    : break;		
						};
						S.barMoveOnDragger(S.currentPositionTop,S.currentPositionTop,false);
					},
					mouseoverOnScrollBtn:function(e){
						$(e.target).css('opacity',1);
					},
					mouseleaveOnScrollBtn:function(e){
						$(e.target).css('opacity',0.3);
					},
					clickOnDragger:function(e){	
						if(e.target.className!='JQ-scroll-bar'){
							S.currentPositionTop=S.bar.position().top;
							S.barMoveOnDragger(e.pageY,S.bar.offset().top,false);
						};
					},
					contentMouseWheel:function(e,delta){
						e.preventDefault();
						switch(delta){
							case -1 : S.contentScrollHeight+=options.mouseWheelSpeed; break;
							case  1 : S.contentScrollHeight-=options.mouseWheelSpeed; break;	
							default : break;		
						};
						S.contentScrollHeight=Math.min(S.enableContentHeight,Math.max(0,S.contentScrollHeight));	
						S.mainAnimate(S.contentScrollHeight*S.enableBarHeight/S.enableContentHeight,S.contentScrollHeight);
					},
					mouseoverOnDragger:function(){
						this.style.background=options.scrollDraggerBackgroundColorHover;
						S.bar.css('background',options.scrollBarBackgroundColorHover);		
					},
					mouseleaveOnDragger:function(){
						this.style.background=options.scrollDraggerBackgroundColor;		
						S.bar.css('background',options.scrollBarBackgroundColor);
					},
					mousedownOnBar:function(e){
						S.currentPositionTop=S.bar.position().top;
						S.currentPageY=e.pageY;//滑块按下去时鼠标位置
						S.bar.css('background',options.scrollBarBackgroundColorDown);
						$(document).bind({
							'mousemove':S.mouseMoveOnDocument,//滑块移动
							'mouseup':S.mouseUpOnDocument,//滑块鼠标松开
							'selectstart':S.selectStartOnDocument,//防止滑动过程中内容被选中,针对IE
							'selectable':'on'//防止滑动过程中内容被选中,针对Opera
						});	
					},
					mouseMoveOnDocument:function(e){
						S.barMoveOnDragger(e.pageY,S.currentPageY,true);//参数:滑块滑动时鼠标位置
					},
					barMoveOnDragger:function(a,b,c){
						$('body').css({'-moz-user-select':'none','-o-user-select':'none','user-select':'none'});
						if(c==true){
							S.bar.css({'background':options.scrollBarBackgroundColorDown});
							S.dragger.css('background',options.scrollDraggerBackgroundColorHover);		
						};
						var scrollBarTop=a-b+S.currentPositionTop;//最终滑块距离顶部距离
						scrollBarTop=Math.min(Math.max(0,scrollBarTop),S.enableBarHeight);//将滑块拖动区域限定在可拖动区域里
						S.contentScrollHeight=(scrollBarTop/S.enableBarHeight)*S.enableContentHeight; //计算出滚动内容区域移动高度
						S.mainAnimate(scrollBarTop,S.contentScrollHeight);//调用定位FUN
					},
					mainAnimate:function(a,b){
						S.bar.css('top',a);//移动滑块
						$content.stop().animate({'margin-top':-b},options.animateSpeed,'linear',function(){//移动显示区域内容
							S.bar.css('background',options.scrollBarBackgroundColor);
							S.dragger.css('background',options.scrollDraggerBackgroundColor);	
							if(options.callback){
								options.callback();	
							};	
						});
					},
					mouseUpOnDocument:function(){
						$('body').css({'-moz-user-select':'text','-o-user-select':'text','user-select':'text'});//防止页面内容被选中针对FF
						S.bar.css('background',options.scrollBarBackgroundColor);
						S.dragger.css('background',options.scrollDraggerBackgroundColor);	
						$(document).bind('selectable','off').unbind({
							'mousemove':S.mouseMoveOnDocument,//撤销移动
							'selectstart':S.selectStartOnDocument//撤销被选中
						});
					},
					selectStartOnDocument:function(){
						return false;//防止页面内容被选中针对IE
					}
				};
				S.init();	
			});
			return this;
		},
		selectChosen:function(options){//模拟下拉
			var defaults = {
				headClassName:'JQ-select-panel-head',
				bodyClassName:'JQ-select-panel-body',
				isDefault:true,
				callback:function(obj,index){}
			};
			var options  = $.extend(true,defaults,options);
			this.each(function(){
				var self=this,
					$title=$('.'+options.headClassName,self),
					$select=$('.'+options.bodyClassName,self),
					$li=$('li',$select),
					$input=$('input[type=hidden]',self),
					top=$select.css('top');
				var S={
					init:function(){
						if(options.isDefault){
							this.autoGetValue();	
						};
						$title.unbind('click').bind('click',this.selectList);
						$li.unbind('click').bind('click',this.selectListClick);		
						$(document).bind('click',this.hideList);
					},
					autoGetValue:function(){
						var v=$input.val();
						$title.text(v);
						$li.filter(function(index) {
                            var _this=$(this);
							if(v==_this.attr('data-code')){
								$title.text(_this.text());
								return ;
							};
                        });
					},
					selectList:function(e){
						$('.'+options.bodyClassName).hide();
						e.stopPropagation();
						$select.show().click(function(e){
							e.stopPropagation();	
						}).animate({'top':0,'opacity':1},200,function(){
							if(typeof($(self).data('scroll'))==='undefined'){
								$(self).data('scroll',true);
								$select.scrollBar({
									scrollDraggerWidth:1,
									scrollDraggerMarginLeft:5,
									scrollDraggerMarginRight:5,
									scrollDraggerMarginTop:5,
									scrollDraggerMarginBottom:5,
									scrollBarWidth:3,
									scrollMaxHeight:options.dropBoxHeight?options.dropBoxHeight:null,
									animateSpeed:200,
									mouseWheelSpeed:24
								});
							};
						});
					},
					selectListClick:function(e){
						var $target=$(e.target),
							code=$target.attr('data-code'),
							text=$target.text();
						$input.val(code);
						$title.text(text);
						S.hideList();
						options.callback($title,$target.index());	
					},
					hideList:function(){
						$select.animate({top:top,'opacity':0},200,function(){
							$select.hide();	
						});
					}	
				};
				S.init();
			});
			return this;
		},
		citySelect:function(options){//省市县城市选择
			var defaults = {
				headClassName:'JQ-select-panel-head',
				bodyClassName:'JQ-select-panel-body',
				disClassName:'JQ-select-panel-head-disabled',
				dataURL:'js/cityData.json',
				callback:function(obj,index){}
			};
			var options  = $.extend(true,defaults,options);
			this.each(function(){
				var self=this,
					$provice=$('.JQ-select-panel-province',self),//省
					$city=$('.JQ-select-panel-city',self),//市
					$county=$('.JQ-select-panel-county',self),//县
					headClass=options.headClassName,
					bodyClass=options.bodyClassName;
				var S={
					init:function(){
						$.ajax({
							url:options.dataURL,
							type:"post",
							dataType:"json",
							beforeSend:function(){
								
							},
							success:function(data){
								var p='';
								$.each(data,function(a,provice){
									p+='<li data-code="'+a+'" title="'+provice.p+'">'+provice.p+'</li>';
								});
								$('.'+bodyClass+' ul',$provice).html(p);
								$provice.selectChosen({//省份模拟下拉	
									headClassName:headClass,
									bodyClassName:bodyClass,
									isDefault:false,
									callback:function(obj,index){
										var c='',pinal=data[index].c;
										$.each(pinal,function(a,city){
											c+='<li data-code="'+a+'" title="'+city.n+'">'+city.n+'</li>';
										});
										$('.'+headClass,$city).removeClass(options.disClassName).html('请选择');
										$('.'+bodyClass+' ul',$city).html(c);
										$('input',$city).val(-1);
										$('.'+headClass,$county).addClass(options.disClassName).html('请选择');
										$('.'+bodyClass+' ul',$county).html('');
										$('input',$county).val(-1);
										$city.removeData('scroll').selectChosen({//城市模拟下拉	
											headClassName:headClass,
											bodyClassName:bodyClass,
											isDefault:false,
											dropBoxHeight:239,
											callback:function(obj,index){
												$('.'+headClass,$county).html('请选择');
												var d='',count=pinal[index].a;
												if(typeof(count)!=='undefined'){
													$.each(count,function(a,county){
														d+='<li data-code="'+a+'" title="'+county.s+'">'+county.s+'</li>';
													});
													$('.'+headClass,$county).removeClass(options.disClassName);
													$('.'+bodyClass+' ul',$county).html(d);
													$('input',$county).val(-1);
													$county.removeData('scroll').selectChosen({//县级模拟下拉	
														headClassName:headClass,
														bodyClassName:bodyClass,
														isDefault:false,
														dropBoxHeight:239,
														callback:function(obj,index){
															options.callback(obj,index);	
														}
													});	
												}else{
													$('.'+bodyClass+' ul',$county).html('');
													$('input',$county).val(-2);	
													$('.'+headClass,$county).unbind('click').addClass(options.disClassName);
													options.callback(obj,index);	
												};
											}
										});		
									}
								});
							},
							error: function(){

							}	
						});	
					}
				};
				S.init();
			});	
			return this;
		},
		lazyLoadimg:function(options){//懒加载
			var self=this;
			var S={
				loadImg:function(c,obj){
					var img = new Image();
					$(img).load(function(){
						obj.hide().attr('src',c).fadeIn();
					}).attr("src", c);	
				}
			}
			$(window).bind('scroll',function(){
				var H=$(window).height(),
					scrollTop=$(window).scrollTop();
				$(self).each(function(){
					var _this=$(this),
						Top=_this.offset().top,
						original=_this.attr('original'),
						src=_this.attr('src');
					if(Top>=H+scrollTop){
						_this.attr({'src':options.src,'original':src});
					}else{
						S.loadImg(original,_this);
					};	
					console.log(original);
				});	
			})/*.trigger('scroll');*/
			return this;
		},
		FuzzySearch:function(options){//模糊搜索提示
			var defaults = {
				url:''
			};
			var options  = $.extend(true,defaults,options);	
			this.each(function(){
				var self=this,
					id=this.id,
					key=this.value,
					obj=null;
				var S={
					init:function(){
						$(self).unbind('focus').bind({
							'click':this.clickOnInput,
							'keyup':this.keyupOnInput
						});
						$(document).bind('click',this.removeSearchList);	
					},
					addSearchPos:function(){
						var L=$(self).offset().left,
							T=$(self).offset().top,
							h=$(self).outerHeight(true),
							t=T+h+2;
						obj.css({'left':L,'top':t+10,'opacity':0}).animate({'opacity':1,'top':t},200,function(){
							obj.data('loaded',true);
							$('.Fuzzy-search-body',obj).scrollBar({
								scrollDraggerWidth:1,
								scrollDraggerMarginLeft:5,
								scrollDraggerMarginRight:5,
								scrollDraggerMarginTop:5,
								scrollDraggerMarginBottom:5,
								scrollBarWidth:3,
								scrollMaxHeight:239,
								animateSpeed:200,
								mouseWheelSpeed:24
							});
						});
					},
					clickOnInput:function(e){
						e.stopPropagation();
						if($('#'+id+options.searchListClassName).length<=0){
							$('body').append('<div class="'+options.searchListClassName+'" id="'+id+options.searchListClassName+'"><div class="Fuzzy-search-body"><ul></ul></div><div class="Fuzzy-search-page"><a href="javascript:;" class="prev-page">上一页</a><span>共<em class="Fuzzy-search-total-number">-</em>条</span><a href="javascript:;" class="prev-page">下一页</a></div></div>');
							obj=$('#'+id+options.searchListClassName);
							obj.click(function(e){
								e.stopPropagation();
							});
							S.ajaxSearchData();
						};	
					},
					keyupOnInput:function(e){
						var $target=$(e.target),
							val=$target.val();
						if(val!='key'){
							key=val;
							S.ajaxSearchData();
						};	
					},
					ajaxSearchData:function(){
						$.ajax({
							url:options.url,
							data:{'search':key},
							type:"post",
							dataType:"json",
							beforeSend:function(){
								
							},
							success:function(data){
								
							},
							error: function(){
								$('.Fuzzy-search-total-number',obj).text(1345);
								$('.Fuzzy-search-body ul',obj).html('<li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li><span>sada</span>sdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdas<span>das</span>dasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li><li>sadasdasdasdasdas</li>');
								if(typeof(obj.data('loaded'))=='undefined'){
									S.addSearchPos();
								};
								$('li',obj).unbind('click').bind('click',S.selectQuickSearch);
							}	
						});	
					},
					selectQuickSearch:function(e){
						var $target=$(e.target),
							text=$target.text();
						$(self).val(text);	
						S.removeSearchList();
					},
					removeSearchList:function(){
						obj.stop().animate({'opacity':0,'margin-top':10},200,function(){
							obj.removeData('loaded');
							obj.remove();		
						});
					}
				};
				S.init();
			});
			return this;
		},
		Bvalidate:function(options){//表单验证
			var defaults = {
				noEmptyReg:/^\S+$/,  //非空
				acsiiReg:/^[\x00-\xFF]+$/,//仅ACSII字符
				numberReg:/^([+-]?)\d*\.?\d+$/,  //纯数字，不能包含任何非数字
				integerReg:/^-?[1-9]\d*$/,  //正负整数
				negativeIntReg:/^-[1-9]\d*$/,  //负整数
				positiveIntReg:/^[0-9]\d*$/,  //正整数
				floatReg:/^-?(([1-9]\d+|\d)(\.\d{1,})?)$/,  //正负浮点数
				negativeFloatReg:/^-(([1-9]\d+|\d)(\.\d{1,})?)$/,  //负浮点数
				positiveFloatReg:/^([1-9]\d+|\d)(\.\d{1,})?$/,  //正浮点数
				alphabetReg:/^[A-Za-z]+$/,//大小写字母
				LETTERReg:/^[A-Z]+$/,//大写字母
				letterReg:/^[a-z]+$/,//小写字母
				chineseReg:/^[\u4e00-\u9fa5]+$/,//中文
				colorReg:/^#[a-fA-F0-9]{6}$/,//16进制色值
				dateReg:/^\d{4}(\-|\/|.)\d{1,2}\1\d{1,2}$/,//日期
				usernameReg:/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/,//用户名
				passwordReg:/^[A-Za-z0-9_-]{6,18}$/,//密码
				trueNameReg:/^[A-Za-z0-9\u4e00-\u9fa5]+$/,//真实姓名
				tellphoneReg:/^1[3|4|5|8][0-9]\d{8}$/,//手机号码
				phoneNumberReg:/\d{3}-\d{8}|\d{4}-\d{7}/,//包括验证国内区号
				emailReg:/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/,//邮箱
				qqReg:/^[1-9]*[1-9][0-9]*$/,//QQ
				IDcardReg_a:/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/,//验证身份证15位
				IDcardReg_b:/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})([0-9xX])$/,//验证身份证18位
				IPReg:/((?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d))/,//IP地址
				postCodeReg:/^[1-9][0-9]{5}$/,//邮政编码
				imgReg:/(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/,//判断图片
				fileReg:/(.*)\.(rar|zip|7zip|tgz)$/,//判断压缩文件
				siteReg:/[a-zA-z]+:\/\/[^\s]+/,//网址,
				ftpReg:/ftp\:\/\/[^:]*:@([^\/]*)/, //FTP地址
				passportReg:/^[0-9]{9}$/,//验证护照号码
				ccvReg:/^[0-9]{3}$/,//验证CCV
				creditCardReg:/^(4\\d{12}(?:\\d{3})?)$/,//验证信用卡
				creditCardUSAReg:/^[3-6]\d{14,15}$/,//验证美国信用卡
				postCodeUSAReg:/^\d{5}$|^\d{9}$/,//验证美国邮政编码
				area:{ 11: "北京", 12: "天津", 13: "河北", 14: "山西",15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海",32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西",37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东",45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州",53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海",64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门",91: "国外"}
			};
			var options  = $.extend(true,defaults,options);	
			var self=this,
				value=$(self).val(),
				l=value.length,
				need=$(self).attr('valNeedCache'),
				type=$(self).attr('valtype');
			var S={
				init:function(){
					switch(type){
						case  'required'        : return this.regTest(options.noEmptyReg);break;//非空
						case  'ACSII'           : return this.needTest(options.acsiiReg);break;//仅ACSII字符
						case  'number'          : return this.needTest(options.numberReg);break;//纯数字，不能包含任何非数字
						case  'integer'         : return this.needTest(options.integerReg);break;//正负整数
						case  'negativeInteger' : return this.needTest(options.negativeIntReg);break;//负整数
						case  'positiveInteger' : return this.needTest(options.positiveIntReg);break;//正整数
						case  'float'           : return this.needTest(options.floatReg);break;//正负浮点数
						case  'negativeFloat'   : return this.needTest(options.negativeFloatReg);break;//负浮点数
						case  'positiveFloat'   : return this.needTest(options.positiveFloatReg);break;//正浮点数
						case  'alphabet'        : return this.needTest(options.alphabetReg);break;//大小写字母
						case  'LETTER'          : return this.needTest(options.LETTERReg);break;//大写字母
						case  'letter'          : return this.needTest(options.letterReg);break;//小写字母
						case  'chinese'         : return this.needTest(options.chineseReg);break;//中文
						case  'color'           : return this.needTest(options.colorReg);break;//16进制色值
						case  'date'            : return this.needTest(options.dateReg);break;//日期
						case  'username'        : return this.needTest(options.usernameReg);break;//用户名
						case  'password'        : return this.needTest(options.passwordReg);break;//密码
						case  'trueName'        : return this.needTest(options.trueNameReg);break;//真实姓名
						case  'tellphone'       : return this.needTest(options.tellphoneReg);break;//手机号码
						case  'phoneNumber'     : return this.needTest(options.phoneNumberReg);break;//包括验证国内区号,国际区号,分机号
						case  'email'           : return this.needTest(options.emailReg);break;//邮箱
						case  'QQ'              : return this.needTest(options.qqReg);break;//QQ
						case  'IDcard'          : return this.checkIDCard(options.IDcardReg_a,options.IDcardReg_b);break;//身份证
						case  'IP'              : return this.needTest(options.IPReg);break;//IP地址
						case  'postCode'        : return this.needTest(options.postCodeReg);break;//邮政编码
						case  'img'             : return this.needTest(options.imgReg);break;//判断图片
						case  'file'            : return this.needTest(options.fileReg);break;//判断压缩文件
						case  'site'            : return this.needTest(options.siteReg);break;//网址
						case  'ftp'             : return this.needTest(options.ftpReg);break;//ftp地址
						case  'passport'        : return this.needTest(options.passportReg);break;//护照号码
						case  'ccv'             : return this.needTest(options.ccvReg);break;//验证CCV
						case  'creditCard'      : return this.needTest(options.creditCardReg);break;//验证信用卡
						case  'usaCreditCard'   : return this.needTest(options.creditCardUSAReg);break;//验证美国信用卡
						case  'usaPostCard'     : return this.needTest(options.postCodeUSAReg);break;//验证美国邮政编码
						default                 : break;	
					};	
				},
				needTest:function(reg){
					if(typeof(need)=='undefined'){
						return S.regTest(reg);
					}else{
						if(!options.noEmptyReg.test(value)){
							return true; 	
						}else{
							return S.regTest(reg);	
						};	
					};	
				},
				regTest:function(reg){
					if(reg.test(value)){
						$(self).removeClass('error').addClass('true');	
						return true;
					}else{
						$(self).removeClass('true').addClass('error');
						return false;
					};
				},
				checkIDCard:function(_a,_b){//验证中国居民身份证
					 var re;
					 if (l!=15&&l!=18){
						 $(self).removeClass('true').addClass('error').siblings('p').attr('class','error').html('<em class="plugin"></em>身份证号码位数不对').fadeIn(200);
						 return false;
					 }else if (l==15){
						 re = new RegExp(_a);
					 }else{
						 re = new RegExp(_b);
					 };
					 var idcard_array = new Array();
					 idcard_array = value.split("");
					 if(options.area[parseInt(value.substr(0, 2))] == null) { //地区检验
						 $(self).removeClass('true').addClass('error').siblings('p').attr('class','error').html('<em class="plugin"></em>身份证地区非法').fadeIn(200);
						 return false;
					 };
					 var a=value.match(re);
					 if (a!=null){//出生日期正确性检验
						 if(l==15){
							 var DD=new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);
							 var flag=DD.getYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[5];
						 }else if (l==18) {
							 var DD=new Date(a[3] + "/" + a[4] + "/" + a[5]);
							 var flag=DD.getFullYear() == a[3] && (DD.getMonth() + 1) == a[4] && DD.getDate() == a[5];
						 };
						 if(!flag){
							 $(self).removeClass('true').addClass('error').siblings('p').attr('class','error').html('<em class="plugin"></em>身份证出生日期不对').fadeIn(200);
							 return false; 
						 };
						 if(l==18){
							 S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7+ (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9+ (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10+ (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5+ (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8+ (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4+ (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2+ parseInt(idcard_array[7]) * 1+ parseInt(idcard_array[8]) * 6+ parseInt(idcard_array[9]) * 3;
							 Y = S % 11;
							 M = "F";
							 JYM = "10X98765432";
							 M = JYM.substr(Y, 1); //判断校验位
							 if (M == idcard_array[17]) {
								 $(self).removeClass('error').addClass('true').siblings('p').attr('class','true').html('<em class="plugin"></em>').fadeIn(200);	
								 return true;
							 }else{
								 $(self).removeClass('true').addClass('error').siblings('p').attr('class','error').html('<em class="plugin"></em>身份证号码校验错误').fadeIn(200);
								 return false;
							 };
						 };
					 }else{
						 $(self).addClass('error').addClass('true').siblings('p').attr('class','error').html('<em class="plugin"></em>身份证含有非法字符').fadeIn(200);
						 return false;
					 };
				}	
			};	
			return S.init();
		},
		BstreamWater:function(options){
			var defaults = {
				direction:'x',//方向
				type:2,
				singleMargin:10,//间隔距离
				speed:400,//速度
				deleyTime:100,//延迟时间
				callback:function(){}
			};
			var options  = $.extend(true,defaults,options);	
			this.each(function(){
				var self=this,
					width=$(self).width(),
					height=$(self).height(),
					numberData;
				var S={
					init:function(){
						$.ajax({
							url:options.url,
							type:"post",
							dataType:"json",
							beforeSend:function(){
								$(self).css('background','url(images/loading.gif) no-repeat center center #f9f9f9');
							},
							success:function(data){
								
							},
							error: function(){
								$(self).css('background','none');
								numberData={
									totalNumber:9800,
									singleNumber:[5800,500,200,400,250,850,600,300,400,500]	
								};
								switch(options.direction){
									case 'x': S.randomHeight();break;	
									case 'y': S.randomWidth();break;	
									default : break;	
								};
							}	
						});	
					},
					showPercentType:function(n,percent){
						switch(options.type){
							case  1 : return (percent*100).toFixed(2)+'%';break;
							case  2 : return numberData.singleNumber[n]+'吨';break;
							default : break;
						};	
					},
					randomHeight:function(){
						var str='',left=options.singleMargin,arr=[],length=numberData.singleNumber.length,w=(width-(length+1)*options.singleMargin)/length;
						for(var i=0;i<length;i++){
							var percent=Math.round((numberData.singleNumber[i]/numberData.totalNumber)*10000)/10000,
								h=percent*height;
							str+='<div class="J-streamWater-box" style="left:'+left+'px;width:'+w+'px;height:2px;bottom:'+height+'px;background:'+S.randomColor()+';"><span style="top:-30px;width:60px; text-align:center; left:50%; margin-left:-30px;">'+S.showPercentType(i,percent)+'</span></div>';
							left+=w+options.singleMargin;
							arr.push(h);
						};
						$(self).html(str);
						var _a=[],i=0;
						setInterval(function(){
							if(i<arr.length){
								_a.push(i);
								$('.J-streamWater-box',self).eq(_a[i]).animate({'bottom':0},options.speed,function(){
									var _this=$(this),
										index=_this.index();
									$(this).animate({'height':arr[index]},400,function(){	
										$(this).find('span').fadeIn();
										options.callback();	
									});		
								});
								i++;
							};
						},options.deleyTime);
					},
					randomWidth:function(){
						var str='',top=10,arr=[],length=numberData.singleNumber.length,h=(height-(length+1)*options.singleMargin)/length;
						for(var i=0;i<numberData.singleNumber.length;i++){
							var percent=(numberData.singleNumber[i]/numberData.totalNumber),
								w=percent*width;
							str+='<div class="J-streamWater-box" style="top:'+top+'px;left:'+width+'px;width:2px;height:'+h+'px;background:'+S.randomColor()+';"><span style="right:-50px;line-height:'+h+'px">'+S.showPercentType(i,percent)+'</span></div>';
							top+=h+options.singleMargin;
							arr.push(w);
						};
						$(self).html(str);
						var _a=[],i=0;
						setInterval(function(){
							if(i<arr.length){
								_a.push(i);
								$('.J-streamWater-box',self).eq(_a[i]).animate({'left':0},options.speed,function(){
									var _this=$(this),
										index=_this.index();
									$(this).animate({'width':arr[index]},400,function(){	
										$(this).find('span').fadeIn();
										options.callback();	
									});		
								});
								i++;
							};
						},options.deleyTime);
					},
					randomColor:function(){//随机获取颜色
						var arrHex=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"],
							strHex="#",
							index;
						for(var i=0;i<6;i++){
							index=Math.round(Math.random()*15);
							strHex+=arrHex[index];
						};
						return strHex;
					}
				};
				S.init();
			});
			return this;	
		}
	});	
})(jQuery);