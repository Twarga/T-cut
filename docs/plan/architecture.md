# Stack, Architecture, and Data Contracts

> **Status:** proposed architecture with explicit qualification gates. Not an implemented system.
> **Spec:** [product-spec.md](product-spec.md). **Evidence:** [sources.md](sources.md).

## At a glance

- **Decision:** Rust domain and app layer, GTK4 desktop UI, GStreamer/GES media backend.
- **Condition:** qualify the hard paths before the backend is locked in.
- **Why:** reuse mature media infrastructure. Don't rebuild codecs, audio clocks, containers, or Linux video presentation.
- **Hard rules:**
  - Rational time. Half-open intervals.
  - Atomic JSON snapshots plus a journal. SQLite is for disposable indices only.
  - GES objects live on one owning context.
  - Preview and export share one compiler.
  - Models never mutate the project directly.

## 1. Starter stack

**Choose:** a Rust domain layer, a GTK4 UI, and a GStreamer/GES backend.

| Layer | Selected starting point | Why / constraint |
|---|---|---|
| Language and toolchain | Rust 2024 edition. Pin stable 1.96.0 at first. | Installed toolchain observed. Update deliberately after CI qualification. |
| UI | `gtk4` 0.10 family, `glib` and `gio` 0.21 family | Native Linux integration. Shared GLib family with the media bindings. |
| Video and timeline | `gstreamer`, `gstreamer-editing-services`, `gstreamer-video`, `gstreamer-audio`, `gstreamer-pbutils` 0.24 family | Rust bindings to an established native media stack. |
| GTK preview sink | `gst-plugin-gtk4` 0.14 family | Manifest confirms GTK 0.10 and GStreamer 0.24. License is MPL-2.0, not the bindings' MIT/Apache. |
| Native baseline | GTK ≥4.14. GStreamer/GES ≥1.26. | Product floor. DMA-BUF is optional at runtime, never assumed. |
| Timeline UI | Custom GTK widget on snapshot and render nodes, plus an accessible clip navigator | Virtualize visible clips. Native widgets for controls, not thousands of child widgets. |
| Text | Pango, HarfBuzz, FreeType, via the audited platform stack | Mature shaping, font fallback, bidi. Preview and export share render parameters. |
| Serialization | `serde` and `serde_json`, with explicit schema versions | Human-readable project format. GES serialization is **not** the sole source of truth. |
| IDs and hashes | UUIDs for identity. BLAKE3 for asset and cache hashes. | Identity survives relink. Checksums key derived data. |
| Persistence | Atomic JSON snapshots plus a transactional journal. SQLite only for disposable catalog and search indices. | Project correctness must not depend on a cache DB. |
| Jobs | Bounded channels and worker processes. `tokio` only for async I/O or service tasks where justified. | GTK/GLib stays the UI loop. No async work on the realtime audio path. |
| Media utilities | FFmpeg and ffprobe for diagnostics, selected offline conversion, corpus generation | Audit the build license. Avoid a second, uncontrolled render path. |
| Local transcription | `whisper.cpp` native worker first | Offline C API. Pick the exact model separately. |
| Other inference | Model-specific native runtime, or an isolated pinned Python worker | ONNX only where export and operators are actually supported. |
| Packaging | Flatpak first, with pinned runtime and build inputs | Consistent native deps, portal integration, GPU driver extension testing. |
| Governance | GPL-3.0-or-later for original code. DCO sign-off. REUSE and SPDX. | User freedom, contributor provenance, auditable redistribution. |

### Version policy

- The inspected GTK 0.10.1 and GStreamer 0.24.0 manifests both declare Rust 1.83 and GLib 0.21.
- The sink 0.14.0 manifest matches those crate families.
- LCE's Rust 2024 edition and toolchain are separate project choices.
- **This is a compatible starting family.** It is not a claim that these are the newest or vulnerability-free releases.

**Rules:**

