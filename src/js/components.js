// =============================================================================
// BROADCASTING UI KIT // INTERACTIVE COMPONENT CONTROLLERS
// =============================================================================

import { soundFx } from './audio-fx.js';

export function initInteractiveComponents() {
  // Attach tactile audio feedback to all buttons, switches, and tabs
  document.addEventListener('click', (e) => {
    const clickable = e.target.closest('button, .cyber-switch, .cyber-tabs__item, a, .stream-card, .btn-player-control');
    if (clickable) {
      if (clickable.classList.contains('cyber-switch') || clickable.querySelector('input[type="checkbox"]')) {
        soundFx.switch();
      } else {
        soundFx.click();
      }
    }
  });

  document.addEventListener('mouseover', (e) => {
    const hoverable = e.target.closest('.btn-cyber, .btn-icon-hud, .stream-card, .cyber-tabs__item');
    if (hoverable && !hoverable.dataset.hovered) {
      soundFx.hover();
    }
  });

  // ---------------------------------------------------------------------------
  // 1. Dropdown Menus
  // ---------------------------------------------------------------------------
  document.querySelectorAll('[data-dropdown-toggle]').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const parent = toggle.closest('.cyber-dropdown');
      if (!parent) return;
      const menu = parent.querySelector('.cyber-dropdown__menu');
      const isOpen = menu.classList.contains('is-open');

      // Close all other open dropdowns
      document.querySelectorAll('.cyber-dropdown__menu.is-open').forEach(m => m.classList.remove('is-open'));

      if (!isOpen && menu) {
        menu.classList.add('is-open');
      }
    });
  });

  // Close dropdowns when clicking outside or pressing Escape
  document.addEventListener('click', () => {
    document.querySelectorAll('.cyber-dropdown__menu.is-open').forEach(menu => {
      menu.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.cyber-dropdown__menu.is-open').forEach(m => m.classList.remove('is-open'));
      document.querySelectorAll('.cyber-modal-backdrop.is-open').forEach(m => m.classList.remove('is-open'));
    }
  });

  // ---------------------------------------------------------------------------
  // 2. Modals
  // ---------------------------------------------------------------------------
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('is-open');
        soundFx.alert();
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.cyber-modal-backdrop');
      if (modal) {
        modal.classList.remove('is-open');
      }
    });
  });

  document.querySelectorAll('.cyber-modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('is-open');
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 3. Tab Switching
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.cyber-tabs').forEach(tabGroup => {
    const tabs = tabGroup.querySelectorAll('.cyber-tabs__item');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        const targetId = tab.getAttribute('data-tab-target');
        if (targetId) {
          const container = tabGroup.closest('[data-tabs-container]') || document;
          container.querySelectorAll('[data-tab-content]').forEach(content => {
            if (content.getAttribute('data-tab-content') === targetId) {
              content.style.display = 'block';
            } else {
              content.style.display = 'none';
            }
          });
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // 4. Stream Key Reveal & Copy
  // ---------------------------------------------------------------------------
  document.querySelectorAll('[data-stream-key-wrapper]').forEach(wrapper => {
    const input = wrapper.querySelector('input');
    const toggleBtn = wrapper.querySelector('[data-key-toggle]');
    const copyBtn = wrapper.querySelector('[data-key-copy]');

    if (toggleBtn && input) {
      toggleBtn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? 'HIDE' : 'SHOW';
      });
    }

    if (copyBtn && input) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(input.value).then(() => {
          showToast('STREAM KEY COPIED TO CLIPBOARD', 'success');
        });
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 5. Code Copy Buttons (HTML & Blazor)
  // ---------------------------------------------------------------------------
  document.querySelectorAll('[data-copy-code]').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSnippetId = btn.getAttribute('data-copy-code');
      const snippetEl = document.getElementById(targetSnippetId);
      if (snippetEl) {
        const codeText = snippetEl.textContent.trim();
        navigator.clipboard.writeText(codeText).then(() => {
          showToast('CODE SNIPPET COPIED', 'success');
          const originalText = btn.textContent;
          btn.textContent = 'COPIED!';
          setTimeout(() => { btn.textContent = originalText; }, 1600);
        });
      }
    });
  });

  // ---------------------------------------------------------------------------
  // 6. Range Sliders live readout
  // ---------------------------------------------------------------------------
  document.querySelectorAll('.cyber-slider').forEach(slider => {
    const valueDisplay = slider.parentElement?.querySelector('.slider-value');
    if (valueDisplay) {
      slider.addEventListener('input', () => {
        valueDisplay.textContent = slider.value + (slider.dataset.unit || '');
      });
    }
  });

  // ---------------------------------------------------------------------------
  // 7. Real-Time VU Meter Simulation
  // ---------------------------------------------------------------------------
  startVuMeterSimulation();

  // ---------------------------------------------------------------------------
  // 8. Simulated Live Chat Message Generator
  // ---------------------------------------------------------------------------
  startChatSimulation();
}

