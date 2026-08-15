/* ==========================================================================
   AlphaWetAI — render + interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  hydrateBrand();
  hydrateStaticIcons();
  renderTrustStrip();
  renderStats();
  renderAboutHighlights();
  renderServices();
  renderWhyUs();
  renderProcess();
  renderIndustries();
  renderPortfolio();
  renderFaq();
  renderCareers();
  renderNav();
  renderFooter();
  renderContactOptions();

  initHeaderScroll();
  initMobileNav();
  initReveal();
  initServiceAccordions();
  initFaqAccordion();
  initPortfolioModal();
  initJobModal();
  initContactForm();
  initScrollSpy();
  initBackToTop();
  initServiceCtaPrefill();
});

/* ---------------- helpers ---------------- */
function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstElementChild;
}
function $(sel, ctx) { return (ctx || document).querySelector(sel); }
function $all(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

/* ---------------- brand / nav / footer ---------------- */
function hydrateStaticIcons() {
  $all("[data-icon]").forEach((n) => (n.innerHTML = icon(n.dataset.icon)));
}

function hydrateBrand() {
  $all("[data-brand]").forEach((n) => (n.textContent = CONFIG.brand));
  $all("[data-brand-full]").forEach((n) => (n.textContent = CONFIG.brandFull));
  $all("[data-tagline]").forEach((n) => (n.textContent = CONFIG.tagline));
  $all("[data-positioning]").forEach((n) => (n.textContent = CONFIG.positioning));
  $all("[data-email]").forEach((n) => { if (!$("[data-icon]", n)) n.textContent = CONFIG.email; if (n.tagName === "A") n.href = `mailto:${CONFIG.email}`; });
  $all("[data-phone]").forEach((n) => { if (!$("[data-icon]", n)) n.textContent = CONFIG.phoneDisplay; if (n.tagName === "A") n.href = `tel:${CONFIG.phone.replace(/\s+/g, "")}`; });
  $all("[data-whatsapp]").forEach((n) => { if (n.tagName === "A") n.href = `https://wa.me/${CONFIG.whatsapp}`; });
  $all("[data-linkedin]").forEach((n) => { if (n.tagName === "A") n.href = CONFIG.linkedin; });
  $all("[data-location]").forEach((n) => (n.textContent = CONFIG.location));
}

function renderNav() {
  const desktop = $("#navLinksDesktop");
  const mobile = $("#navLinksMobile");
  const onHome = ["/", "/index.html", ""].includes(window.location.pathname);
  NAV_LINKS.forEach((l) => {
    const href = l.external || onHome ? l.href : `/${l.href}`;
    const active = l.external && window.location.pathname.replace(/\/$/, "") === l.href.replace(/\/$/, "");
    if (desktop) desktop.appendChild(el(`<a href="${href}" data-nav${active ? ' class="is-active"' : ""}>${l.label}</a>`));
    if (mobile) mobile.appendChild(el(`<a href="${href}" data-nav${active ? ' class="is-active"' : ""}>${l.label}</a>`));
  });
}

function renderTrustStrip() {
  const wrap = $("#trustBadges");
  if (!wrap) return;
  const labels = ["Websites", "Software", "Automation", "AI", "Data", "E-commerce", "Custom Solutions"];
  labels.forEach((l) => wrap.appendChild(el(`<span class="trust-badge">${l}</span>`)));
}

function renderStats() {
  const wrap = $("#statsRow");
  if (!wrap) return;
  STATS.forEach((s) => wrap.appendChild(el(`
    <div class="stat-card"><strong>${s.value}</strong><span>${s.label}</span></div>
  `)));
}

function renderAboutHighlights() {
  const wrap = $("#aboutHighlights");
  if (!wrap) return;
  ABOUT_HIGHLIGHTS.forEach((h) => wrap.appendChild(el(`
    <div class="about-highlight">
      <div class="ic">${icon(h.icon)}</div>
      <div><h4>${h.title}</h4><p>${h.text}</p></div>
    </div>
  `)));
}

/* ---------------- services ---------------- */
function renderServices() {
  const wrap = $("#servicesGrid");
  if (!wrap) return;
  SERVICES.forEach((s, i) => {
    const card = el(`
      <article class="card service-card reveal" style="--i:${i % 3}">
        <div class="service-top">
          <div class="service-icon">${icon(s.icon)}</div>
          <span class="service-num">${s.num}</span>
        </div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        <button type="button" class="service-toggle" aria-expanded="false">
          <span class="toggle-label">See what's included</span>${icon("chevronDown")}
        </button>
        <div class="service-detail">
          <div class="service-detail-inner">
            <div class="tag-list">${s.items.map((it) => `<span class="tag">${it}</span>`).join("")}</div>
            <div class="example-box"><span>Example</span><strong>${s.example}</strong></div>
            <button type="button" class="btn btn-primary btn-sm" data-service-cta="${s.title}">
              ${s.cta}${icon("arrowRight")}
            </button>
          </div>
        </div>
      </article>
    `);
    wrap.appendChild(card);
  });
}

function initServiceAccordions() {
  $all(".service-card").forEach((card) => {
    const toggle = $(".service-toggle", card);
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      const open = card.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      $(".toggle-label", toggle).textContent = open ? "Hide details" : "See what's included";
    });
  });
}