- Resolve patched versions inside those families. Check advisories and native security updates. Commit `Cargo.lock`. Pin source checksums.
- When moving to the next GLib family, upgrade GTK, GStreamer, and the sink together.
- Don't mix floating git dependencies with published crates. Don't assume `latest` docs match the pinned API.
- Enable native API floors explicitly: `gtk4/v4_14` and media bindings `v1_26`.
- Sink features at the inspected version: `waylandegl`, `x11egl`, `x11glx`, `dmabuf`, `gtk_v4_14`.
- Test only the subset you ship. Enabling a feature does not prove a zero-copy path.
- Review the MPL-2.0 source and notice duties, and any secondary-license terms, for the actual sink distribution.

**Runtime:** no Flatpak branch is named here. T01 picks a supported, non-EOL runtime that meets the native floors. It records the branch, commit, and extension versions in the manifest. Reject a runtime that can't meet the floors. Don't assume host libraries fill the gap.

### Alternatives not chosen first

| Alternative | Useful property | Why not first / when to reconsider |
|---|---|---|
| MLT | Established NLE engine behind Kdenlive and Shotcut. C API. | Rust wrapper and ownership work, plus UI integration. Evaluate if GES fails a hard-path gate. |
| FFmpeg-only engine | Excellent codecs, filters, offline processing | Interactive seek, cache, timeline, and audio scheduling would still be ours. |
| Custom `wgpu` engine | GPU effect and compositor control | No automatic demux, decode, or audio clock. Large engineering burden. |
| Tauri and a web UI | Fast UI iteration, familiar CSS | Large custom timeline and native-video bridge. No reason to add a browser boundary for a Linux-first app. |
| Qt via Rust bridges | Mature docking and pro-app widgets | Binding, FFI, tooling, and licensing choices. Reasonable fallback if GTK fails qualification. |
| egui or Iced | Rust-first custom UI | Accessibility, IME, and complex editor UX still need qualification. Not automatically less work. |

**Rule:** do not run two authoritative media backends. T01 either accepts GES, funds a specific missing element or offline render path, or changes the backend **before** downstream work. A partial failure is investigated. It is never hidden behind an unexplained alternate renderer.

## 2. Repository map and ownership

- Create `linux-creator-editor/` only when implementation begins.
- All paths below are relative to that future repo. **Not** the existing `photocraft/` checkout.

```text
Cargo.toml / Cargo.lock / rust-toolchain.toml
apps/tcut-desktop/              GTK application, actions, panels, timeline view
apps/tcut-cli/                  headless inspect/render/verify commands
crates/tcut-core/               exact time, project model, commands, undo, validation
crates/tcut-project/            snapshots, journal, migrations, collect/relink
crates/tcut-media/              discovery, asset registry, thumbnails, proxies
crates/tcut-engine/             GES ownership, compile schedule, playback/export
crates/tcut-effects/            effect definitions, parameters, deterministic operators
crates/tcut-jobs/               scheduling, cancellation, resource budgets, worker protocol
crates/tcut-ai/                 model manifests, AI task adapters, result validation
crates/tcut-interchange/        subtitles, OTIO and bounded draft adapters
services/tcut-sync/             optional sync/review/collaboration API
workers/                      separately pinned model-specific executables/environments
assets/                       original redistributable icons/fonts/presets/samples
schemas/                      project, effect, worker and template schema artifacts
corpus/                       fixture manifests and generated/redistributable test inputs
packaging/flatpak/             manifest, metadata, offline build sources
xtask/                        corpus, qualification, package and benchmark orchestration
docs/                         ADRs, contributors, formats, parity, user migration guide
```

**Crate rules:**

- Create only the crates T01–T08 need. The map is **not** a request for empty crates for every future feature.
- Split a crate only when it has a real boundary, tests, and consumers.
- `tcut-core` has **no** GTK, GES, or Python dependencies.
- `tcut-engine` consumes validated, immutable core snapshots. It never owns the authoritative project.
- The UI sends commands. It never mutates engine objects directly.

**Ownership:**

- One owner reviews core schema and command changes.
- Media, UI, and AI contributors consume those contracts.
- After shared contracts stabilize, effects, audio, captions, and packaging can proceed in parallel.
- Don't parallelize conflicting edits to the same foundational types.

## 3. Ownership and concurrency

