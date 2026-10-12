# Stack, Architecture, and Data Contracts

Spec: [product-spec.md](product-spec.md). Status: proposed architecture with explicit qualification gates, not an implemented system. Primary evidence: [sources.md](sources.md).

## 1. Starter stack decision

**Choose a Rust domain/application layer, GTK4 desktop UI, and a GStreamer/GES media backend. Qualify the difficult paths before making it the production backend.** This uses existing media infrastructure instead of rebuilding codecs, audio clocks, containers, and Linux video presentation.

| Layer | Selected starting point | Why / constraint |
|---|---|---|
| Language/toolchain | Rust 2024 edition; pin stable 1.96.0 initially | Installed toolchain observed; update deliberately after CI qualification |
| UI | `gtk4` 0.10 family, `glib`/`gio` 0.21 family | Native Linux integration and shared GLib family with media bindings |
| Video/timeline | `gstreamer`, `gstreamer-editing-services`, `gstreamer-video`, `gstreamer-audio`, `gstreamer-pbutils` 0.24 family | Rust bindings to established native media stack |
| GTK preview sink | `gst-plugin-gtk4` 0.14 family | Manifest confirms GTK 0.10/GStreamer 0.24; MPL-2.0, not the bindings' MIT/Apache license |
| Native baseline | GTK >=4.14; GStreamer/GES >=1.26 | Chosen product floor; DMA-BUF is optional at runtime, not assumed |
| Timeline UI | Custom GTK widget using snapshot/render nodes plus accessible clip navigator | Virtualize visible clips; native widgets for controls, not thousands of child widgets |
| Text | Pango/HarfBuzz/FreeType through audited platform stack | Mature shaping, font fallback, bidi; share render parameters between preview/export |
| Serialization | `serde`/`serde_json`; explicit schema versions | Human-inspectable project format, not GES serialization as sole truth |
| IDs/hashes | UUIDs for identities; BLAKE3 for application asset/cache hashes | Identity survives relink; checksums key derived data |
| Persistence | Atomic JSON snapshots plus transactional journal; SQLite only for disposable catalog/search indices | Do not make editor project correctness depend on cache DB |
| Jobs | Bounded channels and worker processes; `tokio` only for asynchronous I/O/service tasks where justified | GTK/GLib remains UI event loop; no async work on realtime audio path |
| Media utility tools | FFmpeg/ffprobe for diagnostics, selected offline conversions, corpus generation | Audit build license; avoid uncontrolled second render implementation |
| Local transcription | `whisper.cpp` native worker first | Offline C API; select exact model separately |
| Other inference | Model-specific native runtime or isolated pinned Python worker | ONNX only when export/operators are actually supported |
| Packaging | Flatpak first, pinned runtime/build inputs | Consistent native dependencies, portal integration, GPU driver extension testing |
| Governance | GPL-3.0-or-later original code; DCO sign-off; REUSE/SPDX | User freedom, contributor provenance, auditable redistribution |

### Version policy

The inspected GTK 0.10.1 and GStreamer 0.24.0 upstream manifests both declare Rust 1.83 and GLib 0.21. LCE's Rust 2024 edition and selected toolchain are separate project choices. The sink 0.14.0 manifest also matches those crate families. This is a **compatible starting family, not a claim that these are the newest or currently vulnerability-free releases**.

Resolve patched versions within those families, inspect advisories and native security updates, commit `Cargo.lock`, and pin package source checksums. If moving to the next GLib family, upgrade GTK, GStreamer and sink together. Do not mix floating git dependencies with published crates or assume `latest` documentation describes the pinned API.

Enable native API feature floors explicitly (`gtk4/v4_14`, media bindings `v1_26`). Sink features at the inspected version include `waylandegl`, `x11egl`, `x11glx`, `dmabuf`, `gtk_v4_14`. Test the subset shipped; enabling a feature is not proof of an actual zero-copy path. MPL-2.0 source/notice and any secondary-license conditions need review for the actual sink distribution.

No exact Flatpak runtime branch is invented here: T01 selects a supported, non-EOL runtime meeting the native floors and records its branch/commit and extension versions in the manifest. Reject a runtime that cannot meet these floors instead of assuming host libraries fill the gap.

### Alternatives deliberately not selected initially

