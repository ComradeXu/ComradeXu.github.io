$(function(){
	$('.icon-menu').click(function(){
		alert('d');
		if($('.menu-ul').css('display')=='none'){
			$('.menu-ul').slideDown();
		}else{
			$('.menu-ul').slideUp();
		}
	});
	$('.menu-ul ul li a').click(function(){
		$(this).parents('.menu-ul').slideUp('fast')
	})
})