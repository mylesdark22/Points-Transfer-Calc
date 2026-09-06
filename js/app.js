import { calculate, getMultiplier } from './calculator.js';

const formatter = new Intl.NumberFormat('en-US');

const els = {
  targetPoints: document.getElementById('target-points'),
  bonusPercent: document.getElementById('bonus-percent'),
  ratioSource: document.getElementById('ratio-source'),
  ratioDest: document.getElementById('ratio-dest'),
  resultValue: document.getElementById('result-value'),
  resultDetail: document.getElementById('result-detail'),
  toggleBtns: document.querySelectorAll('.toggle-btn'),
  bonusPanels: document.querySelectorAll('.bonus-panel'),
};

let bonusMode = 'percentage';

function parseNumber(value) {
  const cleaned = value.replace(/,/g, '').trim();
  if (cleaned === '') return null;
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatInputValue(input) {
  const raw = input.value.replace(/,/g, '');
  if (raw === '') return;

  const parts = raw.split('.');
  const intPart = parts[0].replace(/\D/g, '');
  if (intPart === '') {
    input.value = parts.length > 1 ? '.' + parts[1].replace(/\D/g, '') : '';
    return;
  }

  const formatted = formatter.format(Number(intPart));
  input.value = parts.length > 1 ? formatted + '.' + parts[1].replace(/\D/g, '') : formatted;
}

function setBonusMode(mode) {
  bonusMode = mode;

  els.toggleBtns.forEach((btn) => {
    const isActive = btn.dataset.mode === mode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-checked', String(isActive));
  });

  els.bonusPanels.forEach((panel) => {
    panel.classList.toggle('hidden', panel.dataset.panel !== mode);
  });

  recalculate();
}

function recalculate() {
  const target = parseNumber(els.targetPoints.value);

  if (!target || target <= 0) {
    els.resultValue.textContent = '—';
    els.resultDetail.textContent = 'Enter your target and bonus to calculate';
    return;
  }

  const multiplier = getMultiplier({
    mode: bonusMode,
    bonusPercent: parseNumber(els.bonusPercent.value),
    ratioSource: parseNumber(els.ratioSource.value),
    ratioDest: parseNumber(els.ratioDest.value),
  });

  if (multiplier == null) {
    els.resultValue.textContent = '—';
    els.resultDetail.textContent = 'Enter a valid transfer bonus';
    return;
  }

  const result = calculate({ target, multiplier });

  if (!result) {
    els.resultValue.textContent = '—';
    els.resultDetail.textContent = 'Enter your target and bonus to calculate';
    return;
  }

  els.resultValue.textContent = formatter.format(result.sourceNeeded);

  const received = formatter.format(Math.round(result.destinationReceived));
  const surplus = Math.round(result.surplus);

  if (surplus > 0) {
    els.resultDetail.textContent =
      `You'll receive ${received} partner points (${formatter.format(surplus)} surplus)`;
  } else {
    els.resultDetail.textContent = `You'll receive exactly ${received} partner points`;
  }
}

els.toggleBtns.forEach((btn) => {
  btn.addEventListener('click', () => setBonusMode(btn.dataset.mode));
});

[els.targetPoints, els.bonusPercent, els.ratioSource, els.ratioDest].forEach((input) => {
  input.addEventListener('input', () => {
    formatInputValue(input);
    recalculate();
  });
});

setBonusMode('percentage');