| Alternative | Useful property | Why not first choice / trigger to reconsider |
|---|---|---|
| MLT | Established NLE engine used by Kdenlive/Shotcut; C API | Rust wrapper/ownership work and UI integration; evaluate if GES fails hard-path gate |
| FFmpeg-only editor engine | Excellent codecs/filtering/offline processing | Interactive seek/cache/timeline/audio scheduling still our responsibility |
| Custom `wgpu` engine | GPU effect/compositor control | No automatic demux/decode/audio clock; major engineering burden |
| Tauri + web UI | Web UI iteration and familiar CSS | Large custom timeline/native video bridge; no reason to add browser boundary for this Linux-first product |
| Qt via Rust bridges | Mature docking/pro-app widgets | Binding/FFI/tooling and licensing choices; reasonable fallback if GTK UI qualification fails |
| egui/Iced | Rust-led custom UI | Accessibility, IME and complex editor UX still require qualification; not automatically less work |

Do not maintain two shipping authoritative media backends. The T01 decision either accepts GES, funds a specific missing element/offline render path, or changes the backend before downstream implementation. A partial failure is investigated; it is not concealed by an unexplained alternate renderer.

## 2. Repository map and ownership

Create a new repository `linux-creator-editor/` only when implementation begins. All paths below are relative to that future repository, **not** the existing `photocraft/` checkout.

```text
Cargo.toml / Cargo.lock / rust-toolchain.toml
apps/lce-desktop/              GTK application, actions, panels, timeline view
apps/lce-cli/                  headless inspect/render/verify commands
crates/lce-core/               exact time, project model, commands, undo, validation
crates/lce-project/            snapshots, journal, migrations, collect/relink
crates/lce-media/              discovery, asset registry, thumbnails, proxies
crates/lce-engine/             GES ownership, compile schedule, playback/export
crates/lce-effects/            effect definitions, parameters, deterministic operators
crates/lce-jobs/               scheduling, cancellation, resource budgets, worker protocol
crates/lce-ai/                 model manifests, AI task adapters, result validation
crates/lce-interchange/        subtitles, OTIO and bounded draft adapters
services/lce-sync/             optional sync/review/collaboration API
workers/                      separately pinned model-specific executables/environments
assets/                       original redistributable icons/fonts/presets/samples
schemas/                      project, effect, worker and template schema artifacts
corpus/                       fixture manifests and generated/redistributable test inputs
packaging/flatpak/             manifest, metadata, offline build sources
xtask/                        corpus, qualification, package and benchmark orchestration
docs/                         ADRs, contributors, formats, parity, user migration guide
```

Start only crates needed by T01–T08; the map is not a request to generate empty crates for every future feature. Split a crate when it has a real boundary, tests, and consumers. `lce-core` has no GTK/GES/Python dependencies. `lce-engine` consumes validated immutable core snapshots; it never owns the user's authoritative project. UI uses commands, not engine object mutation.

One owner reviews core schema/command changes; media, UI and AI contributors consume those contracts. Contributors can work independently on effects, audio, captions and packaging after shared contracts stabilize. Do not parallelize conflicting edits to the same foundational types.

## 3. Ownership and concurrency

- GTK main thread owns widgets, interaction draft state, command dispatch, and the initial preview GES owner context. Co-locating preview GES control with GTK avoids moving paintables/GTK objects across threads.
- GES API is explicitly not thread-safe. Construct, change and dispose each GES object on its owning GLib context only. Never add unsafe `Send`/`Sync` implementations to bypass this.
- Pipeline streaming/decoding already uses native worker threads. Control operations on the main context must be bounded and nonblocking; probing, hashing, file work and long analysis happen elsewhere.
- If measured GES control calls block the UI, T01 must qualify a dedicated GES owner thread and a supported sink handoff, or an isolated preview worker. Do not guess that raw GTK/GObject pointers can be sent safely.
- Export runs in a separate process with its own GLib/GES context and immutable project revision, so encoder crashes and slow renders do not freeze editing.
- CPU workers receive bounded jobs. Resource policy prioritizes preview/audio over proxy creation, inference and export; expensive jobs can pause or reduce concurrency.
- AI runtimes live in persistent worker processes when startup is expensive. They have explicit input/output capabilities and no authority to mutate the project.
- Pipeline events carry session/generation IDs. Ignore late events from an old project, seek, engine rebuild or cancelled job.

## 4. Time and source mapping contract

All durable times use normalized rational seconds `{num: i64, den: u32}` with `den > 0`; normalization and range checks occur on deserialization. Use checked i128 intermediates for arithmetic. Reject overflow. Durations and sequence positions are nonnegative; intermediate deltas may be negative.

