if (localStorage.nowLogin) {
    var sLogin = $("#login");
    sLogin.html(`亲爱的 ： ${JSON.parse(localStorage.nowLogin)[0].nick}，欢迎登录`).attr('href', '#');
    sLogin.next().next().html("退出").attr('href', '#');
    var exit = sLogin.next().next();
    if (exit.html() == "退出") {
        exit.bind("click", function () {
            localStorage.nowLogin = "";
            window.location.reload();
        })
    }
}

class Car {
    constructor(options) {
        this.url = options.url
        this.tbody = options.tbody;
        this.allP = 0;
        this.load();

        this.addEvent();
    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);

            that.goods = localStorage.buy ? JSON.parse(localStorage.buy) : [];
            that.display();
        })
    }
    display() {
        this.allP = 0;
        var str = "";
        var nowId = localStorage.nowLogin ? JSON.parse(localStorage.nowLogin)[0].id : "";
        $(".list-bottom").hide();

        if (nowId) {
            this.idx = 0;
            for (var i = 0; i < this.res.length; i++) {
                for (var j = 0; j < this.goods.length; j++) {
                    if (this.res[i].goodsId === this.goods[j].id && this.goods[j].buyId === nowId) {
                        this.idx++;
                        str += `<div class="list-item" index="${j}" pp="${i}">
                                    <div class="col-check">
                                        <s status="on">√</s>
                                    </div>
                                    <div class="col-img">
                                        <img src="${this.res[i].img}" alt="">
                                    </div>
                                    <div class="col-name">${this.res[i].name}</div>
                                    <div class="col-price"><b>${this.res[i].price}</b><b>元</b></div>
                                    <div class="col-num">
                                        <a href="javascript:void(0)" class="red">
                                            -
                                        </a>
                                        <input type="text" value="${Number(this.goods[j].num)}" onpropertychange="filtInput(event)"

                                        onInput="filtInput(event)" maxlength="3" >
                                        <a href="javascript:void(0)" class="add">
                                            +
                                        </a>
                                    </div>
                                    <div class="col-total"><i>${this.res[i].price * this.goods[j].num}</i><b>元</b></div>
                                    <div class="col-action"><i>&times;</i></div>
                                </div>`;

                        this.allP += Number(this.res[i].price * this.goods[j].num);
                        $(".list-bottom i b").html(`${this.allP}`);
                        $(".list-bottom").show();
                    }
                }
            }
            if (!this.goods.length) {
                str = "<div class='list-error'><a href='index.html'>还没有添加商品到购物车，继续购物</a></div>";
                $(".list-bottom").hide();
            }
        } else {
            str = "<div class='list-error'><a href='login.html'>还未登录，请登录</a></div>";
        };
        this.tbody.innerHTML = str;
        $(".list-bottom span").children().eq(0).html(this.idx);
        $(".list-bottom span").children().eq(1).html(this.idx);
        localStorage.setItem("length", $(".list-item").length);
    }
    addEvent() {
        var that = this;
        this.tbody.addEventListener("click", function (eve) {
            $(eve.target).bind("selectstart", function () {
                return false;
            });
            if (eve.target.className === "col-action") {
                that.id = eve.target.parentNode.getAttribute("index");
                eve.target.parentNode.remove();
                that.update(function (i) {
                    that.goods.splice(i, 1);
                });
            } else if (eve.target.parentNode.className === "col-action") {
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                eve.target.parentNode.parentNode.remove();
                that.update(function (i) {
                    that.goods.splice(i, 1);
                })
            }
            if (!$(".list-item").length) {
                $(".list-bottom").hide();
                that.tbody.innerHTML =
                    "<div class='list-error'><a href='index.html'>还没有添加商品到购物车，继续购物</a></div>";
            }
        })

        this.tbody.addEventListener("change", function (eve) {
            if (eve.target.tagName == "INPUT") {
                if (eve.target.value == false) {
                    $(eve.target).val(1)
                }
                that.id = eve.target.parentNode.parentNode.getAttribute("index");
                var onePrice = Number(eve.target.parentNode.previousElementSibling.firstElementChild
                    .innerHTML);

                eve.target.parentNode.nextElementSibling.firstElementChild.innerHTML = onePrice *
                    Number(eve.target.value);

                if (eve.target.parentNode.parentNode.firstElementChild.firstElementChild.getAttribute(
                        "status") === "on") {
                    that.allP = 0;
                    for (var i = 0; i < $(".col-total i").length; i++) {
                        that.allP += Number($(".col-total i")[i].innerHTML);
                    }
                    $(".list-bottom i b").html(`${that.allP}`);
                }
                that.update(function (i) {
                    that.goods[i].num = Number(eve.target.value);
                })
            }
        })

        this.tbody.addEventListener("click", function (eve) {
            if (eve.target.tagName == "S" && eve.target.getAttribute("status")) {
                var status = eve.target.getAttribute("status");
                if (status == "on") {
                    $(eve.target).css("background", "#e0e0e0");
                    $(eve.target).attr("status", "off");
                    that.allP -= Number(eve.target.parentNode.parentNode.lastElementChild
                        .previousElementSibling.firstElementChild.innerHTML);

                    that.idx--;
                } else if (status == "off") {
                    $(eve.target).css("background", "#ff6700");
                    $(eve.target).attr("status", "on");
                    that.allP += Number(eve.target.parentNode.parentNode.lastElementChild
                        .previousElementSibling.firstElementChild.innerHTML);

                    that.idx++;
                }
                for (var i = 0; i < $(".list-body .list-item s").length; i++) {
                    if ($(".list-body .list-item s").eq(i).attr("status") === "off") {
                        $("#allS").attr("status", "off");
                        $("#allS").css("background", "#e0e0e0");
                        break;
                    } else {
                        $("#allS").css("background", "#ff6700");
                    }

                }

                $(".list-bottom i b").html(`${that.allP}`);
                $(".list-bottom span").children().eq(1).html(that.idx);
            }
        })

        $(this.tbody).on("click", (e) => {
            that.id = e.target.parentNode.parentNode.getAttribute("index");
            that.pp = e.target.parentNode.parentNode.getAttribute("pp");
            var nownum = $(e.target.parentNode).children().eq(1).val();
            if (e.target.className == "red" && nownum > 1) {
                nownum--;
                $(e.target.parentNode.children).eq(1).val(nownum);
                if ($(e.target.parentNode.parentNode).children().eq(0).children().eq(0).attr(
                        "status") == "on") {
                    that.allP -= Number(that.res[that.pp].price);
                    $(".list-bottom i b").html(`${that.allP}`);
                    that.update(function (i) {
                        that.goods[i].num = nownum;
                    })
                }
                $(e.target.parentNode).next().children().eq(0).html(
                    `${Number($(e.target.parentNode).prev().children().eq(0).html()) * nownum}`);
            } else if (e.target.className == "add" && nownum < 999) {
                nownum++;
                $(e.target.parentNode.children).eq(1).val(nownum);
                if ($(e.target.parentNode.parentNode).children().eq(0).children().eq(0).attr(
                        "status") == "on") {
                    that.allP += Number(that.res[that.pp].price);
                    $(".list-bottom i b").html(`${that.allP}`);
                }
                $(e.target.parentNode).next().children().eq(0).html(
                    `${Number($(e.target.parentNode).prev().children().eq(0).html()) * nownum}`);
                that.update(function (i) {
                    that.goods[i].num = nownum;
                })
            }
        })
        $("#allS").on("click", () => {
            $("#allS").bind("selectstart", function () {
                return false;
            });
            var allSS = $("#allS").attr("status");
            if (allSS == "on") {
                $("#allS").attr("status", "off");
                $("#allS").css("background", "#e0e0e0");
                that.allP = 0;
                $(".list-body .list-item .col-check s").attr("status", "off");
                $(".list-body .list-item .col-check s").css("background", "#e0e0e0");
                that.idx = 0;
            } else if (allSS == "off") {
                that.allP = 0;
                $("#allS").attr("status", "on");
                $("#allS").css("background", "#ff6700");
                $(".list-body .list-item .col-check s").attr("status", "on");
                $(".list-body .list-item .col-check s").css("background", "#ff6700");
                that.idx = $(".list-item").length;
                for (var i = 0; i < $(".list-body .list-item .col-total i").length; i++) {
                    that.allP += Number($(".list-body .list-item .col-total i").eq(i).html())
                }
            }
            $(".list-bottom i b").html(`${that.allP}`);
            $(".list-bottom span").children().eq(1).html(that.idx);
        })
    }

    update(cb) {
        for (var i = 0; i < this.goods.length; i++) {
            if (i == this.id) {
                cb(i);
            }
        }
        localStorage.buy = JSON.stringify(this.goods);
    }
}
new Car({
    url: "http://localhost/1910-server/miShopping/library/goods.json",
    tbody: document.querySelector(".list-body")
})