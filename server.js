const express = require('express');
const { chromium } = require('playwright-core');

const app = express();
const PORT = process.env.PORT || 8080;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

const MIRRORS = [
  'https://hd.lordfilm-tre.ru',
  'https://nc.lordfilm133.ru',
  'https://lordfilm.rs',
];

const PLAYER_DOMAINS = [
  'variyt.ws', 'kodik', 'alloha', 'videoframe',
  'sibnet', 'collaps', 'cdnmovies', 'bazon', 'hdvb',
  'videoseed', 'voidboost', 'streamguard', 'kinescope'
];

function isPlayer(url) {
  return PLAYER_DOMAINS.some(d => url.includes(d));
}

async function findIframe(name, year) {
  const query = year ? `${name} ${year}` : name;
  console.log(`🔍 Ищу: "${query}"`);

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

  // Перехватываем сетевые запросы
  page.on('request', req => {
    const url = req.url();
    if (!capturedUrl && isPlayer(url)) {
      capturedUrl = url;
      console.log('🎯 Сеть:', url);
    }
  });

  try {
    for (const mirror of MIRRORS) {
      if (capturedUrl) break;
      console.log(`🌐 ${mirror}`);

      try {
        await page.goto(
          `${mirror}/?do=search&subaction=search&story=${encodeURIComponent(query)}`,
          { waitUntil: 'domcontentloaded', timeout: 20000 }
        );
        await page.waitForTimeout(1500);

        // Кликаем первый результат
        const selectors = ['.th-item a', '.short a', '.film-item a', '.th a', 'h2 a'];
        let clicked = false;
        for (const sel of selectors) {
          try {
            const el = page.locator(sel).first();
            if (await el.isVisible({ timeout: 2000 })) {
              await el.click();
              clicked = true;
              console.log(`✅ Клик: ${sel}`);
              break;
            }
          } catch {}
        }
        if (!clicked) { console.log('⚠️ Нет результатов'); continue; }

        await page.waitForLoadState('domcontentloaded').catch(() => {});
        await page.waitForTimeout(3000);

        // Ищем iframe в DOM
        if (!capturedUrl) {
          capturedUrl = await page.evaluate((domains) => {
            for (const f of document.querySelectorAll('iframe')) {
              const src = f.src || f.getAttribute('src') || '';
              if (src && src !== 'about:blank' && domains.some(d => src.includes(d))) return src;
            }
            // Ищем в тексте скриптов
            for (const s of document.querySelectorAll('script')) {
              const t = s.textContent || '';
              for (const d of domains) {
                const i = t.indexOf(d);
                if (i > -1) {
                  const start = t.lastIndexOf('"', i);
                  const end = t.indexOf('"', i);
                  if (start > -1 && end > -1) {
                    const u = t.slice(start + 1, end);
                    if (u.startsWith('http') || u.startsWith('//')) {
                      return u.startsWith('//') ? 'https:' + u : u;
                    }
                  }
                }
              }
            }
            return null;
          }, PLAYER_DOMAINS);

          if (capturedUrl) console.log('✅ DOM:', capturedUrl);
        }

        // Ещё подождём
        if (!capturedUrl) {
          await page.waitForTimeout(4000);
          capturedUrl = await page.evaluate((domains) => {
            for (const f of document.querySelectorAll('iframe')) {
              const src = f.src || f.getAttribute('src') || '';
              if (src && src !== 'about:blank' && domains.some(d => src.includes(d))) return src;
            }
            return null;
          }, PLAYER_DOMAINS);
        }

        if (capturedUrl) break;

      } catch (e) {
        console.log('⚠️', e.message.split('\n')[0]);
      }
    }
  } finally {
    await browser.close();
  }

  return capturedUrl || null;
}

// ─── Routes ─────────────────────────────────────────────────────────────────

app.get('/', (req, res) => {
  res.json({ ok: true, service: 'KinoFilm iframe finder', usage: '/iframe?name=Начало&year=2010' });
});

// GET /iframe?name=Начало&year=2010
app.get('/iframe', async (req, res) => {
  const name = (req.query.name || '').trim();
  const year = (req.query.year || '').trim();
  if (!name) return res.status(400).json({ error: 'Параметр name обязателен' });

  console.log(`\n📥 name="${name}" year="${year}"`);
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
