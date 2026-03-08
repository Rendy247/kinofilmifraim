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
  // Точно как в C# боте
  const query = year ? `${name} ${year}` : name;
  console.log(`\n🔍 Ищу: "${query}"`);

  const browser = await chromium.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--single-process',
      '--disable-web-security',
    ]
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
      console.log('🎯 Перехвачен через сеть:', url);
    }
  });

  try {
    // Шаг 1: открываем главную (как C#: GotoAsync("https://nc.lordfilm133.ru/"))
    console.log('🌐 Открываю nc.lordfilm133.ru...');
    await page.goto('https://nc.lordfilm133.ru/', {
      waitUntil: 'domcontentloaded',
      timeout: 25000
    });

    // Шаг 2: ждём поле поиска (как C#: WaitForSelectorAsync("#story"))
    await page.waitForSelector('#story', { timeout: 10000 });
    console.log('✅ Поле поиска #story найдено');

    // Шаг 3: вводим текст и Enter (как C#: FillAsync + PressAsync)
    await page.fill('#story', query);
    await page.press('#story', 'Enter');
    console.log(`✅ Ввёл: "${query}"`);

    // Шаг 4: ждём результаты (как C#: WaitForSelectorAsync(".th-item"))
    await page.waitForSelector('.th-item', { timeout: 10000 });
    console.log('✅ .th-item найден');

    // Шаг 5: кликаем первый (как C#: Locator(".th-item").First.ClickAsync())
    await page.locator('.th-item').first().click();
    console.log('✅ Клик на первый результат');

    // Шаг 6: ждём iframe (как C#: WaitForSelectorAsync("iframe"))
    await page.waitForSelector('iframe', { timeout: 15000 });

    // Шаг 7: берём src (как C#: GetAttributeAsync("iframe", "src"))
    const src = await page.getAttribute('iframe', 'src');
    console.log('📺 iframe src:', src);

    if (src && src !== 'about:blank' && src !== '') {
      capturedUrl = src.startsWith('http') ? src : 'https:' + src;
    }

    // Если пустой — ищем среди всех iframe
    if (!capturedUrl) {
      await page.waitForTimeout(3000);
      capturedUrl = await page.evaluate((domains) => {
        for (const f of document.querySelectorAll('iframe')) {
          const s = f.src || f.getAttribute('src') || '';
          if (s && s !== 'about:blank') {
            if (domains.some(d => s.includes(d)) || s.includes('embed') || s.includes('player')) {
              return s.startsWith('//') ? 'https:' + s : s;
            }
          }
        }
        return null;
      }, PLAYER_DOMAINS);
    }

  } catch (e) {
    console.log('⚠️ Ошибка:', e.message.split('\n')[0]);
  } finally {
    await browser.close();
  }

  console.log(capturedUrl ? `✅ Результат: ${capturedUrl}` : '❌ Не найдено');
  return capturedUrl || null;
}

// Routes
app.get('/', (req, res) => {
  res.json({ ok: true, usage: '/iframe?name=Аватар&year=2009' });
});

app.get('/iframe', async (req, res) => {
  const name = (req.query.name || '').trim();
  const year = (req.query.year || '').trim();
  if (!name) return res.status(400).json({ error: 'name обязателен' });

  try {
    const url = await findIframe(name, year);
    if (url) return res.json({ iframeUrl: url });
    return res.status(404).json({ error: 'Плеер не найден', iframeUrl: null });
  } catch (e) {
    console.error('💥', e.message);
    return res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log(`🚀 Порт ${PORT}`));
