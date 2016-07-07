//轮询获取新消息通知
function showUnreadNews()
{
	var url = "/index.php/admin/index/getnewmsg.html";
	$.post(url, function(msg){
		if(msg != 0){
			$('.msg_tip').css("display","block");
			$('.msg_tip').text(msg);
		}
	});
}
//跳转到指定页面
function gotourl(url){
	location.href = url;
}
$(function(){
	$('.com_reback,.com_reback1').click(function(){
		history.back();
	});
})
//提交表单
function save(id){
	$('#'+id).submit();
}
//标签切换
function setTab(name,cursel,n,currentClass,otherClass){for(var i=1;i<=n;i++){var menu=document.getElementById(name+i);var con=document.getElementById("con_"+name+"_"+i);menu.className=i==cursel?currentClass:otherClass;if(con){con.style.display=i==cursel?"block":"none"}}}
//鼠标滑过弹出层
function navmian(obj,sType){var oDiv=document.getElementById(obj);if(sType=='show'){oDiv.style.display='block';}if(sType=='hide'){oDiv.style.display='none';}}
$(function(){
	var rHeight = $('.wrap_right').height();
	$('.wrap_left').css('height',rHeight);
});
window.onload=function(){
	if(document.documentElement.clientWidth<=1366)  //获取屏幕的的宽度
	{
		$('.qx_sm').css({"height":"450px","overflow":"auto"})
	}
}
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
})
function closee(){
	$(".tan_box_z").hide();
	$(".tan_box_z1").show();
	$(".tan_box").hide();
	for(var i=0;i<50;i++){
		$("#tanbox"+i).hide();
	}
};
function TanB(id,delid){
	$(".tan_box_z").show();
	$(".tan_box_z1").show();
	$(".tan_box").show();
	$("#tanbox"+id).show();
}
//左侧导航效果
$(function(){
	var li = $('.wrap_left .Menubox ul li');
	var li1 = $('.wrap_left .Menubox ul li').not(':first').not(':last');
	li.click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover');
	});
	$('.down p').click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover');
	});
	$('.guanli').click(function(){
		if($(this).hasClass('open')){
			$(this).removeClass('open');
		}else{
			$(this).addClass('open');
		}
	});
	$('.guanli1').click(function(){
		if($('.down1').css('display')=='none'){
			$('.down1').slideDown();
		}else{
			$('.down1').slideUp();
		}
	});
	$('.guanli2').click(function(){
		if($('.down2').css('display')=='none'){
			$('.down2').slideDown()
		}else{
			$('.down2').slideUp();
		}
	});
	li1.click(function(){
		$('.down').hide();
	});
});
function fuzhi(val){
	var txt = $(val).text();
	$('.pro_p1 .pro_sear').val(txt);
	$('#searchfzr').hide();
}
function fuzhi1(val){
	var txt = $(val).text();
	$('.pro_p2 .pro_sear').val(txt);
	$('#shrid').val($(val).attr('userid'));
	$('#userlist').hide();
}
//右侧效果
$(function(){
	$('.w_r_b ul li').click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover')
	});
	var PubEdit = $('.w_r_w table tr td.w_r_w_e');
	PubEdit.mouseover(function(){
		$(this).children('.w_r_e').show()
	});
	PubEdit.mouseout(function(){
		$(this).children('.w_r_e').hide()
	});
	PubEdit.click(function(){
		$(this).children('.w_r_e').hide()
	});
	var docEdit = $('.doc_other tr td.doc_edit');
	docEdit.hover(function(){
		$(this).children('.doc_edit_e').show()
	},function(){
		$(this).children('.doc_edit_e').hide()
	});
	docEdit.click(function(){
		$(this).children('.doc_edit_e').hide()
	});
	$('.w_r_m table tr td.w_r_w_e:last-child').css('border-right','none');
	$('.w_tjlb li').click(function(){
		$(this).addClass('cur');
		$(this).siblings().removeClass('cur');
	});
	var accEdit = $('.acc_edit');
	accEdit.mouseover(function(){
		$(this).children('.acc_edit_n').show()
	});
	accEdit.mouseout(function(){
		$(this).children('.acc_edit_n').hide()
	});
	accEdit.click(function(){
		$(this).children('.acc_edit_n').hide()
	});
	var appEdit = $('.app_edit');
	appEdit.mouseover(function(){
		$(this).children('.app_edit_e').show()
	});
	appEdit.mouseout(function(){
		$(this).children('.app_edit_e').hide()
	});
	appEdit.click(function(){
		$(this).children('.app_edit_e').hide()
	});
    $('.pro_p1 b').click(function(){
        var url = "/index.php/Admin/index/searchfzr.html";
        var name = $('.pro_p1 .pro_sear').val();
        $.post(url, {name:name}, function(msg){
            if(msg.error == 1){
                var html = "<li>用户不存在</li>";
            }else{
                var html = '';
                $.each(msg.info, function (n, value) {
                    html += "<li onclick='fuzhi(this)'>"+value.name+"</li>";
                });
            }
            $('#searchfzr').html(html);
        });
        $('#searchfzr').show();
    });
    $('.pro_p2 i').click(function(){
        var url = "/index.php/Admin/index/searchfzr.html";
        var name = $('.pro_p2 .pro_sear').val();
        $.post(url, {name:name}, function(msg){
            if(msg.error == 1){
                var html = "<li>用户不存在</li>";
            }else{
                var html = '';
                $.each(msg.info, function (n, value) {
                    html += "<li onclick='fuzhi1(this)' userid='"+value.id+"'>"+value.name+"</li>";
                });
            }
            $('#userlist').html(html);
        });
        $('#userlist').show();
    });
    $(document).click(function(){
        $('#userlist').hide();
    });
    $(".pro_p1 b,.pro_p1 .pro_sear").click(function(event){
        event.stopPropagation();
    });
	$(".user_info:contains('@')").css('color','#067FE7');
});
$(function(){
	$('.new_add').click(function(){
		var addTag = $('.new_add').parent();
		addTag.before('<li><input type="text" placeholder="请输入内容" name="labellist[]" labelid=""><i onclick="dellabel(0)"></i></li>');
	});
	$('.doc_add').click(function(){
		var addTag1 = $('.doc_add').parent();
		addTag1.before('<li><input type="text" placeholder="请输入内容" name="labellist[]" labelid=""><i onclick="dellabel(0)"></i></li>');
	});
	$('.dis_pl table tr td:last-child').css('text-align','right');
	$('.other_b table tr td:nth-child(4)').css('border-right','1px solid #e5e5e5');
});
$(function(){
	var txt_1 = "<tr class='com_bor2'><td>&nbsp;</td><td>工程名称：</td><td><input type='text' class='input' placeholder='' name='certificate1name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate1getdate[]'><span class='com_del'></span></td></tr>";
	var txt_2 = "<tr class='com_bor2'><td>&nbsp;</td><td>工程名称：</td><td><input type='text' class='input' placeholder='' name='certificate2name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate2getdate[]'><span class='com_del'></span></td></tr>";
	var txt1_3 = "<tr class='com_bor2'><td>&nbsp;</td><td>证书名称：</td><td><input type='text' class='input' placeholder='' name='certificate3name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate3getdate[]'></td><td>证书编号：</td><td><input type='text' class='input' placeholder='' name='certificate3cardnum[]'><span class='com_del'></span></td></tr>";
	var txt1_4 = "<tr class='com_bor2'><td>&nbsp;</td><td>证书名称：</td><td><input type='text' class='input' placeholder='' name='certificate4name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate4getdate[]'></td><td>证书编号：</td><td><input type='text' class='input' placeholder='' name='certificate4cardnum[]'><span class='com_del'></span></td></tr>";
	var txt1_5 = "<tr class='com_bor2'><td>&nbsp;</td><td>证书名称：</td><td><input type='text' class='input' placeholder='' name='certificate5name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate5getdate[]'></td><td>证书编号：</td><td><input type='text' class='input' placeholder='' name='certificate5cardnum[]'><span class='com_del'></span></td></tr>";
	var txt1_6 = "<tr class='com_bor2'><td>&nbsp;</td><td>证书名称：</td><td><input type='text' class='input' placeholder='' name='certificate6name[]'></td><td>获得时间：</td><td><input type='text' class='Wdate' onClick='WdatePicker()' placeholder='' name='certificate6getdate[]'></td><td>证书编号：</td><td><input type='text' class='input' placeholder='' name='certificate6cardnum[]'><span class='com_del'></span></td></tr>";

	var txt3 = "<tr><td>&nbsp;</td><td>品种：</td><td><input class='input' type='text' placeholder=''></td><td>数量：</td><td><input class='input' type='text' placeholder=''><span class='com_del'></span></td></tr>";
	var txt4 = "<div class='out_se'>费用：<input class='out_input' type='text' placeholder='' value='' name='expenditure[]'><span class='out_lb'>类别：</span><select class='out_sel' name='type[]'><option value='请选择' selected>请选择</option><option value='项目提成'>项目提成</option><option value='交通费'>交通费</option><option value='办公用品'>办公用品</option><option value='餐费'>餐费</option><option value='快递'>快递</option><option value='其他'>其他</option></select><i class='del_pri'></i></div>";
	$('.add_gc').click(function(){
		var tabLen = $('.com_tab').find('.com_tab2').length+1;
		var tabLen1 = tabLen++;
		var txt5 = "<table cellpadding='0' cellspacing='0' width='100%' class='com_tab2 com_tab3'><tbody><tr class='com_none'><td width='40'></td><td colspan='2' width='45%'></td><td colspan='2'></td></tr><tr><th>&nbsp;</th><th colspan='5'>工程"+tabLen1+"<i class='del_gc'></i></th></tr><tr class='pt20'><td>&nbsp;</td><td width='16%'>合同编号：</td><td><input class='input' type='text' placeholder=''></td><td width='16%'>工程名称：</td><td><input class='input' type='text' placeholder=''></td></tr><tr><td>&nbsp;</td><td>工程性质：</td><td><input class='input' type='text' placeholder=''></td><td>工程所在区：</td><td><input class='input' type='text' placeholder=''></td></tr><tr><td>&nbsp;</td><td>工程类别：</td><td colspan='3'><input class='input' type='text' placeholder=''></td></tr><tr><td>&nbsp;</td><td>开工时间：</td><td><input class='input' type='text' placeholder=''></td><td>竣工时间：</td><td><input class='input' type='text' placeholder=''></td></tr><tr><td>&nbsp;</td><td>施工总面积（㎡）：</td><td><input class='input' type='text' placeholder=''></td><td>绿化面积（㎡）：</td><td><input class='input' type='text' placeholder=''></td></tr><tr><td>&nbsp;</td><td>工程预算价格（元）：</td><td><input class='input' type='text' placeholder=''></td><td>工程决算价格（元）：</td><td><input class='input' type='text' placeholder=''></td></tr><tr class='pb20_h'><td colspan='4'>&nbsp;</td></tr><tr class='bor2'><td colspan='5'></td></tr><tr class='com_bor2'><td>&nbsp;</td><td colspan='6'><strong>工程应用花灌木</strong><span class='com_new2'>新增</span></td></tr><tr><td>&nbsp;</td><td>品种：</td><td><input class='input' type='text' placeholder=''></td><td>数量：</td><td><input class='input' type='text' placeholder=''></td></tr><tr class='pb20_h'><td colspan='4'>&nbsp;</td></tr><tr class='bor2'><td colspan='5'></td></tr><tr class='com_bor2'><td>&nbsp;</td><td colspan='6'><strong>工程应用草坪</strong><span class='com_new2'>新增</span></td></tr><tr><td>&nbsp;</td><td>品种：</td><td><input class='input' type='text' placeholder=''></td><td>数量：</td><td><input class='input' type='text' placeholder=''></td></tr><tr class='pb20_h'><td colspan='4'>&nbsp;</td></tr><tr class='bor2'><td colspan='5'></td></tr><tr class='com_bor2'><td>&nbsp;</td><td colspan='6'><strong>工程应用草花</strong><span class='com_new2'>新增</span></td></tr><tr><td>&nbsp;</td><td>品种：</td><td><input class='input' type='text' placeholder=''></td><td>数量：</td><td><input class='input' type='text' placeholder=''></td></tr></tbody></table>";
		$(txt5).insertAfter($('.com_tab table:last'));
	});
	var txt6 = "<tbody><input type='hidden' name='rzfalist[]' value=''><tr class='doc_bor'><td colspan='4'></td></tr><tr class='doc_tr'><td colspan='4'><strong>方案</strong><i class='doc_dele'></i></td></tr><tr><td>放款机构：</td><td colspan='3'><input type='text' class='doc_input1' placeholder='' name='fkjg[]'></td></tr><tr><td>执行期限（天）：</td><td><input type='text' class='doc_input2' placeholder='' name='zxqx[]'></td><td>放款额度（万元）：</td><td><input type='text' class='doc_input2' placeholder='' name='fked[]'></td></tr></tbody>";
	var txt7 = "<table cellpadding='0' cellspacing='0' width='100%' class='com_tab12'><tbody><tr><td width='12%' rowspan='5' valign='top'><input type='text' class='Wdate date_input' onClick='WdatePicker()' name='createdate[]'><i class='del_bil'></i></td><td width='22%' class='bil_tel'>单项金额重大并单项计提坏账准备的应收账款</td><td width='13%'><input type='text' name='je[]'></td><td width='13%'><input type='text' name='bl[]'></td><td width='13%'><input type='text' name='hzzb[]'></td><td width='13%'><input type='text' name='je2[]'></td><td width='13%'><input type='text' name='bl2[]'></td></tr><tr><td class='bil_tel'>按组合计提坏账准备的应收账款</td><td><input type='text' name='je[]'></td><td width='13%'><input type='text' name='bl[]'></td><td width='13%'><input type='text' name='hzzb[]'></td><td width='13%'><input type='text' name='je2[]'></td><td width='13%'><input type='text' name='bl2[]'></td></tr><tr><td class='bil_tel'>其中：账龄组合</td><td><input type='text' name='je[]'></td><td width='13%'><input type='text' name='bl[]'></td><td width='13%'><input type='text' name='hzzb[]'></td><td width='13%'><input type='text' name='je2[]'></td><td width='13%'><input type='text' name='bl2[]'></td></tr><tr><td class='bil_tel'>组合小计</td><td><input type='text' name='je[]'></td><td width='13%'><input type='text' name='bl[]'></td><td width='13%'><input type='text' name='hzzb[]'></td><td width='13%'><input type='text' name='je2[]'></td><td width='13%'><input type='text' name='bl2[]'></td></tr><tr><td class='bil_tel'>单项金额虽不重大但单项计提坏账准备的应收账款</td><td><input type='text' name='je[]'></td><td width='13%'><input type='text' name='bl[]'></td><td width='13%'><input type='text' name='hzzb[]'></td><td width='13%'><input type='text' name='je2[]'></td><td width='13%'><input type='text' name='bl2[]'></td></tr></tbody></table>";
	var txt8 = "<tr><td><input type='text' value='' class='bil_input1'></td><td><input type='text' value=''></td><td><input type='text' value=''></td><td><input type='text' value='' class='bil_input1'><i class='del_bil1'></i></td></tr>";
	var txt9 = "<tr><td><input type='text' value='' class='bil_input1'></td><td><select class='bil_sel'><option value='在施'>在施</option><option value='完工'>完工</option></select></td><td><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td><input type='text' value=''></td><td><input type='text' value=''></td><td><input type='text' value=''><i class='del_bil2'></i></td></tr>";
	var txt10 = "<table cellpadding='0' cellspacing='0' width='100%' class='com_tab12 com_tab16'><tbody><tr><td width='20%' colspan='7'>发包方&ensp;<input type='text' value='' class='bil_input1'><a class='add_bil2' href='javascript:void(0)'>新增合同</a><i class='del_bil3'></i></td></tr><tr><td width='26%'><input type='text' value='' class='bil_input1'></td><td width='11%'><select class='bil_sel'><option value='在施'>在施</option><option value='完工'>完工</option></select></td><td width='11%'><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td width='11%'><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td width='11%'><input type='text' value=''></td><td width='11%'><input type='text' value=''></td><td width='19%'><input type='text' value=''></td></tr><tr><td><input type='text' value='' class='bil_input1'></td><td><select class='bil_sel'><option value='在施'>在施</option><option value='完工'>完工</option></select></td><td><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td><input type='text' value='' class='Wdate input_date' onClick='WdatePicker()'></td><td><input type='text' value=''></td><td><input type='text' value=''></td><td><input type='text' value=''><i class='del_bil2'></i></td></tr></tbody></table>";
	$('.com_new_add_1').click(function(){
		$(this).parents('.com_bor2').after(txt_1);
	});
	$('.com_new_add_2').click(function(){
		$(this).parents('.com_bor2').after(txt_2);
	});
	$('.com_new_add1_3').click(function(){
		$(this).parents('tr').after(txt1_3);
	});
	$('.com_new_add1_4').click(function(){
		$(this).parents('tr').after(txt1_4);
	});
	$('.com_new_add1_5').click(function(){
		$(this).parents('tr').after(txt1_5);
	});
	$('.com_new_add1_6').click(function(){
		$(this).parents('tr').after(txt1_6);
	});
	$('.add_fa').click(function(){
		$(txt6).insertAfter($('.com_tab9 tbody:last'));
	});
	$('.add_bil').click(function(){
		$(txt7).insertAfter($('.bil_table1 table:last'));
	});
	$('.add_bil1').click(function(){
		$(txt8).insertAfter($('.bil_table1 .com_tab12 tr:last'));
	});
	$('.add_bil3').click(function(){
		$(txt10).insertAfter($('.bil_table1 table:last'));
	});
	$(document).on('click','.add_bil2',function(){
		$(txt9).insertAfter($(this).parents('.com_tab12:last').find('tr:last'));
	})
	$('.com_new1').click(function(){
		var ctype = $(this).attr('ctype');
		var txt2 = "<tbody><tr class='bor2'><td style='border:none;'></td><td colspan='4'></td></tr><tr><td>&nbsp;</td><td colspan='4'><span>工程</span></td></tr><tr><td>&nbsp;</td><td>工程合同号：</td><td><input class='input' type='text' placeholder='' name='gchth"+ctype+"[]'></td><td>工程名称：</td><td><input class='input' type='text' placeholder='' name='gcmc"+ctype+"[]'></td></tr><tr class='pb20'><td>&nbsp;</td><td>工程类别：</td><td><input class='input' type='text' placeholder='' name='gclb"+ctype+"[]'></td><td>工程所在区：</td><td><input class='input' type='text' placeholder='' name='gcszq"+ctype+"[]'><span class='com_del1'></span></td></tr></tbody>";
		$(this).parents('tbody').after(txt2);
	});
	$('.add_pri a').click(function(){
		$(this).parent('.add_pri').before(txt4);
	});

	$(document).on('click', '.com_del', function(){
		$(this).parent().parent().remove();
	});
	$(document).on('click', '.com_del1', function(){
		$(this).parents('tbody').remove();
	});
	$(document).on('click', '.del_pri', function(){
		$(this).parents('.out_se').remove();
	});
	$(document).on('click', '.dep_edit ul li i', function(){
		$(this).parents('li').remove();
	});
	$(document).on('click', '.com_new2', function(){
		$(this).parents('.com_bor2').next().after(txt3);
	});
	$(document).on('click', '.doc_dele', function(){
		$(this).parents('tbody').remove();
	});
	$(document).on('click', '.dail_way .set_black ul li i', function(){
		$(this).parents('li').remove();
	});
	$(document).on('click', '.del_bil', function(){
		$(this).parents('table').remove();
	});
	$(document).on('click', '.del_bil1', function(){
		$(this).parents('tr').remove();
	});
	$(document).on('click', '.del_bil2', function(){
		$(this).parents('tr').remove();
	});
	$(document).on('click', '.del_bil3', function(){
		$(this).parents('table').remove();
	});
	$(document).on('click', '.del_gc', function(){
		$(this).parents('table').remove();
	});
	$('.fj_img_show').parent('td').css('text-align','left')
});