// -----------------------------------------------------------------------------
// Toast Notification System
// -----------------------------------------------------------------------------
export function showToast(message, type = 'info') {
  let toastContainer = document.getElementById('cyber-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'cyber-toast-container';
    toastContainer.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 10px;
      pointer-events: none;
    `;
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `cyber-alert cyber-alert--${type}`;
  toast.style.cssText = `
    min-width: 280px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.8);
    pointer-events: auto;
    animation: cyber-toast-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  `;
  toast.innerHTML = `
    <div class="cyber-alert__content">
      <span class="alert-title">// TELEMETRY ALERT</span>
      <span class="alert-desc">${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);
  soundFx.alert();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'opacity 0.2s, transform 0.2s';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// -----------------------------------------------------------------------------
// VU Meter Real-Time Telemetry Simulation
// -----------------------------------------------------------------------------
function startVuMeterSimulation() {
  const leftFill = document.getElementById('vu-fill-left');
  const rightFill = document.getElementById('vu-fill-right');
  const leftPeak = document.getElementById('vu-peak-left');
  const rightPeak = document.getElementById('vu-peak-right');
  const leftDb = document.getElementById('vu-db-left');
  const rightDb = document.getElementById('vu-db-right');

  if (!leftFill || !rightFill) return;

  let peakL = 75;
  let peakR = 70;

  setInterval(() => {
    // Generate organic audio fluctuation
    const baseL = 50 + Math.random() * 38;
    const baseR = 48 + Math.random() * 37;

    leftFill.style.width = `${baseL}%`;
    rightFill.style.width = `${baseR}%`;

    if (baseL > peakL) peakL = baseL;
    else peakL = Math.max(baseL, peakL - 1.5);

    if (baseR > peakR) peakR = baseR;
    else peakR = Math.max(baseR, peakR - 1.5);

    if (leftPeak) leftPeak.style.left = `${peakL}%`;
    if (rightPeak) rightPeak.style.left = `${peakR}%`;

    const calcDbL = (baseL / 100 * 46 - 40).toFixed(1);
    const calcDbR = (baseR / 100 * 46 - 40).toFixed(1);

    if (leftDb) leftDb.textContent = `${calcDbL > 0 ? '+' : ''}${calcDbL} dB`;
    if (rightDb) rightDb.textContent = `${calcDbR > 0 ? '+' : ''}${calcDbR} dB`;
  }, 90);
}

// -----------------------------------------------------------------------------
// Simulated Live Chat
// -----------------------------------------------------------------------------
function startChatSimulation() {
  const chatMessages = document.getElementById('chat-messages-container');
  if (!chatMessages) return;

  const mockUsers = [
    { name: 'KINETIC_09', role: 'mod', color: 'var(--accent-cyan)' },
    { name: 'VORTEX_RUNNER', role: 'vip', color: 'var(--accent-purple)' },
    { name: 'CHRONO_SAM', role: 'sub', color: 'var(--accent-acid)' },
    { name: 'CYBER_SPECTER', role: '', color: 'var(--text-secondary)' },
    { name: 'GHOST_PULSE', role: 'sub', color: 'var(--accent-acid)' },
    { name: 'NEO_GLITCH', role: '', color: 'var(--text-secondary)' }
  ];

  const mockPhrases = [
    'Audio bit rate is buttery smooth!',
    'The 1080p 60fps WebRTC stream latency is literally sub-second.',
    'That chamfer cut HUD border looks insane 🔥',
    'Broadcasting platform looks like straight out of Marathon',
    'Check audio levels, left channel is hitting -3dB',
    'Insane aesthetics. Best broadcast UI kit.'
  ];

  function pushMessage() {
    if (!chatMessages) return;
    const user = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const phrase = mockPhrases[Math.floor(Math.random() * mockPhrases.length)];
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    const msgEl = document.createElement('div');
    msgEl.className = 'chat-msg';
    msgEl.innerHTML = `
      <div class="msg-header">
        <span class="msg-time">${timeStr}</span>
        ${user.role ? `<span class="msg-badge msg-badge--${user.role}">${user.role}</span>` : ''}
        <span class="msg-username" style="color: ${user.color};">${user.name}</span>
      </div>
      <div class="msg-content">${phrase}</div>
    `;

    chatMessages.appendChild(msgEl);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Limit to last 35 messages
    if (chatMessages.children.length > 35) {
      chatMessages.removeChild(chatMessages.children[0]);
    }
  }

  // Periodic message arrival
  setInterval(() => {
    if (Math.random() > 0.4) {
      pushMessage();
    }
  }, 4200);

  // Send message from input
  const sendBtn = document.getElementById('chat-send-btn');
  const chatInput = document.getElementById('chat-input-field');

  if (sendBtn && chatInput) {
    const handleSend = () => {
      const text = chatInput.value.trim();
      if (!text) return;

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const msgEl = document.createElement('div');
      msgEl.className = 'chat-msg';
      msgEl.innerHTML = `
        <div class="msg-header">
          <span class="msg-time">${timeStr}</span>
          <span class="msg-badge msg-badge--host">YOU</span>
          <span class="msg-username text-acid">BROADCASTER</span>
        </div>
        <div class="msg-content" style="color: var(--text-primary);">${text}</div>
      `;

      chatMessages.appendChild(msgEl);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      chatInput.value = '';
      soundFx.click();
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}
