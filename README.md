# BroadcastingUIKit // Cyberpunk Graphic Realism Design System

> **Visual Direction:** Bungie *Marathon* ("Graphic Realism") & Tactical Industrial Cyberpunk  
> **Package:** `@broadcasting/uikit`  
> **Target Platform:** Broadcasting and streaming platform web frontends (Vanilla HTML5, modern SCSS, and future Microsoft Blazor `.razor` conversion).

---

## 1. Visual Identity & Aesthetic Philosophy

BroadcastingUIKit is built around the **"Graphic Realism"** design language pioneered by Bungie's *Marathon* (`marathonthegame.com`):
* **No generic 80s neon purple vaporwave:** We avoid muddy, low-contrast synthwave cliches. The interface is high-contrast, aggressive, utilitarian, and data-dense.
* **45-Degree Chamfer Cuts:** Angled geometric cuts (`clip-path: polygon(...)`) on buttons, cards, badges, and modals.
* **Technical Motifs:** Crosshairs (`+`), bracket indicators (`[ ]`), coordinate telemetry (`[SYS.01 // LATENCY: 0.8s]`), CRT scanlines, and audio-reactive HUD bars.
* **Acoustic Tactility:** Integrated Web Audio API tactile audio synthesis for buttons, toggles, and alert chirps.

---

## 2. Color Palette & Typography

### Palette Tokens
| Token | Variable | Hex / Value | Purpose |
| :--- | :--- | :--- | :--- |
| **Acid Chartreuse** | `--accent-acid` | `#D8FF00` | High-vis primary actions, active indicators |
| **Glitch Cyan** | `--accent-cyan` | `#00F5FF` | Technical telemetry, links, secondary actions |
| **Alert Crimson** | `--accent-alert` | `#FF334B` | Live broadcast badge, critical errors, drop alerts |
| **Hazard Amber** | `--accent-warning` | `#FF8400` | Buffer warnings, network degradation |
| **VIP Purple** | `--accent-purple` | `#9D4EDD` | Subscriber & VIP badges |
| **Matte Carbon Deep** | `--bg-deep` | `#08090B` | Deep backdrop canvas |
| **Matte Carbon Surface** | `--bg-surface` | `#0E1116` | Panel and card background |
| **Elevated Surface** | `--bg-surface-elevated` | `#151922` | Modals, popovers, dropdown menus |
| **Border Dim** | `--border-dim` | `#222936` | Subtle structural division lines |
| **Border Bright** | `--border-bright` | `#384358` | Active element borders |

### Typography
* **HUD & Headings:** `'Chakra Petch', sans-serif` (uppercase, letter-spacing: 1.5px – 3px).
* **Technical Telemetry / Code:** `'JetBrains Mono', monospace` (`[SYS.01]`, `REC // 60FPS`).
* **Body & UI Text:** `'Space Grotesk', sans-serif` (balanced geometry, high legibility).

---

## 3. ITCSS (Inverted Triangle CSS) SCSS Architecture

```text
src/scss/
├── 01-settings/        # Design tokens, CSS variables, color scales (no CSS output)
│   └── _tokens.scss
├── 02-tools/           # Reusable mixins (chamfer cuts, glow, scanlines, hazard stripes)
│   └── _mixins.scss
├── 03-generic/         # CSS reset, box-sizing, cyber ambient coordinate grid
│   ├── _reset.scss
│   └── _cyber-bg.scss
├── 04-elements/        # Unclassed HTML tag styles (h1-h6, p, links, scrollbars)
│   ├── _typography.scss
│   └── _scrollbars.scss
├── 05-objects/         # Layout patterns (containers, cyber grid, studio layout)
│   ├── _containers.scss
│   └── _grid.scss
├── 06-components/      # Encapsulated, reusable UI widgets
│   ├── _buttons.scss
│   ├── _badges.scss
│   ├── _inputs.scss
│   ├── _switch-slider.scss
│   ├── _player.scss
│   ├── _vu-meter.scss
│   ├── _stream-health.scss
│   ├── _stream-card.scss
│   ├── _chat.scss
│   ├── _avatars.scss
│   ├── _modals.scss
│   ├── _dropdowns.scss
│   ├── _tabs.scss
│   ├── _alerts.scss
│   ├── _tooltips.scss
│   └── _sidebar.scss
├── 07-trumps/          # Overrides, hazard patterns, glitch animations
│   └── _utilities.scss
└── main.scss           # Master orchestrator compiling the bundle
```

