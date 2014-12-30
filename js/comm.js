var ARRAY_WEEK_CN = ["\u5468\u65e5", "\u5468\u4e00", "\u5468\u4e8c", "\u5468\u4e09", "\u5468\u56db", "\u5468\u4e94", "\u5468\u516d"];
var HTML5_DEFAULT_IMG_300x300 = "/images/html5/default_300x300.gif";
var HTML5_DEFAULT_IMG_220x220 = "/images/html5/default_220x220.gif";
window.m_prefix = "m.jd.com_";
window.m_cityId = "cityId";
window.m_userCity = "userCity";
window.m_categoryId = "categoryId";
window.m_userCityDetail = "userCityDetail";
window.m_longitudeLatitude = "longitudeLatitude";
window.m_timeout = 1000 * 20;
window.m_waitText = "&#21162;&#21147;&#21152;&#36733;&#20013;&#46;&#46;&#46;";

function isNotBlank(a) {
    if (a == undefined || a == null || a == "null" || a == "undefined") {
        return false
    }
    return true
}

function isDigital(b) {
    var a = /^\d$/;
    return a.test(b)
}

function textLimit(d, c, b) {
    if (!d) {
        return false
    }
    var a = d.trim().length;
    if (a < c || a > b) {
        return false
    }
    return true
}

function testEmail(b) {
    var a = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+.[a-z][a-z.]{2,8}$/;
    return a.test(b)
}

function testGeolocation() {
    if (!!navigator.geolocation) {
        testGeolocation = function() {
            return true
        };
        return testGeolocation()
    }
    testGeolocation = function() {
        return false
    };
    return testGeolocation()
}

function testStorage() {
    return testSessionStorage() || testLocalStorage()
}

function testSessionStorage() {
    if (!!window.sessionStorage) {
        testSessionStorage = function() {
            return true
        }
    } else {
        testSessionStorage = function() {
            return false
        }
    }
    return testSessionStorage()
}

function testLocalStorage() {
    if (!!window.localStorage) {
        testLocalStorage = function() {
            return true
        }
    } else {
        testLocalStorage = function() {
            return false
        }
    }
    return testLocalStorage()
}

function json(v) {
    return eval("(" + v + ")")
}

function testPhone(b) {
    var a = /^1\d{10}$/;
    return a.test(b)
}

