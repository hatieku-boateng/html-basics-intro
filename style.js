// ── 1. Highlight active nav link on scroll ──
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => link.classList.remove("active"));
                const activeLink = document.querySelector(
                    `nav ul li a[href="#${entry.target.id}"]`
                );
                if (activeLink) activeLink.classList.add("active");
            }
        });
    },
    { threshold: 0.4 }
);

sections.forEach((section) => observer.observe(section));

// ── 2. Fade-in sections as they enter the viewport ──
const fadeObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                fadeObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll("section").forEach((section) => {
    section.classList.add("fade-in");
    fadeObserver.observe(section);
});

// ── 3. Table row search/filter ──
function addTableFilter() {
    const table = document.querySelector("table");
    if (!table) return;

    const filterInput = document.createElement("input");
    filterInput.type = "text";
    filterInput.placeholder = "Search tags...";
    filterInput.id = "tableFilter";
    table.parentNode.insertBefore(filterInput, table);

    filterInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        table.querySelectorAll("tbody tr").forEach((row) => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? "" : "none";
        });
    });
}

addTableFilter();

// ── 4. Copy code snippet on click ──
document.querySelectorAll("code").forEach((codeEl) => {
    codeEl.title = "Click to copy";
    codeEl.style.cursor = "pointer";

    codeEl.addEventListener("click", function () {
        const text = this.textContent;
        navigator.clipboard.writeText(text).then(() => {
            const original = this.textContent;
            this.textContent = "Copied!";
            this.style.backgroundColor = "#d1fae5";
            this.style.color = "#065f46";
            setTimeout(() => {
                this.textContent = original;
                this.style.backgroundColor = "";
                this.style.color = "";
            }, 1500);
        });
    });
});

// ── 5. Update footer year automatically ──
const footerYear = document.querySelector("footer p");
if (footerYear) {
    footerYear.innerHTML = footerYear.innerHTML.replace(
        /\d{4}/,
        new Date().getFullYear()
    );
}
