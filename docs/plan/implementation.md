# t-cut Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver the complete feature registry of a free/open-source, CapCut-familiar Linux editor through independently qualified releases.
**Architecture:** Rust authoritative project model, GTK4 workbench, qualified GES media engine, isolated export/AI jobs, optional self-hostable services.
**Tech Stack:** The compatible release family and native dependency rules in [architecture.md](architecture.md).
**Spec:** [product-spec.md](product-spec.md); interaction acceptance in [ui-contract.md](ui-contract.md).

## Global Constraints

Apply all Global Constraints in the product spec. In particular: offline/no-login core; no proprietary asset copying; no silent loss of editing semantics; no unsupported performance/parity claims; preview/export equivalence; rights-audited redistribution. Paths below are in the **future new repository**, not PhotoCraft. None of the future commands in this plan is a claim that the application already exists.

## Execution protocol

Each task below is a reviewable work package with smaller checkbox steps. Split a step further when it cannot be reviewed independently; keep its public contract and acceptance case intact. Follow dependencies rather than task numbering alone.

Version boundaries are controlled by [release-roadmap.md](release-roadmap.md). T10/T18/T19 have real early MVP slices; T20 manual captions precede inference. Advanced task prerequisites apply to advanced closure, not to these explicitly bounded early slices. Do not duplicate their implementations or fabricate inspector controls before the underlying slice works.

1. Add the smallest meaningful behavior fixture/regression for the named risk. Observe it fail for the missing behavior, not merely a missing import or command.
2. Implement real behavior using the specified authoritative contracts. No fake success, mock-generated media, placeholder feature menus, or permanently disabled advertised features.
3. Run the targeted tests, then exercise the actual CLI/GUI/media path and inspect output. Tests alone do not qualify a renderer or editor interaction.
4. Update capability ledger, user docs and changelog after proof. Record exact package/runtime/model/corpus versions. Remove temporary instrumentation not needed for diagnosis.
5. Integrate shared-interface changes serially. After parallel independent slices land, run the combined smoke once; never infer integration success from isolated agents.

Verification conventions:
- `cargo test -p <crate> --test <name>` refers to the integration test file specified in that task.
- `cargo run -p xtask -- verify <scenario>` is the **planned** real scenario runner introduced in T08. It creates/opens a project, executes domain operations or launches the appropriate app/worker, renders when required, and checks external output. Before T08, use the concrete examples/CLI commands in the task.
- GUI scenarios require an actual desktop display and recorded human/tool interaction. The runner may prepare fixtures and collect logs; it must not declare UI success from model-only tests.
- Every scenario stores its machine-readable acceptance report under `target/verification/<scenario>/`; large copyrighted user inputs are never committed.

## Milestones and dependency graph

| Milestone | Work | Exit evidence |
|---|---|---|
| M0 engineering qualification | T01; begin T37–T40 | Real Rust/GES/GTK integration, inventory and hard-path decision |
| v0.1 local MVP | T02–T08; T10/T18/T19 basic; release-scoped T37–T40 | Complete Home/edit/save/recovery/export MVP scenario in installed package; not full W01/W08 |
| v0.2 everyday editing | T09/T10; T18/T19 static expansion; T20 manual | Mode matrix, static text/audio/geometry and subtitle scenarios |
| v0.3 creator beta | T11–T20 advanced local scope, T28/T31/T32, T33 local interchange | Qualified animation/composition/audio/caption/template/capture/delivery paths; explicit later AI exclusions |
| v0.4 local AI beta | T21–T29; T17 AI closure | Rights-audited measured workers, reviewed nondestructive outputs |
| v1.0 stable local / post-1.0 service releases | Local release closure T37–T40; later T30/T33 adapter/T34–T36 | Stable local evidence first; generation/interoperability/services independently qualified |

T37–T40 are cross-cutting work beginning at M0/M1; their final closure happens after feature integration. They are not a reason to postpone accessibility, threat modeling, licenses or packaging until the end.

Critical path: T01 → T02 → T03/T04 → T05 → T07/T08 → T09 → creator tools. AI workers depend on T06/T08 and relevant domain features; they do not block basic editing. T34–T36 never gate opening a local project.

## T01: Qualify the media/UI stack before committing to it

Dependencies: none. Detailed initial commands and manifest: [starter-plan.md](starter-plan.md).
Files: create root manifests/toolchain, `crates/lce-engine/examples/qualify.rs`, `apps/lce-desktop/src/main.rs`, `corpus/manifests/engine-qualification.json`, `docs/adr/0001-media-engine.md` and `packaging/flatpak/qualification.yml`.

- [ ] Resolve the matched GTK/GLib/GStreamer/sink families; compile a minimal real Rust preview window, not a web mock. Inventory actual decoders, encoders and native licenses in the chosen runtime.
- [ ] Generate an owned numbered-frame/color-patch/impulse-audio corpus. Exercise cut, overlap/transition, alpha title, random seek, frame-step, repeated rate changes, reverse, nested mapping, mixed sample rates and VFR mapping in Rust.
- [ ] Render exact frame-grid ranges and independently decode/count frames. Investigate the previously observed GES CLI 4-second/30fps output of 121 frames and 4.033333 seconds; do not normalize that discrepancy away or claim it is already solved.
- [ ] Measure whether preview GES controls block GTK; qualify thread/sink ownership. Probe software and available hardware paths; record copies and capability failures.
- [ ] Accept GES only with documented implementations for all hard paths. If a gap remains, run the same fixtures through a bounded MLT experiment and select one production backend with reasons. If choosing a custom time-map/effect element, specify and qualify it here before promising the feature.