function createSpinner() {
    var a = {
        lines: 12,
        length: 6,
        width: 4,
        radius: 10,
        color: "#333",
        speed: 1,
        trail: 60,
        shadow: false,
        hwaccel: false
    };
    return new Spinner(a)
}
var addWare = function(b, g, f, c, j, d) {
    if (isNotBlank(f) && f) {
        var k = $("#newOrderServer").val();
        var h = "/cart/addDirOrder.json?wareId=" + b + "&num=" + g + (isNotBlank(f) && f ? "&isAjax=" + f : "") + "&resourceType=" + c + "&resourceValue=" + j + (isNotBlank(d) && (d != "") ? "&sid=" + d : "");
        var m = jQuery.get(h, function() {
            if (k == "true") {
                window.location.href = "/norder/order.action?wareId=" + b + "&enterOrder=true" + (isNotBlank(d) && (d != "") ? "&sid=" + $("#sid").val() : "")
            } else {
                window.location.href = "/order/order.action?wareId=" + b + "&enterOrder=true&yys=false&from=0" + (isNotBlank(d) && (d != "") ? "&sid=" + $("#sid").val() : "")
            }
        })
    } else {
        var e = createSpinner();
        $("#spinner2").show();
        e.spin($("#spinner2")[0]);
        if ($("#_mask")) {
            $("#_mask").remove()
        }
        var l = ((document.body || document.documentElement).clientHeight + 20) + "px";
        var a = "100%";
        var n = document.createElement("div");
        n.setAttribute("id", "_mask");
        n.setAttribute("style", "position:absolute;left:0px;top:0px;background-color:rgb(20, 20, 20);filter:alpha(opacity=60);opacity: 0.6;width:" + a + ";height:" + l + ";z-index:9998;");
        (document.body || document.documentElement).appendChild(n);
        var i = "/cart/add.json?wareId=" + b + "&num=" + g + (isNotBlank(f) && f ? "&isAjax=" + f : "") + "&resourceType=" + c + "&resourceValue=" + j + (isNotBlank(d) && (d != "") ? "&sid=" + d : "");
        var m = ajax(i, function(p) {
            e.stop();
            $("#spinner2").hide();
            var r = 100;
            var q = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            var s = document.documentElement.clientHeight || document.body.clientHeight;
            document.getElementById("cart").style.bottom = ((s - r) / 2 - q) + "px";
            var o = JSON.parse(p).sid;
            $("#sid").val(o);
            $("#goCart").click(function() {
                $("#_mask").hide();
                $("#cart").hide();
                window.location.href = "/cart/cart.action?sid=" + o
            });
            $("#cart").show()
        })
    }
};
var xmlHttp;
var ajax = function(b, e, d) {
    if (b.length == 0) {
        return ""
    }
    xmlHttp = c();
    if (xmlHttp == null) {
        return false
    }
    b = b + "&ran=" + Math.random();
    xmlHttp.onreadystatechange = a;
    xmlHttp.open("GET", b, true);
    xmlHttp.send(null);

    function a() {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
            e.call(this, xmlHttp.responseText, d)
        }
    }

    function c() {
        var f = null;
        try {
            f = new XMLHttpRequest()
        } catch (g) {
            try {
                f = new ActiveXObject("Msxml2.XMLHTTP")
            } catch (g) {
                f = new ActiveXObject("Microsoft.XMLHTTP")
            }
        }
        return f
    }
    return true
};
var addCart = function(h, a) {
    var d = $("#resourceType").val();
    var c = $("#resourceValue").val();
    if (d == null || d == "" || typeof(d) == undefined) {
        d = "unknown"
    }
    if (c == null || c == "" || typeof(c) == undefined) {
        c = "unknown"
    }
    if (!testLocalStorage()) {
        if (!!a) {
            location.href = "/cart/add.action?sid=" + a + "&wareId=" + h + "&resourceType=" + d + "&resourceValue=" + c
        } else {
            location.href = "/cart/add.action?wareId=" + h + "&resourceType=" + d + "&resourceValue=" + c
        }
        return
    }
    var e = window.localStorage.getItem("cartItem");
    if (e != null) {
        var g = JSON.parse(e);
        for (var b = 0; b <= g.length; b++) {
            if (g[b] != null && g[b].id == h) {
                g[b].num += 1;
                break
            } else {
                if (b == g.length) {
                    var f = new Object();
                    f.id = h;
                    f.num = 1;
                    f.resourceType = d;
                    f.resourceValue = c;
                    g[g.length] = f;
                    break
                }
            }
        }
    } else {
        g = new Array();
        var f = new Object();
        f.id = h;
        f.num = 1;
        f.resourceType = d;
        f.resourceValue = c;
        g[0] = f
    }
    window.localStorage.setItem("cartItem", JSON.stringify(g));
    updateToolBar()
};
var getCart = function() {
    if (!testLocalStorage()) {
        return
    }
    return window.localStorage.getItem("cartItem")
};
var clearCart = function() {
    if (!testLocalStorage()) {
        return
    }
    window.localStorage.removeItem("cartItem");
    updateToolBar()
};
var delCart = function(g, b, c, a) {
    if (!testLocalStorage()) {
        if (!!b) {
            location.href = "/cart/remove.action?sid=" + b + "&wareId=" + g + "&num=" + c
        } else {
            location.href = "/cart/remove.action?wareId=" + g + "&num=" + c
        }
        return
    }
    var e = window.localStorage.getItem("cartItem");
    if (e != null) {
        var f = JSON.parse(e);
        for (var d = 0; d < f.length; d++) {
            if (f[d].id == g) {
                f.splice(d, 1);
                break
            }
        }
        window.localStorage.setItem("cartItem", JSON.stringify(f))
    }
    if (a) {
        syncCart(b, true)
    }
    updateToolBar()
};
var updateCart = function(f, b, a) {
    if (!testLocalStorage()) {
        if (!!a) {
            location.href = "/cart/modify.action?sid=" + a + "&wareId=" + f + "&num=" + b
        } else {
            location.href = "/cart/modify.action?wareId=" + f + "&num=" + b
        }
        return
    }
    var d = window.localStorage.getItem("cartItem");
    if (d != null) {
        var e = JSON.parse(d);
        for (var c = 0; c < e.length; c++) {
            if (e[c].id == f) {
                e[c].num = Number(b);
                break
            }
        }
        window.localStorage.setItem("cartItem", JSON.stringify(e))
    }
    updateToolBar()
};
var updateToolBar = function(b) {
    if (!testLocalStorage()) {
        return
    }
    var d = 0;
    var c = window.localStorage.getItem("cartItem");
    if (c != null) {
        var e = JSON.parse(c);
        if (e != null) {
            for (var a = 0; a < e.length; a++) {
                d += Number(e[a].num)
            }
        }
    }
    if (d != 0) {
        $("#html5_cart_img").attr("src", "/images/html5/cartm.png");
        $("#html5_cart_img").attr("height", "22");
        $("#html5_cart_img").attr("width", "26")
    } else {
        $("#html5_cart_img").attr("src", "/images/html5/cart.png");
        $("#html5_cart_img").attr("height", "21");
        $("#html5_cart_img").attr("width", "22")
    }
};
var syncCart = function(sid, jump, callback) {
    var sourceType = $("#resourceType").val();
    var sourceValue = $("#resourceValue").val();
    if (sourceType == null || sourceType == "" || typeof(sourceType) == undefined) {
        sourceType = "unknown"
    }
    if (sourceValue == null || sourceValue == "" || typeof(sourceValue) == undefined) {
        sourceValue = "unknown"
    }
    if (!testLocalStorage()) {
        if (!!sid) {
            location.href = "/cart/cart.action?sid=" + sid + "&resourceType=" + sourceType + "&resourceValue=" + sourceValue
        } else {
            location.href = "/cart/cart.action?resourceType=" + sourceType + "&resourceValue=" + sourceValue
        }
        return
    }
    var paraJson = getCart();
    if (paraJson == null) {
        paraJson = ""
    }
    jQuery.get("/cart/update.json?sid=" + sid, {
        updatejson: paraJson
    }, function(data) {
        if (sid == "") {
            sid = data.sid
        }
        cartdata = eval("(" + data.cartDetail + ")");
        refreshLocalCart(cartdata, sid);
        if (jump || getCart() == null) {
            if (!!sid) {
                location.href = "/cart/cart.action?sid=" + sid
            } else {
                location.href = "/cart/cart.action"
            }
        } else {
            var oriPrice = cartdata.price - cartdata.discount;
            var realPrice = oriPrice - cartdata.rePrice;
            $("#cart_oriPrice").text(oriPrice.toFixed(2));
            $("#cart_rePrice").text(cartdata.rePrice.toFixed(2));
            $("#cart_realPrice").text(realPrice.toFixed(2));
            $("#cart_totalnum").text(cartdata.num);
            if (cartdata.message != null && cartdata.message != "") {
                $("#pay_tip").text(cartdata.message);
                $("#pay_tip_div").show()
            } else {
                $("#pay_tip_div").hide()
            }
        }
        if (callback != null) {
            $("#sid").val(sid);
            callback()
        }
    }, "json")
};
var refreshLocalCart = function(d, a) {
    if (typeof(d) != "undefined" && d != null) {
        if (d.skus != null && d.skus.length > 0) {
            for (var c = 0; c < d.skus.length; c++) {
                addCart(d.skus[c].Id, a);
                updateCart(d.skus[c].Id, d.skus[c].Num, a)
            }
        }
        if (d.suits != null && d.suits.length > 0) {
            for (var b = 0; b < d.suits.length; b++) {
                if (d.suits[b].Skus != null && d.suits[b].Skus.length > 0) {
                    for (var c = 0; c < d.suits[b].Skus.length; c++) {
                        addCart(d.suits[b].Skus[c].Id, a);
                        updateCart(d.suits[b].Skus[c].Id, d.suits[b].Skus[c].Num, a)
                    }
                }
            }
        }
        if (d.gifts != null && d.gifts.length > 0) {
            for (var c = 0; c < d.gifts.length; c++) {
                addCart(d.gifts[c].MainSku.Id, a);
                updateCart(d.gifts[c].MainSku.Id, d.gifts[c].MainSku.Num, a)
            }
        }
    }
};

function urlEncode(c, a, d) {
    var b = "";
    var e = c.split(".");
    b = b + e[0];
    if (d && d.length) {
        d.forEach(function(f) {
            b = b + "-";
            if (f && f != -1 && f != "-1") {
                b = b + f
            } else {
                b = b + "0"
            }
        })
    }
    b = b + "." + e[1];
    if (!!a) {
        if (/\?/.test(b)) {
            b = b + "&sid=" + a
        } else {
            b = b + "?sid=" + a
        }
    }
    return b
}

