$(".nav>a").mouseover(function () {
    $(this).addClass("active").siblings().removeClass("active");
})


if(localStorage.nowLogin){
    var sLogin = $("#login-status>a:last")
    sLogin.html(`亲爱的 ： ${JSON.parse(localStorage.nowLogin)[0].nick}，欢迎登录`).attr('href','#');
    sLogin.prev().prev().html("退出").attr('href','#');
    var exit = sLogin.prev().prev();
    if(exit.html() == "退出"){
        exit.bind("click",function(){
            localStorage.nowLogin = "";
            window.location.reload();
        })
    }
    // var ccc = "[{'img':'img/p1.png','name':'小米8','price':'3699'},{'img':'img/p1.png','name':'小米8','price:3699'}]";
    // localStorage.setItem("car",JSON.stringify(ccc))
    // console.log(JSON.parse(localStorage.car))
    // if(localStorage.car){
    //     var shopList = $(".shoppingCart>div:last");
    //     var carArr = JSON.parse(localStorage.car);
    //     var str = "";
    //     for(var i = 0; i < carArr.length; i++){
    //         str+="1";
    //         str += `<b>
    //                     <img src="${carArr[i].img}" alt="">
    //                     <p>${carArr[i].name}</p>
    //                     <span>${carArr[i].price}<i>元</i></span>
    //                 </b>`;
    //     }
    //     shopList[0].innerHTML = str;
    //     shopList.children().each(()=>{
    //         var bottom = -98;
    //         bottom -= 98;
    //         shopList[0].style.bottom = bottom + "px";
    //         shopList[0].style.zIndex = 22;
    //     }).css("z-index",22);
    // }
}
if(localStorage.display){
    ajaxGet("http://localhost/1910-server/miShopping/library/goods.json",function(res){
        var res = JSON.parse(res);
        for(var i = 0; i < res.length; i++){
            if(localStorage.display == res[i].goodsId){
                $(".show-right").children("h4").html(`${res[i].name}`);
                $(".show-right p b").html(`${res[i].show}`);
                $(".show-right p span s").html(`${res[i].price}`);
                $(".allP h3 i").html(`${res[i].price}`);
                $(".show-left").html(`<img src = "${res[i].imgshow}">`);
                $(".show-title div span").html(`${res[i].name}`);
                var config = res[i].config.split(",");
                for(var j = 0; j < config.length; j++){
                    var d = $("<div>");
                        d.html(`${config[j]}`).addClass("config");
                    $("#allConfig").append(d);
                }
                $("#buy").attr("gid" ,`${res[i].goodsId}`);
            }
        }
    })
}
$("#buy").on("click",()=>{
    if(localStorage.nowLogin){
        setBuy();
        $(function() {
            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height:140,
                modal: true,
                buttons: {
                    "去结算": function() {
                        window.location.href="car.html"
                    },
                    "继续购买": function() {
                    $( this ).dialog( "close" );
                    }
                }
            });
        });
    }else{
        $("#dialog-confirm").attr("title","请登录").children("p").html('<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>您还未登录');

        $(function() {
            $( "#dialog-confirm" ).dialog({
                resizable: false,
                height:140,
                modal: true,
                buttons: {
                    "已有账号，去登录": function() {
                        window.location.href="login.html"
                    },
                    "去注册": function() {
                        window.location.href="register.html"
                    }
                }
            });
        });
    }
});
function setBuy(){
    var id = $("#buy").attr("gid");
    var goods = localStorage.buy ? JSON.parse(localStorage.buy) : [];
    var buyId = JSON.parse(localStorage.nowLogin)[0].id;
        if(goods.length == 0){
            goods.push({
                id:id,
                num:1,
                buyId:buyId
            })
        }else{
            var onoff = true;
            for(var i=0;i<goods.length;i++){
                if(goods[i].id === id && goods[i].buyId === buyId){
                    goods[i].num++;
                    onoff = false;
                }
            }

            if(onoff){
                goods.push({
                    id:id,
                    num:1,
                    buyId:buyId
                })
            }
            console.log(goods)
    }
    localStorage.buy = JSON.stringify(goods);
}