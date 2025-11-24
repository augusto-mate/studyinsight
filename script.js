// script.js — StudyInsight

// ===== Fix: limpar busca e resultados ao recarregar a página =====
window.addEventListener("load", () => {
  const q = document.getElementById("query");
  const r = document.getElementById("results");
  const d = document.getElementById("details");

  if (q) q.value = "";
  if (r) r.innerHTML = "";
  if (d) d.classList.add("hidden");
});

// ===== Original =====
const btn = document.getElementById('btn-search');
const queryEl = document.getElementById('query');
const results = document.getElementById('results');
const details = document.getElementById('details');
const detailsContent = document.getElementById('details-content');
const closeBtn = document.getElementById('close-details');

const API_ENDPOINT = '/api/search'; // se rodar apenas front, o fetch cairá em erro — fallback tratado

btn.addEventListener('click', () => runSearch(queryEl.value));
queryEl.addEventListener('keypress', (e) => { if (e.key === 'Enter') runSearch(queryEl.value) });
closeBtn && closeBtn.addEventListener('click', () => details.classList.add('hidden'));

async function runSearch(q) {
  const qtrim = (q || '').trim();
  results.innerHTML = '';
  if (!qtrim) {
    results.innerHTML = `<p style="color:#9aa7bf">Digite um termo para buscar</p>`;
    return;
  }
  // 1) tenta backend (se existir)
  try {
    const resp = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({query: qtrim})
    });
    if (resp.ok) {
      const data = await resp.json();
      renderResults(data.items || []);
      return;
    }
  } catch (e) {
    // fallback para busca local
    // console.warn('Backend unavailable, using local knowledge.');
  }

  // 2) busca local em knowledge.json
  try {
    const k = await fetch('knowledge.json').then(r=>r.json());
    const items = localSearch(k, qtrim);
    renderResults(items);
  } catch (err) {
    results.innerHTML = `<p style="color:#ff8b8b">Erro ao carregar base local.</p>`;
  }
}

function localSearch(k, q) {
  const ql = q.toLowerCase();
  const scored = k.map(item => {
    const text = (item.title + ' ' + item.tags.join(' ') + ' ' + item.content).toLowerCase();
    // score simples: presença & index
    const score = (text.includes(ql) ? 2 : 0) + (item.title.toLowerCase().startsWith(ql) ? 1 : 0);
    return {...item, score};
  }).filter(i=>i.score>0).sort((a,b)=>b.score - a.score);
  return scored.length ? scored : k.slice(0,6); // se nada bateu, mostra primeiros
}

function renderResults(items) {
  if (!items || items.length === 0) {
    results.innerHTML = `<p style="color:#9aa7bf">Nenhum resultado encontrado.</p>`;
    return;
  }
  results.innerHTML = '';
  items.forEach(it => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>${escapeHtml(it.title)}</h3>
      <p>${escapeHtml(it.description || (it.content.substring(0,120) + '...'))}</p>
      <div class="tags">${(it.tags||[]).slice(0,4).map(t=>`<span class="tag">${escapeHtml(t)}</span>`).join('')}</div>
    `;
    div.addEventListener('click', ()=> showDetails(it));
    results.appendChild(div);
  });
}

function showDetails(it) {
  detailsContent.innerHTML = `
    <div class="modal">
      <h2>${escapeHtml(it.title)}</h2>
      <p style="color:#9aa7bf">${escapeHtml(it.description || '')}</p>
      <pre style="white-space:pre-wrap;background:#07122a;padding:12px;border-radius:8px;border:1px solid rgba(255,255,255,0.03)">${escapeHtml(it.content)}</pre>
      ${it.examples ? `<h3>Exemplos</h3><pre style="white-space:pre-wrap">${escapeHtml(it.examples)}</pre>` : ''}
      ${it.exercises ? `<h3>Exercícios</h3><pre style="white-space:pre-wrap">${escapeHtml(it.exercises)}</pre>` : ''}
    </div>
  `;
  details.classList.remove('hidden');
}

function escapeHtml(s='') {
  return String(s).replace(/[&<>"']/g, function(m){ 
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); 
  });
}
