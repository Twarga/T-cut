# t-cut Product Specification

Status: finalized planning baseline, 2026-10-12. Version boundaries and MVP acceptance: [release-roadmap.md](release-roadmap.md). No application implementation is claimed.
Public product name chosen by the user: **t-cut**. Earlier **LCE** / `lce-*` names are internal identifiers in the implementation plan. Naming does not itself establish trademark clearance.

## 1. User request and outcome

Build a free, open-source, Rust-led Linux alternative to CapCut. Existing CapCut users should recognize the editing workspace and complete ordinary tasks without learning a different editing model. The product must have its own identity, artwork, icons, templates, and content licenses. The eventual scope includes editing, compositing, audio, captions, AI, templates, export, project compatibility research, and optional ecosystem services.

Primary user: a creator moving from CapCut Desktop on Windows/macOS to Linux, editing short-form social videos, tutorials, interviews, and longer YouTube projects. Secondary users: educators, privacy-conscious offline creators, and contributors extending the application.

User outcome: import personal footage, arrange and polish a timeline, caption it, save it safely, and export a reliable result using recognizable controls, without mandatory registration, advertisements, watermarking, subscriptions, or feature unlocks.

**2026-10-12 interface clarification:** the MVP must closely follow the complete CapCut Desktop application layout and navigation, including Home/project cards, creating/opening projects, editor states, settings, relinking and export. A generic four-pane editor alone is insufficient. The [screenshot-backed study](../research/research.md) and [fidelity contract](../research/fidelity-contract.md) define the reference and acceptance. Preserve source/model/security constraints; unverified details remain explicitly proposed rather than claimed identical.

## 2. Global Constraints

These exact rules apply to every implementation plan in this package.

- Core editing is free of charge, open source, offline-capable, account-free, advertisement-free, and watermark-free.
- Original application code is planned as GPL-3.0-or-later; this is a recommendation for project adoption, not a license change to existing repositories.
- Rust owns project state and edit semantics; audited native libraries and isolated model workers are allowed.
- Linux x86_64 is the initial release target; Wayland and X11 are both supported. Linux aarch64 follows only after the same qualification gates pass.
- The application has independent branding, icons, artwork, and redistributable assets. No CapCut resource extraction or copied proprietary code is allowed.
- Familiarity means recognizable layout, terminology, command placement, and behavior; pixel identity and legal clearance are not asserted.
- No feature is declared complete from a menu entry, source-line count, screenshot, mock result, or unexercised test.
- Preview and export use the same versioned edit/effect semantics; unsupported operations must fail visibly, never silently disappear.
- Original media is never modified by editing. Save/export operations never overwrite unrelated files without explicit user authorization.
- No media leaves the device without an explicit destination and consent. AI failure never silently switches to a cloud provider.
- Official bundled model packs require documented redistribution and commercial-use rights; zero price is not a substitute for a compatible license.
- A GPL program can be sold by downstream redistributors. This project's gratis policy is not a restriction added to the GPL.
- No deadline, complete CapCut parity percentage, or universal real-time 4K claim is promised before qualification.

## 3. Evidence levels

Use these labels in issue reports and parity records:

- **D (documented):** the cited upstream documentation states the capability or behavior.
- **V (visual):** inspected public screenshot; record source, dimensions and cohort. This is not an executed application observation.
- **O (observed):** an identified application build was exercised; record OS, build, date, inputs, and output.
- **P (proposed):** our own product or engineering decision.
- **G (gate):** evidence or qualification needed before a release claim.

Official marketing establishes a capability claim, not measured quality. CapCut desktop, mobile, and web are separate references. A how-to article about another editor does not establish a CapCut feature. See [sources](sources.md).

The screenshot-backed research covers 28 public images, separated by reference cohort and application state. It establishes layout evidence, not proof of a single current application's behavior. Use the fidelity contract for Home, project management, contextual inspectors and dialogs. Exact defaults, gestures and undocumented menus require a pinned CapCut Desktop build before claiming verified compatibility.

## 4. Product boundaries

### Required local product

- Local projects and assets; no user account required.
- Timeline editing, playback, recording, compositing, typography, color, audio, captions, and export.
- Original reusable effects, templates, transitions, and title styles.
- Optional downloadable local model packs with honest hardware and language coverage.
- User-visible diagnostics, recovery, keyboard remapping, accessibility, and localized UI.
- Open project format and documented editorial interchange.

### Full-scope optional subsystems, not silently omitted

- Cloud sync, team review, collaboration, and authorized social publishing.
- Script-to-video, generative video/image workflows, advanced inpainting, consent-based voice cloning and avatars.
- CapCut draft import for versions and constructs that can be lawfully and reliably interpreted.
- Photo/cover composition associated with videos; not an unrelated Photoshop replacement.

These remain tracked requirements. They have separate runtime, licensing, infrastructure, and acceptance gates. The local product must remain usable when they are absent or unavailable. A stable local-editor release is not marketed as whole-ecosystem parity.

### Deliberate non-goals

