const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Halaman Utama</h1><a href="/perencanaan">Ke Statistik</a>');
});

app.get('/perencanaan', (req, res) => {
  res.send('<h1>Halaman Statistik</h1><a href="/">Kembali</a>');
});

app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});
