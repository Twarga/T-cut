# t-cut Release Roadmap and MVP Implementation Plan

> **For agentic workers:** Execute the work packages in [implementation.md](implementation.md), following their dependencies and the release slices below. Checkbox steps represent future implementation, not completed work.

**Goal:** Ship a free/open-source Linux video editor whose whole application feels familiar to CapCut Desktop users, then expand its tools through evidence-gated releases.
**Architecture:** Rust owns project state, time and commands; GTK4 renders the desktop interface; one qualified native media backend supplies playback/rendering. Local editing does not depend on accounts, hosted services or AI models.
**Tech Stack:** Rust 2024, GTK4/GLib, GStreamer/GES subject to qualification, open versioned projects, isolated export/model workers and Flatpak.
**Spec:** [product-spec.md](product-spec.md), [UI contract](ui-contract.md), [screenshot-backed fidelity contract](../research/fidelity-contract.md).

Finalized planning baseline: **2026-10-12**. This document controls version boundaries where older milestone wording differs. It does not certify implementation, backend fitness, trademark clearance or exact current CapCut compatibility.

## Global Constraints

- Free, open-source, offline-capable core; no mandatory account, subscription, watermark, ads or paid feature unlocks.
- Primarily Rust does not mean every codec, GUI library and inference runtime must be pure Rust.
- Save/recovery, correct timing, undo and preview/export equivalence are foundational requirements.
- No hidden cloud fallback, silent loss of effects, counterfeit output, or unmeasured quality/performance claims.
- Whole-application familiarity starts in the MVP: Home, project lifecycle, editor, settings, recovery and export, not just a generic timeline.
- GPL-3.0-or-later is the selected application-license baseline; audit every dependency, model and asset before redistribution. No extra noncommercial restriction is added to the GPL.
- The name is **t-cut**. Earlier `lce-*` identifiers are internal future-crate names, not a second public product. Do not modify PhotoCraft to bootstrap this editor.

## 1. Version scope in plain language

Versions are capability gates, not dates or promises about how quickly development will finish. An unmet required capability blocks that release; optional capabilities remain visibly tracked rather than silently disappearing.

| Version | Meaning | User-visible additions | Required proof |
|---|---|---|---|
| Engineering qualification, not a public editor | Prove the chosen foundation works | Real GTK window playing and exporting known media; investigate retime/nesting/color hard paths | T01 output, frame/sample checks, ownership and codec/license inventory; select one backend |
| **v0.1 — MVP / local alpha** | Make and save a simple video | Familiar Home; create/open/manage projects; import; multitrack trim/split/move; basic canvas/transform, static text, music volume/fades; save/recovery/relink; actual export | Complete MVP journey below, UI acceptance at shipped scope, installed offline package and output inspection |
| **v0.2 — Everyday editing alpha** | Make ordinary editing faster and more predictable | Full snap/magnet/link controls; complete static geometry; richer static text/audio; manual captions and SRT/VTT | Mode/lock/undo scenarios, typography and audio boundaries, subtitle round trips |
| **v0.3 — Creator beta** | Build polished edits with animation and composition | Keyframes/easing, speed/reverse/freeze, compounds, transitions, masks/chroma, color/LUTs/scopes, deterministic effects, animated text, advanced mixing, recording, original templates/covers, richer export, optional qualified auto captions and OTIO | Applicable W01–W10, preview/export comparison, recovery, installed-package and accessibility gates |
| **v0.4 — Local AI beta** | Optional assistance without giving up control | Translation/transcript editing, tracking/reframe/stabilization, matting/removal, audio cleanup/separation, beats, licensed TTS/dubbing, highlights/storyboards, restoration | Exact model rights and language/hardware matrix, cancellation, reviewed nondestructive application and offline installed-model scenarios |
| **v1.0 — Stable local editor** | Recommend the supported local workflows for regular use | Stabilize and document qualified local features; no requirement to invent unavailable AI rights or hidden services | No unresolved release-blocking data loss, timing, security, rights or supported-workflow defects; measured support matrix and migrations |
| **Post-1.0 ecosystem releases** | Extend beyond a single local editor | Qualified generation/avatars, broader draft interoperability, optional self-hosted sync/review/collaboration and authorized publishing | Independent rights, representative fixtures, conflict resolution, credentials/approval and operating policy |

