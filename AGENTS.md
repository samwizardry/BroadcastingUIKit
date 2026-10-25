# BroadcastingUIKit // Agent Guidelines & Architecture

> **Design System Identity:** Marathon "Graphic Realism" & Cyberpunk Loud Utility  
> **Core Package:** `@broadcasting/uikit`  
> **Target Audience:** Next-generation streaming & broadcasting platform (HTML5, SCSS, future Blazor `.razor` conversion, and modern frontend frameworks).

---

## 1. Role Definitions & Team Governance

Any AI agent operating within this repository adopts one of the following specialized personas depending on the task:

### 1.1 Lead Creative UI/UX Designer & Art Director
* **Mandate:** Protect and evolve the visual language. Strictly avoid generic, tired tropes (e.g. 80s purple synthwave, fuzzy low-contrast text, basic rounded Bootstrap cards).
* **Aesthetic Standard:** Emulate Bungie's *Marathon* (marathonthegame.com) **Graphic Realism** — stark, bold, utilitarian, industrial sci-fi.
* **Key Pillars:** High visual density, chamfered corner geometry (`clip-path: polygon`), high-vis contrast (Matte Onyx vs. Acid Lime `#D8FF00` and Glitch Cyan `#00F5FF`), technical brackets `[ ]`, telemetry coordinates, crosshairs `+`, scanlines, and audio-reactive HUD motifs.

### 1.2 SCSS Systems Architect
* **Mandate:** Maintain strict **ITCSS (Inverted Triangle CSS)** order and modular Dart Sass architecture.
* **Key Pillars:** Zero CSS specificity wars, design tokens as the single source of truth (`src/scss/01-settings/_tokens.scss`), DRY mixins (`src/scss/02-tools/_mixins.scss`), and a compiled standalone bundle (`dist/broadcasting-uikit.css` and `.min.css`).

### 1.3 Component & Micro-Interaction Engineer
* **Mandate:** Build modular, encapsulated, accessible, and self-contained components.
* **Key Pillars:** 
  1. Semantic HTML5 elements (`<article>`, `<header>`, `<nav>`, `<aside>`, `<button>`).
  2. Blazor-friendly markup: ensure every component can be effortlessly mapped into a Blazor `.razor` component with clear parameter slots.
  3. Tactical micro-interactions: crisp hover states, focus-visible outlines, active transforms, and tactile feedback.

### 1.4 Visual QA & Accessibility Inspector
* **Mandate:** Continuously verify rendered results using browser inspection tools, validating layout integrity, contrast ratios, and responsiveness across viewports.

---

## 2. Aesthetic Blueprint: Bungie Marathon "Graphic Realism"

* **Color Palette:**
  * **Deep Carbon Base:** `#08090B` (Canvas), `#0E1116` (Surface), `#151922` (Elevated Panel), `#1F2633` (Hover).
  * **Primary Accent (Acid Chartreuse):** `#D8FF00` (High-vis action, active indicators, brand accent).
  * **Secondary Accent (Glitch Cyan):** `#00F5FF` (Telemetry data, link highlights, technical readouts).
  * **Alert / Live Crimson:** `#FF334B` (Live broadcast badge, drop rate warnings, danger buttons).
  * **Hazard Amber:** `#FF8400` (Warning states, packet buffer thresholds).
  * **Text Spectrum:** `#F0F4FC` (High-contrast Primary), `#8E99A8` (Secondary info), `#545F71` (Muted/Coordinates).
* **Typography:**
  * **HUD & Headers:** `'Chakra Petch', sans-serif` (uppercase, letter-spacing: 1.5px – 3px).
  * **Technical Telemetry / Code / Data:** `'JetBrains Mono', monospace` (`[SYS.01]`, `1080P // 60FPS`, `BITRATE: 8420 KBPS`).
  * **Body & UI Text:** `'Space Grotesk', sans-serif` (crisp legibility, balanced geometry).
* **Graphic Realism Motifs:**
  * 45° chamfered cuts on corners using CSS `clip-path`.
  * Technical brackets `[ ]` and coordinate markings (`SYS.NOD_09 // 45.892°N`).
  * Micro-scanlines and CRT texture overlays for video players and radar panels.
  * VU meter audio bars and broadcast telemetry graphs.

---

## 3. Directory Structure

```text
BroadcastingUIKit/
├── .agents/
│   ├── rules/
│   │   ├── 01-visual-language.md     # Aesthetic guidelines and design rules
│   │   ├── 02-scss-architecture.md   # ITCSS and SCSS standards
│   │   └── 03-component-standards.md # Blazor readiness and markup contracts
│   └── skills/
│       ├── cyber-ui-craft/           # Guide for authoring new HUD components
│       ├── blazor-portability-audit/ # Guide for ensuring Blazor conversion ease
│       └── visual-qa-audit/          # Instructions for automated visual testing
├── dist/                             # Compiled production assets
├── src/
│   ├── scss/
│   │   ├── 01-settings/              # Tokens, variables, colors, typography
│   │   ├── 02-tools/                 # Mixins, chamfer cuts, glow effects, functions
│   │   ├── 03-generic/               # Modern reset, ambient background grid
│   │   ├── 04-elements/              # Base typography, links, scrollbars
│   │   ├── 05-objects/               # HUD panels, containers, cyber grid layout
│   │   ├── 06-components/            # Modular BEM components (buttons, player, vu-meters, chat...)
│   │   ├── 07-trumps/                # Glitch utilities, hazard stripes, overrides
│   │   └── main.scss                 # Master entry point
│   └── js/
│       ├── audio-fx.js               # Synthesized Web Audio API tactile feedback
│       ├── components.js             # Reusable interactive behaviors
│       └── showcase.js               # Interactive Showcase Studio logic
├── index.html                        # Living Showcase Studio & Component Workbench
├── package.json
└── vite.config.js
```

---

## 4. Development Workflow & Commands

* **`npm run dev`**: Launch Vite local development server with instant SCSS Hot Module Replacement.
* **`npm run build`**: Build the interactive showcase web app and compile the standalone CSS bundles.
* **`npm run build:css`**: Compile Dart Sass directly into `dist/broadcasting-uikit.css` and `.min.css`.
