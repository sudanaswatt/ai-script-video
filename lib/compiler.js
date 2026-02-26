export function compileResult(aiResult, globalStyle, input) {

  const scenes = aiResult.scenes || [];
  const audience = input.audience;

  /* ==============================
     DNA KARAKTER (TERKUNCI)
  ============================== */

  const characterDNA = {
    "Pria Remaja": `
- Remaja laki-laki Indonesia usia 17 tahun
- Kulit sawo matang
- Rambut hitam pendek sedikit berantakan
- Wajah muda segar
- Ekspresi energik dan natural
- Outfit kasual trendi remaja
`,
    "Wanita Remaja": `
- Remaja perempuan Indonesia usia 17 tahun
- Kulit cokelat terang
- Rambut hitam panjang lurus
- Wajah muda lembut
- Senyum ceria natural
- Outfit kasual trendi remaja
`,
    "Ibu Rumah Tangga": `
- Perempuan Indonesia usia 32 tahun
- Kulit cokelat hangat
- Rambut hitam lurus sebahu
- Wajah oval lembut
- Senyum hangat dan keibuan
- Outfit rumahan sopan dan nyaman
`,
    "Pria Dewasa": `
- Pria Indonesia usia 35 tahun
- Kulit cokelat terang
- Rambut hitam pendek rapi
- Wajah bersih tanpa janggut
- Ekspresi percaya diri dan dewasa
- Outfit smart casual rapi
`,
    "Orang Tua": `
- Orang Indonesia usia sekitar 60 tahun
- Tekstur kulit natural sesuai usia
- Rambut pendek sedikit beruban
- Ekspresi tenang dan bijaksana
- Pakaian sederhana dan nyaman
`,
    "Anak Anak": `
- Anak Indonesia usia 7 tahun
- Kulit cokelat terang
- Rambut hitam pendek natural
- Ekspresi ceria dan aktif
- Pakaian kasual berwarna cerah
`
  };

  const dna = characterDNA[audience] || characterDNA["Pria Dewasa"];

  /* ==============================
     PROMPT GAMBAR GLOBAL
  ============================== */

  const imagePrompt = `
Buat gambar iklan portrait rasio 9:16 (vertikal).

Jika pengguna mengunggah gambar produk,
pertahankan bentuk, warna, dan detail produk tersebut secara akurat.

Jika pengguna mengunggah gambar model,
pertahankan wajah, outfit, dan identitas visual model tersebut.

Jika tidak ada gambar model,
gunakan karakter berikut sebagai dasar:

${dna}

Karakter berinteraksi natural dengan produk:
"${input.product}"

Lokasi:
${input.objectVisual}

Pencahayaan: ${globalStyle.lighting}
Warna tone: ${globalStyle.color_tone}

Gaya realistis seperti foto iklan profesional.
Framing vertikal dan terpusat.
Produk harus terlihat jelas dan tidak terpotong.

Gambar ini akan menjadi referensi utama untuk beberapa video berikutnya.
`.trim();

  /* ==============================
     PROMPT VIDEO
  ============================== */

  const prompts = scenes.map((scene) => {

    const safeVoice = scene.voice_over || "Produk ini nyaman dan cocok untuk penggunaan sehari-hari.";

    let framing = "";

    if (scene.type === "hook") {
      framing = `
Close up pada wajah.
Fokus pada ekspresi emosional.
Gerakan mata natural.
`;
    } else if (scene.type === "solusi") {
      framing = `
Medium shot.
Produk terlihat jelas.
Gestur tangan natural saat menjelaskan.
`;
    } else if (scene.type === "cta") {
      framing = `
Medium ke sedikit lebih lebar.
Kontak mata kuat ke kamera.
Postur percaya diri.
Produk tetap terlihat jelas.
`;
    }

    const veoPrompt = `
Buat video portrait durasi 6 detik rasio 9:16.

Tidak miring.
Tidak berputar.
Garis horizon lurus.
Tidak ada guncangan kamera.

Gunakan gambar referensi yang sudah diunggah.
Jangan mengubah wajah, outfit, pencahayaan, atau lokasi.

Gaya Visual:
Pencahayaan: ${globalStyle.lighting}
Warna tone: ${globalStyle.color_tone}
Gaya kamera: ${globalStyle.camera_style}
Kedalaman: ${globalStyle.depth}
Pergerakan: ${globalStyle.motion}

Arahan adegan (6 detik):
${framing}
Aksi: ${scene.visual_action}

Karakter berbicara langsung ke kamera dalam Bahasa Indonesia.
Lip sync jelas dan natural.
Jumlah kata 15-20 kata.
Kecepatan bicara natural (sekitar 3-4 kata per detik).
Ekspresi sesuai tipe adegan.

Dialog:
"${safeVoice}"

Aturan Audio:
- Hanya dialog natural yang jelas.
- Tidak ada subtitle.
- Tidak ada teks di layar.
- Tidak ada musik latar.
- Tidak ada efek suara dramatis.


Gerakan mikro:
-Karakter harus benar-benar mengikuti nada emosi dari audio.
-Ekspresi wajah harus bereaksi secara dinamis terhadap perubahan tinggi rendahnya suara.
-Alis, mata, dan mulut harus mencerminkan tingkat intensitas emosi.
-Harus ada mikro-ekspresi yang alami.
-Jangan sampai wajah terlihat kaku.
`.trim();

    return {
      prompt_number: scene.scene_number,
      veo_prompt: veoPrompt
    };
  });

  return {
    image_prompt: imagePrompt,
    prompt_count: prompts.length,
    prompts: prompts
  };
}