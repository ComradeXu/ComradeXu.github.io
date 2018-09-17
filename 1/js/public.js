$(function(){
    $('.js-cli-btn a').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $(this).parents('.js-cli-cont').find('.js-cli-con').eq($(this).index()).show().siblings().hide();
    });
    $('.icon-sousuo').click(function(){
        if($('.sousuo-con').hasClass('hide')){
            $('.sousuo-con').fadeIn();
            $('.sousuo-con').bind("touchmove",function(e){  
                e.preventDefault(); 
            });
        }else{
            $('.sousuo-con').fadeOut();
            $('.hide-bg').hide();
        }
    });
    $('.search-cancel').click(function(){
        $('.sousuo-con').fadeOut();
    });
   
    $(".nav-moree").on('click',function () {
        $('.nav-con').toggleClass("nav-con-open");
    });
    $(window).scroll(function () {
        var scrollTop= $(window).scrollTop() || $(this).scrollTop();
        if(scrollTop > 0) {
            $(".nav-con").removeClass("nav-con-open");
        }
    });

    var sHow = $('.article-show').height();
    if(sHow<187){
        $('.article-btn').hide();
    }else{
        $('.article-show').addClass('mask');
        $('.article-btn').show();
    };
    $('.article-btn').click(function(){
        if(!$('.article-show').hasClass('show')){
            $('.article-show').addClass('show');
            $('.article-show').removeClass('mask');
            $(this).find('a').text('收起更多');
            $(this).addClass('article-btn1');
        }else{
            $('.article-show').removeClass('show');
            $('.article-show').addClass('mask');
            $(this).find('a').text('查看更多');
            $(this).removeClass('article-btn1');
        }
    });
    $('.hide-bg').click(function(){
        $('.hide-bg,.wrap-sel-hide,.wrap-sel-con').hide();
        $('.hide-bg').css({'top':0,'z-index':2});
        $('.wrap-sel li').removeClass("cur");
        $('html').removeClass('noscroll');
        $('.hide-bg,header,.nav,.wrap-sel').unbind("touchmove");
    });
    //简章筛选
    $('.wrap-sel li').click(function(){
        if($('.wrap-sel-con').eq($(this).index()).css('display')=='none'){
            $('.wrap-sel-hide,.hide-bg').show();
            $('.hide-bg').css('top','5rem');
            $('.hide-bg').css({'top':'5rem','z-index':1});
            $(this).addClass("cur").siblings().removeClass("cur");
            $('.wrap-sel-con').eq($(this).index()).show().siblings().hide();
            $('html').addClass('noscroll');
            $('.hide-bg,header,.nav,.wrap-sel').bind("touchmove",function(e){  
                e.preventDefault();  
            }); 
        }else{
            $('.wrap-sel-hide,.wrap-sel-con,.hide-bg').hide();
            $('.hide-bg').css({'top':0,'z-index':2});
            $('.wrap-sel li').removeClass("cur");
            $('html').removeClass('noscroll');
            $('.hide-bg,header,.nav,.wrap-sel').unbind("touchmove");
        }
    });
    $('.wrap-sel-con li').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    });
    $('.rules-sel li:not(:last-child)').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
    $('.filter-btn').click(function(){
        $('.jz-panel').show();
        $('.jz-bg').show();
        $('.jz-box:not(:first-child)').hide();
        setTimeout(function(){$('.jz-all-box').addClass('jz-box-show')},100);
    });
    $('.jz-box dl dd a').click(function(){
        $(this).addClass('active');
        $(this).parents('dd').siblings().find('a').removeClass('active');
    });
    $('.jz-all-school').click(function(){
        $('.jz-school-box').show();
        $('.jz-major-box').hide();
        $('.jz-area-box').hide();
        $('.slidePage1').addClass('show');
        setTimeout(function(){
            $('.jz-school-box').addClass('jz-box-show');
            $('.jz-major-box').removeClass('jz-box-show');
            $('.jz-area-box').removeClass('jz-box-show');
        },100);
    });
    $('.jz-all-major').click(function(){
        $('.jz-major-box').show();
        $('.jz-school-box').hide();
        $('.jz-area-box').hide();
        $('.slidePage2').addClass('show');
        setTimeout(function(){
            $('.jz-major-box').addClass('jz-box-show');
            $('.jz-school-box').removeClass('jz-box-show');
            $('.jz-area-box').removeClass('jz-box-show');
        },100);
    });
    $('.jz-all-area').click(function(){
        $('.jz-area-box').show();
        $('.jz-school-box').hide();
        $('.jz-major-box').hide();
        setTimeout(function(){
            $('.jz-area-box').addClass('jz-box-show');
            $('.jz-school-box').removeClass('jz-box-show');
            $('.jz-major-box').removeClass('jz-box-show');
        },100);
    });
    $('.jz-back,.jz-none a').click(function(){
        setTimeout(function(){$('.jz-box:not(:first-child)').hide();},400);
        setTimeout(function(){
            $('.jz-area-box').removeClass('jz-box-show');
            $('.jz-school-box').removeClass('jz-box-show');
            $('.jz-major-box').removeClass('jz-box-show');
        },100);
    });
    $('.jz-bg,.jz-r-btn').click(function(){
        setTimeout(function(){$('.jz-panel').hide();$('.jz-bg').hide();},400);
        $('.jz-all-box').removeClass('jz-box-show');
        setTimeout(function(){$('.jz-box:not(:first-child)').hide();},400);
        setTimeout(function(){
            $('.jz-area-box').removeClass('jz-box-show');
            $('.jz-school-box').removeClass('jz-box-show');
            $('.jz-major-box').removeClass('jz-box-show');
        },100);
    });
    
    $('.jz-area').click(function(){
        if($(this).attr('data-on')=='false'){
            $('.jz-area-con').hide();
            $(this).parents('.jz-box').find('.jz-area-con').show();
            $('.jz-area').attr('data-on',false);
            $(this).attr('data-on',true);
            return false;
        }else{
            $('.jz-area-con').hide();
            $(this).attr('data-on',false);
            return false;
        }
    });
    $(document).click(function(){
        $('.jz-area-con').hide();
        $('.jz-area').attr('data-on',false);
    });

    $('.baoming-classify li').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    });
    //选择学历
    $('.chose-xueli').click(function(){
        $('.baoming-con').show();
        $('.hidee-bg').show();
        $('.hidee-bg').bind("touchmove",function(e){  
            e.preventDefault();  
        });
        setTimeout(function(){$('.xueli-con').addClass('baoming-show')},100);
    });
    //选择年份
    $('.chose-nianfen').click(function(){
        $('.baoming-con').show();
        $('.hidee-bg').show();
        $('.hidee-bg').bind("touchmove",function(e){  
            e.preventDefault();  
        });
        setTimeout(function(){$('.nianfen-con').addClass('baoming-show')},100);
    });
    $('.hidee-bg').click(function(){
        setTimeout(function(){$('.baoming-con').hide();$('.hidee-bg').hide();},200);
        $('.nianfen-con,.xueli-con').removeClass('baoming-show');
        $('.hidee-bg').unbind("touchmove");
    });
    $('.baoming-con li').click(function(){
        $(this).addClass('cur').siblings().removeClass('cur');
    })
    $('.xueli-con li').click(function(){
        var txt = $(this).text();
        $('.chose-xueli').val(txt);
        setTimeout(function(){$('.baoming-con').hide();$('.hidee-bg').hide();},200);
        $('.nianfen-con,.xueli-con').removeClass('baoming-show');
        $('.hidee-bg').unbind("touchmove");
    });
    $('.nianfen-con li').click(function(){
        var txt = $(this).text();
        $('.chose-nianfen').val(txt);
        setTimeout(function(){$('.baoming-con').hide();$('.hidee-bg').hide();},200);
        $('.nianfen-con,.xueli-con').removeClass('baoming-show');
        $('.hidee-bg').unbind("touchmove");
    });
});

$(function(){
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
    $(window).resize(footerPosition);
});