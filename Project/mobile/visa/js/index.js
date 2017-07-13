$(function(){
	$('.icon-menu').click(function(){
		if($('.menu-ul').css('opacity')==0){
			$('.headerMask').show();
			$('.menu-ul').removeClass('mhide');
			$('.menu-ul').addClass('mshow');
			$('.wrapper').removeClass('mhide1');
			$('.wrapper').removeClass('mshow1');
			$('.wrapper').addClass('mhide1');
			$('.wrapper').css('transform','translate(-270px)');
		}else{
			$('.headerMask').hide();
			$('.menu-ul').hide();
			$('.menu-ul').removeClass('mhide');
			$('.menu-ul').removeClass('mshow');
			$('.menu-ul').removeAttr('style');
			$('.wrapper').removeClass('mshow1');
			$('.wrapper').removeClass('mhide1');
			$('.wrapper').removeAttr('style');
		}
	});
	$('.headerMask').click(function(){
		$('.headerMask').hide();
		$('.wrapper').removeClass('mhide1');
		$('.wrapper').removeClass('mshow1');
		$('.wrapper').addClass('mshow1');
		$('.wrapper').removeAttr('style');
		$('.menu-ul').removeClass('mshow');
		$('.menu-ul').addClass('mhide');

	});
	
	$(".menu-ul").on("swiperight",function(){
		$('.headerMask').hide();
		$('.wrapper').removeClass('mhide1');
		$('.wrapper').removeClass('mshow1');
		$('.wrapper').addClass('mshow1');
		$('.wrapper').removeAttr('style');
		$('.menu-ul').removeClass('mshow');
		$('.menu-ul').addClass('mhide');
	})
}); 

var iconBtn = $('.icon-menu');
var menuUl = $('.menu-ul');
iconBtn.on('click', function () {
	$.smartScroll(menuUl, '.scrollable');
	$('html').addClass('noscroll');
});
$('.headerMask').on('click', function () {
	$('html').removeClass('noscroll');
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
			var events = event.touches[0] || event;
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
			var scrollTop = elScroll.scrollTop();
			var events = event.touches[0] || event;
			var distanceY = events.pageY - data.posY;
			if (isSBBrowser) {
				elScroll.scrollTop(data.scrollY - distanceY);
				elScroll.trigger('scroll');
				return;
			}
			if (distanceY > 0 && scrollTop == 0) {
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