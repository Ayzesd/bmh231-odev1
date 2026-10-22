# Bölüm C ve D1 Raporu

**Ders:** BMH231 - Web Programlama  
**Öğrenci:** Bedirhan Çiftçi - 16008125079  
**GitHub deposu:** https://github.com/Ayzesd/bmh231-odev1  
**Ölçüm tarihi:** 22.10.2026  

## C1. Depo ve yapılandırma

`bmh231-odev1` klasörü oluşturularak `git init -b main` ile depo başlatıldı. Git kullanıcı yapılandırmasının ilgili satırları (`git config --list`):

```text
user.name=Bedirhan Çiftçi
user.email=esdbedirhan@gmail.com
```

`.gitignore`, `node_modules/` ve `.env` satırlarını içerir.

## C2. npm projesi

Proje `npm init -y` ile başlatıldı ve `npm install dayjs` ile `dayjs` eklendi. `package.json` içinde `start` betiği `node sunucu.js` komutunu çalıştırır. `package.json` ve `package-lock.json` Git deposuna eklenmiştir; `node_modules/` `.gitignore` ile dışarıda tutulur.

## C3. HTTP sunucusu ve curl çıktıları

Sunucu Node.js'in yerleşik `http` modülü ve `dayjs` kullanılarak `sunucu.js` dosyasında, 3000 portunda oluşturuldu. Her isteğin yöntemi ve yolu sunucu terminaline yazılır. Tüm yanıtlar UTF-8 `Content-Type` bildirir; GET dışındaki istekler `405` ve `Allow: GET` döndürür.

Ölçüm: 22 Ekim 2026, 20:21 (Türkiye saati). Aşağıdaki yanıtlar, sunucu çalışırken `curl.exe -i` ile alınmıştır:

### `curl -i http://localhost:3000/`

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Thu, 22 Oct 2026 17:21:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><title>BMH231 Sunucusu</title></head>
<body>
<h1>BMH231 Web Programlama Sunucusu</h1>
<p><a href="/hakkimda">Hakkımda sayfası</a></p>
</body>
</html>
```

### `curl -i http://localhost:3000/hakkimda`

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Date: Thu, 22 Oct 2026 17:21:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Hakkımda</title></head><body><h1>Bedirhan Çiftçi</h1><p>BMH231 Web Programlama dersi için hazırlanan bu sunucu, Node.js ile temel HTTP yanıtlarını sunar.</p><p>Proje; GET isteklerini, durum kodlarını ve JSON yanıtlarını örnekler.</p><p><a href="/">Ana sayfaya dön</a></p></body></html>
```

### `curl -i http://localhost:3000/api/ders`

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 22 Oct 2026 17:24:30 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"kod":"BMH231","ad":"Web Programlama","gun":"Cuma"}
```

### `curl -i http://localhost:3000/api/agep`

```http
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
Date: Thu, 22 Oct 2026 17:21:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

{"sonTarih":"01.11.2026","kalanGun":10}
```

### `curl -i http://localhost:3000/olmayan-sayfa`

```http
HTTP/1.1 404 Not Found
Content-Type: text/plain; charset=utf-8
Date: Thu, 22 Oct 2026 17:21:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Sayfa bulunamadı
```

### `curl -i -X POST http://localhost:3000/api/ders`

```http
HTTP/1.1 405 Method Not Allowed
Content-Type: text/plain; charset=utf-8
Allow: GET
Date: Thu, 22 Oct 2026 17:21:57 GMT
Connection: keep-alive
Keep-Alive: timeout=5
Transfer-Encoding: chunked

Yalnızca GET yöntemi desteklenir.
```

## C4. Dallanma, birleştirme ve çakışma

`hakkimda` dalında `/hakkimda` sayfası geliştirildi ve `main` dalına birleştirildi. Ardından `baslik` dalında ana sayfa başlığı değiştirildi; `main` üzerinde de aynı başlık farklı metinle değiştirilip `baslik` birleştirildi. Git aynı satırdaki iki değişikliği otomatik seçemedi:

```text
Auto-merging sunucu.js
CONFLICT (content): Merge conflict in sunucu.js
Automatic merge failed; fix conflicts and then commit the result.
```

Çakışan satırdaki dosya işaretleri:

```html
<<<<<<< HEAD
<h1>Küçük Node.js Sunucusu</h1>
=======
<h1>BMH231 Ödev Sunucusu</h1>
>>>>>>> baslik
```

İki seçenek gözden geçirilerek son başlık `BMH231 Web Programlama Sunucusu` olarak belirlendi. İşaretler kaldırıldı, değişiklik `git add` ve merge commit ile kaydedildi. İstenen komutun çıktısı:

```text
*   cf8b179 merge: resolve homepage title conflict
|\  
| * 1e6b833 feat: update homepage title on baslik branch
* | 6572bd9 feat: revise homepage title on main branch
|/  
*   af15d7f merge: integrate about page branch
|\  
| * 955d6dc feat: expand about page project details
|/  
* 6b77af9 docs: include API response examples
* ac9e8c0 docs: describe installation and server routes
* 3cef015 test: cover supported HTTP routes and error responses
* 368c688 feat: add HTTP routes for course and AGEP APIs
* 7e6f7f0 chore: initialize npm project and ignore local files
```

Depoda toplam 10 commit bulunur.

## C5. GitHub, README ve klonlama denemesi

