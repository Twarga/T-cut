# T-cut design system

**System version 1.0.** Implemented surfaces: coming-soon website and repository artwork. Desktop component contracts below are requirements for future implementation, not a claim that an editor exists.

Identity: [brand guidelines](brand-guidelines.md). Source of truth: [tokens.css](../assets/tokens.css). Editing semantics: [UI contract](../plan/ui-contract.md). Screen placement: [fidelity contract](../research/fidelity-contract.md).

## 1. Purpose and precedence

A visitor should understand three things: what T-cut aims to become, whether they can install it today, and where to follow the project. A creator using the eventual editor should recognize CapCut-like navigation without losing keyboard access, readable text or safe editing.

Order of authority:

1. User’s free/open-source Linux and familiar-layout requirements.
2. Product/editing invariants and qualified reference evidence.
3. Shared semantic tokens and component accessibility contracts.
4. Surface-specific layout decisions that declare their exceptions.

A pretty page is not evidence of a working renderer. Branding must not override accurate project state or media colors.

## 2. Token architecture

| Layer | Purpose | Example |
|---|---|---|
| Primitive | Raw palette and scales | `--violet-600` |
| Semantic | Role and state across components | `--action-primary-bg` |
| Component | An exception needed by a real component | Add only after recurring evidence; no separate component-color layer is currently necessary |

Components use semantic variables. Raw hex values belong in tokens or approved vector artwork. CSS tokens govern the site; a future GTK adapter must translate the same roles using supported GTK syntax. Browser `color-mix`, custom properties and selectors are not automatically GTK-compatible.

```css
.btn-primary {
  background: var(--action-primary-bg);
  color: var(--action-primary-fg);
}
.btn-primary:hover { background: var(--action-primary-bg-hover); }
```

Name tokens by purpose, not screen location: `text-muted`, not `footer-gray`. Add a token when it represents a repeated product decision or a necessary accessible state. A one-off spacing nudge does not justify a new color/type/radius scale.

## 3. Foundations

### Color

