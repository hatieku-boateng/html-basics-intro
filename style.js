// =========================================
// Learn HTML - Interactive Page JS
// =========================================

// == 1. Scroll Progress Bar ==
const progressBar = document.getElementById("progressBar");
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = ((scrollTop / docHeight) * 100) + "%";
});

// == 2. Dark Mode Toggle ==
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkToggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    darkToggle.textContent = "☀️";
}

// == 3. Scroll Spy (active nav link) ==
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav ul li a");
const spyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove("active"));
            const active = document.querySelector(`nav ul li a[href="#${entry.target.id}"]`);
            if (active) active.classList.add("active");
        }
    });
}, { threshold: 0.4 });
sections.forEach((s) => spyObserver.observe(s));

// == 4. Fade-in sections on scroll ==
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });
document.querySelectorAll("section").forEach((s) => {
    s.classList.add("fade-in");
    fadeObserver.observe(s);
});

// == 5. Back to Top Button ==
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 400);
});
backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// == 6. Accordion ==
document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const body = btn.nextElementSibling;
        const isOpen = btn.classList.contains("open");
        // Close all
        document.querySelectorAll(".accordion-btn").forEach((b) => {
            b.classList.remove("open");
            b.nextElementSibling.classList.remove("open");
        });
        // Open clicked if it was closed
        if (!isOpen) {
            btn.classList.add("open");
            body.classList.add("open");
        }
    });
});

// == 7. Tabs ==
document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const tabId = btn.dataset.tab;
        btn.closest(".tabs").querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        btn.closest(".tabs").querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById("tab-" + tabId).classList.add("active");
    });
});

// == 8. Heading Demo click to preview ==
document.querySelectorAll(".h-demo").forEach((el, i) => {
    el.style.fontSize = el.dataset.size;
    el.addEventListener("click", () => {
        const level = i + 1;
        const tag = "h" + level;
        el.innerHTML = `&lt;${tag}&gt; This is a heading level ${level} &lt;/${tag}&gt;`;
        setTimeout(() => { el.textContent = `h${level} — ${["Page Title","Section Title","Sub-section","Minor Heading","Small Heading","Smallest"][i]}`; }, 1800);
    });
});

// == 9. Live Playground ==
const editor = document.getElementById("htmlEditor");
const preview = document.getElementById("htmlPreview");
const defaultCode = editor.value;

function updatePreview() {
    const doc = preview.contentDocument || preview.contentWindow.document;
    doc.open();
    doc.write(`<!DOCTYPE html><html><head><style>
        body { font-family: 'Segoe UI', sans-serif; padding: 16px; font-size: 15px; color: #1e293b; line-height: 1.6; }
        h1,h2,h3 { color: #0f172a; } a { color: #6366f1; } code { background:#f1f5f9; padding:2px 6px; border-radius:4px; }
    </style></head><body>${editor.value}</body></html>`);
    doc.close();
}

editor.addEventListener("input", updatePreview);
updatePreview();

document.getElementById("resetPlayground").addEventListener("click", () => {
    editor.value = defaultCode;
    updatePreview();
});
document.getElementById("clearPlayground").addEventListener("click", () => {
    editor.value = "";
    updatePreview();
});

// == 10. Table Filter ==
const table = document.querySelector("#tags table");
if (table) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "🔍  Search tags by name or purpose...";
    input.id = "tableFilter";
    table.parentNode.insertBefore(input, table);
    input.addEventListener("input", function () {
        const q = this.value.toLowerCase();
        table.querySelectorAll("tbody tr").forEach((row) => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
        });
    });
}

// == 11. Click to copy code ==
document.querySelectorAll("code").forEach((el) => {
    el.title = "Click to copy";
    el.addEventListener("click", function () {
        const original = this.textContent;
        navigator.clipboard.writeText(original).then(() => {
            this.textContent = "Copied!";
            this.style.background = "#dcfce7";
            this.style.color = "#15803d";
            this.style.borderColor = "#16a34a";
            setTimeout(() => {
                this.textContent = original;
                this.style.background = "";
                this.style.color = "";
                this.style.borderColor = "";
            }, 1500);
        });
    });
});

// == 12. Quiz ==
const quizData = [
    {
        q: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "HyperLinks and Text Markup Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        q: "Which tag creates the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        answer: 2
    },
    {
        q: "Which tag is used to insert an image?",
        options: ["<picture>", "<image>", "<src>", "<img>"],
        answer: 3
    },
    {
        q: "What attribute specifies the URL of a link in the <a> tag?",
        options: ["src", "href", "link", "url"],
        answer: 1
    },
    {
        q: "Which HTML element is used for the largest section of page content visible to the user?",
        options: ["<content>", "<section>", "<body>", "<main>"],
        answer: 2
    }
];

function buildQuiz() {
    const container = document.getElementById("quizContainer");
    container.innerHTML = "";
    quizData.forEach((item, qi) => {
        const block = document.createElement("div");
        block.className = "quiz-question";
        block.innerHTML = `<p>Q${qi + 1}. ${item.q}</p><div class="quiz-options">${
            item.options.map((opt, oi) =>
                `<label class="quiz-option"><input type="radio" name="q${qi}" value="${oi}" /> ${opt}</label>`
            ).join("")
        }</div>`;
        container.appendChild(block);
    });
    const submitBtn = document.createElement("button");
    submitBtn.type = "submit";
    submitBtn.textContent = "Submit Answers";
    container.appendChild(submitBtn);

    submitBtn.addEventListener("click", () => {
        let score = 0;
        quizData.forEach((item, qi) => {
            const selected = container.querySelector(`input[name="q${qi}"]:checked`);
            const options = container.querySelectorAll(`input[name="q${qi}"]`);
            options.forEach((opt) => {
                const label = opt.parentElement;
                label.style.pointerEvents = "none";
                if (parseInt(opt.value) === item.answer) label.classList.add("correct");
                if (opt.checked && parseInt(opt.value) !== item.answer) label.classList.add("wrong");
            });
            if (selected && parseInt(selected.value) === item.answer) score++;
        });
        submitBtn.disabled = true;
        const result = document.getElementById("quizResult");
        const scoreEl = document.getElementById("quizScore");
        const pct = Math.round((score / quizData.length) * 100);
        const emoji = pct === 100 ? "🎉" : pct >= 60 ? "👍" : "📖";
        scoreEl.textContent = `${emoji}  You scored ${score} out of ${quizData.length} (${pct}%)`;
        result.classList.remove("hidden");
        result.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

buildQuiz();
document.getElementById("retakeQuiz").addEventListener("click", () => {
    document.getElementById("quizResult").classList.add("hidden");
    buildQuiz();
});

// == 13. Footer year ==
const yearEl = document.getElementById("footerYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();