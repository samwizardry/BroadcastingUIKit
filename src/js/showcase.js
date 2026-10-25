// =============================================================================
// BROADCASTING UI KIT // SHOWCASE STUDIO ORCHESTRATOR
// =============================================================================

import { soundFx } from './audio-fx.js';
import { initInteractiveComponents, showToast } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize component behaviors
  initInteractiveComponents();

  // Top Nav Audio FX Toggle Button
  const audioToggleBtn = document.getElementById('audio-fx-toggle');
  if (audioToggleBtn) {
    const updateAudioButton = () => {
      const isEnabled = soundFx.enabled;
      audioToggleBtn.textContent = isEnabled ? 'AUDIO: ON' : 'AUDIO: MUTED';
      audioToggleBtn.classList.toggle('btn-cyber-primary', isEnabled);
      audioToggleBtn.classList.toggle('btn-cyber-ghost', !isEnabled);
    };

    updateAudioButton();

    audioToggleBtn.addEventListener('click', () => {
      const state = soundFx.toggle();
      updateAudioButton();
      showToast(`TACTILE AUDIO ${state ? 'ENABLED' : 'MUTED'}`, 'info');
    });
  }

  // Stream Player Play/Pause Interactive Simulation
  const centerPlayAction = document.getElementById('player-center-play');
  const bottomPlayBtn = document.getElementById('player-bottom-play');
  const playerScreen = document.getElementById('player-active-screen');

  if (centerPlayAction && bottomPlayBtn) {
    let isPlaying = false;

    const togglePlayback = () => {
      isPlaying = !isPlaying;
      soundFx.click();

      if (isPlaying) {
        centerPlayAction.style.display = 'none';
        showToast('STREAM PLAYBACK STARTED // 1080P 60FPS', 'success');
      } else {
        centerPlayAction.style.display = 'flex';
        showToast('STREAM PLAYBACK PAUSED', 'info');
      }
    };

    centerPlayAction.addEventListener('click', togglePlayback);
    bottomPlayBtn.addEventListener('click', togglePlayback);
  }

  // Modal Demo Trigger
  const modalDemoTrigger = document.getElementById('btn-open-modal-demo');
  if (modalDemoTrigger) {
    modalDemoTrigger.addEventListener('click', () => {
      const modal = document.getElementById('stream-settings-modal');
      if (modal) modal.classList.add('is-open');
    });
  }

  // Showcase Section Navigation (Studio Demo vs Component Workbench vs Design Tokens)
  const navTabs = document.querySelectorAll('[data-showcase-view]');
  const viewPanels = document.querySelectorAll('[data-view-panel]');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-showcase-view');

      navTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');

      viewPanels.forEach(panel => {
        if (panel.getAttribute('data-view-panel') === targetView) {
          panel.style.display = 'block';
        } else {
          panel.style.display = 'none';
        }
      });

      soundFx.click();
    });
  });
});
