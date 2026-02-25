import { templateLibrary } from "./lib/templateData.js";

document.addEventListener("DOMContentLoaded", () => {

  const select = document.getElementById("templateCategory");
  const container = document.getElementById("templateContainer");

  if (!select || !container) {
    console.error("Element templateCategory atau templateContainer tidak ditemukan");
    return;
  }

  /* ==============================
     ISI DROPDOWN OTOMATIS
  ============================== */
  Object.keys(templateLibrary).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = templateLibrary[key].label || key;
    select.appendChild(option);
  });

  /* ==============================
     RENDER TEMPLATE
  ============================== */
  function renderTemplates(category) {

    container.innerHTML = "";

    const categoryData = templateLibrary[category];
    if (!categoryData || !categoryData.templates) return;

    categoryData.templates.forEach((template, index) => {

      const card = document.createElement("div");
      card.className = "card template-card";

      card.innerHTML = `
        <div class="section-title">
          ${template.title}
        </div>

        <div class="template-preview">
          ${template.prompt.split("\n")[0]}...
        </div>

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
      `;

      container.appendChild(card);
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
  const firstCategory = Object.keys(templateLibrary)[0];
  if (firstCategory) {
    select.value = firstCategory;
    renderTemplates(firstCategory);
  }

  select.addEventListener("change", () => {
    renderTemplates(select.value);
  });

});