- **GTK main thread** owns widgets, draft interaction state, command dispatch, and the initial preview GES owner context. Keeping preview GES control on GTK avoids moving GTK objects across threads.
- **GES is not thread-safe.** Construct, change, and dispose each GES object only on its owning GLib context. Never add `unsafe impl Send` or `Sync` to get around this.
- **Streaming and decoding** already run on native worker threads. Control calls on the main context must be bounded and nonblocking. Probing, hashing, file work, and long analysis run elsewhere.
- **If GES control calls block the UI,** T01 must qualify one of two fixes: a dedicated GES owner thread with a supported sink handoff, or an isolated preview worker. Don't assume raw GTK or GObject pointers can be sent safely.
- **Export** runs in a separate process, with its own GLib and GES context and an immutable project revision. Encoder crashes and slow renders can't freeze editing.
- **CPU workers** get bounded jobs. Priority: preview and audio first, then proxy creation, then inference and export. Expensive jobs can pause or reduce concurrency.
- **AI runtimes** run as persistent worker processes when startup is expensive. They have explicit input and output capabilities. They cannot mutate the project.
- **Pipeline events** carry session and generation IDs. Ignore late events from an old project, a seek, an engine rebuild, or a cancelled job.

## 4. Time and source mapping

### Time rules

- **Durable times:** normalized rational seconds `{num: i64, den: u32}`, with `den > 0`. Normalization and range checks run on deserialization.
- **Arithmetic:** checked `i128` intermediates. Reject overflow.
- **Signs:** durations and sequence positions are nonnegative. Intermediate deltas may be negative.
- **Intervals:** half-open `[start, end)`. Adjacent clips share a boundary, not a duplicate displayed frame.
- **Sequence rate:** rational frames per second, e.g. 30000/1001. Frame *n* is at `n * 1001 / 30000` seconds.
- **Drop-frame timecode** changes labels, not the actual frame rate.
- **Audio** is addressed in sample indices at its processing rate. Quantize once at defined boundaries. Never by repeated float addition.

### Source video

- **VFR video:** use actual PTS and duration metadata.
- **Frame selection:** pick the source frame whose presentation interval covers the mapped source time.
- **Never** treat average frame rate as a frame-index oracle.

### Engine boundary

- Convert to GStreamer nanoseconds only at the engine boundary, with an explicit rounding policy.
- Schedule export frames from rational output frame indices. Never from accumulated nanosecond steps.
- **Non-frame-aligned out point:** show the rounded frame interval before export. Contract: start rounds down, end rounds up, to the selected export grid. Exact source and audio ranges stay preserved in the project.

### Time maps

A clip stores: placement, visible duration, source reference, source stream selection, and a time map.

- **Constant forward rate** `r`: `source(t) = source_in + r * local_t`.
- **Speed ramp:** integrate a positive rate curve into a monotonic source mapping. Use documented interpolation and bounded numeric error.
- **Reverse:** map decreasing source time explicitly.
- **Freeze:** map every output time to one chosen source frame.

### Keyframes

- **Default domain:** clip-output local time.
- **Source time:** only for tracking and matting analysis tied to the original media.
- **Sequence effects:** sequence time.
- **Moving a clip** does not retime clip-local animation.
- **Trimming** exposes a different part of the source, per the trim contract.
- **Split:** divides the time map and the animation with no discontinuity.

### Nesting

- Map child-sequence time through the parent's time map.
- **Cycles are invalid.**
- **Depth limit:** 32. Also bound total expansion cost. This stops malformed projects from exhausting resources.

## 5. Project model and format

### Layout

Project folders use the suffix `.tcutproj/`:

```text
project.json                 authoritative durable snapshot
journal/commands.jsonl        committed edits after the snapshot, versioned records
recovery/                    bounded previous snapshots/recovery candidates
media/                       only assets explicitly collected into the project
analysis/                    accepted derived assets required for reproducible output
```

- **Disposable** proxies, thumbnails, and search indices live in the user's cache directory. They can be regenerated.
- **Model directories** are chosen by the user, kept separate. Project archives reference model identity and provenance. They do **not** silently bundle multi-gigabyte weights.

### Manifest fields

Schema version, project ID, revision, title, timestamps, sequence list, asset list, captions and styles, effect references, default export profiles, and required feature versions.