$(function(){
	$('.clear_chose').click(function(){
		$(this).prevAll('.Wdate').val('')
	});
	$('.doc_del').click(function(){
		$(this).parents('p').remove();
	});
	$('.seed_tab ul li').click(function(){
		$(this).addClass('hover');
		$(this).siblings().removeClass('hover');
	});
	$('.img_del').click(function(){
		$(this).parent('li').remove();
	});
});
$(function(){
	$('.send_msg').click(function(){
		$(this).hide();
		$('.tab_show').hide();
		$('.tab_hide,.send_msg_next').show();
	});
	$('.send_msg_esc').click(function(){
		$('.tab_hide,.send_msg_next').hide();
		$('.tab_show').show();
		$(this).parent().prev('.send_msg').show();
	});
	$("#chkal").click(function () {
		$('#touser').html('');
		if($(this).attr('checked')){
			$("input[name='touserid[]']").each(function() {
				var username = $(this).attr('username');
				var userid = $(this).val();
				$html = "<span id='showuser_"+userid+"'>"+username+"<i userid='"+userid+"' onclick='removeuser(this)'></i>";
				$('#touser').append($html);
			})
		}
		$("input[name='touserid[]']").prop("checked", this.checked);
	});
	$("input[name='touserid[]']").click(function () {
		var username = $(this).attr('username');
		var userid = $(this).val();
		if($(this).attr('checked')){
			$html = "<span id='showuser_"+userid+"'>"+username+"<i userid='"+userid+"' onclick='removeuser(this)'></i>";
			$('#touser').append($html);
		}else{
			$('#showuser_'+userid).remove();
		}
		var $usercla = $("input[name='touserid[]']");
		$("#chkal").prop("checked", $usercla.length == $usercla.filter(":checked").length ? true : false);
	});
	$('.rec_user span i').click(function(){
		$(this).parent('span').remove();
	});
	$('.send_msg_next1').click(function(){
		if($("input[name='touserid[]']:checked").size()==0){
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#tanbox24").show();
		}else{
			$(".tan_box_z").show();
			$(".tan_box_z1").show();
			$(".tan_box").show();
			$("#tanbox23").show();
		}
	});
});

