(() => {
  'use strict';

  const data = window.PORTFOLIO_DATA;
  if (!data) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const observers = [];
  const abortController = new AbortController();
  const { signal } = abortController;
  const listen = (target, type, fn, options = {}) => target.addEventListener(type, fn, { ...options, signal });
  let codeTimer = 0;
  let demoTimer = 0;
  let sortTimer = 0;
  let activeExample = 'java';
  let currentSortValues = [8, 3, 6, 1, 5];

  renderAll();
  setupNavigation();
  setupProgress();
  setupReveal();
  setupCursor();
  setupSpiderAnimation();
  renderCodeTabs();
  setupProcess();
  setupProjectDialog();
  configureImages();
  document.querySelector('#current-year').textContent = String(new Date().getFullYear());
  listen(window, 'pagehide', () => {
    abortController.abort();
    observers.forEach((observer) => observer.disconnect());
    window.clearInterval(codeTimer);
    window.clearInterval(demoTimer);
    window.clearTimeout(sortTimer);
  }, { once: true });

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function renderAll() {
    renderExperience();
    renderTeaching();
    renderProjects();
    renderExplorations();
    renderSkills();
    renderEducation();
    renderCertificates();
    renderProcess();
    renderRepos();
    renderCodeTabs();
  }

  function setupSpiderAnimation() {
    const field = document.querySelector('#spider-field');
    const canvas = document.querySelector('#spider-canvas');
    const ctx = canvas?.getContext('2d');
    if (!field || !canvas || !ctx) return;

    const stars = [];
    const spiders = [
      { x: 0, y: 0, speed: .055, phase: 0 },
      { x: 0, y: 0, speed: .038, phase: 2.6 }
    ];
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let time = 0;

    function resize() {
      const rect = field.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      stars.length = 0;
      const count = Math.round(width * height / 3900);
      for (let index = 0; index < count; index += 1) {
        stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.15 + .25, phase: Math.random() * Math.PI * 2 });
      }
      spiders.forEach((spider, index) => {
        spider.x = width * (.44 + index * .12);
        spider.y = height * (.46 + index * .08);
      });
      paint(0, true);
      if (!reduceMotion.matches && visible) start();
    }

    function paint(delta, still = false) {
      ctx.fillStyle = still ? '#030a1e' : 'rgba(3, 10, 30, .19)';
      ctx.fillRect(0, 0, width, height);
      stars.forEach((star) => {
        const pulse = still || reduceMotion.matches ? .56 : .25 + (Math.sin(time * .001 + star.phase) + 1) * .34;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#eaf1ff';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      if (still || !reduceMotion.matches) spiders.forEach((spider) => drawSpider(spider, delta));
    }

    function drawSpider(spider, delta) {
      const t = time * .001 + spider.phase;
      const driftX = Math.sin(t * .7) * 19;
      const driftY = Math.cos(t * .9) * 11;
      const targetX = pointer.active ? pointer.x + driftX : width * (.49 + Math.sin(t * .22) * .13) + driftX;
      const targetY = pointer.active ? pointer.y + driftY : height * (.48 + Math.cos(t * .3) * .12) + driftY;
      const ease = 1 - Math.pow(1 - spider.speed, Math.max(1, delta / 16.67));
      spider.x += (targetX - spider.x) * ease;
      spider.y += (targetY - spider.y) * ease;

      const heading = Math.atan2(targetY - spider.y, targetX - spider.x);
      ctx.save();
      ctx.translate(spider.x, spider.y);
      ctx.rotate(heading || Math.sin(t) * .1);
      ctx.strokeStyle = 'rgba(180, 210, 255, .9)';
      ctx.fillStyle = 'rgba(255, 255, 255, .95)';
      ctx.lineWidth = 1.15;
      ctx.lineCap = 'round';
      for (let leg = 0; leg < 8; leg += 1) {
        const side = leg < 4 ? -1 : 1;
        const pair = leg % 4;
        const step = Math.sin(t * 11 + pair * 1.7 + side) * 4;
        const back = (pair - 1.5) * 1.8;
        const kneeX = back + (pair - 1.5) * 5;
        const kneeY = side * (10 + pair * 1.2 + step * .25);
        const toeX = back + Math.cos(t * 3 + pair) * 9 + step;
        const toeY = side * (19 + pair * 2.2 + step);
        ctx.beginPath();
        ctx.moveTo(back, side * 2);
        ctx.quadraticCurveTo(kneeX, kneeY * .55, kneeX, kneeY);
        ctx.lineTo(toeX, toeY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(toeX, toeY, 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.ellipse(0, 0, 4.2, 2.9, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4, 0, 1.7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function tick(now) {
      frame = 0;
      if (!visible || reduceMotion.matches) return;
      const delta = time ? Math.min(40, now - time) : 16.67;
      time = now;
      paint(delta);
      frame = requestAnimationFrame(tick);
    }

    function start() {
      if (!frame && visible && !reduceMotion.matches) frame = requestAnimationFrame(tick);
    }

    listen(field, 'pointermove', (event) => {
      const rect = field.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    });
    listen(field, 'pointerleave', () => { pointer.active = false; });
    listen(window, 'resize', resize, { passive: true });
    listen(reduceMotion, 'change', () => {
      if (reduceMotion.matches) {
        cancelAnimationFrame(frame);
        frame = 0;
        paint(0, true);
      } else start();
    });
    listen(document, 'visibilitychange', () => {
      visible = document.visibilityState === 'visible';
      if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; }
    });
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && document.visibilityState === 'visible';
        if (visible) start(); else { cancelAnimationFrame(frame); frame = 0; }
      }, { threshold: .05 });
      observer.observe(field);
      observers.push(observer);
    }
    listen(window, 'pagehide', () => cancelAnimationFrame(frame), { once: true });
    resize();
  }

  function renderExperience() {
    const list = document.querySelector('#freelance-timeline');
    data.experiences.filter((item) => item.type === 'software').forEach((item) => {
      const entry = el('article', 'timeline-entry');
      entry.append(el('div', 'timeline-period', item.start || item.end ? `${item.start || '—'} — ${item.end || 'actualidade'}` : 'PERÍODO\nA CONFIRMAR'));
      const content = el('div', 'timeline-content');
      if (item.organization) content.append(el('span', 'timeline-organization', item.organization));
      content.append(el('h3', '', item.role), el('p', '', item.description));
      if (item.responsibilities?.length) {
        const list = el('ul');
        item.responsibilities.forEach((responsibility) => list.append(el('li', '', responsibility)));
        content.append(list);
      }
      const tags = [...(item.technologies || [])];
      if (tags.length) content.append(makeTags(tags, 'timeline-tags'));
      if (item.relatedProjects?.length) {
        const related = el('div', 'timeline-related');
        item.relatedProjects.forEach((id) => {
          const project = data.featuredProjects.find((candidate) => candidate.id === id);
          if (project) related.append(el('span', '', project.name));
        });
        if (related.childElementCount) content.append(related);
      }
      if (item.results?.length) content.append(el('p', 'timeline-results', `Resultados documentados: ${item.results.join(' · ')}`));
      if (item.note) content.append(el('small', 'timeline-note', item.note));
      if (item.image) {
        const image = el('img', 'experience-image'); image.src = item.image; image.alt = item.imageAlt || `Imagem do trabalho: ${item.role}`; image.loading = 'lazy';
        image.onerror = () => image.remove(); content.append(image);
      }
      entry.append(content);
      list.append(entry);
    });
  }

  function renderTeaching() {
    const container = document.querySelector('#teaching-topics');
    const description = document.querySelector('#teaching-description');
    if (description) description.textContent = data.teaching.description;
    data.teaching.topics.forEach((topic) => container.append(el('span', 'topic-chip', topic)));
  }

  function renderProjects() {
    const gallery = document.querySelector('#project-gallery');
    data.featuredProjects.forEach((project, index) => gallery.append(createProject(project, index)));
    setupProjectFilter(gallery);
    setupProjectTilt(gallery);
  }

  function setupProjectFilter(gallery) {
    const bar = document.querySelector('#project-filter');
    if (!bar) return;
    const groups = [
      ['todos', 'Todos', () => true],
      ['live', 'Publicados', (p) => p.statusTone === 'status-live'],
      ['client', 'Projectos para clientes', (p) => p.statusTone === 'status-client'],
      ['progress', 'Em desenvolvimento', (p) => p.statusTone === 'status-progress'],
      ['idea', 'Exploração', (p) => p.statusTone === 'status-idea']
    ];
    const items = [...gallery.querySelectorAll('.project-item')];
    const byId = new Map(data.featuredProjects.map((project) => [project.id, project]));
    groups.forEach(([key, label, test]) => {
      const count = data.featuredProjects.filter(test).length;
      if (!count) return;
      const chip = el('button', 'filter-chip');
      chip.type = 'button'; chip.dataset.filter = key;
      chip.setAttribute('aria-pressed', key === 'todos' ? 'true' : 'false');
      chip.append(document.createTextNode(label), el('small', '', String(count)));
      bar.append(chip);
    });
    let current = 'todos', busy = false;
    const ease = 'cubic-bezier(.2,.7,.2,1)';
    function apply(key) {
      if (busy || key === current) return;
      busy = true; current = key;
      bar.querySelectorAll('.filter-chip').forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === key)));
      const test = groups.find((group) => group[0] === key)[2];
      const show = items.filter((item) => test(byId.get(item.dataset.projectId)));
      const leaving = items.filter((item) => !show.includes(item) && !item.classList.contains('is-hidden'));
      const animate = !reduceMotion.matches;
      const fades = animate ? leaving.map((item) => item.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' })) : [];
      setTimeout(() => {
        const first = new Map(items.filter((item) => !item.classList.contains('is-hidden') && !leaving.includes(item)).map((item) => [item, item.getBoundingClientRect()]));
        gallery.style.minHeight = `${gallery.offsetHeight}px`;
        fades.forEach((fade) => fade.cancel());
        items.forEach((item) => item.classList.toggle('is-hidden', !show.includes(item)));
        gallery.classList.toggle('is-filtered', key !== 'todos');
        show.forEach((item) => item.classList.add('is-visible'));
        if (animate) {
          show.forEach((item, index) => {
            const before = first.get(item);
            if (before) {
              const after = item.getBoundingClientRect();
              const dx = before.left - after.left, dy = before.top - after.top;
              if (dx || dy) item.animate([{ transform: `translate(${dx}px,${dy}px)` }, { transform: 'translate(0,0)' }], { duration: 640, easing: ease });
            } else {
              item.animate([{ opacity: 0, transform: 'translateY(32px) scale(.97)' }, { opacity: 1, transform: 'none' }], { duration: 560, delay: 100 + index * 70, easing: ease, fill: 'backwards' });
            }
          });
        }
        setTimeout(() => { gallery.style.minHeight = ''; busy = false; }, animate ? 720 : 0);
      }, animate && fades.length ? 190 : 0);
    }
    listen(bar, 'click', (event) => {
      const chip = event.target.closest('.filter-chip');
      if (chip) apply(chip.dataset.filter);
    });
  }

  function setupProjectTilt(gallery) {
    if (reduceMotion.matches || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    gallery.querySelectorAll('.project-visual').forEach((visual) => {
      visual.append(el('span', 'visual-glow'));
      listen(visual, 'pointermove', (event) => {
        const box = visual.getBoundingClientRect();
        const x = (event.clientX - box.left) / box.width, y = (event.clientY - box.top) / box.height;
        visual.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`);
        visual.style.setProperty('--my', `${(y * 100).toFixed(1)}%`);
        visual.style.transform = `perspective(900px) rotateX(${((.5 - y) * 6).toFixed(2)}deg) rotateY(${((x - .5) * 8).toFixed(2)}deg)`;
      });
      listen(visual, 'pointerleave', () => { visual.style.transform = ''; });
    });
  }

  function createProject(project, index) {
    const article = el('article', 'project-item');
    article.dataset.projectId = project.id;
    article.dataset.layout = project.layout || 'normal';
    article.dataset.cursor = 'project';
    const visual = el('div', `project-visual visual-${project.visual || 'code'}`);
    visual.setAttribute('aria-hidden', 'true');
    const imagePath = data.profile.assets.projectImages[project.id];
    if (imagePath) {
      const image = el('img', 'project-photo');
      image.src = imagePath;
      image.alt = '';
      image.loading = 'lazy';
      image.onerror = () => image.remove();
      visual.append(image);
    }
    visual.append(el('span', 'visual-index', `PROJECT / ${String(index + 1).padStart(2, '0')}`));
    if (!imagePath) visual.append(projectArt(project.visual));
    visual.append(el('span', 'visual-label', project.visualLabel || project.category));

    const meta = el('div', 'project-meta');
    const topline = el('div', 'project-meta-top');
    topline.append(el('span', '', project.category), el('span', `project-status ${project.statusTone || ''}`, project.status));
    meta.append(topline, el('h3', '', project.name), el('p', '', project.summary));
    meta.append(makeTags(project.technologies.slice(0, 5), 'project-tags'));
    const actions = el('div', 'project-actions');
    const detail = el('button', 'case-link', 'Estudo de caso');
    detail.type = 'button';
    detail.dataset.openProject = project.id;
    detail.setAttribute('aria-label', `Abrir estudo de caso de ${project.name}`);
    detail.append(el('span', '', '↗'));
    actions.append(detail);
    if (project.repo) {
      const repo = el('a', 'repo-link-button', 'Código ↗');
      repo.href = `https://github.com/${data.profile.github}/${encodeURIComponent(project.repo)}`;
      repo.target = '_blank'; repo.rel = 'noopener noreferrer';
      actions.append(repo);
    }
    meta.append(actions);
    article.append(visual, meta);
    return article;
  }

  function projectArt(kind) {
    const art = el('div', `visual-art art-${kind || 'code'}`);
    if (kind === 'education') {
      art.append(el('span', 'visual-mark', 'E/M'));
      art.append(el('span', 'visual-equation', 'CONTEÚDO · API · PESQUISA'));
    } else if (kind === 'math') {
      const chart = el('div', 'math-graphic');
      chart.innerHTML = '<svg viewBox="0 0 360 220" aria-hidden="true"><path d="M5 35 C75 185 132 200 185 165 S285 20 355 48" /></svg>';
      art.append(chart, el('span', 'visual-equation', 'x² + y² = r²'));
    } else if (kind === 'weather') {
      const terminal = el('div', 'weather-terminal');
      terminal.append(el('strong', '', '> city.search("Maputo")'), el('span', '', 'geocoding → coordinates'), el('span', '', 'weather.current → response'), el('span', '', 'temperature · humidity · wind'));
      art.append(terminal);
    } else if (kind === 'study') {
      const terminal = el('div', 'study-terminal');
      terminal.append(el('strong', '', 'PROJECTS / MYSQL'), el('span', '', '01  prazo_estimado'), el('span', '', '02  plano_gemini'), el('span', '', '03  análise_guardada'));
      art.append(terminal);
    } else {
      const tiles = el('div', 'code-tiles');
      ['{ }', '→', 'API', '01', 'ƒ(x)', '↗'].forEach((value) => tiles.append(el('span', '', value)));
      art.append(tiles);
    }
    return art;
  }

  function makeTags(values, className) {
    const wrap = el('div', className);
    values.forEach((value) => wrap.append(el('span', '', value)));
    return wrap;
  }

  function renderExplorations() {
    const list = document.querySelector('#exploration-list');
    data.explorations.forEach((item) => {
      const row = el('article', 'exploration-item');
      row.append(el('span', 'exploration-number', item.number), el('h4', '', item.title), el('span', 'exploration-status', item.status), el('p', '', item.description));
      list.append(row);
    });
  }

  function renderSkills() {
    const container = document.querySelector('#skill-groups');
    data.skills.forEach((group) => {
      const row = el('section', 'skill-group');
      row.append(el('h3', '', group.category));
      const items = el('div', 'skill-items');
      group.items.forEach((item) => {
        const technology = item.project ? el('a', 'skill-item', item.name) : el('span', 'skill-item', item.name);
        if (item.project) {
          technology.href = `https://github.com/${data.profile.github}/${encodeURIComponent(item.project)}`;
          technology.target = '_blank'; technology.rel = 'noopener noreferrer';
          technology.append(el('small', '', '↗'));
          technology.setAttribute('aria-label', `${item.name}: abrir projecto ${item.project}`);
        }
        items.append(technology);
      });
      row.append(items); container.append(row);
    });
  }

  function renderEducation() {
    const list = document.querySelector('#education-list');
    data.education.forEach((record) => {
      const entry = el('article', 'education-entry');
      const main = el('div');
      main.append(el('h3', '', record.course), el('p', '', `${record.institution} · ${record.focus}`));
      entry.append(main, el('span', '', record.status || record.period));
      list.append(entry);
    });
  }

  function renderCertificates() {
    const list = document.querySelector('#certificate-list');
    const count = document.querySelector('#certificate-count');
    count.textContent = `${data.certifications.length} ${data.certifications.length === 1 ? 'REGISTO' : 'REGISTOS'}`;
    if (!data.certifications.length) {
      const empty = el('div', 'certificate-empty');
      empty.append(el('p', '', 'Ainda não foram acrescentados certificados ou cursos concluídos. Esta secção será preenchida apenas com registos e credenciais verificáveis.'), el('span', '', 'DADOS EDITÁVEIS EM js/data.js'));
      list.append(empty);
      return;
    }
    data.certifications.forEach((certificate) => {
      const item = el('article', 'certificate-entry');
      item.append(el('h4', '', certificate.name));
      if (certificate.verificationUrl) {
        const link = el('a', '', 'Verificar ↗'); link.href = certificate.verificationUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; item.append(link);
      }
      const meta = [certificate.issuer, certificate.date, certificate.credentialId].filter(Boolean).join(' · ');
      if (meta) item.append(el('p', '', meta));
      if (certificate.description) item.append(el('p', '', certificate.description));
      if (certificate.skills?.length) item.append(makeTags(certificate.skills, 'project-tags'));
      if (certificate.image) {
        const preview = el('a', 'certificate-preview');
        preview.href = certificate.image; preview.target = '_blank'; preview.rel = 'noopener noreferrer';
        preview.setAttribute('aria-label', `Abrir imagem do certificado: ${certificate.name}`);
        const image = el('img'); image.src = certificate.image; image.alt = `Certificado: ${certificate.name}`;
        preview.append(image); item.append(preview);
      }
      if (certificate.file) {
        const link = el('a', 'certificate-file', 'Abrir PDF ↗');
        link.href = certificate.file; link.target = '_blank'; link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `Abrir ${certificate.name} num novo separador`);
        item.append(link);
      }
      list.append(item);
    });
  }

  function renderProcess() {
    const flow = document.querySelector('#process-flow');
    data.process.forEach((step, index) => {
      const row = el('article', `process-step${index === 0 ? ' is-active' : ''}`);
      row.dataset.step = String(index + 1).padStart(2, '0');
      row.append(el('span', 'step-number', row.dataset.step));
      const copy = el('div'); copy.append(el('h3', '', step.title), el('p', '', step.detail));
      row.append(copy, el('span', 'step-state', index === 0 ? 'ACTUAL' : row.dataset.step));
      flow.append(row);
    });
  }

  function renderRepos() {
    const strip = document.querySelector('#repo-strip');
    data.repositories.forEach((name) => {
      const link = el('a', 'repo-link');
      link.href = `https://github.com/${data.profile.github}/${encodeURIComponent(name)}`;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.append(el('strong', '', name), el('span', '', 'ABRIR REPOSITÓRIO ↗'));
      strip.append(link);
    });
  }

  function configureImages() {
    const { assets } = data.profile;
    const frame = document.querySelector('#portrait-frame');
    if (assets.portrait) {
      const image = el('img', 'portrait-image');
      image.src = assets.portrait;
      image.alt = `Fotografia de ${data.profile.name}`;
      image.onerror = () => image.remove();
      frame.append(image);
    }
    document.querySelector('#portrait-caption').textContent = assets.portraitCaption || data.profile.name.toUpperCase();
    const gallery = document.querySelector('#personal-gallery');
    (assets.personalGallery || []).forEach((photo) => {
      const figure = el('figure', 'personal-photo');
      const image = el('img'); image.src = photo.src; image.alt = photo.alt; image.loading = 'lazy';
      image.onerror = () => { image.remove(); figure.prepend(el('div', 'photo-empty', 'FOTOGRAFIA A ADICIONAR')); };
      const caption = el('figcaption'); caption.append(el('span', '', photo.caption || 'FOTOGRAFIA'), el('span', '', 'JAIME · MAPUTO'));
      figure.append(image, caption); gallery.append(figure);
    });
  }

  function setupNavigation() {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.primary-nav');
    const links = [...nav.querySelectorAll('a[href^="#"]')];
    const close = () => { toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Abrir navegação'); nav.classList.remove('is-open'); document.body.classList.remove('nav-open'); };
    listen(toggle, 'click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fechar navegação' : 'Abrir navegação');
      nav.classList.toggle('is-open', open); document.body.classList.toggle('nav-open', open);
    });
    links.forEach((link) => listen(link, 'click', close));
    listen(document, 'keydown', (event) => { if (event.key === 'Escape') close(); });
    const sectionLinks = {
      inicio: '#sobre', sobre: '#sobre', experiencia: '#experiencia', projetos: '#projetos',
      competencias: '#competencias', laboratorio: '#laboratorio', formacao: '#formacao',
      processo: '#formacao', presenca: '#laboratorio', contacto: '#contacto'
    };
    const sections = [...document.querySelectorAll('main section[id]')];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * .35;
      let active = sections.find((section) => {
        const rect = section.getBoundingClientRect(); return rect.top <= line && rect.bottom > line;
      });
      if (!active && window.scrollY < 100) active = document.querySelector('#inicio');
      const target = active && sectionLinks[active.id];
      if (target) links.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === target));
    };
    listen(window, 'scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    listen(window, 'resize', update, { passive: true }); update();
  }

  function setupProgress() {
    const bar = document.querySelector('#page-progress-bar');
    let frame = 0;
    const update = () => {
      frame = 0;
      const maximum = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = `${maximum > 0 ? window.scrollY / maximum * 100 : 0}%`;
    };
    listen(window, 'scroll', () => { if (!frame) frame = requestAnimationFrame(update); }, { passive: true });
    listen(window, 'resize', update, { passive: true }); update();
  }

  function setupReveal() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    const targets = document.querySelectorAll('.section-kicker, .about-grid, .personal-photo, .experience-intro, .experience-layout, .teaching-panel, .projects-heading, .project-item, .project-ideas, .capabilities-grid, .lab-heading, .lab-panel, .sort-demo, .education-grid, .certifications, .process-grid, .presence-row, .repo-link, .contact-content');
    const observer = new IntersectionObserver((entries, current) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); current.unobserve(entry.target); }
      });
    }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
    targets.forEach((target) => { target.classList.add('reveal'); observer.observe(target); });
    observers.push(observer);
  }

  function setupCursor() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduceMotion.matches) return;
    const cursor = document.querySelector('.custom-cursor');
    document.body.classList.add('has-custom-cursor');
    let x = -30, y = -30, tx = x, ty = y, frame = 0;
    const move = () => {
      x += (tx - x) * .32; y += (ty - y) * .32;
      cursor.style.left = `${x}px`; cursor.style.top = `${y}px`;
      if (Math.abs(tx - x) > .1 || Math.abs(ty - y) > .1) frame = requestAnimationFrame(move); else frame = 0;
    };
    listen(document, 'pointermove', (event) => {
      tx = event.clientX; ty = event.clientY; cursor.classList.add('is-visible');
      if (!frame) frame = requestAnimationFrame(move);
      cursor.classList.toggle('is-hover', Boolean(event.target.closest('a, button, input, [data-cursor]')));
    });
    listen(document, 'pointerleave', () => cursor.classList.remove('is-visible'));
  }

  function renderCodeTabs() {
    const tabs = [...document.querySelectorAll('[data-lab]')];
    tabs.forEach((tab, index) => {
      listen(tab, 'click', () => selectExample(tab.dataset.lab));
      listen(tab, 'keydown', (event) => {
        if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        tabs[next].focus(); selectExample(tabs[next].dataset.lab);
      });
    });
    listen(document.querySelector('#replay-code'), 'click', () => selectExample(activeExample));
    selectExample('java');
    setupSort();
  }

  function selectExample(name) {
    const example = data.labExamples[name];
    if (!example) return;
    activeExample = name;
    document.querySelectorAll('[data-lab]').forEach((tab) => {
      const selected = tab.dataset.lab === name;
      tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1;
    });
    const panel = document.querySelector('#lab-panel');
    panel.setAttribute('aria-labelledby', `tab-${name}`);
    document.querySelector('#code-language').textContent = `${example.language} · ${example.file}`;
    document.querySelector('#code-title').textContent = example.title;
    document.querySelector('#code-caption').textContent = example.caption;
    document.querySelector('#demo-label').textContent = example.demoLabel;
    document.querySelector('#demo-explanation').textContent = example.explanation;
    const code = document.querySelector('#code-display'); code.replaceChildren();
    example.lines.forEach((line, index) => {
      const row = el('span', 'code-line'); row.dataset.line = String(index);
      row.append(el('span', 'code-line-number', String(index + 1).padStart(2, '0')));
      row.append(highlight(line)); code.append(row);
    });
    const demo = document.querySelector('#demo-content'); demo.replaceChildren();
    document.querySelector('#demo-side').classList.toggle('slug-mode', example.demoType === 'slug');
    if (example.demoType === 'steps') renderStepDemo(demo, example.steps);
    if (example.demoType === 'bars') renderBars(demo, currentSortValues, Math.min(1, currentSortValues.length));
    if (example.demoType === 'slug') renderSlugDemo(demo);
    if (example.demoType === 'api') renderApiDemo(demo);
    document.querySelector('#sort-demo').hidden = name === 'api' || name === 'javascript' || name === 'java';
    runCodeSequence(example);
  }

  function highlight(line) {
    const fragment = document.createDocumentFragment();
    const tokens = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:public|private|class|static|void|return|if|else|throw|new|def|for|in|range|len|while|const|function|let|var|true|false|null)\b|\b[A-Za-z_$][\w$]*(?=\s*\())/g;
    let previous = 0; let match;
    while ((match = tokens.exec(line))) {
      fragment.append(document.createTextNode(line.slice(previous, match.index)));
      const value = match[0];
      const type = value.startsWith('"') || value.startsWith("'") ? 'syntax-string' : /^(public|private|class|static|void|return|if|else|throw|new|def|for|in|range|len|while|const|function|let|var|true|false|null)$/.test(value) ? 'syntax-keyword' : 'syntax-function';
      fragment.append(el('span', type, value)); previous = match.index + value.length;
    }
    fragment.append(document.createTextNode(line.slice(previous)));
    return fragment;
  }

  function runCodeSequence(example) {
    window.clearInterval(codeTimer); window.clearInterval(demoTimer);
    const rows = [...document.querySelectorAll('.code-line')];
    rows.forEach((row) => row.classList.remove('is-visible', 'is-current'));
    let line = 0;
    const revealNext = () => {
      if (line >= rows.length) { window.clearInterval(codeTimer); return; }
      if (line > 0) rows[line - 1].classList.remove('is-current');
      rows[line].classList.add('is-visible', 'is-current');
      line += 1;
    };
    if (reduceMotion.matches) rows.forEach((row) => row.classList.add('is-visible'));
    else { codeTimer = window.setInterval(revealNext, 310); }

    if (example.demoType === 'steps' && !reduceMotion.matches) {
      const steps = [...document.querySelectorAll('.demo-step')]; let active = 0;
      demoTimer = window.setInterval(() => {
        steps[active]?.classList.remove('is-active'); active = (active + 1) % steps.length; steps[active]?.classList.add('is-active');
      }, 1350);
    }
  }

  function renderStepDemo(container, steps) {
    steps.forEach((step, index) => {
      const row = el('div', `demo-step${index === 0 ? ' is-active' : ''}`);
      row.append(el('b', '', String(index + 1).padStart(2, '0')), el('span', '', step)); container.append(row);
    });
  }

  function renderSlugDemo(container) {
    const wrap = el('div', 'slug-demo');
    const label = el('label', '', 'Texto de entrada'); label.htmlFor = 'slug-input';
    const input = el('input'); input.id = 'slug-input'; input.value = 'Análise de Sistemas — Maputo'; input.maxLength = 90;
    const output = el('output', 'slug-output'); output.setAttribute('aria-live', 'polite');
    const transform = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const update = () => { output.textContent = transform(input.value) || 'slug-aparece-aqui'; };
    listen(input, 'input', update); update(); wrap.append(label, input, output); container.append(wrap);
  }

  function renderApiDemo(container) {
    const flow = el('div', 'api-flow');
    const source = el('div', 'api-json');
    source.append(el('strong', '', 'RESPOSTA LOCAL'), el('div', '', '{ name: "Maputo",'), el('div', '', ' current: {'), el('div', '', ' temperature_2m: 26,'), el('div', '', ' humidity_2m: 68 } }'));
    flow.append(source, el('span', 'api-arrow', '→'));
    const card = el('div', 'api-card'); card.append(el('small', '', 'COMPONENTE'), el('strong', '', '26 °C'), el('span', '', 'Maputo · humidade 68%'));
    flow.append(card); container.append(flow);
  }

  function setupSort() {
    const input = document.querySelector('#sort-input');
    const run = document.querySelector('#run-sort');
    const drawInitial = () => renderBars(document.querySelector('#sort-visual'), currentSortValues);
    drawInitial();
    listen(run, 'click', runSort);
    listen(input, 'keydown', (event) => { if (event.key === 'Enter') { event.preventDefault(); runSort(); } });
    function runSort() {
      const values = input.value.split(',').map((part) => Number(part.trim()));
      const status = document.querySelector('#sort-status');
      if (!input.value.trim() || !values.length || values.length > 8 || values.some((value) => !Number.isInteger(value) || Math.abs(value) > 999)) {
        status.textContent = 'Introduz entre 1 e 8 números inteiros, separados por vírgulas.'; return;
      }
      window.clearTimeout(sortTimer);
      const working = [...values];
      const states = [];
      for (let i = 1; i < working.length; i += 1) {
        const current = working[i];
        let j = i - 1;
        while (j >= 0 && working[j] > current) { working[j + 1] = working[j]; j -= 1; }
        working[j + 1] = current;
        states.push({ values: [...working], inserted: current, index: i });
      }
      currentSortValues = [...values];
      const visual = document.querySelector('#sort-visual'); visual.replaceChildren();
      const bars = values.map((value, index) => {
        const bar = el('span', 'sort-bar', String(value)); bar.dataset.value = String(value); bar.dataset.index = String(index);
        const max = Math.max(1, ...values.map((number) => Math.abs(number)));
        bar.style.height = `${25 + Math.abs(value) / max * 38}px`;
        visual.append(bar); return bar;
      });
      status.textContent = `Ordenando ${values.length} valores com insertion sort…`;
      let pass = 0;
      const advance = () => {
        bars.forEach((bar) => bar.classList.remove('is-active'));
        if (pass >= states.length) {
          bars.forEach((bar) => bar.classList.add('is-sorted'));
          status.textContent = `${values.join(', ')} → ${working.join(', ')}`;
          currentSortValues = [...working];
          if (activeExample === 'python') renderBars(document.querySelector('#demo-content'), currentSortValues, currentSortValues.length);
          return;
        }
        const state = states[pass];
        bars.forEach((bar, index) => {
          const value = state.values[index];
          bar.textContent = String(value); bar.dataset.value = String(value);
          if (index <= state.index) bar.classList.add('is-sorted');
        });
        if (activeExample === 'python') renderBars(document.querySelector('#demo-content'), state.values, state.index + 1);
        const active = bars[state.index]; active?.classList.add('is-active');
        status.textContent = `Inserção ${pass + 1} de ${states.length}: colocar ${state.inserted} na parte ordenada.`;
        pass += 1;
        sortTimer = window.setTimeout(advance, 540);
      };
      if (reduceMotion.matches) {
        renderBars(visual, working, working.length); currentSortValues = [...working]; status.textContent = `${values.join(', ')} → ${working.join(', ')}`;
        if (activeExample === 'python') renderBars(document.querySelector('#demo-content'), currentSortValues, currentSortValues.length);
      } else if (states.length) advance();
      else { renderBars(visual, working, working.length); status.textContent = `${values.join(', ')} → ${working.join(', ')}`; }
    }
  }

  function renderBars(container, values, sortedCount = 0) {
    if (!container) return;
    container.replaceChildren();
    const max = Math.max(1, ...values.map((value) => Math.abs(value)));
    values.forEach((value, index) => {
      const bar = el('span', 'sort-bar', String(value)); bar.dataset.index = String(index);
      bar.style.height = `${25 + Math.abs(value) / max * 38}px`;
      if (index < sortedCount) bar.classList.add('is-sorted');
      container.append(bar);
    });
  }

  function setupProcess() {
    const rows = [...document.querySelectorAll('.process-step')];
    const counter = document.querySelector('#process-current');
    if (!('IntersectionObserver' in window) || reduceMotion.matches) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      rows.forEach((row) => {
        const active = row === visible.target; row.classList.toggle('is-active', active);
        row.querySelector('.step-state').textContent = active ? 'ACTUAL' : row.dataset.step;
      });
      counter.textContent = visible.target.dataset.step;
    }, { threshold: [.45,.7], rootMargin: '-22% 0px -30% 0px' });
    rows.forEach((row) => observer.observe(row)); observers.push(observer);
  }

  function setupProjectDialog() {
    const dialog = document.querySelector('#project-dialog');
    const content = document.querySelector('#dialog-content');
    const close = document.querySelector('.dialog-close');
    let trigger = null;
    listen(document, 'click', (event) => {
      const button = event.target.closest('[data-open-project]'); if (!button) return;
      const project = data.featuredProjects.find((item) => item.id === button.dataset.openProject); if (!project) return;
      trigger = button; content.replaceChildren(createCaseStudy(project)); dialog.showModal(); close.focus();
    });
    listen(close, 'click', () => dialog.close());
    listen(dialog, 'click', (event) => { if (event.target === dialog) dialog.close(); });
    listen(dialog, 'close', () => trigger?.focus());
  }

  function createCaseStudy(project) {
    const body = el('div', 'dialog-body');
    body.append(el('p', 'dialog-eyebrow', project.category));
    const title = el('h2', '', project.name); title.id = 'dialog-title';
    body.append(title, el('span', 'dialog-status', project.status), el('p', 'dialog-summary', project.summary));
    const imagePath = data.profile.assets.projectImages[project.id];
    if (imagePath) {
      const image = el('img', 'dialog-project-image'); image.src = imagePath; image.alt = `Ilustração visual do projecto ${project.name}`; image.onerror = () => image.remove(); body.append(image);
    }
    const facts = el('div', 'dialog-facts');
    const sections = [
      ['Contexto', project.context], ['Problema', project.problem], ['Objectivo', project.objective],
      ['Participação', project.contribution], ['Abordagem técnica', project.approach],
      ['Arquitectura e decisões', project.architecture], ['Desafios', project.challenges],
      ['Estado actual', project.implementation]
    ];
    if (project.results?.length) sections.push(['Resultados verificáveis', project.results.join(' · ')]);
    sections.filter(([, value]) => value).forEach(([heading, text]) => {
      const section = el('section'); section.append(el('h3', '', heading), el('p', '', text)); facts.append(section);
    });
    body.append(facts, makeTags(project.technologies, 'dialog-tech'));
    if (project.repo) {
      const link = el('a', 'dialog-repo'); link.href = `https://github.com/${data.profile.github}/${encodeURIComponent(project.repo)}`;
      link.target = '_blank'; link.rel = 'noopener noreferrer'; link.append(el('span', '', '↗'), document.createTextNode('Ver repositório'));
      body.append(link);
    }
    return body;
  }
})();