- Redistributing CapCut's asset catalog, voices, templates, music, fonts, proprietary models, branding, or executable resources.
- Bypassing subscriptions, account controls, encryption protections, or provider API restrictions.
- Rewriting all codecs, GUI libraries, inference runtimes, or operating-system APIs in Rust.
- Shipping a browser, Android, or iOS application in the initial Linux program. Equivalent creator capabilities can be implemented on Linux without cloning mobile navigation.
- Promising identical generative outputs, undocumented service behavior, or social-platform approval.

## 5. Feature registry and implementation ownership

Each row is a deliverable family, not one checkbox meaning all edge cases work. Tasks are defined in [implementation](implementation.md). States start **planned**. A release records sub-capabilities and exceptions individually.

| ID | Required capability and explicit scope | Owner task | Evidence/limit |
|---|---|---|---|
| F01 | Media import: video/audio/images, metadata, rotation, duration, frame rate, color, stream selection, unsupported-file feedback | T03 | Core engineering; codec availability is build-dependent |
| F02 | Bins, search, sorting, thumbnails, waveforms, proxies, missing-media relink | T06 | P; matches creator media-management needs |
| F03 | Multitrack arrange, split, trim, duplicate, move, snapping, ripple, links, lock/mute/visibility | T05,T09 | Familiar pattern; exact CapCut toggles require G |
| F04 | Main-track magnet, linked selection, drag selection, keyboard edits, undo/redo | T09 | Distinct modes; never collapse into one unexplained toggle |
| F05 | Grouping, compound clips, nested sequences, adjustment/effect layers, multicamera workflow | T13 | Multicamera CapCut specifics unconfirmed; still a product requirement |
| F06 | Position, scale, rotation, crop, flip, anchor, fit/fill, canvas ratios, background | T10 | Local |
| F07 | Keyframes, interpolation, easing curves, property reset, copy/paste attributes | T11 | D: desktop keyframes and graphs |
| F08 | Constant speed, reverse, freeze, editable speed ramps, pitch preservation | T12 | D: speed curves; difficult backend paths require G |
| F09 | Playback, seek, frame-step, loop, quality/proxy selection, fullscreen | T04 | Native pipeline; exactness measured |
| F10 | Transitions and original presets with editable duration/direction | T14 | Recreate capability, not catalog assets |
| F11 | Masks, chroma key, feather, blend modes, opacity, PiP | T15 | Deterministic compositing |
| F12 | Exposure, contrast, temperature/tint, saturation, curves, HSL, LUTs, color wheels, scopes | T16 | HDR and 10-bit are independent G |
| F13 | Original filters, effects, animated overlays, retouch/body/face controls | T17 | Retouch requires model/landmark evaluation; consent-sensitive |
| F14 | Stabilization, optical flow/interpolation, tracking, auto reframe | T22 | Offline candidates; temporal quality required |
| F15 | Background segmentation, human matting, object removal/inpainting | T23 | Three different algorithms and gates |
| F16 | Text, styles, outlines/shadows/background, animation, shape/sticker overlays | T18 | Own assets; Arabic/RTL/CJK and emoji |
| F17 | Manual captions, auto captions, word highlighting, subtitle import/export | T20 | Word timing must remain editable |
| F18 | Caption translation, bilingual captions, speaker labels, transcript edits, filler/pause removal | T21 | Language/model/license matrix |
| F19 | Audio split/extract/loop, fades, volume automation, pan, mix, meters, normalization, ducking, EQ | T19 | Preserve samples and timing |
| F20 | Voice recording, noise reduction, enhancement, voice effects, vocal/music separation | T24,T28 | Device and model qualification |
| F21 | Beat detection, editable markers, beat-aligned cuts and animation | T25 | No automatic irreversible editing |
| F22 | TTS, consent-based voice cloning, timed dubbing, optional lip sync | T26 | Rights, language quality, video sync gates |
| F23 | AI script writing, semantic media search, long-video highlights/shorts | T27 | Suggestions reviewable; not autonomous overwrite |
| F24 | Script-to-video and storyboard assembly from owned/licensed media | T27 | Separate from generative video |
| F25 | Image/video generation, expansion, avatar/presenter workflows | T30 | Open local candidates plus optional lawful APIs; exact output parity unavailable |
| F26 | Upscale, restoration, denoise/sharpen and frame enhancement | T29 | No hallucinated-detail accuracy claims |
| F27 | Templates, media slots, titles, stickers, transitions, reusable project recipes | T31 | Original/licensed content |
| F28 | Cover/thumbnail image layout and still export | T31 | Reuse compositor and typography |
| F29 | Export queue, range, resolution/rate/quality, codecs, audio, subtitles, cancellation, destination checks | T07,T32 | Every advertised profile proven in distributed build |
| F30 | Save/open, autosave, history/recovery, collect/project archive, cache controls | T02,T08 | Crash-safe, versioned and user-owned |
| F31 | Portable project and OTIO/subtitle interchange; CapCut draft adapter research | T33 | Explicit loss report; no universal conversion claim |
| F32 | Screen/webcam/microphone capture on Linux | T28 | Portal/PipeWire and device permissions |
| F33 | Optional sync, backup, shared asset/library state | T34 | Own service, revisions, conflict resolution |
| F34 | Team review, comments, access control, collaboration | T35 | Review and simultaneous edit are distinct |
| F35 | Authorized social publishing and export presets | T36 | APIs/approval outside our control |
| F36 | CapCut-familiar Home, create/open/manage projects, editor layout, inspector, settings, toolbar, keyboard profile and contextual actions | T04,T09,T37 | D/V/O/P separated; complete local application journey begins in MVP |
| F37 | Accessibility, UI scaling, high contrast, reduced motion, localization, keyboard-only workflows | T37 | Native AT-SPI/Orca verification |
| F38 | Privacy, safe imports, untrusted templates/models, provenance, no forced telemetry | T38 | Threat model and permissions |
| F39 | Linux packaging, GPU matrix, reproducible artifacts, notices and source availability | T39 | Flatpak first; audited release |
| F40 | Contributor onboarding, governance, issue templates, sustainability, public parity ledger | T40 | No hidden proprietary core |