**Not project truth:** UI pane geometry and transient job progress.

### Core entities

| Entity | Required data and invariant |
|---|---|
| Asset | Stable ID. Relative, portal, or local locator. Content hash state. Stream descriptors. Original metadata. Provenance. |
| Sequence | ID, dimensions, rational frame rate, audio rate and layout, color policy, ordered tracks, range markers |
| Track | ID, kind, name, layer order, lock/mute/visibility, clips. Visual order maps explicitly to compositor z-order. |
| Clip | ID, asset or child-sequence or generator reference, placement, duration, source map, enabled streams, effects, animation |
| Link | Explicit relationship kind, members, and anchor. **No dangling IDs.** |
| Effect | Stable type ID, semantic version, typed parameters, enabled state, input and output requirements |
| Caption | Text, interval, optional timed words, language, speaker, style, provenance, review state |
| Derived asset | Input hashes and ranges, operation, settings, model hash, output hash, semantic version |
| Export job snapshot | Project revision and hash, range, profile, dependency hashes, destination policy |

### Schemas and migrations

- JSON schemas are generated alongside typed serialization and example projects.
- **Unknown future version:** open read-only. Block export if the semantics are unknown.
- **Before migrating:** keep an original copy.
- Migrations are deterministic, backed up, and tested in both normal and interrupted-save runs.
- **Don't promise** that downgrade is always possible.

### Durable saves and recovery

1. Validate the command against the current revision and invariants.
2. Compute its forward and inverse operations. Commit one in-memory revision.
3. Append a length- and checksum-delimited journal record (JSONL payload plus verifiable framing). Batch fsync within a bounded interval. The UI shows whether the latest revision is durable.
4. Snapshot to a temp file on the same filesystem. Flush the file, atomically rename, then flush the parent directory where supported.
5. Record the snapshot revision **before** rotating old journal segments. Replay skips revisions already included.
6. On startup, validate records in order. Stop at an incomplete or corrupt suffix. **Never guess missing commands.**

**Targets:**

- **Manual Save** forces durability.
- **Autosave:** at most 2 seconds of edit loss after a hard crash on supported local storage. This is a measured target, not a guarantee on failing hardware or network filesystems.
- **Single-writer lock:** stops two processes from interleaving journals.
- **Opening a locked project:** offer read-only, or a separately named copy.

## 6. Commands, undo, and the engine

### Commands

- Use stable IDs and domain values. Never widget indexes or GES handles.
- **Initial set:** ImportAsset, InsertClip, MoveClips, TrimClip, SplitClips, DeleteClips, SetProperty, SetKeyframe, LinkItems, SetTrackState, SetSequenceSettings.
- Later tasks add typed commands for their own entities.

**Transactions:** each edit carries the expected project revision. Validation returns either an atomic edit plus its inverse, or a structured error naming the affected entities. Stale revisions are rejected or recomputed by the owner. **No last-writer-wins** on a live local project.

### Undo

- Undo restores **edited model state**. It does not restore the whole OS.
- Deleting a generated file outside the app is not undone by restoring a reference to it.
- Own generated and collected media stays while the active project or the bounded undo history still references it.
- Undoing an import does not delete the user's original source.

### Engine protocol

- **Requests:** LoadSnapshot, ApplyValidatedDelta, Seek(target, generation), SetTransport, SetPreviewQuality, QueryCapabilities.
- **Events:** Ready, FramePresented(timestamp, generation), Position, Buffering, Ended, Warning, Error.
- **Deltas** are an optimization. **LoadSnapshot** is the correctness fallback after any divergence.
- **Never** recompile the whole timeline on every pointer move.

### RenderPlan

A `RenderPlan` is an immutable, validated schedule compiled from one project revision and one export profile. It resolves assets, source maps, effects, color transforms, and output timing.

- **Preview** uses the same semantic compiler, with preview-quality substitutions that are explicitly labeled.
- **Export** uses originals and full-quality operators.

## 7. Media pipeline

### Import and discovery

- Probe in a worker, with a timeout and resource limits.
- Record: stream choice, sample aspect ratio, rotation, duration uncertainty, VFR, color metadata, HDR tags, audio channel layout, decoder capability.
- Unknown or malformed input returns an actionable error.
- **Filenames and metadata are untrusted text.**

