/**
 * Portfolio behavior: render data, connect controls, then add optional motion.
 * content.js loads first. This IIFE keeps helper functions out of the global scope.
 * Study the initialization calls at the bottom to follow the page's execution order.
 */
(() => {
  "use strict";

  const data = window.PORTFOLIO_DATA;

  if (!data) {
    console.error("Portfolio data missing. Load content.js before script.js.");
    return;
  }

  // querySelector returns the first HTML element that matches a CSS selector.
  const query = (selector) => document.querySelector(selector);

  /** Escape text before inserting it into an HTML template. */
  function escapeHtml(value = "") {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return String(value).replace(/[&<>"']/g, (character) => characters[character]);
  }

  /** Allow website URLs, plus local asset paths when explicitly requested. */
  function getSafeUrl(value, allowRelative = false) {
    if (typeof value !== "string" || !value.trim()) return "";

    const url = value.trim();
    const isLocalPath = /^(?!\/)(?!.*\.\.)(?!.*:)[a-zA-Z0-9_./ ()-]+$/.test(url);

    if (allowRelative && isLocalPath) return url;
    if (!/^https?:\/\//i.test(url)) return "";

    try {
      const parsedUrl = new URL(url);
      return ["https:", "http:"].includes(parsedUrl.protocol) ? parsedUrl.href : "";
    } catch {
      return "";
    }
  }

  /** textContent updates plain text without interpreting it as HTML. */
  function setText(selector, value) {
    const element = query(selector);
    if (element && value) element.textContent = value;
  }

  /** Fill the fixed page sections with personal information from content.js. */
  function renderPersonalInformation() {
    const nameParts = data.name.trim().split(/\s+/);
    const initials = data.initials || nameParts[0][0] + nameParts.at(-1)[0];

    document.title = `${data.name} | OJT Portfolio`;
    setText("#brand-initials", initials);
    setText("#brand-name", data.name);
    query("#brand-name").insertAdjacentHTML("beforeend", '<span class="brand-dot">.</span>');
    setText("#hero-firstname", data.firstName);
    setText("#hero-intro", data.introduction);
    setText("#portrait-name", data.name);
    setText("#portrait-role", data.role);
    setText("#location-label", data.location);
    setText("#hours-label", `${data.internshipHours} OJT`);
    setText("#about-copy", data.about);
    setText("#degree-label", data.degree);
    setText("#school-label", data.school);
    setText("#graduation-label", data.graduation);
    setText("#internship-label", `${data.internshipHours} required`);
    setText("#contact-location", data.location);
    setText("#footer-name", `Copyright ${new Date().getFullYear()} ${data.name}`);

    // Only this known headline receives emphasis; other custom text is escaped.
    const defaultHeadline = "I build where software meets hardware.";
    query("#hero-headline").innerHTML =
      data.headline === defaultHeadline
        ? "I build where <em>software</em> meets <em>hardware.</em>"
        : escapeHtml(data.headline || defaultHeadline);

    const photo = query("#profile-photo");
    const photoUrl = getSafeUrl(data.profileImage, true);

    photo.addEventListener(
      "error",
      () => {
        photo.src = "assets/profile-placeholder.svg";
        photo.alt = `Initials placeholder for ${data.name}`;
      },
      { once: true },
    );

    if (photoUrl) photo.src = photoUrl;
    photo.alt = `Portrait of ${data.name}`;
  }

  /** Inline SVG icons stay consistent on desktop and phone without emoji fonts. */
  function renderProductMark(project) {
    const geometry =
      project.productIcon === "robotics"
        ? '<path d="M3 21h18M6 21v-4h10v4M11 17l-5-7m3-4 7 4m2 1 3 3m-2-5 3 1m-2 4 2-1"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="11" r="2"/>'
        : '<path d="m7 7 10 10-5 4V3l5 4L7 17"/>';

    return `
      <span class="product-mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
          ${geometry}
        </svg>
      </span>
    `;
  }

  /** map builds one card per project; join combines the cards into one HTML string. */
  function renderProjects() {
    query("#projects-grid").innerHTML = data.projects
      .map((project, index) => {
        const previewClasses = ["project-preview"];
        if (project.imageFit === "contain") previewClasses.push("project-preview-contain");
        if (project.imagePresentation === "product") previewClasses.push("product-stage");

        return `
        <article class="project-card">
          <div class="${previewClasses.join(" ")}">
            <img src="${escapeHtml(getSafeUrl(project.image, true))}"
              alt="${escapeHtml(project.imageAlt)}" width="960" height="540"
              loading="${index > 1 ? "lazy" : "eager"}" decoding="async" />
            ${project.imagePresentation === "product" ? renderProductMark(project) : ""}
            ${
              !project.illustrative && project.imageCaption
                ? `<span class="preview-tag">${escapeHtml(project.imageCaption)}</span>`
                : ""
            }
          </div>
          <div class="project-info">
            <div class="project-meta">
              <span>${escapeHtml(project.category)}</span>
              <span>${escapeHtml(project.year)}</span>
            </div>
            <h3 class="project-heading">${escapeHtml(project.title)}</h3>
            <p>${escapeHtml(project.summary)}</p>
            <div class="project-bottom">
              <span class="status-badge">${escapeHtml(project.status)}</span>
              <button class="details-link" type="button"
                data-project="${escapeHtml(project.id)}"
                aria-label="View details for ${escapeHtml(project.title)}">
                View details
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    const count = String(data.projects.length).padStart(2, "0");
    setText(".section-count", `[ ${count} PROJECTS ]`);
  }

  /** Skill groups and tools are separate so supporting tools stay visually compact. */
  function renderSkills() {
    query("#expertise-grid").innerHTML = data.focus
      .map(
        (skill) => `
      <article class="expertise-card">
        <span class="expertise-number">${escapeHtml(skill.number)} /</span>
        <h3>${escapeHtml(skill.title)}</h3>
        <p>${escapeHtml(skill.description)}</p>
        <ul class="tag-list" aria-label="${escapeHtml(skill.title)} technologies">
          ${skill.tags.map((tag) => `<li class="skill-tag">${escapeHtml(tag)}</li>`).join("")}
        </ul>
      </article>
    `,
      )
      .join("");

    query("#tools-list").innerHTML = (data.tools || [])
      .map((tool) => `<li class="skill-tag">${escapeHtml(tool)}</li>`)
      .join("");
  }

  /** Keep the actual PDF link prominent and explain that it opens another tab. */
  function renderResume() {
    const resumeUrl = getSafeUrl(data.resume, true);
    if (!resumeUrl) return;

    query("#resume-holder").innerHTML = `
      <a class="btn btn-primary resume-button" href="${escapeHtml(resumeUrl)}"
        target="_blank" rel="noopener noreferrer"
        aria-label="View my resume (PDF, opens in a new tab)">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
          stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
          <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/>
          <path d="M14 3v6h6M8 13h8m-8 4h5"/>
        </svg>
        <span>View my resume</span>
        <span class="resume-format" aria-hidden="true">PDF</span>
      </a>
    `;
  }

  /** Only render contact methods with valid values; an empty LinkedIn field is optional. */
  function renderContactLinks() {
    const links = [];
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(data.email || "")) {
      links.push(`
        <a class="btn btn-primary"
          href="mailto:${escapeHtml(data.email)}?subject=OJT%20Internship%20Inquiry">Email me</a>
      `);
    }

    const socialLinks = [
      { label: "GitHub", url: data.github },
      { label: "LinkedIn", url: data.linkedin },
    ];

    socialLinks.forEach(({ label, url }) => {
      const safeUrl = getSafeUrl(url);
      if (!safeUrl) return;

      links.push(`
        <a class="btn btn-secondary" href="${escapeHtml(safeUrl)}"
          target="_blank" rel="noopener noreferrer">${label}</a>
      `);
    });

    query("#contact-actions").innerHTML = links.length
      ? links.join("")
      : '<p class="contact-placeholder">Contact details will be available soon.</p>';
  }

  /** Build a project's larger preview and optional website/source/download actions. */
  function renderProjectDetails(project) {
    const previewClasses = ["dialog-preview"];
    if (project.imagePresentation === "product") previewClasses.push("product-stage");
    else if (project.imageFit === "contain") previewClasses.push("dialog-preview-contain");

    const websiteUrl = getSafeUrl(project.link);
    const sourceUrl = getSafeUrl(project.sourceCode, true);
    const downloadUrl = getSafeUrl(project.sourceDownload, true);
    const actions = [];

    if (websiteUrl)
      actions.push(`
      <a class="btn btn-primary" href="${escapeHtml(websiteUrl)}"
        target="_blank" rel="noopener noreferrer">Open project website</a>
    `);
    if (sourceUrl)
      actions.push(`
      <a class="btn btn-primary" href="${escapeHtml(sourceUrl)}"
        target="_blank" rel="noopener noreferrer">View source code</a>
    `);
    if (downloadUrl)
      actions.push(`
      <a class="btn btn-secondary" href="${escapeHtml(downloadUrl)}" download>Download .ino</a>
    `);

    const caption = project.illustrative ? "Concept illustration" : project.imageCaption;

    return `
      <p class="section-kicker">${escapeHtml(project.number)} / PROJECT DETAIL</p>
      <h2 id="modal-title">${escapeHtml(project.title)}</h2>
      <figure class="${previewClasses.join(" ")}">
        <img src="${escapeHtml(getSafeUrl(project.image, true))}"
          alt="${escapeHtml(project.imageAlt)}" width="960" height="540" />
        ${project.imagePresentation === "product" ? renderProductMark(project) : ""}
        ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ""}
      </figure>
      ${actions.length ? `<div class="dialog-actions">${actions.join("")}</div>` : ""}
      <p class="dialog-summary">${escapeHtml(project.summary)}</p>
      <div class="dialog-meta">
        <span>${escapeHtml(project.status)}</span>
        <span>${escapeHtml(project.year)}</span>
      </div>
      ${project.role ? `<h3>My involvement</h3><p>${escapeHtml(project.role)}</p>` : ""}
      <h3>What the project covers</h3>
      <ul>${project.details.map((detail) => `<li>${escapeHtml(detail)}</li>`).join("")}</ul>
      <h3>Technologies & topics</h3>
      <ul class="tag-list" aria-label="Project technologies">
        ${project.stack.map((tag) => `<li class="skill-tag">${escapeHtml(tag)}</li>`).join("")}
      </ul>
      <div class="dialog-takeaway">
        <strong>Key learning</strong>
        <span>${escapeHtml(project.takeaway)}</span>
      </div>
    `;
  }

  /** The native dialog handles modal focus and Escape; one grid listener handles all cards. */
  function setupProjectDialog() {
    const dialog = query("#project-dialog");
    let trigger = null;

    query("#projects-grid").addEventListener("click", (event) => {
      const button = event.target.closest("[data-project]");
      if (!button) return;

      const project = data.projects.find((item) => item.id === button.dataset.project);
      if (!project) return;

      trigger = button;
      query("#dialog-content").innerHTML = renderProjectDetails(project);
      dialog.showModal();
      dialog.scrollTop = 0;
    });

    query("#dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => trigger?.focus({ preventScroll: true }));

    // A backdrop click has the dialog as its target but lies outside the dialog's rectangle.
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (event.target === dialog && isOutside) dialog.close();
    });
  }

  /** Keep the menu's visible state and accessible expanded state in sync. */
  function setupMobileNavigation() {
    const button = query("#menu-toggle");
    const navigation = query("#mobile-nav");

    function setMenuOpen(isOpen) {
      button.setAttribute("aria-expanded", String(isOpen));
      button.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
      button.textContent = isOpen ? "Close" : "Menu";
      navigation.hidden = !isOpen;
    }

    button.addEventListener("click", () => {
      setMenuOpen(button.getAttribute("aria-expanded") !== "true");
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && button.getAttribute("aria-expanded") === "true") {
        setMenuOpen(false);
        button.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) setMenuOpen(false);
    });
  }

  /** Highlight the current section without changing the browser's URL while scrolling. */
  function setupActiveNavigation() {
    const sections = [...document.querySelectorAll("#projects, #expertise, #about, #contact")];
    const links = [...document.querySelectorAll(".desktop-nav a, .mobile-nav a")];
    let framePending = false;

    function updateNavigation() {
      let currentSection = "";
      const readingLine = window.innerHeight * 0.35;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) currentSection = section.id;
      });

      // At the bottom, the short contact section may not reach the reading line.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentSection = "contact";
      }

      links.forEach((link) => {
        if (link.hash === `#${currentSection}`) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      framePending = false;
    }

    // requestAnimationFrame limits scroll updates to one per browser frame.
    window.addEventListener(
      "scroll",
      () => {
        if (!framePending) {
          framePending = true;
          window.requestAnimationFrame(updateNavigation);
        }
      },
      { passive: true },
    );

    window.addEventListener("resize", updateNavigation);
    updateNavigation();
  }

  /** Entrance animations are optional enhancement: no content starts hidden in CSS. */
  function setupEntranceAnimations() {
    if (typeof Element.prototype.animate !== "function") return;

    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const activeAnimations = new Set();

    function reveal(element, delay = 0) {
      if (preference.matches) return;

      const animation = element.animate(
        [
          { opacity: 0, transform: "translateY(14px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 520,
          delay,
          easing: "cubic-bezier(.2,.7,.2,1)",
          fill: "backwards",
        },
      );

      activeAnimations.add(animation);
      animation.onfinish = animation.oncancel = () => activeAnimations.delete(animation);
    }

    document.querySelectorAll(".hero-content > *, .hero-portrait").forEach((element, index) => {
      reveal(element, Math.min(index * 55, 220));
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const siblings = [...entry.target.parentElement.children];
            reveal(entry.target, Math.min(siblings.indexOf(entry.target) * 55, 165));
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.12 },
      );

      document
        .querySelectorAll(
          ".section-header, .project-card, .expertise-card, .about-sidebar, .about-main, .contact-content",
        )
        .forEach((element) => observer.observe(element));
    }

    // Keyboard navigation must not wait for a decorative entrance to finish.
    document.addEventListener("focusin", (event) => {
      activeAnimations.forEach((animation) => {
        if (animation.effect.target.contains(event.target)) animation.finish();
      });
    });

    preference.addEventListener("change", (event) => {
      if (event.matches) activeAnimations.forEach((animation) => animation.cancel());
    });
  }

  // Initialization: deferred scripts run after HTML parsing, so these elements already exist.
  renderPersonalInformation();
  renderProjects();
  renderSkills();
  renderResume();
  renderContactLinks();
  setupProjectDialog();
  setupMobileNavigation();
  setupActiveNavigation();
  setupEntranceAnimations();
})();