Verify: `cargo run -p lce-engine --example qualify -- --corpus corpus/manifests/engine-qualification.json`; launch GTK example; inspect decoded frame labels and audio impulses. Exit: evidence-backed engine ADR, not “example compiles.”

## T02: Exact model, commands and durable project foundation

Dependencies: T01 backend boundary selected.
Files: create `crates/lce-core/src/{time,model,command,history,validate}.rs`, `crates/lce-project/src/{snapshot,journal,migrate}.rs`, `schemas/project-v1.json`; tests `crates/lce-core/tests/edit_invariants.rs`, `crates/lce-project/tests/crash_recovery.rs`.

- [ ] Implement normalized rational times, checked arithmetic, half-open intervals, explicit rate conversion, stable IDs and validated deserialization. Reject zero denominators, invalid references and impossible source ranges.
- [ ] Implement atomic command validation/apply/inverse and revision checks. Separate durable model, view selection and transient pointer draft state.
- [ ] Implement single-writer locking, append/replay journal, atomic snapshot, fsync durability, incomplete-suffix recovery, previous snapshot retention and forced manual-save durability.
- [ ] Inject process termination at journal append, snapshot flush, rename and journal rotation. Reopen to the last valid committed revision, not a mixture.

Verify: both named tests, plus a process-kill/reopen scenario on a disposable local project. Boundary fixture: split `[0,2)` at 1 second, reject split at 0 or 2, undo to byte-equivalent canonical model state; 30000/1001 repeated edits must not drift.

## T03: Asset discovery and safe import

Dependencies: T02.
Files: create `crates/lce-media/src/{discover,asset,hash}.rs`, `apps/lce-desktop/src/panels/import.rs`; test `crates/lce-media/tests/discovery.rs`.

- [ ] Probe media in a bounded worker; enumerate streams and preserve orientation, SAR, VFR PTS, color, channel layout and uncertain duration.
- [ ] Store file/portal locator separately from content identity. Import multiple assets incrementally with individual errors; do not roll back successful unrelated imports after one corrupt file.
- [ ] Implement chosen-stream insertion, still-image default duration preference, image-sequence ordering and missing decoder explanation. Defer expensive hashing without mislabeling a provisional hash as complete.
- [ ] Exercise Unicode paths, removable media, access denial, truncated container, huge metadata and rotated phone video. Original bytes must remain unchanged.

Verify: discovery test plus actual import of the corpus through the file chooser/drop path. Expected: correct visible orientation, stream selection and duration; damaged file cannot freeze the UI.

## T04: Home, project lifecycle, real workbench and transport

Dependencies: T01, T02, T03.
Files: create `apps/lce-desktop/src/{app,actions,workspace,navigation}.rs`, `src/home/{view,project_card,actions,trash}.rs`, `src/panels/{library,player,inspector,timeline}.rs` and `src/dialogs/{settings,project_settings,shortcuts}.rs` under that app, plus resources tokens/styles; `crates/lce-project/src/registry.rs`; `crates/lce-engine/src/{owner,transport,events}.rs`; test `crates/lce-engine/tests/transport.rs`. Existing T07/T08 own export/relink/recovery integration.

- [ ] Build the screenshot-backed Home/project dashboard, real recent-project registry/cards, Create/Open/Rename/Duplicate/Trash/Restore and return-Home flow. Then build the editor with horizontal library categories, inner vertical categories, Player, context-sensitive Details/Video/Audio/Text inspector, and undo/redo in the timeline toolbar. Follow the [fidelity contract](../research/fidelity-contract.md), not the earlier generic wireframe; preserve original media and durable saves across navigation.
- [ ] Implement sequence/source mode, seek generations, play/pause, frame-step, loop, time fields, quality choice and visible buffering/failure state.
- [ ] Suspend timeline shortcuts during text input/IME; preserve selection when inspector focus changes. Expose native accessibility roles before drawing custom-only controls.
- [ ] Exercise rapid seeks, open-project replacement during pending load, end-of-stream, audio device removal, window resize and high-DPI scaling.
- [ ] Integrate working global settings, project Modify and shortcut surfaces at the MVP scope. T04 verifies its available Home/open/playback/settings paths now; full UI01–UI11/UI16–UI24 and A01–A14 acceptance closes at MVP integration after T05–T08 and the required basic text/audio slices. This is not a backward prerequisite on later tasks. Familiar Home and project opening are not deferred to T37.

Verify: transport test and real GUI playback with synchronized click/flash media. Exit: requested frame shown after seek, stale events ignored, no direct GES calls from arbitrary workers.

## T05: Basic editing and undo

Dependencies: T02–T04.
Files: extend core command/history; create `apps/lce-desktop/src/timeline/{gestures,hit_test,selection}.rs`; test `crates/lce-core/tests/timeline_edits.rs`.

- [ ] Implement insert/move/trim/split/delete/duplicate with typed source/sequence time rules, collision policy, track compatibility and locks.
- [ ] Implement draft-gesture preview, commit once on release, Escape/capture-loss rollback and undo/redo. Preserve link and animation references even before advanced editors expose them.
- [ ] Provide numeric move/trim and keyboard selection alternatives; virtualization uses time/track indices, not scanning every clip for every pointer movement.
- [ ] Verify multi-selection edits are atomic and source ranges remain valid after split/trim/undo chains.

Verify: named test plus actual GUI edit/playback/export once T07 lands; MVP edit steps use the release roadmap's scenario rather than full W01 before transitions exist. In a 10,000-clip synthetic project only visible clips get thumbnail render work.

