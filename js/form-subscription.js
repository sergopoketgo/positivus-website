const subscriptionForm = document.getElementById("subscriptionForm");
const subscriptionSuccess = document.getElementById("subscriptionSuccess");
const fadeOutTransition = parseFloat(getComputedStyle(subscriptionForm).transition) * 1000;

subscriptionForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(form);
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData
    });

    subscriptionForm.style.opacity = "0";
    setTimeout(() => {
        // Hide Subscription Form
        // subscriptionForm.style.opacity = null;
        // if (subscriptionForm.getAttribute("style") === "")
        //     subscriptionForm.removeAttribute("style");

        subscriptionForm.classList.add("hidden");

        // Show Subscription Success
        subscriptionSuccess.classList.remove("hidden");
        requestAnimationFrame(() => {
            subscriptionSuccess.style.opacity = "1";
        });
    }, fadeOutTransition + 1000);
});