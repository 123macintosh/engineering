/* ===== AQA GCSE Engineering Revision Site — Main JS ===== */

// ===== SIDEBAR TOGGLE =====
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) sidebar.classList.toggle('open');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
  const sidebar = document.querySelector('.sidebar');
  const hamburger = document.querySelector('.hamburger');
  if (sidebar && hamburger && !sidebar.contains(e.target) && !hamburger.contains(e.target)) {
    sidebar.classList.remove('open');
  }
});

// ===== ACTIVE SIDEBAR LINK =====
function setActiveSidebarLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href.endsWith(currentPage))) {
      link.classList.add('active');
    }
  });
}

// ===== FILL IN THE GAPS =====
function initFillInGaps() {
  document.querySelectorAll('.fitg-container').forEach(container => {
    const checkBtn = container.querySelector('.fitg-check-btn');
    const revealBtn = container.querySelector('.fitg-reveal-btn');
    const resetBtn = container.querySelector('.fitg-reset-btn');
    const inputs = container.querySelectorAll('.fitg-input');
    const resultDiv = container.querySelector('.fitg-result');
    const wordChips = container.querySelectorAll('.word-chip');

    // Word chip click to fill focused input
    wordChips.forEach(chip => {
      chip.addEventListener('click', function() {
        const focused = container.querySelector('.fitg-input:focus');
        if (focused && !focused.value) {
          focused.value = chip.dataset.word;
          chip.classList.add('used');
        }
      });
    });

    // Check answers
    if (checkBtn) {
      checkBtn.addEventListener('click', function() {
        let correct = 0;
        inputs.forEach(input => {
          const answer = input.dataset.answer.toLowerCase().trim();
          const userAnswer = input.value.toLowerCase().trim();
          input.classList.remove('correct', 'incorrect');
          if (userAnswer === answer || (input.dataset.alt && input.dataset.alt.toLowerCase().split('|').includes(userAnswer))) {
            input.classList.add('correct');
            correct++;
          } else if (userAnswer) {
            input.classList.add('incorrect');
          }
        });
        if (resultDiv) {
          resultDiv.classList.remove('show', 'success', 'partial', 'fail');
          const pct = Math.round((correct / inputs.length) * 100);
          if (pct === 100) {
            resultDiv.className = 'fitg-result show success';
            resultDiv.textContent = `✓ Perfect! ${correct}/${inputs.length} correct. Excellent work!`;
          } else if (pct >= 50) {
            resultDiv.className = 'fitg-result show partial';
            resultDiv.textContent = `${correct}/${inputs.length} correct (${pct}%). Keep revising the highlighted ones.`;
          } else {
            resultDiv.className = 'fitg-result show fail';
            resultDiv.textContent = `${correct}/${inputs.length} correct (${pct}%). Review the lesson content and try again.`;
          }
        }
      });
    }

    // Reveal all answers
    if (revealBtn) {
      revealBtn.addEventListener('click', function() {
        inputs.forEach(input => {
          input.value = input.dataset.answer;
          input.classList.remove('correct', 'incorrect');
          input.classList.add('revealed');
        });
        wordChips.forEach(chip => chip.classList.add('used'));
        if (resultDiv) {
          resultDiv.className = 'fitg-result show partial';
          resultDiv.textContent = 'Answers revealed. Study them carefully, then reset and try again!';
        }
      });
    }

    // Reset
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        inputs.forEach(input => {
          input.value = '';
          input.classList.remove('correct', 'incorrect', 'revealed');
        });
        wordChips.forEach(chip => chip.classList.remove('used'));
        if (resultDiv) {
          resultDiv.classList.remove('show');
          resultDiv.textContent = '';
        }
      });
    }
  });
}

