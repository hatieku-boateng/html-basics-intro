// =========================================
// Learn HTML - Interactive Page JS
// =========================================

// == Safe localStorage helper ==
function storageGet(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
function storageSet(key, val) { try { localStorage.setItem(key, val); } catch (e) { } }

// == 1. Scroll Progress Bar ==
const progressBar = document.getElementById("progressBar");
if (progressBar) {
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
    });
}

// == 2. Dark Mode Toggle ==
const darkToggle = document.getElementById("darkToggle");

function applyTheme(dark) {
    document.body.classList.toggle("dark", dark);
    if (darkToggle) darkToggle.textContent = dark ? "☀️" : "🌙";
}

applyTheme(storageGet("theme") === "dark");

if (darkToggle) {
    darkToggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        darkToggle.textContent = isDark ? "☀️" : "🌙";
        storageSet("theme", isDark ? "dark" : "light");
    });
}

// == 3. Active nav link by pathname ==
(function () {
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === currentPage || (currentPage === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });
})();

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
if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 400);
    });
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// == 6. Accordion ==
document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const body = btn.nextElementSibling;
        const isOpen = btn.classList.contains("open");
        document.querySelectorAll(".accordion-btn").forEach((b) => {
            b.classList.remove("open");
            b.nextElementSibling.classList.remove("open");
        });
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
        const tabEl = document.getElementById("tab-" + tabId);
        if (tabEl) tabEl.classList.add("active");
    });
});

// == 8. Heading Demo ==
document.querySelectorAll(".h-demo").forEach((el, i) => {
    el.style.fontSize = el.dataset.size;
    el.addEventListener("click", () => {
        const level = i + 1;
        const labels = ["Page Title", "Section Title", "Sub-section", "Minor Heading", "Small Heading", "Smallest"];
        el.innerHTML = `&lt;h${level}&gt; This is a heading level ${level} &lt;/h${level}&gt;`;
        setTimeout(() => { el.textContent = `h${level} — ${labels[i]}`; }, 1800);
    });
});

// == 9. Live Playground ==
(function () {
    const editor = document.getElementById("htmlEditor");
    const preview = document.getElementById("htmlPreview");
    if (!editor || !preview) return;

    const playgroundDefault = editor.value;

    function updatePreview() {
        const doc = preview.contentDocument || preview.contentWindow.document;
        doc.open();
        doc.write(`<!DOCTYPE html><html><head><style>
            body { font-family: 'Segoe UI', sans-serif; padding: 16px; font-size: 15px; color: #1e293b; line-height: 1.6; }
            h1,h2,h3 { color: #0f172a; } a { color: #6366f1; }
            code { background:#f1f5f9; padding:2px 6px; border-radius:4px; }
        </style></head><body>${editor.value}</body></html>`);
        doc.close();
    }

    editor.addEventListener("input", updatePreview);
    updatePreview();

    const resetBtn = document.getElementById("resetPlayground");
    const clearBtn = document.getElementById("clearPlayground");
    if (resetBtn) resetBtn.addEventListener("click", () => { editor.value = playgroundDefault; updatePreview(); });
    if (clearBtn) clearBtn.addEventListener("click", () => { editor.value = ""; updatePreview(); });
})();

// == 10. Table Filter (tags.html) ==
const tagTable = document.querySelector("#text table, #media table, #lists table, #tables table, #forms table, #semantic table");
const firstTable = tagTable || document.querySelector("main table");
if (firstTable && window.location.pathname.includes("tags")) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "🔍  Search tags by name or purpose...";
    input.id = "tableFilter";
    input.style.cssText = "width:100%;padding:10px 14px;border:1px solid var(--color-border);border-radius:8px;font-size:0.9rem;background:var(--color-bg);color:var(--color-text);margin-bottom:12px;display:block;";
    firstTable.closest("section").insertBefore(input, firstTable.closest("section").querySelector("table"));
    input.addEventListener("input", function () {
        const q = this.value.toLowerCase();
        document.querySelectorAll("main table tbody tr").forEach((row) => {
            row.style.display = row.textContent.toLowerCase().includes(q) ? "" : "none";
        });
    });
}

