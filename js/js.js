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
			$('.user_info').css({"height":"auto"})
		}
		}
$(function(){
	$('.user_list tr td:first-child img').css({"width":"60px","height":"60px"});
	$('.user_table tr td:first-child').css({"color":"#fff","border-bottom":"1px solid #fff","background":"#fb787e","width":"30%"});
	$('.user_table tr:last-child td:first-child').css({"border-bottom":"1px solid #fb787e"});
	$('.top_line dl:odd').css({"margin-left":"56px"});
});
$(function(){
	$('.blacklist').click(function(){
		var blacklist = $(this).next('.add_blacklist')
		if(blacklist.is(':hidden')){
			blacklist.show();
			}
		else{
			blacklist.hide()
			}
		});
	$('.add_blacklist').click(function(){
		$(this).hide();
	});
});
function closee(){
	$(".tan_box_z").hide();
	$(".tan_box_z1").show();
	$(".tan_box").hide();
	for(var i=0;i<18;i++){
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
		$('.check_btn').show();
		$(this).parent('.edit_user').hide();
		$('.chkall').show();	
		$('.black').hide();
		$('.checkbox').show();
	});	
	$('.check_esc').click(function(){
		$('.edit_user').show();
		$(this).parent('.check_btn').hide();
		$('.chkall').hide();	
		$('.black').show();
		$('.checkbox').hide();	
	});
});
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
$(function(){
	$('.two_class a').click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover');	
	});	
	$('.class_esc,.user_tel_esc').click(function(){
		$('.edit_user').show();
		$('.check_btn').hide();
		$('.chkall').hide();	
		$('.black').show();
		$('.checkbox').hide();	
	});
	$('.user_tel_next').click(function(){
		$('#tanbox6').hide();	
	});
	$('.user_tel_reback').click(function(){
		$('#tanbox7').hide();	
	});
	$('.user_send').click(function(){
		$('#tanbox7').hide();
		$('#tanbox8').show(1).delay(2000).hide(1);	
		$(".tan_box_z").delay(2000).hide(1);
		$(".tan_box_z1").delay(2000).hide(1);
		$(".tan_box").delay(2000).hide(1);	
		$('.edit_user').delay(2000).show(1);
		$('.check_btn').delay(2000).hide(1);
		$('.chkall').delay(2000).hide(1);	
		$('.black').delay(2000).show(1);
		$('.checkbox').delay(2000).hide(1);
	});
});
$(function(){
	$('.pro_do_more').click(function(){
		var domore = $(this).next('.pro_doo')
		if(domore.is(':hidden')){
			domore.show();
			}
		else{
			domore.hide()
			}
		});
	$('.pro_doo').click(function(){
		$(this).hide();
	});
});

