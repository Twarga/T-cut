# T-cut

T-cut is a CapCut alternative: a free and open-source video editor for Linux, built to feel familiar to CapCut Desktop users.

**Status: planning complete, implementation not started.** This repository currently contains the design and research documents only. There is no application to build or install yet.

## Goal

A CapCut user should open T-cut on Linux and already know where things are: the Home screen with their projects, the import panel, the player, the properties panel, the timeline, and export.

What stays the same: screen layout, panel relationships, control grouping, and the create → edit → save → export workflow.

What is different on purpose: T-cut branding and original assets, no account, no subscription, no watermark, no ads, no paid feature unlocks, native Linux file dialogs, and no fake cloud or AI services.

## Planned stack

| Layer | Choice |
|---|---|
| Application and project logic | Rust 2024 |
| Desktop UI | GTK4 via Rust bindings |
| Media playback and rendering | GStreamer / GES (**conditionally accepted**, see below) |
| Text shaping | Pango / HarfBuzz / FreeType |
| Project format | Open versioned folder with JSON snapshots and a journal |
| Packaging | Flatpak first |
| Optional AI | Local, isolated, rights-audited model packs |

The media backend is not final. Phase 0 must prove exact frame and audio timing before GES is accepted. A prior CLI test produced **121 frames for a nominal 4-second 30fps render instead of 120**; that discrepancy must be explained or the backend replaced.

## Roadmap

| Phase | Version | What a user can do |
|---|---|---|
| 0 | *internal only* | Nothing yet. Prove the media engine counts frames and samples correctly |
| 1 | **v0.1** | Home and projects, import, trim/split/move, basic canvas and position, static titles, music volume and fades, save/recovery/relink, real export |
| 2 | **v0.2** | Full snapping, magnet and linked clips, richer static text and audio, manual captions with SRT/VTT |
| 3 | **v0.3** | Keyframes, speed and reverse, transitions, masks and chroma key, color grading, animated text, recording, templates |
| 4 | **v0.4** | Optional local AI: captions, translation, background removal, tracking, audio cleanup, beats, TTS, upscaling |
| 5 | **v1.0** | Stabilize and document the supported local workflows |

Optional sync, review, collaboration, authorized publishing, and generative video are tracked for after v1.0 with their own rights and infrastructure gates.

No release dates are promised. Phase 0 can change the backend decision, which changes everything downstream.

## Documentation

Start here:

- [Release roadmap and MVP contract](docs/plan/release-roadmap.md) — authoritative version scope and exact v0.1 acceptance
- [Master plan](docs/plan/README.md) — build order, decisions, and evidence gates

Reference detail:

- [Product specification](docs/plan/product-spec.md) — 40 feature families, workflows, boundaries
- [Architecture and data contracts](docs/plan/architecture.md) — crates, ownership, exact time, project format
- [Implementation plan](docs/plan/implementation.md) — 40 work packages with dependencies and verification
- [Starter plan](docs/plan/starter-plan.md) — Phase 0 commands, manifests, and 12 qualification fixtures
- [UI and interaction contract](docs/plan/ui-contract.md) — layout, timeline modes, inspector, keyboard, accessibility
- [Quality and release plan](docs/plan/quality-release.md) — corpus, budgets, security, packaging, release blockers
- [Source and evidence ledger](docs/plan/sources.md) — what is documented, observed, or proposed

Interface research:

- [CapCut UI research](docs/research/research.md) — screen-by-screen study of 28 public screenshots
- [Screenshot index](docs/research/screenshot-index.md) — image sources and observations
- [Fidelity contract](docs/research/fidelity-contract.md) — 24 screen states and 14 interaction acceptance scenarios

## Evidence policy

Documents label claims as **documented** (upstream docs state it), **visual** (public screenshot inspected), **observed** (an identified build was exercised), **proposed** (our own decision), or **gate** (evidence still required).

No CapCut executable was run for this research. Public screenshots span multiple application versions and are kept separate rather than merged into a single claim of exactness. Before advertising a verified compatibility profile, behavior must be recorded against one lawfully obtained pinned CapCut Desktop build.

## Legal position

T-cut implements generic editing conventions and a familiar workflow independently. It does not copy CapCut code, branding, icons, catalog assets, fonts, or proprietary models, and it does not bypass accounts, subscriptions, or provider restrictions.

Original application code is licensed **GPL-3.0-or-later** (see [LICENSE](LICENSE)). Third-party dependencies, bundled assets, and any model packs carry their own licenses and require separate audit before redistribution. Final product naming and presentation still need trademark review.

## Contributing

Implementation has not begun, so there is no build to run yet. The useful contribution right now is review: read the [release roadmap](docs/plan/release-roadmap.md) and open an issue if a requirement, dependency, or evidence gate looks wrong.
