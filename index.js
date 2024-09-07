const express = require('express')
const app = express()
const crypto = require('crypto')

// api'ye yapılan istek sonucnnda crypto modulunun hash fonksiyonu devreye girer ve diğer api isteklerini bloklar bu da node.js'in single thread olarak çalışmasından kaynaklıdır 
app.get('/heavy', (req, res) => {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        res.send('Hello World!')
    })
})

app.get('/fast', (req, res) => {
    res.send('Fast Response')
})

app.listen(3000)

// Peki bu durumun çözümü nedir
// Worker Threads: CPU yoğun işlemleri thread_pool ile arka planda çalıştırıp, master thread parçacığını serbest bırakmak için worker_threads kullanabilirsin.
// Cluster Mode: Birden fazla Node.js threads başlatmak için Cluster modülü kullanılabilir. Böylece her Node.js instance'ı kendi CPU çekirdeğini kullanarak istekleri paralel olarak işleyebiliriz.