/* ---------------- why us / process ---------------- */
function renderWhyUs() {
  const wrap = $("#whyUsGrid");
  if (!wrap) return;
  WHY_US.forEach((w, i) => wrap.appendChild(el(`
    <div class="card why-card reveal" style="--i:${i % 3}">
      <div class="service-icon">${icon(w.icon)}</div>
      <h3>${w.title}</h3>
      <p>${w.text}</p>
    </div>
  `)));
}

function renderProcess() {
  const wrap = $("#processRow");
  if (!wrap) return;
  PROCESS.forEach((p) => wrap.appendChild(el(`
    <div class="process-step reveal">
      <div class="step-num">${p.num}</div>
      <h3>${p.title}</h3>
      <p>${p.text}</p>
    </div>
  `)));
}

/* ---------------- industries ---------------- */
function renderIndustries() {
  const wrap = $("#industriesGrid");
  if (!wrap) return;
  INDUSTRIES.forEach((name, i) => wrap.appendChild(el(`
    <div class="card industry-card reveal" style="--i:${i % 4}">
      <div class="service-icon">${icon("industry")}</div>
      <h3>${name}</h3>
    </div>
  `)));
}

/* ---------------- portfolio ---------------- */
function renderPortfolio() {
  const wrap = $("#portfolioGrid");
  if (!wrap) return;
  PORTFOLIO.forEach((p, i) => {
    const card = el(`
      <article class="card portfolio-card reveal" style="--i:${i % 3}">
        <div class="portfolio-thumb">${icon(p.icon)}</div>
        <div class="portfolio-body">
          <span class="tag" style="margin-bottom:10px;">${p.industry}</span>
          <h3>${p.title}</h3>
          <p style="font-size:14px;margin-bottom:14px;">${p.solution}</p>
          <div class="portfolio-result">${icon("trending")} ${p.result}</div>
          <button type="button" class="btn btn-outline btn-sm btn-block" data-case-study="${i}">View Full Case Study</button>
        </div>
      </article>
    `);
    wrap.appendChild(card);
  });
}

function initPortfolioModal() {
  const overlay = $("#caseStudyModal");
  if (!overlay) return;
  const box = $(".modal-box", overlay);

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-case-study]");
    if (!btn) return;
    const p = PORTFOLIO[Number(btn.dataset.caseStudy)];
    box.innerHTML = `
      <button type="button" class="modal-close" data-modal-close>${icon("close")}</button>
      <span class="modal-eyebrow">Case Study · ${p.industry}</span>
      <h3>${p.title}</h3>
      <h4>The Challenge</h4><p>${p.challenge}</p>
      <h4>Our Approach</h4>
      <ul class="check-list">${p.approach.map((a) => `<li>${icon("check")}<span>${a}</span></li>`).join("")}</ul>
      <h4>The Solution</h4><p>${p.solution}</p>
      <h4>Results</h4>
      <ul class="check-list">${p.results.map((r) => `<li>${icon("trending")}<span><strong>${r}</strong></span></li>`).join("")}</ul>
      <button type="button" class="btn btn-primary btn-block" data-modal-cta>Discuss a Similar Project</button>
    `;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("[data-modal-close]")) {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    if (e.target.closest("[data-modal-cta]")) {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
      window.location.hash = "#contact";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) {
      overlay.classList.remove("is-open");
      document.body.style.overflow = "";
    }
  });
}

/* ---------------- faq ---------------- */
function renderFaq() {
  const wrap = $("#faqList");
  if (!wrap) return;
  FAQS.forEach((f) => wrap.appendChild(el(`
    <div class="faq-item card">
      <button type="button" class="faq-q" aria-expanded="false">
        <span>${f.q}</span>${icon("plus", "faq-icon")}
      </button>
      <div class="faq-a"><div class="faq-a-inner"><p>${f.a}</p></div></div>
    </div>
  `)));
}

