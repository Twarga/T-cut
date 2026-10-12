<picture>
  <source media="(prefers-color-scheme: light)" srcset="docs/assets/brand/banner-light.svg">
  <source media="(prefers-color-scheme: dark)" srcset="docs/assets/brand/banner.svg">
  <img src="docs/assets/brand/banner.svg" alt="T-cut: the CapCut-familiar video editor for Linux. Free, open source and offline. Planning complete; engine qualification next." width="1280" height="360">
</picture>

<p align="center">
  <strong>Linux first · Rust + GTK4 · GPL-3.0-or-later</strong><br>
  <a href="https://twarga.github.io/T-cut/">Website</a> ·
  <a href="docs/plan/release-roadmap.md">Roadmap</a> ·
  <a href="https://twarga.github.io/T-cut/brand/">Brand kit</a> ·
  <a href="https://github.com/Twarga/T-cut/issues">Discuss an idea</a>
</p>

# T-cut

**A free, open-source video editor planned for Linux, with a workflow familiar to CapCut Desktop users.**

> **Coming soon.** The plans, branding and website are ready. The desktop editor is not built yet. There is no app to install or download.

## Start here

| You want to… | Open this |
|---|---|
| Get the short version | [Visit the website](https://twarga.github.io/T-cut/) |
| See the versions and their results | [Read the release roadmap](docs/plan/release-roadmap.md) |
| Understand the first engineering task | [Read Phase 0](docs/plan/starter-plan.md) |
| Use the logo, colors or themes | [Open the brand guide](docs/brand/brand-guidelines.md) |
| Help shape the project | [Contribution guide](CONTRIBUTING.md) |

## The goal

Know CapCut? You should recognize where to create a project, import footage, edit the timeline and export. That includes the **Home screen and project management**, not just four familiar-looking panels.

T-cut will use its own name, logo, icons and licensed assets. The local editor is planned to work offline, without a mandatory account, subscription, watermark, ads or paid feature unlocks.

## Releases, in plain language

| Phase | Release | Result to expect |
|---|---|---|
| **0 · Test the foundation** | Internal only | Prove playback/export timing and select one media engine |
| **1 · Basic editor** | **v0.1** | Home, projects, import, cut/trim/move, simple titles, music, save/recover and export |
| **2 · Everyday editing** | **v0.2** | Full snapping/magnet/link controls, richer text/audio and manual subtitles |
| **3 · Creator tools** | **v0.3** | Animation, speed/reverse, transitions, masks, color, recording and templates |
| **4 · Local AI** | **v0.4** | Optional qualified translation, tracking, cutout, cleanup, TTS and restoration |
| **5 · Stable local editor** | **v1.0** | Tested supported workflows, documented hardware/media and safe upgrades |

**No release dates yet.** AI features need usable models with verified rights. Optional cloud collaboration, publishing and generation have separate post-1.0 gates. The [full roadmap](docs/plan/release-roadmap.md) defines the required evidence for each version.

## The planned stack

| Responsibility | Technology |
|---|---|
| Project state, editing and undo | **Rust 2024** |
| Native Linux interface | **GTK4** through Rust bindings |
| Playback and rendering | **GStreamer / GES**, conditional on Phase 0 |
| Text shaping | **Pango / HarfBuzz / FreeType** |
| Project files | **Readable JSON snapshots + journal** |
| Distribution | **Flatpak first** |
| Optional AI | **Isolated local workers and license-audited model packs** |

<details>
<summary><strong>Why is the video engine still conditional?</strong></summary>

An earlier CLI render of a nominal four-second, 30 fps timeline produced **121 frames / 4.033333 seconds**, rather than the expected 120 frames. Phase 0 must explain and resolve that discrepancy or reject the engine. A simple “drop the last frame” workaround does not establish correctness.

The qualification plan contains 12 known-answer fixtures, independent output checks and a written backend decision. See [starter plan](docs/plan/starter-plan.md).

</details>

## Brand and themes

The original **cut T** mark pairs violet with a lime slice. The system includes **Ink/dark** and **Paper/light** themes, outlined wordmarks, app icon, favicon, repository banners and a social-preview card.

- [Brand guidelines and asset links](docs/brand/brand-guidelines.md)
- [Design system and component contracts](docs/brand/design-system.md)
- [Shared theme tokens](docs/assets/tokens.css)

## Run the website locally

The site needs **Python 3**, not a Rust build or a Node package install.

```sh
git clone https://github.com/Twarga/T-cut.git
cd T-cut
python3 -m http.server 8000 --directory docs
```

Open **http://localhost:8000/**. This runs the coming-soon website, not the editor.

<details>
<summary><strong>All planning and research documents</strong></summary>

### Build plan

- [Master plan](docs/plan/README.md)
- [Release roadmap and MVP acceptance](docs/plan/release-roadmap.md)
- [Product specification](docs/plan/product-spec.md)
- [Architecture and data contracts](docs/plan/architecture.md)
- [40 implementation work packages](docs/plan/implementation.md)
- [Engineering starter plan](docs/plan/starter-plan.md)
- [UI and interaction contract](docs/plan/ui-contract.md)
- [Quality and release gates](docs/plan/quality-release.md)
- [Source and evidence ledger](docs/plan/sources.md)

### Interface and website research

- [CapCut Desktop UI study](docs/research/research.md)
- [28-screenshot index](docs/research/screenshot-index.md)
- [24 screen states and 14 interaction scenarios](docs/research/fidelity-contract.md)
- [Landing-page reference and adaptations](docs/research/landing-page-study.md)

The desktop study used public screenshots from different versions. It did not exercise a CapCut Desktop build. A verified compatibility claim requires separate pinned-build testing.

</details>

## Contribute and license

Start with [CONTRIBUTING.md](CONTRIBUTING.md). Report a security concern using [SECURITY.md](SECURITY.md). Review website changes with actual browser screenshots and keyboard checks.

Original code and original project material use **GPL-3.0-or-later**: [LICENSE](LICENSE). Bundled fonts retain **SIL OFL-1.1**: [third-party notices](THIRD_PARTY_NOTICES.md).

T-cut is independent and **not affiliated with CapCut or ByteDance**. No CapCut code, branding, catalog assets or proprietary models are included. Product naming and final presentation still require trademark review.
