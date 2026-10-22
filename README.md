# BMH231 Ödev 1 - Küçük Node.js Sunucusu

Node.js'in yerleşik `http` modülü ve `dayjs` paketiyle hazırlanmış, HTTP yöntemlerini ve temel durum kodlarını gösteren küçük bir web sunucusu.

## Gereksinimler

- Node.js ve npm

## Kurulum ve çalıştırma

```powershell
git clone https://github.com/Ayzesd/bmh231-odev1.git
cd bmh231-odev1
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Durdurmak için terminalde `Ctrl+C` tuşlarına basın.

## Testler

Sunucu uç noktalarını doğrulamak için ayrı bir terminalde `npm test` komutunu çalıştırın.

## Örnek API yanıtları

`GET /api/ders` yanıtı:

```json
{
  "kod": "BMH231",
  "ad": "Web Programlama",
  "gun": "Belirtilmedi"
}
```

`GET /api/agep` yanıtındaki `kalanGun` değeri, çalıştırıldığı günün tarihine göre değişir:

```json
{
  "sonTarih": "01.11.2026",
  "kalanGun": 10
}
```

## Desteklenen yollar

| Yöntem | Yol | Durum | Yanıt |
| --- | --- | --- | --- |
| GET | `/` | 200 | Başlık ve `/hakkimda` bağlantısı içeren HTML |
| GET | `/hakkimda` | 200 | Kısa tanıtım sayfası |
| GET | `/api/ders` | 200 | Ders kodu, adı ve günü içeren JSON |
| GET | `/api/agep` | 200 | AGEP son tarihi ve bugünden kalan gün sayısını içeren JSON |
| GET | Diğer yollar | 404 | `Sayfa bulunamadı` metni |
| GET dışındaki yöntemler | Tüm yollar | 405 | Düz metin; `Allow: GET` başlığı |

Her yanıt UTF-8 karakter kodlaması bildirir. İsteklerin yöntemi ve yolu sunucunun çalıştığı terminale yazılır.

## Kişiselleştirme notları

- `/api/ders` yanıtındaki `gun` alanı, dersin haftanın hangi günü olduğuna ilişkin bilgi verilmediği için `Belirtilmedi` olarak bırakılmıştır. Teslim etmeden önce gerçek ders günüyle güncelleyin.