function closee1(){
	$(".tan_box_z").hide();
	$(".tan_box_z1").show();
	$(".tan_box").hide();
	for(var i=0;i<50;i++){
		$("#tanbox"+i).hide();
	}
	$('.send_msg').show();
};
//$(function(){
//	$('.see_more a').click(function(){
//		if($(this).parent().prev('.msg_two').children('.hide').css('display')=='none'){
//			$(this).parent().prev('.msg_two').children('.hide').show();
//			$(this).html("收起<i class='xia'></i>")	;
//		}else{
//			$(this).parent().prev('.msg_two').children('.hide').hide();;
//			$(this).html("点击查看更多<i></i>")	
//			}
//	});
//})

$(function(){
	var $category = $('.msg_two .msg_three:gt(2)');
	$category.hide();
	var $toggleBtn = $('.see_more a');
	$toggleBtn.toggle(function(){
		$category.show();
		$(this).html("收起<i class='xia'></i>");
	},function(){
		$category.hide();
		$(this).html("点击查看更多<i></i>");
	});
});


$(function(){
	$('.sub_chk .pro_name_list1 ul li').click(function(){
		var txt = $(this).text();
		var inputName = "<span>"+$('.sub_chk .pro_in .pro_p2 .pro_sear').val()+"<b></b>"+"</span>";
		var reciveName = $('.pro_p1 .sub_span');
		$(this).parents('.pro_name_list').prev('.pro_p1').children('.pro_sear').val(txt);
		reciveName.append(inputName);
	});
	var spanDel = '.sub_chk .pro_in .pro_p1 span.sub_span span b';
	$(document).on('click',spanDel,function(){
		$(this).parent('span').remove();
	});
	$('.pro_res .pro_name_list ul li').click(function(){
		var txt1 = $(this).text();
		var inputName1 = "<span>"+$('.pro_res .pro_sel .pro_p1 .pro_sear').val()+"<i></i>"+"</span>";
		var reciveName1 = $('.pro_res .pro_fz_name');
		$(this).parents('.pro_name_list').prev('.pro_p1').children('.pro_sear').val(txt1);
		reciveName1.append(inputName1);
	});
	var spanDel1 = '.pro_res .pro_fz_name span i';
	$(document).on('click',spanDel1,function(){
		$(this).parent('span').remove();
	});
});

