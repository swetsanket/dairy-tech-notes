// ==========================================
// DAIRY TECH NOTES - APP.JS (PART 1)
// ==========================================

const supabaseUrl = 'https://akeighicldjwsqfmsnuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrZWlnaGljbGRqd3NxZm1zbnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDg0NzEsImV4cCI6MjEwNDAyNDQ3MX0.qHv2FtVuylOGpStmbxryyw0ndWoZMKSF6RPBE_ntD2I';

let supabase = null;

if (window.supabase) {
  supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
}

const app = document.getElementById("app");
const STORE_KEY = "dt-library-v1";

const SEED = {
  "settings": {
    "siteName": "B.Tech Dairy Technology",
    "tagline": "Notes, textbooks and PPTs in one clean place",
    "author": "Swet Sanket",
    "adminPassword": "admin123"
  },

  "subjects": [
    {"id": "s1", "year": 1, "semester": 1, "name": "Elementary Mathematics", "order": 1},
    {"id": "s2", "year": 1, "semester": 1, "name": "Engineering Physics", "order": 2},
    {"id": "s3", "year": 1, "semester": 1, "name": "Engineering Chemistry", "order": 3},
    {"id": "s4", "year": 1, "semester": 1, "name": "Communication Skills", "order": 4},
    {"id": "s5", "year": 1, "semester": 1, "name": "Engineering Drawing", "order": 5},
    {"id": "s6", "year": 1, "semester": 1, "name": "Workshop Practice", "order": 6},
    {"id": "s7", "year": 1, "semester": 1, "name": "Computer Programming", "order": 7},

    {"id": "s8", "year": 1, "semester": 2, "name": "Mathematics II", "order": 1},
    {"id": "s9", "year": 1, "semester": 2, "name": "Environmental Studies", "order": 2},
    {"id": "s10", "year": 1, "semester": 2, "name": "Biochemistry", "order": 3},
    {"id": "s11", "year": 1, "semester": 2, "name": "Introductory Microbiology", "order": 4},
    {"id": "s12", "year": 1, "semester": 2, "name": "Fluid Mechanics", "order": 5},
    {"id": "s13", "year": 1, "semester": 2, "name": "Thermodynamics", "order": 6},
    {"id": "s14", "year": 1, "semester": 2, "name": "Electrical Engineering", "order": 7}
  ],

  "chapters": [],
  "files": []
};

const KIND_META = {
  notes: {
    title: "Notes",
    blurb: "Semester-wise chapter notes.",
    icon: "N",
    cls: "icon-notes"
  },

  textbook: {
    title: "Textbook",
    blurb: "Reference books.",
    icon: "T",
    cls: "icon-pill"
  },

  ppt: {
    title: "PPT",
    blurb: "Lecture slides.",
    icon: "P",
    cls: "icon-ppt"
  }
};

const YEAR_LABEL = {
  1: "1st Year",
  2: "2nd Year",
  3: "3rd Year",
  4: "4th Year"
};

const SEM_IN_YEAR = {
  1: [1, 2],
  2: [3, 4],
  3: [5, 6],
  4: [7, 8]
};

const SEM_LABEL = {
  1: "1st Semester",
  2: "2nd Semester",
  3: "3rd Semester",
  4: "4th Semester",
  5: "5th Semester",
  6: "6th Semester",
  7: "7th Semester",
  8: "8th Semester"
};

