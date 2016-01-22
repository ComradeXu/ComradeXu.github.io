$(function(){
	$('.add_cart').click(function(){
		$('.add_car').show(300).delay(2000).hide(300);
	});
	$('.xieyi label').click(function(){
		$('.xieyi label').toggleClass('checked');
	})	
	$('.pay_now').click(function(){
		if($("#agument").attr('checked')){
			$('.pay_suc').show(300).delay(1000).hide(300);
			}else{
			$('.pay_no_suc').show(300).delay(1000).hide(300);
			}
	});
	$('.get_code').click(function(){
		$('.code_wait').show();
	});
	$('.cancel_order').click(function(){
		$('.cancel_box').show();
	});
	var CancelBtn = $('.cancel_box .cancel_btn a')
	CancelBtn.click(function(){
		$('.cancel_box').hide();
	});
	$('.hot_list .hot_div:odd').css("padding-left","2%")
});
$(function(){
		$('.footerUl li').click(function(){
			$(this).addClass('cur');
			$(this).siblings().removeClass('cur');	
		});	
});