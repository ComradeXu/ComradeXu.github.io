$(function(){
	$('.wrap-ul-con:not(:first-child)').hide();
	$('.wrap-ul-con1:not(:nth-child(2))').hide();
	$('.wrap-ul li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('.wrap').find('.wrap-ul-con').eq($(this).index()).show().siblings().hide();
	});
	$('.wrap-ul1 li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('.wrap').find('.wrap-ul-con1').eq($(this).index()).show().siblings().hide();
	});
	$('.wrap3 .wrap-left').hover(function(){
		$(this).css('z-index',3);
		$(this).removeClass('wrap-left-out').addClass('wrap-left-hover');
		$(this).next('.wrap-right').removeClass('wrap-left-hover1').addClass('wrap-left-out1');
	},function(){
		$(this).css('z-index',1);
		$(this).removeClass('wrap-left-hover').addClass('wrap-left-out');
		$(this).next('.wrap-right').removeClass('wrap-left-out1').addClass('wrap-left-hover1');
	});
	var ban = $(".ban-mid").offset().top;
	var t1 = $("#wrap1").offset().top;
	var t2 = $("#wrap2").offset().top;
	var t22 = t2+300;
	var t3 = $("#wrap3").offset().top;
	var t4 = $("#wrap4").offset().top;
	var t5 = $("#wrap5").offset().top;
	var t6 = $("#wrap6").offset().top;
	var t7 = $("#wrap7").offset().top;
	var t8 = $("#wrap9").offset().top;
	var tnav = $('.nav').offset().top;
	var navHeight = $('.nav').height();
	var t0;
	$(".nav li").click(function(){
		$(".nav").addClass("nav-fixed");
		$(".nav li").removeClass("cur");
		$(this).addClass("cur");
	})
	$(window).scroll(function(){
		t0 = $(document).scrollTop();
		if(t0>=ban){
			$('.wrap-b-r').delay(800).addClass('wrapp');
			$('.wrap-l-t').addClass('wrapp1');
			$('.wrap-b-r').fadeIn(500);
			$('.wrap-l-t').fadeIn(500);
			$('.wrap-l-b').delay(500).addClass('wrapp2').fadeIn(300);
		}
		if(t0>=tnav){
			$('.nav').addClass('nav-fixed');
			$('.nav ul li').eq(0).addClass('cur');
			if(t0>=t1){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(0).addClass('cur');
			}
			if(t0>=(t2-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(1).addClass('cur');
			}
			if(t0>=t22){
				$('.wrap3 .wrap-left').addClass('wrap-leftt');
				$('.wrap3 .wrap-right').addClass('wrap-rightt');
				$('.wrap3 .wrap-left').css('opacity',1);
				$('.wrap3 .wrap-right').css('opacity',1);
			}
			if(t0>=(t3-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(2).addClass('cur');
			} 
			if(t0>=(t4-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(4).addClass('cur');
			} 
			if(t0>=(t5-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(5).addClass('cur');
			} 
			if(t0>=(t6-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(6).addClass('cur');
			} 
			if(t0>=(t7-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(7).addClass('cur');
			} 
			if(t0>=(t8-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(8).addClass('cur');
			} 
		}
		if(t0<tnav){
			$(".nav").removeClass("nav-fixed");
			$('.nav ul li').eq(0).removeClass('cur');
		}
	});
	
});
$(function(){
	$('.wrap4 table tr,.wrap6 table tr').hover(function(){
		$(this).addClass('tr-on');
		$(this).siblings().removeClass('tr-on');
	})
});
