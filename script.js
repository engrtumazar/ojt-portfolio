(() => {
  'use strict';
  const data = window.PORTFOLIO_DATA;
  if (!data) { console.error('Portfolio data missing. Check content.js.'); return; }
  const $ = (s) => document.querySelector(s);
  const esc = (text = '') => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = (value, allowRelative = false) => {
    if (!value) return '';
    if (allowRelative && /^(?!\/)(?!.*\.\.)(?!.*:)[a-zA-Z0-9_./ ()-]+$/.test(value)) return value;
    try {
      const url = new URL(value, window.location.href);
      const valid = ['https:', 'http:', 'mailto:'].includes(url.protocol);
      if (!valid) return '';
      if (!allowRelative && !/^https?:\/\//i.test(value)) return '';
      return url.href;
    } catch { return ''; }
  };
  const setText = (selector, value) => { const node = $(selector); if (node && value) node.textContent = value; };

  document.title = `${data.name} — OJT Portfolio`;
  setText('#brand-initials', data.initials);
  setText('#brand-name', data.name);
  // Dot is part of the visual brand; append it after replacing text.
  $('#brand-name').insertAdjacentHTML('beforeend','<span class="brand-dot">.</span>');
  setText('#hero-firstname', data.firstName);
  setText('#portrait-name', data.name);
  setText('#portrait-role', data.role);
  const profilePhoto = $('#profile-photo');
  const profileImage = safeUrl(data.profileImage, true);
  if (profileImage) {
    profilePhoto.addEventListener('error', () => {
      profilePhoto.src = 'assets/profile-placeholder.svg';
      profilePhoto.alt = `Placeholder for ${data.firstName || data.name}'s profile photo`;
    }, { once: true });
    profilePhoto.src = profileImage;
    profilePhoto.alt = `Portrait of ${data.name}`;
  }
  // Headline uses predefined emphasis for safe visual formatting.
  const headline = String(data.headline || 'I build where software meets hardware.');
  const renderedHeadline = headline === 'I build where software meets hardware.'
    ? 'I build where <em>software</em> meets <em>hardware.</em>' : esc(headline);
  $('#hero-headline').innerHTML = renderedHeadline;
  setText('#hero-intro', data.introduction);
  setText('#location-label', data.location);
  setText('#hours-label', `${data.internshipHours} OJT`);
  setText('#about-copy', data.about);
  setText('#degree-label', data.degree);
  setText('#school-label', data.school);
  setText('#graduation-label', data.graduation);
  setText('#internship-label', `${data.internshipHours} required`);
  setText('#contact-location', data.location);
  setText('#footer-name', `Copyright ${new Date().getFullYear()} ${data.name}`);

  const productMark = (project) => {
    const geometry = project.productIcon === 'robotics'
      ? '<path d="M3 21h18M6 21v-4h10v4M11 17l-5-7m3-4 7 4m2 1 3 3m-2-5 3 1m-2 4 2-1"/><circle cx="7" cy="7" r="3"/><circle cx="17" cy="11" r="2"/>'
      : '<path d="m7 7 10 10-5 4V3l5 4L7 17"/>';
    return '<span class="product-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + geometry + '</svg></span>';
  };
  const projectGrid = $('#projects-grid');
  projectGrid.innerHTML = data.projects.map((p, index) => {
    return `
    <article class="project-card ${index < 2 ? 'project-card-featured' : ''}">
      <div class="project-preview${p.imageFit === 'contain' ? ' project-preview-contain' : ''}${p.imagePresentation === 'product' ? ' product-stage' : ''}">
        <img src="${esc(p.image)}" alt="${esc(p.imageAlt)}" loading="${index > 1 ? 'lazy' : 'eager'}" />
        ${p.imagePresentation === 'product' ? productMark(p) : ''}
        ${!p.illustrative && p.imageCaption ? `<span class="preview-tag">${esc(p.imageCaption)}</span>` : ''}
      </div>
      <div class="project-info">
        <div class="project-meta"><span>${esc(p.category)}</span><span>${esc(p.year)}</span></div>
        <h3 class="project-heading">${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <div class="project-bottom"><span class="status-badge">${esc(p.status)}</span><button class="details-link" type="button" data-project="${esc(p.id)}" aria-label="View details for ${esc(p.title)}">View details</button></div>
      </div>
    </article>`;
  }).join('');
  const sectionCount = $('.section-count');
  if (sectionCount) sectionCount.textContent = `[ ${String(data.projects.length).padStart(2,'0')} PROJECTS ]`;

  $('#expertise-grid').innerHTML = data.focus.map(item => `
    <article class="expertise-card">
      <span class="expertise-number">${esc(item.number)} /</span>
      <h3>${esc(item.title)}</h3>
      <p>${esc(item.description)}</p>
      <div class="tag-list">${item.tags.map(tag => `<span class="skill-tag">${esc(tag)}</span>`).join('')}</div>
    </article>`).join('');

  $('#tools-list').innerHTML = (data.tools || []).map(tool => `<li class="skill-tag">${esc(tool)}</li>`).join('');

  const resume = safeUrl(data.resume, true);
  if (resume) $('#resume-holder').innerHTML = `<a class="btn btn-primary resume-button" href="${esc(resume)}" target="_blank" rel="noopener noreferrer" aria-label="View my resume (PDF, opens in a new tab)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8m-8 4h5"/></svg><span>View my resume</span><span class="resume-format" aria-hidden="true">PDF</span></a>`;

  const contact = [];
  if (data.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    contact.push(`<a class="btn btn-primary" href="mailto:${esc(data.email)}?subject=OJT%20Internship%20Inquiry">Email me</a>`);
  }
  if (safeUrl(data.github)) contact.push(`<a class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(data.github))}">GitHub</a>`);
  if (safeUrl(data.linkedin)) contact.push(`<a class="btn btn-secondary" target="_blank" rel="noopener noreferrer" href="${esc(safeUrl(data.linkedin))}">LinkedIn</a>`);
  if (!contact.length) contact.push(`<p class="contact-placeholder">Direct contact details will be available soon.</p>`);
  $('#contact-actions').innerHTML = contact.join('');

  const dialog = $('#project-dialog');
  const closeDialog = () => dialog.close();
  $('#dialog-close').addEventListener('click', closeDialog);
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) closeDialog();
  });
  document.addEventListener('click', event => {
    const btn = event.target.closest('[data-project]');
    if (!btn) return;
    const project = data.projects.find(p => p.id === btn.dataset.project);
    if (!project) return;
    const projectUrl = safeUrl(project.link);
    const sourceUrl = safeUrl(project.sourceCode, true);
    const sourceDownload = safeUrl(project.sourceDownload, true);
    $('#dialog-content').innerHTML = `
      <p class="section-kicker">${esc(project.number)} / PROJECT DETAIL</p>
      <h2 id="modal-title">${esc(project.title)}</h2>
      <figure class="dialog-preview${project.imagePresentation === 'product' ? ' product-stage' : project.imageFit === 'contain' ? ' dialog-preview-contain' : ''}">
        <img src="${esc(safeUrl(project.image, true))}" alt="${esc(project.imageAlt)}" width="960" height="540" />
        ${project.imagePresentation === 'product' ? productMark(project) : ''}
        ${project.illustrative ? '<figcaption>Concept illustration</figcaption>' : project.imageCaption ? `<figcaption>${esc(project.imageCaption)}</figcaption>` : ''}
      </figure>
      ${projectUrl || sourceUrl || sourceDownload ? `<div class="dialog-actions">
        ${projectUrl ? `<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${esc(projectUrl)}">Open project website</a>` : ''}
        ${sourceUrl ? `<a class="btn btn-primary" target="_blank" rel="noopener noreferrer" href="${esc(sourceUrl)}">View source code</a>` : ''}
        ${sourceDownload ? `<a class="btn btn-secondary" href="${esc(sourceDownload)}" download>Download .ino</a>` : ''}
      </div>` : ''}
      <p class="dialog-summary">${esc(project.summary)}</p>
      <div class="dialog-meta"><span>${esc(project.status)}</span><span>${esc(project.year)}</span></div>
      ${project.role ? `<h3>My involvement</h3><p>${esc(project.role)}</p>` : ''}
      <h3>What the project covers</h3>
      <ul>${project.details.map(d => `<li>${esc(d)}</li>`).join('')}</ul>
      <h3>Technologies & topics</h3>
      <div class="tag-list">${project.stack.map(s => `<span class="skill-tag">${esc(s)}</span>`).join('')}</div>
      <div class="dialog-takeaway"><strong>Key learning</strong><span>${esc(project.takeaway)}</span></div>
    `;
    dialog.showModal();
    dialog.scrollTop = 0;
  });

  const menuToggle = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  function toggleMobile(force) {
    const isOpen = typeof force === 'boolean' ? force : menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuToggle.textContent = isOpen ? 'Close' : 'Menu';
    mobileNav.hidden = !isOpen;
  }
  menuToggle.addEventListener('click', () => toggleMobile());
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => toggleMobile(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      toggleMobile(false);
      menuToggle.focus();
    }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 760) toggleMobile(false); });

  // Animate visible content once; the page stays readable without animation support.
  if (typeof Element.prototype.animate === 'function') {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const activeEntrances = new Set();
    const reveal = (element, delay = 0) => {
      if (motionPreference.matches) return;
      const animation = element.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'none' }
      ], {
        duration: 560,
        delay,
        easing: 'cubic-bezier(.2,.7,.2,1)',
        fill: 'backwards'
      });
      activeEntrances.add(animation);
      animation.onfinish = animation.oncancel = () => activeEntrances.delete(animation);
    };

    document.querySelectorAll('.hero-content > *').forEach((element, index) => {
      reveal(element, index * 65);
    });
    const portrait = $('.hero-portrait');
    if (portrait) reveal(portrait, 160);

    if ('IntersectionObserver' in window) {
      const staggerDelays = new Map();
      document.querySelectorAll('.projects-grid, .expertise-grid').forEach(grid => {
        Array.from(grid.children).forEach((card, index) => {
          staggerDelays.set(card, Math.min(index * 70, 210));
        });
      });
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.12) return;
          reveal(entry.target, staggerDelays.get(entry.target) || 0);
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.12 });
      document.querySelectorAll('.section-header, .project-card, .expertise-card, .about-sidebar, .about-main, .contact-content').forEach(element => observer.observe(element));
    }

    // Focused controls should be ready immediately, including during their entrance.
    document.addEventListener('focusin', event => {
      activeEntrances.forEach(animation => {
        if (animation.effect.target.contains(event.target)) animation.finish();
      });
    });
    motionPreference.addEventListener('change', event => {
      if (event.matches) activeEntrances.forEach(animation => animation.cancel());
    });
  }
})();

