$(function(){
	$('.nav ul li').mouseover(function(){
		$(this).addClass('cur');
		$(this).siblings().removeClass('cur');
	})
})