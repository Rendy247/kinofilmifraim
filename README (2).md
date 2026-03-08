# KinoFilm Finder — Leapcell (БЕСПЛАТНО)

## Деплой на Leapcell — пошагово

### 1. Загрузи файлы на GitHub
Создай новый репозиторий, добавь 3 файла:
- `server.js`
- `package.json`  
- `build.sh`

### 2. Зайди на leapcell.io
- Войди через GitHub
- Нажми **New Service**
- Выбери свой репозиторий

### 3. Настройки сервиса:
| Поле | Значение |
|------|----------|
| **Runtime** | Node.js |
| **Build Command** | `sh build.sh` |
| **Start Command** | `npm run start` |
| **Port** | `8080` |

### 4. Deploy → готово!
Получишь URL типа: `https://abc123.leapcell.dev`

---

## API

```
GET https://abc123.leapcell.dev/iframe?name=Начало&year=2010
```

**Успех:**
```json
{ "iframeUrl": "https://variyt.ws/embed/abc123" }
```

**Не найдено:**
```json
{ "error": "Плеер не найден", "iframeUrl": null }
```

---

## Подключение в приложении (MAUI JavaScript)

В `SiteHtml` найди функцию `serverLoadMovie` и добавь в конец:

```javascript
// Автоматически ищем iframe если не нашёлся
if (!m.iframeUrl) {
  status.textContent = '🎬 Ищу плеер...';
  try {
    const fr = await fetch(
      `https://abc123.leapcell.dev/iframe?name=${encodeURIComponent(nameRu)}&year=${m.year || ''}`
    );
    const fd = await fr.json();
    if (fd.iframeUrl) {
      document.getElementById('f-iframe').value = fd.iframeUrl;
      status.textContent = '✅ Плеер найден!';
    } else {
      status.textContent = '⚠️ Плеер не найден — нажми 🎬 Найти плеер';
    }
  } catch {
    status.textContent = '⚠️ Сервер недоступен';
  }
}
```

---

## Почему Leapcell?

✅ Полностью бесплатно (до 20 проектов)  
✅ Поддерживает Playwright + Chromium нативно  
✅ Не засыпает (в отличие от Render)  
✅ Автодеплой при push в GitHub  
✅ Нет Docker — проще настраивать  