// ===== MULTIPLE CHOICE QUIZ =====
function initQuizzes() {
  document.querySelectorAll('.quiz-container').forEach(container => {
    const questions = container.querySelectorAll('.quiz-question-block');
    const submitBtn = container.querySelector('.quiz-submit-btn');
    const resetBtn = container.querySelector('.quiz-reset-btn');
    const scoreDisplay = container.querySelector('.quiz-score-display');

    // Option selection
    container.querySelectorAll('.quiz-options').forEach(optGroup => {
      optGroup.querySelectorAll('.quiz-option').forEach(opt => {
        opt.addEventListener('click', function() {
          if (opt.classList.contains('correct') || opt.classList.contains('wrong')) return;
          optGroup.querySelectorAll('.quiz-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
        });
      });
    });

    // Submit quiz
    if (submitBtn) {
      submitBtn.addEventListener('click', function() {
        let score = 0;
        let answered = 0;
        questions.forEach(qBlock => {
          const options = qBlock.querySelectorAll('.quiz-option');
          const feedback = qBlock.querySelector('.quiz-feedback');
          const selected = qBlock.querySelector('.quiz-option.selected');
          if (selected) {
            answered++;
            const isCorrect = selected.dataset.correct === 'true';
            options.forEach(opt => {
              if (opt.dataset.correct === 'true') opt.classList.add('correct');
              else if (opt.classList.contains('selected')) opt.classList.add('wrong');
            });
            if (isCorrect) {
              score++;
              if (feedback) {
                feedback.className = 'quiz-feedback show correct-fb';
              }
            } else {
              if (feedback) {
                feedback.className = 'quiz-feedback show wrong-fb';
              }
            }
            if (feedback) feedback.style.display = 'block';
          }
        });
        if (scoreDisplay) {
          const pct = Math.round((score / questions.length) * 100);
          scoreDisplay.querySelector('.quiz-score-num').textContent = `${score}/${questions.length}`;
          scoreDisplay.querySelector('.quiz-score-label').textContent = `${pct}% — ${pct >= 80 ? 'Excellent! 🎉' : pct >= 60 ? 'Good effort! Keep revising.' : 'Keep practising — review the lesson.'}`;
          scoreDisplay.classList.add('show');
        }
        submitBtn.disabled = true;
      });
    }

    // Reset quiz
    if (resetBtn) {
      resetBtn.addEventListener('click', function() {
        container.querySelectorAll('.quiz-option').forEach(opt => {
          opt.classList.remove('selected', 'correct', 'wrong');
        });
        container.querySelectorAll('.quiz-feedback').forEach(fb => {
          fb.classList.remove('show');
          fb.style.display = '';
        });
        if (scoreDisplay) scoreDisplay.classList.remove('show');
        if (submitBtn) submitBtn.disabled = false;
      });
    }
  });
}

// ===== PAST PAPER REVEAL =====
function initPastPapers() {
  document.querySelectorAll('.ppq-reveal-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const modelAnswer = btn.nextElementSibling;
      if (modelAnswer && modelAnswer.classList.contains('ppq-model-answer')) {
        modelAnswer.classList.toggle('show');
        btn.textContent = modelAnswer.classList.contains('show')
          ? '▲ HIDE MODEL ANSWER'
          : '▼ REVEAL MODEL ANSWER & EXAMINER TIPS';
      }
    });
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== PROGRESS TRACKING (localStorage) =====
function initProgress() {
  const pageId = window.location.pathname.split('/').pop().replace('.html', '');
  if (pageId && pageId !== 'index') {
    const visited = JSON.parse(localStorage.getItem('aqa_visited') || '[]');
    if (!visited.includes(pageId)) {
      visited.push(pageId);
      localStorage.setItem('aqa_visited', JSON.stringify(visited));
    }
    updateProgressBars(visited);
  }
}

function updateProgressBars(visited) {
  const total = 6; // 6 lesson pages
  const pct = Math.round((visited.length / total) * 100);
  document.querySelectorAll('.topbar-progress-fill').forEach(bar => {
    bar.style.width = pct + '%';
  });
}

// ===== TOOLTIP HOVER =====
function initTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(el => {
    el.style.cursor = 'help';
    el.style.borderBottom = '1px dashed var(--accent)';
    el.addEventListener('mouseenter', function(e) {
      const tip = document.createElement('div');
      tip.className = 'tooltip-popup';
      tip.textContent = el.dataset.tooltip;
      tip.style.cssText = `
        position: fixed;
        background: var(--surface2);
        border: 1px solid var(--border);
        color: var(--text);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 12px;
        max-width: 240px;
        z-index: 9999;
        pointer-events: none;
        font-family: 'Barlow', sans-serif;
        box-shadow: 0 4px 16px rgba(0,0,0,0.5);
      `;
      document.body.appendChild(tip);
      const rect = el.getBoundingClientRect();
      tip.style.top = (rect.bottom + 8) + 'px';
      tip.style.left = Math.min(rect.left, window.innerWidth - 260) + 'px';
      el._tooltip = tip;
    });
    el.addEventListener('mouseleave', function() {
      if (el._tooltip) { el._tooltip.remove(); el._tooltip = null; }
    });
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', function() {
  setActiveSidebarLink();
  initFillInGaps();
  initQuizzes();
  initPastPapers();
  initSmoothScroll();
  initProgress();
  initTooltips();
});
