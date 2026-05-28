/* ===== Shared Navigation Component ===== */
const NAV_HTML = `
<div class="sidebar-logo">
  <div class="sidebar-logo-icon">AQA</div>
  <div class="sidebar-logo-text">
    <strong>GCSE Engineering</strong>
    8852 · Written Paper Revision
  </div>
</div>
<nav class="sidebar-nav">
  <div class="sidebar-section-head">Home</div>
  <a href="../index.html" class="sidebar-link">
    <span class="link-icon">🏠</span> Dashboard
  </a>
  <a href="../exams/exam-practice.html" class="sidebar-link red-link">
    <span class="link-icon">📝</span> Exam Practice
    <span class="link-badge">NEW</span>
  </a>

  <div class="sidebar-section-head">Section 3.1</div>
  <a href="../lessons/1-materials.html" class="sidebar-link">
    <span class="link-icon">⚙️</span> Engineering Materials
  </a>

  <div class="sidebar-section-head">Section 3.2</div>
  <a href="../lessons/2-manufacturing.html" class="sidebar-link green-link">
    <span class="link-icon">🏭</span> Manufacturing Processes
  </a>

  <div class="sidebar-section-head">Section 3.3</div>
  <a href="../lessons/3-systems.html" class="sidebar-link red-link">
    <span class="link-icon">🔌</span> Systems
  </a>

  <div class="sidebar-section-head">Section 3.4</div>
  <a href="../lessons/4-testing.html" class="sidebar-link blue-link">
    <span class="link-icon">🔬</span> Testing & Investigation
  </a>

  <div class="sidebar-section-head">Section 3.5</div>
  <a href="../lessons/5-modern-tech.html" class="sidebar-link purple-link">
    <span class="link-icon">💡</span> Modern Technologies
  </a>

  <div class="sidebar-section-head">Section 3.6</div>
  <a href="../lessons/6-practical-maths.html" class="sidebar-link">
    <span class="link-icon">📐</span> Practical Skills & Maths
  </a>
</nav>
`;

const NAV_HTML_ROOT = `
<div class="sidebar-logo">
  <div class="sidebar-logo-icon">AQA</div>
  <div class="sidebar-logo-text">
    <strong>GCSE Engineering</strong>
    8852 · Written Paper Revision
  </div>
</div>
<nav class="sidebar-nav">
  <div class="sidebar-section-head">Home</div>
  <a href="index.html" class="sidebar-link">
    <span class="link-icon">🏠</span> Dashboard
  </a>
  <a href="exams/exam-practice.html" class="sidebar-link red-link">
    <span class="link-icon">📝</span> Exam Practice
    <span class="link-badge">NEW</span>
  </a>

  <div class="sidebar-section-head">Section 3.1</div>
  <a href="lessons/1-materials.html" class="sidebar-link">
    <span class="link-icon">⚙️</span> Engineering Materials
  </a>

  <div class="sidebar-section-head">Section 3.2</div>
  <a href="lessons/2-manufacturing.html" class="sidebar-link green-link">
    <span class="link-icon">🏭</span> Manufacturing Processes
  </a>

  <div class="sidebar-section-head">Section 3.3</div>
  <a href="lessons/3-systems.html" class="sidebar-link red-link">
    <span class="link-icon">🔌</span> Systems
  </a>

  <div class="sidebar-section-head">Section 3.4</div>
  <a href="lessons/4-testing.html" class="sidebar-link blue-link">
    <span class="link-icon">🔬</span> Testing & Investigation
  </a>

  <div class="sidebar-section-head">Section 3.5</div>
  <a href="lessons/5-modern-tech.html" class="sidebar-link purple-link">
    <span class="link-icon">💡</span> Modern Technologies
  </a>

  <div class="sidebar-section-head">Section 3.6</div>
  <a href="lessons/6-practical-maths.html" class="sidebar-link">
    <span class="link-icon">📐</span> Practical Skills & Maths
  </a>
</nav>
`;

document.addEventListener('DOMContentLoaded', function() {
  const sidebarEl = document.querySelector('.sidebar');
  if (sidebarEl) {
    const isRoot = window.location.pathname.includes('/lessons/') === false && 
                   window.location.pathname.includes('/exams/') === false;
    sidebarEl.innerHTML = isRoot ? NAV_HTML_ROOT : NAV_HTML;
    // Re-run active link detection after injecting nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    sidebarEl.querySelectorAll('.sidebar-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith(currentPage)) link.classList.add('active');
    });
  }
});
