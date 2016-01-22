//标签切换
function setTab(name,cursel,n,currentClass,otherClass){for(var i=1;i<=n;i++){var menu=document.getElementById(name+i);var con=document.getElementById("con_"+name+"_"+i);menu.className=i==cursel?currentClass:otherClass;if(con){con.style.display=i==cursel?"block":"none"}}}
//鼠标滑过弹出层
function navmian(obj,sType){var oDiv=document.getElementById(obj);if(sType=='show'){oDiv.style.display='block';}if(sType=='hide'){oDiv.style.display='none';}}
//判断屏幕分辨率 设置弹窗高度
window.onload=function(){
		if(window.screen.width<=1366)  //获取屏幕的的宽度
		{
		  $('.user_info').css({"height":"550px","overflow":"auto"})
		}
		else{
			$('.user_info').css({"height":"auto","max-height":"850px","overflow":"auto"})
		}
		}
$(function(){
	$('.user_list tr td:first-child img').css({"width":"60px","height":"60px","border-radius":"50%"});
	$('.user_table tr td:first-child').css({"color":"#fff","border-bottom":"1px solid #fff","background":"#f75b63","width":"30%"});
	$('.user_table tr:last-child td').css({"border-bottom":"1px solid #f75b63"});
	$('.top_line dl:odd').css({"margin-left":"56px"});
});
$(function(){
	$('.blacklist').mouseover(function(){
		var blacklist = $(this).next('.add_blacklist')
			blacklist.show();
	});
	$('.blacklist').mouseout(function(){
		var blacklist = $(this).next('.add_blacklist')
			blacklist.hide();
	});
	$('.add_blacklist').mouseover(function(){
		$(this).show();
	});
	$('.add_blacklist').mouseout(function(){
		$(this).hide();
	});
	$('.add_blacklist').click(function(){
		$(this).hide();
	});
});
function closee(){
	$(".tan_box_z").hide();
	$(".tan_box_z1").show();
	$(".tan_box").hide();
	for(var i=0;i<40;i++){
		$("#tanbox"+i).hide();
	}
};

function TanB(id){
	$(".tan_box_z").show();
	$(".tan_box_z1").show();
	$(".tan_box").show();
	$("#tanbox"+id).show();
}
$(function(){
	$('.rev_clas').click(function(){
		var $rThis = $(this).parent('.edit_user');
		var $rThisP = $(this).parent('.edit_user').parent('.rev_sth').next('.use_tab');
		$rThis.next('.check_btn').show();
		$rThis.hide();
		$rThisP.find('.chkall').show();	
		$rThisP.find('.black').hide();
		$rThisP.find('.checkbox').show();
	});	
	$('.send_clas').click(function(){
		var $rThis = $(this).parent('.edit_user');
		var $rThisP = $(this).parent('.edit_user').parent('.rev_sth').next('.use_tab');
		$rThis.nextAll('.check_btn1').show();
		$rThis.hide();
		$rThisP.find('.chkall').show();
		$rThisP.find('.black').hide();
		$rThisP.find('.checkbox').show();
	});
	$('.check_esc').click(function(){
		var $cThis = $(this).parent('.check_btn');
		var $cThis1 = $(this).parent('.check_btn1');
		var $cThisP = $(this).parent('.check_btn1').parent('.rev_sth').next('.use_tab');
		$cThis.prevAll('.edit_user').show();
		$cThis1.prevAll('.edit_user').show();
		$cThis.hide();
		$cThis1.hide();
		$cThisP.find('.chkall').hide();	
		$cThisP.find('.black').show();
		$cThisP.find('.checkbox').hide();	
	});
});
$(function(){
	$('.check_next').click(function(){
		var $inputBtn = $(this).parent('.check_btn').parent('.rev_sth').next('.use_tab');
		if ($inputBtn.find("input[type='checkbox']").is(":checked")){
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#none_user").hide();
			$("#tanbox5").show();	
		}else{
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#tanbox5").hide();
			$("#none_user").show();
			}
	});	
});

