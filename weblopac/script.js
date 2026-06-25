/* =========================
   HEADER SCROLL EFFECT
========================= */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* =========================
   MOBILE MENU
========================= */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".nav-links");

const mobileButton = document.createElement("button");
mobileButton.classList.add("mobile-toggle");
mobileButton.innerHTML = "☰";

navbar.appendChild(mobileButton);

mobileButton.addEventListener("click", () => {
    navLinks.classList.toggle("mobile-active");
});

/* Cerrar menú al clicar fuera */
document.addEventListener("click", (e) => {
    if (
        !navLinks.contains(e.target) &&
        !mobileButton.contains(e.target)
    ) {
        navLinks.classList.remove("mobile-active");
    }
});

/* Cerrar menú al clicar links */
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
    });
});

/* =========================
   SCROLL REVEAL
========================= */
const sections = document.querySelectorAll(
    ".services, .about, .gallery, .stats, .brands, .testimonials, .quote, .contact"
);

sections.forEach(section => {
    section.classList.add("hidden-section");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-section");
        }
    });
}, {
    threshold: 0.15
});

sections.forEach(section => observer.observe(section));

/* =========================
   COUNTERS
========================= */
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

function animateCounters() {
    if (counterStarted) return;
    counterStarted = true;

    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let count = 0;
        const increment = target / 120;

        function updateCounter() {
            count += increment;

            if (count < target) {
                counter.innerText = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = target;
            }
        }

        updateCounter();
    });
}

const statsSection = document.querySelector(".stats");

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, {
    threshold: 0.35
});

if (statsSection) {
    counterObserver.observe(statsSection);
}

/* =========================
   FORMULARIO WHATSAPP
========================= */
const quoteForm = document.getElementById("quoteForm");

if (quoteForm) {
    quoteForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const honeypot = document.querySelector('[name="website"]');

        if (honeypot && honeypot.value) {
            return;
        }

        const name = document.getElementById("formName").value.trim();
        const phone = document.getElementById("formPhone").value.trim();
        const email = document.getElementById("formEmail").value.trim();
        const message = document.getElementById("formMessage").value.trim();

        if (!name || !phone || !message) {
            alert("Por favor completa los campos obligatorios.");
            return;
        }

        const text =
            `Hola, deseo solicitar una cotización.%0A%0A` +
            `👤 Nombre/Empresa: ${name}%0A` +
            `📞 Teléfono: ${phone}%0A` +
            `📧 Email: ${email || "No especificado"}%0A%0A` +
            `📝 Requerimiento:%0A${message}`;

        window.open(
            `https://wa.me/51920306004?text=${text}`,
            "_blank"
        );

        quoteForm.reset();
    });
}

/* =========================
   ACTIVE MENU LINKS
========================= */
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    document.querySelectorAll("section[id]").forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navAnchors.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =========================
   IMAGE LOADING EFFECT
========================= */
const images = document.querySelectorAll("img");

images.forEach(img => {
    if (img.complete) {
        img.classList.add("loaded");
    } else {
        img.addEventListener("load", () => {
            img.classList.add("loaded");
        });
    }
});

/* =========================
   INITIAL LOAD
========================= */
window.addEventListener("load", () => {
    document.body.classList.add("loaded-page");
});