function initFaqAccordion() {
  $all(".faq-item").forEach((item) => {
    $(".faq-q", item).addEventListener("click", () => {
      const nowOpen = !item.classList.contains("is-open");
      $all(".faq-item").forEach((i) => {
        i.classList.remove("is-open");
        $(".faq-q", i).setAttribute("aria-expanded", "false");
      });
      if (nowOpen) {
        item.classList.add("is-open");
        $(".faq-q", item).setAttribute("aria-expanded", "true");
      }
    });
  });
}

/* ---------------- careers ---------------- */
function renderCareers() {
  const wrap = $("#careersGrid");
  if (!wrap) return;
  JOBS.forEach((j, i) => {
    wrap.appendChild(el(`
      <article class="card job-card reveal" style="--i:${i % 3}">
        <div class="service-top">
          <div class="service-icon">${icon("briefcase")}</div>
          <span class="service-num">${j.type}</span>
        </div>
        <h3>${j.title}</h3>
        <div class="tag-list" style="margin-top:2px;">
          <span class="tag">${j.department}</span>
          <span class="tag">${j.location}</span>
          <span class="tag">${j.experience}</span>
        </div>
        <p>${j.summary}</p>
        <div class="tag-list">
          ${j.skills.slice(0, 4).map((s) => `<span class="tag">${s}</span>`).join("")}
          ${j.skills.length > 4 ? `<span class="tag">+${j.skills.length - 4} more</span>` : ""}
        </div>
        <div class="example-box"><span>Package</span><strong>${j.package}</strong></div>
        <button type="button" class="btn btn-primary btn-sm" data-job-open="${i}" style="margin-top:auto;">
          View Details &amp; Apply${icon("arrowRight")}
        </button>
      </article>
    `));
  });
}

function initJobModal() {
  const overlay = $("#jobModal");
  if (!overlay) return;
  const box = $(".modal-box", overlay);

  function closeModal() {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-job-open]");
    if (!btn) return;
    const job = JOBS[Number(btn.dataset.jobOpen)];

    box.innerHTML = `
      <button type="button" class="modal-close" data-modal-close>${icon("close")}</button>
      <span class="modal-eyebrow">${job.department} · ${job.type}</span>
      <h3>${job.title}</h3>
      <div class="tag-list">
        <span class="tag">${job.location}</span>
        <span class="tag">${job.experience}</span>
      </div>
      <div class="example-box"><span>Package</span><strong>${job.package}</strong></div>
      <h4>About the Role</h4><p>${job.summary}</p>
      <h4>Responsibilities</h4>
      <ul class="check-list">${job.responsibilities.map((r) => `<li>${icon("check")}<span>${r}</span></li>`).join("")}</ul>
      <h4>What We're Looking For</h4>
      <ul class="check-list">${job.requirements.map((r) => `<li>${icon("check")}<span>${r}</span></li>`).join("")}</ul>
      <h4>Skills Required</h4>
      <div class="tag-list">${job.skills.map((s) => `<span class="tag">${s}</span>`).join("")}</div>

      <h4>Apply for this Role</h4>
      <form id="jobApplyForm" novalidate>
        <input type="hidden" name="position" value="${job.title}" />
        <div class="form-grid">
          <div class="form-field"><label for="jaName">Name <span class="req">*</span></label><input id="jaName" name="name" type="text" required /></div>
          <div class="form-field"><label for="jaEmail">Email <span class="req">*</span></label><input id="jaEmail" name="email" type="email" required /></div>
          <div class="form-field"><label for="jaPhone">Phone</label><input id="jaPhone" name="phone" type="tel" /></div>
          <div class="form-field"><label for="jaLink">Resume / Portfolio Link <span class="req">*</span></label><input id="jaLink" name="resume_link" type="url" required placeholder="https://…" /></div>
          <div class="form-field full"><label for="jaMessage">Message</label><textarea id="jaMessage" name="message" placeholder="Anything you'd like us to know"></textarea></div>
        </div>
        <div class="form-foot">
          <p class="form-note" style="margin:0;">We review every application personally.</p>
          <button type="submit" class="btn btn-primary">Submit Application</button>
        </div>
        <div class="form-status" id="jobApplyStatus" role="status" aria-live="polite"></div>
      </form>
    `;
    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    const form = $("#jobApplyForm", box);
    const status = $("#jobApplyStatus", box);
    form.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      status.className = "form-status";
      const data = Object.fromEntries(new FormData(form).entries());
      const submitBtn = $('button[type="submit"]', form);
      const original = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";
      try {
        const res = await fetch("/api/careers/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const payload = await res.json();
        if (!res.ok || !payload.ok) throw new Error(payload.error || "Failed");
        status.classList.add("is-success");
        status.textContent = "Application received — thank you! We'll be in touch if there's a fit.";
        form.reset();
      } catch (err) {
        status.classList.add("is-error");
        status.textContent = "We couldn't submit your application. Please try again or email us directly.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = original;
      }
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay || e.target.closest("[data-modal-close]")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-open")) closeModal();
  });
}

