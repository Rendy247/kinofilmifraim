#!/bin/sh
# Устанавливаем Playwright + Chromium (именно так требует Leapcell)
npx -y playwright@1.50.1 install --with-deps chromium
# Устанавливаем зависимости проекта
npm install
