////////////////////////////////////////////////////////////
// Copyright (C) 2005-2008 成都彩程数字科技有限公司.
// All rights reserved.
// 项目名称           C/S模式Tab示例
// 版本说明           0.0.1
// 开发者             刘思远
// 创建时间           2009.3.23
// 修改记录
// 文件名称           index.js
// 文件描述           C/S模式Tab示例首页js
// 其他
////////////////////////////////////////////////////////////

( function() {

$( document ).ready( function() {
    
    // 初始化tab
    $( "#tabs" ).tabs({
        tabTemplate: '<li><a href="#{href}">#{label}</a><a class="close" href="#">x</a></li>',
        cache: true
    })
    .bind( "tabsadd", function( event, ui ) {
        $( this ).tabs( "select", "#" + ui.panel.id );
    });
    
    // 动态绑定关闭tab的事件
    $( ".ui-tabs-nav a.close" ).live( "click", function( e ) {
        e.preventDefault();
        var index = $( ".ui-tabs-nav li" ).index( $( this ).parent());
        $( "#tabs" ).tabs( "remove", index );
    });
    
    // 点击添加tab页
    $( ".list a" ).click( function( e ) {
        e.preventDefault();
        var href = $( this ).attr( "href" );
        var orderid = href.substring( href.indexOf( "-" ) + 1 );
        var tabid = "order-" + orderid;
        var url = "order.php?orderid=" + orderid;
        var label = "订单详情-" + orderid;
        addTab( tabid, url, label );
    });
    
});

// 添加tab的接口
function addTab( id, url, label ) {
    var mainTab = $( "#tabs" );
    var added = false;
    $( "iframe", mainTab ).each( function( i ) {
        var src = this.src.substring( this.src.lastIndexOf( "/" ) + 1 );
        if ( src == url ) {
            added = $( this );
        }
    });
    
    if ( added ) {
        mainTab.tabs( "select", "#" + added.parent().attr( "id" ));
        return;
    }
    
    var panel = $( "<div/>" ).attr({
        "id": id
    }).appendTo( mainTab );
    
    mainTab.tabs( "add", "#" + id, label );
    
    $( "<iframe/>" ).attr({
        "frameBorder": "0",
        "scrolling": "no",
        "allowTransparency": "true",
        "src": url
    }).css({
        "width": "100%",
        "height": "100px"
    }).load( function() {
        var iframe = $( this );
        iframe.height( iframe.contents().find( "body" ).height());
    }).appendTo( panel );
}

})();