function loadDb() {
  try {
    const raw = localStorage.getItem(STORE_KEY);

    if (raw) {
      const parsed = JSON.parse(raw);

      if (
        parsed &&
        Array.isArray(parsed.subjects) &&
        Array.isArray(parsed.chapters) &&
        Array.isArray(parsed.files)
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.error("Local database error:", e);
  }

  return JSON.parse(JSON.stringify(SEED));
}

function saveDb(db) {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error("Local save error:", e);
    toast("Local save failed");
    return;
  }

  if (supabase) {
    supabase
      .from("app_data")
      .update({ db_json: db })
      .eq("id", 1)
      .then(({ error }) => {
        if (error) {
          console.error("Cloud Error:", error);
          toast("Cloud save failed");
        } else {
          console.log("Cloud save successful");
        }
      });
  }
}

function catalogFrom(db) {
  const subjects = (db.subjects || [])
    .slice()
    .sort(
      (a, b) =>
        a.year - b.year ||
        a.semester - b.semester ||
        a.order - b.order
    )
    .map((s) => ({
      ...s,

      chapters: (db.chapters || [])
        .filter((c) => c.subjectId === s.id)
        .sort((a, b) => a.order - b.order)
        .map((c) => ({
          ...c,

          files: (db.files || []).filter(
            (f) => f.chapterId === c.id
          )
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
  const raw =
    (location.hash.replace(/^#/, "") || "/").replace(/\/+$/, "") || "/";

  const parts = raw.split("/").filter(Boolean);

  return { parts };
}

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crumb(items) {
  return `
    <nav class="crumb">
      ${items
        .map((item, i) =>
          i === items.length - 1
            ? `<span>${escapeHtml(item.label)}</span>`
            : `<a href="${item.href}">${escapeHtml(item.label)}</a><span>/</span>`
        )
        .join("")}
    </nav>
  `;
}

function parseDriveId(url) {
  const s = String(url || "").trim();

  if (!s) return "";

  const d = s.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (d) return d[1];

  const q = s.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  if (q) return q[1];

  if (/^[a-zA-Z0-9_-]{20,}$/.test(s)) {
    return s;
  }

  return "";
}

function driveUrls(url) {
  const id = parseDriveId(url);

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

      <h1>All course material, one library.</h1>

      <p>${escapeHtml(catalog.settings.tagline)}</p>
    </section>

    <section class="choice-grid">
      ${Object.entries(KIND_META)
        .map(
          ([key, meta]) => `
          <a class="card" href="#/${key}">
            <div class="icon-pill ${meta.cls}">${meta.icon}</div>

            <h2>${meta.title}</h2>

            <p class="muted">${meta.blurb}</p>
          </a>
        `
        )
        .join("")}
    </section>
  `;
}

function yearView(kind) {
  const meta = KIND_META[kind];

  return `
    ${crumb([
      { href: "#/", label: "Home" },
      { label: meta.title }
    ])}

    <h1 class="section-title">${meta.title}</h1>

    <section class="year-grid">
      ${[1, 2, 3, 4]
        .map(
          (y) => `
          <a class="card year-card" href="#/${kind}/${y}">
            <div class="year-num">${y}</div>
            <strong>${YEAR_LABEL[y]}</strong>
          </a>
        `
        )
        .join("")}
    </section>
  `;
}

function semesterView(kind, year) {
  const meta = KIND_META[kind];

  return `
    ${crumb([
      { href: "#/", label: "Home" },
      { href: `#/${kind}`, label: meta.title },
      { label: YEAR_LABEL[year] }
    ])}

    <h1 class="section-title">${YEAR_LABEL[year]}</h1>

    <section class="sem-grid">
      ${SEM_IN_YEAR[year]
        .map(
          (sem, idx) => `
          <a class="card sem-card" href="#/${kind}/${year}/${sem}">
            <strong>${idx === 0 ? "1st Semester" : "2nd Semester"}</strong>
            <span class="muted">${SEM_LABEL[sem]}</span>
          </a>
        `
        )
        .join("")}
    </section>
  `;
}

function filesView(kind, year, semester) {
  const meta = KIND_META[kind];

  const subs = catalog.subjects.filter(
    (s) => s.year === year && s.semester === semester
  );

  const blocks = subs
    .map((subject) => {
      const chapters = subject.chapters
        .map((ch) => {
          const files = (ch.files || []).filter(
            (f) => f.kind === kind
          );

          const fileBits =
            files.length === 0
              ? `<span class="muted">Link pending</span>`
              : files
                  .map(
                    (f) =>
                      `<button class="ghost" data-open-file="${encodeURIComponent(
                        JSON.stringify(f)
                      )}">Open</button>`
                  )
                  .join(" ");

          return `
            <div class="chapter-row">
              <div>
                <strong>${escapeHtml(ch.name)}</strong>
              </div>

              <div class="inline-actions">
                ${fileBits}
              </div>
            </div>
          `;
        })
        .join("");

      return `
        <article class="panel subject-block">
          <div class="subject-head">
            <h2>${escapeHtml(subject.name)}</h2>
          </div>

          ${chapters}
        </article>
      `;
    })
    .join("");

  return `
    ${crumb([
      { href: "#/", label: "Home" },
      { href: `#/${kind}`, label: meta.title },
      {
        href: `#/${kind}/${year}`,
        label: YEAR_LABEL[year]
      },
      { label: SEM_LABEL[semester] }
    ])}

    <h1 class="section-title">${meta.title}</h1>

    ${subs.length ? blocks : `<div class="empty">No subjects added.</div>`}

    <div id="preview-modal" class="preview-modal" hidden>

      <div class="preview-sheet">

        <div class="preview-bar">

          <strong id="preview-title">Preview</strong>

          <div class="inline-actions">

            <a
              id="preview-download"
              class="btn ghost"
              target="_blank"
            >
              Download
            </a>

            <button
              type="button"
              class="danger"
              id="preview-close"
            >
              Close
            </button>

          </div>

        </div>

        <iframe id="preview-frame"></iframe>

      </div>

    </div>
  `;
}
// ==========================================
// DAIRY TECH NOTES - APP.JS (PART 2)
// ==========================================

function adminLoginView() {
  return `
    <section class="panel admin-login">

      <h1 class="section-title">Admin login</h1>

      <p class="muted">Enter your password.</p>

      <form id="login-form">

        <label for="password">Password</label>

        <input
          id="password"
          name="password"
          type="password"
          required
        />

        <div style="margin-top:14px">
          <button type="submit">Login</button>
        </div>

      </form>

    </section>
  `;
}

function adminPanelView() {

  const cOpts = catalog.subjects
    .map((s) =>
      (s.chapters || [])
        .map(
          (c) =>
            `<option value="${c.id}">
              ${s.year}Y ${s.semester}S -
              ${escapeHtml(s.name)} -
              ${escapeHtml(c.name)}
            </option>`
        )
        .join("")
    )
    .join("");

  const fRows = db.files
    .slice()
    .reverse()
    .map((f) => {

      const c = db.chapters.find(
        (x) => x.id === f.chapterId
      );

      const s = c
        ? db.subjects.find(
            (x) => x.id === c.subjectId
          )
        : null;

      return `
        <tr>

          <td>${f.kind}</td>

          <td>
            ${s ? escapeHtml(s.name) : "-"}
          </td>

          <td>
            ${c ? escapeHtml(c.name) : "-"}
          </td>

          <td>
            <a
              href="${f.driveUrl}"
              target="_blank"
            >
              ${escapeHtml(f.title)}
            </a>
          </td>

          <td>
            <button
              class="danger"
              data-del-file="${f.id}"
            >
              Del
            </button>
          </td>

        </tr>
      `;
    })
    .join("");

  return `
    <div class="admin-wrap">

      <section class="panel">

        <h2>Add File Link</h2>

        <form id="file-form">

          <select name="cId">
            ${cOpts}
          </select>

          <br><br>

          <select name="k">

            <option value="notes">
              Notes
            </option>

            <option value="textbook">
              Textbook
            </option>

            <option value="ppt">
              PPT
            </option>

          </select>

          <br><br>

          <input
            name="t"
            placeholder="Title"
            required
          />

          <br><br>

          <input
            name="u"
            placeholder="Drive Link"
            required
          />

          <br><br>

          <button type="submit">
            Save
          </button>

        </form>

        <table
          class="table"
          style="margin-top:15px"
        >
          <tbody>
            ${fRows}
          </tbody>
        </table>

      </section>


      <section class="panel">

        <h2>Settings</h2>

        <form id="set-form">

          <input
            name="pw"
            type="password"
            placeholder="New Password (optional)"
          />

          <br><br>

          <button type="submit">
            Save
          </button>

          <button
            type="button"
            class="ghost"
            id="lo-btn"
          >
            Logout
          </button>

        </form>

      </section>


      <section class="panel">

        <h2>Add Subject</h2>

        <form id="sub-form">

          <input
            name="y"
            placeholder="Year 1-4"
            required
          />

          <input
            name="s"
            placeholder="Sem 1-8"
            required
          />

          <input
            name="n"
            placeholder="Name"
            required
          />

          <button type="submit">
            Add
          </button>

        </form>

      </section>


      <section class="panel">

        <h2>Add Chapter</h2>

        <form id="ch-form">

          <select name="sId">

            ${catalog.subjects
              .map(
                (s) =>
                  `<option value="${s.id}">
                    ${escapeHtml(s.name)}
                  </option>`
              )
              .join("")}

          </select>

          <input
            name="n"
            placeholder="Name"
            required
          />

          <button type="submit">
            Add
          </button>

        </form>

      </section>

    </div>
  `;
}


function renderAdmin() {

  if (!adminOk) {

    app.innerHTML = adminLoginView();

    document.getElementById(
      "login-form"
    ).onsubmit = (e) => {

      e.preventDefault();

      if (
        e.target.password.value ===
        (db.settings.adminPassword || "admin123")
      ) {

        adminOk = true;

        sessionStorage.setItem(
          "dt-admin",
          "1"
        );

        render();

      } else {

        toast("Wrong password");

      }
    };

    return;
  }


  app.innerHTML = adminPanelView();


  document.getElementById(
    "lo-btn"
  ).onclick = () => {

    adminOk = false;

    sessionStorage.removeItem(
      "dt-admin"
    );

    render();

  };


  document.getElementById(
    "set-form"
  ).onsubmit = (e) => {

    e.preventDefault();

    const pw =
      new FormData(e.target).get("pw");

    if (pw && pw.length > 3) {
      db.settings.adminPassword = pw;
    }

    saveDb(db);

    render();

    toast("Saved");

  };


  document.getElementById(
    "sub-form"
  ).onsubmit = (e) => {

    e.preventDefault();

    const fd =
      new FormData(e.target);

    db.subjects.push({

      id: uid("s"),

      year: Number(fd.get("y")),

      semester: Number(fd.get("s")),

      name: fd.get("n").trim(),

      order: 99

    });

    saveDb(db);

    render();

    toast("Added");

  };


  document.getElementById(
    "ch-form"
  ).onsubmit = (e) => {

    e.preventDefault();

    const fd =
      new FormData(e.target);

    db.chapters =
      db.chapters || [];

    db.chapters.push({

      id: uid("c"),

      subjectId: fd.get("sId"),

      name: fd.get("n").trim(),

      order: 99

    });

    saveDb(db);

    render();

    toast("Added");

  };


  document.getElementById(
    "file-form"
  ).onsubmit = (e) => {

    e.preventDefault();

    const fd =
      new FormData(e.target);

    const urls =
      driveUrls(fd.get("u"));

    if (!urls) {

      toast("Invalid Link");

      return;
    }

    db.files =
      db.files || [];

    db.files.push({

      id: uid("f"),

      chapterId: fd.get("cId"),

      kind: fd.get("k"),

      title: fd.get("t").trim(),

      driveUrl: urls.driveUrl,

      previewUrl: urls.previewUrl,

      downloadUrl: urls.downloadUrl

    });

    saveDb(db);

    render();

    toast("Saved");

  };


  app
    .querySelectorAll("[data-del-file]")
    .forEach((b) => {

      b.onclick = () => {

        if (!confirm("Delete?")) {
          return;
        }

        db.files =
          db.files.filter(
            (f) =>
              f.id !== b.dataset.delFile
          );

        saveDb(db);

        render();

      };

    });

}


function bindPreview() {

  const m =
    document.getElementById(
      "preview-modal"
    );

  if (!m) return;


  document.getElementById(
    "preview-close"
  ).onclick = () => {

    m.hidden = true;

    document.getElementById(
      "preview-frame"
    ).src = "";

  };


  app
    .querySelectorAll(
      "[data-open-file]"
    )
    .forEach((b) => {

      b.onclick = () => {

        const f =
          JSON.parse(
            decodeURIComponent(
              b.dataset.openFile
            )
          );

        document.getElementById(
          "preview-title"
        ).textContent =
          f.title;

        document.getElementById(
          "preview-download"
        ).href =
          f.downloadUrl;

        document.getElementById(
          "preview-frame"
        ).src =
          f.previewUrl;

        m.hidden = false;

      };

    });

}


function render() {

  catalog =
    catalogFrom(db);

  const p =
    parseHash().parts;


  if (!p[0]) {

    app.innerHTML =
      homeView();

  }

  else if (
    p[0] === "admin"
  ) {

    renderAdmin();

  }

  else if (!p[1]) {

    app.innerHTML =
      yearView(p[0]);

  }

  else if (!p[2]) {

    app.innerHTML =
      semesterView(
        p[0],
        Number(p[1])
      );

  }

  else {

    app.innerHTML =
      filesView(
        p[0],
        Number(p[1]),
        Number(p[2])
      );

    bindPreview();

  }

}


/*
  IMPORTANT CLOUD SYNC FIX

  Old code directly replaced local database
  with whatever Supabase returned.

  If Supabase contained {}, the complete
  local database became {}.

  New code:
  1. Checks whether cloud data is valid.
  2. Only replaces local data when valid.
  3. If cloud is empty, keeps local data.
  4. Then uploads local data to Supabase.
*/

async function syncCloud() {

  if (!supabase) {

    console.warn(
      "Supabase client not available"
    );

    return;
  }


  try {

    console.log(
      "Checking Supabase cloud data..."
    );


    const {
      data,
      error
    } = await supabase
      .from("app_data")
      .select("db_json")
      .eq("id", 1)
      .single();


    if (error) {

      console.error(
        "Cloud read error:",
        error
      );

      return;
    }


    const cloudDb =
      data && data.db_json
        ? data.db_json
        : null;


    /*
      CLOUD DATA IS VALID
    */

    if (
      cloudDb &&
      Array.isArray(
        cloudDb.subjects
      ) &&
      Array.isArray(
        cloudDb.chapters
      ) &&
      Array.isArray(
        cloudDb.files
      )
    ) {

      console.log(
        "Valid cloud database found."
      );


      db = cloudDb;


      localStorage.setItem(
        STORE_KEY,
        JSON.stringify(db)
      );


      if (
        parseHash().parts[0] !==
        "admin"
      ) {

        render();

      }


      return;
    }


    /*
      CLOUD DATA IS EMPTY / INVALID

      DO NOT overwrite local data.
      Instead upload current local database.
    */

    console.warn(
      "Supabase database is empty/invalid. Keeping local database and uploading it..."
    );


    const {
      error: uploadError
    } = await supabase
      .from("app_data")
      .update({
        db_json: db
      })
      .eq("id", 1);


    if (uploadError) {

      console.error(
        "Initial cloud upload failed:",
        uploadError
      );

      toast(
        "Cloud initialization failed"
      );

      return;
    }


    console.log(
      "Local database successfully uploaded to Supabase."
    );


    toast(
      "Cloud database initialized"
    );

  } catch (e) {

    console.error(
      "Cloud sync exception:",
      e
    );

  }

}


window.addEventListener(
  "hashchange",
  render
);


render();


syncCloud();
