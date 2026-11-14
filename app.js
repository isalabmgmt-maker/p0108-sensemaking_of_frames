const STORAGE = {
  respondentId: `${APP_CONFIG.storagePrefix}_respondentId`,
  assignment: `${APP_CONFIG.storagePrefix}_assignment`,
  answers: `${APP_CONFIG.storagePrefix}_answers`,
  completed: `${APP_CONFIG.storagePrefix}_completed`,
  startTime: `${APP_CONFIG.storagePrefix}_startTime`
};

const state = {
  currentPage: -1,
  respondentId: getOrCreateRespondentId(),
  conditionId: loadAssignment(),
  answers: loadAnswers(),
  isSubmitting: false
};

const screens = {
  cover: document.getElementById('cover-screen'),
  question: document.getElementById('question-screen'),
  finish: document.getElementById('finish-screen')
};

const el = {
  appTitle: document.getElementById('app-title'),
  appSubtitle: document.getElementById('app-subtitle'),
  researchNote: document.getElementById('research-note'),
  startBtn: document.getElementById('start-btn'),
  prevBtn: document.getElementById('prev-btn'),
  nextBtn: document.getElementById('next-btn'),
  header: document.getElementById('page-header'),
  list: document.getElementById('question-list'),
  progressWrap: document.getElementById('progress-bar-wrap'),
  progressFill: document.getElementById('progress-fill'),
  progressPageText: document.getElementById('progress-page-text'),
  progressPercentText: document.getElementById('progress-percent-text')
};