A v1.0 local-editor release is **not** a declaration that every CapCut service or catalog has been reproduced. Failed model/provider qualification remains a named unavailable capability with an owner and prerequisite. Deterministic local editing never secretly depends on it.

## 2. Exact v0.1 boundary

### Included

- Home with an empty and populated Projects view; create/open/recent, rename, independent duplicate, safe Trash/Restore and return Home.
- Familiar editor structure from screenshot cohort A: horizontal left-panel tool categories, inner category list, Player, contextual inspector and full-width timeline. Original branding/assets; no Pro/login clutter.
- Local video/audio/image import with clear unsupported/corrupt-file failures; library search, thumbnails/waveforms, bounded cache and usable proxies.
- Multiple video/audio tracks; select/multi-select, move, trim, split, delete, duplicate, basic snapping, track lock/mute/visibility, undo/redo. Full CapCut mode semantics are v0.2, not silently claimed in v0.1.
- Play/pause, seek, frame-step, source/sequence preview, volume and visible buffering/errors.
- Static position/scale, fit/fill and 16:9, 9:16 and 1:1 canvas presets, with explicit project rate. Full geometry controls complete in v0.2.
- Static editable title text with font, size, color, alignment and correct Unicode shaping; no mandatory animation or AI.
- Audio gain and fade-in/fade-out on ordinary clips, with correct mixed export. No mandatory automation, ducking or EQ.
- Versioned project save/open, autosave, crash recovery, missing-media relink, per-project identity/locking and safe collection/portability from T08.
- Working app settings, project Modify, discoverable/remappable shortcuts and accessible keyboard alternatives.
- Two-column export settings, destination/overwrite checks, progress, cancel/retry, truthful failures and open output/folder.
- At least one distributable, independently checked video/audio export profile. H.264/AAC MP4 is the desired interchange target, conditional on shipped codec/legal qualification; a qualified open-codec profile can establish rendering, but the release must state explicitly if MP4 is unavailable. Never silently substitute container/codec under an MP4 label.
- Actual Flatpak installation and offline editing, with permissions, source/license notices and documented supported media.

### Not required for v0.1

Auto captions, transitions, keyframe animation, speed ramps, reverse, compounds, masks, advanced color, AI processing, stock catalogs, recording, template galleries, cloud accounts, collaboration and publishing. Their placement and data-model extension points are planned, but fake working controls are prohibited.

### MVP acceptance project

Use owned/synthetic inputs: three short phone-style clips including portrait/rotation metadata, one image, one music file and a Unicode title. Record exact hashes and project format.

1. Start the installed application offline; create a project from Home without registration or a compulsory setup wizard.
2. Import inputs; set a 9:16 canvas; arrange clips on the timeline and overlay the image/title.
3. Trim, split, reorder, adjust fit/position/scale, change title text and apply music gain/fades.
4. Undo/redo an edit; verify selected-object inspector and preview agree with the model.
5. Rename and duplicate the project; edit the copy; confirm the original did not change.
6. Return Home, reopen and inspect persistent edits. Trash/Restore the copy without deleting original media.
7. Move one source file; reopen and relink without losing timeline state.
8. Interrupt a save under controlled conditions; recover the last durable/recoverable revision without corrupting the original.
9. Export through the familiar dialog; independently decode output and check duration, edit boundaries, text/image presence and audio alignment.
10. Exercise cancellation, unwritable destination and unsupported input; none may produce counterfeit success or destroy prior output.
11. Repeat essential editing actions with keyboard and verify IME focus prevents timeline shortcuts firing inside text fields.

This is the **MVP scenario**, not full W01/W08: W01 includes a transition and W08 includes a caption model. Those full workflows gate the creator/AI releases when those features ship.

## 3. File ownership and dependency-safe early slices

Keep the 40 work packages; split only the following early subsets so the MVP does not depend on all advanced effects. These are real implementations in the same eventual modules, not duplicate temporary code.

