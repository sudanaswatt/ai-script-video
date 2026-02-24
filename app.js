document.addEventListener("DOMContentLoaded", function () {

  const button = document.querySelector(".generate-btn");
  const resultBox = document.getElementById("resultBox");

  if (!button || !resultBox) return;

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

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (!data || !data.image_prompt || !data.prompts) {
        throw new Error("Invalid AI response");
      }

      renderResult(data);

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

    /* IMAGE PROMPT */
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

    /* VIDEO PROMPTS */
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

    /* COPY HANDLER */
    document.querySelectorAll(".copy-btn").forEach(btn => {
      btn.addEventListener("click", function () {

        const text = decodeURIComponent(this.getAttribute("data-copy"));

        navigator.clipboard.writeText(text).then(() => {
          const originalText = this.textContent;
          this.textContent = "Copied!";
          setTimeout(() => {
            this.textContent = originalText;
          }, 1500);
        });

      });
    });

  }

  /* ==============================
     ESCAPE HTML (ANTI BUG)
  ============================== */

  function escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

});