# T-cut brand guidelines

**Identity version 1.0.** This guide covers the website, repository and planned desktop editor. The website exists; the editor does not yet.

Start with the [design system](design-system.md). The [tokens](../assets/tokens.css) contain the implementation values. Editor layouts follow the [UI contract](../plan/ui-contract.md) and [screen-fidelity contract](../research/fidelity-contract.md).

## 1. Identity in 30 seconds

| Element | Decision |
|---|---|
| Product name | **T-cut** |
| Audience | Linux creators who already understand CapCut Desktop |
| Position | A free, open-source Linux editor with familiar editing workflows |
| Description | The CapCut-familiar video editor for Linux |
| Commitments | Offline local editing; no mandatory account, subscription, watermark or paid unlock |
| Current status | Coming soon. Planning complete; engine qualification next |
| Personality | Calm, precise, evidence-first |
| Signature | A violet T with a lime section cut from its right arm |
| Themes | Dusk/dark and Cream/light, in a golden-hour palette |

Use **T-cut** in titles and prose. Keep the hyphen and lowercase “cut.” Avoid “TCut,” “T Cut,” “T-Cut” or a second public name. Repository URLs, local paths and `tcut-*` crate identifiers need not follow prose capitalization. Those internal names do not create a second brand.

## 2. Voice and cognitive accessibility

Readers should identify status and their next action without reading every paragraph.

- Put current availability near the first heading. Do not hide “coming soon” below a feature list.
- Keep paragraphs to one idea; use descriptive headings and short lists.
- Use concrete verbs: “Read the plan,” “View the repository,” “Open an issue.”
- Keep detailed engineering explanations behind a heading or disclosure. The first screen should not require understanding codecs or frame arithmetic.
- Identify planned features as planned. A promise is not a shipped capability.
- Avoid urgency, countdowns, autoplay, flashing status indicators and fabricated social proof.
- Use plain English without making medical claims about ADHD. Scannable organization helps readers with differing attention and working-memory needs.

| Avoid | Use |
|---|---|
| “The ultimate AI editing powerhouse!” | “A free video editor planned for Linux.” |
| “Download now” when no application exists | “Read the plan” |
| “Export your masterpiece in seconds!” | “Planned export: supported profiles, measured progress and cancellation.” |
| “Used by thousands of creators” without evidence | “Planning complete; implementation has not started.” |
| “All formats. Every GPU.” | “Supported formats and hardware will be listed after testing.” |
| “Oops! Something went wrong.” | “The file could not be opened. Choose a supported file or read the error details.” |
| “AI handles everything for you.” | “Review the generated result before adding it to your project.” |

The errors above illustrate future copy; they do not claim that editor dialogs exist.

## 3. Logo: the cut T

![T-cut mark](../assets/brand/logo-mark.svg)

The violet bar and stem form a readable T. A narrow cut separates a lime piece from the right arm. This expresses editing without borrowing CapCut’s crossed-ribbon symbol.

### Construction

All coordinates use the 32 × 32 mark grid.

| Part | Geometry |
|---|---|
| Violet crossbar | x = 2.5, y = 5, width = 18.2, height = 8 |
| Cut gap | x = 20.7 to 21.7; width = 1.0 |
| Lime piece | x = 21.7 to 29.5, y = 5 to 13 |
| Stem | x = 7.35 to 15.85; width = 8.5; bottom y = 29 |
| Stem center | x = 11.6; centered on the violet crossbar |
| Outer corners | radius = 2.5 |
| Facing cut edges | Square, not rounded |
| Colors | Violet `#7553ff`; lime `#c9f24d` |

Clear space: at least **8.5 grid units**, scaled with the mark, around the visible identity. Minimum mark width: **16 px**; minimum lockup width: **96 px**. A compact favicon uses its approved inset version instead of shrinking the full lockup.

### Asset inventory

Assets live in [the brand folder](../assets/brand/). SVG wordmarks contain outlines; they do not need fonts installed.