## T06: Media library, proxies and bounded caches

Dependencies: T03, T04.
Files: create `crates/lce-media/src/{thumbnail,waveform,proxy,cache}.rs`, `crates/lce-jobs/src/{queue,cancel,budget}.rs`; tests `crates/lce-media/tests/proxy_mapping.rs`, `crates/lce-jobs/tests/cancellation.rs`.

- [ ] Add bins, search, sort, thumbnail strips and multiresolution waveform envelopes; selection/insertion remain distinct actions.
- [ ] Implement content/parameter/version keyed cache, bounded disk quota, LRU eviction and pinning for active jobs. Eviction may delete disposable caches, never sources or accepted derived media.
- [ ] Qualify proxy profile and source-to-proxy PTS mapping; offer proxy/original playback switch without changing edit timing.
- [ ] Add pause/cancel/retry with job-owned temp cleanup. Test cancel while writing, source modified during hashing, cache corruption and disk-full behavior.

Verify: named tests; play the same VFR edit with proxies on/off and compare identified source frames at cuts. Remove cache and reopen: project remains correct, cache regenerates.

## T07: Headless rendering and first export UI

Dependencies: T01–T06.
Files: create `apps/lce-cli/src/main.rs`, `crates/lce-engine/src/{compile,render,profiles}.rs`, `apps/lce-desktop/src/dialogs/export.rs`; test `crates/lce-engine/tests/export_boundaries.rs`.

- [ ] Implement CLI `inspect PROJECT`, `render PROJECT --output FILE --profile NAME`, and `verify-media FILE --expect-frames N`. Return structured errors and nonzero exit on invalid output.
- [ ] Compile immutable render snapshot; resolve originals, declared effects and exact output frame range. Reject missing dependencies before final destination publication.
- [ ] Export in isolated process to temporary sibling path, finalize muxer, decode/validate result, then atomically publish with overwrite authorization.
- [ ] Add visible queue/progress/cancel/error details; separate container duration from decoded frames and audible sample alignment.

Verify: named test; actual CLI/GUI export, full decode, first/last frame identity, stereo channels, cancel cleanup and existing-file preservation. First useful vertical slice ends here only if save/reopen also works.

## T08: Recovery, project portability and real scenario runner

Dependencies: T02, T06, T07.
Files: extend `crates/lce-project/src/{recovery,collect,relink}.rs`; create `xtask/src/{main,verify,corpus}.rs`, `corpus/scenarios/{offline,recovery,collect}.json`; test `crates/lce-project/tests/portable_project.rs`.

- [ ] Implement recovery chooser, missing-media relink by identity, Collect project and safe archive/unarchive with path/size limits.
- [ ] Keep external locators and collected relative paths explicit. Prevent archive traversal/symlink escape; report unsupported fonts/effects/models in portability report.
- [ ] Implement scenario runner: generate owned corpus, create projects through real commands, spawn render/app/worker, collect external decode/time/resource results; human GUI gates stay explicitly pending until exercised.
- [ ] Add offline and process-kill scenarios; reopening does not require cache, network, account, absolute paths or original machine layout.

Verify: portable project test; `cargo run -p xtask -- verify recovery`, then `... verify offline` and `... verify collect`. Move collected project to a different directory/user test environment and export identically within codec tolerance.

## T09: Familiar timeline mode contract

Dependencies: T05, T08.
Files: create `crates/lce-core/src/{ripple,links,snap}.rs`, `apps/lce-desktop/src/timeline/modes.rs`; test `crates/lce-core/tests/mode_matrix.rs`; scenario `timeline-modes`.

- [ ] Implement independent snapping, main-track magnet, linked selection, AV pairing and follow anchors exactly as UI contract; make each mode visible.
- [ ] Implement deterministic snap resolution/hysteresis; distinguish all-track ripple from main-track operations. Locked dependent item rejects the transaction.
- [ ] Add roll/slip/slide, delete-left/right and move-to-track numeric commands with proper source handles. Expose current shortcuts and remapping.
- [ ] Exercise each relevant mode combination with a main clip, linked dialogue, anchored caption, unlinked music and locked overlay; assert exact resulting times and one undo step.

Verify: mode matrix test and `... verify timeline-modes`; observe drag previews and deliberate one-frame gaps in GUI. Record reference-build differences, not guessed compatibility.

## T10: Geometry, crop and canvas

Dependencies: T04, T05, T07. T10-basic (position/scale, fit/fill and canvas) ships in v0.1; remaining static geometry ships in v0.2 using the same modules.
Files: create `crates/lce-effects/src/{transform,crop,canvas}.rs`, `apps/lce-desktop/src/player/handles.rs`; test `crates/lce-effects/tests/geometry.rs`; scenario `geometry`.

- [ ] Implement normalized anchor, position, scale, rotation, flip, crop, fit/fill and background with explicit coordinate spaces.
- [ ] Map preview pointer through window scale/letterbox/source orientation into sequence coordinates; numeric fields and gestures dispatch the same command.
- [ ] Support 16:9, 9:16, 1:1 and custom sequence dimensions without destructive source cropping; show export-safe overlays separately.

Verify: geometry test and actual rendered labeled corners for rotated/SAR media; compare handles at 100% and 200% UI scale. No drift between preview and export placement.

## T11: Keyframes and curves

Dependencies: T10, T09.
Files: create `crates/lce-core/src/animation.rs`, `apps/lce-desktop/src/panels/curves.rs`; test `crates/lce-core/tests/animation_split.rs`; scenario `keyframes`.

