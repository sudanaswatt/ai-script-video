import { templateLibrary } from "./lib/templateData.js";

const select = document.getElementById("templateCategory");
const container = document.getElementById("templateContainer");

function renderTemplates(category) {

  container.innerHTML = "";

  const categoryData = templateLibrary[category];
  if (!categoryData) return;

  categoryData.templates.forEach((template, index) => {

    const shortText = template.prompt.split("\n")[0]; // tampilkan baris pertama saja

    container.innerHTML += `
      <div class="card template-card">

        <div class="section-title">
          ${template.title}
        </div>

        <div class="template-preview">
          ${shortText}...
        </div>

        <div class="template-full hidden" id="full-${index}">
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

  // Toggle detail
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;
      const full = document.getElementById(`full-${id}`);

      full.classList.toggle("hidden");

      this.textContent = full.classList.contains("hidden")
        ? "Lihat Detail"
        : "Tutup";
    });
  });

  // Copy prompt
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

// Change category
select.addEventListener("change", () => {
  renderTemplates(select.value);
});

// Initial render
renderTemplates(select.value);