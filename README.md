# BroadcastingUIKit // Cyberpunk Graphic Realism Design System

> **Visual Direction:** Bungie *Marathon* ("Graphic Realism") & Tactical Industrial Cyberpunk  
> **Package:** `@broadcasting/uikit`  
> **Target Platform:** Next-generation live broadcasting and streaming web frontends (Vanilla HTML5, modular ITCSS Dart Sass, and Microsoft Blazor `.razor` component conversion).

---

## 1. Visual Identity & Aesthetic Philosophy

`BroadcastingUIKit` is engineered around the **"Graphic Realism"** design language inspired by Bungie's *Marathon* (`marathonthegame.com`):
* **High-Contrast Industrial Brutalism:** Avoids muddy, low-contrast synthwave cliches in favor of stark Matte Carbon surfaces paired with high-visibility Acid Chartreuse (`#D8FF00`) and Glitch Cyan (`#00F5FF`).
* **45-Degree Chamfer Geometry:** Precision-angled geometric cuts (`clip-path: polygon(...)`) applied across buttons, inputs, cards, badges, and modals.
* **Technical Telemetry Motifs:** Crosshairs (`+`), bracket indicators (`[ ]`), coordinate readouts (`[SYS.TELEMETRY: ACTIVE // PROTOCOL: WEBRTC]`), CRT scanlines, and real-time network health sparklines.
* **Zero Generic Emojis:** Uses sharp vector SVG glyphs and industrial telemetry badges (`[SYS.INFO]`, `[VERIFIED]`, `[WARN]`, `[CRIT]`, `[CFG]`, `[TEL]`, `[HYPE]`).

---

## 2. Color Palette & Typography

### Palette Tokens
| Token | CSS Custom Property | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Acid Chartreuse** | `--accent-acid` | `#D8FF00` | High-vis primary actions, active states, live indicators |
| **Glitch Cyan** | `--accent-cyan` | `#00F5FF` | Technical telemetry, focus outlines, secondary highlights |
| **Alert Crimson** | `--accent-alert` | `#FF334B` | Live broadcast badge, critical errors, danger actions |
| **Hazard Amber** | `--accent-warning` | `#FF8400` | Buffer warnings, network degradation alerts |
| **VIP Purple** | `--accent-purple` | `#9D4EDD` | Subscriber & VIP badges |
| **Matte Carbon Deep** | `--bg-deep` | `#08090B` | Deepest backdrop canvas |
| **Matte Carbon Surface** | `--bg-surface` | `#0E1116` | Standard panel and card surface |
| **Elevated Surface** | `--bg-surface-elevated` | `#151922` | Modals, dropdown menus, popovers |
| **Hover Surface** | `--bg-surface-hover` | `#1F2633` | Interactive element hover state |
| **Border Dim** | `--border-dim` | `#222936` | Subtle structural division lines |
| **Border Bright** | `--border-bright` | `#384358` | Active/highlighted element boundaries |

### Typography
* **HUD & Headings (`--font-hud`):** `'Chakra Petch', sans-serif` (uppercase, letter-spacing: `1.5px – 3px`).
* **Technical Telemetry & Code (`--font-mono`):** `'JetBrains Mono', monospace` (`[SYS.01]`, `1080P // 60FPS`, `8,450 KBPS`).
* **Body & UI Metadata (`--font-body`):** `'Space Grotesk', sans-serif` (balanced geometry, high legibility).

---

## 3. Project & ITCSS Architecture

The stylesheet architecture strictly follows **ITCSS (Inverted Triangle CSS)** compiled via Dart Sass into standalone production bundles (`dist/broadcasting-uikit.css` and `dist/broadcasting-uikit.min.css`), paired with modular ES6 controllers and a multi-page Vite workbench:

