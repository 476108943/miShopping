if (window.localStorage.userArr) {
    var array = JSON.parse(window.localStorage.userArr);
} else {
    array = [];
}

$("#logo-button").bind("click", function () {
    var username = $("#username").val();
    var password = $("#password").val();
    var flag = false;
    var index = 0;
    //遍历数组进行匹配
    for (var i = 0; i < array.length; i++) {
        //判断是否有相同账号
        if (username == array[i].username) { //有这个账号
            flag = true;
            index = i;
        }
    }
    if (flag) { //如果存在
        if (password == array[index].password) {
            alert("登录成功");
            localStorage.nowLogin = JSON.stringify([{
                nick:JSON.parse(localStorage.userArr)[index].nickname,
                id:JSON.parse(localStorage.userArr)[index].username}]);
            window.location.href = "../miShopping/index.html";
        } else {
            alert("密码错误");
        }
    } else { //账号不存在或输入错误
        $("#error").show().html("用户不存在，请先注册");
    }
})