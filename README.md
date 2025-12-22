# StudyInsight — IA para Aprendizagem Rápida  
**Encontre conteúdos, exemplos e exercícios para aprender qualquer tema em segundos.**

StudyInsight é uma aplicação leve construída durante a **Imersão Dev com Google Gemini (Alura)**.  
**Objetivo:** demonstrar HTML, CSS, JavaScript assíncrono, manipulação de DOM, base de conhecimento em JSON e ampliação com Node.js e IA.

---

## Demonstração rápida
- Busque um tema (ex.: `arrays em JS`, `HTML semântico`, `teste unitário`) e veja explicações, exemplos e exercícios.
- Front-end estático que consome `knowledge.json` localmente.
- Back-end opcional (`/api/search`) para integrar com APIs de IA (Gemini) — funciona em modo *mock* se não houver chave.

---

## Estrutura do Projeto

```bash
/
├─ index.html
├─ knowledge.json
├─ script.js
├─ style.css
├─ api/
│ ├─ gemini_stub.js
│ ├─ package.json
│ └─ server.js
├─ assets/
│ └─ cover.svg
├─ LICENSE
└─ README.md
```

---

## Como rodar localmente (modo front-end somente)

1. Clone o repositório:
```bash
git clone https://github.com/augusto-mate/studyinsight
cd studyinsight
```

2. Abra `index.html` no navegador (recomendado: usar Live Server do VS Code ou entorno local).

## Como rodar com backend Node (opcional — para IA)

1. Instale dependências:
```bash
cd api
npm install
```

2. Se tiver chave da API Gemini (opcional), defina:
```bash
export GEMINI_API_KEY="sua_chave_aqui"         # Linux/macOS
setx GEMINI_API_KEY "sua_chave_aqui"           # Windows (PowerShell)
```

3. Inicie o servidor:
```bash
node server.js
```

4. Abra `index.html` e altere `script.js` para apontar para `http://localhost:3000/api/search` (configuração já preparada).

> **Nota:** o servidor inclui fallback *mock* que gera respostas enriquecidas sem depender da API externa — ideal para apresentação sem conexões externas.

## Deploy

- **Front-end:** GitHub Pages (branch `main` / pasta raiz).
- **Back-end (opcional):** Render, Railway, Vercel (Node) — defina `GEMINI_API_KEY` nas variáveis de ambiente caso queira usar Gemini.

## Estrutura técnica

- HTML semântico para acessibilidade e SEO.
- CSS responsivo (mobile-first).
- JavaScript: fetch + async/await + manipulação de DOM (cards dinâmicos).
- Node.js/Express para endpoint `/api/search` com lógica de fallback.

## Licença

[MIT](LICENSE) — sinta-se à vontade para adaptar e compartilhar.

## Autor

| Nome | GitHub | Contacto |
|------|--------|----------|
| Augusto Mate | [@augusto-mate](https://github.com/augusto-mate) | mate.augusto.mz@gmail.com |