```text
BroadcastingUIKit/
├── .agents/
│   ├── rules/                  # Aesthetic, ITCSS, and Blazor component rules
│   └── skills/                 # Agentic workflows (cyber-ui-craft, blazor-portability-audit, visual-qa-audit)
├── dist/                       # Compiled CSS bundles & production build output
├── src/
│   ├── scss/
│   │   ├── 01-settings/
│   │   │   └── _tokens.scss        # Design tokens, SCSS variables, CSS custom properties
│   │   ├── 02-tools/
│   │   │   └── _mixins.scss        # Chamfer cuts, glows, scanlines, focus states
│   │   ├── 03-generic/
│   │   │   ├── _reset.scss         # Modern CSS normalization
│   │   │   └── _cyber-bg.scss      # Ambient coordinate grid & watermark overlays
│   │   ├── 04-elements/
│   │   │   ├── _typography.scss    # Base headings, body copy, code blocks
│   │   │   └── _scrollbars.scss    # Industrial slim scrollbars
│   │   ├── 05-objects/
│   │   │   ├── _containers.scss    # App shell, HUD panels, browse & watch layouts
│   │   │   └── _grid.scss          # Responsive multi-column cyber grids
│   │   ├── 06-components/
│   │   │   ├── _buttons.scss       # Chamfered buttons, sizes, loading spinners, icon buttons
│   │   │   ├── _badges.scss        # Live badges, viewer counters, telemetry tags
│   │   │   ├── _inputs.scss        # Text inputs, sizes, affixes, stream key reveal, validation
│   │   │   ├── _forms.scss         # Checkboxes, radios, tiles, steppers, dropzones, tags, swatches
│   │   │   ├── _switch-slider.scss # Toggle switches & range sliders
│   │   │   ├── _player.scss        # Live stream video player, HUD overlays, fullscreen controls
│   │   │   ├── _stream-health.scss # Bitrate sparkline graph & 6-cell telemetry diagnostic board
│   │   │   ├── _stream-card.scss   # 16:9 live broadcast preview cards
│   │   │   ├── _chat.scss          # Collapsible live chat, donations, role badges, reaction bar
│   │   │   ├── _avatars.scss       # Chamfered streamer avatars with live status rings
│   │   │   ├── _modals.scss        # Stream ingest settings, operator login & registration modals
│   │   │   ├── _dropdowns.scss     # Tactical popover menus with telemetry tags & shortcuts
│   │   │   ├── _tabs.scss          # Segmented view switcher tabs
│   │   │   ├── _alerts.scss        # System banners & toast telemetry notifications
│   │   │   ├── _tooltips.scss      # HUD micro-tooltips
│   │   │   ├── _sidebar.scss       # Collapsible channels navigation sidebar
│   │   │   ├── _showcase.scss      # Workbench cards, code preview boxes, token swatches
│   │   │   └── _search.scss        # Command search bar, filter chips, autocomplete dropdown
│   │   ├── 07-trumps/
│   │   │   └── _utilities.scss     # Text accents, status helpers, layout overrides
│   │   └── main.scss               # Master ITCSS entry point
│   └── js/
│       ├── showcase.js         # Multi-page router, channel switching, HLS live-edge player, hotkeys
│       └── components.js       # Modals, auth validation, dropdowns, search, forms, chat simulation, toasts
├── index.html                  # 01 // Browse Channels (Stream Discovery Feed)
├── watch.html                  # 02 // Watch Stream (Live Broadcast Player & Chat Studio)
├── workbench.html              # 03 // Component Workbench (17 Interactive UI Modules & Code Specs)
├── tokens.html                 # 04 // Design Tokens (Color Matrix & Typography Specimen)
├── package.json
└── vite.config.js
```

---

## 4. Multi-Page Platform Architecture

The application is structured as a 4-page Vite Multi-Page Application (MPA) unified by a persistent top HUD bar and collapsible Channels Sidebar (`.cyber-sidebar`):

### `01 // BROWSE CHANNELS` (`index.html`)
* **Featured Broadcast Hero Banner:** 16:9 scanline preview with live viewer count, streamer verification badge, codec tags, and instant tune-in CTA.
* **Command Search (`CTRL+K`) & Autocomplete:** Real-time filtering across live channels, categories, and tags with interactive filter chips (`ALL`, `CHANNELS`, `CATEGORIES`, `TAGS`).
* **Category Filter Pills & Discovery Grid:** Instant client-side filtering of responsive 16:9 stream cards.

### `02 // WATCH STREAM` (`watch.html`)
* **Dynamic Channel Routing:** Supports URL query parameters (`watch.html?channel=samwizardry`, `marathon`, `signal`, `blazor`, `vortex`) with `History API` (`pushState` / `popstate`) navigation and instant channel switching from the sidebar.
* **Live-Edge Video Player (`HLS.js` + HTML5 `<video>`):**
  * **Automatic Live-Edge Sync:** Designed specifically for live broadcasts without a VOD scrub bar. Pausing halts segment buffering (`hls.stopLoad()`), and resuming (`Play`) automatically jumps straight to the live edge (`hls.startLoad(-1)` + buffer tail synchronization).
  * **Audio & Fullscreen Controllers:** Integrated volume slider with live percentage readout, mute/unmute toggle, and fullscreen mode with a 3-second idle UI auto-hide timer.
  * **Keyboard Hotkeys:** `Space` (Play/Pause & sync to live edge), `M` (Mute/Unmute), and `F` (Toggle Fullscreen), automatically suppressed when typing in inputs or when modals are open.
* **Network & Bitrate Telemetry Board:** SVG sparkline graph and 6-metric diagnostic grid (`FPS`, `BITRATE`, `DROP RATE`, `RTT LATENCY`, `CODEC`, `SECURITY`).
* **Collapsible Live Broadcast Chat:** Simulated live chat message generator, Supertip donation highlights, role badges (`HOST`, `MOD`, `VIP`, `SUB`), and non-emoji tactical reaction chips (`[HYPE]`, `[GG]`, `[W]`, `[100%]`, `[GLITCH]`).

