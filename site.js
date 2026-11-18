/* Thistle Network shared script: header, footer, theme, events data, small widgets. */
(function () {
  const FORMS = { aspiring: "https://thistleaspire.zite.so", current: "https://thistlenetwork.zite.so" };
  const EMAIL = "general@thistle.network";
  const page = document.body.dataset.page || "home";

  // Keep beta and preview copies out of search results; only the real domain is indexed.
  if (!/^(www\.)?thistle\.network$/.test(location.hostname)) {
    const robots = document.createElement("meta");
    robots.name = "robots"; robots.content = "noindex, nofollow";
    document.head.append(robots);
  }

  const store = {
    get(k, d) { try { const v = localStorage.getItem("tn:" + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem("tn:" + k, JSON.stringify(v)); } catch (e) {} }
  };

  // escape text from events.json / stats.js before it goes into the page
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  // skip link for keyboard and screen-reader users
  const mainEl = document.querySelector("main");
  let skipEl = null;
  if (mainEl) {
    if (!mainEl.id) mainEl.id = "main";
    mainEl.setAttribute("tabindex", "-1");
    skipEl = document.createElement("a");
    skipEl.className = "skip"; skipEl.href = "#" + mainEl.id; skipEl.textContent = "Skip to content";
  }

  const icon = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V21h-4z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.6 3.9 3.8v3.1c-1.4.1-2.7-.3-3.9-1.1v6.1c0 3.6-2.7 6.1-6 6.1-3.4 0-5.9-2.7-5.6-6.1.3-3 2.9-5.2 6.1-4.9v3.2c-1.5-.3-2.9.7-2.9 2.1 0 1.3 1 2.3 2.3 2.3 1.4 0 2.4-1 2.4-2.6V3z"/></svg>'
  };

  const nav = [
    ["home", "./", "Home"],
    ["aspiring", "aspiring.html", "Aspiring"],
    ["current", "current.html", "Current"],
    ["events", "events.html", "Events"],
    ["about", "about.html", "About"]
  ];

  const logo = (cls) => `<img class="logo-l ${cls || ""}" src="assets/wordmark-light.png" alt="Thistle Network"><img class="logo-d ${cls || ""}" src="assets/wordmark-dark.png" alt="Thistle Network">`;

  // header
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `<div class="wrap">
    <a class="brand" href="./" aria-label="Thistle Network home">${logo()}</a>
    <nav class="nav" id="site-nav" aria-label="Main">${nav.map(([k, h, l]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${l}</a>`).join("")}</nav>
    <div class="header-tools">
      <button class="icon-btn" id="theme-btn" type="button" aria-label="Switch colour theme"></button>
      <button class="icon-btn menu-btn" id="menu-btn" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">${icon.menu}</button>
      <a class="btn btn-primary" href="join.html"><span>Register<span class="hide-sm"> to join</span></span></a>
    </div></div>`;
  document.body.prepend(header);
  if (skipEl) document.body.prepend(skipEl); // first thing a keyboard user reaches

  // footer
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `<div class="wrap">
    <div class="stack">${logo()}<p style="color:var(--muted);max-width:38ch">A community-led network for current and aspiring apprentices across Scotland.</p>
      <div class="socials">
        <a href="https://uk.linkedin.com/company/thistlenetwork" aria-label="LinkedIn">${icon.linkedin}</a>
        <a href="https://www.instagram.com/thistlenetwork/" aria-label="Instagram">${icon.instagram}</a>
        <a href="https://www.tiktok.com/@thistlenetwork" aria-label="TikTok">${icon.tiktok}</a>
      </div></div>
    <div><h2>Network</h2><ul>
      <li><a href="aspiring.html">Aspiring apprentices</a></li><li><a href="current.html">Current apprentices</a></li>
      <li><a href="events.html">Events</a></li><li><a href="about.html">About the network</a></li></ul></div>
    <div><h2>Get involved</h2><ul>
      <li><a href="join.html">Register to join</a></li><li><a href="about.html#employers">For employers</a></li>
      <li><a href="about.html#contact">Contact us</a></li></ul></div>
    <div class="fine"><span>© ${new Date().getFullYear()} The Thistle Network. Made by apprentices, for apprentices, in Scotland.</span>
      <nav aria-label="Policies"><ul class="fine-links"><li><a href="privacy.html">Privacy policy</a></li></ul></nav></div>
  </div>`;
  document.body.append(footer);

  // theme
  const root = document.documentElement;
  const themeBtn = document.getElementById("theme-btn");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  const paintTheme = () => { themeBtn.innerHTML = isDark() ? icon.sun : icon.moon; };
  const saved = store.get("theme", null);
  if (saved) root.dataset.theme = saved;
  paintTheme();
  themeBtn.addEventListener("click", () => { const t = isDark() ? "light" : "dark"; root.dataset.theme = t; store.set("theme", t); paintTheme(); });
  matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", paintTheme);

  // mobile menu
  const menuBtn = document.getElementById("menu-btn"), siteNav = document.getElementById("site-nav");
  const setMenu = (open) => {
    siteNav.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open);
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (open) siteNav.querySelector("a")?.focus();
  };
  menuBtn.addEventListener("click", () => setMenu(!siteNav.classList.contains("open")));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && siteNav.classList.contains("open")) { setMenu(false); menuBtn.focus(); } });


  // toast
  const toastEl = document.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); document.body.append(toastEl);
  let tt; const toast = (m) => { toastEl.textContent = m; toastEl.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove("show"), 2200); };

  // copy email buttons
  document.querySelectorAll("[data-copy]").forEach((b) => b.addEventListener("click", () => {
    const text = b.dataset.copy;
    const fallback = () => { const c = b.parentElement.querySelector("code"); if (c) { const r = document.createRange(); r.selectNodeContents(c); const s = getSelection(); s.removeAllRanges(); s.addRange(r); } toast("Selected. Press Ctrl/Cmd+C to copy"); };
    try { navigator.clipboard.writeText(text).then(() => toast("Copied " + text), fallback); } catch (e) { fallback(); }
  }));

  // events data
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const parseDate = (d) => d ? new Date(d + "T18:00:00") : null;
  let eventsPromise;
  const loadEvents = () => eventsPromise || (eventsPromise = fetch("events.json").then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); }).then((j) => j.events));

  // an event is past once its date has gone; undated events are upcoming with the date to be confirmed
  const isPast = (e) => !!e.date && parseDate(e.date) < new Date();
  const nextEvent = (events) => events.filter((e) => e.date && !isPast(e)).sort((a, b) => parseDate(a.date) - parseDate(b.date))[0];
  const eventTotals = (events) => {
    const past = events.filter(isPast);
    const came = past.reduce((a, e) => a + (e.attended || 0), 0);
    const biggest = past.reduce((a, e) => ((e.attended || 0) > (a?.attended || 0) ? e : a), null);
    // "last time out" only uses events whose attendance has been filled in
    const last = past.filter((e) => Number.isFinite(e.attended)).sort((a, b) => parseDate(b.date) - parseDate(a.date))[0];
    return { past, came, biggest, last };
  };

  const startCountdown = (el, ev) => {
    const target = parseDate(ev.date);
    const units = [["days", 864e5], ["hrs", 36e5], ["mins", 6e4], ["secs", 1e3]];
    el.innerHTML = units.map(([u]) => `<div><b data-u="${u}">0</b><small>${u}</small></div>`).join("");
    const tick = () => {
      let ms = Math.max(0, target - new Date());
      units.forEach(([u, size]) => { const v = Math.floor(ms / size); ms -= v * size; el.querySelector(`[data-u="${u}"]`).textContent = u === "days" ? v : String(v).padStart(2, "0"); });
    };
    tick(); setInterval(tick, 1000);
  };

  const fmtLong = (d) => parseDate(d).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // who an event is for: "current", "aspiring" or "all" (set as "for" in events.json; missing means current)
  const AUDIENCE = { current: ["pill-current", "Current apprentices"], aspiring: ["pill-aspiring", "Aspiring apprentices"], all: ["pill-plain", "Open to all"] };
  const audienceOf = (e) => (e.for in AUDIENCE ? e.for : "current");
  const forAudience = (events, who) => !who || who === "all" ? events : events.filter((e) => audienceOf(e) === who || audienceOf(e) === "all");
  const signUpFor = (e) => e.cta || (audienceOf(e) === "aspiring" ? FORMS.aspiring : FORMS.current);

  // time, venue and ages, shown when events.json has them (costs are never shown)
  const facts = (e) => {
    const f = [e.time && `Time: ${esc(e.time)}`, e.venue && `Venue: ${esc(e.venue)}`, e.ages && `Ages: ${esc(e.ages)}`].filter(Boolean);
    return f.length ? `<div class="facts">${f.map((x) => `<span>${x}</span>`).join("")}</div>` : "";
  };

  const eventRow = (e) => {
    const d = e.date ? parseDate(e.date) : null, past = isPast(e), [cls, who] = AUDIENCE[audienceOf(e)];
    let status;
    if (past) status = `<div class="status"><b style="color:var(--ink)">${esc(e.attended)}</b> came</div>`;
    else if (e.spaces && e.spaces.full) status = `<div class="status"><b style="color:var(--ink)">Sold out</b></div>`;
    else {
      // spaces left, filled in hourly by the deploy from the event's Zite form (see update-spaces.mjs)
      const left = e.spaces && Number.isFinite(e.spaces.left) ? e.spaces.left : null;
      const spacesLine = left === null ? "" : `<small class="spaces">${left === 1 ? "1 space left" : `${left} spaces left`}</small>`;
      status = `<div class="status"><a class="btn btn-ghost" href="${esc(signUpFor(e))}">${e.cta ? "Sign up" : "Register interest"}<span class="sr-only"> for ${esc(e.title)}</span></a>${spacesLine}</div>`;
    }
    return `<article class="event">
      <div class="date">${d ? `<b>${d.getDate()}</b><small>${MONTHS[d.getMonth()]} ${d.getFullYear()}</small>` : `<b>TBC</b><small>Date soon</small>`}</div>
      <div><h3>${esc(e.title)}</h3><p>${esc(e.blurb)}</p>${past ? "" : facts(e)}
        <div class="meta"><span class="pill ${cls}">${who}</span><span class="pill pill-plain">${esc(e.place)}</span><span class="pill pill-plain">${past ? "Past" : d ? "Upcoming" : "Date to be confirmed"}</span></div></div>
      ${status}</article>`;
  };

  window.TN = { FORMS, EMAIL, store, toast, icon, esc, loadEvents, nextEvent, eventTotals, isPast, startCountdown, eventRow, fmtLong, parseDate, audienceOf, forAudience, AUDIENCE };

  // shared "next event" block (home, aspiring, current, events); data-next-event="all" | "current" | "aspiring"
  const nextBox = document.querySelector("[data-next-event]");
  if (nextBox) {
    const who = nextBox.dataset.nextEvent || "all";
    loadEvents().then((allEvents) => {
      const events = forAudience(allEvents, who);
      const ev = nextEvent(events), t = eventTotals(events);
      const more = `<div><a class="btn btn-purple" href="events.html">See all events ${icon.arrow}</a></div>`;
      if (ev) {
        nextBox.innerHTML = `<div class="stack"><span class="eyebrow">Next event in ${esc(ev.place)}</span><h2>${esc(ev.title)}</h2><p class="lede">${fmtLong(ev.date)}. ${esc(ev.blurb)}</p>${facts(ev)}${more}</div><div class="countdown" aria-label="Time until ${esc(ev.title)}"></div>`;
        startCountdown(nextBox.querySelector(".countdown"), ev);
        return;
      }
      const tbc = events.find((e) => !e.date);
      const lastLine = t.last ? ` Last time out, ${esc(t.last.attended)} came to ${esc(t.last.title)}.` : "";
      const hearFirst = who === "aspiring"
        ? `Follow us on socials to hear first, or join the community.`
        : `Follow us on socials to hear first, or join the community.`;
      const aspiringBtn = who === "aspiring" ? `<div class="hero-actions"><a class="btn btn-primary" href="${FORMS.aspiring}">Register as aspiring</a><a class="btn btn-ghost" href="events.html">See all events</a></div>` : more;
      nextBox.innerHTML = tbc
        ? `<div class="stack"><span class="eyebrow">Next up in ${esc(tbc.place)}, date coming soon</span><h2>${esc(tbc.title)}</h2><p class="lede">${esc(tbc.blurb)}${lastLine}</p>${facts(tbc)}${more}</div>`
        : `<div class="stack"><span class="eyebrow">Next event</span><h2>New dates coming soon</h2><p class="lede">${hearFirst}${lastLine}</p>${aspiringBtn}</div>`;
      if (t.past.length) nextBox.insertAdjacentHTML("beforeend", `<div class="countdown" aria-label="Events so far"><div><b>${t.past.length}</b><small>events</small></div><div><b>${t.came}</b><small>spots filled</small></div></div>`);
    }).catch(() => { nextBox.innerHTML = `<p class="lede">Events didn't load. Refresh the page to try again.</p>`; });
  }

  // network numbers, from stats.js (generated by update-stats.py)
  const S = window.TN_STATS;
  if (S) {
    const longDate = (iso, opts) => new Date(iso + "T12:00:00").toLocaleDateString("en-GB", opts);
    const nums = {
      members: S.members, employers: S.employers, places: S.places, providers: S.providers, last30: S.last30,
      friendShare: S.friendShare, graduateShare: S.graduateShare, firstMonth: S.growth[0].total, aspiring: S.aspiring || 0,
      moreEmployers: S.employers - S.namedEmployers.length
    };
    const words = { since: longDate(S.since, { month: "long", year: "numeric" }), updated: longDate(S.updated, { day: "numeric", month: "long", year: "numeric" }) };
    document.querySelectorAll("[data-stat]").forEach((el) => {
      const k = el.dataset.stat;
      if (k in nums) { el.textContent = nums[k]; el.dataset.count = nums[k]; }
      else if (k in words) el.textContent = words[k];
    });

    // employer strip
    document.querySelectorAll("[data-employers]").forEach((el) => {
      const items = [`<span class="lead">Our members work at</span>`, ...S.namedEmployers.map((n) => `<span>${esc(n)}</span>`), `<span>and ${nums.moreEmployers} more</span>`];
      el.innerHTML = items.join("") + items.join("");
    });

    // cumulative growth chart
    document.querySelectorAll("[data-growth]").forEach((el) => {
      const pts = S.growth, W = 640, H = 250, L = 34, R = 50, T = 34, B = 30;
      const max = Math.max(...pts.map((p) => p.total)), top = Math.ceil(max / 50) * 50;
      const x = (i) => L + (i * (W - L - R)) / (pts.length - 1);
      const y = (v) => T + (1 - v / top) * (H - T - B);
      const line = pts.map((p, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(p.total).toFixed(1)}`).join("");
      const area = `${line}L${x(pts.length - 1)},${y(0)}L${x(0)},${y(0)}Z`;
      const ticks = []; for (let v = 0; v <= top; v += 50) ticks.push(v);
      const mon = (m) => new Date(m + "-15T12:00:00").toLocaleDateString("en-GB", { month: "short" });
      const last = pts[pts.length - 1];
      el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Members grew from ${pts[0].total} in ${mon(pts[0].month)} to ${last.total} in ${mon(last.month)}">
        <defs><linearGradient id="g-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--n-green);stop-opacity:.4"/><stop offset="1" style="stop-color:var(--n-green);stop-opacity:0"/></linearGradient></defs>
        ${ticks.map((v) => `<line class="g-grid" x1="${L}" x2="${W - R + 10}" y1="${y(v)}" y2="${y(v)}"/><text class="g-lbl" x="${L - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`).join("")}
        <path class="g-area" d="${area}"/>
        <path class="g-line" d="${line}" pathLength="1" style="stroke-dasharray:1;stroke-dashoffset:0"/>
        ${pts.map((p, i) => `<text class="g-lbl" x="${x(i)}" y="${H - 6}" text-anchor="middle">${mon(p.month)}</text>`).join("")}
        <circle class="g-dot" cx="${x(pts.length - 1)}" cy="${y(last.total)}" r="7"/>
        <text class="g-end" x="${x(pts.length - 1) + 12}" y="${y(last.total) - 10}">${last.total}</text>
      </svg>`;
      const path = el.querySelector(".g-line");
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
        new IntersectionObserver((entries, obs) => {
          if (!entries[0].isIntersecting) return;
          obs.disconnect();
          path.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 1400, easing: "cubic-bezier(.3,.7,.2,1)" });
        }, { threshold: 0.4 }).observe(el);
      }
    });

    // bar breakdowns
    // counts under 3 are folded into "Other" so no small group can be singled out
    const label = { Other: "Other fields" };
    const MIN = 3;
    document.querySelectorAll("[data-breakdown]").forEach((el) => {
      const raw = S[el.dataset.breakdown] || [];
      const small = raw.filter((r) => r[1] < MIN).reduce((a, r) => a + r[1], 0);
      const rows = raw.filter((r) => r[1] >= MIN);
      if (small) { const o = rows.find((r) => r[0] === "Other"); if (o) o[1] += small; else rows.push(["Other", small]); }
      const max = Math.max(...rows.map((r) => r[1]));
      const otherName = el.dataset.breakdown === "sectors" ? "Other fields" : "Other";
      el.innerHTML = rows.map(([n, c]) => `<div class="row"><span>${n === "Other" ? otherName : esc(label[n] || n)}</span><b>${c}</b><div class="track"><i style="width:${(c / max) * 100}%"></i></div></div>`).join("");
    });
    document.querySelectorAll("[data-routes]").forEach((el) => {
      // bar segments carry no text (a narrow segment would clip it); labels go in a key underneath
      const pct = (c) => Math.round((c / S.members) * 100);
      el.innerHTML = S.routes.map(([n, c]) => `<div style="width:${(c / S.members) * 100}%"></div>`).join("");
      el.setAttribute("aria-hidden", "true");
      el.insertAdjacentHTML("afterend", `<ul class="split-key">${S.routes.map(([n, c]) => `<li>${esc(n)} <b>${pct(c)}%</b></li>`).join("")}</ul>`);
    });
  }

  // count-up numbers: they rest on their final value and count up once scrolled into view
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && !matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    const run = (el) => {
      const end = +el.dataset.count, t0 = performance.now();
      const step = (t) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { io.unobserve(e.target); run(e.target); } }), { threshold: 0.6 });
    counters.forEach((el) => io.observe(el));
  }
})();
