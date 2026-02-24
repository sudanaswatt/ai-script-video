export function getCharacterDNA(audience) {

  const presets = {

    "Mahasiswa": `
Seorang mahasiswa pria Indonesia usia 21 tahun,
kulit sawo matang,
rambut hitam pendek rapi,
wajah oval dengan ekspresi santai percaya diri,
menggunakan kaos oblong putih polos dan jeans biru,
tanpa aksesoris berlebihan.
`,

    "Remaja": `
Seorang remaja perempuan Indonesia usia 17 tahun,
kulit cerah natural,
rambut hitam panjang lurus,
wajah bulat dengan ekspresi ceria,
menggunakan hoodie pastel dan celana jeans kasual.
`,

    "Ibu Rumah Tangga": `
Seorang ibu rumah tangga Indonesia usia 32 tahun,
kulit sawo matang,
rambut hitam sebahu,
wajah oval dengan senyum hangat,
menggunakan kemeja flanel dan celana panjang kasual.
`,

    "Freelancer": `
Seorang pria Indonesia usia 28 tahun,
kulit sawo matang,
rambut hitam pendek modern,
wajah tegas dengan ekspresi fokus,
menggunakan kemeja santai dan celana chino.
`,

    "Pebisnis": `
Seorang pria Indonesia usia 35 tahun,
kulit sawo matang,
rambut hitam rapi disisir ke belakang,
wajah tegas profesional,
menggunakan blazer gelap dan kemeja formal.
`,

    "General Audience": `
Seorang pria atau wanita Indonesia usia 25 tahun,
kulit sawo matang,
rambut hitam natural,
wajah ramah dengan ekspresi netral,
menggunakan pakaian kasual modern.
`
  };

  return presets[audience] || presets["General Audience"];
}