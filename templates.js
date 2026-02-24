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

  templates.forEach(t => {

    container.innerHTML += `
      <div class="card">
        <div class="section-title">${t.title}</div>
        <pre>${t.prompt}</pre>
        <button class="generate-btn copy-btn" data-copy="${encodeURIComponent(t.prompt)}">
          COPY PROMPT
        </button>
      </div>
    `;
  });

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