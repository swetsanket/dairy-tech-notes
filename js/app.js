// ==========================================
// SUPABASE SETUP (SAFE MODE)
// ==========================================
const supabaseUrl = 'https://akeighicldjwsqfmsnuz.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZWlnaGljbGRqd3NxZm1zbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDg0NzEsImV4cCI6MjEwNDAyNDQ3MX0.qHv2FtVuylOGpStmbxryyw0ndWoZMKSF6RPBE_ntD2I'; 

let supabase = null;
if (window.supabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
}

const app = document.getElementById("app");
const STORE_KEY = "dt-library-v1";
const SEED = {"settings":{"siteName":"B.Tech Dairy Technology","tagline":"Notes, textbooks and PPTs in one clean place","author":"Swet Sanket","adminPassword":"admin123"},"subjects":[{"id":"sub-1-1-elementary-mathematics","year":1,"semester":1,"name":"Elementary Mathematics","order":1},{"id":"sub-1-1-engineering-physics","year":1,"semester":1,"name":"Engineering Physics","order":2},{"id":"sub-1-1-engineering-chemistry","year":1,"semester":1,"name":"Engineering Chemistry","order":3},{"id":"sub-1-1-communication-skills","year":1,"semester":1,"name":"Communication Skills","order":4},{"id":"sub-1-1-engineering-drawing","year":1,"semester":1,"name":"Engineering Drawing","order":5},{"id":"sub-1-1-workshop-practice","year":1,"semester":1,"name":"Workshop Practice","order":6},{"id":"sub-1-1-computer-programming","year":1,"semester":1,"name":"Computer Programming","order":7},{"id":"sub-1-2-mathematics-ii","year":1,"semester":2,"name":"Mathematics II","order":1},{"id":"sub-1-2-environmental-studies","year":1,"semester":2,"name":"Environmental Studies","order":2},{"id":"sub-1-2-biochemistry","year":1,"semester":2,"name":"Biochemistry","order":3},{"id":"sub-1-2-introductory-microbiology","year":1,"semester":2,"name":"Introductory Microbiology","order":4},{"id":"sub-1-2-fluid-mechanics","year":1,"semester":2,"name":"Fluid Mechanics","order":5},{"id":"sub-1-2-thermodynamics","year":1,"semester":2,"name":"Thermodynamics","order":6},{"id":"sub-1-2-electrical-engineering","year":1,"semester":2,"name":"Electrical Engineering","order":7}],"chapters":[],"files":[]};

const KIND_META = {
  notes: { title: "Notes", blurb: "Semester-wise chapter notes in PDF.", icon: "N", cls: "icon-notes" },
  textbook: { title: "Textbook", blurb: "Reference books and prescribed textbooks.", icon: "T", cls: "icon-pill" },
  ppt: { title: "PPT", blurb: "Lecture slides for every chapter.", icon: "P", cls: "icon-ppt" }
};
const YEAR_LABEL = { 1: "1st Year", 2: "2nd Year", 3: "3rd Year", 4: "4th Year" };
const SEM_IN_YEAR = { 1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8] };
const SEM_LABEL = { 1: "1st Semester", 2: "2nd Semester", 3: "3rd Semester", 4: "4th Semester", 5: "5th Semester", 6: "6th Semester", 7: "7th Semester", 8: "8th Semester" };

function loadDb() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.subjects && parsed.chapters) return parsed;
    }
  } catch (e) {}
  return JSON.parse(JSON.stringify(SEED));
}

function saveDb(db) {
  localStorage.setItem(STORE_KEY, JSON.stringify(db));
  if (supabase) {
    supabase.from('app_data').update({ db_json: db }).eq('id', 1).then(({error}) => {
      if(error) console.error("Cloud Error:", error);
    });
  }
}

function catalogFrom(db) {
  const subjects = (db.subjects || []).slice().sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => ({
      ...s,
      chapters: (db.chapters || []).filter((c) => c.subjectId === s.id).sort((a, b) => a.order - b.order)
        .map((c) => ({
          ...c,
          files: (db.files || []).filter((f) => f.chapterId === c.id)
        }))
    }));
  return {
    settings: db.settings || SEED.settings,
    subjects,
    files: db.files || []
  };
}