**Identity:**

- Use fast identity metadata for instant UI. Compute content hashes in the background.
- **Never** treat file size and mtime as permanent content identity.
- Invalidate cached work when hashes or decode semantics change.
- Thumbnail cache keys include orientation and color interpretation.

### Proxies

- **Offer** an automatic proxy suggestion. Never silent destructive conversion.
- Use a qualified intraframe or short-GOP profile, chosen by disk and speed benchmarks. No single codec is best everywhere.
- The proxy manifest maps source PTS to proxy PTS. It carries rotation and color handling.
- VFR proxies need **mapping**, not approximate duration matching.

**Export rules:**

- Export originals by default.
- If originals are missing: block, or require an explicit lower-quality proxy export with a visible warning.
- **Never** label proxy output as original quality.

### Playback

- The **audio pipeline clock** is the master during normal AV playback. Video is scheduled against it. Dropped frames are counted, not hidden.
- Frame-step while paused must show the requested output frame.
- Rapid seeks are coalesced. Stale completions can't move the playhead backward.
- **Hardware decode and encode:** chosen by capability probing and tested output, with a visible software fallback. GPU presence does not imply codec or profile support.
- **DMA-BUF** negotiation covers format, modifier, planes, strides, GL context compatibility, and compositor support.
- Copy paths stay supported. Profiling decides whether zero-copy actually happens.

### Effects and color

- Start with qualified native elements. Add small Rust GStreamer operators where needed.
- Define each effect's semantics and parameter units once.
- **Don't** add an unrelated `wgpu` compositor just to sound more Rust-centric.

**Processing policy:**

- Explicit input transfer, range, primaries, and matrix.
- Geometry and compositing in a documented working space.
- Alpha is premultiplied consistently at compositor boundaries.
- Explicit output transform.
- **Proposed:** start with SDR Rec.709. Use a clearly tagged sRGB still-image conversion.
- Qualify linear-light versus display-referred operators **one by one**. Don't claim all filters are physically correct.

**HDR:**

- HDR input detection and an explicit SDR tone-map choice are required before HDR phone media is accepted.
- Full HDR output, 10-bit pipelines, display color management, PQ and HLG metadata, and scopes are separate T16 and T32 acceptance cases.
- Unsupported HDR export must **never** be labeled HDR.

### Export

- The export process probes every dependency **before** allocating the destination.
- Render to a job-owned temp file. Drain the pipeline and muxer. Verify decoded timing and the expected frame count. Then publish.
- Check encoder priming and trailing samples separately from container duration. The container duration field alone does not prove exactness.

**Profiles** list the required encoder, parser, and muxer elements.

- **Baseline open profiles:** WebM VP9 and Opus, where available.
- **MP4 H.264 and AAC:** an important usability target. Must pass legal, build, and runtime qualification.
- Codec patents are separate from FOSS license compatibility.
- **Never** ship a non-redistributable FFmpeg build in an official package.

## 8. Job and AI protocol

### Jobs

- **Fields:** ID, kind, input asset hashes and ranges, parameter schema version, model and runtime identity, resource estimate, permission set, cancellation token, output directory.
- **States:** queued → preparing → running → validating → ready.
- **Terminal alternatives:** failed, cancelled.
- **Downloading** is a separate preparatory state.

### Worker messages

- Versioned JSON control messages over a local pipe or socket.
- Large data goes through capability-limited files or shared buffers. **Not** base64 frame dumps.
- Enforce bounds on message size, schema, and paths.
- Validate worker output (duration, dimensions, timestamps, hash) **before** showing it.

### Accepting results

- Results never mutate the project directly.
- User acceptance submits a command with the source identity and revision expectations.
- If the clip changed: offer a recompute, or keep the result as unattached media.
- **Never** apply stale tracking coordinates or transcript cuts to new footage.

### Model manifest

Each model records:

- Exact artifact URL and hash.
- Code license, weight license, and tokenizer, vocoder, and voice licenses.
- Redistribution and commercial-use rights.
- Attribution, language coverage, hardware and runtime needs.
- Precision or quantization. Measured benchmarks. Known limits.