| Asset | Canvas / dimensions | Use |
|---|---|---|
| [logo-mark.svg](../assets/brand/logo-mark.svg) | 32 × 32 | Standalone mark; minimum 16 px |
| [logo-lockup-dark.svg](../assets/brand/logo-lockup-dark.svg) | 122.4 × 32 | Light wordmark on dark surfaces |
| [logo-lockup-light.svg](../assets/brand/logo-lockup-light.svg) | 122.4 × 32 | Dark wordmark on light surfaces |
| [icon.svg](../assets/brand/icon.svg) / [PNG](../assets/brand/icon.png) | 512 × 512 | Application/social icon |
| [favicon.svg](../assets/brand/favicon.svg) | 32 × 32 | Browser tabs; dark backing protects visibility |
| [banner.svg](../assets/brand/banner.svg) / [PNG](../assets/brand/banner.png) | SVG 1280 × 360; PNG 2560 × 720 | Repository/social header on dark surfaces |
| [banner-light.svg](../assets/brand/banner-light.svg) / [PNG](../assets/brand/banner-light.png) | SVG 1280 × 360; PNG 2560 × 720 | Light header variant |
| [og-image.svg](../assets/brand/og-image.svg) / [PNG](../assets/brand/og-image.png) | 1200 × 630 | Link previews |
| [editor-preview.svg](../assets/brand/editor-preview.svg) | 468 × 240 | Abstract dark editor concept |
| [editor-preview-light.svg](../assets/brand/editor-preview-light.svg) | 468 × 240 | Abstract light editor concept |

The concept is an illustration, **not a screenshot of an application**. Preserve its visible caption when presenting it as product imagery. The banner records a planning status; update it when that status changes.

The icon uses a 512 px rounded square with `rx=113` (rounded from 22%). Its 32-unit mark canvas occupies 60% of the icon, with 102.4 px inset on each side. It uses an icon-specific background gradient from `#1e2230` to `#0b0c10`; this is an artwork treatment, not a new UI surface token.

### Do not

Stretch, rotate, add glow/shadow/outline to the logo, fill the cut gap, alter wordmark spacing, substitute live text for outlined letters, or put the light-wordmark lockup on white. Keep illustrations separate from the logo. Do not use the wordmark as a loading animation.

The standalone mark retains its approved artwork colors on both themes. The light banner uses lime `#aedb2e` in the mark and `#627f14` for its UI illustration. These are explicit artwork variants, not permission to recolor the site’s text.

## 4. Color foundations

`tokens.css` is authoritative. Components consume semantic roles, not these raw palette values.

The **logo keeps violet and lime**. The **website uses the golden-hour palette**: dusk plum surfaces, warm cream surfaces, and a sunset accent family (ember, gold, rose). Violet, lime and ink stay as primitives for the logo artwork and the always-dark editor concept.

### Golden-hour palette (website)

| Primitive | Hex | Use |
|---|---|---|
| dusk-950 / 900 / 850 / 800 | `#0d0816` / `#160f22` / `#120b1d` / `#201733` | Dusk surfaces |
| dusk-750 / 700 / 600 | `#2a1f40` / `#3a2d55` / `#54466f` | Dusk borders |
| dusk-400 / 300 | `#a497b8` / `#d2c6de` | Muted and secondary text on Dusk |
| cream-ink | `#fff8ee` | Primary text on Dusk |
| cream-0 / 25 / 50 / 100 / 200 / 300 | `#ffffff` / `#fffaf3` / `#fbf2e4` / `#f3e5cf` / `#e6d2b3` / `#cfb48d` | Cream surfaces and borders |
| plum-900 / 700 / 500 | `#1c1126` / `#4e3f5e` / `#6c5b7d` | Text on Cream |
| ember-300 / 500 / 600 / 800 / 900 | `#ff8a5c` / `#ff6b3d` / `#f2702e` / `#a83a12` / `#7f2a0b` | Actions, links on Cream |
| gold-300 / 400 | `#ffdc8f` / `#ffc552` | Links and focus on Dusk |
| rose-400 / 700 | `#ff6f9a` / `#b02a52` | Signature accent |
| magenta-700 | `#8a2d5c` | Dim accent |
| grad-sunset | ember-500 → `#ff9147` → gold-400 | Primary buttons, accent rules |

### Violet palette (logo artwork)

| Primitive | Hex |
|---|---|
| violet-50 | `#f2eeff` |
| violet-100 | `#e4dcff` |
| violet-200 | `#c9b8ff` |
| violet-300 | `#ad94ff` |
| violet-400 | `#9270ff` |
| violet-500 | `#7553ff` |
| violet-600 | `#6b47f5` |
| violet-700 | `#5634d6` |
| violet-800 | `#4228a8` |
| violet-900 | `#2e1c75` |

### Lime palette (logo artwork)

| Primitive | Hex |
|---|---|
| lime-200 | `#eefdc4` |
| lime-300 | `#e2fb97` |
| lime-400 | `#d4f86b` |
| lime-500 | `#c9f24d` |
| lime-600 | `#aedb2e` |
| lime-700 | `#8cb31f` |
| lime-800 | `#627f14` |

