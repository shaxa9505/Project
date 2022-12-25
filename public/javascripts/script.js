window.addEventListener("load", () => {

    const header_navbar = document.querySelector('.header_navbar'),
        body = document.querySelector("body"),
        navLink = document.querySelectorAll(".nav-link"),
        navbarBrand = document.querySelector(".navbar-brand"),
        navLinkAfter = document.querySelectorAll(".navbar-nav .nav-item .link"),
        afters = document.querySelectorAll(".greeting"),
        dropdownMenu = document.querySelector("header .header_navbar nav .collapse .navbar-nav .dropdown .dropdown-menu"),
        dropdownItem = document.querySelector("header .header_navbar nav .collapse .navbar-nav .dropdown .dropdown-menu .dropdown-item"),
        loader = document.querySelector(".loader"),
        mode = document.querySelector("header .header_navbar nav .collapse .navbar-nav .mode"),
        sun = document.querySelector("header .header_navbar nav .collapse .navbar-nav .mode .sun"),
        mon = document.querySelector("header .header_navbar nav .collapse .navbar-nav .mode .mon"),
        name = document.querySelector(".header_about .name"),
        work = document.querySelector(".header_about .work"),
        footer = document.querySelector("footer"),
        developed = document.querySelector("footer .developed"),
        copy = document.querySelector("footer .copy"),
        icons = document.querySelectorAll("footer ul li a"),
        sectionText = document.querySelector("section .section_text"),
        techIcons = document.querySelectorAll("section .tech-icons"),
        cardProject = document.querySelectorAll(".card-project"),
        cardLink = document.querySelectorAll(".card-project .card-project-link");

    // setTimeout(() => {
    //     loader.style.display = "none";
    //     loader.style.transition = "1s";
    //     header_navbar.style.position = "fixed"
    // }, 4000)

    let getMode = localStorage.getItem("mode");

    if (getMode && getMode === "dark") {
        body.classList.toggle("dark")
        console.log("if 1");
        dropdownItem.style.background = "#020A18";
        name ? name.style.color = "rgb(2, 10, 24)" : null;
        work ? work.style.color = "#989393" : null;
        mon.style.display = "none";
        sun.style.display = "block";
        dropdownItem.style.color = "rgb(157, 171, 194)"
        dropdownMenu.addEventListener("mouseover", () => {
            dropdownItem.style.color = "#fff";
            dropdownItem.style.borderRadius = "10px";
            dropdownItem.style.backgroundColor = "#3A68B8";
        })
        dropdownMenu.addEventListener("mouseout", () => {
            dropdownItem.style.color = "rgb(157, 171, 194)";
            dropdownItem.style.borderRadius = "10px";
            dropdownItem.style.backgroundColor = "#020A18";
        })
        navbarBrand.style.color = "#020a18";
        mode.addEventListener("mouseover", () => {
            mode.style.background = "rgb(148, 145, 145)"
        })
        mode.addEventListener("mouseout", () => {
            mode.style.background = "transparent"
        })
        navLink.forEach((item, index) => {
            item.style.color = "#3A68B8"
        })
        footer.style.background = "rgb(0 0 0 / 13%)";
        developed.style.color = "black";
        copy.style.color = "black";
        icons.forEach(item => {
            item.style.color = "black"
        })
        mode.style.color = "black";
        techIcons ? techIcons.forEach(item => {
            item.style.border = "2.4px solid #3A68B8";
            item.style.background = "transparent";
            item.addEventListener("mouseover", () => {
                item.style.border = "2.4px solid #2869d8"
            })
            item.addEventListener("mouseout", () => {
                item.style.border = "1.7px solid #3A68B8"
            })
        }) : null
        sectionText ? sectionText.style.color = "rgb(2, 10, 24)" : null;
        navLinkAfter.forEach((btn, index) => {
            btn.addEventListener("mouseover", () => {
                afterShowBac(index);
            })
            btn.addEventListener("mouseout", () => {
                afterNone()
            })
        })
        cardProject ? cardProject.forEach(item => {
            item.style.color = "black"
        }) : null;
        cardLink ? cardLink.forEach(item => {
            item.style.color = "black"
            item.addEventListener("mouseover", () => {
                item.style.color = "rgb(0, 94, 255)"
            })
            item.addEventListener("mouseout", () => {
                item.style.color = "black"
            })
        }) : null;
    }
    else {
        console.log("else 1");
        navLinkAfter.forEach((btn, index) => {
            btn.addEventListener("mouseover", () => {
                afterShow(index);
            })
            btn.addEventListener("mouseout", () => {
                afterNone()
            })
        });
        mode.addEventListener("mouseover", () => {
            mode.style.background = "rgb(148, 145, 145)"
        })
        mode.addEventListener("mouseout", () => {
            mode.style.background = "transparent"
        })
        navbarBrand.style.color = "#3A68B8"
        mon.style.display = "block";
        sun.style.display = "none";
        dropdownMenu.style.backgroundColor = "#fff";
        dropdownItem.style.color = "#000"
        dropdownMenu.addEventListener("mouseover", () => {
            dropdownItem.style.color = "#fff";
            dropdownItem.style.borderRadius = "10px";
            dropdownItem.style.backgroundColor = "#3A68B8";
        })
        dropdownMenu.addEventListener("mouseout", () => {
            dropdownItem.style.color = "#000";
            dropdownItem.style.borderRadius = "10px";
            dropdownItem.style.backgroundColor = "#fff";
        })
        techIcons ? techIcons.forEach(item => {
            item.style.border = "1.7px solid #3A68B8";
            item.style.background = "white";
            item.addEventListener("mouseover", () => {
                item.style.border = "2.4px solid #2869d8"
            })
            item.addEventListener("mouseout", () => {
                item.style.border = "1.7px solid #3A68B8"
            })
        }) : null
        mode.style.color = "white";
        navLink.forEach((item, index) => {
            item.style.color = "#fff"
        })
        footer.style.background = "#0a0416";
        developed.style.color = "white";
        copy.style.color = "white";
        icons.forEach(item => {
            item.style.color = "white"
        })
        name ? name.style.color = "white" : null;
        work ? work.style.color = "rgb(181 178 178)" : null;
        sectionText ? sectionText.style.color = "white" : null;
        cardProject ? cardProject.forEach(item => {
            item.style.color = "white"
        }) : null;
        cardLink ? cardLink.forEach(item => {
            item.style.color = "white";
            item.addEventListener("mouseover", () => {
                item.style.color = "rgb(0, 94, 255)"
            })
            item.addEventListener("mouseout", () => {
                item.style.color = "white"
            })
        }) : null;
    }

    mode.addEventListener("click", () => {
        body.classList.toggle("dark");
        if (body.classList.contains("dark")) {
            console.log("if 2");
            localStorage.setItem("mode", "dark");
            name ? name.style.color = "rgb(2, 10, 24)" : null;
            mon.style.display = "none";
            sun.style.display = "block";
            mode.style.color = "black";
            work ? work.style.color = "#989393" : null;
            mode.addEventListener("mouseover", () => {
                mode.style.background = "#ebedf0"
            })
            mode.addEventListener("mouseout", () => {
                mode.style.background = "transparent"
            })
            navLink.forEach((item, index) => {
                item.style.color = "#3A68B8"
            })
            navbarBrand.style.color = "#020a18";
            dropdownItem.style.background = "#020A18";
            dropdownItem.style.color = "rgb(157, 171, 194)"
            dropdownMenu.addEventListener("mouseover", () => {
                dropdownItem.style.color = "#fff";
                dropdownItem.style.borderRadius = "10px";
                dropdownItem.style.backgroundColor = "#3A68B8";
            })
            dropdownMenu.addEventListener("mouseout", () => {
                dropdownItem.style.color = "rgb(157, 171, 194)";
                dropdownItem.style.borderRadius = "10px";
                dropdownItem.style.backgroundColor = "#020A18";
            })
            techIcons ? techIcons.forEach(item => {
                item.style.border = "2.4px solid #3A68B8";
                item.style.background = "transparent";
                item.addEventListener("mouseover", () => {
                    item.style.border = "2.4px solid #2869d8"
                })
                item.addEventListener("mouseout", () => {
                    item.style.border = "1.7px solid #3A68B8"
                })
            }) : null;
            navLinkAfter.forEach((btn, index) => {
                btn.addEventListener("mouseover", () => {
                    afterShowBac(index);
                })
                btn.addEventListener("mouseout", () => {
                    afterNone()
                })
            })
            footer.style.background = "rgb(0 0 0 / 13%)";
            developed.style.color = "black";
            copy.style.color = "black";
            icons.forEach(item => {
                item.style.color = "black"
            })
            sectionText ? sectionText.style.color = "rgb(2, 10, 24)" : null;
            cardProject ? cardProject.forEach(item => {
                item.style.color = "black"
            }) : null;
            cardLink ? cardLink.forEach(item => {
                item.style.color = "black"
                item.addEventListener("mouseover", () => {
                    item.style.color = "rgb(0, 94, 255)"
                })
                item.addEventListener("mouseout", () => {
                    item.style.color = "black"
                })
            }) : null;
        } else {
            console.log("else 2");
            localStorage.setItem("mode", "light");
            name ? name.style.color = "white" : null;
            mon.style.display = "block";
            sun.style.display = "none";
            mode.style.color = "white";
            work ? work.style.color = "rgb(181 178 178)" : work
            navLink.forEach((item, index) => {
                item.style.color = "#fff"
            })
            mode.addEventListener("mouseover", () => {
                mode.style.background = "rgb(148, 145, 145)"
            })
            mode.addEventListener("mouseout", () => {
                mode.style.background = "transparent"
            })
            navbarBrand.style.color = "#3A68B8";
            dropdownItem.style.backgroundColor = "#fff";
            dropdownItem.style.color = "#000"
            dropdownMenu.addEventListener("mouseover", () => {
                dropdownItem.style.color = "#fff";
                dropdownItem.style.borderRadius = "10px";
                dropdownItem.style.backgroundColor = "#3A68B8";
            })
            dropdownMenu.addEventListener("mouseout", () => {
                dropdownItem.style.color = "#000";
                dropdownItem.style.borderRadius = "10px";
                dropdownItem.style.backgroundColor = "#fff";
            })
            techIcons ? techIcons.forEach(item => {
                item.style.border = "1.7px solid #3A68B8";
                item.style.background = "white";
                item.addEventListener("mouseover", () => {
                    item.style.border = "2.4px solid #2869d8"
                })
                item.addEventListener("mouseout", () => {
                    item.style.border = "1.7px solid #3A68B8"
                })
            }) : null;
            navLinkAfter.forEach((btn, index) => {
                btn.addEventListener("mouseover", () => {
                    afterShow(index);
                    console.log("qora");
                })
                btn.addEventListener("mouseout", () => {
                    afterNone()
                })
            })
            footer.style.background = "#0a0416";
            developed.style.color = "white";
            copy.style.color = "white";
            icons.forEach(item => {
                item.style.color = "white"
            })
            sectionText ? sectionText.style.color = "white" : null;
            cardProject ? cardProject.forEach(item => {
                item.style.color = "white"
            }) : null;
            cardLink ? cardLink.forEach(item => {
                item.style.color = "white";
                item.addEventListener("mouseover", () => {
                    item.style.color = "rgb(0, 94, 255)"
                })
                item.addEventListener("mouseout", () => {
                    item.style.color = "white"
                })
            }) : null;
        }
    });

    window.addEventListener('scroll', function () {
        header_navbar.classList.toggle('sticky', window.scrollY > 0)
    })
    function afterNone() {
        afters.forEach(item => {
            item.style.width = "0";
        })
    }
    function afterShow(i) {
        afters[i].style.cssText = "width: 100%; background: #3A68B8"
    }
    function afterShowBac(i) {
        afters[i].style.cssText = "width: 100%; background: black"
    }
})