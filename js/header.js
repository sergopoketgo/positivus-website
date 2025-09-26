const header = document.getElementById("header");

function headerUpdate() {
    if (scrollPosition() > 30)
        header.classList.add("header_fixed");
    else
        header.classList.remove("header_fixed");
}

headerUpdate();
window.addEventListener("scroll", headerUpdate);
