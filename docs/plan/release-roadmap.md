# t-cut Release Roadmap

> **Planning only.** Nothing in this file is built. Versions are capability gates, not dates. Planning baseline: **2026-10-12**.

## At a glance

- **Now:** Phase 0, engine qualification. There is no public editor yet.
- **First public target:** v0.1, a simple local video editor. Make, edit, save, export.
- **Not promised:** release dates, full CapCut parity, or AI features without verified model rights.
- **Next step:** T01 from the [starter plan](starter-plan.md).

**Related:** [product spec](product-spec.md) · [UI contract](ui-contract.md) · [fidelity contract](../research/fidelity-contract.md) · [work packages](implementation.md) · [architecture](architecture.md) · [sources](sources.md)

<details>
<summary><strong>Project basics</strong></summary>

- **Goal:** a free, open-source Linux video editor whose whole app feels familiar to CapCut Desktop users. Then expand its tools through evidence-gated releases.
- **Architecture:** Rust owns project state, time, and commands. GTK4 draws the interface. One qualified native media backend handles playback and rendering. Local editing does not need accounts, hosted services, or AI models.
- **Tech stack:** Rust 2024, GTK4/GLib, GStreamer/GES (subject to qualification), open versioned projects, isolated export and model workers, Flatpak.
- **Agents:** execute the work packages in [implementation.md](implementation.md), following their dependencies. Checkboxes in this file are future work, not completed work.

</details>

> **This file does not claim:** a working implementation, a backend that fits, trademark clearance, or exact current CapCut compatibility.

## Global constraints

- Free, open-source, offline-capable core.
- No mandatory account, subscription, watermark, ads, or paid feature unlocks.
- "Mostly Rust" does not mean every codec, GUI library, or inference runtime must be pure Rust.
- Save and recovery, correct timing, undo, and preview/export match are foundations, not extras.
- No hidden cloud fallback, silent loss of effects, fake output, or unmeasured quality or performance claims.
- Whole-app familiarity starts in the MVP: Home, project lifecycle, editor, settings, recovery, and export. Not just a generic timeline.
- License: GPL-3.0-or-later. Audit every dependency, model, and asset before redistribution. No extra noncommercial limit is added to the GPL.
- The name is **t-cut**. Crates and paths use the `tcut-*` prefix (earlier drafts said `lce-*`). Do not modify PhotoCraft to bootstrap this editor.

## 1. Version scope in plain language

Versions are capability gates. An unmet required capability blocks that release. Optional capabilities stay visibly tracked. They are never silently dropped.

### Engineering qualification (not a public editor)

- **Goal:** prove the foundation works.
- **Adds:** a real GTK window that plays and exports known media. Investigate the hard paths: retime, nesting, color.
- **Proof:** T01 output, frame and sample checks, ownership and codec or license inventory. Select one backend.

### v0.1: MVP, local alpha

- **Goal:** make and save a simple video.
- **Adds:** familiar Home. Create, open, and manage projects. Import. Multitrack trim, split, and move. Basic canvas and transform. Static text. Music volume and fades. Save, recovery, relink. Real export.
- **Proof:** the full MVP workflow (section 2), UI acceptance at shipped scope, an installed offline package, and output inspection.

### v0.2: Everyday editing, alpha

- **Goal:** ordinary editing that is faster and more predictable.
- **Adds:** full snap, magnet, and link controls. Complete static geometry. Richer static text and audio. Manual captions. SRT and VTT.
- **Proof:** mode, lock, and undo scenarios. Typography and audio boundaries. Subtitle round trips.

### v0.3: Creator beta

- **Goal:** polished edits with animation and composition.
- **Adds:** keyframes and easing. Speed, reverse, freeze frames. Compounds. Transitions. Masks and chroma key. Color, LUTs, scopes. Deterministic effects. Animated text. Advanced mixing. Recording. Original templates and covers. Richer export. Optional qualified auto captions. OTIO.
- **Proof:** applicable W01 to W10 workflows, preview and export comparison, recovery, installed-package and accessibility gates.

### v0.4: Local AI beta

- **Goal:** optional assistance that keeps you in control.
- **Adds:** translation and transcript editing. Tracking, reframe, stabilization. Matting and removal. Audio cleanup and separation. Beat detection. Licensed TTS and dubbing. Highlights and storyboards. Restoration.
- **Proof:** exact model rights. A language and hardware matrix. Cancellation. Reviewed, non-destructive application. Offline installed-model scenarios.

### v1.0: Stable local editor

- **Goal:** recommend the supported local workflows for regular use.
- **Adds:** stabilized, documented local features. No need to invent AI rights or hidden services.
- **Proof:** no unresolved release-blocking defects in data loss, timing, security, rights, or supported workflows. A measured support matrix. Migrations.

