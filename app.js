document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".generate-btn");
  const resultBox = document.getElementById("resultBox");
  const upload = document.getElementById("imageUpload");
  const previewContainer = document.getElementById("previewContainer");
  const uploadContent = document.getElementById("uploadContent");

  if (!button || !resultBox) return;

  let uploadedImages = [];

  /* ==============================
     IMAGE UPLOAD
  ============================== */
  if (upload) {
    upload.addEventListener("change", function () {

      uploadedImages = Array.from(upload.files).slice(0, 5);
      previewContainer.innerHTML = "";

      if (uploadedImages.length === 0) {
        previewContainer.classList.add("hidden");
        uploadContent.classList.remove("hidden");
        return;
      }

      previewContainer.classList.remove("hidden");
      uploadContent.classList.add("hidden");

      uploadedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("preview-img");
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });

    });
  }

  /* ==============================
     GENERATE
  ============================== */
  button.addEventListener("click", async function () {

    const product = document.getElementById("product")?.value.trim();
    const advantage = document.getElementById("advantage")?.value.trim();
    const audience = document.getElementById("audience")?.value;
    const objectVisual = document.getElementById("objectVisual")?.value.trim();
    const style = document.getElementById("style")?.value;
    const promptCount = parseInt(document.getElementById("promptCount")?.value || 1);
    const overlayEnabled = document.getElementById("textOverlay")?.checked;

    if (!product) {
      alert("Nama produk wajib diisi.");
      return;
    }

    button.textContent = "Generating...";
    button.disabled = true;

    resultBox.innerHTML = `
      <div class="result-placeholder">
        Menghubungkan ke AI engine...
      </div>
    `;

    try {

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          style,
          promptCount,
          product,
          advantage,
          audience,
          objectVisual,
          overlayEnabled
        })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();
      renderPrompts(data);

    } catch (error) {

      console.error(error);

      resultBox.innerHTML = `
        <div class="result-placeholder">
          Terjadi error koneksi ke server.
        </div>
      `;
    }

    button.textContent = "GENERATE SCRIPT OTOMATIS";
    button.disabled = false;

  });

  /* ==============================
     RENDER PROMPTS
  ============================== */
  function renderPrompts(data) {

    if (!data.prompts || data.prompts.length === 0) {
      resultBox.innerHTML = "<div class='result-placeholder'>Tidak ada hasil.</div>";
      return;
    }

    let html = "";

    data.prompts.forEach(item => {

      html += `
        <div class="scene-block">

          <div class="scene-title">
            PROMPT ${item.prompt_number} (6 DETIK)
          </div>

          <div class="scene-item" style="white-space: pre-line;">
            ${item.veo_prompt}
          </div>

          <button class="copy-single-btn" data-text="${encodeURIComponent(item.veo_prompt)}">
            Copy Prompt
          </button>

        </div>
      `;

    });

    resultBox.innerHTML = html;

    /* COPY PER PROMPT */
    document.querySelectorAll(".copy-single-btn").forEach(btn => {
      btn.addEventListener("click", function () {

        const text = decodeURIComponent(this.getAttribute("data-text"));

        navigator.clipboard.writeText(text).then(() => {
          this.textContent = "Copied!";
          setTimeout(() => {
            this.textContent = "Copy Prompt";
          }, 1500);
        });

      });
    });

  }

});