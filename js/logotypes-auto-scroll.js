const LOGOTYPES_SCROLL_SPEED = 1;
const LOGOTYPE_WIDTH = 147;
const COUNT_OF_LOGOS = 6;

function CreateAutoscrollLogotypes(logotypesContainer, logotypesTrack) {
    setGapToLogosDesktop();

    const logotypes = logotypesTrack.children;

    function translateX(object, value) {
        object.style.transform = `translateX(${-value}px)`;
    }

    let logotypesTrackClone;
    function createLogotypesTrackCloneNode() {
        logotypesTrackClone = logotypesTrack.cloneNode(true);
        logotypesTrackClone.classList.add("position-absolute");
        logotypesTrackClone.removeAttribute("id");
    }

    function setAndAddLogotypesTrackClone() {
        logotypesTrackClone.remove();

        createLogotypesTrackCloneNode();

        // Clone Position
        logotypesCloneOffset = logotypesOffset - logotypesTrackWidth - logotypesTrackGap;
        translateX(logotypesTrackClone, logotypesCloneOffset);

        logotypesContainer.append(logotypesTrackClone);
    }

    function intervalLogicOfMovement() {
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
    let desktopScrollInterval = setInterval(() => {
        if (resized) {
            setAndAddLogotypesTrackClone();
            resized = false;
        }

        intervalLogicOfMovement();
    }, 25);

    let resized = false;
    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            resized = true;

            setGapToLogosDesktop();
            logotypeWidth = logotypes[0].clientWidth;
            logotypesTrackWidth = logotypesTrack.scrollWidth;
            logotypesTrackGap = (logotypesTrackWidth - logotypeWidth*logotypes.length)/(logotypes.length-1);
        } else {
            resized = true;

            clearInterval(desktopScrollInterval);

            logotypesOffset = 0;
            logotypeWidth = LOGOTYPE_WIDTH;
            logotypesTrackGap = parseInt(getComputedStyle(logotypesTrack.children[0]).gap);
            logotypesTrackWidth = LOGOTYPE_WIDTH * COUNT_OF_LOGOS/2 + logotypesTrackGap;
            setAndAddLogotypesTrackClone();

            logotypesTrack.style.transform = null;
            logotypesTrack.style.gap = null;
            logotypesTrack.classList.add("column");

            let logotypesRowsInterval = setInterval(() => {
                intervalLogicOfMovement();
            }, 25);
        }
    })
}

function setGapToLogosDesktop() {
    logotypesTrackDesktop.style.gap = logotypesTrackDesktop.clientWidth / COUNT_OF_LOGOS - LOGOTYPE_WIDTH + "px";
}

const logotypesContainerFull = document.getElementById("logotypesContainer");
const logotypesTrackDesktop = document.getElementById("logotypesTrackDesktop");

CreateAutoscrollLogotypes(logotypesContainerFull, logotypesTrackDesktop);