- Intervals are **half-open** `[start, end)`. Adjacent clips share a boundary, not a duplicate displayed frame.
- Sequence rate is rational frames/second, e.g. 30000/1001. Frame n is at `n * 1001 / 30000` seconds. Drop-frame timecode affects labels, not actual frame rate.
- Audio is addressed in sample indices at its processing rate. Quantize once at defined boundaries, never by repeated float addition.
- Source VFR video uses actual PTS and duration metadata. Select the source frame whose presentation interval covers the mapped source time; do not treat average frame rate as a frame index oracle.
- Conversion to GStreamer nanoseconds occurs at the engine boundary using an explicit rounding policy. Export frames are scheduled from rational output frame indices, not accumulated nanosecond steps.
- At a requested non-frame-aligned video out point, show the resulting rounded frame interval before export. The chosen contract is start rounded down and end rounded up to the selected export grid; exact source/audio ranges remain preserved in the project.

A clip stores placement, visible duration, source reference, source stream selection, and a time map. For constant forward rate `r`, `source(t) = source_in + r * local_t`. A speed ramp integrates a positive rate curve into a monotonic source mapping with documented interpolation and bounded numeric error. Reverse segments map decreasing source time explicitly. Freeze segments map every output time to one chosen source frame.

Keyframe time domains are explicit: clip-output local time by default; source-time only for tracking/matting analysis tied to the original media. Sequence effects use sequence time. Moving a clip does not retime clip-local animation; trimming exposes a different portion according to the trim contract. A split divides the time map and animation without discontinuity.

For multicamera/nesting, child sequence time is mapped through the parent's time map. Cycles are invalid. Bound nesting depth (initial limit 32) and total expansion cost to prevent malformed-project resource exhaustion.

## 5. Project model and format

Project folders use suffix `.lceproj/` with the following conceptual layout:

```text
project.json                 authoritative durable snapshot
journal/commands.jsonl        committed edits after the snapshot, versioned records
recovery/                    bounded previous snapshots/recovery candidates
media/                       only assets explicitly collected into the project
analysis/                    accepted derived assets required for reproducible output
```

Disposable proxies/thumbnails/search indices live under the user's cache directory and can be regenerated. User-selected local model directories are separate; project archives reference model identity/provenance but do not silently bundle multi-gigabyte model weights.

Required manifest fields: schema version, project ID, revision, title, timestamps, sequence list, asset list, captions/styles, effect references, default export profiles and required feature versions. UI pane geometry and transient job progress are not project truth.

Core entities:

| Entity | Required data / invariant |
|---|---|
| Asset | Stable ID, relative/portal/local locator, content hash state, stream descriptors, original metadata, provenance |
| Sequence | ID, dimensions, rational frame rate, audio rate/layout, color policy, ordered tracks, range markers |
| Track | ID, kind, name, layer order, lock/mute/visibility, clips; visual ordering maps explicitly to compositor z-order |
| Clip | ID, asset/child-sequence/generator reference, placement, duration, source map, enabled streams, effects, animation |
| Link | Explicit relationship kind and members/anchor; no dangling IDs |
| Effect | Stable type ID, semantic version, typed parameters, enabled state, input/output requirements |
| Caption | Text, interval, optional timed words, language/speaker, style, provenance and review state |
| Derived asset | Input hashes/ranges, operation/settings/model hash, output hash, semantic version |
| Export job snapshot | Project revision/hash, range, profile, dependency hashes and destination policy |

JSON schemas are produced alongside typed serialization and example projects. Unknown future schema versions open read-only with export blocked if semantics are unknown. Preserve an original copy before migration. Migrations are deterministic, backed up and tested in both ordinary and interrupted-save scenarios; do not pretend downgrade is always possible.

### Durable saves and recovery

1. Validate a command against current revision and invariants.
2. Compute its forward/inverse operations; commit one in-memory revision.
3. Append a length/checksum-delimited journal record (JSONL payload plus verifiable framing fields). Batch fsync within a bounded interval; UI indicates whether the latest revision is durable.
4. Snapshot to a temporary file in the same filesystem; flush file, atomically rename, flush parent directory where supported.
5. Record the snapshot revision before rotating old journal segments; replay skips already included revisions.
6. Startup recovery validates records in order and stops at an incomplete/corrupt suffix; it never guesses missing commands.

Manual Save forces durability. Autosave target is at most two seconds of edit loss after a hard process crash on supported local storage; this is a measured target, not a guarantee for failing hardware/network filesystems. Single-writer project lock prevents two independent processes from interleaving journals. Opening a locked project offers read-only or a separately named copy.

## 6. Commands, undo and engine boundary