function hideWait(b, a) {
    a.stop();
    b.hide();
    b.next().show();
    $("header").show();
    $("footer").show()
}

function showWait(b, a) {
    b.show();
    b.next().hide();
    $("header").hide();
    $("footer").hide();
    a.spin(b[0])
}

function createPicMove(a, b, c) {
    var g = function(j) {
        return "string" == typeof j ? document.getElementById(j) : j
    };
    var d = function(j, l) {
        for (var k in l) {
            j[k] = l[k]
        }
        return j
    };
    var f = function(j) {
        return j.currentStyle || document.defaultView.getComputedStyle(j, null)
    };
    var i = function(l, j) {
        var k = Array.prototype.slice.call(arguments).slice(2);
        return function() {
            return j.apply(l, k.concat(Array.prototype.slice.call(arguments)))
        }
    };
    var e = {
        Quart: {
            easeOut: function(k, j, m, l) {
                return -m * ((k = k / l - 1) * k * k * k - 1) + j
            }
        },
        Back: {
            easeOut: function(k, j, n, m, l) {
                if (l == undefined) {
                    l = 1.70158
                }
                return n * ((k = k / m - 1) * k * ((l + 1) * k + l) + 1) + j
            }
        },
        Bounce: {
            easeOut: function(k, j, m, l) {
                if ((k /= l) < (1 / 2.75)) {
                    return m * (7.5625 * k * k) + j
                } else {
                    if (k < (2 / 2.75)) {
                        return m * (7.5625 * (k -= (1.5 / 2.75)) * k + 0.75) + j
                    } else {
                        if (k < (2.5 / 2.75)) {
                            return m * (7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375) + j
                        } else {
                            return m * (7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375) + j
                        }
                    }
                }
            }
        }
    };
    var h = function(k, n, m, l) {
        this._slider = g(n);
        this._container = g(k);
        this._timer = null;
        this._count = Math.abs(m);
        this._target = 0;
        this._t = this._b = this._c = 0;
        this.Index = 0;
        this.SetOptions(l);
        this.Auto = !!this.options.Auto;
        this.Duration = Math.abs(this.options.Duration);
        this.Time = Math.abs(this.options.Time);
        this.Pause = Math.abs(this.options.Pause);
        this.Tween = this.options.Tween;
        this.onStart = this.options.onStart;
        this.onFinish = this.options.onFinish;
        var j = !!this.options.Vertical;
        this._css = j ? "top" : "left";
        var o = f(this._container).position;
        o == "relative" || o == "absolute" || (this._container.style.position = "relative");
        this._container.style.overflow = "hidden";
        this._slider.style.position = "absolute";
        this.Change = this.options.Change ? this.options.Change : this._slider[j ? "offsetHeight" : "offsetWidth"] / this._count
    };
    h.prototype = {
        SetOptions: function(j) {
            this.options = {
                Vertical: true,
                Auto: true,
                Change: 0,
                Duration: 50,
                Time: 10,
                Pause: 4000,
                onStart: function() {},
                onFinish: function() {},
                Tween: e.Quart.easeOut
            };
            d(this.options, j || {})
        },
        Run: function(j) {
            j == undefined && (j = this.Index);
            j < 0 && (j = this._count - 1) || j >= this._count && (j = 0);
            this._target = -Math.abs(this.Change) * (this.Index = j);
            this._t = 0;
            this._b = parseInt(f(this._slider)[this.options.Vertical ? "top" : "left"]);
            this._c = this._target - this._b;
            this.onStart();
            this.Move()
        },
        Move: function() {
            clearTimeout(this._timer);
            if (this._c && this._t < this.Duration) {
                this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
                this._timer = setTimeout(i(this, this.Move), this.Time)
            } else {
                this.MoveTo(this._target);
                this.Auto && (this._timer = setTimeout(i(this, this.Next), this.Pause))
            }
        },
        MoveTo: function(j) {
            this._slider.style[this._css] = j + "px"
        },
        Next: function() {
            this.Run(++this.Index)
        },
        Previous: function() {
            this.Run(--this.Index)
        },
        Stop: function() {
            clearTimeout(this._timer);
            this.MoveTo(this._target)
        }
    };
    return new h(a, b, c, {
        Vertical: false
    })
}

function bind(c, a) {
    var b = Array.prototype.slice.call(arguments).slice(2);
    return function() {
        return a.apply(c, b.concat(Array.prototype.slice.call(arguments)))
    }
}

function userLocation(c, b) {
    function a(d, g) {
        var f = "&#33719;&#21462;&#22833;&#36133;<a onclick='getUserLocation();' style='color:blue;font-size:0.8125em;padding-left:15px;' href=''>&#26356;&#26032;</a>";
        $("#" + c).html(m_waitText);
        var e = window.setTimeout(function() {
            $("#" + c).html(f)
        }, window.m_timeout);
        if (testGeolocation()) {
            navigator.geolocation.getCurrentPosition(function(h) {
                var j = h.coords.latitude;
                var i = h.coords.longitude;
                jQuery.get("/tuan/location.json", {
                    latitude: j,
                    longitude: i
                }, bind(this, function(m, n) {
                    if (n.status) {
                        window.clearTimeout(e);
                        if (n.cityId) {
                            var k = n.location.city + n.location.subCity;
                            var l = n.location.fullNames;
                            if (testStorage()) {
                                setCityId(n.cityId);
                                setLongitudeLatitude(j + "," + i);
                                setUserCity(k);
                                setUserCityDetail(l)
                            }
                            l = l + "<span  style='color:blue;font-size:0.875em;padding-left:15px;' href=''>&#26356;&#26032;</span>";
                            k = k + "<span  style='color:blue;font-size:0.875em;padding-left:15px;' href=''>&#26356;&#26032;</span>";
                            if (!!m) {
                                $("#" + c).html(k)
                            } else {
                                $("#" + c).html(l)
                            }
                        } else {
                            $("#" + c).html(f)
                        }
                    }
                }, d), "json")
            }, function() {
                $("#" + c).html(f);
                window.clearTimeout(e)
            }, {
                timeout: 5000
            })
        }
        g.preventDefault()
    }
    if (!!b) {
        $("#" + b).click(bind(this, a, b))
    } else {
        $("#" + c).click(bind(this, a, b))
    }
}

