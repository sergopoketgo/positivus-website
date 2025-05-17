const LOGOTYPES_SCROLL_SPEED = 1;


const logotypesContainer = document.getElementById("logotypesContainer");
const logotypesTrack = document.getElementById("logotypesTrack");
const logotypes = logotypesTrack.children;

function translateX(object, value) {
    object.style.transform = `translateX(${-value}px)`;
}

const logotypeWidth = logotypes[0].clientWidth;
const logotypesTrackWidth = logotypesTrack.scrollWidth;
const logotypesTrackGap = (logotypesTrackWidth - logotypeWidth*logotypes.length)/(logotypes.length-1);

// Create Logotypes Track Clone
const logotypesTrackClone = logotypesTrack.cloneNode(true);
logotypesTrackClone.classList.add("section-main__logotypes-track_clone", "w-100");
logotypesTrackClone.removeAttribute("id");
let logotypesCloneOffset = -logotypesTrackWidth;
translateX(logotypesTrackClone, logotypesCloneOffset);
logotypesContainer.append(logotypesTrackClone);

let logotypesOffset = 0;
setInterval(() => {
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