$(function(){
//全选
$("#chkall").click(function() {
    $("input[name='userclass']").prop("checked", this.checked);
  });
  $("input[name='userclass']").click(function() {
    var $usercla = $("input[name='userclass']");
    $("#chkall").prop("checked" , $usercla.length == $usercla.filter(":checked").length ? true :false);
});
//全选普通
$("#chkall_common").click(function() {
    $("input[name='userclass_common']").prop("checked", this.checked);
  });
  $("input[name='userclass_common']").click(function() {
    var $usercla = $("input[name='userclass_common']");
    $("#chkall_common").prop("checked" , $usercla.length == $usercla.filter(":checked").length ? true :false);
});
//全选vip
$("#chkall_vip").click(function() {
    $("input[name='userclass_vip']").prop("checked", this.checked);
  });
  $("input[name='userclass_vip']").click(function() {
    var $usercla = $("input[name='userclass_vip']");
    $("#chkall_vip").prop("checked" , $usercla.length == $usercla.filter(":checked").length ? true :false);
});
});
$(function(){
	$('.two_class a').click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover');	
	});	
	$('.class_esc,.user_tel_esc').click(function(){
		$('.edit_user').show();
		$('.check_btn').hide();
		$('.check_btn1').hide();
		$('.chkall').hide();	
		$('.black').show();
		$('.checkbox').hide();	
	});
	$('.user_tel_next').click(function(){
		var reg = /^((13|15|18)\d{9}\ )*(13|15|18)\d{9}$/;
		if($('.user_tel_text').val()=="请输入手机号，以空格区分" && $("input[type='checkbox']:checked").size()==0){
			$('#tanbox6').hide();
			$('#tanbox15').show();
		}else if($("input[type='checkbox']:checked").size()==0){
			if(!reg.test($('#receiveMobileNo').val())){
				$('#receiveMobileNo').addClass('user_tel_text1');
				$('#receiveMobileNo').val("手机号码格式不正确！请重新输入");
				$('#receiveMobileNo').click(function(){
				if($('#receiveMobileNo').val()=="手机号码格式不正确！请重新输入"){
					$('#receiveMobileNo').val('');	
					}
				})
			}else{
				$('#tanbox6').hide();
				$('#tanbox7').show();
			}
		}else if($("input[type='checkbox']:checked").size()!==0){
			if($('#receiveMobileNo').val()=="请输入手机号，以空格区分"){
				$('#tanbox6').hide();
				$('#tanbox7').show();
			}else if(!reg.test($('#receiveMobileNo').val())){
				$('#receiveMobileNo').addClass('user_tel_text1');
				$('#receiveMobileNo').val("手机号码格式不正确！请重新输入");
				$('#receiveMobileNo').click(function(){
				if($('#receiveMobileNo').val()=="手机号码格式不正确！请重新输入"){
					$('#receiveMobileNo').val('');	
					}
				})
			}else{
				$('#tanbox6').hide();
				$('#tanbox7').show();
			}
		}else{
				$('#tanbox6').hide();
				$('#tanbox7').show();
			}
	});
	$('.user_con').click(function(){
		$('#tanbox6').show();	
		$('#tanbox15').hide();
	});
	$('.user_tel_reback').click(function(){
		$('#tanbox7').hide();	
	});
	$(".user_code_num input").on("keyup", function () {
        if($(this).val()){
            $(this).parent().children("input").removeClass('bred');
        }
    });
	$('.user_send').click(function(){
		var useNum=$('.use_num').val();
		var useTim=$('.use_tim').val();
		if(useNum==''|| useNum == null){
			$('.use_num').addClass('bred');
			return false;
		}
		if(useTim==''|| useTim == null){
			$('.use_tim').addClass('bred');
			return false;
		}else{
		$('#tanbox5').hide();
		$('#tanbox7').hide();
		$('#tanbox8').show(1).delay(2000).hide(1);	
		$(".tan_box_z").delay(2000).hide(1);
		$(".tan_box_z1").delay(2000).hide(1);
		$(".tan_box").delay(2000).hide(1);	
		$('.edit_user').delay(2000).show(1);
		$('.check_btn').delay(2000).hide(1);
		$('.check_btn1').delay(2000).hide(1);
		$('.chkall').delay(2000).hide(1);	
		$('.black').delay(2000).show(1);
		$('.checkbox').delay(2000).hide(1);
		}
	});
});
$(function(){
	$('.pro_do_more').mouseover(function(){
		var domore = $(this).next('.pro_doo')
		domore.show();
	});
	$('.pro_do_more').mouseout(function(){
		var domore = $(this).next('.pro_doo')
		domore.hide();
	});
	$('.pro_doo').click(function(){
		$(this).hide();
	});
	$('.pro_doo').mouseover(function(){
		$(this).show();
	});
	$('.pro_doo').mouseout(function(){
		$(this).hide();
	});
});

