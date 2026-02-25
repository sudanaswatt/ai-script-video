document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".generate-btn");
  const resultBox = document.getElementById("resultBox");
  const templateBtn = document.getElementById("openTemplateLibrary");
  const historyContainer = document.getElementById("historyContainer");
  const clearHistoryBtn = document.getElementById("clearHistoryBtn");

  /* TEMPLATE BUTTON */
  if (templateBtn) {
    templateBtn.addEventListener("click", function () {
      window.location.href = "templates.html";
    });
  }

  if (!button || !resultBox) return;

  /* ==============================
     GENERATE BUTTON
  ============================== */
  button.addEventListener("click", async function () {

    const product = document.getElementById("product")?.value.trim();
    const advantage = document.getElementById("advantage")?.value.trim();
    const audience = document.getElementById("audience")?.value;
    const objectVisual = document.getElementById("objectVisual")?.value.trim();
    const style = document.getElementById("style")?.value;
    const promptCount = parseInt(document.getElementById("promptCount")?.value || 1);

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
          objectVisual
        })
      });

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (!data || !data.image_prompt || !data.prompts) {
        throw new Error("Invalid AI response");
      }

      renderResult(data);
      saveToHistory(data);
      renderHistory();

    } catch (error) {

      console.error(error);

      resultBox.innerHTML = `
        <div class="result-placeholder">
          Terjadi error koneksi ke server.
        </div>
      `;
    }

    button.textContent = "GENERATE CAMPAIGN PROMPT";
    button.disabled = false;

  });

  /* ==============================
     RENDER RESULT
  ============================== */
  function renderResult(data) {

    let html = "";

    html += `
      <div class="scene-block">
        <div class="scene-title">
          🖼 GLOBAL IMAGE PROMPT
        </div>
        <pre class="prompt-text">${escapeHTML(data.image_prompt)}</pre>
        <button class="copy-btn" data-copy="${encodeURIComponent(data.image_prompt)}">
          Copy Image Prompt
        </button>
      </div>
    `;

    data.prompts.forEach(p => {
      html += `
        <div class="scene-block">
          <div class="scene-title">
            🎬 VIDEO PROMPT ${p.prompt_number}
          </div>
          <pre class="prompt-text">${escapeHTML(p.veo_prompt)}</pre>
          <button class="copy-btn" data-copy="${encodeURIComponent(p.veo_prompt)}">
            Copy Video Prompt
          </button>
        </div>
      `;
    });

    resultBox.innerHTML = html;

    document.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", function () {

        const text = decodeURIComponent(this.dataset.copy);

        navigator.clipboard.writeText(text).then(() => {
          const original = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => {
            this.textContent = original;
          }, 1500);
        });

      });
    });
  }

  /* ==============================
     HISTORY SYSTEM
  ============================== */

  function saveToHistory(data) {

    const history = JSON.parse(localStorage.getItem("generateHistory")) || [];

    const newItem = {
      date: new Date().toLocaleString(),
      data: data
    };

    history.unshift(newItem);

    if (history.length > 20) {
      history.pop();
    }

    localStorage.setItem("generateHistory", JSON.stringify(history));
  }

  function renderHistory() {

    if (!historyContainer) return;

    const history = JSON.parse(localStorage.getItem("generateHistory")) || [];

    if (history.length === 0) {
      historyContainer.innerHTML = `
        <div class="result-placeholder">
          Belum ada riwayat generate.
        </div>
      `;
      return;
    }

    historyContainer.innerHTML = "";

    history.forEach((item, index) => {

      historyContainer.innerHTML += `
        <div class="scene-block">

          <div class="scene-title">
            Generate ${index + 1}
          </div>

          <div class="scene-item">
            ${item.date}
          </div>

          <button class="secondary-btn toggle-history-btn" data-index="${index}">
            Lihat Detail
          </button>

          <div class="history-detail hidden" id="history-${index}">
            <hr style="margin:15px 0; opacity:0.2;" />
            <pre class="prompt-text">${escapeHTML(item.data.image_prompt)}</pre>
          </div>

        </div>
      `;
    });

    document.querySelectorAll(".toggle-history-btn").forEach(btn => {
      btn.addEventListener("click", function () {

        const index = this.dataset.index;
        const detail = document.getElementById(`history-${index}`);

        detail.classList.toggle("hidden");

        this.textContent = detail.classList.contains("hidden")
          ? "Lihat Detail"
          : "Tutup";

      });
    });
  }

  if (clearHistoryBtn) {
    clearHistoryBtn.addEventListener("click", function () {
      localStorage.removeItem("generateHistory");
      renderHistory();
    });
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  renderHistory();

});