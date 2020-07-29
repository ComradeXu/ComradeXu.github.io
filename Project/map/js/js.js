$(function(){
	$('.drop-list .item').click(function(){
		var txt = $.trim($(this).text());
		if($(this).hasClass('clicked')){
			return false;
		}else{
			$(this).parents('.li').find('span').text(txt);
			$(this).siblings().removeClass('clicked');
			$(this).addClass('clicked');
			$(this).parents('.drop-list').hide();
			$(this).parents('.li').find('i').removeClass('drop-open');
		}
	});
	$('.aside .li').mouseenter(function(){
		$(this).find('.drop-list').show();
		$(this).find('i').addClass('drop-open');
	});
	$('.aside .li').mouseleave(function(){
		$(this).find('.drop-list').hide();
		$(this).find('i').removeClass('drop-open');
	});
	$('.li-btn').click(function(){
		$('.aside .item').removeClass('clicked');
		$('.drop-list li:first-child').addClass('clicked');
		$('.li').eq(0).find('span').text('租金');
		$('.li').eq(1).find('span').text('面积');
		$('.li').eq(2).find('span').text('房型');
		$('.li').eq(3).find('span').text('更多');
	});
	$('.r-hd2 li.s-price').click(function(){
		if($(this).hasClass('s-desc')&&$(this).hasClass('on')){
			$(this).removeClass('s-desc')
		}else{
			$(this).addClass('s-desc')
		}
	});
	$('.r-hd2 li.s-area').click(function(){
		if($(this).hasClass('s-desc')&&$(this).hasClass('on')){
			$(this).removeClass('s-desc')
		}else{
			$(this).addClass('s-desc')
		}
	});
	$('.r-hd2 li').click(function(){
		$(this).siblings().removeClass('on');
		$(this).addClass('on');

	});
	$('#mapResize').click(function(){
		if($('.ctrl').css('display')=='block'){
			$('.ctrl').hide();
			$('.detail').hide();
			$(this).addClass('close');
			$('.mod-map').css('margin-left','0');
		}else{
			$('.ctrl').show();
			$('.detail').show();
			$(this).removeClass('close');
			$('.mod-map').css('margin-left','460px');
		}
		
	});
	
	var winHeight;
	if(window.innerHeight){
		winHeight=window.innerHeight;
		}
	else if((document.body)&&(document.body.clientHeight)){
		winHeight=document.body.clientHeight;
		}
	var cont=$('.r-container').offset().top;
	$('.r-container').css({'height':winHeight-cont})
});

