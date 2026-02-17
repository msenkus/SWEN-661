# CareConnect Accessibility (WCAG 2.1 & Flutter)

This document defines the accessibility rules applied across the app. Reference: [Flutter Accessibility](https://docs.flutter.dev/ui/accessibility-and-internationalization/accessibility).

## Rules

### 1. Semantics on all interactive elements
- Every button, link, form control, and tappable widget must be wrapped in `Semantics` (or use widgets that expose semantics) so screen readers can describe the control.
- Use `Semantics(label: '...', button: true)` for buttons, `Semantics(label: '...')` for static content that needs a description.
- Decorative-only elements: use `ExcludeSemantics` or `Semantics(excludeSemantics: true)` where appropriate.

### 2. Meaningful labels for screen readers
- Labels must be concise and describe the action or content (e.g. "Sign In, button", "Preferences and Accessibility, button").
- For toggles/switches: include state in the label or use `value` (e.g. "on" / "off").
- Headings: use `Semantics(header: true)` for section titles.

### 3. Focus management – logical navigation order
- App content is wrapped in `FocusTraversalGroup` so keyboard/tab order follows the visual reading order (top to bottom, left to right).
- Use `FocusTraversalOrder` and `FocusNode` only when a custom order is required; otherwise rely on the default reading order.

### 4. Color contrast
- **Normal text:** at least **4.5:1** contrast against the background (WCAG 2.1 SC 1.4.3 Level AA).
- **Large text** (18pt+ or 14pt bold): at least **3:1** (Level AA).
- **UI components and graphics:** at least **3:1** (SC 1.4.11 Non-text Contrast).
- High Contrast mode uses black/white (21:1) for maximum compliance. Default theme uses `AppColors.foregroundLight` / `foregroundDark` chosen to meet 4.5:1.

### 5. Touch targets – minimum 48×48 logical pixels
- All tappable areas must be at least **48×48** logical pixels (WCAG 2.5.5).
- Use `minimumSize: const Size(48, 48)` or `Size.fromHeight(48)` for buttons; `IconButtonTheme` and `ElevatedButtonTheme` in the app theme enforce this.
- For custom `InkWell` / `GestureDetector`, wrap in a widget with `const BoxConstraints(minWidth: 48, minHeight: 48)` or equivalent padding so the hit area is ≥ 48×48.

### 6. Dynamic text scaling – support up to 200%
- The app uses `MediaQuery.textScaler` in the root builder and clamps the scale factor to **0.8–2.0** (80%–200%) so layout remains usable at 200% (WCAG 2.1 SC 1.4.4).
- Implemented in `main.dart` via the `MaterialApp.router` builder.

### 7. Keyboard navigation – full keyboard support (tablets)
- `FocusTraversalGroup` ensures logical tab order.
- All interactive elements are focusable; focus indicators use the theme `focusColor` (≥ 4.5:1 contrast).
- Dialogs and routes participate in focus traversal. Use hardware keyboard (Tab, Enter, Escape) to navigate and activate controls.

## Implementation checklist (per screen)
- [ ] All buttons/links/tappable elements have `Semantics` with a meaningful `label` and `button: true` where appropriate.
- [ ] No interactive element has a touch target smaller than 48×48.
- [ ] Text and UI use theme colors (or high-contrast colors) so contrast meets 4.5:1 (or 3:1 for large/non-text).
- [ ] No reliance on color alone for meaning (use text/icons as well).
- [ ] Screen reader testing: verify with TalkBack (Android) and VoiceOver (iOS).
