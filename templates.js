import { templateLibrary } from "./lib/templateData.js";

const select = document.getElementById("templateCategory");
const container = document.getElementById("templateContainer");

function renderTemplates(category) {

  container.innerHTML = "";

  const categoryData = templateLibrary[category];
  const templates = categoryData.templates;

  templates.forEach((t, index) => {

    container.innerHTML += `
      <div class="card template-card">
        <div class="section-title">${t.title}</div>

        <div class="template-content collapsed" id="content-${index}">
          ${t.prompt}
        </div>

        <div class="template-actions">
          <button class="secondary-btn toggle-btn" data-id="${index}">
            Lihat Selengkapnya
          </button>

          <button class="generate-btn copy-btn" data-copy="${encodeURIComponent(t.prompt)}">
            COPY PROMPT
          </button>
        </div>
      </div>
    `;
  });

  // Toggle expand
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;
      const content = document.getElementById(`content-${id}`);

      content.classList.toggle("collapsed");

      this.textContent = content.classList.contains("collapsed")
        ? "Lihat Selengkapnya"
        : "Tutup";
    });
  });

  // Copy
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const text = decodeURIComponent(this.dataset.copy);
      navigator.clipboard.writeText(text);
      this.textContent = "Copied!";
      setTimeout(() => {
        this.textContent = "COPY PROMPT";
      }, 1500);
    });
  });
}

select.addEventListener("change", () => {
  renderTemplates(select.value);
});

renderTemplates(select.value);