//下拉框
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
	for(var i=0;i<=100;i++){
		$.divselect(".divselect"+i,".inputselect"+i);
	}
	$('.add_time_save').click(function(){
		var txtValue = $('.add_time_input').val();
		var addUl = $('.pro_jd1 ul');
		addUl.prepend("<li><a href='javascript:void(0);'" + " selectid="+txtValue+">"+txtValue+"</a><i class='time_edit' onClick='TanB(39)'></i><i class='time_del' onClick='TanB(40)'></i></li>");
		$(".pro_jd1 .divselect1 cite").html(txtValue);
	});
	$(document).on('click','.pro_jd1 .divselect1 ul li a',function(){
		var txt = $(this).text();
		$(".pro_jd1 .divselect1 cite").html(txt);
		var value = $(this).attr("selectid");
		$('.pro_jd1 .inputselect1').val(value);
		$('.pro_jd1 .divselect1 ul').hide();
	});
	$(document).on('click','.pro_jd1 .divselect1 ul li a.add_year',function(){
		var txtValue = $('.add_time_input').val();
		$(".pro_jd1 .divselect1 cite").html(txtValue);
	});
	$('.add_time .set_esc').click(function(){
		$(".pro_jd1 .divselect1 cite").html('请输入评级年份');
	});
});