// == 11. Click to copy code ==
document.querySelectorAll("code").forEach((el) => {
    el.title = "Click to copy";
    el.style.cursor = "pointer";
    el.addEventListener("click", function () {
        const original = this.textContent;
        navigator.clipboard.writeText(original).then(() => {
            this.textContent = "Copied!";
            this.style.background = "#dcfce7";
            this.style.color = "#15803d";
            setTimeout(() => {
                this.textContent = original;
                this.style.background = "";
                this.style.color = "";
            }, 1500);
        }).catch(() => { });
    });
});

// == 12. Quiz ==
(function () {
    const container = document.getElementById("quizContainer");
    if (!container) return;

    const quizData = [
        { q: "Which transmission mode allows data to flow in both directions simultaneously?", options: ["Simplex", "Half-duplex", "Full-duplex", "Multiplex"], answer: 2 },
        { q: "What does OSI stand for?", options: ["Open Source Infrastructure", "Online Service Interface", "Open Systems Interconnection", "Optical Signal Integration"], answer: 2 },
        { q: "Which layer of the OSI model is responsible for routing packets between networks?", options: ["Data Link Layer", "Transport Layer", "Session Layer", "Network Layer"], answer: 3 },
        { q: "Which transmission medium uses pulses of light to carry data?", options: ["Twisted Pair Cable", "Coaxial Cable", "Fibre Optic Cable", "Microwave"], answer: 2 },
        { q: "Which protocol provides reliable, ordered, and error-checked delivery of data?", options: ["UDP", "IP", "TCP", "ICMP"], answer: 2 }
    ];

    function buildQuiz() {
        container.innerHTML = "";
        quizData.forEach((item, qi) => {
            const block = document.createElement("div");
            block.className = "quiz-question";
            block.innerHTML = `<p>Q${qi + 1}. ${item.q}</p><div class="quiz-options">${item.options.map((opt, oi) =>
                `<label class="quiz-option"><input type="radio" name="q${qi}" value="${oi}" /> ${opt}</label>`
            ).join("")
                }</div>`;
            container.appendChild(block);
        });
        const submitBtn = document.createElement("button");
        submitBtn.type = "button";
        submitBtn.textContent = "Submit Answers";
        container.appendChild(submitBtn);

        submitBtn.addEventListener("click", () => {
            let score = 0;
            quizData.forEach((item, qi) => {
                const selected = container.querySelector(`input[name="q${qi}"]:checked`);
                container.querySelectorAll(`input[name="q${qi}"]`).forEach((opt) => {
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
            if (!result || !scoreEl) return;
            const pct = Math.round((score / quizData.length) * 100);
            const emoji = pct === 100 ? "🎉" : pct >= 60 ? "👍" : "📖";
            scoreEl.textContent = `${emoji}  You scored ${score} out of ${quizData.length} (${pct}%)`;
            result.classList.remove("hidden");
            result.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }

    buildQuiz();

    const retakeBtn = document.getElementById("retakeQuiz");
    if (retakeBtn) {
        retakeBtn.addEventListener("click", () => {
            const result = document.getElementById("quizResult");
            if (result) result.classList.add("hidden");
            buildQuiz();
        });
    }
})();

// == 13. Footer year ==
const yearEl = document.getElementById("footerYear");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// == 14. Challenge Cards (playground.html) ==
document.querySelectorAll(".challenge-card").forEach((card) => {
    card.addEventListener("click", () => {
        const ed = document.getElementById("htmlEditor");
        if (!ed) return;
        const raw = card.getAttribute("data-code");
        ed.value = raw.replace(/\\n/g, "\n");
        ed.dispatchEvent(new Event("input"));
        ed.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
});