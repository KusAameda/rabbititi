const frames = Array.from(document.querySelectorAll(".hero-frame"));
const links = Array.from(document.querySelectorAll(".nav-link"));
const sections = Array.from(document.querySelectorAll("[data-section]"));

let activeFrame = 0;

if (frames.length > 1) {
  window.setInterval(() => {
    frames[activeFrame].classList.remove("is-visible");
    activeFrame = (activeFrame + 1) % frames.length;
    frames[activeFrame].classList.add("is-visible");
  }, 5200);
}

window.addEventListener("pointermove", (event) => {
  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  document.documentElement.style.setProperty("--mx", x.toFixed(3));
  document.documentElement.style.setProperty("--my", y.toFixed(3));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      links.forEach((link) => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
);

sections.forEach((section) => observer.observe(section));
