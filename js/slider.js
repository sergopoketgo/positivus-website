const sliderTrack = document.getElementById("sliderTrack");
const slides = sliderTrack.children;
const btnNext = document.getElementById("btnNext");
const btnPrev = document.getElementById("btnPrev");
const dots = document.querySelectorAll(".section-testimonials__slider-nav-dot");

// function scrollSliderBy(posX) {
//     sliderPosX += -posX;
//     sliderTrack.style.transform = "translateX(" + sliderPosX + "px)";
// }

function setActiveSlide(index) {
    const sliderPosX = sliderOffsetX - (slide * index);
    sliderTrack.style.transform = "translateX(" + sliderPosX + "px)";
}

function paginationUpdate() {
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentSlideIndex].classList.add("active");
}

function navigationUpdateFull() {
    if (currentSlideIndex === 0) {
        btnNext.classList.remove("disabled");
        btnPrev.classList.add("disabled");
    } else if (currentSlideIndex === lastSlideIndex) {
        btnNext.classList.add("disabled");
        btnPrev.classList.remove("disabled");
    } else
        [btnNext, btnPrev].forEach((btn) => {
            btn.classList.remove("disabled");
        });
}

// Count of Active Slides (without duplicates)
const lastSlideIndex = slides.length-1;

// Add Begin & End slides (Duplicate)
sliderTrack.prepend(slides[slides.length-1].cloneNode(true));
sliderTrack.append(slides[1].cloneNode(true));

// Slider Main Params
const sliderWidth = sliderTrack.clientWidth;
const slideWidth = slides[0].clientWidth;
const sliderTrackGap = (sliderTrack.scrollWidth - slideWidth*slides.length)/(slides.length-1);
const slide = slideWidth + sliderTrackGap;

// Scroll To First Slide
let sliderOffsetX  = -(slideWidth*1.5 + sliderTrackGap - sliderWidth/2);
// let sliderPosX = sliderOffsetX;
sliderTrack.style.transform = "translateX(" + sliderOffsetX + "px)";
let currentSlideIndex = 0;

// Next && Prev Slide Switch
function nextSlide() {
    if (currentSlideIndex < lastSlideIndex) {
        currentSlideIndex++;
        setActiveSlide(currentSlideIndex);
        // scrollSliderBy(slide);

        // Navigation Buttons Update State
        if (currentSlideIndex === 1)
            btnPrev.classList.remove("disabled");
        else if (currentSlideIndex === lastSlideIndex)
            this.classList.add("disabled");

        paginationUpdate();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        setActiveSlide(currentSlideIndex);
        // scrollSliderBy(-slide);

        // Navigation Buttons Update State
        if (currentSlideIndex === lastSlideIndex-1)
            btnNext.classList.remove("disabled");
        else if (currentSlideIndex === 0)
            this.classList.add("disabled");

        paginationUpdate();
    }
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

// Switch Slide on Pagination Bullet Click
dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlideIndex = index;
        setActiveSlide(currentSlideIndex);

        navigationUpdateFull();
        paginationUpdate();
    });
});

// Slider Drag
let touchStartPosX;
sliderTrack.addEventListener("touchstart", (event) => {
    const touch = event.touches[0];
    touchStartPosX = touch.clientX;

    sliderTrack.classList.remove("transition");
});

sliderTrack.addEventListener("touchmove", (event) => {
    const touchDeltaPosX = event.touches[0].clientX - touchStartPosX;
    const sliderPosX = sliderOffsetX - (slide * currentSlideIndex);

    const minSliderPosX = sliderOffsetX;
    const maxSliderPosX = sliderOffsetX - (slide * lastSlideIndex);

    const sliderDraggedPosX = sliderPosX + touchDeltaPosX;

    if (sliderDraggedPosX >= minSliderPosX)
        sliderTrack.style.transform = "translateX(" + minSliderPosX + "px)";
    else if (sliderDraggedPosX <= maxSliderPosX)
        sliderTrack.style.transform = "translateX(" + maxSliderPosX + "px)";
    else
        sliderTrack.style.transform = "translateX(" + sliderDraggedPosX + "px)";
});

sliderTrack.addEventListener("touchend", (event) => {
    // const touch = event.touches[0];
    const touchDeltaPosX = event.changedTouches[0].clientX - touchStartPosX;

    if (touchDeltaPosX < -50 && currentSlideIndex < lastSlideIndex)
        currentSlideIndex++;
    else if (touchDeltaPosX > 50 && currentSlideIndex > 0)
        currentSlideIndex--;
    setActiveSlide(currentSlideIndex);

    navigationUpdateFull();
    paginationUpdate();

    sliderTrack.classList.add("transition");
});
