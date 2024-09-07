const cluster = require('cluster');
const http = require('http');
const numCPU = require("node:os").availableParallelism()

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} çalışıyor.`);

    // Her bir CPU çekirdeği için bir worker process başlat
    for (let i = 0; i < numCPU; i++) {
        cluster.fork();
    }

    // Bir worker process sonlandığunda
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} sonlandı`);
        console.log('Yeni worker başlatılıyor...');
        cluster.fork(); // Biten worker yerine yenisini başlat
    });

} else {
    // worker process HTTP sunucusu başlat
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('Merhaba dünya\n');
    }).listen(8000);

    console.log(`worker process ${process.pid} çalışıyor.`);
}
