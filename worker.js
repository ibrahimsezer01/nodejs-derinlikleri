const { parentPort } = require('worker_threads');

// döngü işlemi --- 10,000,000,000 kadar sayma
let counter = 0;
while (counter < 1e10) {
    counter++;
}

// Sonucu master threade gönderiyoruz
parentPort.postMessage(counter);
