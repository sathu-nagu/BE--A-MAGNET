const WHATSAPP_NUMBER = "94722026727";

document.querySelectorAll(".year").forEach(el => el.textContent = new Date().getFullYear());

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.textContent = open ? "×" : "☰";
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  }));
}

const translateElement = document.getElementById("google_translate_element");
if (translateElement) {
  const languageLabels = {
    ar: "🇸🇦 العربية (Arabic)",
    bn: "🇧🇩 বাংলা (Bengali)",
    de: "🇩🇪 Deutsch (German)",
    en: "English",
    es: "🇪🇸 Español (Spanish)",
    fr: "🇫🇷 Français (French)",
    hi: "🇮🇳 हिन्दी (Hindi)",
    it: "🇮🇹 Italiano (Italian)",
    ja: "🇯🇵 日本語 (Japanese)",
    ko: "🇰🇷 한국어 (Korean)",
    ms: "🇲🇾 Bahasa Melayu (Malay)",
    ne: "🇳🇵 नेपाली (Nepali)",
    nl: "🇳🇱 Nederlands (Dutch)",
    pl: "🇵🇱 Polski (Polish)",
    pt: "🇵🇹 Português (Portuguese)",
    ru: "🇷🇺 Русский (Russian)",
    si: "🇱🇰 සිංහල (Sinhala)",
    ta: "🇱🇰 தமிழ் (Tamil)",
    th: "🇹🇭 ไทย (Thai)",
    tr: "🇹🇷 Türkçe (Turkish)",
    ur: "🇵🇰 اردو (Urdu)",
    "zh-CN": "🇨🇳 简体中文 (Chinese)"
  };
  const labelLanguages = () => {
    const select = translateElement.querySelector(".goog-te-combo");
    if (!select) return false;
    Array.from(select.options).forEach(option => {
      const label = languageLabels[option.value];
      if (label && option.textContent !== label) option.textContent = label;
    });
    const defaultOption = select.querySelector('option[value=""]');
    if (defaultOption && defaultOption.textContent !== "English (default)") {
      defaultOption.textContent = "English (default)";
    }
  };
  const languageObserver = new MutationObserver(() => {
    labelLanguages();
  });
  languageObserver.observe(translateElement, {childList: true, subtree: true});
  labelLanguages();
}

const whatsapp = document.getElementById("contact-whatsapp");
if (whatsapp) {
  const msg = encodeURIComponent("Hello BE A MAGNET, I would like to know more about your approach to positive energy and mindful living.");
  whatsapp.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
  whatsapp.target = "_blank";
  whatsapp.rel = "noopener";
}

// Front-end demo only: forms validate and show a message but do not save/send submissions.
// Connect a backend, database or form service to receive real submissions.
function setupDemoForm(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = successMessage + " Demo only — connect a backend to receive and store this submission.";
    form.reset();
  });
}
setupDemoForm("feedback-form", "feedback-status", "Thank you for your feedback!");