The [brand guide](brand-guidelines.md#4-color-foundations) lists all primitive values and both theme mappings. Main families:

| Tokens | Function |
|---|---|
| `--surface-base/sunken/raised/overlay/inset` | Depth and region separation |
| `--text-primary/secondary/muted/inverse/on-accent` | Readability by priority and background |
| `--text-link`, `--text-link-hover` | Underlined inline navigation |
| `--border-subtle/default/strong` | Boundaries; not sufficient alone to identify essential controls |
| `--action-primary-bg/bg-hover/bg-press/fg` | Filled primary action |
| `--action-secondary-bg/bg-hover/fg/border` | Secondary action |
| `--accent-signature`, `--focus-ring` | Brand motif and keyboard focus |
| `--status-info/success/warning/error-fg/bg` | Status plus explicit text/icon |
| `--selection-bg`, `--hero-wash` | Selected text and decorative hero shading |

Color is not the sole selected/error signal. Tabs include a physical indicator and `aria-selected`; errors include explanatory text.

### Typography

Use `--font-display` for headings, `--font-body` for content and `--font-mono` for code/timecode. [Brand typography](brand-guidelines.md#5-typography) records every size. Relative units preserve text scaling. Body line height uses `--leading-relaxed` (1.65); headings use `--leading-tight` (1.05) or `--leading-snug` (1.2).

| Foundation | Tokens and values |
|---|---|
| Tracking | tight −0.03em; snug −0.015em; normal 0; wide 0.08em |
| Weight | regular 400; medium 500; semibold 600; bold 700 |
| Leading | tight 1.05; snug 1.2; normal 1.5; relaxed 1.65 |

Micro text is for captions, not the only place a visitor learns there is no download.

### Spacing and shape

| Token suffix | Value |
|---|---|
| space-1 / 2 / 3 / 4 | 0.25 / 0.5 / 0.75 / 1rem |
| space-5 / 6 / 8 / 10 | 1.25 / 1.5 / 2 / 2.5rem |
| space-12 / 16 / 20 / 24 / 32 | 3 / 4 / 5 / 6 / 8rem |
| section-y | `clamp(4rem, 8vw, 7.5rem)` |
| radius-sm / md / lg / xl / 2xl / full | 6 / 10 / 14 / 20 / 28 / 999px |
| border-width | 1px |
| focus-width / offset | 2 / 2px |
| tap-min | 44px |

Website buttons/cards use md/lg radii. The native editor can use denser panel spacing under an explicit desktop exception; it still needs usable keyboard/motor alternatives.

### Elevation

| Token | Dark | Light |
|---|---|---|
| shadow-sm | `0 1px 2px rgb(0 0 0 / 0.5)` | `0 1px 2px rgb(16 18 26 / 0.06)` |
| shadow-md | `0 4px 16px -2px rgb(0 0 0 / 0.55)` | `0 6px 20px -4px rgb(16 18 26 / 0.1)` |
| shadow-lg | `0 24px 64px -16px rgb(0 0 0 / 0.7)` | `0 28px 64px -20px rgb(16 18 26 / 0.18)` |
| glow-brand | Violet outline mix 40%; soft shadow mix 45% | Violet outline mix 24%; soft shadow mix 28% |

Exact glow offsets and palette mapping remain in `tokens.css`. Use glow on the closing CTA, not every card and not the logo itself.

### Motion and layers

| Token | Value |
|---|---|
| duration-fast / base / slow | 120 / 200 / 320ms |
| ease-out | `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| ease-in-out | `cubic-bezier(0.4, 0, 0.2, 1)` |
| layer-base / raised / sticky / overlay | 0 / 10 / 100 / 1000 |

Reduced motion changes all duration tokens to 1ms and disables smooth scroll. There is no autoplay, animated countdown, marquee, parallax or cursor follower. Focus/selection feedback must remain visible with motion disabled.

### Layout

| Token or boundary | Value / rule |
|---|---|
| container-max | 1120px |
| container-narrow | 720px |
| container-gutter | `clamp(1rem, 4vw, 2.5rem)` |
| Roadmap vertical layout | 56rem and wider |
| Compact header layout | Below 60rem |
| Non-sticky mobile header | Below 35rem, preserving reading space |

Breakpoints are layout conditions in `site.css`, not invented token values. Intrinsic grids fit content first. At narrow widths, all content remains available; tables can scroll within a labeled container without widening the page.

## 4. Shared states and accessibility baseline

These rules apply to every interactive contract below unless a row explains an exception.

| State | Required treatment |
|---|---|
| Default | Visible label, correct semantics and supported action |
| Hover | Meaningful affordance; no essential hover-only information |
| Active / pressed | Consistent action token; distinguish a momentary press from a persistent selection |
| Focus-visible | 2px focus ring with 2px offset; no removal of outline without equivalent evidence |
| Selected | Visible indicator plus semantic state; color alone is insufficient |
| Disabled | Explain the reason nearby; prevent activation; do not offer fake features |
| Loading | Identify the operation; `aria-busy` where appropriate; measured or indeterminate progress |
| Error | Specific problem and recovery action; preserve the user’s input/work |
| Empty | Explain what is absent and a useful next step |
| Mixed | Show an explicit mixed value for multi-selection, not the first object’s value |

Site controls use native links/buttons; they do not need irrelevant mixed/loading states. Do not add disabled/loading variants merely to fill a documentation grid. Planned desktop components must support only states that represent actual model behavior.

Target: **WCAG 2.2 AA**. Automated results are evidence, not a full compliance certificate. Check keyboard, contrast, screen-reader semantics, reduced motion, 200% text/zoom resilience and content reflow. Prefer 44px web targets; closely spaced editor controls need accessible alternatives and device-specific qualification. Do not claim an Orca session happened unless one was actually run.

## 5. Component contracts

### Button

**Use:** a user-triggered action such as changing theme or confirming a dialog. **Do not use:** page navigation; use a link instead.

Anatomy: optional decorative icon, visible verb/object label, optional measured busy indicator. Variants: primary, secondary; ghost is a future bounded variant for low-priority actions, not implemented as a website class today. Primary uses `--action-primary-*`; secondary uses its corresponding semantic roles.

Native `<button type="button">`; Space/Enter activate; focus stays on the action unless a dialog/navigation changes context. Icon-only buttons have a programmatic name and tooltip/help when useful. Labels wrap rather than disappear. Disabled/busy actions cannot produce duplicate model changes. Use a specific destructive label such as “Delete project permanently,” not “OK.”

### Link

**Use:** navigation or download of an existing artifact. **Do not use:** a fake download when no release exists.

Native `<a href>`; Enter follows; inline links remain underlined. CTAs can use `.btn` styles while retaining link semantics. Use `--text-link` and `--text-link-hover`; avoid higher-specificity theme overrides that recolor white button labels. Long labels must wrap. Loading/disabled/mixed states do not apply to ordinary links.

### ToolCategoryStrip: planned desktop

**Use:** horizontal main tool navigation above the left library pane. **Do not use:** as a substitute for the Home sidebar or inspector subtabs.

Anatomy: icon above label, selection indicator, overflow affordance when needed. Available categories keep stable order. Use tabs or a native accessible selection group with a name, active state, arrow-key navigation and a usable focus outline. Active category changes library content, not the selected timeline object. Long/localized labels scroll or overflow; do not shrink text below readable size. Unsupported categories do not pretend to work.

### CategoryList: planned desktop

**Use:** vertical secondary navigation within a library category. **Do not use:** to replace the horizontal main tool strip.

Rows contain label, optional disclosure and count/status when real. Nested groups expose expanded state. Keyboard Up/Down selects/focuses according to the chosen native pattern; Home/End navigate boundaries. Selection uses text/indicator and a semantic selected state. Remember useful child selection without resetting the timeline. Long labels wrap or expose their full value accessibly.

### AssetGrid item: planned desktop

**Use:** media/preset thumbnails. **Do not use:** the audio catalog where a list better communicates names and duration.

Anatomy: thumbnail, accessible asset name, type/duration, ready/processing/failed state and an explicit insertion action. Focus/select/preview and insertion are distinct. Keyboard activation must not insert a clip accidentally merely because focus moved. Broken/unsupported media show recovery details; loading thumbnails do not block opening a project. Virtualize off-screen items without losing selected-item accessibility.

### ParameterRow: planned desktop

**Use:** one property and its unit/value. **Do not use:** as an ungrouped wall of controls.

Anatomy: persistent label, numeric field or slider, unit, reset, optional real keyframe control. Slider and numeric entry dispatch the same command. Arrow keys adjust according to documented precision; Escape cancels drafts. A continuous drag commits one undo transaction. Mixed selection gets a mixed state; invalid text preserves the draft and explains the constraint. Track locks disable editing through the model, not just the widget. Tooltip is not the sole label.

### InspectorSection: planned desktop

**Use:** related parameter rows such as Transform. **Do not use:** to hide essential selected-object identity.

Heading/disclosure, optional enable control, reset/animation affordances, rows and divider. Disclosures expose expanded state; bypass/check controls exist only for effects that can really be bypassed. Preserve focus when opening a section and independent scroll state when possible. No-selection shows Details; object selection changes to the correct inspector. Label collisions and long translations wrap.

### TimelineClip: planned desktop

**Use:** timed video/audio/text items. **Do not use:** thumbnail imagery as the only accessible clip identity.

Body contains appropriate thumbnails/waveform/text, selected outline, source warnings, edge handles and track relation. Selected/multi-selected/locked/error/loading states represent domain state. Provide a named keyboard clip navigator and numeric move/trim paths for tiny clips. Arrow/split/delete commands follow the published shortcut profile and never fire while text/IME input owns focus. A drag draft cancels safely on Escape/capture loss; undo restores the model, not just widget coordinates.

### ProjectCard: planned desktop

**Use:** Home projects. **Do not use:** as an asset-browser item.

Thumbnail, title, truthful metadata, open action and context menu. Open uses stable identity, not grid index. Rename and duplicate preserve source media; Trash/Restore acts on the managed project. A missing project offers locate/remove-from-recents rather than silently opening a blank replacement. Menu actions have keyboard routes. Thumbnail loading remains independent of project opening. Titles wrap within a bounded card while the full name remains accessible.

### ModalShell: planned desktop

**Use:** a focused decision or task such as settings/export/relink. **Do not use:** a modal for ordinary navigation to Home.

Title, content, action footer and error/help region. Use native dialog semantics; contain focus, return it to the trigger and document Escape behavior. Export has preview/settings columns; settings has tabs; relink has rows/status. Do not force all three into one identical form. At small sizes or high scaling, stack columns and scroll content while actions remain reachable. Saving is separate from exporting media. Progress is measured or indeterminate, never invented.

### StatusCallout: implemented site

**Use:** information that changes a visitor’s decision, such as no application release. **Do not use:** repeated decorative warnings.

`.status-callout` contains a heading, explanatory text and useful links; icon is decorative. Use `--status-warning-bg/fg` and readable body text. Static status is not an interrupting live alert. Dynamic editor errors may use a bounded live announcement when relevant. At narrow widths, icon/content stack. It is visible before the feature sections so planned features cannot imply current availability.

### Tabs: implemented site

**Use:** peer roadmap sections. **Do not use:** to hide unrelated navigation or essential status.

HTML starts as working anchor links and six headed sections. JavaScript adds `tablist`, `tab`, `tabpanel`, roving tabindex, `aria-selected`, panel labels and orientation. Desktop vertical tabs use Up/Down; narrow horizontal tabs use Left/Right. Home/End jump; Enter/Space activate. One panel appears with JS; all remain readable without it. Selection has a slice indicator and semantics. Long labels wrap. Avoid automatic rotation and hover selection.

### FeatureCard: brand page

**Use:** brand swatches and asset tiles on the brand page. **Do not use:** for roadmap or feature claims.

Swatch or asset preview, concise heading, one explanatory paragraph. Semantic list content, not an interactive card unless it has a real destination. Hover border is decoration, not an action signal. Grid reflows without fixed heights; long content cannot overlap a neighbor.

### Table: implemented site

**Use:** direct comparisons: stack choices, release scope, token values. **Do not use:** tabular layout for unrelated content.

Caption, header row, row headings and data cells with proper scope. Do not simulate the table with anonymous divs. Scroll container becomes keyboard-focusable if it overflows. Headers remain meaningful when screen readers read a cell alone. Color tags include text such as “Conditional,” not a color-only dot. Wide technical content wraps or scrolls without page overflow.

## 6. Patterns and failure behavior

- **Themes:** semantic overrides, one persisted `tcut-theme` choice; invalid stored values return to the OS preference. Without JS, the dark baseline remains readable. No cookie, analytics or remote font request is required.
- **Focus:** skip link targets focusable main content; hidden SVG sprite cannot occupy layout; hidden panels/controls leave the tab sequence.
- **Content:** put first-line status and primary action before engineering detail; present phases as 0–5 in both docs and UI.
- **Progress:** a running task names its stage. Show a percentage only when derived from actual work. Separate cancelled, failed and finalized-success states.
- **Destruction:** confirm scope and reversibility. Trash does not delete arbitrary original source footage. Permanently deleting a managed project needs a specific confirmation.
- **Text/IME:** printable keys, arrows and Backspace belong to focused input/composition. The timeline must not respond while text entry owns the event.
- **RTL/localization:** use logical CSS/layout properties, allow expansion, avoid concatenated sentence fragments and check actual shaping/font fallback. Web Latin subsets do not prove desktop multilingual support.
- **Privacy:** the site makes no external asset or analytics calls; GitHub’s hosting may keep its own access logs. Optional future cloud/model capabilities need explicit consent and cannot gate local editing.

## 7. Website structure and source map

| File | Responsibility |
|---|---|
| `docs/index.html` | Semantics, content, navigation and truthful status |
| `docs/assets/tokens.css` | Shared palette/roles/scales/themes |
| `docs/assets/site.css` | Native/static website layout and components |
| `docs/assets/site.js` | Theme and progressively enhanced roadmap tabs only |
| `docs/404.html` | Missing-page recovery under the GitHub Pages project path |
| `docs/assets/brand/` | Original mark, outlined wordmarks, banners and concept illustration |
| `docs/assets/fonts/` | Self-hosted Latin subsets and OFL notices |

The site is static HTML/CSS/JavaScript. It does not change the planned Rust/GTK app stack, introduce React/Electron or require a Node build pipeline. Pages serves the main branch’s `/docs` folder; `.nojekyll` keeps it static.

## 8. Governance and verification

One integration owner reviews shared token/component changes. A proposal needs a real user task, evidence of repetition or a missing interaction, before/after captures, and focus/contrast behavior. Prefer extending a contract over adding an unrelated variant.

After smoke proof, update documentation and changelog. Deprecation names a replacement and migrates all affected consumers; do not retain competing aliases. Never rebrand media-engine limitations as design preferences.

Required verification for this site:

1. Run it locally and visually inspect desktop and narrow captures in both themes.
2. Toggle theme, reload, exercise tabs using click and orientation-correct keys.
3. Disable JavaScript and follow roadmap anchors; all six phases remain available.
4. Check reduced motion, 200% text/reflow, skip-link focus and accessible names.
5. Run axe on light/dark and relevant selected panels. Report findings and what manual verification did not cover.
6. Resolve local document/asset links and check for unexpected external subresource requests.
7. Check the published Pages URL and nested 404 path after deployment.

## 9. Recorded decisions

- Center-led hero and dual CTA mirror the studied landing-page structure; copy, mark, palette and illustrations are original.
- Remove promotional popups, partner logos, user counts and testimonials because the project has no shipped editor or evidence for those claims.
- HTML fallback remains dark; honor explicit or OS theme through semantic overrides.
- Compact header wraps below 60rem and stops sticking below 35rem so it does not consume most of a phone screen.
- Roadmap starts with anchors, not dead buttons; JavaScript only adds tab behavior.
- Primary button label color belongs to the component semantics, not a global light-theme link override.
- Mobile grids use intrinsic minimums; color contrast and accessible alternatives take priority over decorative similarity.
