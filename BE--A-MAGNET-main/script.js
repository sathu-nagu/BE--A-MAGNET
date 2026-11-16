function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: "en",
    autoDisplay: false,
    includedLanguages: "en,ta,si,hi,fr,es,de,it,ja,ko,zh-CN,ar,pt,ru,bn,ms,th,tr,nl,pl,ur,ne"
  }, "google_translate_element");
}

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

const themeToggleButtons = document.querySelectorAll(".theme-toggle");
if (themeToggleButtons.length) {
  const themeStorageKey = "beAMagnetTheme";
  let activeTheme = "light";
  try {
    const savedTheme = localStorage.getItem(themeStorageKey);
    if (savedTheme === "dark" || savedTheme === "light") activeTheme = savedTheme;
  } catch {}

  const applyTheme = theme => {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll(".theme-aware-logo").forEach(image => {
      const source = theme === "dark" ? image.dataset.darkSrc : image.dataset.lightSrc;
      if (source && image.getAttribute("src") !== source) image.setAttribute("src", source);
    });
    themeToggleButtons.forEach(button => {
      const switchTo = theme === "dark" ? "light" : "dark";
      const icon = button.querySelector("span");
      if (icon) icon.textContent = theme === "dark" ? "☀" : "☾";
      button.setAttribute("aria-label", `Switch to ${switchTo} mode`);
      button.title = `Switch to ${switchTo} mode`;
    });
  };

  applyTheme(activeTheme);
  themeToggleButtons.forEach(button => button.addEventListener("click", () => {
    activeTheme = activeTheme === "dark" ? "light" : "dark";
    applyTheme(activeTheme);
    try {
      localStorage.setItem(themeStorageKey, activeTheme);
    } catch {}
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

const contactMessageForm = document.getElementById("contact-message-form");
if (contactMessageForm) {
  const contactMessageStatus = document.getElementById("contact-message-status");
  contactMessageForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!contactMessageForm.reportValidity()) return;

    const formData = new FormData(contactMessageForm);
    const senderName = String(formData.get("name")).trim();
    const senderEmail = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();
    const subject = `BE A MAGNET website message from ${senderName}`;
    const body = [`Name: ${senderName}`, `Email: ${senderEmail}`, "", message].join("\n");
    const emailUrl = `mailto:SANTHOSHNAGARATNAM@GMAIL.COM?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    contactMessageStatus.textContent = "Opening an email draft. Send it from your email app to complete your message.";
    window.location.href = emailUrl;
  });
}

const feedbackForm = document.getElementById("feedback-form");
const testimonialList = document.getElementById("testimonial-list");
const testimonialEmpty = document.getElementById("testimonial-empty");
if (feedbackForm && testimonialList && testimonialEmpty) {
  const feedbackStatus = document.getElementById("feedback-status");
  const feedbackStorageKey = "beAMagnetTestimonials";
  const nameInput = feedbackForm.querySelector("#feedback-name");
  const photoInput = feedbackForm.querySelector("#feedback-photo");
  const ratingInput = feedbackForm.querySelector("#rating");
  const messageInput = feedbackForm.querySelector("#feedback-message");

  const resizeFeedbackImage = file => {
    if (!file) return Promise.resolve("");
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      return Promise.reject(new Error("Choose a JPEG, PNG or WebP image."));
    }
    if (file.size > 5 * 1024 * 1024) {
      return Promise.reject(new Error("Choose an image smaller than 5 MB."));
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("The selected image could not be read."));
      reader.onload = () => {
        const source = new Image();
        source.onerror = () => reject(new Error("The selected image could not be opened."));
        source.onload = () => {
          const scale = Math.min(1, 800 / Math.max(source.naturalWidth, source.naturalHeight));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
          canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("This browser could not process the selected image."));
            return;
          }
          context.fillStyle = "#fff";
          context.fillRect(0, 0, canvas.width, canvas.height);
          context.drawImage(source, 0, 0, canvas.width, canvas.height);
          const resizedImage = canvas.toDataURL("image/jpeg", 0.76);
          if (resizedImage.length > 700000) {
            reject(new Error("This image is still too large after resizing. Choose a smaller image."));
            return;
          }
          resolve(resizedImage);
        };
        source.src = String(reader.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const readTestimonials = () => {
    try {
      const entries = JSON.parse(localStorage.getItem(feedbackStorageKey) || "[]");
      if (!Array.isArray(entries)) return [];
      return entries.filter(entry =>
        entry && typeof entry.name === "string" && typeof entry.message === "string" &&
        Number.isInteger(entry.rating) && entry.rating >= 1 && entry.rating <= 5 &&
        entry.name.trim() && entry.message.trim()
      ).map((entry, index) => ({
        id: typeof entry.id === "string" && entry.id ? entry.id : `${index}-${entry.name}-${entry.rating}`,
        name: entry.name.trim(),
        rating: entry.rating,
        message: entry.message.trim(),
        image: typeof entry.image === "string" && entry.image.startsWith("data:image/jpeg;base64,") ? entry.image : ""
      }));
    } catch {
      return [];
    }
  };

  const createTestimonialCard = entry => {
    const card = document.createElement("article");
    card.className = "testimonial-card";

    const header = document.createElement("div");
    header.className = "testimonial-card-header";

    const avatar = document.createElement("span");
    avatar.className = "testimonial-avatar";
    if (entry.image) {
      const photo = document.createElement("img");
      photo.className = "testimonial-avatar-photo";
      photo.src = entry.image;
      photo.alt = `Photo shared by ${entry.name}`;
      avatar.append(photo);
    } else {
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = entry.name.split(/\s+/).slice(0, 2).map(part => part[0]).join("").toUpperCase();
    }

    const identity = document.createElement("div");
    identity.className = "testimonial-identity";
    const name = document.createElement("strong");
    name.textContent = entry.name;
    const rating = document.createElement("div");
    rating.className = "testimonial-rating";
    const stars = document.createElement("span");
    stars.className = "testimonial-stars";
    stars.setAttribute("aria-hidden", "true");
    stars.textContent = "★".repeat(entry.rating) + "☆".repeat(5 - entry.rating);
    const score = document.createElement("span");
    score.textContent = `${entry.rating}.0`;
    rating.append(stars, score);
    identity.append(name, rating);
    header.append(avatar, identity);

    const reflection = document.createElement("p");
    reflection.className = "testimonial-message";
    reflection.textContent = entry.message;

    const deleteButton = document.createElement("button");
    deleteButton.className = "testimonial-delete";
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.title = "Delete this feedback";
    deleteButton.setAttribute("aria-label", `Delete feedback from ${entry.name}`);
    deleteButton.addEventListener("click", () => {
      if (!window.confirm(`Delete feedback from ${entry.name}?`)) return;
      try {
        const remainingEntries = readTestimonials().filter(savedEntry => savedEntry.id !== entry.id);
        localStorage.setItem(feedbackStorageKey, JSON.stringify(remainingEntries));
        renderTestimonials();
        feedbackStatus.textContent = "The reflection was deleted from this browser.";
      } catch {
        feedbackStatus.textContent = "This browser could not delete the reflection. Please check its storage settings.";
      }
    });

    header.append(avatar, identity, deleteButton);
    card.append(header, reflection);
    return card;
  };

  const renderTestimonials = () => {
    const entries = readTestimonials();
    testimonialList.replaceChildren(...entries.map(createTestimonialCard));
    testimonialEmpty.hidden = entries.length > 0;
  };

  feedbackForm.addEventListener("submit", async event => {
    event.preventDefault();
    if (!feedbackForm.reportValidity()) return;

    let image = "";
    try {
      image = await resizeFeedbackImage(photoInput.files[0]);
    } catch (error) {
      feedbackStatus.textContent = error.message;
      return;
    }

    const entry = {
      id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
      name: nameInput.value.trim().slice(0, 60),
      rating: Number(ratingInput.value),
      message: messageInput.value.trim().slice(0, 600),
      image
    };
    if (!entry.name || !entry.message) {
      feedbackStatus.textContent = "Please enter your name and reflection.";
      return;
    }

    try {
      const entries = readTestimonials();
      entries.unshift(entry);
      localStorage.setItem(feedbackStorageKey, JSON.stringify(entries));
    } catch {
      feedbackStatus.textContent = "This browser could not save your reflection. Please check its storage settings.";
      return;
    }

    renderTestimonials();
    feedbackForm.reset();
    feedbackStatus.textContent = "Thank you. Your reflection is now shown above in this browser.";
    testimonialList.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  renderTestimonials();
}

const joinClassToggle = document.getElementById("join-class-toggle");
const joinClassForm = document.getElementById("join-class-form");
if (joinClassToggle && joinClassForm) {
  const closedLabel = joinClassToggle.textContent.trim();
  const country = joinClassForm.elements.country;
  const otherCountryFields = joinClassForm.querySelector("#join-other-country-fields");
  const otherCountryName = joinClassForm.elements.otherCountry;
  const otherCountryCode = joinClassForm.elements.otherCountryCode;
  const firstName = joinClassForm.elements.firstName;
  const secondName = joinClassForm.elements.secondName;
  const phoneNumber = joinClassForm.elements.phone;
  const phoneNumberLengths = {
    "1": [10, 10],
    "27": [9, 9],
    "33": [9, 9],
    "34": [9, 9],
    "39": [6, 11],
    "44": [7, 10],
    "49": [5, 11],
    "60": [8, 10],
    "61": [9, 9],
    "64": [8, 10],
    "65": [8, 8],
    "81": [9, 10],
    "82": [8, 10],
    "86": [11, 11],
    "91": [10, 10],
    "92": [10, 10],
    "94": [9, 9],
    "960": [7, 7],
    "966": [9, 9],
    "971": [8, 9],
    "974": [8, 8],
    "977": [10, 10],
    "880": [10, 10]
  };
  const scrollJoinFormIntoView = () => joinClassForm.scrollIntoView({behavior: "instant", block: "start"});
  const updateOtherCountryFields = () => {
    const isOther = country.value === "other";
    otherCountryFields.hidden = !isOther;
    otherCountryName.required = isOther;
    otherCountryCode.required = isOther;
  };
  const updatePhoneNumberLength = () => {
    const [minDigits, maxDigits] = phoneNumberLengths[country.value] || [6, 15];
    phoneNumber.maxLength = maxDigits;
    phoneNumber.pattern = `[0-9]{${minDigits},${maxDigits}}`;
    phoneNumber.placeholder = minDigits === maxDigits
      ? `Enter ${minDigits} digits`
      : `Enter ${minDigits}-${maxDigits} digits`;
    phoneNumber.title = minDigits === maxDigits
      ? `Enter exactly ${minDigits} digits, without the country code.`
      : `Enter between ${minDigits} and ${maxDigits} digits, without the country code.`;
    if (country.value === "94") phoneNumber.title += " Do not include the leading 0.";
    phoneNumber.value = phoneNumber.value.slice(0, maxDigits);
  };
  country.addEventListener("change", updateOtherCountryFields);
  country.addEventListener("change", updatePhoneNumberLength);
  updateOtherCountryFields();
  updatePhoneNumberLength();
  [firstName, secondName].forEach(input => {
    input.addEventListener("input", () => {
      const text = input.value.replace(/\p{N}/gu, "");
      if (input.value !== text) input.value = text;
    });
  });
  [otherCountryCode, joinClassForm.elements.phone].forEach(input => {
    input.addEventListener("input", () => {
      const digits = input.value.replace(/\D/g, "").slice(0, input.maxLength);
      if (input.value !== digits) input.value = digits;
    });
  });

  joinClassToggle.addEventListener("click", () => {
    const open = joinClassForm.hidden;
    joinClassForm.hidden = !open;
    joinClassToggle.setAttribute("aria-expanded", String(open));
    joinClassToggle.textContent = open ? "Close form ×" : closedLabel;
    if (open) {
      firstName.focus({preventScroll: true});
    }
  });

  if (location.hash === "#join-class-form") {
    joinClassForm.hidden = false;
    joinClassToggle.setAttribute("aria-expanded", "true");
    joinClassToggle.textContent = "Close form ×";
    requestAnimationFrame(() => {
      scrollJoinFormIntoView();
      firstName.focus({preventScroll: true});
    });
  }

  joinClassForm.addEventListener("submit", event => {
    event.preventDefault();
    if (!joinClassForm.reportValidity()) return;

    const data = new FormData(joinClassForm);
    const isOther = country.value === "other";
    const countryName = isOther
      ? String(data.get("otherCountry")).trim()
      : country.selectedOptions[0].textContent.replace(/\s\(\+\d+\)$/, "");
    const countryCode = isOther
      ? String(data.get("otherCountryCode")).replace(/\D/g, "")
      : String(data.get("country"));
    const phone = String(data.get("phone")).replace(/\D/g, "");
    const request = [
      "Hello BE A MAGNET, I would like to join your class.",
      "",
      `First name: ${String(data.get("firstName")).trim()}`,
      `Second name: ${String(data.get("secondName")).trim()}`,
      `Email: ${String(data.get("email")).trim()}`,
      `Country: ${countryName}`,
      `Phone: +${countryCode}${phone}`,
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


