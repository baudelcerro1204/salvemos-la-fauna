document.addEventListener("DOMContentLoaded", function () {
    // Selector de animación horizontal
    var horiSelector = document.querySelector(".hori-selector");
    var activeItem = document.querySelector(".navbar-nav .nav-item.active");

    function setActiveTab() {
        var activeWidthNewAnimHeight = activeItem.offsetHeight;
        var activeWidthNewAnimWidth = activeItem.offsetWidth;
        var itemPosNewAnimTop = activeItem.offsetTop;
        var itemPosNewAnimLeft = activeItem.offsetLeft;

        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
    }

    setActiveTab();

    document.querySelectorAll(".navbar-nav .nav-item").forEach(function (item) {
        item.addEventListener("click", function (e) {
            document.querySelectorAll(".navbar-nav .nav-item").forEach(function (navItem) {
                navItem.classList.remove("active");
            });
            item.classList.add("active");
            setActiveTab();
        });
    });

    window.addEventListener("resize", function () {
        setTimeout(setActiveTab, 500);
    });

    // Manejar el estado activo en función de la URL actual
    function setActiveLink() {
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll(".nav-link");

        navLinks.forEach(link => {
            const href = link.getAttribute("href");
            if (href === currentPath) {
                link.parentElement.classList.add("active");
            } else {
                link.parentElement.classList.remove("active");
            }
        });
    }

    setActiveLink();
});