- [ ] Implement typed numeric/vector/color interpolation, hold/linear/cubic modes and property eligibility; serialize stable units and time domain.
- [ ] Add diamond controls, previous/next key, curve editor and numeric tangent/time/value alternatives; one gesture is one undo operation.
- [ ] Split animation by exact evaluated boundary values and subdivided curves; trim/move/nest rules follow architecture. Copy attributes offers explicit animation rebasing.

Verify: evaluate known curves before/after split at multiple interior times; render animated title/opacity sequence and inspect boundary frames. Step discontinuities are intentional only for hold interpolation.

## T12: Speed maps, reverse and freeze

Dependencies: T01 hard-path solution, T11.
Files: create `crates/lce-core/src/time_map.rs`, `crates/lce-engine/src/retime.rs`, `apps/lce-desktop/src/panels/speed.rs`; test `crates/lce-engine/tests/retiming.rs`; scenario `speed`.

- [ ] Implement constant speed, explicit reverse/freeze segments and integrated positive ramp curves; validate source bounds and output-duration changes before commit.
- [ ] Implement qualified reverse decode/cache path and pitch-preserving time stretch where available. Variable-rate audio smoothing is measured, not assumed from a constant-rate element.
- [ ] Add editable original ramp presets, numeric controls, duration preview and documented pitch policy. Scene cuts prevent optical-flow interpolation across unrelated shots.
- [ ] Preserve source-time analysis mapping when speed changes; invalidate incompatible cached results.

Verify: numbered-frame reverse/freeze/ramp output, endpoint count and impulse audio continuity; no rate=0 arithmetic shortcut. Preview may use reduced quality only with visible indicator; export must honor final semantics.

## T13: Groups, compounds, adjustment layers and multicamera

Dependencies: T09–T12.
Files: create `crates/lce-core/src/{sequence_graph,multicam}.rs`, `crates/lce-engine/src/nesting.rs`, `apps/lce-desktop/src/timeline/breadcrumbs.rs`; test `crates/lce-core/tests/nested_sequences.rs`; scenario `compound`.

- [ ] Distinguish selection group from child sequence. Implement create/open/exit/decompose compound with stable child IDs and explicit parent time map.
- [ ] Reject cycles, excessive depth and expansion; render child composition consistently and cache by content/revision rather than mutable pointer identity.
- [ ] Implement adjustment layers affecting a bounded underlying stack and interval. Show exactly which layers are affected.
- [ ] Add multicamera source synchronization by timecode/manual offset/audio correlation; camera angle cuts are editable sequence selections, not destructive source rewrites.

Verify: create compound, animate/retime it, change child, decompose, undo and render; multicamera flash/clap fixture remains synchronized at beginning/middle/end.

## T14: Transitions

Dependencies: T11, T13.
Files: create `crates/lce-effects/src/transitions.rs`, `assets/presets/transitions/`, `apps/lce-desktop/src/panels/transitions.rs`; test `crates/lce-effects/tests/transition_handles.rs`; scenario `transitions`.

- [ ] Implement dissolve, fade-through-color, wipe and slide as original parameterized operators; transition duration uses explicit overlap and source handles.
- [ ] Dropping a transition shows needed handles and allowed duration; insufficient handles require shorten/freeze policy chosen visibly, not hidden duplicated frames.
- [ ] Add original preview thumbnails and preset provenance; dragging a preset modifies one undoable boundary operation.

Verify: cut/transition boundary frames and audio overlap independently; changing adjacent speed or trim updates validity rather than producing black frames.

## T15: Masks, chroma and blending

Dependencies: T10, T11, T13.
Files: create `crates/lce-effects/src/{mask,chroma,blend}.rs`, `apps/lce-desktop/src/panels/mask.rs`; test `crates/lce-effects/tests/compositing.rs`; scenario `compositing`.

- [ ] Implement rectangle/ellipse/path masks, invert, feather and keyframed transforms with explicit resolution-independent coordinates.
- [ ] Implement chroma sampling/tolerance/spill control and documented blend-mode formulas; enforce premultiplied-alpha convention at boundaries.
- [ ] Keep multiple effects ordered and user-reorderable; preview/export use identical parameters and compositing order.

Verify: synthetic alpha/color edges, overlapping translucent layers and feathered masks; test dark/bright fringes and output transparency where the profile supports it.

## T16: Color, LUTs, scopes and HDR path

Dependencies: T10, T15.
Files: create `crates/lce-effects/src/{color,lut,scopes}.rs`, `apps/lce-desktop/src/panels/color.rs`; test `crates/lce-effects/tests/color_pipeline.rs`; scenario `color`.

- [ ] Implement input metadata interpretation, explicit working/output transforms, exposure/contrast/temperature/tint/saturation, curves, HSL and color wheels with documented units.
- [ ] Parse bounded LUT files with defined domains/interpolation; reject invalid sizes/NaNs. Scopes sample the selected pipeline stage, not an unrelated thumbnail.
- [ ] Add HDR detection and explicit SDR tone map; qualify full 10-bit/PQ/HLG output and monitor handling separately. Clearly label unqualified paths unavailable.

Verify: reference color patches/range ramps, HDR metadata and SDR tone-map fixture, scopes against known histograms; tolerances defined per operator/bit depth, not screenshot similarity alone.

## T17: Effects, filters and retouch

