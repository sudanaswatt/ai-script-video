document.addEventListener("DOMContentLoaded", function () {

  const TOTAL_DURATION = 6; // FIX 6 DETIK

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
     GENERATE SCRIPT
  ============================== */
  button.addEventListener("click", function () {

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
        Menyusun script profesional...
      </div>
    `;

    setTimeout(() => {

      let html = "";
      const durationPerScene = TOTAL_DURATION / totalScene;

      for (let i = 1; i <= totalScene; i++) {

        let type = "";
        let visual = "";
        let voice = "";
        let overlay = "";

        const hasImage = uploadedImages[i - 1] !== undefined;

        /* SCENE TYPE */
        if (i === 1) type = "HOOK";
        else if (i === totalScene) type = "CTA";
        else type = "SOLUSI";

        /* TIMING */
        const startTime = ((i - 1) * durationPerScene).toFixed(1);
        const endTime = (i * durationPerScene).toFixed(1);

        /* VISUAL */
        if (hasImage) {
          visual = `Gunakan gambar referensi ke-${i}, tampilkan ${objectVisual || product} dengan gaya ${style}.`;
        } else {
          visual = `${audience} berinteraksi dengan ${product}, fokus pada ${objectVisual || product}, gaya ${style}.`;
        }

        /* VOICE */
        if (type === "HOOK") {
          voice = `Pernah dengar tentang ${product}?`;
        }
        else if (type === "SOLUSI") {
          voice = advantage
            ? `${product} punya keunggulan: ${advantage}.`
            : `${product} membantu dengan cara yang efektif dan praktis.`;
        }
        else {
          voice = `Yuk coba ${product} sekarang juga!`;
        }

        /* OVERLAY */
        if (overlayEnabled) {
          if (type === "HOOK") overlay = "Masalah umum yang sering terjadi!";
          else if (type === "SOLUSI") overlay = "Keunggulan utama produk";
          else overlay = "Coba sekarang sebelum kehabisan!";
        }

        html += `
          <div class="scene-block">
            <div class="scene-title">
              SCENE ${i} (${type}) — ${startTime}s - ${endTime}s
            </div>

            <div class="scene-item">
              <b>Visual:</b> ${visual}
            </div>

            <div class="scene-item">
              <b>Voice Over:</b> "${voice}"
            </div>

            ${overlayEnabled ? `
            <div class="scene-item">
              <b>Teks Overlay:</b> "${overlay}"
            </div>` : ""}
          </div>
        `;
      }

      resultBox.innerHTML = html;

      button.textContent = "GENERATE SCRIPT OTOMATIS";
      button.disabled = false;

    }, 1000);

  });

});
