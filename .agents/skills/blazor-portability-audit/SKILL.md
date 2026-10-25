---
name: blazor-portability-audit
description: >-
  Use this skill when reviewing or porting HTML/SCSS components in BroadcastingUIKit to ensure
  they can be directly converted into Blazor .razor components without refactoring markup.
---

# Blazor Portability Audit

This skill guides the auditing and structuring of components to ensure seamless conversion into Microsoft Blazor WebAssembly / Server components.

## Checklist for Every Component

1. **Self-Contained Root Element:**
   - Every component should have a distinct, single root element or clear wrapper class (`.cyber-player`, `.vu-meter`, `.chat-widget`).
2. **Explicit Parameter Mapping:**
   - Review attributes. Are class modifiers dynamic?
   - Example HTML: `<button class="btn-cyber btn-cyber--primary btn-cyber--sm">`
   - Blazor Equivalent:
     ```razor
     <button class="btn-cyber btn-cyber--@Variant.ToString().ToLower() @(IsSmall ? "btn-cyber--sm" : "")"
             @onclick="OnClick"
             disabled="@IsDisabled">
         @ChildContent
     </button>
     ```
3. **No Unpredictable Cascading DOM Selectors:**
   - Never write CSS like `div > div:first-child > p`.
   - Always use scoped classes: `.stream-card__meta`, `.stream-card__title`.
4. **ChildContent / RenderFragment Support:**
   - Containers (cards, panels, modals) must clearly separate header, body, and action footer.