| Slice | Consumes | Produces / future files | Verification and downstream reuse |
|---|---|---|---|
| T10-basic | T02 exact-time/project model; T04/T05 selected clips and edits; T07 render path | Static position/scale, fit/fill and canvas; `crates/lce-effects/src/{transform,canvas}.rs`, `apps/lce-desktop/src/player/handles.rs` | Known corner/center placement and crop boundaries in preview and rendered frames; T10 extends these modules |
| T18-basic | T10-basic geometry; T02 commands; T07 render path | Static shaped text; `crates/lce-effects/src/text.rs`, `apps/lce-desktop/src/panels/text.rs`, font manifest | RTL/CJK/combining text and missing-font behavior; saved text equals rendered text; T18 animation later consumes T11, not vice versa |
| T19-basic | T02 commands/time; T05 edits; T07 render path | Clip gain/fades/mix; `crates/lce-engine/src/audio.rs`, `crates/lce-effects/src/audio_gain.rs`, `apps/lce-desktop/src/panels/audio.rs` | Known impulses and fade envelope at explicit sample boundaries; T19 automation/EQ/buses extend the same path |
| T20-manual | T08 project/recovery; T18 static text; T19 timing | Manual captions and SRT/VTT, no inference dependency | Subtitle roundtrip/timing plus actual display/export; transcription attaches later through reviewed commands |
| T31-schema | T08 projects; qualified slots from T13/T14/T18/T20 when used | Declarative template schema/core in T31's existing files | Rejected invalid slot/time/license references; T27 storyboard assembly consumes this core before full template-gallery polish |

No public Rust API is frozen by this release table. Existing domain/engine contracts in [architecture.md](architecture.md) remain authoritative; implementers must not invent a second project model for these slices.

### MVP integration order

- [ ] T01 selects the backend through real playback/render qualification; T37–T40 start their reference, accessibility, threat-model, packaging and provenance baselines.
- [ ] T02 establishes exact time, typed edits, snapshot/journal and recovery primitives.
- [ ] T03 establishes real discovery/import and bounded media failures.
- [ ] T04 builds real Home/project lifecycle and the familiar workspace with loaded media and transport. Text/audio inspector controls land with their actual feature slices, not fabricated state.
- [ ] T05 implements basic timeline edits and undo; T06 adds media browsing/proxies/caches.
- [ ] T07 renders a real project and implements export setup/progress/error/cancellation.
- [ ] T08 integrates relink/recovery/collection and the scenario runner.
- [ ] T10-basic, T18-basic and T19-basic complete the MVP's canvas/title/music behavior in the existing modules.
- [ ] Run the eleven-step MVP project and applicable A01–A14 fidelity scenarios on the installed package. Keep unshipped advanced categories absent rather than pretending they work.
- [ ] Close MVP portions of T37–T40; publish supported media/hardware, known limitations and exact exercised evidence.

Within a release, execute the dependency graph, not numeric ordering alone. T04 does not wait for all later features to close its own playback/Home work; the release integration gate waits for the relevant real slices.

## 4. Complete task-to-release ownership

“Entry” is the first release requiring work; “closure” qualifies the complete relevant scope. Cross-cutting tasks never wait until v1.0 to begin.

| Tasks | Entry and closure |
|---|---|
| T01 | Engineering qualification before v0.1 |
| T02–T08 | v0.1; later project migrations and export profiles remain integrated obligations |
| T09 | v0.2 full mode contract; v0.1 only basic snapping from T05 |
| T10 | Basic v0.1; full static geometry v0.2 |
| T11–T16 | v0.3 animation, retiming, nesting, transitions, compositing and color; respect dependencies inside the release |
| T17 | Deterministic effects v0.3; AI-dependent retouch closes with T23 in v0.4 |
| T18 | Basic v0.1; richer static typography v0.2; animated/composited scope v0.3 |
| T19 | Basic v0.1; static audio controls v0.2; automation, routing and advanced mixing v0.3 |
| T20 | Manual captions/subtitles v0.2; qualified optional transcription/word timing v0.3 |
| T21–T27 | v0.4; T27 recipe assembly consumes T31 schema/core from v0.3 |
| T28 | v0.3 real portal/device recording |
| T29 | v0.4 evaluated restoration; related delivery profiles qualify afterward |
| T30 | Post-1.0 generation/avatar package, independently gated |
| T31 | v0.3 original templates/covers and early declarative schema |
| T32 | v0.3 core delivery profiles; restoration-dependent profiles close after T29 |
| T33 | v0.3 native/OTIO/subtitle interoperability; version-bounded CapCut draft adapter research remains separately gated post-1.0 |
| T34–T36 | Post-1.0 optional sync/review/collaboration/publishing; never gate local editing |
| T37–T40 | Start with qualification; close shipped scope at every release, with stable local closure at v1.0 |

F01–F40 retain their owner mapping in the product specification. No family is deleted by staging or by the local v1.0 boundary.

## 5. UI reference lock and acceptance

