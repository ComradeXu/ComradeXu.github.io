$(function(){
		$('.footerUl li').click(function(){
			$(this).addClass('cur');
			$(this).siblings().removeClass('cur');	
		});	
});
$(function(){
	$('.share_btn').click(function(){
		$('.wx_share').show();
	});	
	$('.wx_share').click(function(){
		$(this).hide();
	});
})