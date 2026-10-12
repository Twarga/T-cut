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
| Themes | Ink/dark and Paper/light |

Use **T-cut** in titles and prose. Keep the hyphen and lowercase “cut.” Avoid “TCut,” “T Cut,” “T-Cut” or a second public name. Repository URLs, local paths and the earlier internal `lce-*` crate identifiers need not follow prose capitalization. Those internal names do not create a second brand.

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

### Violet palette

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

### Lime palette

| Primitive | Hex |
|---|---|
| lime-200 | `#eefdc4` |
| lime-300 | `#e2fb97` |
| lime-400 | `#d4f86b` |
| lime-500 | `#c9f24d` |
| lime-600 | `#aedb2e` |
| lime-700 | `#8cb31f` |
| lime-800 | `#627f14` |

### Ink palette

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

| Semantic role | Ink / dark | Paper / light |
|---|---|---|
| surface-base | ink-950 | ink-0 |
| surface-sunken | ink-980 | ink-50 |
| surface-raised | ink-900 | ink-0 |
| surface-overlay | ink-800 | ink-25 |
| surface-inset | `#10121a` | ink-50 |
| text-primary | ink-50 | ink-900 |
| text-secondary | ink-300 | ink-600 |
| text-muted | ink-400 | ink-500 |
| text-inverse | ink-950 | ink-0 |
| text-link | violet-400 | violet-600 |
| text-link-hover | violet-300 | violet-700 |
| border-subtle / default / strong | ink-750 / 700 / 600 | ink-100 / 200 / 300 |
| action-primary-bg / hover / press | violet-600 / 500 / 700 | violet-600 / 700 / 800 |
| action-primary-fg | White | White |
| action-secondary-bg | Transparent | Transparent |
| action-secondary-bg-hover | surface-overlay | ink-50 |
| action-secondary-fg | text-primary | text-primary |
| action-secondary-border | border-strong | ink-200 |
| accent-signature | lime-500 | lime-800 |
| accent-signature-dim | lime-700 | lime-700 |
| focus-ring | lime-500 | violet-600 |
| selection-bg | violet-500 at 45% | violet-100 |
| hero-wash | violet-500 at 12% | violet-500 at 7% |

Light-theme status foregrounds mix 85% of the corresponding 600 palette hue with 15% ink-950 for extra contrast. Status backgrounds retain a 12% mix of the 400 palette hue with transparency; test the foreground against the resulting surface, not just white. Version badge text uses `text-primary` over its shaded background; lime remains the border/selection accent. Shadows/glow values are specified in the source and the design-system guide.

The HTML fallback is dark. JavaScript respects the OS theme, and an explicit toggle overrides it. Future editor defaults are still product decisions; do not claim dark styling guarantees accurate color grading. Display/pipeline calibration requires separate engineering verification.

### Contrast constraints

Ratios below are rounded to two decimals. They apply to these pairs, not arbitrary backgrounds.

| Pair | Contrast |
|---|---|
| White on violet-600 | 5.46:1 |
| White on violet-500 | 4.73:1 |
| White on violet-700 | 7.35:1 |
| violet-400 on ink-950 | 5.57:1 |
| violet-500 on ink-950 | 4.13:1: **not body text** |
| lime-500 on ink-950 | 15.16:1 |
| lime-800 on white | 4.60:1 |
| green-600 on white | 4.64:1 |
| amber-600 on white | 4.60:1 |

Use `--text-link` for accent text and `--action-primary-*` for filled buttons. The decorative violet-500 logo is not a text/link color rule. Some border tokens provide surface separation but do not meet 3:1; a border cannot be the sole way to identify an essential control. Add a visible label, clear affordance and focus state.

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

Use a short flat-edged accent rule to connect website sections and cards to the cut T. The implementation uses `.slice`: a lime rule with a violet left segment. Use it sparingly at section/card starts and selected-tab indicators.

Do not put a cut through readable text, imply a broken control, add animated slicing, or recolor media previews with brand colors. Timeline/media colors must remain distinct from warning/error meanings in the eventual editor.

## 7. Rights and product independence

Original site code, documentation and original mark geometry follow the repository’s [GPL-3.0-or-later license](../../LICENSE), with the font exceptions above. Keep third-party notices. Public research screenshot links are references, not a redistribution license; do not use CapCut’s screenshots as T-cut product artwork.

T-cut is **not affiliated with CapCut or ByteDance**. The design uses original artwork and familiar workflow conventions. The selected public name still requires trademark review; this guide does not provide legal clearance.

## 8. Keeping the brand current

One maintainer owns token/identity integration. Propose changes through issues or pull requests with a before/after image, intended user benefit and contrast/focus evidence. Update assets, this guide and the design system together. Do not add a new theme as a one-off stylesheet.

Recorded decisions: original cut T; violet/lime identity; Ink/Paper themes; native/static coming-soon site; center-led hero; planned-versus-shipped labels; no countdown, email collection or fabricated testimonials. See the [landing-page study](../research/landing-page-study.md) for the reference and adaptations.