function registerUnloadEvent(b, a) {
    document.body.onunload = function() {
        hideWait(b, a)
    }
}

function writeTipVal(a) {
    if (a != "") {
        $("#keyword").val(a);
        $("#shelper").html("");
        $("#searchForm").submit()
    }
}

function closeTip() {
    $("#shelper").html("");
    $("#shelper").hide()
}
var old_keyword = "";
var old_keyword2 = "";

function searchTipContent() {
    var a = $("#keyword").val().trim();
    if (a == "") {
        old_keyword = "";
        $("#shelper").html("");
        $("#shelper").hide()
    } else {
        if (a == old_keyword || a == old_keyword2) {} else {
            $("#shelper").show();
            $("#keyword").removeAttr("style");
            a = $("#keyword").val().trim();
            old_keyword = a;
            jQuery.get("/ware/searchTip.action?", {
                keyword: a
            }, function(b) {
                if (b != null) {
                    $("#shelper").html(b)
                } else {
                    $("#shelper").html("")
                }
            })
        }
    }
    setTimeout("searchTipContent()", 500)
}
$(function() {
    $(".search input").attr("autocomplete", "off");
    if (jQuery("#keyword").length > 0) {
        old_keyword = $("#keyword").val().trim();
        searchTipContent();
        old_keyword2 = old_keyword;
        $("#keyword").focus(function() {
            if (old_keyword2 == $("#keyword").val().trim()) {
                $("#keyword").val("")
            }
        });
        $("#keyword").blur(function() {
            if ($("#keyword").val().trim() == "") {
                $("#keyword").val(old_keyword2);
                $("#keyword").attr("style", "color:#999999;")
            }
        })
    }
});

function getCityId() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_cityId)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_cityId)
        }
    }
    return a || 0
}

function getUserCity() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_userCity)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_userCity)
        }
    }
    return a || null
}

function getUserCityDetail() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_userCityDetail)
    } else {
        if (testSessionStorage()) {
            a = window.sessionStorage.getItem(m_prefix + m_userCityDetail)
        }
    }
    return a || null
}

function getCategoryId() {
    var a;
    if (testLocalStorage()) {
        a = window.localStorage.getItem(m_prefix + m_categoryId)
    } else {
        if (testSessionStorage) {
            a = window.sessionStorage.getItem(m_prefix + m_categoryId)
        }
    }
    return a || 0
}

function getLongitudeLatitude() {
    var a;
    if (testSessionStorage()) {
        a = window.sessionStorage.getItem(m_prefix + m_longitudeLatitude)
    }
    return a || null
}

function setCityId(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_cityId, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_cityId, a)
            }
        }
    }
}

function setUserCity(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_userCity, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_userCity, a)
            }
        }
    }
}

function setUserCityDetail(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_userCityDetail, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_userCityDetail, a)
            }
        }
    }
}

function setCategoryId(a) {
    if (!!a) {
        if (testLocalStorage()) {
            window.localStorage.setItem(m_prefix + m_categoryId, a)
        } else {
            if (testSessionStorage()) {
                window.sessionStorage.setItem(m_prefix + m_categoryId, a)
            }
        }
    }
}

function setLongitudeLatitude(a) {
    if (!!a) {
        if (testSessionStorage()) {
            window.sessionStorage.setItem(m_prefix + m_longitudeLatitude, a)
        }
    }
}

function goTuanIndex(a) {
    var g, c;
    try {
        g = getCityId();
        c = getCategoryId()
    } catch (d) {}!!g || (g = 0);
    !!c || (c = 0);
    var f = [g, c, 0, 0, 1];
    var b = urlEncode("/tuan/index.html", a, f);
    return b || "#"
}

function priceTransform(a) {
    try {
        return parseFloat(a).toFixed(1)
    } catch (b) {
        return a
    }
    return a
}

function getDiscount(d, c) {
    var b = (d - c).toString();
    var a = b.indexOf(".");
    if (a > 0) {
        b = b.substring(0, b.indexOf(".") + 2)
    }
    return b
}
document.ontouchend = function() {
    $("#hideInput").remove();
    $("#con_more").append('<label style="height:0px;font-size:0pt;" id="hideInput">&nbsp;</label>')
};

function strlen(d) {
    var a = 0;
    for (var b = 0; b < d.length; b++) {
        var e = d.charCodeAt(b);
        if ((e >= 1 && e <= 126) || (65376 <= e && e <= 65439)) {
            a++
        } else {
            a += 2
        }
    }
    return a
}

function changePage(b, c) {
    var a = document.paging;
    !!a.startSpinner && a.startSpinner();
    jQuery.get(b, {
        page: c
    }, function(d) {
        a.set("page", c);
        a.show();
        a.callbackFun(d)
    }, "json")
}