---

## 4. Twitch-Style Application Architecture

BroadcastingUIKit features a modern Twitch-style layout with seamless view switching:
* **Persistent Left Channels Sidebar (`.cyber-sidebar`):**
  * Displays Followed Channels (live status, viewer counts, avatars) and Recommended Channels.
  * Collapsible into a compact 60px icon rail.
  * Seamless channel switching: clicking any channel instantly tunes the center player to that stream.
* **Browse Channels Feed (`.browse-layout`):**
  * Featured live stream hero banner with live 16:9 preview and instant tune-in CTA.
  * Category filter pills (`CYBERPUNK UI/UX`, `GAME ENGINE DEV`, `AUDIO DSP`, etc.).
  * Responsive 3-4 column grid of live stream cards with scanline previews.
* **Watch Stream Mode (`.watch-layout`):**
  * **Left:** Persistent channels navigation.
  * **Center:** Full cyberpunk broadcast player with telemetry HUD, stereo VU meter, and network diagnostics.
  * **Right:** Collapsible real-time chat with superchat donations, subscriber badges, and hype reaction chips.

---

## 4. Antigravity IDE Configuration & Agentic Roles

Configured for collaborative AI development within Google Antigravity:
* **[AGENTS.md](./AGENTS.md)**: Master guidelines, aesthetic laws, and architectural rules.
* **`.agents/rules/`**:
  * [`01-visual-language.md`](./.agents/rules/01-visual-language.md): Visual constraints & Marathon styling.
  * [`02-scss-architecture.md`](./.agents/rules/02-scss-architecture.md): ITCSS enforcement and Dart Sass standards.
  * [`03-component-standards.md`](./.agents/rules/03-component-standards.md): Blazor portability and a11y standards.
* **`.agents/skills/`**:
  * [`cyber-ui-craft`](./.agents/skills/cyber-ui-craft/SKILL.md): Standard operating procedure for authoring new HUD components.
  * [`blazor-portability-audit`](./.agents/skills/blazor-portability-audit/SKILL.md): Validation guide for Blazor `.razor` mapping.
  * [`visual-qa-audit`](./.agents/skills/visual-qa-audit/SKILL.md): Browser verification procedure.

---

## 5. Quick Start & Commands

```bash
# Install dependencies
npm install

# Start Vite live development server (Hot Module Replacement)
npm run dev
# -> Opens http://localhost:5173/

# Compile production CSS bundles
npm run build:css
# -> Generates dist/broadcasting-uikit.css and dist/broadcasting-uikit.min.css

# Build complete showcase application
npm run build
```

---

## 6. Blazor (.razor) Conversion Guide

Every component markup block in BroadcastingUIKit is designed to cleanly convert into a Blazor component:

```razor
<!-- Example: CyberButton.razor -->
<button class="btn-cyber btn-cyber--@Variant.ToString().ToLower() @(IsSmall ? "btn-cyber--sm" : "")"
        @onclick="OnClick"
        disabled="@IsDisabled">
    @ChildContent
</button>

@code {
    [Parameter] public ButtonVariant Variant { get; set; } = ButtonVariant.Primary;
    [Parameter] public bool IsSmall { get; set; } = false;
    [Parameter] public bool IsDisabled { get; set; } = false;
    [Parameter] public EventCallback<MouseEventArgs> OnClick { get; set; }
    [Parameter] public RenderFragment ChildContent { get; set; }

    public enum ButtonVariant { Primary, Secondary, Danger, Warning, Ghost }
}
```
