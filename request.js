const express = require('express');
const axios = require('axios');

const app = express();
const port = 4000;

const start = Date.now();

// api'lere istek atmak için axios veya postman ile bu işlemleri gerçekleştirebilirsiniz
function sendRequest() {
  axios.get('http://localhost:3000')
    .then(response => {
      console.log('Başarılı yanıt:', response.status);
      console.log('Time: ', Date.now() - start,"\n");
    })
    .catch(error => {
      console.error('Hata:', error.message);
    });
}

for (let x = 0; x < 20; x++) {
    sendRequest()
}

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde çalışıyor`);
});
