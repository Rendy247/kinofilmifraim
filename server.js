const express = require('express');
const { chromium } = require('playwright');

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const PLAYER_DOMAINS = [
  'variyt.ws', 'kodik', 'alloha', 'videoframe',
  'sibnet', 'collaps', 'cdnmovies', 'bazon', 'hdvb',
  'videoseed', 'voidboost', 'streamguard', 'kinescope',
  'iframe.video', 'plague', 'ashdi', 'tortuga'
];

function isPlayer(url) {
  return PLAYER_DOMAINS.some(d => url.includes(d));
}

async function findIframe(name, year) {
  const query = year ? `${name} ${year}` : name;
  const log = []; // Все шаги пишем сюда — вернём в ответе
  log.push(`🔍 Запрос: "${query}"`);

  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--single-process', '--disable-web-security']
  });

  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 720 }
  });

  const page = await context.newPage();
  let capturedUrl = null;

  page.on('request', req => {
    const url = req.url();
    if (!capturedUrl && isPlayer(url)) {
      capturedUrl = url;
      log.push(`🎯 Перехвачен через сеть: ${url}`);
    }
  });

  try {
    // Шаг 1
    log.push('📡 Шаг 1: открываю nc.lordfilm133.ru...');
    await page.goto('https://nc.lordfilm133.ru/', { waitUntil: 'domcontentloaded', timeout: 25000 });
    log.push(`✅ Страница открыта: ${await page.title()}`);

    // Шаг 2
    log.push('📡 Шаг 2: ищу поле #story...');
    await page.waitForSelector('#story', { timeout: 10000 });
    log.push('✅ Поле #story найдено');

    // Шаг 3
    log.push(`📡 Шаг 3: ввожу "${query}" и нажимаю Enter...`);
    await page.fill('#story', query);
    await page.press('#story', 'Enter');
    log.push('✅ Enter нажат');

    // Шаг 4
    log.push('📡 Шаг 4: жду результаты .th-item...');
    await page.waitForSelector('.th-item', { timeout: 10000 });
    const count = await page.locator('.th-item').count();
    log.push(`✅ Найдено результатов: ${count}`);

    // Шаг 5
    log.push('📡 Шаг 5: кликаю на первый результат...');
    const firstTitle = await page.locator('.th-item').first().textContent().catch(() => '?');
    log.push(`   Первый результат: "${firstTitle.trim().slice(0, 60)}"`);
    await page.locator('.th-item').first().click();
    log.push(`✅ Клик выполнен, текущий URL: ${page.url()}`);

    // Шаг 6
    log.push('📡 Шаг 6: жду iframe на странице фильма...');
    await page.waitForSelector('iframe', { timeout: 15000 });

    // Шаг 7
    log.push('📡 Шаг 7: читаю src из iframe...');
    const allFrames = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('iframe')).map(f => ({
        src: f.src || f.getAttribute('src') || '',
        id: f.id,
        className: f.className
      }));
    });
    log.push(`   Всего iframe на странице: ${allFrames.length}`);
    allFrames.forEach((f, i) => log.push(`   iframe[${i}]: src="${f.src}" id="${f.id}"`));

    // Берём первый непустой
    for (const f of allFrames) {
      if (f.src && f.src !== 'about:blank' && f.src !== '') {
        capturedUrl = f.src.startsWith('http') ? f.src : 'https:' + f.src;
        log.push(`✅ Выбран iframe: ${capturedUrl}`);
        break;
      }
    }

    // Ждём ещё если не нашли
    if (!capturedUrl) {
      log.push('⏳ iframe пустые, жду 3 сек...');
      await page.waitForTimeout(3000);
      const frames2 = await page.evaluate(() =>
        Array.from(document.querySelectorAll('iframe')).map(f => f.src || f.getAttribute('src') || '')
      );
      log.push(`   iframe после ожидания: ${JSON.stringify(frames2)}`);
      for (const s of frames2) {
        if (s && s !== 'about:blank') {
          capturedUrl = s.startsWith('http') ? s : 'https:' + s;
          break;
        }
      }
    }

  } catch (e) {
    log.push(`❌ ОШИБКА: ${e.message.split('\n')[0]}`);
  } finally {
    await browser.close();
  }

  log.push(capturedUrl ? `✅ ИТОГ: ${capturedUrl}` : '❌ ИТОГ: плеер не найден');
  return { url: capturedUrl || null, log };
}

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true, usage: '/iframe?name=Аватар&year=2009' });
});

app.get('/iframe', async (req, res) => {
  const name = (req.query.name || '').trim();
  const year = (req.query.year || '').trim();
  if (!name) return res.status(400).json({ error: 'name обязателен' });

  console.log(`\n📥 name="${name}" year="${year}"`);
  try {
    const { url, log } = await findIframe(name, year);
    log.forEach(l => console.log(l));

    if (url) return res.json({ iframeUrl: url, log });
    return res.status(404).json({ error: 'Плеер не найден', iframeUrl: null, log });
  } catch (e) {
    console.error('💥', e.message);
    return res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Порт ${PORT}`));
