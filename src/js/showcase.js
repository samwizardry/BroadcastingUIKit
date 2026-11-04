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

  // Live Stream Video Player (HLS + Automatic Live-Edge Sync on Play, No Duration Bar)
  const playerEl = document.getElementById('main-stream-player');
  const video = document.getElementById('videoPlayer');
  const statusOverlay = document.getElementById('statusOverlay');
  const centerPlayAction = document.getElementById('player-center-play');
  const centerLabel = document.getElementById('player-center-label');
  const bottomPlayBtn = document.getElementById('player-bottom-play');
  const playLabel = document.getElementById('player-play-label');
  const liveSyncChip = document.getElementById('player-live-sync');
  const liveChipText = document.getElementById('player-live-chip-text');
  const syncReadout = document.getElementById('player-sync-readout');
  const muteBtn = document.getElementById('player-mute-btn');
  const volumeSlider = document.getElementById('player-volume-slider');
  const volumeValue = document.getElementById('player-volume-value');
  const fullscreenBtn = document.getElementById('player-fullscreen-btn');

  if (playerEl && video && centerPlayAction && bottomPlayBtn) {
    let isPlaying = false;
    let hlsInstance = null;
    let pendingLiveEdgeSync = false;
    let uiHideTimer = null;
    let lastVolume = 80;

    const rawStreamUrl = video.dataset.streamSrc || 'http://localhost:8888/live/sam/';
    const streamUrl = rawStreamUrl.endsWith('.m3u8')
      ? rawStreamUrl
      : `${rawStreamUrl.replace(/\/+$/, '')}/index.m3u8`;

    // Calculate and jump directly to the live stream edge (accounting for buffer & latency)
    const syncToLiveEdge = () => {
      try {
        let targetTime = null;

        if (video.buffered && video.buffered.length > 0) {
          const bufferedEnd = video.buffered.end(video.buffered.length - 1);
          if (Number.isFinite(bufferedEnd) && bufferedEnd > 0) {
            targetTime = Math.max(0, bufferedEnd - 0.25);
          }
        }

        if (hlsInstance && Number.isFinite(hlsInstance.liveSyncPosition) && hlsInstance.liveSyncPosition > 0) {
          targetTime = targetTime !== null
            ? Math.max(targetTime, hlsInstance.liveSyncPosition)
            : hlsInstance.liveSyncPosition;
        }

        if (targetTime === null && video.seekable && video.seekable.length > 0) {
          const seekableEnd = video.seekable.end(video.seekable.length - 1);
          if (Number.isFinite(seekableEnd) && seekableEnd > 0) {
            targetTime = Math.max(0, seekableEnd - 0.25);
          }
        }

        if (targetTime !== null && targetTime > 0) {
          video.currentTime = targetTime;
        }
      } catch (_) {
        // Ignore seek errors before media metadata is ready
      }
    };

    const updatePlayerUI = (playing) => {
      isPlaying = playing;
      playerEl.classList.toggle('is-playing', isPlaying);

      if (playLabel) {
        playLabel.textContent = isPlaying ? 'PAUSE' : 'PLAY';
      }

      if (liveSyncChip && liveChipText) {
        if (isPlaying) {
          liveSyncChip.classList.remove('live-status-chip--behind');
          liveChipText.textContent = 'LIVE';
        } else {
          liveSyncChip.classList.add('live-status-chip--behind');
          liveChipText.textContent = 'PAUSED';
        }
      }

      if (syncReadout) {
        syncReadout.textContent = isPlaying ? 'SYNC // LIVE EDGE' : 'BUFFER // PAUSED';
      }

      if (!isPlaying && centerLabel) {
        centerLabel.textContent = 'RESUME STREAM [LIVE EDGE]';
      }
    };

    const playFromLiveEdge = (notify = true) => {
      pendingLiveEdgeSync = true;

      if (hlsInstance) {
        // Restart segment loading at the live edge (-1) so stale buffer is skipped
        hlsInstance.startLoad(-1);
      }

      syncToLiveEdge();
      updatePlayerUI(true);

      const playPromise = video.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {
          // Keep UI interactive even if local ingest server on :8888 is not active
        });
      }

      if (notify) {
        showToast('STREAM PLAYBACK ACTIVE // SYNCED TO LIVE EDGE', 'success');
      }
    };

    const pauseStream = (notify = true) => {
      pendingLiveEdgeSync = false;
      video.pause();

      if (hlsInstance) {
        // Stop buffering old segments while paused so next Play jumps straight to live edge
        hlsInstance.stopLoad();
      }

      updatePlayerUI(false);

      if (notify) {
        showToast('STREAM PLAYBACK PAUSED', 'info');
      }
    };

    const togglePlayback = () => {
      if (isPlaying) {
        pauseStream(true);
      } else {
        playFromLiveEdge(true);
      }
    };

    // Initialize HLS.js or native HLS pipeline
    if (typeof window.Hls !== 'undefined' && window.Hls.isSupported()) {
      hlsInstance = new window.Hls({
        manifestLoadingMaxRetry: Infinity,
        manifestLoadingRetryDelay: 1000,
        liveSyncDurationCount: 1.5,
        liveMaxLatencyDurationCount: 3,
        maxBufferLength: 10,
        maxMaxBufferLength: 20,
        maxBufferSize: 150 * 1024 * 1024,
        enableWorker: true,
        lowLatencyMode: false
      });

      hlsInstance.loadSource(streamUrl);
      hlsInstance.attachMedia(video);

      hlsInstance.on(window.Hls.Events.MANIFEST_PARSED, () => {
        if (statusOverlay) {
          statusOverlay.textContent = 'LIVE BROADCAST';
          statusOverlay.classList.remove('badge-live--waiting');
          statusOverlay.classList.add('badge-live--online');
        }
        playerEl.classList.add('has-video-frames');
        playFromLiveEdge(false);
      });

      hlsInstance.on(window.Hls.Events.LEVEL_UPDATED, () => {
        if (pendingLiveEdgeSync && isPlaying) {
          syncToLiveEdge();
        }
      });

      hlsInstance.on(window.Hls.Events.FRAG_BUFFERED, () => {
        if (pendingLiveEdgeSync && isPlaying) {
          syncToLiveEdge();
          pendingLiveEdgeSync = false;
        }
      });

      hlsInstance.on(window.Hls.Events.ERROR, (event, data) => {
        if (data && data.fatal) {
          if (statusOverlay) {
            statusOverlay.textContent = 'WAITING FOR INGEST...';
            statusOverlay.classList.remove('badge-live--online');
            statusOverlay.classList.add('badge-live--waiting');
          }
          setTimeout(() => {
            if (hlsInstance) {
              hlsInstance.loadSource(streamUrl);
            }
          }, 2000);
        }
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        if (statusOverlay) {
          statusOverlay.textContent = 'LIVE BROADCAST';
          statusOverlay.classList.remove('badge-live--waiting');
          statusOverlay.classList.add('badge-live--online');
        }
        playerEl.classList.add('has-video-frames');
        playFromLiveEdge(false);
      });
    }

    video.addEventListener('loadeddata', () => {
      playerEl.classList.add('has-video-frames');
    });

    centerPlayAction.addEventListener('click', togglePlayback);
    bottomPlayBtn.addEventListener('click', togglePlayback);
    video.addEventListener('click', togglePlayback);

    // Volume Slider & Mute / Unmute Audio Controller
    const volOnIcon = muteBtn ? muteBtn.querySelector('.icon-volume-on') : null;
    const volMutedIcon = muteBtn ? muteBtn.querySelector('.icon-volume-muted') : null;

    const syncVolumeUI = () => {
      const effectiveVol = video.muted ? 0 : Math.round(video.volume * 100);
      const isMuted = video.muted || effectiveVol === 0;

      if (volOnIcon) volOnIcon.style.display = isMuted ? 'none' : 'block';
      if (volMutedIcon) volMutedIcon.style.display = isMuted ? 'block' : 'none';

      if (volumeSlider) {
        volumeSlider.value = String(effectiveVol);
        volumeSlider.style.setProperty('--volume-fill', `${effectiveVol}%`);
      }

      if (volumeValue) {
        volumeValue.textContent = `${effectiveVol}%`;
        volumeValue.style.color = isMuted ? 'var(--text-muted)' : 'var(--accent-acid)';
      }
    };

    const toggleMute = () => {
      if (video.muted || video.volume === 0) {
        const restored = lastVolume > 0 ? lastVolume : 80;
        video.volume = restored / 100;
        video.muted = false;
      } else {
        lastVolume = Math.round(video.volume * 100) || 80;
        video.muted = true;
      }
      syncVolumeUI();
    };

    syncVolumeUI();

    if (muteBtn) {
      muteBtn.addEventListener('click', toggleMute);
    }

    if (volumeSlider) {
      volumeSlider.addEventListener('input', () => {
        const val = parseInt(volumeSlider.value, 10) || 0;
        video.volume = val / 100;
        if (val === 0) {
          video.muted = true;
        } else {
          video.muted = false;
          lastVolume = val;
        }
        syncVolumeUI();
      });
    }

    // Fullscreen Toggle & 3-Second Idle UI Auto-Hide
    const isPlayerFullscreen = () => {
      return Boolean(
        document.fullscreenElement === playerEl ||
        document.webkitFullscreenElement === playerEl
      );
    };

    const toggleFullscreen = () => {
      if (!isPlayerFullscreen()) {
        playerEl.requestFullscreen?.().catch(() => {});
      } else {
        document.exitFullscreen?.().catch(() => {});
      }
    };

    const resetFullscreenIdleTimer = () => {
      playerEl.classList.remove('is-ui-hidden');
      if (uiHideTimer) {
        clearTimeout(uiHideTimer);
        uiHideTimer = null;
      }
      if (isPlayerFullscreen()) {
        uiHideTimer = setTimeout(() => {
          if (isPlayerFullscreen()) {
            playerEl.classList.add('is-ui-hidden');
          }
        }, 3000);
      }
    };

    document.addEventListener('fullscreenchange', () => {
      if (isPlayerFullscreen()) {
        resetFullscreenIdleTimer();
      } else {
        if (uiHideTimer) {
          clearTimeout(uiHideTimer);
          uiHideTimer = null;
        }
        playerEl.classList.remove('is-ui-hidden');
      }
    });

    ['mousemove', 'pointermove', 'mousedown', 'touchstart', 'keydown', 'click'].forEach(evtName => {
      playerEl.addEventListener(evtName, resetFullscreenIdleTimer, { passive: true });
    });

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Keyboard Hotkeys: Space (Play/Pause), M (Mute/Unmute), F (Fullscreen)
    document.addEventListener('keydown', (e) => {
      if (isPlayerFullscreen()) {
        resetFullscreenIdleTimer();
      }

      if (e.repeat || e.ctrlKey || e.altKey || e.metaKey) return;

      // Ignore hotkeys when typing in text inputs, textareas, selects, or when a modal is open
      const activeEl = document.activeElement;
      if (activeEl) {
        const tag = activeEl.tagName;
        const isTextInput =
          tag === 'TEXTAREA' ||
          tag === 'SELECT' ||
          activeEl.isContentEditable ||
          (tag === 'INPUT' && activeEl.type !== 'range' && activeEl.type !== 'button');
        if (isTextInput) return;
      }

      if (document.querySelector('.cyber-modal-backdrop.is-open')) return;

      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        togglePlayback();
      } else if (e.code === 'KeyM' || e.key.toLowerCase() === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'KeyF' || e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    });
  }
});
