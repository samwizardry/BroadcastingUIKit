---
name: visual-qa-audit
description: >-
  Use this skill when auditing, testing, and visually inspecting the rendered UI of BroadcastingUIKit.
  Guides using Vite dev server, browser subagent, checking responsive breakpoints, and inspecting DOM.
---

# Visual QA Audit

Procedure for inspecting and verifying the visual excellence of the UI Kit in an active browser session.

## Steps

1. **Ensure Dev Server is Active:**
   - Run `npm run dev` in the background or verify localhost port (e.g. `http://localhost:5173`).
2. **Launch Browser Subagent:**
   - Use `browser_subagent` to open `http://localhost:5173`.
   - Inspect the component rendered states, hover highlights, and responsive layouts.
3. **Verify Aesthetic Benchmarks:**
   - Contrast: Ensure telemetry text is crisp and readable against Onyx carbon backgrounds.
   - Chamfer Cuts: Check that `clip-path` cuts don't clip internal text or icons.
   - Micro-Interactions: Check button hover transforms and dropdown open states.
   - Responsive Layouts: Resize browser window to mobile (375px), tablet (768px), and ultra-wide (1440px+).
4. **Fix Detected Imperfections:**
   - If spacing, alignment, or clipping issues arise, edit the respective SCSS partial immediately and re-verify.