let db = loadDb();
let catalog = catalogFrom(db);
let adminOk = sessionStorage.getItem("dt-admin") === "1";

function parseHash() {
  const raw = (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";
  const parts = raw.split("/").filter(Boolean);
  return { parts };
}

function escapeHtml(str) {
  return String(str || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function subjectsFor(year, semester) {
  return catalog.subjects.filter((s) => s.year === year && s.semester === semester);
}

function crumb(items) {
  return `<nav class="crumb">${items.map((item, i) => i === items.length - 1 ? `<span>${escapeHtml(item.label)}</span>` : `<a href="${item.href}">${escapeHtml(item.label)}</a><span>/</span>`).join("")}</nav>`;
}

function emptyState(text) {
  return `<div class="empty">${escapeHtml(text)}</div>`;
}

function parseDriveId(url) {
  const s = String(url || "").trim();
  if (!s) return "";
  const d = s.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (d) return d[1];
  const q = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (q) return q[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(s)) return s;
  return "";
}

function driveUrls(driveUrl) {
  const id = parseDriveId(driveUrl);
  if (!id) return null;
  return {
    driveId: id,
    driveUrl: "https://drive.google.com/file/d/" + id + "/view",
    previewUrl: "https://drive.google.com/file/d/" + id + "/preview",
    downloadUrl: "https://drive.google.com/uc?export=download&id=" + id
  };
}

function uid(prefix) {
  return prefix + "-" + Math.random().toString(36).slice(2, 10);
}

function toast(msg) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2200);
}

function refresh() {
  catalog = catalogFrom(db);
}

function homeView() {
  return `
    <section class="hero">
      <div class="kicker">${escapeHtml(catalog.settings.siteName)}</div>
      <h1>All your course material, one clean library.</h1>
      <p>${escapeHtml(catalog.settings.tagline)}. Open notes, textbooks or PPTs, then pick the year and semester.</p>
    </section>
    <section class="choice-grid">
      ${Object.entries(KIND_META).map(([key, meta]) => `
        <a class="card" href="#/${key}">
          <div class="icon-pill ${meta.cls}">${meta.icon}</div>
          <h2>${meta.title}</h2>
          <p class="muted">${meta.blurb}</p>
        </a>`).join("")}
    </section>
    <section class="panel help-card">
      <h2 class="section-title">How files work</h2>
      <p class="muted">PDFs stay on Google Drive. This site only stores chapter names and public links.</p>
    </section>
  `;
}

function yearView(kind) {
  const meta = KIND_META[kind];
  return `
    ${crumb([{ href: "#/", label: "Home" }, { label: meta.title }])}
    <h1 class="section-title">${meta.title}</h1>
    <p class="muted" style="margin-bottom:18px">Choose your year. Each year has two semesters.</p>
    <section class="year-grid">
      ${[1, 2, 3, 4].map((y) => `
        <a class="card year-card" href="#/${kind}/${y}">
          <div class="year-num">${y}</div>
          <strong>${YEAR_LABEL[y]}</strong>
          <span class="muted">Semester ${SEM_IN_YEAR[y].join(" & ")}</span>
        </a>`).join("")}
    </section>
  `;
}

function semesterView(kind, year) {
  const meta = KIND_META[kind];
  return `
    ${crumb([{ href: "#/", label: "Home" }, { href: `#/${kind}`, label: meta.title }, { label: YEAR_LABEL[year] }])}
    <h1 class="section-title">${YEAR_LABEL[year]}</h1>
    <p class="muted" style="margin-bottom:18px">Select a semester to open chapters and files.</p>
    <section class="sem-grid">
      ${SEM_IN_YEAR[year].map((sem, idx) => `
        <a class="card sem-card" href="#/${kind}/${year}/${sem}">
          <strong>${idx === 0 ? "1st Semester" : "2nd Semester"}</strong>
          <span class="muted">${SEM_LABEL[sem]} · ${subjectsFor(year, sem).length} subjects</span>
        </a>`).join("")}
    </section>
  `;
}

function filesView(kind, year, semester) {
  const meta = KIND_META[kind];
  const subjects = subjectsFor(year, semester);
  const localSem = SEM_IN_YEAR[year][0] === semester ? "1st Semester" : "2nd Semester";
  const blocks = subjects.map((subject) => {
      const chapters = subject.chapters.map((ch) => {
          const files = (ch.files || []).filter((f) => f.kind === kind);
          const fileBits = files.length === 0 ? `<span class="muted">Link pending</span>` : files.map((f) => `<button class="ghost" data-open-file="${encodeURIComponent(JSON.stringify({ title: f.title, previewUrl: f.previewUrl, downloadUrl: f.downloadUrl, driveUrl: f.driveUrl }))}">Open</button>`).join(" ");
          return `<div class="chapter-row"><div><strong>${escapeHtml(ch.name)}</strong><div class="muted">Chapter ${ch.order}</div></div><div class="inline-actions">${fileBits}</div></div>`;
        }).join("");
      return `<article class="panel subject-block"><div class="subject-head"><h2>${escapeHtml(subject.name)}</h2><span class="muted">${subject.chapters.length} chapters</span></div>${chapters}</article>`;
    }).join("");

  return `
    ${crumb([{ href: "#/", label: "Home" }, { href: `#/${kind}`, label: meta.title }, { href: `#/${kind}/${year}`, label: YEAR_LABEL[year] }, { label: localSem }])}
    <h1 class="section-title">${meta.title} · ${localSem}</h1>
    <p class="muted" style="margin-bottom:18px">${YEAR_LABEL[year]} · ${SEM_LABEL[semester]} · Files open from Google Drive</p>
    ${subjects.length ? blocks : emptyState("No subjects added for this semester yet.")}
    <div id="preview-modal" class="preview-modal" hidden>
      <div class="preview-sheet">
        <div class="preview-bar">
          <strong id="preview-title">Preview</strong>
          <div class="inline-actions">
            <a id="preview-download" class="btn ghost" target="_blank" rel="noopener">Download</a>
            <a id="preview-open" class="btn ghost" target="_blank" rel="noopener">Open in Drive</a>
            <button type="button" class="danger" id="preview-close">Close</button>
          </div>
        </div>
        <iframe id="preview-frame" title="File preview" allow="autoplay"></iframe>
      </div>
    </div>
  `;
}

function adminLoginView() {
  return `
    <section class="panel admin-login">
      <h1 class="section-title">Admin login</h1>
      <p class="muted">Enter your password to manage chapters and files.</p>
      <form id="login-form">
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
        <div style="margin-top:14px"><button type="submit">Enter admin panel</button></div>
      </form>
    </section>
  `;
}

function adminPanelView() {
  const data = { settings: db.settings, subjects: db.subjects || [], chapters: db.chapters || [], files: db.files || [] };
  const subjectOptions = data.subjects.slice().sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => `<option value="${s.id}">Y${s.year} · Sem ${s.semester} · ${escapeHtml(s.name)}</option>`).join("");
  const chapterOptions = data.chapters.slice().sort((a, b) => a.order - b.order)
    .map((c) => {
      const sub = data.subjects.find((s) => s.id === c.subjectId);
      const label = sub ? `Y${sub.year} Sem ${sub.semester} · ${sub.name} · ${c.name}` : c.name;
      return `<option value="${c.id}">${escapeHtml(label)}</option>`;
    }).join("");
  
  const subjectRows = data.subjects.slice().sort((a, b) => a.year - b.year || a.semester - b.semester || a.order - b.order)
    .map((s) => {
      const chCount = data.chapters.filter((c) => c.subjectId === s.id).length;
      return `<tr><td>${s.year}</td><td>${s.semester}</td><td>${escapeHtml(s.name)}</td><td>${chCount}</td><td class="inline-actions"><button class="ghost" data-rename-subject="${s.id}">Rename</button><button class="danger" data-del-subject="${s.id}">Delete</button></td></tr>`;
    }).join("");
  
  const chapterRows = data.chapters.slice()
    .map((c) => {
      const sub = data.subjects.find((s) => s.id === c.subjectId);
      return `<tr><td>${sub ? "Y" + sub.year + " Sem " + sub.semester : "-"}</td><td>${sub ? escapeHtml(sub.name) : "-" }</td><td>${escapeHtml(c.name)}</td><td class="inline-actions"><button class="ghost" data-rename-chapter="${c.id}">Rename</button><button class="danger" data-del-chapter="${c.id}">Delete</button></td></tr>`;
    }).join("");
  
  const fileRows = data.files.slice().reverse()
    .map((f) => {
      const ch = data.chapters.find((c) => c.id === f.chapterId);
      const sub = ch ? data.subjects.find((s) => s.id === ch.subjectId) : null;
      return `<tr><td>${escapeHtml(f.kind)}</td><td>${sub ? escapeHtml(sub.name) : "-"}</td><td>${ch ? escapeHtml(ch.name) : "-"}</td><td><a href="${escapeHtml(f.driveUrl || "#")}" target="_blank" rel="noopener">${escapeHtml(f.title)}</a></td><td><button class="danger" data-del-file="${f.id}">Delete</button></td></tr>`;
    }).join("");

  return `
    <div class="admin-wrap">
      <section class="hero"><div class="kicker">Control panel</div><h1>Manage the library</h1><p>Paste a Google Drive public link below.</p></section>
      <section class="panel drive-panel">
        <h2 class="section-title">Paste Google Drive link here</h2>
        <form id="file-form">
          <label>Chapter</label><select name="chapterId">${chapterOptions}</select>
          <div class="row"><div><label>Type</label><select name="kind"><option value="notes">Notes</option><option value="textbook">Textbook</option><option value="ppt">PPT</option></select></div><div><label>Title</label><input name="title" placeholder="Chapter 1 notes" /></div></div>
          <label>Google Drive link (paste here)</label><input name="driveUrl" required inputmode="url" placeholder="https://drive.google.com/file/d/...." />
          <div style="margin-top:12px"><button type="submit">Save link</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px"><table class="table"><thead><tr><th>Type</th><th>Subject</th><th>Chapter</th><th>File</th><th></th></tr></thead><tbody>${fileRows || ""}</tbody></table></div>
      </section>
      <section class="panel">
        <h2 class="section-title">Site settings</h2>
        <form id="settings-form">
          <div class="row-3"><div><label>Site name</label><input name="siteName" value="${escapeHtml(data.settings.siteName)}" /></div><div><label>Made by</label><input name="author" value="${escapeHtml(data.settings.author)}" /></div><div><label>New password</label><input name="password" type="password" placeholder="Leave blank to keep" /></div></div>
          <label>Tagline</label><input name="tagline" value="${escapeHtml(data.settings.tagline)}" />
          <div style="margin-top:12px" class="inline-actions"><button type="submit">Save settings</button><button type="button" class="ghost" id="logout-btn">Logout</button></div>
        </form>
      </section>
      <section class="panel">
        <h2 class="section-title">Add subject</h2>
        <form id="subject-form" class="row">
          <div><label>Year</label><select name="year">${[1,2,3,4].map((y)=>`<option value="${y}">${y}</option>`).join("")}</select></div><div><label>Semester</label><select name="semester">${[1,2,3,4,5,6,7,8].map((s)=>`<option value="${s}">${s}</option>`).join("")}</select></div>
          <div style="grid-column:1/-1"><label>Subject name</label><input name="name" required placeholder="Dairy Chemistry" /></div><div><button type="submit">Add subject</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px"><table class="table"><thead><tr><th>Year</th><th>Sem</th><th>Subject</th><th>Chapters</th><th></th></tr></thead><tbody>${subjectRows || ""}</tbody></table></div>
      </section>
      <section class="panel">
        <h2 class="section-title">Add Chapter</h2>
        <form id="chapter-form">
          <label>Subject</label><select name="subjectId">${subjectOptions}</select>
          <label>Chapter name</label><input name="name" required placeholder="Milk Proteins" />
          <div style="margin-top:12px"><button type="submit">Add chapter</button></div>
        </form>
        <div style="overflow:auto;margin-top:16px"><table class="table"><thead><tr><th>Year / Sem</th><th>Subject</th><th>Chapter</th><th></th></tr></thead><tbody>${chapterRows || ""}</tbody></table></div>
      </section>
    </div>
  `;
}

