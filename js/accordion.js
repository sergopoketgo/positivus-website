const headers = document.querySelectorAll(".section-process__accordion-item-header");

headers.forEach(header => {
    header.addEventListener("click", () => {
        function close(item, content) {
            item.classList.remove("active");
            content.style.maxHeight = null;
        }
        function open(item, content) {
            item.classList.add("active");
            content.style.maxHeight = content.scrollHeight + "px";
        }

        const item = header.parentElement;
        const content = header.nextElementSibling;

        if (item.classList.contains("active")) {
            close(item, content);
        } else {
            headers.forEach(header => {
                const item = header.parentElement;
                const content = header.nextElementSibling;
                if (item.classList.contains("active"))
                    close(item, content);
            });
            open(item, content);
        }
    });
});