/* ---------------- contact form ---------------- */
function renderContactOptions() {
  const serviceSel = $("#serviceSelect");
  const budgetSel = $("#budgetSelect");
  const timelineSel = $("#timelineSelect");
  if (serviceSel) SERVICE_OPTIONS.forEach((o) => serviceSel.appendChild(el(`<option value="${o}">${o}</option>`)));
  if (budgetSel) BUDGET_OPTIONS.forEach((o) => budgetSel.appendChild(el(`<option value="${o}">${o}</option>`)));
  if (timelineSel) TIMELINE_OPTIONS.forEach((o) => timelineSel.appendChild(el(`<option value="${o}">${o}</option>`)));
}

function initContactForm() {
  const form = $("#contactForm");
  if (!form) return;
  const status = $("#formStatus");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form-status";
    status.textContent = "";

    const data = Object.fromEntries(new FormData(form).entries());
    const submitBtn = $('button[type="submit"]', form);
    const originalLabel = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending…";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const payload = await res.json();
      if (!res.ok || !payload.ok) throw new Error(payload.error || "Something went wrong");

      status.classList.add("is-success");
      status.textContent = "Thank you! Your request has been received — our team will reach out within one business day.";
      form.reset();
    } catch (err) {
      status.classList.add("is-error");
      status.textContent = "We couldn't send your request. Please try again, or email us directly.";
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalLabel;
    }
  });
}

function initServiceCtaPrefill() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-service-cta]");
    if (!btn) return;
    const serviceSel = $("#serviceSelect");
    const wanted = btn.dataset.serviceCta;
    if (serviceSel) {
      const match = SERVICE_OPTIONS.find((o) => wanted.toLowerCase().includes(o.toLowerCase().split(" / ")[0].toLowerCase()));
      serviceSel.value = match || "";
    }
  });
}

/* ---------------- footer ---------------- */
function renderFooter() {
  const nav = $("#footerNav");
  const services = $("#footerServices");
  if (nav) NAV_LINKS.forEach((l) => nav.appendChild(el(`<li><a href="${l.href}">${l.label}</a></li>`)));
  if (services) {
    ["Website Development", "Business Automation", "AI Solutions", "Lead Generation", "Software Development", "E-commerce", "Marketing Automation"]
      .forEach((s) => services.appendChild(el(`<li><span>${s}</span></li>`)));
  }
  const year = $("#currentYear");
  if (year) year.textContent = new Date().getFullYear();
}

/* ---------------- header / nav behavior ---------------- */
function initHeaderScroll() {
  const header = $("#siteHeader");
  if (!header) return;
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function initMobileNav() {
  const toggle = $("#navToggle");
  const mobile = $("#mobileNav");
  if (!toggle || !mobile) return;
  const close = () => {
    mobile.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = icon("menu");
    document.body.style.overflow = "";
  };
  toggle.innerHTML = icon("menu");
  toggle.addEventListener("click", () => {
    const open = mobile.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = icon(open ? "close" : "menu");
    document.body.style.overflow = open ? "hidden" : "";
  });
  $all("a", mobile).forEach((a) => a.addEventListener("click", close));
}

function initScrollSpy() {
  const sections = NAV_LINKS.filter((l) => !l.external && l.href.startsWith("#"))
    .map((l) => document.querySelector(l.href))
    .filter(Boolean);
  if (!sections.length) return;
  const links = () => $all("[data-nav]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = `#${entry.target.id}`;
        links().forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === id));
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((s) => obs.observe(s));
}

function initReveal() {
  const targets = $all(".reveal");
  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  targets.forEach((t) => obs.observe(t));
}

function initBackToTop() {
  const btn = $("#backToTop");
  if (!btn) return;
  btn.innerHTML = icon("arrowRight");
  $("svg", btn).style.transform = "rotate(-90deg)";
  const onScroll = () => btn.classList.toggle("is-visible", window.scrollY > 700);
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}
