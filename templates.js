import templateLibrary from "./lib/templateData.js";

const select = document.getElementById("templateCategory");
const container = document.getElementById("templateContainer");

/* ==============================
   ISI DROPDOWN OTOMATIS
============================== */
Object.keys(templateLibrary).forEach(key => {
  const option = document.createElement("option");
  option.value = key;
  option.textContent = key.charAt(0).toUpperCase() + key.slice(1);
  select.appendChild(option);
});

/* ==============================
   RENDER TEMPLATE
============================== */
function renderTemplates(category) {

  container.innerHTML = "";

  const templates = templateLibrary[category];
  if (!templates) return;

  templates.forEach((template, index) => {

    const fullPrompt = template.hooks.join("\n");

    container.innerHTML += `
      <div class="card template-card">

        <div class="section-title">
          ${template.title}
        </div>

        <div class="template-preview">
          ${template.hooks[0]}...
        </div>

        <div class="template-full" id="full-${index}" style="display:none;">
          <pre>${fullPrompt}</pre>
        </div>

        <div class="template-actions">

          <button class="secondary-btn toggle-btn" data-id="${index}">
            Lihat Detail
          </button>

          <button class="generate-btn copy-btn"
            data-copy="${encodeURIComponent(fullPrompt)}">
            Copy Prompt
          </button>

        </div>

      </div>
    `;
  });

  /* TOGGLE */
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

  /* COPY */
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

/* INITIAL LOAD */
renderTemplates(Object.keys(templateLibrary)[0]);

select.addEventListener("change", () => {
  renderTemplates(select.value);
});