Depo `https://github.com/Ayzesd/bmh231-odev1` adresine `main`, `hakkimda` ve `baslik` dallarıyla gönderildi. README'de kurulum, çalıştırma ve uç noktalar listelenmiştir. Farklı bir klasöre `git clone` ile alınan kopyada `npm install` başarıyla tamamlandı; `npm test` 6/6 test geçti. Klon kopyasında `npm start` çalıştırıldı ve `/api/ders` isteği `200` ile JSON yanıtı verdi. `node_modules/` GitHub deposunda bulunmaz.

## D1. localhost ile gerçek site karşılaştırması

22 Ekim 2026 tarihinde tarayıcıda `http://localhost:3000/api/agep` ve Bölüm B'de seçilen [Habertürk arama sayfası](https://www.haberturk.com/arama/teknolojik-gelismeler?tr=teknolojik%20geli%C5%9Fmeler) açılarak gezinti performans kayıtları incelendi. Yerel istek için toplam gezinti yaklaşık **61 ms**, DNS çözümlemesi **0,1 ms**, TCP bağlantısı **0,5 ms**, TTFB **4,3 ms**, yanıt gövdesinin indirilmesi **0,5 ms** oldu; TLS aşaması yoktu. Habertürk için gezinti yaklaşık **8.118 ms**, DNS **75 ms**, TCP ve TLS el sıkışmalarının toplam bağlantı süresi **63,5 ms** (bunun yaklaşık **33,3 ms**'si TLS), TTFB **3.354,8 ms** ve ana HTML indirmesi **2,2 ms** olarak ölçüldü. Bunlar o oturumdaki tarayıcı ölçümleridir; ağ, sunucu yükü ve önbelleğe göre değişebilir.

Adres çubuğuna girilen her iki URL de önce şema, ana makine, yol ve varsa sorgu bileşenlerine ayrılır. Yerel URL'nin ana makinesi `localhost`, yolu `/api/agep`'tir. Habertürk URL'sinde ana makine `www.haberturk.com`, yol `/arama/teknolojik-gelismeler`, sorgu parametresi ise `tr=teknolojik%20gelişmeler` biçimindedir. Her iki durumda tarayıcı HTTP isteği oluşturur ve sunucudan durum satırı, başlıklar ve gövde içeren bir HTTP yanıtı alır. Sonrasında yanıtın türüne göre içeriği işler ya da gösterir.

İki bağlantının önemli farkı DNS, TCP hedefi ve TLS aşamalarındadır. `localhost`, bilgisayarın kendisini gösteren özel bir addır; genel DNS sunucularında çözülmez ve istek makineden dışarı çıkmadan yerel Node.js sunucusuna ulaşır. Yerel sunucu yalnızca HTTP sunduğu için TCP bağlantısına TLS el sıkışması eklenmez. Habertürk ise uzaktaki bir alan adıdır; tarayıcı DNS ile IP adresini bulur, o adresteki sunucuyla TCP bağlantısı kurar ve HTTPS kullandığından sertifika doğrulaması ile TLS el sıkışmasını tamamlar. TLS, HTTP içeriğini ağ üzerinde şifreleyip sunucu kimliğini doğrulamaya yardımcı olur. Bu ek adımlar ve uzak sunucunun yanıt üretme süresi yerel sunucuya kıyasla gecikmeyi artırabilir.

Yerel `/api/agep` yanıtının `Content-Type` değeri `application/json; charset=utf-8`'dir. Gövde `sonTarih` ve `kalanGun` alanlarını taşıyan JSON olduğundan tarayıcı bunu ham JSON metni olarak gösterir. Habertürk ana belgesi `text/html` türündedir; tarayıcı HTML'i ayrıştırır, DOM oluşturur, CSS varsa CSSOM ile stilleri hesaplar, JavaScript ve görseller gibi kaynakları yükleyerek sayfayı ekrana çizer. Ölçümde Habertürk ana HTML isteği HTTP/2 (`h2`) kullanırken yerel istek HTTP/1.1 kullandı. Habertürk sayfasının toplam süresindeki fark yalnızca ana HTML indirmesinden ibaret değildir: yan kaynakların, betiklerin ve sayfa çiziminin tamamlanması da gezinti süresine katkı verir.

Yerel sunucu internete açılacaksa TLS sertifikasıyla HTTPS, HTTP'den HTTPS'e kalıcı yönlendirme, uygun `Strict-Transport-Security`, içerik güvenliği ve önbellek başlıkları eklenmelidir. Önbellek ayarı, değişmeyen statik kaynakları kısa veya uzun süre saklarken API yanıtları için güncellik ve kişisel veri gereksinimlerine göre belirlenmelidir. Ayrıca hata kayıtları, güvenli yapılandırma, giriş/istek sınırlandırması ve CDN gibi dağıtım özellikleri operasyonel güvenilirliği artırabilir. Buradaki süreler tarayıcı gezinti ölçümüdür; dersin istediği ekran görüntüsü ve Network sekmesi kanıtı için öğrencinin kendi tarayıcısında aynı URL'leri açıp ölçümü ve ekran görüntüsünü rapora eklemesi gerekir.

## Kişiselleştirme

BMH231 ders günü kullanıcı tarafından Cuma olarak bildirildi ve `/api/ders` yanıtına, teste ve README'ye işlendi.