Commands use stable IDs and domain values, not widget indexes or GES handles. Initial command set: ImportAsset, InsertClip, MoveClips, TrimClip, SplitClips, DeleteClips, SetProperty, SetKeyframe, LinkItems, SetTrackState, SetSequenceSettings. Later tasks add typed commands for their entities.

Every edit transaction carries expected project revision. Validation returns either an atomic edit plus inverse or a structured error identifying affected entities. Stale revisions are rejected/recomputed by the owner; no last-writer-wins mutation of a live local project.

Undo restores edited model state, not the entire OS world: deleting a generated file outside the app is not undone by restoring its reference. Own generated/collected media remains retained while reachable by active project or bounded undo history. Undoing import does not delete the user's original source.

Engine requests: LoadSnapshot, ApplyValidatedDelta, Seek(target, generation), SetTransport, SetPreviewQuality, QueryCapabilities. Engine events: Ready, FramePresented(timestamp/generation), Position, Buffering, Ended, Warning, Error. A delta is an optimization; LoadSnapshot is the correctness fallback after divergence. Do not recompile the whole timeline on every pointer movement.

A `RenderPlan` is an immutable, validated schedule compiled from a project revision and export profile. It resolves assets, source maps, effects, color transforms and output timing. Preview uses the same semantic compiler with preview-quality substitutions that are explicitly identified; export uses originals and full-quality operators.

## 7. Media pipeline

### Import/discovery

Probe in a worker with timeout/resource limits. Record stream choice, sample aspect, rotation, duration uncertainty, VFR, color metadata, HDR tags, audio channel layout and decoder capability. Unknown/malformed input yields an actionable error; filenames and metadata are untrusted text.

Use fast identity metadata for immediate UI; compute content hashes in background. Do not claim a file-size/mtime key is a permanent content identity. Invalidate cached work when hashes or decode semantics differ. Thumbnail jobs include orientation and color interpretation in their cache key.

### Proxy strategy

Offer automatic proxy suggestion, not silent destructive conversion. Use a qualified intraframe or short-GOP profile chosen by disk/speed benchmarks; do not assume one codec is best everywhere. Proxy manifest maps source PTS to proxy PTS and carries rotation/color handling. VFR proxies require mapping, not approximate duration matching.

Export originals by default. If originals are missing, block or require an explicit lower-quality proxy export with a visible warning. Never label proxy-rendered output original quality.

### Playback

Audio pipeline clock is master during ordinary AV playback. Video frames are scheduled against it; dropped frames are counted, not hidden. Frame-step while paused must present the requested output frame. Rapid seeks are coalesced; stale completions cannot move the playhead backward.

Hardware decode/encode is selected by capability probing and tested actual output, with visible software fallback. GPU availability does not imply codec/profile support. DMA-BUF negotiation includes format/modifier/planes/strides, GL context compatibility, and compositor support. Copy paths remain supported; profiling determines whether zero-copy actually occurs.

### Effects and color

Start with qualified native elements and small Rust GStreamer operators where needed. Define effect semantics and parameter units once. Do not add an unrelated `wgpu` compositor merely to make the stack sound more Rust-centric.

Processing policy: explicit input transfer/range/primaries/matrix; geometry and compositing in a documented working space; alpha is consistently premultiplied at compositor boundaries; output transform is explicit. P: start SDR Rec.709 with clearly tagged sRGB still-image conversion. Qualify linear-light versus display-referred operators individually rather than blanket claiming all filters are physically correct.

HDR input detection and explicit SDR tone-map choice are required before accepting HDR phone media. Full HDR output, 10-bit pipelines, display color management, PQ/HLG metadata and scopes are separate T16/T32 acceptance cases; unsupported HDR export must not be silently labeled HDR.

### Export

Export process probes all dependencies before allocating a destination. Render to job-owned temporary file; drain pipeline/muxer, verify decoded stream timing and expected frame count, then publish. Validate encoder priming/trailing samples separately from container duration; a container's duration field is not enough to establish exactness.

Profiles list required encoder/parser/muxer elements. Baseline open profiles include WebM VP9/Opus where available; MP4 H.264/AAC is an important usability target but must pass legal/build/runtime qualification. Codec patents are separate from FOSS license compatibility. Never use a nonredistributable FFmpeg build in an official package.

## 8. Job/AI protocol

A job has ID, kind, input asset hashes and ranges, parameter schema version, model/runtime identity, resource estimate, permission set, cancellation token and output directory. States: queued → preparing → running → validating → ready; terminal alternatives failed/cancelled. Downloading is a distinct preparatory state.