$(function () {
	$('.top_more span').click(function(){
		if($('.top_more ul').css('display')=='none'){
			$('.top_more ul').show();
		}else{
			$('.top_more ul').hide();
		}return false;
	})
	$('.w_r_b .top_more ul li').click(function(){
		$(this).removeClass('hover');
		$(this).siblings().removeClass('hover');
		$('.top_more ul').hide();
		$('.w_r_b ul li').removeClass();
		return false;
	});
	$(document).click(function(){
		$('.top_more ul').hide();
	});
});

$(function () {
	$('.shh_send').click(function(){
		var proSear=$('.pro_sear').val();
		var subZj=$('.sub_zj').val();
		if(proSear==''|| proSear == null){
			$('.pro_sear').addClass('bred');
			return false;
		}
		if(subZj==''|| subZj == null){
			$('.sub_zj').addClass('bred');
			return false;
		}else {
			$("#tanbox29").hide();
			$("#tanbox30").show().delay(1000).hide(1);
			$(".tan_box_z").delay(1000).hide(1);
			$(".tan_box_z1").delay(1000).hide(1);
		}
	})
	$('.pro_sear').blur(function(){
		var proSear=$('.pro_sear').val();
		if(proSear!==''|| proSear !== null){
			$('.pro_sear').removeClass('bred');
		}
	});
	$('.sub_zj').blur(function(){
		var subZj=$('.sub_zj').val();
		if(subZj!==''|| subZj !== null){
			$('.sub_zj').removeClass('bred');
		}
	})
})

