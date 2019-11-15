class List {
    constructor(options) {
        this.cont = options.cont;
        this.url = options.url;

        this.load();

        this.addEvent();

    }
    load() {
        var that = this;
        ajaxGet(this.url, function (res) {
            that.res = JSON.parse(res);
            that.display()
        })
    }
    display() {
        var str = "";
        var str1 = "";
        for (var i = 0; i < (this.res.length / 2); i++) {
            str += `<li gid="${this.res[i].goodsId}">
                        <a gid="${this.res[i].goodsId}">
                            <div gid="${this.res[i].goodsId}">
                                <img src="${this.res[i].img}" alt="" gid="${this.res[i].goodsId}">
                            </div>
                            <h4 gid="${this.res[i].goodsId}">${this.res[i].name}</h4>
                            <p gid="${this.res[i].goodsId}">${this.res[i].des}</p>
                            <p class="jg" gid="${this.res[i].goodsId}">${this.res[i].price}<span gid="${this.res[i].goodsId}">元起</span></p>
                        </a>
                    </li>`;
        }
        for (let j = parseInt(this.res.length / 2); j < this.res.length; j++) {
            str1 += `<li gid="${this.res[j].goodsId}">
                        <a gid="${this.res[j].goodsId}">
                            <div gid="${this.res[j].goodsId}">
                                <img src="${this.res[j].img}" alt="" gid="${this.res[j].goodsId}">
                            </div>
                            <h4 gid="${this.res[j].goodsId}">${this.res[j].name}</h4>
                            <p gid="${this.res[j].goodsId}">${this.res[j].des}</p>
                            <p class="jg" gid="${this.res[j].goodsId}">${this.res[j].price}<span gid="${this.res[j].goodsId}">元起</span></p>
                        </a>
                    </li>`;
        }
        this.cont[0].innerHTML = str;
        this.cont[1].innerHTML = str1;
    }
    addEvent() {
        $(".json-list").on("click", function (e) {
            if (e.target.getAttribute("gid")) {
                localStorage.display = `${e.target.getAttribute("gid")}`;
                window.location.href = "list.html";
            }
        })
    }
}

new List({
    url: "http://localhost/1910-server/miShopping/library/goods.json",
    cont: document.querySelectorAll(".json-list")
});