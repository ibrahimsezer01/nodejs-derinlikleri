const express = require('express')
const app = express()
const port = 3000

function doWork(duration) {
    const start = Date.now()
    while (Date.now() - start < duration) {}
}

// her attığımmız istek bize 5 saniye sonra cevap verecek
app.get('/heavy', (req, res) => {
    doWork(5000) 
    res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))