function smoothScrollTo(targetY, duration) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    function animateScroll(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = 0.5 - 0.5 * Math.cos(Math.PI * progress);

        window.scrollTo(0, startY + distance * easeProgress);

        if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
        }
    }
    requestAnimationFrame(animateScroll);
}

const TO_TOP_BUTTON_ACTIVE_DURATION = 2000;

const toTopBtn = document.getElementById("scrollTopBtn");
const body = document.getElementById("body");

// Set Position
// const rightOffset = (((innerWidth-body.offsetWidth)/2 + parseInt(getComputedStyle(body).paddingRight)) - toTopBtn.offsetWidth) - 15;
// toTopBtn.style.right = rightOffset + "px";
// toTopBtn.style.bottom = Math.round(rightOffset/1.5) + "px";

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
    smoothScrollTo(0, 500);
});
