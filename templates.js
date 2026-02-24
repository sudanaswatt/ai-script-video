const templateLibrary = {

  hook: [
    {
      title: "Hook Relatable Problem",
      prompt: `Buat video 6 detik portrait 9:16.
Karakter terlihat mengalami masalah yang relatable.
Ekspresi wajah natural dan engaging.
Berbicara langsung ke kamera dalam Bahasa Indonesia.
Gunakan kalimat 8–12 kata yang menarik perhatian.`
    },
    {
      title: "Hook Shock Attention",
      prompt: `Video 6 detik portrait 9:16.
Karakter langsung menyampaikan pernyataan mengejutkan.
Nada suara tegas dan engaging.
Gunakan close up atau medium shot.`
    }
  ],

  solution: [
    {
      title: "Solusi Percaya Diri",
      prompt: `Video 6 detik portrait 9:16.
Karakter menjelaskan manfaat utama produk.
Ekspresi percaya diri dan informatif.
Produk terlihat jelas di frame.`
    }
  ],

  cta: [
    {
      title: "CTA Persuasif Kuat",
      prompt: `Video 6 detik portrait 9:16.
Karakter mengajak penonton mencoba produk.
Nada suara tegas dan persuasif.
Kontak mata kuat ke kamera.`
    }
  ],

  emotional: [
    {
      title: "Emotional Story Soft",
      prompt: `Video 6 detik portrait 9:16.
Bangun koneksi emosional sebelum menyebut produk.
Nada suara lembut dan natural.
Ekspresi wajah hangat dan dalam.`
    }
  ]

};

const select = document.getElementById("templateCategory");
const container = document.getElementById("templateContainer");

function renderTemplates(category) {

  container.innerHTML = "";

  const templates = templateLibrary[category];

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

  // Copy button
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