function Paging(a) {
    document.paging = this;
    this.component = jQuery("#" + a.fillId);
    this.startSpinner = a.startSpinner;
    this.stopSpinner = a.stopSpinner;
    this.num = parseInt(a.num, 10) || 5;
    this.count = parseInt(a.count, 10);
    this.page = parseInt(a.page, 10);
    this.totalPage = parseInt(a.totalPage, 10);
    this.message = a.message || "&#26242;&#26080;&#25968;&#25454;";
    this.url = a.url || "";
    this.callbackFun = a.callback1;
    this.isShowBotton = a.isShowBotton;
    this.isShowNum = a.isShowNum;
    if (this.isShowBotton == undefined) {
        this.isShowBotton = true
    }
    if (this.isShowNum == undefined) {
        this.isShowNum = true
    }
    this.set = function(b, c) {
        this[b] = c
    };
    this.show = function() {
        this.component.empty();
        if (!!this.count && this.count > 0) {
            if (!!this.isShowBotton && this.totalPage > 1) {
                if (this.page <= this.totalPage && this.page > 1) {
                    this.component.append('<a class="pre" onclick=changePage("' + this.url + '",' + ((this.page - 1)) + ");><span></span>&#19978;&#19968;&#39029;</a>")
                } else {
                    this.component.append('<a class="dis-buttom"  "style=color:gray;">&#19978;&#19968;&#39029;</a>')
                }
                this.component.append("&nbsp;&nbsp;" + this.page + "/" + this.totalPage + "&nbsp;&nbsp;&nbsp;");
                if (this.page < this.totalPage) {
                    this.component.append('<a class="next" onclick=changePage("' + this.url + '",' + (this.page + 1) + ")>&#19979;&#19968;&#39029;<span></span></a>")
                } else {
                    this.component.append('<a class="dis-buttom" "style=color:gray;">&#19979;&#19968;&#39029;</a>')
                }
                this.component.append(" <br /><br />")
            }
            if (!!this.isShowNum && this.totalPage > 2) {
                if (this.totalPage < this.num) {
                    for (var c = 1; c <= this.totalPage; c++) {
                        if (this.page == c) {
                            this.component.append('<a  style="color:gray;">&nbsp;&nbsp;&nbsp;' + c + "&nbsp;&nbsp;&nbsp;</a>")
                        } else {
                            this.component.append('<a onclick=changePage("' + this.url + '",' + c + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + c + "&nbsp;&nbsp;&nbsp;</a>")
                        }
                    }
                } else {
                    var b = Math.floor(this.num / 2);
                    var f = this.totalPage - this.page;
                    var e = 0;
                    var d = 0;
                    if (this.page <= b) {
                        e = this.page - 1;
                        d = this.num - this.page
                    } else {
                        if (f >= b) {
                            if (this.num & 1) {
                                e = b
                            } else {
                                e = b - 1
                            }
                            d = b
                        } else {
                            e = this.num - f - 1;
                            d = f
                        }
                    }
                    for (var c = e; c >= 1; c--) {
                        this.component.append('<a onclick=changePage("' + this.url + '",' + (this.page - c) + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + (this.page - c) + "&nbsp;&nbsp;&nbsp;</a>")
                    }
                    this.component.append('<a style="color:gray;">&nbsp;&nbsp;&nbsp;' + this.page + "&nbsp;&nbsp;&nbsp;</a>");
                    for (var c = 1; c <= d; c++) {
                        this.component.append('<a onclick=changePage("' + this.url + '",' + (this.page + c) + '); style="color:black;">&nbsp;&nbsp;&nbsp;' + (this.page + c) + "&nbsp;&nbsp;&nbsp;</a>")
                    }
                }
            }
        } else {
            this.component.append('<div class="item radius" style="margin-top:20px;">' + this.message + "</div>")
        }
        this.component.append(" <br /><br />")
    }
}

function pageBack() {
    var a = window.location.href;
    if (/#top/.test(a)) {
        window.history.go(-2);
        window.location.load(window.location.href)
    } else {
        window.history.back();
        window.location.load(window.location.href)
    }
}

function backPassLoginPage() {
    if (window.name == "login") {
        window.name = "";
        window.history.go(-2)
    } else {
        window.history.back()
    }
}
Date.prototype.dateAdd = function(interval, number) {
    var d = this;
    var k = {
        y: "FullYear",
        q: "Month",
        m: "Month",
        w: "Date",
        d: "Date",
        h: "Hours",
        n: "Minutes",
        s: "Seconds",
        ms: "MilliSeconds"
    };
    var n = {
        q: 3,
        w: 7
    };
    eval("d.set" + k[interval] + "(d.get" + k[interval] + "()+" + ((n[interval] || 1) * number) + ")");
    return d
};
Date.prototype.dateDiff = function(b, a) {
    var g = this,
        e = {},
        c = g.getTime(),
        f = a.getTime();
    e.y = a.getFullYear() - g.getFullYear();
    e.q = e.y * 4 + Math.floor(a.getMonth() / 4) - Math.floor(g.getMonth() / 4);
    e.m = e.y * 12 + a.getMonth() - g.getMonth();
    e.ms = a.getTime() - g.getTime();
    e.w = Math.floor((f + 345600000) / (604800000)) - Math.floor((c + 345600000) / (604800000));
    e.d = Math.floor(f / 86400000) - Math.floor(c / 86400000);
    e.h = Math.floor(f / 3600000) - Math.floor(c / 3600000);
    e.n = Math.floor(f / 60000) - Math.floor(c / 60000);
    e.s = Math.floor(f / 1000) - Math.floor(c / 1000);
    return e[b]
};
var getDate = function(a) {
    var f = /^(\d{4})-(\d{2})-(\d{2})$/.exec(a);
    var c = parseInt(f[1], 10);
    var e = parseInt(f[2], 10) - 1;
    var b = parseInt(f[3], 10);
    var d = new Date();
    d.setFullYear(c);
    d.setMonth(e);
    d.setDate(b);
    return d
};

function clearHistory() {
    jQuery.get("/ware/deleteHistory.json", {}, function(a) {
        $("#shelper").html("");
        $("#shelper").hide()
    })
}

function cancelHotWord() {
    $("#newkeyword").val("");
    $("#newkeyword").focus()
}

function writeSuggestion(a) {
    if (a != "") {
        $("#newkeyword").val(a);
        $("#shelper").html("");
        $("#searchForm").submit()
    }
}

function closeSuggestion() {
    $("#shelper").html("");
    $("#shelper").hide()
}
var global_searbox_focus = false;
var search_old = "";
var search_old2 = "";

