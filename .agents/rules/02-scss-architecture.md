# Rule: SCSS Architecture & ITCSS Standards

## Core Directive
All stylesheets must adhere to the Inverted Triangle CSS (ITCSS) methodology, compiling via Dart Sass. Specificity must increase predictably from top to bottom.

### 1. The 7 ITCSS Layers
1. **`01-settings/`**: Single source of truth. Design tokens (colors, font-stacks, cut polygon variables, transitions). No CSS rules outputted here.
2. **`02-tools/`**: Functions and mixins (chamfer cuts, glow effects, typography helpers). No CSS rules outputted here.
3. **`03-generic/`**: Reset styles, box-sizing, background canvas grid.
4. **`04-elements/`**: Unclassed raw HTML tags (`h1-h6`, `body`, `a`, scrollbars).
5. **`05-objects/`**: Layout containers (`.cyber-panel`, `.cyber-grid`, `.hud-frame`) without cosmetic styling.
6. **`06-components/`**: Reusable UI components (`.btn-cyber`, `.cyber-player`, `.vu-meter`, `.cyber-chat`). Explicit class naming (BEM or utility-namespaced).
7. **`07-trumps/`**: Atomic utilities and overrides (`!important` where strictly necessary, glitch text effects, hazard stripes).

### 2. SCSS Rules & Constraints
* **Nesting Depth:** Do not nest selectors deeper than 3 levels (`.card { &__body { &__title { ... } } }`). Deep nesting causes specificity bloat.
* **Token Utilization:** Never hardcode hex values like `#D8FF00` in component files. Always use `var(--accent-acid)` or SCSS `$color-accent-acid`.
* **Zero Specificity Wars:** Avoid selecting bare tags inside components (e.g. `.cyber-player div > span`). Use explicit classes (e.g. `.cyber-player__label`).
* **Dart Sass Compliance:** Use modern Sass syntax (`@use` / `@forward` or modular `@import` strictly organized by layer).