### `03 // COMPONENT WORKBENCH` (`workbench.html`)
Interactive catalog featuring **17 component modules** with live previews and one-click copyable **HTML5 & Blazor (`.razor`)** code specifications:
1. **Tactical Buttons & Sizes:** Primary, Secondary, Danger, Warning, Ghost, Small/Large scales, `.btn-cyber--loading` states, and HUD icon buttons.
2. **Status Badges & Telemetry Chips:** Pulsing live badges, viewer counters, and color-coded telemetry tags.
3. **Form Inputs, Sizes & Validation States:** Small/Default/Large inputs, inline prefixes/suffixes, stream key reveal/copy, and error/warning/success states.
4. **Selection Controls:** Custom chamfered checkboxes, radio buttons, and selectable hardware configuration tiles.
5. **Hardware Controls:** Toggle switches, digital numeric steppers (`+`/`-`), interactive `#tag` inputs, color theme swatches, and range sliders.
6. **Tactical File Ingestion & Asset Dropzone:** Drag-and-drop upload zone with file size calculation and buffer removal.
7. **Production Broadcast Forms & Workflows:** Complete interactive forms for Stream Setup, AutoMod Protocol Rules, and Broadcaster Profile configuration.
8. **Streamer Avatars & Status Rings:** Multi-size chamfered avatars with live/offline status indicators.
9. **Cyber HUD Alerts & System Warnings:** Inline alert banners and stacked bottom-right telemetry toast notifications.
10. **Authentication & Registration Modals:** Operator Login and New Broadcaster Registration modals with password visibility toggles, validation, simulated error states, and seamless modal switching.
11. **Tactical Dropdown Menus:** Header profile and configuration popovers with keyboard shortcut hints.
12. **Stream & Broadcaster Search:** Command search component with live result counters and category filtering.
13. **Segmented Tabs & Switchers:** Angular navigation and content-switching tab bars.
14. **Stream Cards & Broadcast Previews:** Live channel preview cards with hover elevation and scanlines.
15. **Chat Messages & Reaction Chips:** Standalone chat message variants and quick reaction controls.
16. **Broadcast Telemetry & Health Board:** Real-time stream health monitoring module.
17. **Live Stream Video Player:** Standalone interactive player organism showcase.

### `04 // DESIGN TOKENS` (`tokens.html`)
* **Color System Matrix:** Visual swatches and hex codes for all core surfaces, borders, and high-visibility accents.
* **Typography Specimen:** Live rendering of the three primary font stacks across HUD headers, telemetry readouts, and body copy.

---

## 5. Agentic Configuration & Governance

Configured with custom rules and skills for AI-assisted engineering:
* **[AGENTS.md](./AGENTS.md)**: Master guidelines, aesthetic laws, and negative constraints.
* **`.agents/rules/`**:
  * [`01-visual-language.md`](./.agents/rules/01-visual-language.md): Visual constraints & Marathon Graphic Realism styling.
  * [`02-scss-architecture.md`](./.agents/rules/02-scss-architecture.md): ITCSS layer order and Dart Sass standards.
  * [`03-component-standards.md`](./.agents/rules/03-component-standards.md): Blazor portability and accessibility contracts.
* **`.agents/skills/`**:
  * [`cyber-ui-craft`](./.agents/skills/cyber-ui-craft/SKILL.md): Procedure for authoring new HUD components.
  * [`blazor-portability-audit`](./.agents/skills/blazor-portability-audit/SKILL.md): Validation guide for Blazor `.razor` conversion.
  * [`visual-qa-audit`](./.agents/skills/visual-qa-audit/SKILL.md): Browser verification and responsive QA workflow.

---

## 6. Quick Start & Commands

```bash
# Install dependencies
npm install

# Start Vite local development server (Hot Module Replacement)
npm run dev
# -> Opens http://localhost:5173/

# Compile standalone production CSS bundles
npm run build:css
# -> Generates dist/broadcasting-uikit.css and dist/broadcasting-uikit.min.css

# Build complete multi-page showcase application & CSS bundles
npm run build
```

---

## 7. Blazor (`.razor`) Conversion Guide

Every component in `BroadcastingUIKit` uses flat, semantic BEM classes and explicit state modifiers (`.is-active`, `.is-open`, `.btn-cyber--loading`, `.cyber-input--error`), allowing direct 1:1 conversion into Blazor components without DOM restructuring:

```razor
<!-- Example: CyberButton.razor -->
<button class="btn-cyber btn-cyber-@Variant.ToString().ToLower() @(IsSmall ? "btn-cyber-sm" : "") @(IsLoading ? "btn-cyber--loading" : "")"
        @onclick="OnClick"
        disabled="@(IsDisabled || IsLoading)">
    @ChildContent
</button>

@code {
    [Parameter] public ButtonVariant Variant { get; set; } = ButtonVariant.Primary;
    [Parameter] public bool IsSmall { get; set; }
    [Parameter] public bool IsLoading { get; set; }
    [Parameter] public bool IsDisabled { get; set; }
    [Parameter] public EventCallback<MouseEventArgs> OnClick { get; set; }
    [Parameter] public RenderFragment? ChildContent { get; set; }

    public enum ButtonVariant { Primary, Secondary, Danger, Warning, Ghost }
}
```
