## Hoşgeldiniz arkadaşlar, Node.js derinlikleri nelerdir kısa bi özet geçeyim

Worker thread ve cluster olarak Node.js'te bulunan iki hayat kurtaran mimari yapımız bulunmaktadır.
<br>
Cluster ve Worker Threads, Node.js'de paralel işlem yapmayı sağlayan iki farklı mekanizmadır, ancak birbirlerinden farklı amaçlar için kullanılırlar. Her ikisi de yüksek performanslı uygulamalar geliştirmek için kullanılabilir. Öncelikle cluster yapısını açıklayalım.
<br>
<br>

### Cluster

Cluster, Node.js uygulamanızı birden fazla işlemci çekirdeği üzerinde çalıştırmak için kullanılan bir modüldür.

Çalışma Mantığı: Cluster modülü, Node.js uygulamanızın birden fazla worker process olarak çalışmasını sağlar. Her worker process bağımsız bir Node.js işlemidir, bu da her worker kendi hafızası ve bağımsız işlemci zamanlaması olduğu anlamına gelir.

Master process ve worker process: Cluster kullanırken, bir master process ve birden fazla worker process oluşturulur. master process, worker process başlatır ve gelen istekleri bu process arasında dağıtır.

Kullanım Amacı: Cluster, CPU-bağımlı işlemler için uygundur. Çok çekirdekli sistemlerde, aynı Node.js uygulamasının birden fazla örneğini çalıştırarak her çekirdeği tam kapasiteyle kullanmanızı sağlar. web sunucularında api isteklerinin performansını artırmak için idealdir.

Paylaşılan Bellek: worker process birbirinden izole edilmiş process olarak çalışırlar, bu yüzden aralarında doğrudan bellek paylaşımı yoktur. Bu durum, veri paylaşımı için iletişim protokollerini veya dış veri depolarını kullanmayı gerektirir.
<br>
<br>

### Worker Threads

Worker Threads, aynı Node.js işleminde paralel threads çalıştırmanızı sağlayan bir Node.js özelliğidir.

Çalışma Mantığı: Worker Threads, aynı Node.js süreci içinde birden fazla threads çalıştırmanıza olanak tanır. Bu threads, master thread ile aynı belleği paylaşabilir, bu da düşük gecikmeli veri paylaşımını mümkün kılar.

Kullanım Amacı: Worker Threads, CPU yoğun işlerin (örneğin büyük veri işlemleri veya karmaşık hesaplamalar) ana olay döngüsünü bloke etmesini önlemek için kullanılır. Ana süreçteki işlerin kesintiye uğramadan paralel olarak çalışmasına izin verir.

Paylaşılan Bellek: Worker Threads, SharedArrayBuffer ve Atomics gibi yapılar aracılığıyla bellek paylaşımı yapabilir. Bu, threads arasında hızlı veri paylaşımını sağlar.

Gelişmiş Paralel İşleme: Worker Threads, özellikle hesaplama yoğun ve uzun süreli görevleri işlemek için uygundur. Örneğin, matematiksel hesaplamalar, veri işlemleri veya şifreleme gibi işlerin yan iş parçacıklarında çalıştırılmasını sağlar.
<br>
<br>

### Cluster vs Worker Threads: Karşılaştırma

#### Amaç

Cluster: CPU kullanımını optimize etmek ve gelen istekleri birden fazla işçi sürecine dağıtarak web sunucularının ölçeklenebilirliğini artırmak için kullanılır.
Worker Threads: Aynı süreç içinde paralel hesaplama yaparak CPU yoğun işlerin ana olay döngüsünü bloke etmesini önlemek için kullanılır.
<br>
<br>

#### İşlemler

Cluster: Bağımsız process olarak çalışır, her biri kendi hafızasına ve işlemciye sahiptir.
Worker Threads: Aynı süreç içinde çalışan ve hafızayı paylaşan iş parçacıklarıdır.

Cluster: Bellek paylaşımı yoktur; process arasında veri paylaşımı IPC (Inter-Process Communication) veya dış veri depoları üzerinden yapılır.
Worker Threads: Bellek paylaşımı yapılabilir, threads arasında veri paylaşımı hızlı ve düşük gecikmelidir.

Cluster: Web sunucularının ölçeklendirilmesi, gelen isteklerin dağıtılması.
Worker Threads: Hesaplama yoğun işler, veri işleme, şifreleme, matematiksel hesaplamalar.
<br>
<br>

#### Özetimiz

Cluster, çok çekirdekli sistemlerde bir Node.js uygulamasının birden fazla örneğini çalıştırmak için kullanılır ve her örnek bağımsız bir süreçtir.
Worker Threads, aynı Node.js işleminde birden fazla threads çalıştırarak, CPU yoğun işlerin ana olay döngüsünü bloke etmesini önler.
Her iki teknik de farklı senaryolar için kullanılır. Cluster, tipik olarak yüksek trafikli web sunucuları için kullanılırken, Worker Threads daha çok paralel hesaplamalar gerektiren görevler için idealdir.
<br>
<br>
<br>

#### Kodları çalıştırmak için

```
npm install
```

Ardından dilediğiniz scripti çalıştırabilirsiniz

<br>

#### Not

index.js ve libuv.js script'lerinde threedpool size değerini ayarlamak için package.json dosyasında bulunan scriptler kısmında (index ve libuv) UV_THREADPOOL_SIZE=4 değerini dilediğiniz gibi değiştirip test edebilirsiniz.
