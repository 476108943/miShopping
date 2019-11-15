$(".nav>a").mouseover(function () {
    $(this).addClass("active").siblings().removeClass("active");
})
$(".s1").click(()=>{
    $("html").animate({
        scrollTop:0
    })
})

setInterval(function () {
    var date1 = new Date();
    var date2 = new Date(date1);
    date2.setDate(date1.getDate() + 1);
    date2.setHours(0);
    date2.setMinutes(0);
    date2.setSeconds(0);
    date2.setMilliseconds(0);
    var time1 = date1.getTime();
    var time2 = date2.getTime();
    var intDiff = Math.abs(time1 - time2);
    var hours = Math.floor(intDiff / 3600000);
    var minutes = Math.floor(intDiff / 1000 / 60 - hours * 60);
    var seconds = Math.floor(intDiff / 1000 - minutes * 60 - hours * 3600);
    $('#hours')[0].innerHTML = hours;
    $('#minutes')[0].innerHTML = minutes;
    $('#seconds')[0].innerHTML = seconds;
}, 1000);

if (localStorage.nowLogin) {
    var sLogin = $("#login-status>a:last")
    sLogin.html(`亲爱的 ： ${JSON.parse(localStorage.nowLogin)[0].nick}，欢迎登录`).attr('href', '#');
    sLogin.prev().prev().html("退出").attr('href', '#');
    var exit = sLogin.prev().prev();
    $(".shoppingCart span").html(localStorage.getItem("length")?localStorage.getItem("length"):0);
    if (exit.html() == "退出") {
        exit.bind("click", function () {
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