### Post-1.0 releases

- **Goal:** reach beyond one local editor.
- **Adds:** qualified generation and avatars. Broader draft interoperability. Optional self-hosted sync, review, and collaboration. Authorized publishing.
- **Proof:** independent rights, representative fixtures, conflict resolution, credentials and approval, and an operating policy.

> **Not a claim:** a v1.0 local editor does not reproduce every CapCut service or catalog. A failed model or provider qualification stays a named unavailable capability, with an owner and a prerequisite. Local editing never secretly depends on it.

## 2. Exact v0.1 boundary

### Included

**Home and projects**
- Home with empty and populated Projects views.
- Create, open, recent, rename, independent duplicate, safe Trash and Restore, return Home.

**Editor**
- Familiar structure from screenshot cohort A: horizontal left-panel categories, an inner category list, Player, contextual inspector, full-width timeline.
- Original branding and assets. No Pro or login clutter.

**Media**
- Local video, audio, and image import. Clear errors for unsupported or corrupt files.
- Library search, thumbnails, waveforms, bounded cache, usable proxies.

**Timeline**
- Multiple video and audio tracks.
- Select, multi-select, move, trim, split, delete, duplicate.
- Basic snapping. Track lock, mute, visibility. Undo and redo.
- Full CapCut mode semantics are v0.2. v0.1 does not claim them.

**Playback**
- Play, pause, seek, frame-step, source and sequence preview, volume.
- Visible buffering and errors.

**Canvas and text**
- Static position and scale. Fit and fill. 16:9, 9:16, and 1:1 presets. Explicit project rate.
- Full geometry arrives in v0.2.
- Static editable title: font, size, color, alignment, correct Unicode shaping. No mandatory animation or AI.

**Audio**
- Gain, fade-in, and fade-out on ordinary clips, with correct mixed export.
- No mandatory automation, ducking, or EQ.

**Save and recovery**
- Versioned project save and open. Autosave. Crash recovery.
- Missing-media relink. Per-project identity and locking. Safe collection and portability from T08.

**Settings and shortcuts**
- Working app settings. Project Modify.
- Discoverable, remappable shortcuts. Keyboard alternatives for everything.

**Export**
- Two-column export settings. Destination and overwrite checks.
- Progress, cancel, retry, honest failures, open output or folder.
- At least one distributable, independently checked video and audio profile.
- H.264/AAC MP4 is the target, if codec and legal qualification allow it. If MP4 is unavailable, the release says so.
- Never silently swap the container or codec under an MP4 label.

**Distribution**
- Real Flatpak install. Offline editing.
- Permissions, source and license notices, documented supported media.

### Not required for v0.1

Auto captions, transitions, keyframe animation, speed ramps, reverse, compounds, masks, advanced color, AI processing, stock catalogs, recording, template galleries, cloud accounts, collaboration, publishing.

Their extension points are planned. Fake working controls are not allowed.

### MVP acceptance project

Use owned or synthetic inputs: three short phone-style clips (with portrait and rotation metadata), one image, one music file, and a Unicode title. Record exact hashes and the project format.

1. Start the installed app offline. Create a project from Home with no registration or required setup wizard.
2. Import the inputs. Set a 9:16 canvas. Arrange clips on the timeline. Overlay the image and title.
3. Trim, split, reorder. Adjust fit, position, and scale. Change the title text. Apply music gain and fades.
4. Undo and redo an edit. Check that the inspector and preview match the model.
5. Rename and duplicate the project. Edit the copy. Confirm the original did not change.
6. Return Home. Reopen and check that edits persisted. Trash and Restore the copy without deleting the original media.
7. Move one source file. Reopen and relink without losing timeline state.
8. Interrupt a save under controlled conditions. Recover the last durable revision without corrupting the original.
9. Export through the familiar dialog. Decode the output independently. Check duration, edit boundaries, text and image presence, and audio alignment.
10. Test cancellation, an unwritable destination, and unsupported input. None may report false success or destroy prior output.
11. Repeat the essential editing actions by keyboard. Check that IME focus stops timeline shortcuts inside text fields.

> This is the **MVP scenario**, not full W01 or W08. W01 includes a transition. W08 includes a caption model. Those full workflows gate the creator and AI releases.

## 3. File ownership and early slices

Keep all 40 work packages. Only these early subsets are split out, so the MVP does not depend on every advanced effect. They are real implementations in the same eventual modules, not temporary copies.