**Rules:** no remote code execution from model metadata. Prefer safe weight formats. Still validate resource bounds.

## 9. Local AI candidates and license gates

These are **researched candidates**, not prequalified dependencies. Recheck exact versions and artifacts before any download or distribution.

| Capability | Candidate | Required caution |
|---|---|---|
| Captions | whisper.cpp plus a selected Whisper checkpoint | Record the runtime license and the checkpoint license separately. Word timings need evaluation. |
| Alignment and diarization | WhisperX, a separate aligner, or a pyannote variant | Multiple model terms and download gates. Diarization is not identity recognition. |
| Speech cleanup | DeepFilterNet | Exact checkpoint rights and algorithmic latency. Compensate for lookahead. |
| Separation | Demucs family | Maintenance status and weight terms. Preserve temporal alignment. |
| Segmentation and tracking | SAM2 | Apache-2.0 code and checkpoints, as stated upstream. Segmentation is **not** high-quality alpha matting. |
| Human matting | Robust Video Matting | GPL code. Exact weight redistribution needs explicit confirmation. |
| Interpolation | RIFE or an ncnn implementation | Exact implementation and checkpoint licenses. Occlusion and cut artifacts. |
| Upscale | Real-ESRGAN | BSD code does not by itself license every checkpoint. |
| TTS | Kokoro-82M or Piper | Kokoro checkpoint is Apache-2.0. Voices and phonemizers have separate terms. Piper voices have individual terms. |
| Translation | Qualified OPUS-MT language pairs | License and quality per pair. Not a blanket language guarantee. |
| Voice cloning | An OpenVoice-compatible qualified stack | Consent, impersonation safeguards, and the rights of dependent models and vocoders. |
| Local generation | An exact Apache-licensed Wan checkpoint candidate | Heavy GPU cost, and temporal and quality limits. The upstream benchmark is not ours. |

**Exclusions:** do not put NLLB noncommercial weights, XTTS CPML weights or outputs, or revenue-restricted LTX checkpoints into an unrestricted official FOSS model pack.

**External integrations** must disclose their separate service terms. Calling a remote service does not make that service open source.

## 10. Licensing and provenance

- Keep these separate in the manifest: app GPL, third-party library licenses, model weights, sample media, and generated-output rights.
- **Samples:** original or CC0. OFL fonts only after checking redistribution and name clauses.
- **Original assets** can use CC-BY-4.0 with attribution. Code stays GPL.
- **No** mandatory CLA or copyright assignment.
- **DCO** records contributor attestation. It does **not** replace asset review.

**Output rights:**

- The GPL covers distributed program code. It does not automatically cover a user's exported video.
- Source media, music, templates, voices, or model terms can still affect output rights.
- The UI must show those terms. It must **not** make a blanket "commercially safe" promise.

**Packaging:**

- Record each dependency's source, version, build flags, license and notice locations, and source offer in the SBOM.
- FFmpeg `--enable-gpl` and codec-library choices change the obligations.
- `--enable-nonfree` can make the binary non-redistributable.
- Packaging is a release gate, not an afterthought.

## 11. Interchange and optional services

- **Native projects are authoritative.**
- **OTIO** carries editorial structure. Ship a machine-readable loss report for effects, text, speed maps, or nesting the adapter can't represent.
- **SRT and VTT** keep timing and text. They lose styling and word animation. Warn before a lossy export. Never overwrite native captions with a simplified round-trip.
- **CapCut draft import** is a bounded adapter for legally readable, supported versions. Keep the original file. Reject unsupported or encrypted input, and explain why. **No** promise of universal import or export back to CapCut.
- **Sync** uses immutable revision snapshots and content-addressed assets. **Not** concurrent sync of a live journal directory. Offline concurrent changes branch first, then merge explicitly.
- **Review comments** anchor to a revision, sequence, and time range.
- **Simultaneous editing** needs a server-ordered operation log or a qualified merge algorithm, plus its own tests. Basic file sync is not collaboration.
- **Self-hosted services** are optional. API credentials live in the OS secret store. Access control and signed download capabilities apply to every asset request. Local mode works if the services disappear.