Dependencies: T11, T15, T16; landmark/AI-dependent retouch also uses T23 job contracts.
Files: create `crates/lce-effects/src/{catalog,blur,sharpen,retouch}.rs`, `assets/presets/filters/`; test `crates/lce-effects/tests/effect_order.rs`; scenario `effects`.

- [ ] Add deterministic blur/sharpen/vignette/noise/glow/texture operators with bounded parameters and original presets; effect catalog resolves stable semantic versions.
- [ ] Store filters as inspectable parameter bundles, not opaque proprietary look files. Adjustment, per-clip and global effect scopes are visible.
- [ ] Implement explicit face/body-region retouch only after qualified landmarks/masks: strength zero is identity, preserve identity cues, manual override and preview comparison. This substep may follow T23 without blocking deterministic effects.

Verify: operator reference fixtures, reorder/disable/undo, extreme valid parameters and temporal retouch stability. Never claim a preset catalog equivalent merely because category names match.

## T18: Typography, graphics and text animation

Dependencies: basic static text consumes T10-basic, T02 and T07 for v0.1; static styling expansion uses the same text path in v0.2. Full animated/composited closure consumes T10, T11 and T15 in v0.3. Do not make static text depend on keyframes or masks.
Files: create `crates/lce-effects/src/{text,shapes}.rs`, `apps/lce-desktop/src/panels/text.rs`, `assets/fonts/manifest.json`; test `crates/lce-effects/tests/text_shaping.rs`; scenario `typography`.

- [ ] Implement shaping, font selection/fallback, alignment, wrapping, line spacing, outline/shadow/background and safe-area guides using a consistent layout contract.
- [ ] Add vector/basic shapes and original stickers; sanitize imported SVG, reject external resources/scripts and bound rasterization cost.
- [ ] Implement original in/out/loop text animation as property/word-range animation, preserving editable text. Missing fonts show a replacement warning and portability options.

Verify: Arabic mixed with Latin/numbers, CJK wrapping, combining marks, emoji fallback, long captions, missing font, and exported glyph/layout consistency. No copy of CapCut font/template assets.

## T19: Deterministic audio editing and mixing

Dependencies: basic gain/fades/mixing consumes T02, T05 and T07 for v0.1; v0.2 static controls additionally use T09. Full automation/retimed-audio closure consumes T09, T11 and T12 in v0.3. Reuse the same audio modules across releases.
Files: create `crates/lce-engine/src/audio.rs`, `crates/lce-effects/src/{audio_gain,audio_eq,ducking}.rs`, `apps/lce-desktop/src/panels/audio.rs`; test `crates/lce-engine/tests/audio_timing.rs`; scenario `audio`.

- [ ] Implement extract/detach, fades, gain automation, pan/channel layout, mute/solo, buses and non-destructive trim/loop.
- [ ] Add peak/loudness meters, loudness analysis/normalization and ducking with explicit threshold/attack/release; report target and measured result separately.
- [ ] Compensate resampler/filter latency, encoder priming and time-stretch delay; audio callbacks avoid allocation, locks and file/network access.

Verify: impulse position, stereo channel identity, silence/gap behavior, mixed sample rates, clipping/limiter case and long-duration sync. Normalization cannot silently alter unrelated clips.

## T20: Manual and automatic captions

Dependencies: manual captions consume T08 plus static T18 text and basic T19 timing in v0.2. Qualified transcription/word highlighting uses the required completed T18/T19 controls and local worker infrastructure in v0.3; model download/inference must not gate manual subtitles.
Files: create `crates/lce-ai/src/{manifest,transcribe}.rs`, `workers/whisper/`, `crates/lce-interchange/src/subtitles.rs`, `apps/lce-desktop/src/panels/captions.rs`; tests `crates/lce-interchange/tests/subtitle_roundtrip.rs`, `crates/lce-ai/tests/transcription_apply.rs`; scenario `captions`.

- [ ] Implement manual captions and SRT/VTT parsing/export before model integration; retain timing/text and warn about styling loss.
- [ ] Add explicit model download/license/size UI and local transcription worker; actual speech input produces editable segments/words, never a canned transcript.
- [ ] Implement correction, segmentation, style-all, word highlighting, speaker/language metadata and stale-result handling. Alignment is evaluated separately from text recognition.

Verify: offline multilingual speech corpus, timing/text round-trip, cancel, changed source during job, absent model and IME-safe caption editing. Record WER/timing metrics by language/noise cohort, not one aggregate claim.

## T21: Translation, diarization and transcript editing

Dependencies: T20, T09.
Files: create `crates/lce-ai/src/{translate,diarize,transcript}.rs`, `apps/lce-desktop/src/panels/transcript.rs`; test `crates/lce-core/tests/transcript_edits.rs`; scenario `transcript`.

- [ ] Integrate qualified language-pair and diarization packs with independent license manifests; unknown speakers remain anonymous labels.
- [ ] Store translated captions as a separate linked language layer; preserve original transcript and let users correct timing/text independently.
- [ ] Propose filler/pause/repetition removal ranges, show audiovisual review, and apply one atomic ripple transaction with documented linked-track effects.

Verify: overlaps, two speakers, code switching, punctuation edits, low-confidence text and stale clips. Undo returns all affected tracks exactly; model suggestions never commit automatically.

## T22: Tracking, stabilization and reframe

Dependencies: T11, T12, T15, T08.
Files: create `crates/lce-ai/src/{tracking,stabilize,reframe}.rs`, `apps/lce-desktop/src/panels/tracking.rs`; test `crates/lce-ai/tests/analysis_coordinates.rs`; scenario `tracking`.

