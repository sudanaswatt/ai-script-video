export function getCharacterDNA(type) {

  const presets = {

    "Pria Remaja": `
Seorang pria remaja Indonesia usia 17 tahun,
kulit sawo matang,
rambut hitam pendek natural,
wajah oval dengan ekspresi energik dan percaya diri,
menggunakan kaos kasual dan celana jeans modern.
`,

    "Wanita Remaja": `
Seorang wanita remaja Indonesia usia 17 tahun,
kulit cerah natural,
rambut hitam panjang lurus,
wajah bulat dengan ekspresi ceria dan ramah,
menggunakan blouse kasual dan rok atau jeans stylish.
`,

    "Ibu Rumah Tangga": `
Seorang ibu rumah tangga Indonesia usia 32 tahun,
kulit sawo matang,
rambut hitam sebahu,
wajah oval dengan senyum hangat,
menggunakan kemeja flanel atau pakaian rumahan rapi.
`,

    "Pria Dewasa": `
Seorang pria dewasa Indonesia usia 30 tahun,
kulit sawo matang,
rambut hitam rapi,
wajah tegas dengan ekspresi percaya diri,
menggunakan kemeja santai atau polo shirt modern.
`,

    "Orang Tua": `
Seorang pria atau wanita Indonesia usia 55 tahun,
kulit matang natural,
rambut hitam dengan sedikit uban,
wajah dengan garis usia alami dan ekspresi bijaksana,
menggunakan pakaian sopan dan nyaman.
`,

    "Anak Anak": `
Seorang anak Indonesia usia 8 tahun,
kulit sawo matang,
rambut hitam pendek atau dikuncir,
wajah polos dengan ekspresi ceria,
menggunakan pakaian kasual berwarna cerah.
`
  };

  return presets[type] || presets["Pria Dewasa"];
}