| Slice | Depends on | Produces | Verification and reuse |
|---|---|---|---|
| T10-basic | T02 time and project model; T04/T05 selection and edits; T07 render path | Static position, scale, fit/fill, canvas. `crates/tcut-effects/src/{transform,canvas}.rs`, `apps/tcut-desktop/src/player/handles.rs` | Known corner and center placement, crop boundaries in preview and rendered frames. T10 extends these modules. |
| T18-basic | T10-basic geometry; T02 commands; T07 render path | Static shaped text. `crates/tcut-effects/src/text.rs`, `apps/tcut-desktop/src/panels/text.rs`, font manifest | RTL, CJK, combining text, and missing-font behavior. Saved text equals rendered text. T18 animation consumes T11 later, not the reverse. |
| T19-basic | T02 commands and time; T05 edits; T07 render path | Clip gain, fades, mix. `crates/tcut-engine/src/audio.rs`, `crates/tcut-effects/src/audio_gain.rs`, `apps/tcut-desktop/src/panels/audio.rs` | Known impulses and fade envelope at explicit sample boundaries. T19 automation, EQ, and buses extend the same path. |
| T20-manual | T08 project and recovery; T18 static text; T19 timing | Manual captions, SRT and VTT. No inference dependency. | Subtitle round trip, timing, and actual display and export. Transcription attaches later through reviewed commands. |
| T31-schema | T08 projects; qualified slots from T13, T14, T18, T20 when used | Declarative template schema and core in T31's existing files | Rejects invalid slot, time, and license references. T27 storyboard assembly uses this core before full template-gallery polish. |

> No public Rust API is frozen by this table. [architecture.md](architecture.md) stays authoritative. Do not invent a second project model.

### MVP integration order

- [ ] T01 selects the backend through real playback and render qualification. T37 to T40 start their reference, accessibility, threat-model, packaging, and provenance baselines.
- [ ] T02 sets up exact time, typed edits, snapshot and journal, and recovery primitives.
- [ ] T03 sets up real discovery, import, and bounded media failures.
- [ ] T04 builds real Home, project lifecycle, and the familiar workspace with loaded media and transport. Text and audio inspector controls land with their real feature slices, not as fake state.
- [ ] T05 adds basic timeline edits and undo. T06 adds media browsing, proxies, and caches.
- [ ] T07 renders a real project and implements export setup, progress, errors, and cancellation.
- [ ] T08 integrates relink, recovery, collection, and the scenario runner.
- [ ] T10-basic, T18-basic, and T19-basic complete the MVP canvas, title, and music behavior in the existing modules.
- [ ] Run the eleven-step MVP project and the applicable A01 to A14 fidelity scenarios on the installed package. Unshipped advanced categories stay absent, not faked.
- [ ] Close the MVP parts of T37 to T40. Publish supported media and hardware, known limits, and exact exercised evidence.

> Run in dependency order, not number order. T04 does not wait for later features to finish its own playback and Home work. The release gate waits for the relevant real slices.

## 4. Complete task-to-release ownership

- **Entry:** the first release that needs the work.
- **Closure:** the release where the full relevant scope is qualified.
- Cross-cutting tasks never wait until v1.0 to start.

| Tasks | Entry and closure |
|---|---|
| T01 | Engineering qualification, before v0.1 |
| T02 to T08 | v0.1. Later project migrations and export profiles stay integrated obligations. |
| T09 | v0.2 full mode contract. v0.1 has only basic snapping from T05. |
| T10 | Basic in v0.1. Full static geometry in v0.2. |
| T11 to T16 | v0.3: animation, retiming, nesting, transitions, compositing, color. Respect dependencies inside the release. |
| T17 | Deterministic effects in v0.3. AI-dependent retouch closes with T23 in v0.4. |
| T18 | Basic in v0.1. Richer static typography in v0.2. Animated and composited scope in v0.3. |
| T19 | Basic in v0.1. Static audio controls in v0.2. Automation, routing, advanced mixing in v0.3. |
| T20 | Manual captions and subtitles in v0.2. Qualified optional transcription and word timing in v0.3. |
| T21 to T27 | v0.4. T27 recipe assembly uses the T31 schema and core from v0.3. |
| T28 | v0.3: real portal and device recording. |
| T29 | v0.4: evaluated restoration. Related delivery profiles qualify afterward. |
| T30 | Post-1.0 generation and avatar package, independently gated. |
| T31 | v0.3: original templates, covers, early declarative schema. |
| T32 | v0.3: core delivery profiles. Restoration-dependent profiles close after T29. |
| T33 | v0.3: native, OTIO, and subtitle interoperability. A version-bounded CapCut draft adapter stays a separate post-1.0 research gate. |
| T34 to T36 | Post-1.0: optional sync, review, collaboration, publishing. They never gate local editing. |
| T37 to T40 | Start with qualification. Close shipped scope at every release. Stable local closure at v1.0. |

F01 to F40 keep their owner mapping in the [product specification](product-spec.md). No family is deleted by staging or by the local v1.0 boundary.

