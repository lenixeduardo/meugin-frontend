# 🍸 MeuGin — Frontend

PWA web do MeuGin. HTML + CSS + JS puro, sem build step.
Funciona 100% offline (dados no localStorage) ou conectado ao backend.

## Desenvolvimento local

```bash
# Opção 1 — abrir direto no browser
open index.html

# Opção 2 — servidor local (recomendado para testar PWA/SW)
npx serve .
```

## Conectar ao backend

Edite `index.html` e altere a linha:
```js
window.MEUGIN_API_URL = 'https://SEU_BACKEND.up.railway.app';
```

Ou configure a variável `API_URL` no GitHub Actions (Settings → Variables).

## Deploy no GitHub Pages

```bash
git init
git add .
git commit -m "MeuGin frontend"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/meugin-frontend.git
git push -u origin main
```

Depois em **Settings → Pages → Source → GitHub Actions**. ✅

## Instalar como app

**iPhone (Safari):** Compartilhar → Adicionar à Tela de Início

**Android (Chrome):** Banner automático ou menu → Instalar app

## Estrutura

```
frontend/
├── index.html      ← App completo (PWA, offline-first)
├── api.js          ← Camada de integração com o backend
├── manifest.json   ← Configuração PWA
├── sw.js           ← Service Worker (cache offline)
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml   ← Deploy automático no GitHub Pages
```
