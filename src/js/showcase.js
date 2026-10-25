// =============================================================================
// BROADCASTING UI KIT // SHOWCASE STUDIO ORCHESTRATOR
// Twitch-Style Navigation, Channel Switching, and Studio Controls
// =============================================================================

import { soundFx } from './audio-fx.js';
import { initInteractiveComponents, showToast } from './components.js';

// Channels Dataset for Twitch-Style Switching
const CHANNELS_DATA = {
  samwizardry: {
    id: 'samwizardry',
    name: 'SamWizardry',
    avatar: 'SAM',
    title: 'CYBERPUNK BROADCASTING SYSTEM ARCHITECTURE // MARATHON SPEC',
    category: 'Cyberpunk Design Systems',
    viewers: '24,850',
    codec: 'AV1 / OPUS',
    resolution: '1080P // 60FPS',
    bitrate: '8,450 KBPS',
    latency: '0.84 SEC'
  },
  marathon: {
    id: 'marathon',
    name: 'MarathonRunner',
    avatar: 'MK',
    title: 'CYBERPUNK SHADER & POST-FX DEVELOPMENT // VULKAN PIPELINE',
    category: 'Game Engine Architecture',
    viewers: '4,120',
    codec: 'HEVC / OPUS',
    resolution: '1440P // 60FPS',
    bitrate: '11,200 KBPS',
    latency: '1.02 SEC'
  },
  signal: {
    id: 'signal',
    name: 'Signal_09',
    avatar: 'AI',
    title: 'REALTIME AUDIO DSP & SYNTHESIS WORKBENCH // WEBAUDIO C++',
    category: 'Audio Engineering',
    viewers: '8,890',
    codec: 'AV1 / OPUS',
    resolution: '4K HDR // 60FPS',
    bitrate: '14,800 KBPS',
    latency: '0.91 SEC'
  },
  blazor: {
    id: 'blazor',
    name: 'BlazorForge',
    avatar: 'BL',
    title: 'BLAZOR WEBASSEMBLY & SCSS DESIGN SYSTEM SCALING',
    category: 'Frontend Architecture',
    viewers: '1,940',
    codec: 'H.264 / AAC',
    resolution: '1080P // 60FPS',
    bitrate: '6,500 KBPS',
    latency: '1.14 SEC'
  },
  vortex: {
    id: 'vortex',
    name: 'VortexNet',
    avatar: 'VX',
    title: 'DISTRIBUTED WEBRTC MESH & LOW-LATENCY INGEST TESTING',
    category: 'Network Engineering',
    viewers: '3,410',
    codec: 'AV1 / OPUS',
    resolution: '1080P // 60FPS',
    bitrate: '8,200 KBPS',
    latency: '0.78 SEC'
  }
};

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

  // View Switching Controller
  const navTabs = document.querySelectorAll('[data-showcase-view]');
  const viewPanels = document.querySelectorAll('[data-view-panel]');

  function activateView(targetView) {
    navTabs.forEach(t => {
      if (t.getAttribute('data-showcase-view') === targetView) {
        t.classList.add('is-active');
      } else {
        t.classList.remove('is-active');
      }
    });

    viewPanels.forEach(panel => {
      if (panel.getAttribute('data-view-panel') === targetView) {
        panel.style.display = 'block';
      } else {
        panel.style.display = 'none';
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetView = tab.getAttribute('data-showcase-view');
      activateView(targetView);
      soundFx.click();
    });
  });

  // Switch Stream Channel Functionality
  function selectChannel(channelId) {
    const channel = CHANNELS_DATA[channelId] || CHANNELS_DATA.samwizardry;

    // Update active state in sidebar
    document.querySelectorAll('.channel-item').forEach(item => {
      item.classList.toggle('is-active', item.getAttribute('data-channel-id') === channelId);
    });

    // Update player elements
    const titleEl = document.getElementById('stream-title-display');
    const authorEl = document.getElementById('stream-author-display');
    const avatarEl = document.getElementById('stream-avatar-display');
    const categoryEl = document.getElementById('stream-category-display');
    const viewersEl = document.getElementById('stream-viewers-display');
    const hudPillEl = document.getElementById('stream-hud-pill');
    const codecEl = document.getElementById('stream-spec-codec');
    const bitrateEl = document.getElementById('stream-spec-bitrate');
    const latencyEl = document.getElementById('stream-spec-latency');

    if (titleEl) titleEl.textContent = channel.title;
    if (authorEl) authorEl.textContent = channel.name;
    if (avatarEl) avatarEl.textContent = channel.avatar;
    if (categoryEl) categoryEl.textContent = channel.category;
    if (viewersEl) viewersEl.textContent = `${channel.viewers} VIEWERS`;
    if (hudPillEl) hudPillEl.textContent = `CH_${channel.id.toUpperCase()} // LIVE`;
    if (codecEl) codecEl.textContent = channel.codec;
    if (bitrateEl) bitrateEl.textContent = channel.bitrate;
    if (latencyEl) latencyEl.textContent = channel.latency;

    // Switch view to Watch Mode
    activateView('watch');
    showToast(`TUNED TO [${channel.name.toUpperCase()}] // ${channel.resolution}`, 'info');
    soundFx.alert();
  }

  // Sidebar Channel Item Click
  document.querySelectorAll('.channel-item[data-channel-id]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const channelId = item.getAttribute('data-channel-id');
      selectChannel(channelId);
    });
  });

  // Stream Cards Click (From Browse Feed)
  document.querySelectorAll('[data-open-stream]').forEach(card => {
    card.addEventListener('click', () => {
      const channelId = card.getAttribute('data-open-stream');
      selectChannel(channelId);
    });
  });

  // Back to Browse button
  const backToBrowseBtn = document.getElementById('btn-back-to-browse');
  if (backToBrowseBtn) {
    backToBrowseBtn.addEventListener('click', () => {
      activateView('browse');
      soundFx.click();
    });
  }

  // Sidebar Collapse / Expand Toggle
  const sidebarCollapseBtn = document.getElementById('sidebar-collapse-toggle');
  const sidebarEl = document.getElementById('cyber-sidebar-main');
  if (sidebarCollapseBtn && sidebarEl) {
    sidebarCollapseBtn.addEventListener('click', () => {
      sidebarEl.classList.toggle('cyber-sidebar--collapsed');
      const isCollapsed = sidebarEl.classList.contains('cyber-sidebar--collapsed');
      sidebarCollapseBtn.textContent = isCollapsed ? '▶' : '◀';
      soundFx.click();
    });
  }

  // Chat Collapse / Expand Toggle
  const watchLayout = document.getElementById('watch-layout-main');
  const chatCollapseBtn = document.getElementById('btn-chat-collapse');
  const chatExpandBtn = document.getElementById('btn-chat-expand');

  if (chatCollapseBtn && watchLayout) {
    chatCollapseBtn.addEventListener('click', () => {
      watchLayout.classList.add('watch-layout--chat-collapsed');
      soundFx.click();
    });
  }

  if (chatExpandBtn && watchLayout) {
    chatExpandBtn.addEventListener('click', () => {
      watchLayout.classList.remove('watch-layout--chat-collapsed');
      soundFx.click();
    });
  }

  // Category filter pills in browse view
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      soundFx.click();
      showToast(`FILTER APPLIED: ${pill.textContent.trim()}`, 'info');
    });
  });

  // Stream Player Play/Pause Interactive Simulation
  const centerPlayAction = document.getElementById('player-center-play');
  const bottomPlayBtn = document.getElementById('player-bottom-play');

  if (centerPlayAction && bottomPlayBtn) {
    let isPlaying = false;

    const togglePlayback = () => {
      isPlaying = !isPlaying;
      soundFx.click();

      if (isPlaying) {
        centerPlayAction.style.display = 'none';
        showToast('STREAM PLAYBACK ACTIVE // 1080P 60FPS', 'success');
      } else {
        centerPlayAction.style.display = 'flex';
        showToast('STREAM PLAYBACK PAUSED', 'info');
      }
    };

    centerPlayAction.addEventListener('click', togglePlayback);
    bottomPlayBtn.addEventListener('click', togglePlayback);
  }
});