## 6. Reference workflows

Every workflow has a prepared corpus project and a screen recording or annotated execution trace. The same timeline can be exercised headlessly where appropriate; interaction behavior still needs the actual GUI.

1. **W01 quick vertical edit:** import three phone clips; trim; reorder; set 9:16; add a transition and music; export H.264/AAC when that profile is available.
2. **W02 captions:** transcribe an interview; correct a name; split a caption; change style for all captions; highlight words; export video and SRT separately.
3. **W03 motion:** add a title; keyframe position/opacity; edit easing; attach it to a track; verify exported motion.
4. **W04 speed:** freeze a frame; ramp speed down/up; retain speech pitch for constant-speed segments; inspect variable-speed audio transitions.
5. **W05 compositing:** layer a cutout over video; correct mask edges; add chroma-key footage and a LUT; compare preview/export.
6. **W06 podcast:** two cameras and separate microphone; synchronize; alternate angles; remove reviewed pauses; duck music; export without end drift.
7. **W07 resilience:** save; move sources; reopen and relink; terminate during an edit/save; recover without changing originals.
8. **W08 offline:** disable network; open project, edit, run already-installed caption model, export; no account or service prompt blocks work.
9. **W09 accessible edit:** perform W01 using keyboard and Orca; select clips by named accessible items and exact time fields rather than pointer-only dragging.
10. **W10 template:** replace footage/text slots in an original template; keep timing constraints; export and report license provenance.
11. **W11 collaboration:** change the same project offline on two devices; sync and resolve branch conflict without overwriting either version.
12. **W12 generative insert:** request an optional local generation; cancel and retry; inspect provenance; insert accepted result as ordinary editable media.

## 7. Familiarity acceptance, not a marketing slogan

P: recruit at least five people who have used CapCut Desktop regularly, including one keyboard-heavy creator. Use their own baseline completion on a pinned CapCut build and the same prepared media on LCE. This is a directional usability sample, not a statistically representative market claim.

- At least four of five finish W01 and W02 without a tutorial or moderator navigation hints.
- Target median completion time no more than 1.25x each participant's baseline after a short environment check, excluding model-download/transcription time.
- Record wrong-control selections, mode errors, unexpected timeline movement, and recovery assistance.
- A familiar-looking layout with different drag, split, selection, or undo semantics fails the gate.
- Conflicts with accessibility and Linux window-manager shortcuts are documented and remappable, not concealed.
- Explain unavoidable differences in a searchable migration page, not an obligatory onboarding tour.

## 8. Release claims

Separate **capability**, **quality**, **performance**, **interoperability**, and **ecosystem** parity. A single percentage obscures more than it explains.

- Research build: only qualified capabilities enabled; not a production recommendation.
- v0.1 local alpha: the release roadmap's MVP scenario, W07 and offline core editing pass; full W01/W08 are not required before transitions/installed caption models ship.
- v0.2 everyday alpha: full timeline modes and static editing/manual captions pass.
- v0.3 creator beta and v0.4 AI beta: exercise W01–W10 where their required capabilities are shipped; record each excluded workflow and the later owning feature rather than calling a subset a full pass.
- v1.0 stable local editor: supported local workflows, corpus/hardware and package/migration gates pass; no release-blocking data-loss, security, timing or rights defects. Post-1.0 ecosystem releases qualify W11/W12 and external prerequisites independently.

No phase permanently drops a requested family. A blocked family remains visible with its prerequisite and owner. Optional provider-specific features may remain unavailable without credentials or legal rights; the equivalent local workflow, where feasible, is tracked independently.

## 9. Initial non-decisions with mandatory resolution gates

These are not permission to invent missing facts:

- Public name/domain/app ID: maintainer trademark/domain review before distributing signed releases; source may use `lce` meanwhile.
- Exact CapCut reference build and defaults: capture legally obtained application behavior before advertising a compatibility profile as verified.
- GES difficult-path fitness: reverse, ramped audio, nesting, color, render endpoints, and zero-copy must pass T01.
- GPU/model performance: benchmark the selected checkpoints on actual reference hardware; README throughput is not our product benchmark.
- Social API approvals and managed-service funding: external dependencies; never required by local editing.
