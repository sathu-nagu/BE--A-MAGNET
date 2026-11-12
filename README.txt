BE A MAGNET — Positive Energy and Mindful Living Website

PAGES
1. index.html — Home
2. about.html — About the BE A MAGNET approach
3. feedback.html — Feedback form
4. contact.html — Contact details and contact form

SHARED FILES
- style.css — responsive layout and design
- script.js — mobile navigation, WhatsApp link and demo form interactions

RUN
1. Extract the ZIP.
2. Open the folder in Visual Studio Code or Visual Studio.
3. Open index.html in a browser, or use VS Code Live Server.

EDIT PLACEHOLDERS
Replace contact placeholders with the actual location, phone and email details before publishing.
In script.js, replace WHATSAPP_NUMBER = "1234" with a real number including country code and digits only (Sri Lanka example: 94771234567).

IMPORTANT FORM NOTE
Feedback and contact forms currently perform browser-side validation and show a demo confirmation only. They do NOT send email, save feedback or store student data. To receive submissions, connect a secure backend/database or a trusted form service. Do not publish while claiming that demo forms deliver messages.

BRAND LOGO
- Your uploaded BE A MAGNET Mind Coaching logo has been cropped from the screenshot and added at assets/be-a-magnet-logo.jpg.
- The logo is displayed in the navigation and footer on all four pages.
- The colour theme has been changed to match the gold-and-white logo.

DESIGN UPDATE
- Original uploaded logo and gold/white brand palette are preserved.
- Refined spacing, typography, navigation, cards, buttons, forms and mobile layout.
- Added current-page navigation highlighting.

HOMEPAGE BACKGROUND IMAGE + TEXT OVERLAY
- assets/golden-mind-background.jpg is the gold neural-brain background artwork.
- The homepage hero uses this image as a CSS background.
- The headline, tagline, description, feature labels and CTA are real HTML elements inside .hero-content, layered above the background.
- Edit the visible homepage words directly in index.html; adjust image position, overlay darkness and sizing in the final section of style.css.

SCROLL-MOVING BACKGROUND EFFECT
- The homepage hero background now moves gently as the visitor scrolls (parallax effect).
- It also has a slow ambient background drift, giving a subtle video-like feel without loading a video.
- The effect respects the visitor's reduced-motion accessibility setting.
- Adjust movement strength in script.js at `rect.top * 0.16` and the maximum shift values.

ANIMATED HOME HERO BACKGROUND
- assets/golden-energy-to-brain.gif is an animated wide hero background.
- The golden energy/light travels across the image towards the glowing brain.
- The homepage CSS uses this GIF as the background image; HTML heading and buttons remain editable above it.
- GIF animation plays automatically in browsers. For best performance, compress/optimise the GIF before production if needed.

EXPANDED HOMEPAGE CONTENT
- Homepage includes a welcome section, positive-mindset themes, a reflection journey, quote band, FAQ and contact CTA.
- All copy is editable in index.html.
- The FAQ uses native HTML details/summary elements; no extra JavaScript required.
- No unverified contact details, testimonials, or success statistics have been invented.


NEW CODE ADDED
1) WhatsApp:
   - A floating WhatsApp button appears on all four pages.
   - Search each HTML file for `https://wa.me/94XXXXXXXXX`.
   - Replace `94XXXXXXXXX` with your own number including country code, without +, spaces or dashes.
   - Example format only: 94771234567.

2) Chat assistant:
   - A floating BE A MAGNET assistant appears on all four pages.
   - It has built-in FAQ fallback replies.
   - To enable real AI answers, create a secure backend POST endpoint at /api/chat.
   - Request JSON: {"message":"visitor question"}
   - Response JSON: {"reply":"assistant answer"}
   - Keep your AI provider API key on the server, never in script.js.

3) Moving golden light:
   - Added a CSS light sweep over the homepage hero image.
   - The sweep animates automatically; it respects reduced-motion preferences.
   - This is a CSS animation, not an MP4 video file.

ANIMATION SPEED UPDATE
- Golden light sweep slowed to approximately 0.3x its previous speed (26.7-second loop).
- Ambient background drift slowed to a 60-second loop.
- To make the golden light even slower, increase `26.7s` in style.css.


NEW FEATURES (November 2026)
- The animated golden energy GIF has been retimed to approximately 0.3x speed (frame durations increased to 3.33 times the original).
- English is the original website language. Visitors can use the Google Translate selector on every page to view machine-translated text; language names are shown in their native scripts and English. Translation requires an internet connection.
- BE A MAGNET is presented as a positive-energy and mindful-living offering, not a psychology teaching class.