### Ink palette (logo artwork and editor concept)

| Primitive | Hex |
|---|---|
| ink-0 | `#ffffff` |
| ink-25 | `#f7f8fc` |
| ink-50 | `#f1f3f9` |
| ink-100 | `#e4e7f0` |
| ink-200 | `#cbd0de` |
| ink-300 | `#a7aec2` |
| ink-400 | `#7d8599` |
| ink-500 | `#5b6275` |
| ink-600 | `#414757` |
| ink-700 | `#2e333f` |
| ink-750 | `#232733` |
| ink-800 | `#1c1f27` |
| ink-900 | `#14161c` |
| ink-950 | `#0b0c10` |
| ink-980 | `#07080b` |

### Status palette

| Role | Dark primitive | Light primitive |
|---|---|---|
| Information | blue-400 `#4da3ff` | blue-600 `#1d6fd4` |
| Success | green-400 `#34d399` | green-600 `#0d855b` |
| Warning | amber-400 `#fbbf24` | amber-600 `#9a6d00` |
| Error | red-400 `#ff5d5d` | red-600 `#d32b2b` |

### Theme roles

| Semantic role | Dusk / dark | Cream / light |
|---|---|---|
| surface-base | dusk-950 | cream-25 |
| surface-sunken | dusk-980 `#07040c` | cream-100 |
| surface-raised | dusk-900 | cream-0 |
| surface-overlay | dusk-800 | cream-50 |
| surface-inset | dusk-850 | cream-50 |
| text-primary | cream-ink | plum-900 |
| text-secondary | dusk-300 | plum-700 |
| text-muted | dusk-400 | plum-500 |
| text-inverse | dusk-950 | cream-25 |
| text-link | gold-400 | ember-800 |
| text-link-hover | gold-300 | ember-900 |
| border-subtle / default / strong | dusk-750 / 700 / 600 | cream-100 / 200 / 300 |
| action-primary-bg / hover / press | ember-500 / gold-400 / ember-600, drawn with grad-sunset | Same |
| action-primary-fg | dusk-950 | plum-900 |
| action-secondary-bg | Transparent | Transparent |
| action-secondary-bg-hover | surface-overlay | cream-50 |
| action-secondary-fg | text-primary | text-primary |
| action-secondary-border | border-strong | cream-300 |
| accent-signature | rose-400 | rose-700 |
| accent-signature-dim | magenta-700 | rose-400 |
| focus-ring | gold-400 | ember-800 |
| selection-bg | rose-400 at 40% | `#ffd9c4` |
| hero-wash | rose-400 at 14% | ember-500 at 10% |
| grad-display (large text only) | rose-400 → ember-300 → gold-400 | rose-700 → ember-800 → `#8a4b00` |
| sky-0…4, land-far/mid/near, lake, sun-core/edge | Dusk landscape tints | Cream landscape tints |

Light-theme status foregrounds mix 85% of the corresponding 600 palette hue with 15% ink-950 for extra contrast. Status backgrounds retain a 12% mix of the 400 palette hue with transparency; test the foreground against the resulting surface, not just white. Version badge text uses `text-primary` over its shaded background. Shadows/glow values are specified in the source and the design-system guide.

The HTML fallback is dark. JavaScript respects the OS theme, and an explicit toggle overrides it. Future editor defaults are still product decisions; do not claim dark styling guarantees accurate color grading. Display/pipeline calibration requires separate engineering verification.

### Contrast constraints

Ratios below are rounded to two decimals. They apply to these pairs, not arbitrary backgrounds.

| Pair | Contrast |
|---|---|
| dusk-950 on ember-500 (button label, darkest stop) | 6.98:1 |
| dusk-950 on gold-400 | 12.56:1 |
| cream-ink on dusk-950 | 18.73:1 |
| dusk-300 on dusk-950 | 12.10:1 |
| dusk-400 on dusk-950 | 7.24:1 |
| gold-400 on dusk-950 | 12.56:1 |
| rose-400 on dusk-950 | 7.52:1 |
| plum-900 on cream-25 | 17.47:1 |
| plum-700 on cream-25 | 9.21:1 |
| plum-500 on cream-25 | 5.89:1 |
| ember-800 on cream-25 | 6.17:1 |
| rose-700 on cream-25 | 6.13:1 |
| `#f6e9f1` on `#6e2153` (closing-band body text, mid band) | 8.90:1 |
| `#fff8ee` on `#a8385a` (closing-band outline button, darkest point) | 5.89:1 |
| green-600 on white | 4.64:1 |
| amber-600 on white | 4.60:1 |

