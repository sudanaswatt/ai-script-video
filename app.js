document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".generate-btn");
  const resultBox = document.getElementById("resultBox");
  const sceneSlider = document.getElementById("sceneCount");
  const sceneNumber = document.getElementById("sceneNumber");
  const upload = document.getElementById("imageUpload");
  const previewContainer = document.getElementById("previewContainer");
  const uploadContent = document.getElementById("uploadContent");
  const copyButton = document.getElementById("copyButton");
  const uploadArea = document.getElementById("uploadArea");

  let uploadedImages = [];

  /* ==============================
     SAFE CHECK
  ============================== */
  if (!button || !resultBox) return;

  /* ==============================
     SLIDER
  ============================== */
  if (sceneSlider && sceneNumber) {
    sceneSlider.addEventListener("input", function () {
      sceneNumber.textContent = sceneSlider.value;
    });
  }

  /* ==============================
     CLICK UPLOAD AREA
  ============================== */
  if (uploadArea && upload) {
    uploadArea.addEventListener("click", function () {
      upload.click();
    });
  }

  /* ==============================
     HANDLE IMAGE UPLOAD
  ============================== */
  if (upload) {
    upload.addEventListener("change", function () {

      uploadedImages = Array.from(upload.files).slice(0, 5);

      if (previewContainer) previewContainer.innerHTML = "";

      if (uploadedImages.length === 0) {
        previewContainer?.classList.add("hidden");
        uploadContent?.classList.remove("hidden");
        return;
      }

      previewContainer?.classList.remove("hidden");
      uploadContent?.classList.add("hidden");

      uploadedImages.forEach(file => {
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = document.createElement("img");
          img.src = e.target.result;
          img.classList.add("preview-img");
          previewContainer?.appendChild(img);
        };
        reader.readAsDataURL(file);
      });

    });
  }

  /* ==============================
     COPY BUTTON
  ============================== */
  if (copyButton) {
    copyButton.addEventListener("click", function () {

      if (!resultBox.innerText.trim()) return;

      navigator.clipboard.writeText(resultBox.innerText)
        .then(() => {
          copyButton.textContent = "Copied!";
          setTimeout(() => {
            copyButton.textContent = "Copy";
          }, 1500);
        })
        .catch(() => {
          alert("Gagal menyalin teks.");
        });
    });
  }

  /* ==============================
     GENERATE SCRIPT
  ============================== */
  button.addEventListener("click", async function () {

    const product = document.getElementById("product")?.value.trim();
    const advantage = document.getElementById("advantage")?.value.trim();
    const audience = document.getElementById("audience")?.value;
    const objectVisual = document.getElementById("objectVisual")?.value.trim();
    const style = document.getElementById("style")?.value;
    const totalScene = parseInt(sceneSlider?.value || 3);
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
          sceneCount: totalScene,
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

      renderResult(data);

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
     RENDER RESULT
  ============================== */
  function renderResult(data) {

    if (!data) return;

    const global = data.global_context || {};
    const scenes = data.scenes || [];

    let html = `
      <div class="scene-block">
        <div class="scene-title">GLOBAL CONTEXT</div>
        <div class="scene-item"><b>Character:</b> ${global.character || "-"}</div>
        <div class="scene-item"><b>Outfit:</b> ${global.outfit || "-"}</div>
        <div class="scene-item"><b>Location:</b> ${global.location || "-"}</div>
        <div class="scene-item"><b>Time:</b> ${global.time_of_day || "-"}</div>
        <div class="scene-item"><b>Mood:</b> ${global.mood || "-"}</div>
      </div>
    `;

    scenes.forEach(scene => {

      html += `
        <div class="scene-block">
          <div class="scene-title">
            SCENE ${scene.scene_number} (${scene.type})
          </div>

          <div class="scene-item">
            <b>Camera:</b> ${scene.camera_variation || "-"}
          </div>

          <div class="scene-item">
            <b>Visual:</b> ${scene.visual_action || "-"}
          </div>

          <div class="scene-item">
            <b>Voice Over:</b> "${scene.voice_over || "-"}"
          </div>

          ${scene.text_overlay ? `
          <div class="scene-item">
            <b>Teks Overlay:</b> "${scene.text_overlay}"
          </div>` : ""}
        </div>
      `;
    });

    resultBox.innerHTML = html;
  }

});