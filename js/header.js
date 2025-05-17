const header = document.getElementById("header");

function hideHeader() {
    header.style.top = -header.offsetHeight + "px";
}
function showHeader() {
    header.style.top = null;
}

let lastScroll = 0;
function updateHeaderState() {
    if (scrollPosition() > header.offsetHeight && scrollPosition() > 50) {
        if (scrollPosition() > lastScroll) {
            // Scroll Down
            hideHeader();
        } else {
            // Scroll Up
            header.classList.add("header_scroll");
            showHeader();
        }
    } else if (scrollPosition() <= headerTop) {
        header.classList.remove("header_scroll");
        // header.classList.remove("transition");
        // requestAnimationFrame(() => {
        //     header.classList.remove("header_scroll");
        //     header.classList.add("transition");
        // });
    }

    lastScroll = scrollPosition();
}

const headerTop = parseInt(getComputedStyle(header).top);
updateHeaderState();

header.classList.add("transition");
window.addEventListener("scroll", updateHeaderState);

// header.classList.toggle("header_scroll", scrollPosition() > 45);
// if (scrollPosition() >= 45)
//     header.style.top = -header.offsetHeight + "px";
// else
//     header.style.top = "0";