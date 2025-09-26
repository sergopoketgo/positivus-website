const header = document.getElementById("header");

function hideHeader() {
    header.style.transform = `translateY(-${header.offsetHeight}px)`;
}
function showHeader() {
    header.style.transform = 'translateY(0)';
}

let lastScroll = scrollPosition();
let lastTrigger = scrollPosition();
const threshold = 50;

function updateHeaderState() {
    const currentScroll = scrollPosition();

    if (currentScroll > header.offsetHeight) {
        if (currentScroll > lastScroll && currentScroll - lastTrigger >= threshold) {
            hideHeader();
            lastTrigger = currentScroll;
        } else if (currentScroll < lastScroll && lastTrigger - currentScroll >= threshold) {
            header.classList.add("header_scroll");
            showHeader();
            lastTrigger = currentScroll;
        }
    } else if (currentScroll <= headerTop) {
        header.classList.remove("header_scroll");
        showHeader();
        lastTrigger = currentScroll;
    }

    lastScroll = currentScroll;
}

const headerTop = parseInt(getComputedStyle(header).top);
updateHeaderState();

window.addEventListener("scroll", updateHeaderState);
