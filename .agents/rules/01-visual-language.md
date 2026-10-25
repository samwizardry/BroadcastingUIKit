# Rule: Visual Language & Aesthetic Integrity (Marathon Graphic Realism)

## Core Directive
Never settle for generic, default AI styling. All components and views created in BroadcastingUIKit must align with Bungie's *Marathon* "Graphic Realism" visual identity.

### 1. Mandatory Color Palette
* **Base Surfaces:**
  * `$color-bg-deep`: `#08090B` (Root background)
  * `$color-bg-surface`: `#0E1116` (Primary card / panel background)
  * `$color-bg-elevated`: `#151922` (Modals, popups, elevated panels)
  * `$color-bg-hover`: `#1F2633` (Hover state on interactive surfaces)
* **Accents:**
  * `$color-accent-acid`: `#D8FF00` (High-visibility acid chartreuse; call-to-actions, active indicators)
  * `$color-accent-cyan`: `#00F5FF` (Tactical glitch cyan; telemetry data, secondary highlights)
  * `$color-accent-alert`: `#FF334B` (Live broadcast badge, critical alerts, danger actions)
  * `$color-accent-warning`: `#FF8400` (High-vis hazard warning)
* **Borders & Dividers:**
  * `$color-border-dim`: `#222936` (Subtle boundary lines)
  * `$color-border-bright`: `#384358` (Active / focused borders)

### 2. Geometry & Corner Treatment
* Avoid generic `border-radius: 8px` or rounded bubbly buttons.
* Utilize **45-degree chamfered cuts** (`clip-path: polygon(...)`) via the `@include cut-corner(...)` mixin.
* For badges, use aggressive single-corner bevels (`@include cut-corner-badge`).
* Panels must feature technical corner brackets `[ ]` or crosshair markers `+` to maintain industrial authenticity.

### 3. Typography Rules
* **Headers & HUD:** `'Chakra Petch'`, uppercase, tracked (`letter-spacing: 1.5px` to `2.5px`).
* **Telemetry & Coordinates:** `'JetBrains Mono'`, monospace. Every card or widget should feature technical coordinates or version indices (e.g., `[SYS.01]`, `REC // 60FPS`, `CH_04`).
* **Body:** `'Space Grotesk'`. High-legibility sans-serif.

### 4. Audio-Visual Cues
* Include optional Web Audio API click/hover feedback for buttons and switches to create a tactile hardware feel.
* Video players and telemetry readouts must include subtle CRT scanlines or grid overlays.
