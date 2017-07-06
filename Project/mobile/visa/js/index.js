$(function(){
	$('.icon-menu').click(function(){
		if($('.menu-ul').css('display')=='none'){
			$('.menu-ul').show();
		}else{
			$('.menu-ul').hide();
		}
	});
	$('.menu-ul ul li a').click(function(){
		$(this).parents('.menu-ul').slideUp('fast')
	});
})