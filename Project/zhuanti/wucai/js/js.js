//标签切换
function setTab(name,cursel,n,currentClass,otherClass){for(var i=1;i<=n;i++){var menu=document.getElementById(name+i);var con=document.getElementById("con_"+name+"_"+i);menu.className=i==cursel?currentClass:otherClass;if(con){con.style.display=i==cursel?"block":"none"}}}
$(function(){
    $('.dongtai .dt_mid .mm_bot table tr:even td').css('background','#eff3fa');
});
$(function(){
    var imgWid = 0 ;
    var imgHei = 0 ;
    var big = 1.1;
    $(".img a").hover(function(){
        $(this).find("img").stop(true,true);
        var imgWid2 = 0;
        var imgHei2 = 0;
        leftPosition = parseInt($(this).find("img").css('left'));
        topPosition = parseInt($(this).find("img").css('top'));
        imgWid = $(this).find("img").width();
        imgHei = $(this).find("img").height();
        imgWid2 = imgWid * big;
        imgHei2 = imgHei * big;
        $(this).find("img").css({"z-index":2});
        $(this).find("img").animate({"width":imgWid2,"height":imgHei2,left:leftPosition-imgWid/20,top:topPosition-imgHei/20},100);
    },function(){$(this).find("img").stop().animate({"width":imgWid,"height":imgHei,left:leftPosition,top:topPosition,"z-index":1});},100);
})