- [ ] Implement selected-region tracking in source coordinates with confidence/lost states and manual correction keys. Reuse qualified classical tracking where sufficient; avoid unnecessary foundational-model inference.
- [ ] Stabilize by estimating/smoothing camera motion with explicit crop/rolling-shutter limitations; result is an editable transform path or derived asset.
- [ ] Reframe chooses subject-aware crop paths with safe margins and user constraints; speed/rotation/proxy transforms map analysis consistently.

Verify: occlusion, scene cuts, camera shake, fast motion, vertical crop and retimed source. Low-confidence tracking stops or asks for correction, not an unexplained jump to another object.

## T23: Segmentation, matting and inpainting

Dependencies: T15, T22, T08.
Files: create `crates/lce-ai/src/{segment,matte,inpaint}.rs`, model-specific worker directories, `apps/lce-desktop/src/panels/cutout.rs`; test `crates/lce-ai/tests/mask_mapping.rs`; scenario `cutout`.

- [ ] Integrate separately qualified segmentation and alpha-matting models; click/brush prompts and edge refinement remain user-editable.
- [ ] Cache temporal masks by source frame identity and parameters. Keep source-time mapping through speed/trim changes; invalidate correctly.
- [ ] Add object-removal/inpainting as a separate offline render job with before/after review and derived output provenance. Unsupported model license blocks official-pack distribution, not manual mask editing.

Verify: hair, translucent edges, motion blur, occlusion, cuts and difficult backgrounds; report temporal flicker and failure cases. Binary SAM masks are not called studio-quality alpha mattes.

## T24: Speech cleanup, separation and voice effects

Dependencies: T19, T20 worker infrastructure.
Files: create `crates/lce-ai/src/{denoise,separate,voice_effect}.rs`, native/model workers; test `crates/lce-ai/tests/audio_latency.rs`; scenario `voice-cleanup`.

- [ ] Integrate qualified speech denoise/enhance models with exact sample-rate conversion and lookahead compensation.
- [ ] Separate vocal/music stems as independently editable derived assets; retain originals and align stem start/end precisely.
- [ ] Add deterministic voice effects and optional licensed model effects; show strength/bypass and processing latency.

Verify: speech plus music/noise corpus, latency impulse, stereo preservation, artifacts and recombination error. A denoiser is not advertised as source separation.

## T25: Beats and music-driven edits

Dependencies: T19, T11.
Files: create `crates/lce-ai/src/beats.rs`, `apps/lce-desktop/src/panels/beats.rs`; test `crates/lce-core/tests/beat_edits.rs`; scenario `beats`.

- [ ] Detect onset/tempo candidates and expose editable beat markers with confidence; support manual tap/add/remove for rubato or failed detection.
- [ ] Suggest beat-aligned cuts/keyframes subject to minimum clip durations and source handles; display a complete preview transaction.
- [ ] Apply accepted suggestions as ordinary commands, preserving undo and links.

Verify: metronome ground truth, changing tempo, quiet intro and off-beat music; detection failure cannot shift an existing timeline without acceptance.

## T26: TTS, cloning and dubbing

Dependencies: T20, T21, T24.
Files: create `crates/lce-ai/src/{tts,voice_consent,dub}.rs`, voice manifests/workers; test `crates/lce-ai/tests/dubbing_alignment.rs`; scenario `dubbing`.

- [ ] Integrate qualified local TTS/voice packs, language/pronunciation controls and preview; model/voice rights visible before installation.
- [ ] Implement explicit consent attestation and provenance for custom voice cloning, local reference deletion controls and abuse-report policy for hosted services. Do not claim this proves legal identity.
- [ ] Align generated speech to target ranges using reviewed translation/pacing; lip sync is a separate qualified video model job, not inferred from successful audio alignment.

Verify: long/short translations, names/numbers, absent voice pack, consent cancellation, lip-sync artifacts and offline operation. Unqualified lip sync remains a tracked blocked sub-capability, never a fake button.

## T27: Search, highlights and script/storyboard assembly

Dependencies: T20, T21, T22, T31 template schema when assembling recipes.
Files: create `crates/lce-ai/src/{search,highlights,storyboard}.rs`, `apps/lce-desktop/src/panels/storyboard.rs`; test `crates/lce-ai/tests/storyboard_apply.rs`; scenario `storyboard`.

- [ ] Build local transcript/metadata search first; optional embeddings add semantic search with model/version keyed indices and deletable caches.
- [ ] Suggest highlights/long-to-short extracts with source ranges, captions and reframe proposals. User reviews and accepts a new sequence, leaving original untouched.
- [ ] Implement script assistance and storyboard-to-timeline assembly using owned/licensed media, editable shot slots, TTS/music/caption choices and provenance. Missing media stays an unresolved slot until user supplies it; do not claim completed video from empty slots.

Verify: search relevance on labeled corpus, source-range fidelity and revised source handling; generated storyboard becomes a normal editable project with no hidden server dependency.

## T28: Linux capture and recording

Dependencies: T03, T19, T08.
Files: create `crates/lce-media/src/{capture,devices}.rs`, `apps/lce-desktop/src/dialogs/record.rs`; test `crates/lce-media/tests/capture_timestamps.rs`; scenario `capture`.

- [ ] Use desktop ScreenCast portal/PipeWire for Wayland screen capture, approved microphone/webcam device access and visible recording state; do not bypass permission prompts.
- [ ] Record monotonic timestamps and synchronize sources; support countdown, pause/stop policy, input meters and user-chosen destination.
- [ ] Finalize recoverable partial recordings after interruption; import completed recording as normal media.