- Primary layout target is research cohort A, with screenshot S03 for the populated workspace and S01/S02/S07 for Home, empty editor and export.
- Supplementary screenshots establish additional states, not permission to combine incompatible versions into one claim of exactness.
- Match screen hierarchy, control grouping, object-selection behavior and panel proportions before decorative polish.
- UI01–UI11 and UI16–UI24 are MVP working surfaces at their stated scope; UI12–UI15 gain their real tools in later versions.
- A01–A14 are interaction checks against a running editor. Capture images/action traces; model-only tests cannot certify them.
- Full familiarity evaluation W01/W02 from the product specification applies when transitions and captions ship, not to v0.1's smaller feature set.
- Before advertising an exact compatibility profile, record a lawfully obtained pinned CapCut Desktop build: version, OS, locale, scaling, window size and selected state. Until then, label screenshot-backed layout versus proposed behavior honestly.
- Current gaps include full Menu/Modify/shortcut dialogs, Trash recovery states and some gesture/curve semantics. Missing exact reference evidence does not block a safe original implementation; it blocks claims that that detail is verified identical.

## 6. Stack lock and decision gates

| Area | Starting decision | Qualification rule |
|---|---|---|
| Language | Rust 2024 | Commit toolchain and dependency lockfiles once T01 resolves tested versions |
| UI | GTK4 via Rust bindings, custom workbench styling | Prove dense pane layout, accessible controls, IME and scaling; no unrelated toolkit rewrite merely for familiar styling |
| Playback/render | GStreamer/GES, one owned context and isolated render jobs | T01 checks exact timing, seeks, audio, endpoints, nesting/retiming/color; evaluate MLT only if a hard gate fails and record one selected backend |
| Media path | Native negotiated GPU path where qualified; truthful software/proxy path | Measure copies, latency and driver support; no blanket zero-copy/4K claim |
| Projects | Versioned local format, atomic snapshots/journal, stable IDs | Recovery, migration, locking, missing-media and malicious-input tests |
| Text | Native shaping/font stack with the same layout semantics in preview/export | RTL/CJK/combining/fallback corpus and font license manifest |
| AI | Optional isolated local workers and exact model manifests | No pack without redistribution/commercial-use rights and actual quality/hardware evaluation |
| Distribution | Flatpak first | Installed-package tests, portals, codec inventory, notices/source and clean upgrade |
| Services | Optional later self-hostable services where feasible | Credentials, cost and conflict/privacy policy must be explicit; offline core unaffected |

Binding families/native floors remain those documented in [architecture.md](architecture.md) and [starter-plan.md](starter-plan.md). They are a tested-manifest starting proposal, not a claim of latest or qualified installed binaries. No extra web UI, second compositor or cloud database is added to the MVP.

## 7. Release blockers and evidence packet

A release cannot ship while its supported scenarios have an unresolved data-loss defect, wrong edit/render boundary, incorrect audio alignment, preview/export semantic mismatch, unsafe import, missing required license/source obligation or unusable essential keyboard path. Unsupported content gets an explicit error, not silent effects removal.

For every release retain:

1. Exact source revision, toolchain, lockfiles, native/plugin/driver/runtime versions and build flags.
2. Capability matrix with implemented, qualified, unavailable-with-reason and not-yet-shipped states; no blanket parity percentage.
3. Corpus hashes/licenses, actual scenario actions and machine-readable output checks.
4. Home/editor/settings/export screenshots and interaction traces at known dimensions/scaling.
5. Crash/recovery, missing-media, cancellation, disk/permission and offline results.
6. Installed Flatpak and upgrade/migration results on the supported hardware/runtime matrix.
7. Dependency/model/asset rights, notices, source-availability and privacy inventory.
8. Known limitations and release notes that match the exercised build.

Performance budgets in the quality plan are targets until measured. No calendar deadline is implied by a version number.

## 8. Final execution handoff

**First assignment:** execute T01 from the starter plan in a new, independent application repository. Do not generate the whole editor, download large models or build a cloud service first. Preserve the earlier observed 121-frame nominal four-second discrepancy as a qualification case; never assume it was fixed by changing the expected result.

**First review gate:** working native preview plus independently inspected rendered media and a documented selected backend. **First product gate:** the full v0.1 MVP journey in a real installed application, not a screenshot-only shell.

This finalization changes planning documents only. Engineering gates remain future work with explicit evidence requirements, not missing decisions concealed behind a “complete product” claim.