function getOrCreateRespondentId() {
  let id = localStorage.getItem(STORAGE.respondentId);
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `r_${Date.now()}_${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(STORAGE.respondentId, id);
  }
  return id;
}

function loadAssignment() {
  return localStorage.getItem(STORAGE.assignment) || '';
}

function saveAssignment(conditionId) {
  localStorage.setItem(STORAGE.assignment, conditionId);
  state.conditionId = conditionId;
}

function loadAnswers() {
  try { return JSON.parse(localStorage.getItem(STORAGE.answers)) || {}; }
  catch { return {}; }
}

function saveAnswers() {
  localStorage.setItem(STORAGE.answers, JSON.stringify(state.answers));
}

function markCompleted() {
  localStorage.setItem(STORAGE.completed, 'true');
}

function isCompleted() {
  return localStorage.getItem(STORAGE.completed) === 'true';
}

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[name].classList.add('active');
}

function getCurrentPage() {
  return SURVEY_PAGES[state.currentPage];
}

function startSurvey() {
  if (isCompleted()) return;
  if (!localStorage.getItem(STORAGE.startTime)) {
    localStorage.setItem(STORAGE.startTime, new Date().toISOString());
  }
  state.currentPage = 0;
  showScreen('question');
  renderCurrentPage();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderCurrentPage() {
  const page = getCurrentPage();
  renderHeader(page);
  renderQuestions(page);
  updateNav(page);
  updateProgress();
}

function renderHeader(page) {
  if (page.type === 'scenario') {
    const scenario = SCENARIOS[state.conditionId];
    el.header.innerHTML = `
      <section class="context-card">
        <div class="context-badge">${scenario?.label || state.conditionId}</div>
        <h2 class="context-title">${scenario?.title || '尚未取得情境'}</h2>
        <p class="context-text">${scenario?.description || '請檢查 scenarios.js 是否有這個情境代碼。'}</p>
      </section>
    `;
    return;
  }

  el.header.innerHTML = `
    <section class="context-card">
      <h2 class="context-title">${page.title || ''}</h2>
      ${page.description ? `<p class="context-text">${page.description}</p>` : ''}
    </section>
  `;
}

function renderQuestions(page) {
  if (!page.questions || page.questions.length === 0) {
    el.list.innerHTML = '';
    return;
  }

  el.list.innerHTML = page.questions.map((q, idx) => `
    <article class="question-card">
      <p class="question-text">${idx + 1}. ${q.text}</p>
      ${q.type === 'likert' ? renderLikert(q) : renderChoice(q)}
    </article>
  `).join('');

  el.list.querySelectorAll('[data-question-id][data-value]').forEach(button => {
    button.addEventListener('click', () => {
      const qid = button.dataset.questionId;
      const raw = button.dataset.value;
      const q = page.questions.find(item => item.id === qid);
      state.answers[qid] = q?.type === 'likert' ? Number(raw) : raw;
      saveAnswers();
      renderQuestions(page);
    });
  });
}

function renderLikert(q) {
  return `<div class="option-grid likert-grid">
    ${APP_CONFIG.likertLabels.map((label, idx) => {
      const value = idx + 1;
      const selected = Number(state.answers[q.id]) === value ? 'selected' : '';
      return `<button type="button" class="option-pill ${selected}" data-question-id="${q.id}" data-value="${value}">
        <span class="pill-number">${value}</span><span class="pill-label">${label}</span>
      </button>`;
    }).join('')}
  </div>`;
}

function renderChoice(q) {
  return `<div class="option-grid choice-grid">
    ${q.options.map(option => {
      const selected = state.answers[q.id] === option ? 'selected' : '';
      return `<button type="button" class="choice-card ${selected}" data-question-id="${q.id}" data-value="${option}">${option}</button>`;
    }).join('')}
  </div>`;
}

function validatePage(page) {
  if (!page.questions || page.questions.length === 0) return true;
  const missing = page.questions.filter(q => state.answers[q.id] === undefined || state.answers[q.id] === '');
  if (missing.length) {
    alert('這一頁還有題目沒有作答，請先填完再繼續。');
    return false;
  }
  return true;
}

function updateNav(page) {
  el.prevBtn.style.visibility = state.currentPage === 0 ? 'hidden' : 'visible';
  el.nextBtn.textContent = page.submitLabel || (state.currentPage === SURVEY_PAGES.length - 1 ? '送出問卷' : '下一頁');
  el.nextBtn.disabled = false;
}

function updateProgress() {
  const current = state.currentPage + 1;
  const total = SURVEY_PAGES.length;
  const percent = Math.round((current / total) * 100);
  el.progressPageText.textContent = `第 ${current} / ${total} 頁`;
  el.progressPercentText.textContent = `${percent}%`;
  el.progressFill.style.width = `${percent}%`;
}

async function nextPage() {
  const page = getCurrentPage();
  if (!validatePage(page)) return;

  if (page.type === 'consent' && !state.conditionId) {
    el.nextBtn.disabled = true;
    el.nextBtn.textContent = '分派情境中...';
    try {
      const assigned = await requestAssignment();
      saveAssignment(assigned.condition_id);
    } catch (error) {
      el.nextBtn.disabled = false;
      el.nextBtn.textContent = page.submitLabel || '下一頁';
      alert('情境分派失敗：' + error.message);
      return;
    }
  }

  if (state.currentPage < SURVEY_PAGES.length - 1) {
    state.currentPage += 1;
    renderCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  await submitSurvey();
}

function previousPage() {
  if (state.currentPage > 0) {
    state.currentPage -= 1;
    renderCurrentPage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

async function requestAssignment() {
  if (!APP_CONFIG.backend.enabled) return { condition_id: 'A' };
  const base = APP_CONFIG.backend.googleScriptUrl;
  if (!base || base.includes('PASTE_YOUR')) throw new Error('尚未設定 Google Apps Script Web App URL');

  const url = `${base}?action=assign&respondent_id=${encodeURIComponent(state.respondentId)}`;
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  if (result.status !== 'success') throw new Error(result.message || '後台沒有回傳成功狀態');
  return result;
}

async function submitSurvey() {
  if (state.isSubmitting) return;
  state.isSubmitting = true;
  el.nextBtn.disabled = true;
  el.nextBtn.textContent = '送出中...';

  try {
    const submittedAt = new Date();
    const startedAt = localStorage.getItem(STORAGE.startTime) || submittedAt.toISOString();
    const durationSeconds = Math.round((submittedAt.getTime() - new Date(startedAt).getTime()) / 1000);

    const payload = {
      respondent_id: state.respondentId,
      condition_id: state.conditionId,
      started_at: startedAt,
      submitted_at: submittedAt.toISOString(),
      duration_seconds: durationSeconds,
      answers: state.answers
    };

    if (APP_CONFIG.backend.enabled) {
      const response = await fetch(APP_CONFIG.backend.googleScriptUrl, {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      const text = await response.text();
      const result = JSON.parse(text);
      if (result.status !== 'success') throw new Error(result.message || '後台回傳失敗');
    }

    markCompleted();
    showScreen('finish');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error(error);
    alert('送出失敗：' + error.message);
    el.nextBtn.disabled = false;
    el.nextBtn.textContent = '重新送出';
    state.isSubmitting = false;
  }
}

function init() {
  el.appTitle.textContent = APP_CONFIG.appTitle;
  el.appSubtitle.textContent = APP_CONFIG.surveySubtitle;
  el.researchNote.textContent = APP_CONFIG.researchNote;

  if (isCompleted()) {
    el.startBtn.textContent = '已完成填答';
    el.startBtn.disabled = true;
  }

  el.startBtn.addEventListener('click', startSurvey);
  el.prevBtn.addEventListener('click', previousPage);
  el.nextBtn.addEventListener('click', nextPage);
}

init();
