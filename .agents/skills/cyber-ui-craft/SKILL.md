---
name: cyber-ui-craft
description: >-
  Use this skill when designing or authoring a new UI component for BroadcastingUIKit.
  Provides step-by-step guidance on applying Marathon Graphic Realism styling, SCSS ITCSS integration,
  chamfer cut polygons, telemetry labels, and tactile audio feedback.
---

# Cyber UI Craft: Authoring Cyberpunk Broadcasting Components

Follow this procedure whenever adding a new component to `BroadcastingUIKit`.

## Step 1: Design Specification & Telemetry Contract
1. Identify the component role within a broadcasting/streaming platform (e.g. video player control, audio VU meter, stream telemetry chip, chat widget).
2. Assign the visual hierarchy:
   - Primary high-vis action: Acid Lime (`#D8FF00`)
   - Telemetry data readout: Glitch Cyan (`#00F5FF`)
   - Surface backdrop: Onyx Carbon (`#0E1116`) with chamfer cut corners.
3. Define the telemetry identifier: Always include technical coordinates or bracket indices (e.g. `[SYS.AUDIO_01]`, `REC // 60FPS`, `CH_01`).

## Step 2: SCSS Layer Placement
1. Create a dedicated partial in `src/scss/06-components/_<component-name>.scss`.
2. Import the partial in `src/scss/main.scss` under layer 06.
3. Apply standard mixins:
   ```scss
   .cyber-<component> {
     @include cut-corner(10px);
     background: var(--bg-surface);
     border: 1px solid var(--border-dim);
     color: var(--text-primary);
     transition: var(--transition-fast);

     &:hover {
       border-color: var(--accent-cyan);
       @include glow(var(--accent-cyan), 14px, 0.25);
     }
   }
   ```

## Step 3: Tactile Feedback & Interaction
1. If the component is clickable, attach data attributes for sound effects (`data-sound="click"` or `data-sound="hover"`).
2. Ensure `:focus-visible` is styled with high contrast.

## Step 4: Documentation in Showcase
1. Open `index.html`.
2. Add a showcase card under the appropriate category.
3. Provide the live component alongside copyable HTML and Blazor code snippets.
