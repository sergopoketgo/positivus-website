const form = document.getElementById("mainForm");
const formSubmitted = document.getElementById("mainFormSubmitted");

form.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData(form);
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: formData
    });

    formSubmitted.classList.remove("opacity-hidden");
});
