const assert = require('node:assert/strict');
const { after, before, test } = require('node:test');
const { createServer } = require('../sunucu');

let server;
let baseUrl;

before(async () => {
  server = createServer();
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test('GET / returns the home page and a link to /hakkimda', async () => {
  const response = await fetch(baseUrl);
  const body = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^text\/html; charset=utf-8$/);
  assert.match(body, /<a href="\/hakkimda">/);
});

test('GET /hakkimda returns the about page', async () => {
  const response = await fetch(`${baseUrl}/hakkimda`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^text\/html; charset=utf-8$/);
  assert.match(await response.text(), /Bedirhan Çiftçi/);
});

test('GET /api/ders returns the course JSON', async () => {
  const response = await fetch(`${baseUrl}/api/ders`);

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /^application\/json; charset=utf-8$/);
  assert.deepEqual(await response.json(), {
    kod: 'BMH231',
    ad: 'Web Programlama',
    gun: 'Belirtilmedi',
  });
});

test('GET /api/agep returns the deadline and remaining calendar days', async () => {
  const response = await fetch(`${baseUrl}/api/agep`);
  const body = await response.json();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const deadline = new Date(2026, 10, 1);
  const expectedDays = Math.round((deadline - today) / 86_400_000);

  assert.equal(response.status, 200);
  assert.deepEqual(body, { sonTarih: '01.11.2026', kalanGun: expectedDays });
});

test('unknown GET routes return 404 plain text', async () => {
  const response = await fetch(`${baseUrl}/olmayan-sayfa`);

  assert.equal(response.status, 404);
  assert.match(response.headers.get('content-type'), /^text\/plain; charset=utf-8$/);
  assert.equal(await response.text(), 'Sayfa bulunamadı');
});

test('non-GET methods return 405 and Allow: GET', async () => {
  const response = await fetch(`${baseUrl}/api/ders`, { method: 'POST' });

  assert.equal(response.status, 405);
  assert.equal(response.headers.get('allow'), 'GET');
  assert.match(response.headers.get('content-type'), /^text\/plain; charset=utf-8$/);
});
