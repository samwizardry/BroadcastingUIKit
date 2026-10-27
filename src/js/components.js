// =============================================================================
// BROADCASTING UI KIT // INTERACTIVE COMPONENT CONTROLLERS
// =============================================================================

export function initInteractiveComponents() {
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
  // 2. Modals (with Seamless Switching Support)
  // ---------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    // Open / Switch modal
    const openBtn = e.target.closest('[data-modal-open]');
    if (openBtn) {
      e.preventDefault();
      const modalId = openBtn.getAttribute('data-modal-open');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // Close any other open modal backdrop immediately
        document.querySelectorAll('.cyber-modal-backdrop.is-open').forEach(m => {
          if (m !== targetModal) m.classList.remove('is-open');
        });
        targetModal.classList.add('is-open');

        // Auto-focus first input
        setTimeout(() => {
          const firstInput = targetModal.querySelector('input:not([type="hidden"]):not([disabled])');
          if (firstInput) firstInput.focus();
        }, 80);
      }
      return;
    }

    // Close modal
    const closeBtn = e.target.closest('[data-modal-close]');
    if (closeBtn) {
      e.preventDefault();
      const modal = closeBtn.closest('.cyber-modal-backdrop');
      if (modal) {
        modal.classList.remove('is-open');
      }
      return;
    }

    // Backdrop click
    if (e.target.classList.contains('cyber-modal-backdrop')) {
      e.target.classList.remove('is-open');
    }
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
  // 7. Simulated Live Chat Message Generator
  // ---------------------------------------------------------------------------
  startChatSimulation();

  // ---------------------------------------------------------------------------
  // 8. Auth Forms & Password Visibility Toggles
  // ---------------------------------------------------------------------------
  initAuthForms();

  // ---------------------------------------------------------------------------
  // 9. Cyber Search Controllers
  // ---------------------------------------------------------------------------
  initSearchComponents();

  // ---------------------------------------------------------------------------
  // 10. Form Controls, Steppers, Dropzones & Tags
  // ---------------------------------------------------------------------------
  initFormControls();
}

