const http = require('node:http');
const dayjs = require('dayjs');

const PORT = 3000;
const AGEP_DEADLINE = '2026-11-01';

function send(response, statusCode, contentType, body, extraHeaders = {}) {
  response.writeHead(statusCode, {
    'Content-Type': `${contentType}; charset=utf-8`,
    ...extraHeaders,
  });
  response.end(body);
}

function createServer() {
  return http.createServer((request, response) => {
    const url = new URL(request.url, 'http://localhost');
    console.log(`${request.method} ${url.pathname}`);

    if (request.method !== 'GET') {
      send(response, 405, 'text/plain', 'Yalnızca GET yöntemi desteklenir.', {
        Allow: 'GET',
      });
      return;
    }

    if (url.pathname === '/') {
      send(
        response,
        200,
        'text/html',
        `<!doctype html>
<html lang="tr">
<head><meta charset="utf-8"><title>BMH231 Sunucusu</title></head>
<body>
<h1>Küçük Node.js Sunucusu</h1>
<p><a href="/hakkimda">Hakkımda sayfası</a></p>
</body>
</html>`,
      );
      return;
    }

    if (url.pathname === '/hakkimda') {
      send(
        response,
        200,
        'text/html',
        '<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Hakkımda</title></head><body><h1>Bedirhan Çiftçi</h1><p>BMH231 Web Programlama dersi için hazırlanan bu sunucu, Node.js ile temel HTTP yanıtlarını sunar.</p><p>Proje; GET isteklerini, durum kodlarını ve JSON yanıtlarını örnekler.</p><p><a href="/">Ana sayfaya dön</a></p></body></html>',
      );
      return;
    }

    if (url.pathname === '/api/ders') {
      send(
        response,
        200,
        'application/json',
        JSON.stringify({
          kod: 'BMH231',
          ad: 'Web Programlama',
          gun: 'Belirtilmedi',
        }),
      );
      return;
    }

    if (url.pathname === '/api/agep') {
      const deadline = dayjs(AGEP_DEADLINE).startOf('day');
      const today = dayjs().startOf('day');
      send(
        response,
        200,
        'application/json',
        JSON.stringify({
          sonTarih: '01.11.2026',
          kalanGun: deadline.diff(today, 'day'),
        }),
      );
      return;
    }

    send(response, 404, 'text/plain', 'Sayfa bulunamadı');
  });
}

if (require.main === module) {
  createServer().listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
  });
}

module.exports = { createServer };
