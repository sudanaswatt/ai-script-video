import { templateLibrary } from "./lib/templateData.js";

const select = document.getElementById("templateCategory");
const container = document.getElementById("templateContainer");

/* ==============================
   ISI DROPDOWN OTOMATIS
============================== */
Object.keys(templateLibrary).forEach(key => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = templateLibrary[key].label;
  select.appendChild(option);
});

/* ==============================
   RENDER TEMPLATE
============================== */
function renderTemplates(category) {

  container.innerHTML = "";

  const categoryData = templateLibrary[category];
  if (!categoryData) return;

  categoryData.templates.forEach((template, index) => {

    container.innerHTML += `
      <div class="card template-card">

        <div class="section-title">
          ${template.title}
        </div>

        <!-- PREVIEW -->
        <div class="template-preview">
          ${template.prompt.split("\n")[0]}...
        </div>

        <!-- FULL (DEFAULT HIDDEN) -->
        <div class="template-full" id="full-${index}" style="display:none;">
          <pre>${template.prompt}</pre>
        </div>

        <div class="template-actions">

          <button class="secondary-btn toggle-btn" data-id="${index}">
            Lihat Detail
          </button>

          <button class="generate-btn copy-btn"
            data-copy="${encodeURIComponent(template.prompt)}">
            Copy Prompt
          </button>

        </div>

      </div>
    `;
  });

  /* ==============================
     TOGGLE DETAIL
  ============================== */
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      const id = this.dataset.id;
      const full = document.getElementById(`full-${id}`);

      if (full.style.display === "none") {
        full.style.display = "block";
        this.textContent = "Tutup";
      } else {
        full.style.display = "none";
        this.textContent = "Lihat Detail";
      }

    });
  });

  /* ==============================
     COPY PROMPT
  ============================== */
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function () {

      const text = decodeURIComponent(this.dataset.copy);
      navigator.clipboard.writeText(text);

      this.textContent = "Copied!";
      setTimeout(() => {
        this.textContent = "Copy Prompt";
      }, 1500);

    });
  });
}

/* ==============================
   INITIAL LOAD
============================== */
renderTemplates(Object.keys(templateLibrary)[0]);

select.addEventListener("change", () => {
  renderTemplates(select.value);
});