Verify: GNOME/KDE Wayland, denied/revoked permission, device unplug, monitor scaling and simultaneous microphone/screen. X11 path tested separately, not assumed equivalent.

## T29: Restoration and upscaling

Dependencies: T08, T12, T23 worker infrastructure.
Files: create `crates/lce-ai/src/{upscale,restore}.rs`, workers/model manifests; test `crates/lce-ai/tests/tiled_processing.rs`; scenario `restoration`.

- [ ] Implement qualified model tiling with overlap/blend, resource budgeting, cancel and content-addressed derived media.
- [ ] Offer denoise/deblur/sharpen/upscale as distinct operations and compare against ordinary resampling; preserve color metadata and timing.
- [ ] Document temporal consistency and hallucination limits; never describe synthesized detail as recovered ground truth.

Verify: tile seams, moving textures, faces/text, color shifts, low-memory fallback and unchanged duration. OOM yields an actionable job failure, not project corruption.

## T30: Advanced image/video generation and presenters

Dependencies: T26, T27, T29.
Files: create `crates/lce-ai/src/{generate,avatar,providers}.rs`, model/provider manifests, `apps/lce-desktop/src/panels/generate.rs`; test `crates/lce-ai/tests/generated_asset_apply.rs`; scenario `generation`.

- [ ] Qualify exact unrestricted checkpoints for local text/image-to-video or image generation/expansion; record hardware, latency, duration and output limitations.
- [ ] Add optional provider adapters with explicit endpoint, consent, credential storage, estimated cost and cancellability limits. No silent upload or automatic charged retry.
- [ ] Implement presenter/avatar workflow only with rights-cleared identities/models and reviewed voice/lip-sync stages; generated results are ordinary imported assets with provenance.

Verify: real generation on supported hardware, cancel/OOM, reproducibility limits, offline model use, absent provider and stale-project acceptance. No promise of identical CapCut service outputs.

## T31: Templates, original content packs and covers

Dependencies: T13, T14, T18, T20.
Files: create `schemas/template-v1.json`, `crates/lce-project/src/templates.rs`, `assets/templates/`, `apps/lce-desktop/src/panels/templates.rs`; test `crates/lce-project/tests/template_instantiation.rs`; scenario `templates`.

- [ ] Define declarative media/text slots, duration constraints, allowed crop behavior, style/effect versions and license/provenance; templates contain no arbitrary scripts.
- [ ] Implement instantiate/replace slots as ordinary editable sequence commands, with missing-font/effect/media checks and bounded archive parsing.
- [ ] Author original social intro/outro, captions, split-screen and slideshow templates; build cover/still composition using existing text/geometry pipeline, not a separate image editor engine.

Verify: replace short/long/wrong-aspect media, multilingual text, missing dependencies, hostile archive and original-author attribution. Do not populate catalog from CapCut downloads.

## T32: Production export and delivery profiles

Dependencies: T07, T12–T20, T29 as applicable.
Files: extend engine profiles/render, create `apps/lce-desktop/src/panels/export_queue.rs`, `assets/export-profiles/`; test `crates/lce-engine/tests/delivery_profiles.rs`; scenario `delivery`.

- [ ] Qualify H.264/AAC MP4, available open profiles, audio-only, image/still, supported alpha/mezzanine and subtitle-sidecar paths. List exact supported formats, not “all codecs.”
- [ ] Add rational frame-rate/resolution/bitrate/custom range, SDR/HDR metadata policy, audio layout, queue priority, output naming and validation.
- [ ] Probe hardware encoders per codec/profile/bit depth; compare visual quality and timing with software output. Broken device path falls back only with visible report.

Verify: full decode for each shipped profile, exact output frame selection, seekability, A/V endpoints, metadata, long project, disk-full and cancellation. Packaging must include every advertised element.

## T33: Interchange and bounded CapCut import research

Dependencies: T08, T13, T20, T32.
Files: create `crates/lce-interchange/src/{otio,capcut,loss_report}.rs`, `docs/formats/compatibility.md`; test `crates/lce-interchange/tests/editorial_roundtrip.rs`; scenario `interchange`.

- [ ] Implement OTIO editorial mapping and subtitle import/export with explicit representability/loss reports; retain original project and original timebases.
- [ ] Examine lawfully supplied unencrypted draft fixtures with user consent; version-detect, map only understood constructs, reject unknown protected input, and never execute embedded resources.
- [ ] Publish exact supported versions/features and comparison renders. Missing effects require user-approved approximation/rendered-media substitution, not silent claims of compatibility.

Verify: foreign timeline cut/source ranges, unsupported speed/effect report, malicious path references and original-file preservation. No universal `.capcut` round-trip claim.

## T34: Optional self-hosted sync and backup

Dependencies: T08, T38 security baseline.
Files: create `services/lce-sync/src/{api,auth,assets,revisions}.rs`, `crates/lce-project/src/sync.rs`, `docs/self-hosting.md`; test `services/lce-sync/tests/sync_conflicts.rs`; scenario `sync`.

- [ ] Define authenticated project/revision/content APIs and storage quotas; upload immutable snapshots/assets, never mirror a live journal blindly.
- [ ] Support resumable chunked transfer with hashes, offline queue and explicit concurrent branches. Preserve both revisions when concurrent changes cannot merge safely.
- [ ] Provide local deployment configuration, backup/restore/delete/export controls and bandwidth/storage visibility; local editing never waits for server availability.

Verify: disconnect mid-upload, corrupt chunk, unauthorized cross-project read, concurrent offline edits, quota exhaustion and server restore. Do not claim end-to-end encryption without a separate implemented key-management design.