## 5. UI reference lock and acceptance

- **Layout target:** research cohort A. Screenshot S03 for the populated workspace. S01, S02, S07 for Home, empty editor, and export.
- Supporting screenshots add states. They do not allow mixing incompatible versions into one claim of exactness.
- Match hierarchy, control grouping, object selection, and panel proportions before decorative polish.
- UI01 to UI11 and UI16 to UI24 are MVP working surfaces at their stated scope. UI12 to UI15 get real tools in later versions.
- A01 to A14 are interaction checks on a running editor. Capture images and action traces. Model-only tests cannot certify them.
- Full familiarity checks W01 and W02 apply when transitions and captions ship. They do not apply to v0.1's smaller set.
- Before claiming an exact compatibility profile, record a lawfully obtained, pinned CapCut Desktop build: version, OS, locale, scaling, window size, selected state. Until then, label screenshot-backed layout separately from proposed behavior.

<details>
<summary><strong>Known reference gaps</strong></summary>

Missing: full Menu, Modify, and shortcut dialogs. Trash recovery states. Some gesture and curve semantics.

A missing reference does not block a safe original implementation. It does block any claim that the detail is verified identical.

</details>

## 6. Stack lock and decision gates

| Area | Starting decision | Qualification rule |
|---|---|---|
| Language | Rust 2024 | Commit toolchain and lockfiles once T01 resolves tested versions. |
| UI | GTK4 via Rust bindings, custom workbench styling | Prove dense pane layout, accessible controls, IME, and scaling. No toolkit rewrite just to look familiar. |
| Playback and render | GStreamer/GES, one owned context, isolated render jobs | T01 checks exact timing, seeks, audio, endpoints, nesting, retiming, color. Evaluate MLT only if a hard gate fails. Record one selected backend. |
| Media path | Native negotiated GPU path where qualified. Honest software or proxy path. | Measure copies, latency, driver support. No blanket zero-copy or 4K claim. |
| Projects | Versioned local format, atomic snapshots and journal, stable IDs | Recovery, migration, locking, missing-media, and malicious-input tests. |
| Text | Native shaping and font stack, same layout in preview and export | RTL, CJK, combining, and fallback corpus. Font license manifest. |
| AI | Optional isolated local workers, exact model manifests | No pack without redistribution and commercial-use rights, and real quality and hardware evaluation. |
| Distribution | Flatpak first | Installed-package tests, portals, codec inventory, notices and source, clean upgrade. |
| Services | Optional, self-hostable later where feasible | Credentials, cost, and conflict and privacy policy must be explicit. The offline core is unaffected. |

Binding families and native floors are in [architecture.md](architecture.md) and [starter-plan.md](starter-plan.md). They are a starting proposal to test, not a claim about the latest or qualified installed binaries. The MVP adds no extra web UI, second compositor, or cloud database.

## 7. Release blockers and evidence packet

### A release cannot ship with any of these

- Unresolved data-loss defect.
- Wrong edit or render boundary.
- Incorrect audio alignment.
- Preview and export semantics that do not match.
- Unsafe import.
- Missing required license or source obligation.
- Essential keyboard path that does not work.

Unsupported content gets an explicit error. It never silently loses effects.

### Evidence packet for every release

- [ ] Exact source revision, toolchain, lockfiles, native, plugin, driver, and runtime versions, build flags.
- [ ] Capability matrix: implemented, qualified, unavailable with reason, not yet shipped. No blanket parity percentage.
- [ ] Corpus hashes and licenses. Actual scenario actions. Machine-readable output checks.
- [ ] Home, editor, settings, and export screenshots and interaction traces at known sizes and scaling.
- [ ] Crash and recovery, missing-media, cancellation, disk and permission, and offline results.
- [ ] Installed Flatpak and upgrade or migration results on the supported hardware and runtime matrix.
- [ ] Dependency, model, and asset rights. Notices, source availability, privacy inventory.
- [ ] Known limitations and release notes that match the exercised build.

Performance budgets in the [quality plan](quality-release.md) are targets until measured. A version number implies no calendar deadline.

## 8. Final execution handoff

- **First assignment:** T01 from the [starter plan](starter-plan.md), in a new, independent app repository.
- Do not generate the whole editor, download large models, or build a cloud service first.
- Keep the earlier observed discrepancy (a nominal four-second, 30 fps render produced 121 frames, 4.033333 seconds) as a qualification case. Never assume it is fixed by changing the expected result.
- **First review gate:** a working native preview, independently inspected rendered media, and a documented selected backend.
- **First product gate:** the full v0.1 MVP workflow in a real installed app, not a screenshot-only shell.

> This planning pass changes documents only. Engineering gates are future work with explicit evidence requirements. They are not hidden decisions behind a "complete product" claim.
