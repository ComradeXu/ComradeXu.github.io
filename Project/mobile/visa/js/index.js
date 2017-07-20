$(function(){
	$('.wrap-ul-con:not(:first-child)').hide();
	$('.wrap-ul ul li').click(function(){
		$(this).addClass('cur');
		$(this).siblings().removeClass('cur');
		$('.wrap-ul-con').eq($(this).index()).show().siblings().hide();
	});
	$('.wrap-ul1 ul li').click(function(){
		if($('.wrap-select').css('display')=='none'){
			$('.wrap-select').show();
			$('.gray-bg').show();
			$('.wrap-ul1 ul li i').removeClass('icon-huaban');
			$(this).find('i').addClass('icon-huaban');
			$('.select-con').eq($(this).index()).show().siblings().hide();
			$('html').addClass('noscroll');
			//$('html,body').animate({scrollTop: '0px'}, 100);
			$('.gray-bg,.wrap-ul1,.brand,.wrap-select,.area-test').bind("touchmove",function(e){  
	            e.preventDefault();  
	        }); 
		}else{
			$('.wrap-select').hide();
			$('.gray-bg').hide();
			$(this).find('i').removeClass('icon-huaban');
			$('html').removeClass('noscroll');
		}
	});
	$('.select-ul ul li').click(function(){
		$(this).addClass('cur');
		$(this).siblings().removeClass('cur');
	});
	$('.gray-bg').click(function(){
		$('.wrap-select').hide();
		$('.area-test').hide();
		$(this).hide();
		$('.wrap-ul1 ul li i').removeClass('icon-huaban');
		$('html').removeClass('noscroll');
	});
	$('.select-btn a').click(function(){
		$('.wrap-select').hide();
		$('.wrap-ul1 ul li i').removeClass('icon-huaban');
		$('.area-test').show();
	})
	$('.area-close').click(function(){
		$('.area-test').hide();
		$('.gray-bg').hide();
		$('html').removeClass('noscroll');
	})
	$(".select_box").click(function(event){   
        event.stopPropagation();
        $(this).find(".option").toggle();
        $(this).parent().siblings().find(".option").hide();
    });
    $(document).click(function(event){
        var eo=$(event.target);
        if($(".select_box").is(":visible") && eo.attr("class")!="option" && !eo.parent(".option").length)
        $('.option').hide();
    });
    $(".option a").click(function(){
        var value=$(this).text();
        $(this).parent().siblings(".select_txt").text(value);
        $("#select_value").val(value);
        $(this).parent().siblings(".select_txt").css({"color":"#333"});
    });
})

var iconBtn = $('.icon-menu');
var elAside = $('.aside');
iconBtn.on('click', function () {
	elAside.addClass('active');
	$.smartScroll(elAside, '.scrollable');
	$('html').addClass('noscroll');
	$('.wrapper').addClass('ani');

});
$('.hideAside').on('click', function () {
	$('html').removeClass('noscroll');
	elAside.removeClass('active');
	$('.wrapper').removeClass('ani');
});


$.smartScroll = function(container, selectorScrollable) {
	if (!selectorScrollable || container.data('isBindScroll')) {
		return;
	}
	var isSBBrowser;
	var data = {
		posY: 0,
		maxscroll: 0
	};
	container.on({
		touchstart: function (event) {
			var elTarget = $(event.target);
			if (!elTarget.length) {
				return;	
			}
			var elScroll;
			if (elTarget.is(selectorScrollable)) {
				elScroll = elTarget;
			} else if ((elScroll = elTarget.parents(selectorScrollable)).length == 0) {
				elScroll = null;
			}
			if (!elScroll) {
				return;
			}
			data.elScroll = elScroll;
			data.posY = events.pageY;
			data.scrollY = elScroll.scrollTop();
			data.maxscroll = elScroll[0].scrollHeight - elScroll[0].clientHeight;
		},
		touchmove: function () {
			if (data.maxscroll <= 0 || isSBBrowser) {
				event.preventDefault();
			}
			var elScroll = data.elScroll;
			var events = event.touches[0] || event;
			var distanceY = events.pageY - data.posY;
			if (isSBBrowser) {
				elScroll.scrollTop(data.scrollY - distanceY);
				elScroll.trigger('scroll');
				return;
			}
			if (distanceY > 0) {
				event.preventDefault();
				return;
			}
			if (distanceY < 0 && (scrollTop + 1 >= data.maxscroll)) {
				event.preventDefault();
				return;
			}
		},
		touchend: function () {
			data.maxscroll = 0;
		}	
	});
	container.data('isBindScroll', true);
};