!function (e) { var t, a = { kitId: "yth3ggq", scriptTimeout: 3e3, async: !0 }, c = e.documentElement, i = setTimeout(function () { c.className = c.className.replace(/\bwf-loading\b/g, "") + " wf-inactive" }, a.scriptTimeout), n = e.createElement("script"), s = !1, o = e.getElementsByTagName("script")[0]; c.className += " wf-loading", n.src = "https://use.typekit.net/" + a.kitId + ".js", n.async = !0, n.onload = n.onreadystatechange = function () { if (t = this.readyState, !(s || t && "complete" != t && "loaded" != t)) { s = !0, clearTimeout(i); try { Typekit.load(a) } catch (e) { } } }, o.parentNode.insertBefore(n, o) }(document);

var theme = "light";
$(function () {
    function theme_change(dark) {
        if (dark) {
            $("body").css("--theme-color-text", "#fff")
                .css("--theme-color-t50", "#00000080");
            theme = "dark";
        };
    };
    if (localStorage["theme"] == null || localStorage["theme"] == "system") {
        theme_change(matchMedia("(prefers-color-scheme: dark)").matches);
    } else if (localStorage["theme"] == "dark") {
        theme_change(true);
    };
});

$(function () {
    if (theme == "light") {
        var color = ["#fff", "#2C2F33", "darker"];
    } else {
        var color = ["#2C2F33", "#000", "lighter"];
    };
    bubbly({
        blur: 15,
        bubbleFunc: () => `hsla(${Math.random() * 360},100%,50%,${Math.random() * 0.3})`,
        bubbles: Math.floor($("body").width() * $("body").height() / 7500),
        canvas: document.querySelector("#top-background"),
        colorStart: color[0],
        colorStop: color[1],
        compose: color[2],
        radiusFunc: () => Math.random() * 75
    });
});

function typing(text, element, erase = false, func = []) {
    $(element).addClass("type");
    text += " ";
    var textn = 0;
    var timer = setInterval(function () {
        if (text.length == textn) {
            clearInterval(timer);
            if (erase) {
                $(element).removeClass("type");
            };
            for (f in func) {
                func[f]();
            };
        } else {
            $(element).append(text[textn]);
            if (text[textn] == " ") {
                if ($(element).hasClass("typing")) {
                    $(element).removeClass("typing");
                };
            } else {
                $(element).addClass("typing");
            };
        };
        textn++;
    }, 100);
};

$(function () {
    $(".top-text img").fadeIn("slow", function () {
        typing("Takkun053", ".top-text h1", true, [
            function () { typing("ようこそ猫耳が生えた学生プログラマーのポートフォリオへ！", ".top-text p"); }
        ]);
    });
});