Use `--text-link` for accent text and `--action-primary-*` for filled buttons. Gradient text (`--grad-display`) is for large display type only. The decorative violet-500 logo is not a text/link color rule. Some border tokens provide surface separation but do not meet 3:1; a border cannot be the sole way to identify an essential control. Add a visible label, clear affordance and focus state.

## 5. Typography

| Role | Family | Use |
|---|---|---|
| Display | Space Grotesk; Cantarell/system fallback | Hero, section headings, wordmark artwork |
| Body / UI | Inter; Noto Sans/system fallback | Paragraphs, links, cards, controls |
| Technical | System monospace; JetBrains Mono/DejaVu fallback | Versions, timecode, file paths and code |

The web assets contain Latin font subsets, not a global-script font pack. Unsupported scripts fall back to available platform fonts. Actual RTL/CJK/emoji shaping in the desktop editor remains an implementation/qualification requirement.

| Type token | Size | Recommended use |
|---|---|---|
| text-display-1 | `clamp(2.5rem, 1.6rem + 4.2vw, 4.5rem)` | Wide hero |
| text-display-2 | `clamp(2rem, 1.5rem + 2.4vw, 3rem)` | Section headline |
| text-h1 | `clamp(1.75rem, 1.4rem + 1.6vw, 2.5rem)` | Large panel heading |
| text-h2 | `clamp(1.375rem, 1.2rem + 0.9vw, 1.75rem)` | Subsection |
| text-h3 / body-lg | `1.125rem` | Cards / introductory body |
| text-body | `1rem` | General body |
| text-body-sm | `0.9375rem` | Secondary UI text |
| text-label | `0.8125rem` | Navigation labels / eyebrows |
| text-micro | `0.75rem` | Captions; not essential instructions |

Weights: 400, 500, 600 and 700. Body leading: 1.65; tighter headings: 1.05 or 1.2. Use narrow reading measures and flexible widths. Never disable browser zoom or truncate essential instructions solely to preserve a screenshot.

Both bundled typefaces use **SIL OFL-1.1**. Ship [Inter’s license](../assets/fonts/OFL-Inter.txt) and [Space Grotesk’s license](../assets/fonts/OFL-SpaceGrotesk.txt). The outlined wordmark and banner text use Space Grotesk/Inter glyphs; retain attribution when sharing the brand pack.

## 6. The slice motif

Use a short flat-edged accent rule to connect website sections and cards to the cut T. The implementation uses `.slice` (a rose rule with an ember left segment) and the `.kicker` rule (a short sunset gradient bar). Use them sparingly at section starts and selected-tab indicators.

Do not put a cut through readable text, imply a broken control, add animated slicing, or recolor media previews with brand colors. Timeline/media colors must remain distinct from warning/error meanings in the eventual editor.

### Illustration

All website artwork is drawn in SVG in this repository: a golden-hour landscape whose sun carries three cut bands (the cut T, applied to a sun), and five stand-in "footage" scenes (sunset lake, sea cliff, night city, dunes, forest). No stock photos and no remote images: the site makes no third-party requests and every asset stays under the repository license. Stand-in footage uses natural scene colors, not interface tokens, and is always labeled as a concept.

## 7. Rights and product independence

Original site code, documentation and original mark geometry follow the repository’s [GPL-3.0-or-later license](../../LICENSE), with the font exceptions above. Keep third-party notices. Public research screenshot links are references, not a redistribution license; do not use CapCut’s screenshots as T-cut product artwork.

T-cut is **not affiliated with CapCut or ByteDance**. The design uses original artwork and familiar workflow conventions. The selected public name still requires trademark review; this guide does not provide legal clearance.

## 8. Keeping the brand current

One maintainer owns token/identity integration. Propose changes through issues or pull requests with a before/after image, intended user benefit and contrast/focus evidence. Update assets, this guide and the design system together. Do not add a new theme as a one-off stylesheet.

Recorded decisions: original cut T in violet and lime; golden-hour website palette with Dusk/Cream themes; original drawn illustrations only; native/static coming-soon site; center-led hero; planned-versus-shipped labels; no countdown, email collection or fabricated testimonials. See the [landing-page study](../research/landing-page-study.md) for the reference and adaptations.