const joinClassToggle = document.getElementById("join-class-toggle");
const joinClassForm = document.getElementById("join-class-form");
if (joinClassToggle && joinClassForm) {
  const closedLabel = joinClassToggle.textContent.trim();
  joinClassToggle.addEventListener("click", () => {
    const open = joinClassForm.hidden;
    joinClassForm.hidden = !open;
    joinClassToggle.setAttribute("aria-expanded", String(open));
    joinClassToggle.textContent = open ? "Close form ×" : closedLabel;
    if (open) {
      joinClassForm.scrollIntoView({behavior: "smooth", block: "nearest"});
      joinClassForm.querySelector("#join-name").focus();
    }
  });

  if (location.hash === "#join-class-form") {
    joinClassForm.hidden = false;
    joinClassToggle.setAttribute("aria-expanded", "true");
    joinClassToggle.textContent = "Close form ×";
    requestAnimationFrame(() => {
      joinClassForm.scrollIntoView({behavior: "smooth", block: "start"});
      joinClassForm.querySelector("#join-name").focus({preventScroll: true});
    });
  }

  joinClassForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!joinClassForm.reportValidity()) return;

    const data = new FormData(joinClassForm);
    const country = joinClassForm.elements.country;
    const countryName = country.selectedOptions[0].textContent.replace(/\s\(\+\d+\)$/, "");
    const phone = String(data.get("phone")).replace(/\D/g, "");
    const request = [
      "Hello BE A MAGNET, I would like to join your class.",
      "",
      `Full name: ${String(data.get("name")).trim()}`,
      `Country: ${countryName}`,
      `Phone: +${String(data.get("country"))}${phone}`,
      `Message: ${String(data.get("message")).trim()}`
    ].join("\n");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(request)}`;
    const status = document.getElementById("join-class-status");
    const fallbackLink = document.createElement("a");
    fallbackLink.href = whatsappUrl;
    fallbackLink.target = "_blank";
    fallbackLink.rel = "noopener noreferrer";
    fallbackLink.textContent = "Open WhatsApp to send your request.";
    status.replaceChildren(document.createTextNode("Your request is ready. "), fallbackLink);
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  });
}

// Highlight the current page in the navigation.
const currentPage = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav a").forEach(link => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.setAttribute("aria-current", "page");
    link.style.color = "#a87316";
  }
});


// Smooth scroll parallax: the hero background shifts gently as the visitor scrolls.
(() => {
  const hero = document.querySelector(".hero-background");
  if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  const updateParallax = () => {
    const rect = hero.getBoundingClientRect();
    // Move the background more slowly than the page for a cinematic depth effect.
    const shift = Math.max(-55, Math.min(55, -rect.top * 0.16));
    hero.style.setProperty("--parallax-y", `${shift}px`);
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", updateParallax);
  updateParallax();
})();


// BE A MAGNET floating assistant. For real AI, implement POST /api/chat on your server.
(() => {
  const launcher = document.getElementById("chatLauncher");
  const panel = document.getElementById("chatPanel");
  const close = document.getElementById("chatClose");
  const form = document.getElementById("chatForm");
  const input = document.getElementById("chatInput");
  const messages = document.getElementById("chatMessages");
  if (!launcher || !panel || !form || !input || !messages) return;

  const setOpen = (open) => {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));
    if (open) input.focus();
  };
  launcher.addEventListener("click", () => setOpen(panel.hidden));
  close?.addEventListener("click", () => setOpen(false));

  const addMessage = (text, who) => {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${who}`;
    bubble.textContent = text;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
    return bubble;
  };

  const localAnswer = (question) => {
    const q = question.toLowerCase();
    if (/(positive|energy|universe|gratitude|mindful|intention)/.test(q))
      return "BE A MAGNET shares reflections inspired by positive energy, gratitude, mindful living and a sense of connection with the universe.";
    if (/(class|teach|psychology|course|lesson)/.test(q))
      return "BE A MAGNET is not a teaching or psychology class. We share reflections and practices for positive mindset and mindful living.";
    if (/(contact|connect|message|whatsapp)/.test(q))
      return "Please use the Connect with Us page or WhatsApp button to get in touch with BE A MAGNET.";
    return "Thanks for your question! BE A MAGNET shares reflections for positive energy and mindful living. For a personal response, please use the Connect with Us page.";
  };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addMessage(question, "user");
    input.value = "";
    const pending = addMessage("One moment…", "bot");

    try {
      // Configure this endpoint on your own backend. Never put an AI API key in browser JavaScript.
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({message: question})
      });
      if (!response.ok) throw new Error("AI endpoint not configured");
      const data = await response.json();
      pending.textContent = data.reply || localAnswer(question);
    } catch {
      pending.textContent = localAnswer(question);
    }
    messages.scrollTop = messages.scrollHeight;
  });
})();