Workers communicate versioned JSON control messages over a local pipe/socket; large data is passed through capability-limited files or shared buffers, not base64 frame dumps. Enforce message size, schema and path bounds. Validate worker output duration/dimensions/timestamps/hash before presenting it for application.

Results do not directly mutate the project. User acceptance submits a command with source identity and revision expectations. If the clip has changed, offer recompute or retain result as unattached media; do not apply stale tracking coordinates or transcript cuts to new footage.

Model manifest records: exact artifact URL/hash, code license, weight license, tokenizer/vocoder/voice licenses, redistribution rights, commercial-use rights, attribution, language coverage, hardware/runtime requirements, precision/quantization, measured benchmarks and known limitations. No remote code execution from model metadata; prefer safe weight formats but still validate resource bounds.

## 9. Local AI candidates and license gates

These are researched candidates, not prequalified dependencies. Recheck exact versions/artifacts before download or distribution.

| Capability | Candidate | Required caution |
|---|---|---|
| Captions | whisper.cpp + selected Whisper checkpoint | Runtime license and checkpoint license recorded independently; word timings need evaluation |
| Alignment/diarization | WhisperX / separate aligner / pyannote variant | Multiple model terms and download gates; diarization not identity recognition |
| Speech cleanup | DeepFilterNet | Exact checkpoint rights and algorithmic latency; compensate lookahead |
| Separation | Demucs-family model | Maintenance status and weight terms; preserve temporal alignment |
| Segmentation/tracking | SAM2 | Apache-2.0 code/checkpoints stated upstream; segmentation is not high-quality alpha matting |
| Human matting | Robust Video Matting | GPL code; exact weight redistribution needs explicit confirmation |
| Interpolation | RIFE / ncnn implementation | Exact implementation and checkpoint licenses; occlusion/cut artifacts |
| Upscale | Real-ESRGAN | BSD code does not by itself license every checkpoint |
| TTS | Kokoro-82M or Piper | Kokoro checkpoint Apache-2.0; voices/phonemizers separately; Piper voices have individual terms |
| Translation | Qualified OPUS-MT language pairs | Pair-specific model license and quality, not a blanket language guarantee |
| Voice cloning | OpenVoice-compatible qualified stack | Consent, impersonation safeguards, dependent model/vocoder rights |
| Local generation | Exact Apache-licensed Wan checkpoint candidate | Heavy GPU cost, temporal/quality limits; upstream benchmark not ours |

Do not put NLLB noncommercial weights, XTTS CPML weights/outputs, or revenue-restricted LTX checkpoints into an unrestricted official FOSS model pack. Optional external integrations must disclose their separate service terms; they are not part of a claim that the entire remote service is open source.

## 10. Licensing and provenance architecture

Keep application GPL, third-party library licenses, model weights, sample media and generated output rights separate in the manifest. Use original or CC0 samples; OFL fonts only after checking redistribution/name clauses; original assets can use CC-BY-4.0 with attribution, while code remains GPL. No mandatory CLA or copyright assignment; DCO records contributor attestation but does not replace asset review.

The GPL covers distributed program code, not automatically a user's exported video. Particular source media, music, templates, voices or model terms can still affect output rights. The UI must expose those terms without making a false blanket “commercially safe” promise.

Record dependency source, version, build flags, license/notice locations and source offer in the SBOM. FFmpeg `--enable-gpl` and codec-library choices affect obligations; `--enable-nonfree` may make resulting binaries unredistributable. Packaging is a release gate, not an afterthought.

## 11. Interchange and optional services

- Native projects are authoritative. OTIO transfers editorial structure with a machine-readable loss report for effects, text, speed maps or nesting that the selected adapter cannot represent.
- SRT/VTT preserve timings/text but not all styling or word animation. Warn before lossy export; never overwrite native captions with round-tripped simplified files.
- CapCut draft import is a bounded adapter for legally readable supported versions. Preserve original files; reject unsupported/encrypted input with explanation. No promise of universal import or export back to CapCut.
- Sync uses immutable revision snapshots and content-addressed assets, not concurrent synchronization of a live journal directory. Offline concurrent changes initially branch and merge explicitly.
- Review comments anchor to revision/sequence/time range. Simultaneous collaborative editing requires a server-ordered operation log or qualified merge algorithm and separate tests; basic file sync is not collaboration.
- Self-hostable services are optional. API credentials live in the OS secret store. Access control and signed download capabilities apply to every asset request. Local mode works if services disappear.
