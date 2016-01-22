//标签切换
function setTab(name,cursel,n,currentClass,otherClass){for(var i=1;i<=n;i++){var menu=document.getElementById(name+i);var con=document.getElementById("con_"+name+"_"+i);menu.className=i==cursel?currentClass:otherClass;if(con){con.style.display=i==cursel?"block":"none"}}}
//鼠标滑过弹出层
function navmian(obj,sType){var oDiv=document.getElementById(obj);if(sType=='show'){oDiv.style.display='block';}if(sType=='hide'){oDiv.style.display='none';}}
$(function(){
	$(".shangjia_info table tr:even").css("background","#F9F9F9");
	$(".shj_info1 table tr").css("background","#ffffff");
	$(".table_color table tr td").css("color","#DA4341");
	$(".table_color table tr td:first-child").css("color","#474747");
	$(".table_color table tr:eq(1)").css("font-size","14px");
	$(".shop_info tr td:first-child").css({"color":"#989898","padding-left":"70px"});
	$(".pay_list .pay_bor:eq(0) td").css({"border":"none"});
	$("#con_xytabb_2 .pay_list .pay_bor:eq(0) td").css({"border":"none"});
	$(".count_info p:first-child").css({"margin-top":"0"});
});
// 收缩展开效果
$(function(){
   $(".sanjiao").toggle(function(){
     $(this).next(".caozuo").css("display","block");
   },function(){
	 $(this).next(".caozuo").css("display","none");
   });
   $(".caozuo").click(function(){
		$(this).hide();   
	})
});
//添加商品弹窗
$(function(){
	if (window.innerHeight)
	{
		winHeight = window.innerHeight;
	}
	else if ((document.body) && (document.body.clientHeight))
	{
		winHeight = document.body.clientHeight;
	}
	$(".all_box_z1").css({height:winHeight});
	$(".all_box_z").css({height:winHeight});
	$(".all_box_zz").css({height:winHeight});
	$(".all_box_zx").css({height:winHeight})
})
function hidets(){
	$(".all_box_z1").hide();
	$(".all_box_z").show();
	$(".add_sth").hide();
	$(".all_box_zz").hide();
	$(".all_box_zx").show();
	$(".add_sth").removeClass("add_sth1");
	for(var i=0; i<8;i++){
		$("#tc"+i).hide();	
	}
}
function ShowDiv(id){
	$(".all_box_z1").show();
	$(".all_box_z").show();
	$(".add_sth").show();
	$("#tc"+id).show();	
}
$(function(){
	$('.connect').click(function(){
		$(".all_box_z1").hide();
		$('.add_sth').hide();
		$(".all_box_zz").show();
		$(".all_box_zx").show();
		$(".add_sth").show();
		for(var i=0; i<8;i++){
			$("#tc"+i).hide();	
		}
		$('#tc3').show();
		$('.add_sth').addClass("add_sth1")	
	})	
	$('.connect1').click(function(){
		$(".all_box_z1").hide();
		$('.add_sth').hide();
		$(".all_box_zz").show();
		$(".all_box_zx").show();
		$(".add_sth").show();
		for(var i=0; i<8;i++){
			$("#tc"+i).hide();	
		}
		$('#tc4').show();
		$('.add_sth').addClass("add_sth1")	
	})	
});
$(function(){
	$('.set_edit').click(function(){
		$(this).hide();
		$(this).next('.set_state').show();
	});	
	$('.set_state').click(function(){
		$(this).hide();
		$(this).prev('.set_edit').show();
	});	
});
$(function(){
	$('.add_btn1').click(function(){
		$('#tc3').hide();
		$('#tc1').show();
		$(".add_sth").removeClass("add_sth1");
	})	
	$('.add_btn2').click(function(){
		$('#tc4').hide();
		$('#tc2').show();
		$(".add_sth").removeClass("add_sth1");
	})	
});
$(function(){
	$('.set_kind a').click(function(){
		$(this).toggleClass('cur')	
	})	
});
$(function(){
	$('#xytabbb1').click(function(){
		$('.count_info').hide();	
	});	
	$('#xytabbb2').click(function(){
		$('.count_info').show();	
	});	
	$('#divselect ul li:first-child').css("border-top","1px solid #ccc");
	$('#xytabbb2').click(function(){
		$('.w_right_top_r').hide();	
	});
	$('#xytabbb1').click(function(){
		$('.w_right_top_r').show();	
	});
});
function ShowH(id){
	$(".hd"+id).hide();	
	$(".sh"+id).show();	
}
function HideS(id){
	$(".hd"+id).show();	
	$(".sh"+id).hide();	
}
//二维码下拉框
jQuery.divselect = function(divselectid,inputselectid) { 
	var inputselect = $(inputselectid); 
	$(divselectid+" cite").click(function(){ 
		var ul = $(divselectid+" ul"); 
		if(ul.css("display")=="none"){ 
			ul.slideDown("fast"); 
			$('.sel_edit').show(); 
		}else{ 
			ul.slideUp("fast"); 
			$('.sel_edit').hide(); 
		} 
	}); 
	$(divselectid+" ul li a").click(function(){ 
		var txt = $(this).text(); 
		$(divselectid+" cite").html(txt); 
		var value = $(this).attr("selectid"); 
		inputselect.val(value); 
		$(divselectid+" ul").hide(); 
		$('.sel_edit').hide(); 
	}); 
}; 