function renderAdmin() {
  if (!adminOk) {
    app.innerHTML = adminLoginView();
    document.getElementById("login-form").onsubmit = (e) => {
      e.preventDefault();
      if (e.target.password.value === (db.settings.adminPassword || "admin123")) {
        adminOk = true; sessionStorage.setItem("dt-admin", "1"); render();
      } else toast("Wrong password");
    };
    return;
  }
  app.innerHTML = adminPanelView();
  document.getElementById("logout-btn").onclick = () => { adminOk = false; sessionStorage.removeItem("dt-admin"); render(); };
  document.getElementById("settings-form").onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); db.settings.siteName = String(fd.get("siteName") || db.settings.siteName); db.settings.author = String(fd.get("author") || db.settings.author); db.settings.tagline = String(fd.get("tagline") || db.settings.tagline); const pw = String(fd.get("password") || ""); if (pw.length >= 4) db.settings.adminPassword = pw; saveDb(db); refresh(); toast("Settings saved"); render(); };
  document.getElementById("subject-form").onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); const year = Number(fd.get("year")); const semester = Number(fd.get("semester")); const name = String(fd.get("name") || "").trim(); if (!name) return; db.subjects = db.subjects || []; const order = db.subjects.filter((s) => s.year === year && s.semester === semester).length + 1; db.subjects.push({ id: uid("sub"), year, semester, name, order }); saveDb(db); refresh(); toast("Subject added"); render(); };
  document.getElementById("chapter-form").onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); const subjectId = String(fd.get("subjectId")); const name = String(fd.get("name") || "").trim(); if (!subjectId || !name) return; db.chapters = db.chapters || []; const order = db.chapters.filter((c) => c.subjectId === subjectId).length + 1; db.chapters.push({ id: uid("ch"), subjectId, name, order }); saveDb(db); refresh(); toast("Chapter added"); render(); };
  document.getElementById("file-form").onsubmit = (e) => { e.preventDefault(); const fd = new FormData(e.target); const urls = driveUrls(fd.get("driveUrl")); if (!urls) return toast("Invalid Google Drive link"); db.files = db.files || []; db.files.push({ id: uid("file"), chapterId: String(fd.get("chapterId")), kind: fd.get("kind"), title: String(fd.get("title") || "Open file").trim(), driveId: urls.driveId, driveUrl: urls.driveUrl, previewUrl: urls.previewUrl, downloadUrl: urls.downloadUrl }); saveDb(db); refresh(); toast("Drive link saved"); render(); };
  
  app.querySelectorAll("[data-rename-subject]").forEach((btn) => { btn.onclick = () => { const name = prompt("New subject name"); if (!name) return; const s = db.subjects.find((x) => x.id === btn.dataset.renameSubject); if (s) s.name = name.trim(); saveDb(db); refresh(); render(); }; });
  app.querySelectorAll("[data-del-subject]").forEach((btn) => { btn.onclick = () => { if (!confirm("Delete this subject and its chapters/files?")) return; const id = btn.dataset.delSubject; const chapterIds = db.chapters.filter((c) => c.subjectId === id).map((c) => c.id); db.files = (db.files || []).filter((f) => !chapterIds.includes(f.chapterId)); db.chapters = db.chapters.filter((c) => c.subjectId !== id); db.subjects = db.subjects.filter((s) => s.id !== id); saveDb(db); refresh(); render(); }; });
  app.querySelectorAll("[data-rename-chapter]").forEach((btn) => { btn.onclick = () => { const name = prompt("New chapter name"); if (!name) return; const c = db.chapters.find((x) => x.
