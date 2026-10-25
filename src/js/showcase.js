// =============================================================================
// BROADCASTING UI KIT // SHOWCASE STUDIO ORCHESTRATOR
// Platform Navigation, Multi-Page Channel Routing, and Studio Controls
// =============================================================================

import { initInteractiveComponents, showToast } from './components.js';

// Channels Dataset for Dynamic Channel Switching
export const CHANNELS_DATA = {
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
    title: 'DISTRIBUTED WEBRTC MESH & LOW-LATENCY INGEST TESTING',
    category: 'Audio DSP Engineering',
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
    title: 'DISTRIBUTED EDGE INGESTION & PROTOCOL OPTIMIZATION',
    category: 'Network Engineering',
    viewers: '3,410',
    codec: 'AV1 / OPUS',
    resolution: '1080P // 60FPS',
    bitrate: '8,200 KBPS',
    latency: '0.78 SEC'
  }
};

// Select & Apply Channel Data to Stream Player
export function selectChannel(channelId, updateUrl = true, notify = true) {
  const channel = CHANNELS_DATA[channelId] || CHANNELS_DATA.samwizardry;

  // Update active state in sidebar
  document.querySelectorAll('.channel-item').forEach(item => {
    item.classList.toggle('is-active', item.getAttribute('data-channel-id') === channel.id);
  });

  const isWatchPage = !!document.getElementById('main-stream-player');

  if (isWatchPage) {
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

    if (updateUrl) {
      const currentUrl = new URL(window.location);
      if (currentUrl.searchParams.get('channel') !== channel.id) {
        currentUrl.searchParams.set('channel', channel.id);
        window.history.pushState({ channel: channel.id }, '', currentUrl);
      }
    }

    if (notify) {
      showToast(`TUNED TO [${channel.name.toUpperCase()}] // ${channel.resolution}`, 'info');
    }
  } else {
    // Navigate from another page to Watch Stream
    window.location.href = `watch.html?channel=${encodeURIComponent(channel.id)}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Initialize component behaviors (modals, dropdowns, code copy, etc.)
  initInteractiveComponents();

  const isWatchPage = !!document.getElementById('main-stream-player');

  // Watch page channel initialization from URL parameter
  if (isWatchPage) {
    const urlParams = new URLSearchParams(window.location.search);
    const initialChannel = urlParams.get('channel') || 'samwizardry';
    selectChannel(initialChannel, false, false);

    // Browser back/forward navigation
    window.addEventListener('popstate', () => {
      const params = new URLSearchParams(window.location.search);
      const channel = params.get('channel') || 'samwizardry';
      selectChannel(channel, false, false);
    });
  }

  // Sidebar Channel Item Click
  document.querySelectorAll('.channel-item[data-channel-id]').forEach(item => {
    item.addEventListener('click', (e) => {
      const channelId = item.getAttribute('data-channel-id');
      if (!channelId) return;

      if (isWatchPage) {
        e.preventDefault();
        selectChannel(channelId, true, true);
      }
      // Non-watch pages will follow the natural href="watch.html?channel=..."
    });
  });

  // Stream Cards & Hero Previews Click (Browse Feed)
  document.querySelectorAll('[data-open-stream]').forEach(card => {
    card.addEventListener('click', (e) => {
      const channelId = card.getAttribute('data-open-stream');
      if (channelId) {
        window.location.href = `watch.html?channel=${encodeURIComponent(channelId)}`;
      }
    });
  });

  // Sidebar Collapse / Expand Toggle
  const sidebarCollapseBtn = document.getElementById('sidebar-collapse-toggle');
  const sidebarEl = document.getElementById('cyber-sidebar-main');
  if (sidebarCollapseBtn && sidebarEl) {
    sidebarCollapseBtn.addEventListener('click', () => {
      sidebarEl.classList.toggle('cyber-sidebar--collapsed');
      const isCollapsed = sidebarEl.classList.contains('cyber-sidebar--collapsed');
      sidebarCollapseBtn.textContent = isCollapsed ? '▶' : '◀';
    });
  }

  // Chat Collapse / Expand Toggle (Watch page)
  const watchLayout = document.getElementById('watch-layout-main');
  const chatCollapseBtn = document.getElementById('btn-chat-collapse');
  const chatExpandBtn = document.getElementById('btn-chat-expand');

  if (chatCollapseBtn && watchLayout) {
    chatCollapseBtn.addEventListener('click', () => {
      watchLayout.classList.add('watch-layout--chat-collapsed');
    });
  }

  if (chatExpandBtn && watchLayout) {
    chatExpandBtn.addEventListener('click', () => {
      watchLayout.classList.remove('watch-layout--chat-collapsed');
    });
  }

  // Real-time Stream Grid Search Filtering (Browse page)
  const browseSearchInput = document.querySelector('#browse-stream-search .cyber-search__input');
  if (browseSearchInput) {
    browseSearchInput.addEventListener('input', () => {
      const q = browseSearchInput.value.trim().toLowerCase();
      document.querySelectorAll('.browse-layout .stream-card').forEach(card => {
        const title = card.querySelector('.stream-title')?.textContent.toLowerCase() || '';
        const author = card.querySelector('.author-name')?.textContent.toLowerCase() || '';
        const category = card.querySelector('.stream-category')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.cyber-tag')).map(t => t.textContent.toLowerCase()).join(' ');
        const text = `${title} ${author} ${category} ${tags}`;
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }

  // Category filter pills (Browse page)
  document.querySelectorAll('.category-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.category-pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      const categoryText = pill.textContent.trim().toUpperCase();
      showToast(`FILTER APPLIED: ${categoryText}`, 'info');

      // Also filter stream cards based on category
      const targetCategory = pill.textContent.trim().toLowerCase();
      document.querySelectorAll('.browse-layout .stream-card').forEach(card => {
        if (targetCategory === 'all streams') {
          card.style.display = 'flex';
          return;
        }
        const category = card.querySelector('.stream-category')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.cyber-tag')).map(t => t.textContent.toLowerCase()).join(' ');
        const matches = category.includes(targetCategory) || tags.includes(targetCategory) || 
          (targetCategory.includes('cyberpunk') && (category.includes('cyberpunk') || tags.includes('marathon'))) ||
          (targetCategory.includes('game') && category.includes('game')) ||
          (targetCategory.includes('audio') && category.includes('audio')) ||
          (targetCategory.includes('blazor') && (category.includes('blazor') || tags.includes('blazor'))) ||
          (targetCategory.includes('webrtc') && (category.includes('webrtc') || tags.includes('webrtc')));
        card.style.display = matches ? 'flex' : 'none';
      });
    });
  });

  // Stream Player Play/Pause Interactive Simulation
  const centerPlayAction = document.getElementById('player-center-play');
  const bottomPlayBtn = document.getElementById('player-bottom-play');

  if (centerPlayAction && bottomPlayBtn) {
    let isPlaying = false;

    const togglePlayback = () => {
      isPlaying = !isPlaying;

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
