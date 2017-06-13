$(function(){
	$('.wrap-ul-con:not(:first-child)').hide();
	$('.wrap-ul-con1:not(:first-child)').hide();
	$('.wrap-ul li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('.wrap').find('.wrap-ul-con').eq($(this).index()).show().siblings().hide();
	});
	$('.wrap-ul1 li').hover(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$(this).parents('.wrap-ul-con').find('.wrap-ul-con1').eq($(this).index()).show().siblings().hide();
	});
	$('.wrap-school ul li').hover(function(){
		$(this).find('.wrap-img2').fadeOut();
		$(this).find('.wrap-img3').fadeIn();
	},function(){
		$(this).find('.wrap-img2').fadeIn();
		$(this).find('.wrap-img3').fadeOut();
	});
	var t1 = $("#wrap1").offset().top;
	var t2 = $("#wrap2").offset().top;
	var t3 = $("#wrap3").offset().top;
	var t4 = $("#wrap4").offset().top;
	var t5 = $("#wrap5").offset().top;
	var t6 = $("#wrap6").offset().top;
	var t7 = $("#wrap7").offset().top;
	var t8 = $("#wrap8").offset().top;
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
			if(t0>=(t3-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(2).addClass('cur');
			} 
			if(t0>=(t4-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(3).addClass('cur');
			} 
			if(t0>=(t5-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(4).addClass('cur');
			} 
			if(t0>=(t6-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(5).addClass('cur');
			} 
			if(t0>=(t7-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(6).addClass('cur');
			} 
			if(t0>=(t8-navHeight*2)){
				$('.nav ul li').removeClass('cur');
				$('.nav ul li').eq(7).addClass('cur');
			} 
		}
		if(t0<tnav){
			$(".nav").removeClass("nav-fixed");
			$('.nav ul li').eq(0).removeClass('cur');
		}
	})
});

