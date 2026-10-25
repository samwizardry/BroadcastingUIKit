# Rule: Component Standards & Blazor Portability

## Core Directive
Components must be self-contained, fully accessible, and cleanly structured so they can be ported directly into Blazor `.razor` components, React, or standard HTML templates.

### 1. Blazor Compatibility Contract
1. **Clear Input Properties (Parameters):**
   * Markup must indicate clean parameter injection points (e.g. `[Parameter] public string Title { get; set; }`).
   * Avoid messy inline styles. Rely on modifier classes: `.btn-cyber--primary`, `.btn-cyber--lg`, `.stream-card--live`.
2. **Event Slots & Callbacks:**
   * Interactive elements must be native `<button>` or `<input>` elements (not `<div onclick>`), ensuring seamless `@onclick` and `@onchange` binding in Blazor.
3. **Template Slots (RenderFragment):**
   * Design containers to accept child content gracefully (`.cyber-modal__body`, `.cyber-panel__content`).

### 2. Accessibility (a11y) & Interactive States
* Every button, input, and interactive link must have:
  * `:hover` state with distinct glow / brightness feedback.
  * `:focus-visible` outline for keyboard navigation (`outline: 2px solid var(--accent-cyan); outline-offset: 2px;`).
  * `:active` micro-transform (`transform: translateY(1px)`).
  * `aria-label` or descriptive text for icon-only buttons (`.btn-icon-hud`).
  * Proper ARIA roles on complex widgets (`role="dialog"`, `role="tablist"`, `aria-selected="true"`).

### 3. Living Documentation Standard
Every newly created component MUST have a working demonstration in `index.html` with:
* The interactive rendered component.
* Interactive state toggles (e.g., normal, active, disabled).
* One-click copy buttons for Vanilla HTML and Blazor Razor code.
