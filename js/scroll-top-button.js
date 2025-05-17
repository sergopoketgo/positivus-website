const TO_TOP_BUTTON_ACTIVE_DURATION = 2000;

const toTopBtn = document.getElementById("scrollTopBtn");
const body = document.getElementById("body");

// Set Position
const rightOffset = (((innerWidth-body.offsetWidth)/2 + parseInt(getComputedStyle(body).paddingRight)) - toTopBtn.offsetWidth) - 15;
toTopBtn.style.right = rightOffset + "px";
toTopBtn.style.bottom = Math.round(rightOffset/1.5) + "px";

// Appear||Hide Scroll To Top Button
let activeTimeout;
function setToTopBtnState() {
    if (scrollPosition() >= window.innerHeight && toTopBtn.classList.contains("opacity-hidden")) {
        // Show Button
        toTopBtn.classList.remove("opacity-hidden");
        toTopBtn.classList.add("active");

        clearTimeout(activeTimeout);
        activeTimeout = setTimeout(() => {
            toTopBtn.classList.remove("active");
        }, TO_TOP_BUTTON_ACTIVE_DURATION);

    } else if (scrollPosition() < window.innerHeight && !toTopBtn.classList.contains("opacity-hidden")) {
        // Hide Button
        toTopBtn.classList.add("opacity-hidden");
    }
}
setToTopBtnState();
window.addEventListener("scroll", setToTopBtnState);

// Scroll To Top On Click
toTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