// -----------------------------------------------------------------------------
// Auth & Security Forms Controller
// -----------------------------------------------------------------------------
function initAuthForms() {
  // Password Visibility Toggle
  document.addEventListener('click', (e) => {
    const toggleBtn = e.target.closest('[data-password-toggle]');
    if (toggleBtn) {
      e.preventDefault();
      const targetInputId = toggleBtn.getAttribute('data-password-toggle');
      const input = document.getElementById(targetInputId);
      if (input) {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.textContent = isPassword ? 'HIDE' : 'SHOW';
      }
    }
  });

  // Login Form Submission
  const loginForm = document.getElementById('form-login');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('login-username');
      const passwordInput = document.getElementById('login-password');
      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value.trim() : '';

      if (!username || !password) {
        showToast('ERROR: ALL AUTHENTICATION FIELDS ARE REQUIRED', 'danger');
        return;
      }

      showToast(`ACCESS GRANTED // OPERATOR: ${username.toUpperCase()}`, 'success');

      // Update Profile dropdown header callsign
      const profileHeader = document.querySelector('.cyber-dropdown__header span:first-child');
      if (profileHeader) {
        profileHeader.textContent = `// PROFILE: ${username.toUpperCase()}`;
      }

      // Close modal
      const modal = loginForm.closest('.cyber-modal-backdrop');
      if (modal) {
        setTimeout(() => modal.classList.remove('is-open'), 350);
      }
    });
  }

  // Register Form Submission
  const registerForm = document.getElementById('form-register');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const usernameInput = document.getElementById('register-username');
      const passwordInput = document.getElementById('register-password');
      const confirmInput = document.getElementById('register-confirm');

      const username = usernameInput ? usernameInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';
      const confirm = confirmInput ? confirmInput.value : '';

      if (!username || !password || !confirm) {
        showToast('ERROR: ALL REGISTRATION FIELDS ARE REQUIRED', 'danger');
        return;
      }

      if (password.length < 6) {
        showToast('ERROR: SECRET KEY MUST BE AT LEAST 6 CHARACTERS', 'warning');
        if (passwordInput) passwordInput.classList.add('cyber-input--error');
        return;
      }

      if (password !== confirm) {
        showToast('ERROR: PASSWORDS DO NOT MATCH', 'danger');
        if (confirmInput) {
          confirmInput.classList.add('cyber-input--error');
          confirmInput.focus();
        }
        return;
      }

      // Clear any errors
      if (confirmInput) confirmInput.classList.remove('cyber-input--error');
      if (passwordInput) passwordInput.classList.remove('cyber-input--error');

      showToast(`ACCOUNT [${username.toUpperCase()}] PROVISIONED SUCCESSFULLY`, 'success');

      // Close register modal, open login modal and prefill callsign
      const registerModal = registerForm.closest('.cyber-modal-backdrop');
      if (registerModal) registerModal.classList.remove('is-open');

      const loginModal = document.getElementById('login-modal');
      const loginUsernameInput = document.getElementById('login-username');
      if (loginUsernameInput) loginUsernameInput.value = username;

      setTimeout(() => {
        if (loginModal) {
          loginModal.classList.add('is-open');
          showToast('ENTER SECRET KEY TO LOG IN', 'info');
          const loginPass = document.getElementById('login-password');
          if (loginPass) loginPass.focus();
        }
      }, 350);
    });
  }

  // Clear validation error on typing
  document.querySelectorAll('#form-register input, #form-login input').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('cyber-input--error');
    });
  });
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
  const badgeText = type === 'success' ? '[VERIFIED]' : type === 'warning' ? '[WARN]' : type === 'danger' ? '[CRIT]' : '[SYS.INFO]';
  toast.innerHTML = `
    <span class="cyber-alert__badge">${badgeText}</span>
    <div class="cyber-alert__content">
      <div class="alert-header">
        <span class="alert-title">// TELEMETRY ALERT</span>
      </div>
      <span class="alert-desc">${message}</span>
    </div>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(8px)';
    toast.style.transition = 'opacity 0.2s, transform 0.2s';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
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
    'Video bitrate is rock solid at 8,450 kbps!',
    'The 1080p 60fps WebRTC stream latency is literally sub-second.',
    'That chamfer cut HUD border looks insane 🔥',
    'Broadcasting platform looks like straight out of Marathon',
    'Packet loss is 0.00% across the edge cluster.',
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
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }
}

// -----------------------------------------------------------------------------
// 9. Cyber Search Controller
// -----------------------------------------------------------------------------
function initSearchComponents() {
  // Global Shortcut CTRL+K / CMD+K to focus search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      const searchInput = document.querySelector('.cyber-search__input');
      if (searchInput) {
        e.preventDefault();
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  document.querySelectorAll('.cyber-search').forEach(searchContainer => {
    const input = searchContainer.querySelector('.cyber-search__input');
    const clearBtn = searchContainer.querySelector('.cyber-search__clear');
    const dropdown = searchContainer.querySelector('.cyber-search__dropdown');
    const items = searchContainer.querySelectorAll('.cyber-search__item');
    const filterChips = searchContainer.querySelectorAll('.search-filter-chip');
    const countDisplay = searchContainer.querySelector('.search-results-count');
    const emptyDisplay = searchContainer.querySelector('.cyber-search__empty');

    if (!input) return;

    let activeFilter = 'all';

    const filterResults = () => {
      const query = input.value.trim().toLowerCase();
      let matchCount = 0;

      if (clearBtn) {
        clearBtn.classList.toggle('is-visible', query.length > 0);
      }

      items.forEach(item => {
        const itemType = item.getAttribute('data-search-type') || 'channel';
        const nameText = item.querySelector('.item-name')?.textContent.toLowerCase() || '';
        const catText = item.querySelector('.item-category')?.textContent.toLowerCase() || '';
        const allText = `${nameText} ${catText}`;

        const matchesQuery = query === '' || allText.includes(query);
        const matchesFilter = activeFilter === 'all' || itemType === activeFilter;

        if (matchesQuery && matchesFilter) {
          item.style.display = 'flex';
          matchCount++;
        } else {
          item.style.display = 'none';
        }
      });

      if (countDisplay) {
        countDisplay.textContent = `${matchCount} MATCH${matchCount === 1 ? '' : 'ES'}`;
      }

      if (emptyDisplay) {
        emptyDisplay.style.display = matchCount === 0 ? 'block' : 'none';
      }

      if (dropdown && (query.length > 0 || document.activeElement === input)) {
        dropdown.classList.add('is-open');
      }
    };

    input.addEventListener('input', filterResults);
    input.addEventListener('focus', () => {
      filterResults();
      if (dropdown) dropdown.classList.add('is-open');
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        input.focus();
        filterResults();
      });
    }

    filterChips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.stopPropagation();
        filterChips.forEach(c => c.classList.remove('is-active'));
        chip.classList.add('is-active');
        activeFilter = chip.getAttribute('data-filter') || 'all';
        filterResults();
      });
    });
  });

  // Close search dropdown on click outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.cyber-search')) {
      document.querySelectorAll('.cyber-search__dropdown.is-open').forEach(d => {
        d.classList.remove('is-open');
      });
    }
  });

  // Close search dropdown on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.cyber-search__dropdown.is-open').forEach(d => {
        d.classList.remove('is-open');
      });
    }
  });
}

// -----------------------------------------------------------------------------
// Form Controls Controller (Steppers, Dropzones, Tag Inputs, Color Pickers)
// -----------------------------------------------------------------------------
function initFormControls() {
  // 1. Digital Steppers
  document.querySelectorAll('.cyber-stepper').forEach(stepper => {
    const input = stepper.querySelector('.cyber-stepper__input');
    const minusBtn = stepper.querySelector('[data-stepper-down]');
    const plusBtn = stepper.querySelector('[data-stepper-up]');
    if (!input) return;

    const min = input.hasAttribute('min') ? parseFloat(input.min) : -Infinity;
    const max = input.hasAttribute('max') ? parseFloat(input.max) : Infinity;
    const step = input.hasAttribute('step') ? parseFloat(input.step) : 1;

    if (minusBtn) {
      minusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let val = parseFloat(input.value) || 0;
        val = Math.max(min, val - step);
        input.value = val;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }

    if (plusBtn) {
      plusBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let val = parseFloat(input.value) || 0;
        val = Math.min(max, val + step);
        input.value = val;
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
      });
    }
  });

  // 2. Interactive Tag Inputs
  document.querySelectorAll('.cyber-tag-input').forEach(container => {
    const field = container.querySelector('.cyber-tag-input__field');
    if (!field) return;

    const addTag = (text) => {
      const clean = text.trim().replace(/^#/, '');
      if (!clean) return;

      const tagEl = document.createElement('span');
      tagEl.className = 'tag-item';
      tagEl.innerHTML = `<span>#${clean}</span><button type="button" class="tag-remove" title="Remove tag">✕</button>`;
      container.insertBefore(tagEl, field);
      field.value = '';

      tagEl.querySelector('.tag-remove').addEventListener('click', () => {
        tagEl.remove();
      });
    };

    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault();
        addTag(field.value);
      } else if (e.key === 'Backspace' && field.value === '') {
        const lastTag = container.querySelectorAll('.tag-item');
        if (lastTag.length > 0) {
          lastTag[lastTag.length - 1].remove();
        }
      }
    });

    container.querySelectorAll('.tag-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.tag-item')?.remove();
      });
    });
  });

  // 3. File Dropzone Upload Simulation
  document.querySelectorAll('[data-dropzone]').forEach(zone => {
    const fileInput = zone.querySelector('input[type="file"]');
    const container = zone.parentElement;

    const handleFiles = (files) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      
      // Remove any existing preview
      container.querySelectorAll('.cyber-dropzone__file-item').forEach(el => el.remove());

      const preview = document.createElement('div');
      preview.className = 'cyber-dropzone__file-item';
      preview.innerHTML = `
        <div class="file-meta">
          <span class="file-tag">[INGEST.OK]</span>
          <span class="file-name">${file.name}</span>
          <span class="file-size">${sizeMb > 0 ? sizeMb + ' MB' : (file.size / 1024).toFixed(1) + ' KB'}</span>
        </div>
        <button type="button" class="btn-file-remove" title="Remove File">✕</button>
      `;

      preview.querySelector('.btn-file-remove').addEventListener('click', () => {
        preview.remove();
        if (fileInput) fileInput.value = '';
        showToast('FILE REMOVED FROM INGEST BUFFER', 'info');
      });

      zone.after(preview);
      showToast(`ASSET INGESTED: ${file.name.toUpperCase()}`, 'success');
    };

    ['dragenter', 'dragover'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.add('is-dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      zone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        zone.classList.remove('is-dragover');
      });
    });

    zone.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files) {
        handleFiles(dt.files);
      }
    });

    if (fileInput) {
      fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
      });
    }
  });

  // 4. Color Swatches Selection
  document.querySelectorAll('.cyber-color-swatches').forEach(swatches => {
    swatches.querySelectorAll('.color-swatch-item').forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        swatches.querySelectorAll('.color-swatch-item').forEach(s => s.classList.remove('is-active'));
        swatch.classList.add('is-active');
        const colorName = swatch.getAttribute('data-color-name') || 'CUSTOM';
        const colorVal = swatch.getAttribute('data-color-hex') || '';
        showToast(`OVERLAY THEME ACCENT: [${colorName} // ${colorVal}]`, 'info');
      });
    });
  });

  // 5. Character Counters on Textareas & Inputs
  document.querySelectorAll('[data-char-counter]').forEach(input => {
    const max = parseInt(input.getAttribute('data-char-max') || '120', 10);
    const counterId = input.getAttribute('data-char-counter');
    const counterEl = document.getElementById(counterId);

    const updateCount = () => {
      const len = input.value.length;
      if (counterEl) {
        counterEl.textContent = `[${len}/${max}]`;
        if (len > max) {
          counterEl.style.color = 'var(--accent-alert)';
        } else {
          counterEl.style.color = 'var(--text-muted)';
        }
      }
    };

    input.addEventListener('input', updateCount);
    updateCount();
  });

  // 6. Interactive Production Broadcast Forms
  const streamSetupForm = document.getElementById('form-stream-setup');
  if (streamSetupForm) {
    streamSetupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = streamSetupForm.querySelector('#setup-stream-title');
      const title = titleInput ? titleInput.value.trim() : 'Live Stream';
      showToast(`BROADCAST INGEST SAVED // TITLE: ${title.toUpperCase()}`, 'success');
    });

    streamSetupForm.addEventListener('reset', () => {
      setTimeout(() => {
        showToast('STREAM INGEST CONFIGURATION RESET TO DEFAULTS', 'warning');
      }, 50);
    });
  }

  const automodForm = document.getElementById('form-automod-rules');
  if (automodForm) {
    automodForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('AUTOMOD FILTER PROTOCOL RULES COMMITTED TO CLUSTER', 'success');
    });
  }

  const broadcasterProfileForm = document.getElementById('form-broadcaster-profile');
  if (broadcasterProfileForm) {
    broadcasterProfileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const callsignInput = document.getElementById('profile-callsign');
      const callsign = callsignInput ? callsignInput.value.trim() : 'OPERATOR';
      showToast(`OPERATOR PROFILE [${callsign.toUpperCase()}] COMMITTED`, 'success');
    });
  }
}


