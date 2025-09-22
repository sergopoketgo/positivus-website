const LOGOTYPES_SCROLL_SPEED = 1;


const logotypesContainer = document.getElementById("logotypesContainer");
const logotypesTrack = document.getElementById("logotypesTrack");
const logotypes = logotypesTrack.children;

function translateX(object, value) {
    object.style.transform = `translateX(${-value}px)`;
}

let logotypesTrackClone;
function createLogotypesTrackCloneNode() {
    logotypesTrackClone = logotypesTrack.cloneNode(true);
    logotypesTrackClone.classList.add("section-main__logotypes-track_clone", "w-100");
    logotypesTrackClone.removeAttribute("id");
}

let logotypeWidth = logotypes[0].clientWidth;
let logotypesTrackWidth = logotypesTrack.scrollWidth;
let logotypesTrackGap = (logotypesTrackWidth - logotypeWidth*logotypes.length)/(logotypes.length-1);

// Create Logotypes Track Clone
createLogotypesTrackCloneNode();
let logotypesCloneOffset = -logotypesTrackWidth;
translateX(logotypesTrackClone, logotypesCloneOffset);
logotypesContainer.append(logotypesTrackClone);

let logotypesOffset = 0;
setInterval(() => {
    if (resized) {
        logotypesTrackClone.remove();

        createLogotypesTrackCloneNode();

        // Clone Position
        logotypesCloneOffset = logotypesOffset - logotypesTrackWidth - logotypesTrackGap;
        translateX(logotypesTrackClone, logotypesCloneOffset);

        logotypesContainer.append(logotypesTrackClone);
        resized = false;
    }

    if (logotypesOffset === -logotypesTrackWidth)
        logotypesTrack.style.transition = null;

    logotypesOffset += LOGOTYPES_SCROLL_SPEED;
    translateX(logotypesTrack, logotypesOffset);

    if (logotypesOffset >= logotypesTrackGap || logotypesOffset <= 0) {
        if (logotypesCloneOffset === -logotypesTrackWidth)
            logotypesTrackClone.style.transition = null;

        logotypesCloneOffset += LOGOTYPES_SCROLL_SPEED;
        translateX(logotypesTrackClone, logotypesCloneOffset);

        if (logotypesCloneOffset >= logotypesTrackWidth && logotypesOffset >= 0) {
            logotypesTrackClone.style.transition = "unset";
            requestAnimationFrame(() => {
                logotypesCloneOffset = -logotypesTrackWidth;
                translateX(logotypesTrackClone, logotypesCloneOffset);
            });
        }

        if (logotypesCloneOffset >= logotypesTrackGap && logotypesCloneOffset < logotypesOffset) {
            logotypesTrack.style.transition = "unset";
            requestAnimationFrame(() => {
                logotypesOffset = -logotypesTrackWidth;
                translateX(logotypesTrack, logotypesOffset);
            });
        }
    }
}, 25);

let resized = false;
window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
        resized = true;

        logotypeWidth = logotypes[0].clientWidth;
        logotypesTrackWidth = logotypesTrack.scrollWidth;
        logotypesTrackGap = (logotypesTrackWidth - logotypeWidth*logotypes.length)/(logotypes.length-1);
    }
})