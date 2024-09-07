const express = require('express');
const { Worker } = require('worker_threads');
const path = require('path');
const app = express();

// uzun sürecek olan döngü işlemini master process engellenmeden ayrı bir worker oluşturup işlemleri gerçekleştiriyoruz
app.get('/heavy', (req, res) => {
    // Worker dosyasını çalıştırıyoruz
    const worker = new Worker(path.resolve(__dirname, 'worker.js'));

    worker.on('message', (myCounter) => {
        res.send(`Counter: ${myCounter}`);
    });

    worker.on('error', (err) => {
        console.error(err);
        res.status(500).send('Worker error occurred');
    });

    worker.on('exit', (code) => {
        if (code !== 0)
            console.error(new Error(`Worker stopped with exit code ${code}`));
    });
});

// işlem bloklanmadan gerçekleştiriliz
app.get('/fast', (req, res) => {
    res.send('Fast Response')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