## T35: Review and collaborative editing

Dependencies: T34, T09.
Files: extend service with `src/{comments,collaboration}.rs`, create `apps/lce-desktop/src/panels/review.rs`; test `services/lce-sync/tests/collaboration_order.rs`; scenario `collaboration`.

- [ ] Implement revision/time-range comments, roles, invitations, presence and auditable permission revocation without changing local project authority.
- [ ] Add simultaneous edit sessions using a server-ordered operation log and explicit sequence ownership/locking initially; rejected stale operations rebase or become proposals, never overwrite silently.
- [ ] Keep offline edits as branches; provide merge UI for semantic conflicts. Defer CRDT complexity unless measured requirements justify it, but do not label comment-only sharing live collaboration.

Verify: two real clients concurrently trim/delete/relink, reconnect after revocation, resolve branch conflict, and converge on the same validated revision or an explicit unresolved conflict.

## T36: Authorized publishing

Dependencies: T32, T34 credentials/security facilities; local export does not depend on this.
Files: create `crates/lce-jobs/src/publish.rs`, `apps/lce-desktop/src/panels/share.rs`, `docs/publishing.md`; test `crates/lce-jobs/tests/publish_state.rs`; scenario `publishing`.

- [ ] Qualify official platform APIs and app approval requirements; implement only permitted OAuth/upload flows, scopes, expiry and rate limits.
- [ ] Show destination/account/privacy/title and file before explicit publish; use a durable upload ID to avoid duplicate publication on retry.
- [ ] Always retain Export/Open folder as account-free alternative. Provider rejection explains platform limits, not a mysterious editor failure.

Verify: provider sandbox/test account with actual approved API, expiry/revocation/cancel/rate limit and duplicate retry. Without approval, mark that integration blocked and make no upload-success claim.

## T37: Familiarity, accessibility and localization closure

Dependencies: begins T04; final gate after local feature integration. Home and editor layout fidelity are early MVP obligations, not deferred until this final closure task.
Files: create `apps/lce-desktop/src/accessibility/`, `po/`, `docs/migration-from-capcut.md`, `docs/parity/desktop-reference.csv`; scenarios `keyboard`, `ime`, `familiarity`.

- [ ] Capture pinned reference-build evidence and reconcile shortcut/mode differences; maintain independent visual identity and original assets.
- [ ] Complete accessible timeline/keyframe/caption actions, focus recovery, high contrast, reduced motion and text scaling; translate messages with context/plurals.
- [ ] Run W01/W02 baseline comparison with regular CapCut users, W09 with keyboard/Orca, and RTL/CJK/IME workflows on actual desktop sessions.

Verify: recorded task outcomes and defects at target window sizes/scales. Model tests cannot replace GUI/assistive-technology proof.

## T38: Security and privacy closure

Dependencies: starts T01; final after import/model/template/service surfaces exist.
Files: create `docs/security/threat-model.md`, `SECURITY.md`, fuzz targets for project/subtitle/template/protocol parsers, release privacy inventory; scenarios `hostile-input`, `offline-privacy`.

- [ ] Implement bounded parsing, archive traversal defense, worker permission/resource limits, safe temp paths, model hash verification and no remote-code model loading.
- [ ] Audit decode/plugin subprocess isolation limits; Flatpak alone does not make an in-process malicious codec harmless to all files the app can access.
- [ ] Verify network consent, logs/redaction, credentials, deletion and service authorization; ship no forced telemetry or content uploads.

Verify: fuzz corpus, hostile media/template/project, revoked portal grant, worker crash and network-disabled local workflow. Publish residual risk rather than claiming an invulnerable sandbox.

## T39: Linux package and release qualification

Dependencies: starts T01; closes after T32/T37/T38.
Files: create production Flatpak manifest, AppStream/desktop metadata, icons/notices/source bundle, CI release workflow; scenario `package`.

- [ ] Pin supported runtime, source hashes, native codec/plugin features and driver extensions. Build without network after dependency fetch; inventory linked binaries, not just Cargo licenses.
- [ ] Exercise file portals, persisted source access, screen capture, audio, Wayland/X11, GPU software fallback, fonts and model storage inside installed package.
- [ ] Generate SBOM, corresponding source/build instructions, signatures/checksums and upgrade/recovery tests. Add distro/AppImage packages only with equivalent qualification and maintenance ownership.

Verify: clean-machine install → W01/W07/W08 → export on hardware matrix. A developer-shell success does not certify Flatpak behavior.

## T40: Governance, sustainability and public parity ledger

Dependencies: begins T01; public release requires T39 evidence.
Files: create `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `GOVERNANCE.md`, `REUSE.toml`, issue/PR templates, `docs/parity/status.csv`, release notes and contributor setup guide.

- [ ] Adopt license/provenance policy, DCO process, maintainers/code owners, security reporting, release authority and decision records; no hidden proprietary required module.
- [ ] Maintain per-feature capability/quality/performance/interchange status linked to reproducible scenarios. Publish gaps and blocked provider/model rights honestly.
- [ ] Document donations/sponsorship/grants and actual hosting/model-download costs. Gratis application does not promise free unlimited hosted GPU inference or perpetual storage.
- [ ] Onboard a contributor on a clean machine using documented commands; confirm they can build, run, debug a small behavior change and supply a license-compliant contribution.

Verify: independent contributor walkthrough, license/source package audit and release claim checklist. Release authority signs only measured capabilities, not aspirational task completion.
