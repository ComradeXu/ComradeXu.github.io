$(function(){
		$('.footerUl li').click(function(){
			$(this).addClass('cur');
			$(this).siblings().removeClass('cur');	
		});	
});
