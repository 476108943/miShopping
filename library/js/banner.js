//菜单栏的显示
$("#banner_menu_wrap").children().hover(function () {
    $(this).css("background", "#ff6700");
    $(this).children(".banner_menu_content").css("border", "1px solid #F0F0F0").show();
}, function () {
    $(this).css("background", "none");
    $(this).children(".banner_menu_content").css("border", "0px solid #F0F0F0").hide();
});
//轮播

$(function () {
    var i = 0;
    var big_banner_pic = $("#big_banner_pic");
    var allImg = $("#big_banner_pic li").length;
    var list = $("#banner_list a");

    function img_change() {
        var img_i = i * -1226 + "px";
        big_banner_pic.animate({
            opacity: ".2"
        }, 100, function () {
            big_banner_pic.css("left", img_i);
            big_banner_pic.animate({
                opacity: "1"
            }, 100);
        })
         $(list[i]).css("backgroundColor","rgba(255, 255, 255, 0.4)").siblings().css("backgroundColor","rgba(0, 0, 0, 0.4)");
    }

    function automatic() {
        i ++;
        if (i >= allImg) {
            i = 0;
        }
        img_change();
    }
    var change_self_time = setInterval(()=>{
        automatic()
    }, 3000);
    $("#big_banner_change_wrap").hover(function(){
        clearInterval(change_self_time)
    },function(){
        change_self_time = setInterval(()=>{
            automatic()
        }, 3000);;
    });
    //轮播上一张下一张图标控制
    $("#big_banner_change_prev").click(function () {
        i --;
        if (i < 0) {
            i = allImg - 1;
        }
        img_change();
    })
    $("#big_banner_change_next").click(function () {
        i ++;
        if (i >= allImg) {
            i = 0;
        }
        img_change();
    })
    list.mouseover(function(){
        $(this).css("backgroundColor","rgba(255, 255, 255, 0.4)").siblings().css("backgroundColor","rgba(0, 0, 0, 0.4)");
    })
    list.click(function(){
        i = $(this).index();
        img_change();
    })
})