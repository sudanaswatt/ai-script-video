document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".generate-btn");
  const resultBox = document.getElementById("resultBox");
  const sceneSlider = document.getElementById("sceneCount");
  const sceneNumber = document.getElementById("sceneNumber");
  const upload = document.getElementById("imageUpload");
  const previewContainer = document.getElementById("previewContainer");
  const copyButton = document.getElementById("copyButton");

  let uploadedImages = [];

  /* ==============================
     UPDATE SLIDER NUMBER
  ============================== */
  sceneSlider.addEventListener("input", function () {
    sceneNumber.textContent = sceneSlider.value;
  });

  /* ==============================
     HANDLE IMAGE UPLOAD
  ============================== */
  upload.addEventListener("change", function () {

    uploadedImages = Array.from(upload.files).slice(0, 5);
    const uploadContent = document.getElementById("uploadContent");

    previewContainer.innerHTML = "";

    if (uploadedImages.length === 0) {
      previewContainer.classList.add("hidden");
      if (uploadContent) uploadContent.classList.remove("hidden");
    } else {
      previewContainer.classList.remove("hidden");
      if (uploadContent) uploadContent.classList.add("hidden");
    }

    uploadedImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = function (e) {
        const img = document.createElement("img");
        img.src = e.target.result;
        previewContainer.appendChild(img);
      };
      reader.readAsDataURL(file);
    });

  });

  /* ==============================
     COPY BUTTON
  ============================== */
  if (copyButton) {
    copyButton.addEventListener("click", function () {
      navigator.clipboard.writeText(resultBox.innerText).then(() => {
        copyButton.textContent = "Copied!";
        setTimeout(() => {
          copyButton.textContent = "Copy";
        }, 1500);
      });
    });
  }

  /* ==============================
     GENERATE SCRIPT (CALL API)
  ============================== */
  button.addEventListener("click", async function () {

    const product = document.getElementById("product").value.trim();
    const advantage = document.getElementById("advantage").value.trim();
    const audience = document.getElementById("audience").value;
    const objectVisual = document.getElementById("objectVisual").value.trim();
    const style = document.getElementById("style").value;
    const totalScene = parseInt(sceneSlider.value);
    const overlayEnabled = document.getElementById("textOverlay").checked;

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
          style: style,
          sceneCount: totalScene,
          product: product,
          advantage: advantage,
          audience: audience,
          objectVisual: objectVisual,
          overlayEnabled: overlayEnabled
        })
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      renderResult(data);

    } catch (error) {

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

    let html = "";

    data.scenes.forEach(scene => {

      html += `
        <div class="scene-block">
          <div class="scene-title">
            SCENE ${scene.scene_number} (${scene.type})
          </div>

          <div class="scene-item">
            <b>Visual:</b> ${scene.visual_action}
          </div>

          <div class="scene-item">
            <b>Voice Over:</b> "${scene.voice_over}"
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