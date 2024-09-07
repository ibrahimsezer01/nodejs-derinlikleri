const cluster = require('cluster')


// master process kontrolü yanlışsa yani , yani kod worker sürecinde çalışıyorsa, Express uygulaması başlatılır.
if (cluster.isMaster) {
    // başlatılan her worker, ayrı bir process olarak çalışıyor. Bu, her worker’ın CPU’nun farklı bir çekirdeğinde paralel olarak çlaışmasını sağlıyor
    cluster.fork()
} else {
    const express = require('express')
    const app = express()

    function doWork(duration) {
        const start = Date.now()
        while (Date.now() - start < duration) { }
    }

    // 
    app.get('/heavy', (req, res) => {
        doWork(5000)
        res.send('Hello World!')
    })

    app.get('/fast', (req, res) => {
        res.send('Fast Response')
    })

    app.listen(3000)
}

// Bu nasıl çalışır:
// 1. eğer process 'master' ise, `cluster.fork()` devreye girecektir 
// 2. `cluster.fork()` aynı kodu çalıştıracak yeni bir worker process oluşturacak.
// 3. worker process oluşturulduğunda, `cluster.isMaster` satırını atlayacak ve Express sunucu kodunu çalıştıracaktır.
// 4. Her proccess, istekleri tek başına işler, böylece birden fazla worker istekleri parelel olarak işler.
// 5. her iki api için birbirlerini bloklamadan isteklerimizi gerçekleştirebilecez

