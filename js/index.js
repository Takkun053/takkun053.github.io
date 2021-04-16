!function (e) { var t, a = { kitId: "yth3ggq", scriptTimeout: 3e3, async: !0 }, c = e.documentElement, i = setTimeout(function () { c.className = c.className.replace(/\bwf-loading\b/g, "") + " wf-inactive" }, a.scriptTimeout), n = e.createElement("script"), s = !1, o = e.getElementsByTagName("script")[0]; c.className += " wf-loading", n.src = "https://use.typekit.net/" + a.kitId + ".js", n.async = !0, n.onload = n.onreadystatechange = function () { if (t = this.readyState, !(s || t && "complete" != t && "loaded" != t)) { s = !0, clearTimeout(i); try { Typekit.load(a) } catch (e) { } } }, o.parentNode.insertBefore(n, o) }(document);

var theme = "dark";
$(function () {
    function theme_change(light) {
        if (light) {
            $(":root").css("--theme-color", "#fff")
                .css("--theme-color-t50", "#ffffff80")
                .css("--theme-color-text", "#2C2F33")
                .css("--theme-color-text-t50", "#2C2F3380");
            theme = "light";
        };
    };
    if (localStorage["theme"] == null || localStorage["theme"] == "system") {
        theme_change(!matchMedia("(prefers-color-scheme: dark)").matches);
    } else if (localStorage["theme"] == "light") {
        theme_change(true);
    };
});

$(function () {
    if (theme == "dark") {
        var color = ["#2C2F33", "#000", "lighter"];
    } else {
        var color = ["#fff", "#2C2F33", "darker"];
    };
    bubbly({
        blur: 15,
        bubbleFunc: () => `hsla(${Math.random() * 360},100%,50%,${Math.random() * 0.3})`,
        bubbles: Math.floor($(window).width() * $(window).height() / 7500),
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
            function () { typing("ようこそ、猫耳が生えた学生プログラマーのポートフォリオへ！", ".top-text p"); }
        ]);
    });
});

$(function () {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
        var theme_system = "ダーク";
    } else {
        var theme_system = "ライト";
    };
    $(".footer-theme-btn2-grid[value='system']").text(`システムと同期 (${theme_system})`);
    if (localStorage["theme"] == null || localStorage["theme"] == "system") {
        var theme2 = "system"
    } else {
        var theme2 = theme;
    };
    $(`.footer-theme-${theme2}`).addClass("footer-theme-btn2-select");
    $(".footer-theme-btn").click(function () {
        $("body").css("overflow", "hidden");
        $(".footer-theme").css("display", "block");
    });
    $(".footer-theme-close").click(function () {
        $(".footer-theme").css("display", "none");
        $("body").css("overflow", "visible");
    });
    $(".footer-theme-btn2").click(function () {
        localStorage["theme"] = $(this).attr("value");
        location.reload();
    });
});
