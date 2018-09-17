$(function(){

    function checkxm(){
        var a = $("input[name='username']").val();
        if(!a){
            $("#xms").text('姓名不能为空');
            return false;
        }else{
            if(a.length>1&&a.length<10){

                if((/^[\u4E00-\u9FA5]+$/.test(a))){ 
                    $("#xms").text(' ');  
                    return true; 
                }else{
                    $("#xms").text('输入格式错误'); 
                    return false;  
                }          
            }else{
                $("#xms").text('输入格式错误'); 
                return false;               
            }
        }
    }
    function checksj(){
        var phone = $("input[name='tel']").val();
        if(!phone){
            $("#sjs").text('手机号码不能为空');
            return false; 
        }
        if(!(/^1[34578]\d{9}$/.test(phone))){ 
            $("#sjs").text('输入格式错误');
            return false; 
        }else{
            $("#sjs").text(' ');
            return true;
        }
    }
    function checkyzm(){
        var b = $('#ycy').val();
        var code = $("input[name='code']").val();
        if(!code){
            $("#yzms").text('验证码不能为空');
            return false;
        }
        $.ajax({
            url:b+"checkcode.html",
            type:"post",
            data:"code="+code,
            async: false,
            dataType:"json",
            success:function(msg){
                if(msg == "1"){
                    $("#yzms").text(' ');
                    $('#baomings').submit();
                    return true;
                }else{
                    $("#yzms").text('输入错误');
                    return false;  
                }
            }
        });
    }

	$('.test-list1 .test-btn a').click(function(){
		$('.test-btn').show();
		$('.test-list1').hide();
		$('.test-prev').hide();
		$(this).parents('.test-list1').next().addClass('cur');
	});
	$('.test-anws li').click(function(){
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.test-nextd').addClass('test-next');
	});
	$('.other-inp').focus(function(){
		$(this).parents('.test-other').prev('.test-anws').find('li').removeClass('cur');
		if($(this).val()==''){
			$('.test-nextd').removeClass('test-next');
		}
	});
	$(".other-inp").keyup("input propertychange",function(){
		if($(this).val()==''){
			$('.test-nextd').removeClass('test-next');
		}else{
			$('.test-nextd').addClass('test-next');
		}
	});
	var num=0;
	$(document).on('click','.test-next',function(){
		num++;
		if(num==7){
			$('.test-nextd').addClass('test-next');
			var xuewei=$('#xuewei').find('.cur').attr('subval');
			$('input[name="if_xuewei"]').val(xuewei);
        	//alert(xuewei);
			var xueli=$('#xueli').find('.cur').attr('subval');
			$('input[name="xueli"]').val(xueli);
        	//alert(xueli);
			var biyenianxian=$('#biyenianxian').find('.cur').attr('subval');
			$('input[name="biyenianxian"]').val(biyenianxian);
        	//alert(biyenianxian);
			var zhuanye=$('#zhuanye').find('.cur').attr('subval');
        	if(!zhuanye){
        		zhuanye=$('input[name="b-zhuanye"]').val();
        	}
        	$('input[name="zhuanye"]').val(zhuanye);
        	//alert(zhuanye);
        	var zhiye=$('#zhiye').find('.cur').attr('subval');
        	if(!zhiye){
        		zhiye=$('input[name="b-zhiye"]').val();
        	}
        	$('input[name="zhiye"]').val(zhiye);
        	//alert(zhiye);
        	var diqu=$('#diqu').find('.cur').attr('subval');
        	$('input[name="diqu"]').val(diqu);
        	//alert(diqu);

        	if(checkxm()&&checksj()){
        		checkyzm();
        	}
        	num--;
        	return true;
		}
		if(!$('.test-list').eq(num).find('li').hasClass('cur')){
			$('.test-nextd').removeClass('test-next');
		}
		if(!$('.test-list').eq(num).find(".other-inp").val()==''){
			$('.test-nextd').addClass('test-next');
		}
		if(num==6){
			$('.test-nextd').html('确认提交');
			$('.test-list').eq(6).addClass('cur').siblings().removeClass('cur');
			$('.test-nextd').addClass('test-next');
		}else{
			$('.test-list').eq(num).addClass('cur').siblings().removeClass('cur');
			$('.test-prev').show();
		}

        function footerPosition(){
        $("footer").removeClass("fixed-bottom");
            var contentHeight = document.body.scrollHeight,
                winHeight = window.innerHeight;
            if(!(contentHeight > winHeight)){
                $("footer").addClass("fixed-bottom");
            } else {
                $("footer").removeClass("fixed-bottom");
            }
        }
        footerPosition();
	})
	$(document).on('click','.test-next1',function(){
		num = 6;
	})
	$('.test-prev').click(function(){
		num--;
		if(num==-1){
			$('.test-list').removeClass('cur');
			$('.test-list1').show();
			$('.test-btn').hide();
		}else{
			$('.test-list').eq(num).addClass('cur').siblings().removeClass('cur');
			$('.test-nextd').html('下一题');
			$('.test-next').removeClass('test-next1');
		}
		if(num==0){
			$('.test-prev').hide();
		}
        if(num==6){
            $('.test-nextd').html('确认提交');
        }
        $('.test-nextd').addClass('test-next');
        function footerPosition(){
        $("footer").removeClass("fixed-bottom");
            var contentHeight = document.body.scrollHeight,
                winHeight = window.innerHeight;
            if(!(contentHeight > winHeight)){
                $("footer").addClass("fixed-bottom");
            } else {
                $("footer").removeClass("fixed-bottom");
            }
        }
        footerPosition();
	});
});