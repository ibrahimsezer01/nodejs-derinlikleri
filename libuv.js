const crypto = require('crypto');
const fs = require('fs');
const start = Date.now()

// crypto modulunun hashleme yapısı
function doHash() {
    crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
        console.log("Hash", Date.now() - start);
    })
}

// fs modulu ile dosya okuma
function run() {   
    fs.readFile("index.js", "utf-8", () => {
        console.log('FS', Date.now() - start);
        
    })
}

run()

doHash()
doHash()
doHash()
doHash()

// fs işlemleri genellikle yoğun olduğundan ve işlemin ne zaman sonlanacağı bilinmediğinden dolayı node.js bu işlemleri sona saklar
// veya bunu ayrı bir worker oluşturarak fs işlemlerini daha hızlı gerçekleştirebiliriz