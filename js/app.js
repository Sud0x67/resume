/* 渲染 + 语言切换 + PDF 导出 + GitHub 动态数据 */
(function () {
  'use strict';

  const els = {
    toolbar: document.getElementById('toolbar'),
    sidebar: document.getElementById('sidebar'),
    main: document.getElementById('main-col'),
    footer: document.getElementById('footer'),
    sheet: document.getElementById('sheet'),
    btnPdf: document.getElementById('btn-pdf'),
    btnPdfLabel: document.getElementById('btn-pdf-label'),
    langZh: document.getElementById('lang-zh'),
    langEn: document.getElementById('lang-en'),
  };

  let lang = 'zh';
  try { lang = localStorage.getItem('resume-lang') || 'zh'; } catch (e) {}
  let ghData = null; // { user, repos }

  /* ---------- 小工具 ---------- */

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const ICONS = {
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7L22 7"/></svg>',
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.91c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.87-1.36-3.87-1.36-.53-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.06 11.06 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.12 3.06.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z"/></svg>',
    location: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>',
    link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3l-6.1 3.3 1.4-6.8L2.2 9.1l6.9-.8L12 2z"/></svg>',
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    briefcase: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    cap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/></svg>',
  };

  function fmtDate(iso, l) {
    if (!iso) return '';
    try {
      return new Date(iso).toLocaleDateString(l === 'zh' ? 'zh-CN' : 'en-US', { year: 'numeric', month: 'short' });
    } catch (e) { return iso; }
  }

  /* ---------- 渲染 ---------- */

  function render() {
    const d = DATA[lang];
    const ui = d.ui;
    document.documentElement.lang = ui.langTag;
    document.title = lang === 'zh' ? 'Sud0x67 · 简历' : 'Sud0x67 · Resume';
    document.body.classList.toggle('lang-en', lang === 'en');

    els.langZh.classList.toggle('active', lang === 'zh');
    els.langEn.classList.toggle('active', lang === 'en');
    els.btnPdfLabel.textContent = ui.pdfBtn;
    els.btnPdf.disabled = false;

    renderSidebar(d, ui);
    renderMain(d, ui);
    els.footer.innerHTML = `<p>${esc(ui.footerNote)}</p>`;

    if (ghData) applyGithubData();
  }

  function renderSidebar(d, ui) {
    const avatar = (ghData && ghData.user && ghData.user.avatar_url) || GITHUB_AVATAR_FALLBACK;
    const contactHtml = d.contact.map((c) => {
      const icon = ICONS[c.type] || ICONS.link;
      const inner = `<span class="ci-icon">${icon}</span><span class="ci-label">${esc(c.label)}</span>`;
      return c.href ? `<a class="contact-item" href="${esc(c.href)}" target="_blank" rel="noopener">${inner}</a>` : `<div class="contact-item">${inner}</div>`;
    }).join('');

    const skillsHtml = d.skills.map((g) => `
      <div class="skill-group">
        <div class="skill-cat">${esc(g.category)}</div>
        <div class="skill-items">${g.items.map((i) => `<span class="skill-tag">${esc(i)}</span>`).join('')}</div>
      </div>`).join('');

    const osHtml = d.openSource.map((o) => `
      <div class="os-item">
        <div class="os-head"><span class="os-org">${esc(o.org)}</span><span class="os-role">${esc(o.role)}</span></div>
        <div class="os-desc">${esc(o.desc)}</div>
      </div>`).join('');

    els.sidebar.innerHTML = `
      <div class="id-card card">
        <img class="avatar" src="${esc(avatar)}" alt="${esc(d.meta.name)}" referrerpolicy="no-referrer">
        <h1 class="name">${esc(d.meta.name)}</h1>
        <div class="headline">${esc(d.meta.headline)}</div>
        <div class="focus">${esc(d.meta.focus)}</div>
        <div class="contact">${contactHtml}</div>
      </div>
      <div class="card side-card">
        <h3 class="side-title">${esc(ui.sectionStats)}</h3>
        <div class="gh-stats" id="gh-stats">
          <div class="gh-stat"><span class="num" id="gh-repos">–</span><span class="lbl">${lang === 'zh' ? '公开仓库' : 'Public repos'}</span></div>
          <div class="gh-stat"><span class="num" id="gh-followers">–</span><span class="lbl">${lang === 'zh' ? '关注者' : 'Followers'}</span></div>
          <div class="gh-stat"><span class="num" id="gh-since">–</span><span class="lbl">${lang === 'zh' ? '加入年份' : 'Joined'}</span></div>
        </div>
      </div>
      <div class="card side-card">
        <h3 class="side-title">${esc(ui.sectionSkills)}</h3>
        ${skillsHtml}
      </div>
      <div class="card side-card">
        <h3 class="side-title">${esc(ui.sectionOpenSource)}</h3>
        ${osHtml}
      </div>`;
  }

  function renderMain(d, ui) {
    const section = (id, icon, title, inner) => `
      <section class="card section" id="${id}">
        <h2 class="section-title">${icon}<span>${esc(title)}</span></h2>
        ${inner}
      </section>`;

    const aboutHtml = `<div class="about-text">${d.about.map((p) => `<p>${esc(p)}</p>`).join('')}</div>`;

    const workHtml = d.work.map((w) => `
      <article class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">${esc(w.company)}</div>
            <div class="entry-sub">${esc(w.role)}</div>
          </div>
          <div class="entry-meta"><span class="period">${esc(w.period)}</span><span class="loc">${esc(w.location)}</span></div>
        </div>
        <ul class="bullets">${w.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </article>`).join('');

    const researchHtml = d.research.map((r) => `
      <article class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">${r.link ? `<a href="${esc(r.link)}" target="_blank" rel="noopener">${esc(r.title)}</a>` : esc(r.title)}</div>
            <div class="entry-sub">${esc(r.venue)}</div>
          </div>
        </div>
        <div class="entry-desc">${esc(r.desc)}</div>
      </article>`).join('');

    const eduHtml = d.education.map((e) => `
      <article class="entry">
        <div class="entry-head">
          <div>
            <div class="entry-title">${esc(e.school)}</div>
            <div class="entry-sub">${esc(e.degree)}</div>
          </div>
          <div class="entry-meta"><span class="period">${esc(e.period)}</span></div>
        </div>
        <div class="entry-desc">${esc(e.desc)}</div>
      </article>`).join('');

    const projectsInner = `
      <div class="projects-hint">${ICONS.code}<span>${esc(ui.projectsHint)}</span></div>
      <div class="repo-grid" id="repo-grid"></div>`;

    els.main.innerHTML = [
      section('about', ICONS.user, ui.sectionAbout, aboutHtml),
      section('work', ICONS.briefcase, ui.sectionWork, workHtml),
      section('research', ICONS.star, ui.sectionResearch, researchHtml),
      section('education', ICONS.cap, ui.sectionEducation, eduHtml),
      section('projects', ICONS.github, ui.sectionProjects, projectsInner),
    ].join('');

    renderRepos(ghData ? ghData.repos : REPO_FALLBACK);
  }

  function renderRepos(repos) {
    const grid = document.getElementById('repo-grid');
    if (!grid) return;
    const ui = DATA[lang].ui;
    if (!repos || !repos.length) {
      grid.innerHTML = `<p class="repo-empty">${lang === 'zh' ? '暂无法加载 GitHub 数据。' : 'Could not load GitHub data.'}</p>`;
      return;
    }
    grid.innerHTML = repos.map((r) => {
      const color = LANG_COLORS[r.language] || '#8b949e';
      const langTag = r.language
        ? `<span class="repo-lang"><span class="repo-dot" style="background:${esc(color)}"></span>${esc(r.language)}</span>` : '';
      const stars = r.stargazers_count > 0 ? `<span class="repo-stars">${ICONS.star}${r.stargazers_count}</span>` : '';
      const updated = r.pushed_at ? `<span class="repo-updated">${esc(ui.updatedAt)} ${esc(fmtDate(r.pushed_at, lang))}</span>` : '';
      return `<a class="repo-card" href="${esc(r.html_url)}" target="_blank" rel="noopener">
        <div class="repo-name">${esc(r.name)}</div>
        <div class="repo-desc">${esc(r.description || '')}</div>
        <div class="repo-meta">${langTag}${stars}${updated}</div>
      </a>`;
    }).join('');
  }

  /* ---------- GitHub API ---------- */

  async function fetchGithub() {
    /* 1) 优先读 GitHub Actions 每日生成的静态数据（同源文件，不消耗 API 配额） */
    try {
      const res = await fetch('data/gh.json', { cache: 'no-store' });
      if (res.ok) {
        const d = await res.json();
        if (d && (d.user || d.repos)) {
          ghData = {
            user: d.user || null,
            repos: (d.repos && d.repos.length) ? d.repos : REPO_FALLBACK,
          };
          return;
        }
      }
    } catch (e) { /* 静态数据不可用，退回实时 API */ }

    /* 2) 兜底：匿名直连 GitHub API（限流 60 次/小时/IP，仅作降级路径） */
    try {
      const [u, r] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`).then((x) => x.json()),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`).then((x) => x.json()),
      ]);
      if (u && u.login) {
        const repos = (Array.isArray(r) ? r : [])
          .filter((x) => !x.fork && !x.archived)
          .sort((a, b) => b.stargazers_count - a.stargazers_count)
          .slice(0, 6);
        ghData = { user: u, repos: repos.length ? repos : REPO_FALLBACK };
      }
    } catch (e) {
      ghData = { user: null, repos: REPO_FALLBACK };
    }
  }

  function applyGithubData() {
    const u = ghData.user;
    if (u) {
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      set('gh-repos', u.public_repos);
      set('gh-followers', u.followers);
      set('gh-since', new Date(u.created_at).getFullYear());
    }
    renderRepos(ghData.repos);
  }

  /* ---------- PDF 导出 ---------- */

  function exportPdf() {
    if (typeof html2pdf === 'undefined') {
      alert(DATA[lang].ui.pdfFail);
      return;
    }
    const ui = DATA[lang].ui;
    els.btnPdf.disabled = true;
    els.btnPdfLabel.textContent = ui.exporting;
    document.body.classList.add('exporting');

    const opt = {
      margin: [8, 0, 8, 0],
      filename: `Sud0x67-Resume-${lang === 'zh' ? 'zh' : 'en'}.pdf`,
      image: { type: 'jpeg', quality: 0.96 },
      html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff', logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: ['.card', '.entry', '.repo-card', '.skill-group', '.os-item'] },
    };

    function finish(ok) {
      document.body.classList.remove('exporting');
      if (ok) {
        els.btnPdfLabel.textContent = ui.pdfDone;
        setTimeout(() => { els.btnPdfLabel.textContent = ui.pdfBtn; els.btnPdf.disabled = false; }, 2000);
      } else {
        els.btnPdfLabel.textContent = ui.pdfFail;
        els.btnPdf.disabled = false;
      }
    }

    html2pdf().set(opt).from(els.sheet).toPdf().get('pdf').then((pdf) => {
      const total = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= total; i++) {
        pdf.setPage(i);
        const w = pdf.internal.pageSize.getWidth();
        const h = pdf.internal.pageSize.getHeight();
        pdf.setFontSize(8);
        pdf.setTextColor(150);
        pdf.text(`${GITHUB_USER} · ${i} / ${total}`, w / 2, h - 4, { align: 'center' });
      }
    }).save().then(
      () => finish(true),
      () => finish(false)
    );
  }

  /* ---------- 事件绑定 ---------- */

  els.langZh.addEventListener('click', () => setLang('zh'));
  els.langEn.addEventListener('click', () => setLang('en'));
  els.btnPdf.addEventListener('click', exportPdf);

  function setLang(l) {
    if (lang === l) return;
    lang = l;
    try { localStorage.setItem('resume-lang', l); } catch (e) {}
    render();
  }

  /* ---------- 启动 ---------- */

  render();
  fetchGithub().then(() => { if (ghData) applyGithubData(); });
})();