function searchSuggestionContent() {
    var d = $("#newkeyword").val().trim();
    if (d == "") {
        search_old = "";
        $("#shelper").html("");
        $("#shelper").hide();
        var h = "searchhistory";
        var g = document.cookie.indexOf(h + "=");
        if (g != -1) {
            g = g + h.length + 1;
            var c = document.cookie.indexOf(";", g);
            if (c == -1) {
                c = document.cookie.length
            }
            var b = document.cookie.substring(g, c);
            if (b != null && b.length > 0) {
                b = decodeURIComponent(b);
                var a = b.split("|");
                if (a.length > 0) {
                    var f = "<ul>";
                    for (var e = 0; e < a.length; e++) {
                        if (a[e] != "") {
                            f += "<li><a onclick=\"writeSuggestion('" + a[e] + '\')" href="javascript:void(0);" ' + (search_old == a[e] ? 'class="on"' : "") + ">" + a[e] + "</a></li>"
                        }
                    }
                    f += '</ul><div class="new-tbl-type"><a href="javascript:void(0);" onclick="clearHistory()" class="new-tbl-cell">&#28165;&#38500;&#21382;&#21490;&#35760;&#24405;</a><span class="new-bar"></span><a href="javascript:void(0)" onclick="closeTip()" class="new-tbl-cell">&#20851;&#38381;</a></div>';
                    $("#shelper").html(f);
                    if (global_searbox_focus) {
                        $("#shelper").show()
                    }
                } else {
                    $("#shelper").html("");
                    $("#shelper").hide()
                }
            } else {
                $("#shelper").html("");
                $("#shelper").hide()
            }
        }
    } else {
        if (d == search_old || d == search_old2) {} else {
            d = $("#newkeyword").val().trim();
            search_old = d;
            jQuery.get("/ware/searchSuggestion.action?", {
                keyword: d
            }, function(i) {
                if (i != null) {
                    $("#shelper").html(i);
                    $("#shelper").show()
                } else {
                    $("#shelper").html("");
                    $("#shelper").hide()
                }
            })
        }
    }
    setTimeout("searchSuggestionContent()", 500)
}
$(function() {
    $(".search input").attr("autocomplete", "off");
    if (jQuery("#newkeyword").length > 0) {
        search_old = $("#newkeyword").val().trim();
        searchSuggestionContent();
        search_old2 = search_old;
        $("#newkeyword").focus(function() {
            global_searbox_focus = true;
            if (search_old2 == $("#newkeyword").val().trim() && $("#newkeyword").attr("cleardefault") != "no") {
                $("#newkeyword").val("")
            }
        });
        $("#newkeyword").blur(function() {
            global_searbox_focus = false;
            if ($("#newkeyword").val().trim() == "") {
                $("#newkeyword").val(search_old2);
                $("#newkeyword").attr("style", "color:#999999;")
            }
        })
    }
    if ($("#btnJdkey")) {
        $("#btnJdkey").click(function() {
            if ($("#jdkey").css("display") == "none") {
                $("#jdkey").show()
            } else {
                $("#jdkey").hide()
            }
        })
    }
    var a = window.location.href.replace(/(^http:\/\/)|(\/*$)/g, "");
    if (a.indexOf("/") < 0 || (a.split("/").length <= 2 && a.indexOf("/index") >= 0)) {
        $("#jdkey .new-tbl-cell").eq(0).children().addClass("on")
    }
    if (a.indexOf("/category/all.html") > -1) {
        $("#jdkey .new-tbl-cell").eq(1).children().addClass("on")
    }
    if (a.indexOf("/cart/cart.action") > -1) {
        $("#jdkey .new-tbl-cell").eq(2).children().addClass("on")
    }
    if (a.indexOf("/user/") > -1) {
        $("#jdkey .new-tbl-cell").eq(3).children().addClass("on")
    }
    if ($("#btnJdBox")) {
        $("#btnJdBox").click(function() {
            $("#_jdBox").hide();
            $("#_jdSearch").show();
            $("#newkeyword").focus()
        })
    }
    if ($("#_cancelSearch")) {
        $("#_cancelSearch").click(function() {
            closeSuggestion();
            $("#_jdSearch").hide();
            $("#_jdBox").show()
        })
    }
});
(function(a) {
    var b = function() {
        var h = $(a).height();
        var g = $("img[imgsrc]");
        var f = $(a).scrollTop();
        for (var d = 0, c = g.size(); d < c; d++) {
            currentObj = $(g[d]);
            var e = currentObj.offset().top - h - 200;
            if (parseInt(f) >= parseInt(e)) {
                currentObj.attr("src", currentObj.attr("imgsrc"));
                currentObj.removeAttr("imgsrc")
            }
        }
    };
    $(function() {
        b()
    });
    a.onscroll = b;
    a.onresize = b
})(window);
(function(f) {
    var a = {
        mainStayId: "mainStay",
        mainLayoutId: "mainLayout",
        transitionDual: 0.4
    };
    var h;

    function i() {
        if (h == "") {
            h = "#!" + a.mainStayId
        }
        return h
    }

    function d(j) {
        h = j
    }

    function e() {
        return f.location.hash
    }

    function b() {
        var j = e();
        if (j == "" || j == "#" || j == "#!") {
            return "#!" + a.mainStayId
        }
        return j
    }

    function c(j) {
        if (j.length > 2 && j.indexOf("#!") == 0) {
            return j.substring(2)
        }
        return ""
    }

    function g() {
        var l = i();
        var k = b();
        if (l.indexOf("#!") < 0 || k.indexOf("#!") < 0) {
            return
        }
        if (l != "#!" + a.mainStayId && k != "#!" + a.mainStayId) {
            document.getElementById(a.mainStayId).style.display = "none"
        }
        if (!document.getElementById(a.mainLayoutId)) {
            return
        }
        var j = document.getElementById(a.mainLayoutId).getAttribute("style");
        j = j == null ? "" : j;
        document.getElementById(a.mainLayoutId).setAttribute("style", j + "width:200%;-webkit-transform:translate3d(" + (k == "#!" + a.mainStayId ? "-50%" : "0px") + ",0px,0px);");
        document.getElementById(c(k)).style.display = "";
        setTimeout(function() {
            document.getElementById(a.mainLayoutId).setAttribute("style", j + "width:200%;-webkit-transform:translateX(" + (k == "#!" + a.mainStayId ? "0px" : "-50%") + ");-webkit-transition:" + a.transitionDual + "s ease-out;transition:" + a.transitionDual + "s ease-out;")
        }, 10);
        setTimeout(function() {
            if (l != k) {
                document.getElementById(c(l)).style.display = "none"
            }
            var m;
            if (navigator && navigator.userAgent) {
                m = navigator.userAgent.toUpperCase()
            }
            document.getElementById(a.mainLayoutId).setAttribute("style", j);
            f.scrollTo(0, 0)
        }, a.transitionDual * 1000);
        d(e())
    }
    $(function() {
        d(f.location.hash);
        if ("onhashchange" in f && (document.documentMode === undefined || document.documentMode > 7)) {
            f.onhashchange = g
        } else {
            f.onclick = function() {}
        }
        if ($("#" + a.mainStayId)) {
            if ($("#" + a.mainStayId).css("display") != "none" && f.location.hash.indexOf("#!") > -1 && f.location.hash != "" && f.location.hash != "#" + a.mainStayId) {
                var j = f.location.href;
                j = j.substring(0, j.indexOf("#!"));
                f.history.pushState(null, "", j)
            }
        }
    })
})(window);
(function(b) {
    var a;
    if (navigator && navigator.userAgent) {
        a = navigator.userAgent.toUpperCase()
    }
    $(function() {
        if (a.indexOf("ANDROID") > -1) {
            $("body").addClass("a")
        } else {
            if (a.indexOf("IPHONE") > -1) {
                $("body").addClass("s")
            }
        }
    })
})(window);
$(function() {
    var a;
    if (navigator && navigator.userAgent) {
        a = navigator.userAgent.toUpperCase()
    }
    if (a && a.indexOf("UC") > -1) {
        $("#toPcHome").hide()
    }
});
var anima = function(e, d, h, a, g) {
    var b = e / d;
    var f = a - h;
    var c = function(j) {
        var i = h + j / d * f;
        g.apply(null, [j, i]);
        if (j < d) {
            setTimeout(function() {
                c(j + 1)
            }, b)
        }
    };
    c(0)
};

$.fn.extend({
	//判断对象是否可见
	visible:function(){return this.is(':visible');},
	//替换CSS
	cssR:function(c1,c2){this.removeClass(c1);this.addClass(c2);},
	//在对象内部存入数据
	htm:function(s){if(this.length==0)return false;if($.no(s))return this[0].innerHTML;for(var i=0;i<this.length;i++)this[i].innerHTML=s;return true;},
	//焦点延迟处理
	f:function(){var t=this,f=function(){t.focus()};setTimeout(f,100);}
});
$.extend({
	_:function(s){if($.no(s))s=$.t();document.title=s;},
	//获取对象(不带缓存)
	$:function(o){return $.isS(o)?$('#'+o):$(o);},
	//获取对象(带缓存)
	o:function(o){if(!$.isS(o))return $(o);var obj=$.os[o];if(obj)return obj;obj=$('#'+o);if(obj.length>0)$.os[o]=obj;return obj;},os:{},
	//获取对象值
	v:function(o,v){if(v)$.$(o).val(v);else{return $.trim($.$(o).val());}},
	//返回当前时间
	t:function(){return $.d().getTime();},
	//返回当前时间对象
	d:function(t){if(t)return new Date(t);return new Date()},
	//转换成整数
	n:function(s){return parseInt(s);},
	//转换成浮点数
	f:function(s){return parseFloat(s);},
	//判断对象是否存在
	no:function(){var as=arguments;for(var i=0;i<as.length;i++)if(as[i]==null || as[i]==undefined)return true;return false;},
	//判断对象类型
	isS:function(o){return typeof o=="string"},
	isN:function(o){return typeof o=="number"},
	isB:function(o){return typeof o=="boolean"},
	isO:function(o){return typeof o=="object"},
	//是否包含指定内容
	cc:function(cs,c,n){var e=!$.no(n);for(var i=0;i<cs.length;i++)if((e && cs[i][n]==c) || (!e && cs[i]==c))return i;return -1;},
	//返回RegExp
	re:function(s,c){var r=new RegExp(s);if(c)return r.test(c);return r;},
	//是否IE浏览器
	ie:function(v){if(!$.browser.msie)return false;if(v)return $.browser.version==v || $.browser.version.indexOf(v+'.')==0;return true;},
	//创建DOC对象
	ceok:false,
	ce:function(n){return $(document.createElement(n));},
	//从字符串中获取第一个数值
	nv:function(s,sv){var si=-1,ei=-1,i=0;if(sv){i=s.indexOf(sv);if(i<0)i=0;}for(;i<s.length;i++)if(si==-1){if(s.charAt(i)>='0' && s.charAt(i)<='9')si=i;}else{if(s.charAt(i)<'0' || s.charAt(i)>'9'){ei=i;break;}}return $.n(si==-1 && ei==-1 ? -1 : (ei==-1 ? s.substr(si) : s.substring(si,ei)));},
	//数值四舍五入
	round:function(n,mantissa){if(!mantissa)mantissa=0;if(mantissa<=0)return Math.round(n);var v=1;for(var i=0;i<mantissa;i++)v*=10;return Math.round(n*v)/v;},
	//字符串替换
	replace:function(s,s1,s2){return s.replace(new RegExp(s1,'g'),s2);},
	//字符串长度(中文算2个)
	strlen:function(s){return s.replace(/[^\x00-\xff]/g,"**").length},
	//字符串是否包含中文
	strch:function(s){return /[^\x00-\xff]+/.test(s)},
	//清除字符串中的'"字符和头尾空格
	clear:function(){var as=arguments,s;if(as.length<1)return '';s=as[0];if(as.length<2)as=[s,"'",'"'];for(var i=1;i<as.length;i++)s=$.replace(s,as[i],'');return $.trim(s);},
	//cookie操作
	getCookie:function(name,dv){var d=document.cookie;var il1=d.indexOf(name+'=');if(il1==-1)return $.no(dv) ? null : dv;il1+=name.length+1;var il2=d.indexOf(';',il1);if(il2==-1)il2=d.length;return unescape(d.substring(il1,il2));},
	setCookie:function(name,value,expires,path,domain,secure){var s=new Text()._(name)._('=')._(escape(value));if(!expires || (expires && expires!='temp')){var day=60*60*24*1000;if(expires=='day')expires=$.d($.t()+day);else if(expires=='week')expires=$.d($.t()+day*7);else if(expires=='month')expires=$.d($.t()+day*30);else if(expires=='year')expires=$.d($.t()+day*365);else{expires=$.d($.t()+day*365*100);}s._(';expires=')._(expires.toGMTString());}if(path)s._(';path=')._(path);if(domain)s._(';domain=')._(domain);if(secure)s._(';secure=')._(secure);document.cookie=s;},
	delCookie:function(name,path,domain){var s=new Text()._(name)._('=null;expires=')._($.d($.t()-100000000).toGMTString());if(path)s._(';path=')._(path);if(domain!=null)s._(';domain=')._(domain);document.cookie=s;},
	clrCookie:function(path,domain){var ds=document.cookie.split(';');for(var i=0;i<ds.length;i++)$.delCookie($.trim(ds[i].split('=')[0]),path,domain);},
	//获取Flash对象
	getFlash:function(name){if($.ie())return window[name];else if($.browser.mozilla)return document[name+'-1'];else{var fl=window[name+'-1'];if(!fl)fl=window[name];if(!fl)fl=document[name+'-1'];return fl;}},
	//初始化对象
	init:function(o,dv){if(!o)return dv;for(i in dv)if($.no(o[i]))o[i]=dv[i];return o;}
});
function Text(){this.s;this.b=[];};Text.prototype={
	_:function(s){var t=this;t.b.push(s);t.s=null;return t;},
	clear:function(){this.b=[];this.s=null;},
	length:function(){return this.ts().length;},
	toHtml:function(o){o=$.$(o);if(o.length==0)return;o[0].innerHTML=this.ts();},
	toString:function(){var t=this;if(!t.s)t.s=t.b.join('');return t.s;},
	ts:function(){return this.toString();}
};
var X = {
	//返回当前可用z-index值
	zi:function(){return X._zi++;},_zi:10001,
	//返回页面空间
	pso:null,
	ps:function(){if(X.pso)return X.pso;X.wdb();X.pso={width:X.win.width(),height:X.win.height(),left:X.doc.scrollLeft(),top:X.doc.scrollTop()};return X.pso;},
	//初始化WinDocBody
	win:null,doc:null,body:null,
	wdb:function(){if(!X.win){X.win=$(window);X.doc=$(document);X.body=$(document.body);}}
};
//对话框
X.dialog={
	//打开的对话框、提示框、选择框、消息框、加载框索引
	dbs:[],pbs:[],sel:null,mbs:[],ls:[],
	//打开对话框 ps:topic(对话框主题名称),width,notify
	//标准内容间距，控件上下20/左右30，文字四周30，带topic的上15
	//db[索引，宽度，高度，信息层，背景层，回调]
	open:function(content,ps){
		ps=$.init(ps,{topic:'',width:280,notify:null});
		var t=this,w=ps.width,bgi=X.zi(),di=X.zi(),db=[di,w],p=X.ps(),ww=p.width,wh=p.height,dl=$.round((ww-w)/2),dt=-30,s=new Text();
		if(dl<10)dl=10;

		if(content)s._($.replace(content,'#di#',di));

		db[3]=$.ce('div');
		db[3].addClass('db-bg');
		db[3].css('zIndex',bgi);
		db[3].attr('id','dialog-bg-'+di);
		db[4]=$.ce('div');
		db[4].addClass('db-wrap');
		db[4].css('zIndex',di);
		db[4].css('width',w+'px');
		db[4].css('left',dl+'px');
		db[4].css('display','none');
		db[4].attr('id','dialog-'+di);
		db[4].html(s.ts());
		db[5]=ps.notify;
		X.body.append(db[3],db[4]);
		db[2]=db[4].height();
		dt=$.round((wh-db[2])/2+dt);
		if(dt<10)dt=10;
		db[4].css('top',dt+'px');
		db[4].show();
		t.dbs.push(db);
	},
	//提醒对话框 ps:title,msg,icon,width,btn(按钮名称),notify
	alert:function(msg,ps){
		ps=$.init(ps,{title:'',msg:msg,width:280,btn:'确定'});
		if(ps.width<180)ps.width=180;
		var t=this,s=new Text();
		if(ps.title){
			s._('<div class="db-title">')._(ps.title)._('</div>');
		}
		s._('<div class="db-content">')._(msg)._('</div>');
		s._('<div class="db-foot">');
		t.addBtn(s,ps.btn,1);
		if(ps.cfm)
			t.addBtn(s,ps.btn1,2);
		s._('</div>');
		t.open(s.ts(),ps);
	},
	//确认对话框 ps:title,msg,icon,width,btn(按钮名称),btn1(第二个按钮名称),notify
	confirm:function(msg,ps){
		ps=$.init(ps,{msg:msg,btn1:'取消'});
		ps.cfm=true;
		this.alert(msg,ps)
	},
	//添加按钮代码(对话框按钮)
	addBtn:function(s,name,nt){
		this.addButton(s,{id:'dialog-btn-#di#',name:name,click:'X.dialog.close(#di#,'+nt+');'});
	},
	//添加按钮代码 ps:id,name,css(按钮CSS),style,click(点击事件),effects(点击效果CSS),type(是按钮或者连接样式)
	addButton:function(s,ps){
		s._('<p');
		if(ps.id)
			s._(' id="')._(ps.id)._('"');
		if(ps.css)
			s._(' class="')._(ps.css)._('"');
		if(ps.style)
			s._(' style="')._(ps.style)._('"');
		if(ps.click)
			s._(' onclick="')._(ps.click)._('"');
		s._('>'+ps.name+'</p>');
	},
	//操作通知
	notify:function(di,nt){
		var db=this.get(di);
		if(db[5])db[5]($.no(nt)?0:nt);
	},
	//关闭对话框或提示框(0不关闭,1关闭,2关闭并关闭上级对话框)
	close:function(di,nt){
		var t=this,b,l,c=1,cn,cv;
		if($.no(nt))nt=0;
		if(!$.no(di)){
			b=t.get(di);
			if(b){
				if($.isN(di)){
					if(b[5]){c=b[5](nt);if($.no(c))c=1;}
					if(c>0){t.get(di,true);b[4].remove();b[3].remove();}
					if(c<2)return;
				}
			}else{return;}
		}
		//关闭最后打开的对话框
		l=t.dbs.length;
		if(l>0)t.close(t.dbs[l-1][0],0);
	},
	//返回对话框
	get:function(di){
		var t=this,bs=$.isN(di)?t.dbs:t.pbs,b;
		for(var i=0;i<bs.length;i++){
			if(bs[i][0]==di){
				b=bs[i];
				if(del)
					bs.splice(i,1);
				break;
			}
		}
		return b;
	},
	//调整大小位置
	resize:function(){
		var t=this,dbs=t.dbs,pbs=t.pbs,mbs=t.mbs;
		if(dbs.length==0 && pbs.length==0 && mbs.length==0)
			return;
		var p=X.ps(),ww=p.width,wh=p.height,dl,dt,top=-30,o,obj;
		if($.ie(6))top+=p.top;
		for(var i=0;i<dbs.length;i++)
		{
			o=dbs[i];
			dl=$.round((ww-o[1])/2);
			if(dl<6)dl=6;
			dt=$.round((wh-o[2])/2+top);
			if(dt<6)dt=6;
			o[3].css('width',ww+'px');
			o[3].css('height',wh+'px');
			o[4].css('top',dt+'px');
			o[4].css('left',dl+'px');
		}
		for(var i=0;i<pbs.length;i++)
		{
			o=pbs[i];
			obj=$.$(o[4]);
			if(obj.length>0)
			{
				p=obj.offset();
				ww=p.left+obj.width()/2;
				wh=p.top+obj.height()+5;
				if(o[2]%2==1)ww-=15;else{ww-=o[1]-15;}
				o[5].css('top',wh+'px');
				o[5].css('left',ww+'px');
			}
		}
		for(var i=0;i<mbs.length;i++)
		{
			o=mbs[i];
			if(o!=null && o.length>4)
			{
				dl=$.round((ww-o[5])/2);
				o[4].css('left',dl+'px');
			}
		}
	}
};