jQuery.divselect = function(divselectid,inputselectid) { 
	var inputselect = $(inputselectid); 
	$(divselectid+" cite").click(function(){ 
		var ul = $(divselectid+" ul"); 
		if(ul.css("display")=="none"){ 
			ul.slideDown("fast"); 
		}else{ 
			ul.slideUp("fast"); 
		}
		return false;
	}); 
	$('.tan_zdy1').click(function(){ 
		var ul = $('.divselect1'+" ul"); 
			ul.slideUp("fast"); 
	}); 
	$(divselectid+" ul li a").click(function(){ 
		var txt = $(this).text(); 
		$(divselectid+" cite").html(txt); 
		var value = $(this).attr("selectid"); 
		inputselect.val(value); 
		$(divselectid+" ul").hide(); 
	}); 
	$(document).click(function(){
        $(divselectid+" ul").hide();
    });
}; 
$(function(){
	$('.tab_text').click(function(){
		$('#tanbox10').hide();
	});
	$('.tan_min ul li').click(function(){
		if($(this).hasClass('cur')){
			$(this).removeClass('cur');
		}else{
			$(this).addClass('cur');
			}
	});
	$('.tan_zdy').click(function(){
		$(this).removeClass('cur');
		$('#tanbox30').hide();
	});
	$('.tan_zdy1').click(function(){
		$('#tanbox10').hide();
	})
})
function closee1(){
	$('#tanbox30').hide();
	$('#tanbox10').show();
};
function closee2(){
	$('#tanbox32').hide();
	$('#tanbox30').show();
};
function closee3(){
	$('#tanbox31').hide();
	$('#tanbox10').show();
};
function ismaxlength(obj){
	var mlength=obj.getAttribute? parseInt(obj.getAttribute("maxlength")) : ""
	if (obj.getAttribute && obj.value.length>mlength)
	obj.value=obj.value.substring(0,mlength)
}


$(function(){
	$('.del_btn').click(function(){
		var $rThis = $(this).parent('.del_more');
		var $rThisP = $rThis.next('.user_list');
		$(this).next('.del_btn_next').show();
		$(this).hide();
		$rThisP.find('.chkal').show();	
		$rThisP.find('.pro_do').hide();
		$rThisP.find('.checkbox').show();
	});	
	$('.del_esc').click(function(){
		var $cThis = $(this).parent('.del_btn_next');
		var $cThisP = $cThis.parent('.del_more').next('.user_list');
		$cThis.hide();
		$cThis.prev('.del_btn').show();
		$cThisP.find('.chkal').hide();	
		$cThisP.find('.pro_do').show();
		$cThisP.find('.checkbox').hide();
	});
	$('.del_next').click(function(){
		if($("input[name='usersel']:checked").size()==0){
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#tanbox34").show();
		}else{
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#tanbox33").show();
		}	
	});
	//全选
	$("#chkal").click(function() {
		$("input[name='usersel']").prop("checked", this.checked);
	  });
	  $("input[name='usersel']").click(function() {
		var $usercla = $("input[name='usersel']");
		$("#chkal").prop("checked" , $usercla.length == $usercla.filter(":checked").length ? true :false);
	});
});

