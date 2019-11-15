$(document).ready(function () {
    var v = $('#reg-form').easyform();

    v.is_submit = false;

    v.error = function (ef, i, r) {
        //console.log("Error事件：" + i.id + "对象的值不符合" + r + "规则");
    };

    v.success = function (ef) {
        // console.log("成功");
    };

    v.complete = function (ef) {
        // console.log("完成");
    };
});



if (window.localStorage.userArr) {
    var array = JSON.parse(window.localStorage.userArr);
} else {
    array = [];
}

$("#reg").bind("click", function () {
    var username = $("#uid").val();
    var password = $("#psw1").val();
    var nickname = $("#nickname").val();
    for (var i = 0; i < array.length; i++) {
        if (username == array[i].username) {
            alert("该账号已存在");
            return;
        }
    }
    var obj = {
        username: username,
        password: password,
        nickname:nickname
    }
    array.push(obj);
    window.localStorage.userArr = JSON.stringify(array);
    alert("用户创建成功");
    window.location.href = "../miShopping/login.html";
})