# Changelog

## Unreleased

### Website and identity

- Added the static coming-soon site and visual brand kit for GitHub Pages.
- Added original cut-T mark, outlined wordmarks, app icon, favicon, dark/light banners and social card.
- Added Ink and Paper themes through shared semantic design tokens.
- Added self-hosted Inter and Space Grotesk fonts with OFL notices.
- Added brand guidelines and reusable website/future-editor component contracts.
- Reworked the README into short sections, a release table and expandable technical detail.
- Added contributor instructions, private security-report guidance and a pull-request template.

### Accessibility and truthfulness

- Roadmap uses working anchors without JavaScript, with keyboard tabs as progressive enhancement.
- Theme preference persists locally; reduced motion disables smooth scroll and shortens transitions.
- Fixed hidden SVG/control layout, narrow-header wrapping, light-theme link/button specificity and tinted-label contrast.
- Labeled concept illustrations and future capabilities; no fake downloads, testimonials, ratings or release dates.

### Site and docs readability

- Redesigned the landing page using CapCut's site as a layout reference only: a large centered hero, an editor concept drawn in HTML, CSS and SVG, a numbered v0.1 accordion, the three planned canvas shapes, a large-type roadmap list, four promise cards, sourced project numbers, the stack table, a closing band and a floating status bar. No CapCut assets, copy, stats or testimonials.
- New "golden hour" website palette: Dusk (dark) and Cream (light) themes with ember, gold and rose accents and a sunset-gradient primary button. The logo keeps violet and lime. All pairs measured to WCAG AA and recorded in the brand guide.
- Original SVG artwork: a theme-tinted hero landscape whose sun carries three cut bands, five drawn stand-in scenes used as editor footage, promise-card drawings, a roadmap sun arc that follows the selected phase, and a drawn sunset in the closing band. No stock photos or remote images.
- Motion: one-time sun rise and editor entrance; scroll-linked sun sink and ridge drift where supported. All disabled under reduced motion.
- Rewrote the roadmap, plan, research and fidelity docs into short sections, tables and "At a glance" summaries. Requirements, IDs, numbers, gates and links are unchanged.
- Removed em dashes from docs, SVG titles, and HTML/CSS comments, and replaced banned filler words.

### Plan updates

- Crates, binaries and paths now use the `tcut-*` prefix (`tcut-core`, `tcut-engine`, `apps/tcut-desktop`, ...) instead of `lce-*`; project folders use `.tcutproj/`. Only names changed.
- The app code lives in a separate repository, `tcut-editor/`, prepared with an agent manual, a read-only spec snapshot, per-version execution plans and a quality gate.
- The starter plan now records that a newer matched binding family exists (gtk4 0.11, glib 0.22, gstreamer 0.25, gst-plugin-gtk4 0.15); T01 chooses one family and records it in the engine ADR.

The desktop video editor remains unimplemented. These changes do not qualify a renderer or complete Phase 0.
