/* ==========================================================================
   DIEGO ALEJANDRO ALEMÁN SALGUERA - PORTFOLIO INTERACTIVITY
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initTerminal();
  initCopyButtons();
  initMobileMenu();
  initSmoothScroll();
});

/* 1. TYPEWRITER EFFECT */
function initTypewriter() {
  const words = [
    'PHP & Web Developer',
    'Web Designer'
  ];

  const element = document.getElementById('typing-text');
  if (!element) return;

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* 2. INTERACTIVE MINI TERMINAL */
function initTerminal() {
  const input = document.getElementById('terminal-input');
  const body = document.getElementById('terminal-body');

  if (!input || !body) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = input.value.trim().toLowerCase();
      input.value = '';
      executeCommand(command, body);
    }
  });
}

function executeCommand(cmd, body) {
  const promptLine = document.createElement('div');
  promptLine.className = 'terminal-log';
  promptLine.innerHTML = `<span class="terminal-path">diego@portfolio</span>:<span class="terminal-char">~$</span> ${escapeHTML(cmd)}`;
  body.insertBefore(promptLine, document.getElementById('terminal-prompt-line'));

  let responseHTML = '';

  switch (cmd) {
    case 'help':
      responseHTML = `
        <div style="color: var(--accent-amber); margin-bottom: 0.5rem;">Comandos disponibles:</div>
        <div>  <span class="highlight">whoami</span>   - Ver perfil e información de Diego</div>
        <div>  <span class="highlight">skills</span>   - Listar lenguajes y tecnologías clave</div>
        <div>  <span class="highlight">crm</span>      - Información del Sistema CRM activo</div>
        <div>  <span class="highlight">projects</span> - Ver lista de sitios web activos</div>
        <div>  <span class="highlight">contact</span>  - Datos de contacto directo</div>
        <div>  <span class="highlight">github</span>   - Ir al perfil de GitHub</div>
        <div>  <span class="highlight">clear</span>    - Limpiar consola</div>
      `;
      break;

    case 'projects':
      responseHTML = `
        <div style="color: var(--accent-cyan); font-weight: bold;">Sitios Web Activos & Proyectos:</div>
        <div>• Mariachi Angels de TX: <span class="highlight">mariachiangelsdetx.com</span></div>
        <div>• Reinfallen: <span class="highlight">reinfallen.com</span></div>
        <div>• Maggie's Cleaning Services VA: <span class="highlight">maggiescleaningservicesva.com</span></div>
        <div>• JLM NC: <span class="highlight">jlmnc.com</span></div>
        <div>• Domingo Locksmith: <span class="highlight">domingolocksmith.com</span></div>
      `;
      break;

    case 'whoami':
      responseHTML = `
        <div style="color: var(--accent-emerald);">Diego Alejandro Alemán Salguera</div>
        <div>Web Developer con 1 año de experiencia continua en desarrollo a medida, WordPress y arquitectura de CRM. Nivel de inglés avanzado.</div>
      `;
      break;

    case 'skills':
      responseHTML = `
        <div style="color: var(--accent-cyan);">Tech Stack Principal:</div>
        <div>• PHP | JavaScript (ES6+) | WordPress | HTML5 & CSS3</div>
        <div>• MySQL | Git / GitHub | UI/UX Web Design | Custom Web Apps</div>
      `;
      break;

    case 'crm':
      responseHTML = `
        <div style="color: var(--accent-emerald); font-weight: bold;">⚡ Enterprise CRM System (LIVE)</div>
        <div>Sistema completo de gestión empresarial actualmente en producción y en uso activo por usuarios reales.</div>
      `;
      break;

    case 'contact':
      responseHTML = `
        <div> Email: <span class="highlight">diegoaleman584@gmail.com</span></div>
        <div> Teléfono / WhatsApp: <span class="highlight">77065606</span></div>
        <div> GitHub: <span class="highlight">daas100205</span></div>
      `;
      break;

    case 'github':
      window.open('https://github.com/daas100205', '_blank');
      responseHTML = `<div>Abriendo perfil de GitHub <span class="highlight">@daas100205</span>...</div>`;
      break;

    case 'clear':
      const logs = body.querySelectorAll('.terminal-log');
      logs.forEach(log => log.remove());
      return;

    case '':
      return;

    default:
      responseHTML = `<div style="color: var(--accent-rose);">Comando no reconocido: '${escapeHTML(cmd)}'. Escribe <span class="highlight">'help'</span> para ver la lista.</div>`;
  }

  const responseDiv = document.createElement('div');
  responseDiv.className = 'terminal-log';
  responseDiv.innerHTML = responseHTML;
  body.insertBefore(responseDiv, document.getElementById('terminal-prompt-line'));

  body.scrollTop = body.scrollHeight;
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g,
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}

/* 3. COPY TO CLIPBOARD & TOAST NOTIFICATION */
function initCopyButtons() {
  window.copyToClipboard = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(` ${label} copiado al portapapeles`);
    }).catch(err => {
      showToast(` Copiado: ${text}`);
    });
  };
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

/* 4. MOBILE MENU */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const isActive = navLinks.classList.toggle('active');
      const icon = toggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.className = 'fa-solid fa-xmark';
        } else {
          icon.className = 'fa-solid fa-bars';
        }
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-bars';
        }
      });
    });
  }
}

/* 5. SMOOTH SCROLL & ACTIVE SECTION HIGHLIGHTING */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
