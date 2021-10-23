onload = function () {
    // variable
    let ie = 0
    if (!("scrollY" in window)) {
        window.scrollY = pageYOffset
        ie++
    }

    const a_hash = document.querySelectorAll("a[href^='#']")

    const header = document.querySelector("header")
    const header_btn = document.querySelector("header .btn")
    let header_open = false

    const top_line = document.querySelector("#top .line")
    let top_show = false

    const main_h1 = document.querySelectorAll("main h1")
    let title_show = []
    for (let i = 0; i < main_h1.length; i++)　title_show[i] = main_h1[i]
    const status = document.querySelector(".about-me .icon .status")
    let popup = false

    let go_to_top = false
    const ie_msg = document.querySelector(".message.ie")


    // function
    function once_show(element, func) {
        const position = element.getBoundingClientRect()
        if (position.top <= document.documentElement.clientHeight && position.bottom >= 0) func()
    }

    function animations() {
        if (!top_show) once_show(top_line, function () {
            top_show = true
            top_line.classList.add("show")
        })
        for (let i in title_show) {
            const element = title_show[i]
            if (element) once_show(element, function () {
                title_show[title_show.indexOf(element)] == null
                element.classList.add("show")
            })
        }
        if (scrollY == 0 && go_to_top) {
            document.querySelector(".go_to_top").classList.remove("show")
            go_to_top = false
        } else if (scrollY != 0 && !go_to_top) {
            document.querySelector(".go_to_top").classList.add("show")
            go_to_top = true
        }
    }

    function jump_to_hash() {
        if (header_open) {
            header.classList.remove("open")
            header_btn.style.opacity = "0"
            setTimeout(function () {
                header_btn.innerText = "menu"
                header_btn.style.opacity = "1"
            }, 250)
            header_open = false
        }
        if (popup) {
            document.body.classList.remove("fixed")
            document.querySelector(".item .popup.show").classList.remove("show")
            popup = false
        }
        if (["s1", "s2", "s3", "s4", "s5", "s6",
            "w1", "w2", "w3", "w4"].includes(location.hash.slice(1)) && !popup) {
            document.body.classList.add("fixed")
            const popup_e = document.querySelector(".{} .popup".replace("{}", location.hash.slice(1)))
            popup_e.classList.add("show")
            popup_e.querySelector(".btn").onclick = function () {
                document.body.classList.remove("fixed")
                popup_e.classList.remove("show")
                popup = false
                history.pushState("", "", "/")
            }
            popup = true
        } else if (location.hash) {
            const target = document.querySelector(location.hash)
            if (target) scrollTo(0, target.getBoundingClientRect().top + scrollY - header.clientHeight)
        }
    }

    function add_click(i) {
        a_hash[i].onclick = function () {
            if (location.hash == a_hash[i].hash) jump_to_hash()
            location.hash = a_hash[i].hash
            return false
        }
    }


    // min program
    window.dataLayer = window.dataLayer || []
    function gtag() {
        dataLayer.push(arguments)
    }
    gtag("js", new Date())
    gtag("config", "UA-210029320-3")

    animations()
    onscroll = animations

    Particles.init({
        selector: ".background",
        color: "#c0c0c0",
        connectParticles: true
    })
    try {
        dispatchEvent(new Event("resize"))
    } catch (e) {
        ie++
    }
    document.querySelector(".background").classList.add("show")

    if (location.hash == "#pataro") {
        document.querySelector(".about-me img").setAttribute("src", "./img/icon2.jpeg")
        document.querySelector(".about-me i").innerHTML = 'This icon was written by <a href="https://twitter.com/38912Pataro" target="_blank">pataro</a>.'
    }

    header_btn.onclick = function () {
        if (header_open) {
            header.classList.remove("open")
            header_btn.style.opacity = "0"
            setTimeout(function () {
                header_btn.innerText = "menu"
                header_btn.style.opacity = "1"
            }, 250)
            header_open = false
        } else {
            header.classList.add("open")
            header_btn.style.opacity = "0"
            setTimeout(function () {
                header_btn.innerText = "close"
                header_btn.style.opacity = "1"
            }, 250)
            header_open = true
        }
    }

    jump_to_hash()
    onhashchange = jump_to_hash
    for (let i = 0; i < a_hash.length; i++) add_click(i)

    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
        status.classList.add(xhr.response)
        status.setAttribute("data-status", "Discord Status: {}".replace("{}", xhr.response))
    }
    xhr.open("GET", "https://takkun.tera-server.net/portfolio.php")
    xhr.send()

    if (ie != 0 && !localStorage.ie) {
        ie_msg.classList.add("show")
        ie_msg.querySelector(".btn").onclick = function () {
            ie_msg.classList.remove("show")
            localStorage.ie = true
        }
    }
}
