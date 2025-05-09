const PAGINATION_BULLET_ACTIVE_SRC = "img/svg/section-testimonials__slider-nav-dot_active.svg";
const PAGINATION_BULLET_SRC = "img/svg/section-testimonials__slider-nav-dot.svg";


const dotsContainer = document.getElementById("dotsContainer");
const slider = document.getElementById("slider");
const sliderTrack = document.getElementById("sliderTrack");
const slides = sliderTrack.children;
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");

function addPaginationBullet(i) {
    const dot = document.createElement("button");
    const image = new Image();

    dot.classList.add("section-testimonials__slider-nav-dot", "transition", "flex");

    // For First(Active) Element
    if (i === 0) {
        dot.classList.add("active");
        image.src = PAGINATION_BULLET_ACTIVE_SRC;
    } else
        image.src = PAGINATION_BULLET_SRC;

    image.alt = `slide ${i+1} pagination bullet`
    image.width = 14;
    image.height = 14;
    image.loading = "lazy";
    dot.append(image);

    dot.addEventListener("click", () => {
        if (currentIndex === i)
            return;
        currentIndex = i;

        updateSlider();

        // Pagination Update
        for (const _dot of dotsContainer.children) {
            if (_dot.classList.contains("active") ) {
                _dot.classList.remove("active");
                _dot.firstChild.src = PAGINATION_BULLET_SRC;
            }
        }
        dotsContainer.children[currentIndex].classList.add("active");
        dotsContainer.children[currentIndex].firstChild.src = PAGINATION_BULLET_ACTIVE_SRC;

        // Prev & Next Buttons Update
        if (currentIndex > 0 && currentIndex < activeSlidesLength-1) {
            btnPrev.classList.remove("disabled");
            btnNext.classList.remove("disabled");
        } else if (currentIndex === 0) {
            btnPrev.classList.add("disabled");
            btnNext.classList.remove("disabled");
        } else {
            btnPrev.classList.remove("disabled");
            btnNext.classList.add("disabled");
        }

    });

    dotsContainer.append(dot);
}

for (let i = 0; i < slides.length; i++) {
    addPaginationBullet(i);
}

const slideWidth = slides[0].clientWidth;
const sliderWidth = slider.clientWidth

const sliderTrackGap = (sliderTrack.scrollWidth - slideWidth*slides.length)/(slides.length-1);

const globalOffset = sliderWidth/2 - slideWidth/2 + -(slideWidth + sliderTrackGap);  // . - . + -(one slide offset)
sliderTrack.style.transform = `translateX(${globalOffset}px)`;

function updateSlider() {
    const offset = -currentIndex * slideWidth + -currentIndex * sliderTrackGap + globalOffset;
    sliderTrack.style.transform = `translateX(${offset}px)`;
}

// Add Begin & End slides
sliderTrack.prepend(slides[slides.length-1].cloneNode(true));
sliderTrack.append(slides[1].cloneNode(true));
const activeSlidesLength = slides.length-2;

let currentIndex = 0
btnNext.addEventListener("click", () => {
    // currentIndex = (currentIndex + 1) % activeSlidesLength;
    if (currentIndex === activeSlidesLength - 1)
        return;
    currentIndex++;

    updateSlider();

    // Pagination Update
    if (currentIndex > 0) {
        dotsContainer.children[currentIndex - 1].classList.remove("active");
        dotsContainer.children[currentIndex - 1].firstChild.src = PAGINATION_BULLET_SRC;
    } else {
        dotsContainer.children[activeSlidesLength - 1].classList.remove("active");
        dotsContainer.children[activeSlidesLength - 1].firstChild.src = PAGINATION_BULLET_SRC;
    }
    dotsContainer.children[currentIndex].classList.add("active");
    dotsContainer.children[currentIndex].firstChild.src = PAGINATION_BULLET_ACTIVE_SRC;

    // Prev & Next Buttons Update
    if (currentIndex === 1)
        btnPrev.classList.remove("disabled");
    else if (currentIndex === activeSlidesLength-1)
        btnNext.classList.add("disabled");
});

btnPrev.addEventListener("click", () => {
    // currentIndex = (currentIndex - 1 + activeSlidesLength) % (activeSlidesLength);
    if (currentIndex === 0)
        return;
    currentIndex--;

    updateSlider();

    // Pagination Update
    if (currentIndex < activeSlidesLength-1) {
        dotsContainer.children[currentIndex + 1].classList.remove("active");
        dotsContainer.children[currentIndex + 1].firstChild.src = PAGINATION_BULLET_SRC;
    } else {
        dotsContainer.children[0].classList.remove("active");
        dotsContainer.children[0].firstChild.src = PAGINATION_BULLET_SRC;
    }
    dotsContainer.children[currentIndex].classList.add("active");
    dotsContainer.children[currentIndex].firstChild.src = PAGINATION_BULLET_ACTIVE_SRC;

    // Prev & Next Buttons Update
    if (currentIndex === 0)
        btnPrev.classList.add("disabled");
    else if (currentIndex === activeSlidesLength-2)
        btnNext.classList.remove("disabled");
});
