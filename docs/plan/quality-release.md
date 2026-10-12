# Quality, Security, Distribution and Governance Plan

Spec: [product-spec.md](product-spec.md). Task ownership: T37–T40 and each feature task in [implementation.md](implementation.md). Targets below are **proposed qualification budgets**, not measured application results.

Release scope is authoritative in [release-roadmap.md](release-roadmap.md). Apply these quality gates to every shipped capability from v0.1 onward. Full W01/W08 and the W01/W02 familiarity study only apply when their transition/caption capabilities ship; the MVP instead runs the explicitly specified Home-to-export scenario and applicable A01–A14 interface checks. Record exclusions, never report an unexecuted full workflow as passing.

## 1. Quality is multidimensional

Track capability coverage, editorial correctness, output fidelity, interaction familiarity, performance, crash/data safety, interoperability, accessibility and licensing separately. An app can look familiar while producing an incorrect frame or losing projects; those are release blockers.

No generated code volume, test count, star count, or percentage of menu labels is a quality metric. Every advertised capability links to a reproducible scenario and identifies known limitations.

### Evidence artifact for each accepted task

- Feature/task ID and exact project revision.
- Native/Rust/plugin/model versions, build flags, driver and OS/runtime.
- Input corpus license and hashes; sequence format and operations.
- Actual invocation or UI action trace, expected behavior and observed result.
- Rendered-media properties and independently decoded frame/audio checks where relevant.
- Performance sample count/environment if performance is claimed.
- Remaining exclusions and user-visible fallback/error behavior.

## 2. Test layers and what each proves

| Layer | Valid purpose | Does not prove |
|---|---|---|
| Domain unit/property tests | Rational time, graph validity, command atomicity/inverse, edit boundaries | GUI behavior, codec correctness |
| Persistence integration | Crash windows, migration, locks, archive safety | Hardware/storage never fails |
| Media integration | Seek/render/PTS/audio/effect semantics on real media | Packaged hardware performance everywhere |
| Golden/operator tests | Known transforms/color/audio results within defined tolerances | Every GPU produces bit-identical compressed output |
| GUI/AT workflows | Focus, gestures, shortcuts, IME, actual screen reader interaction | Rendering fidelity without export inspection |
| Fuzzing | Parser/protocol bounds, malformed inputs, crash discovery | Absence of all vulnerabilities |
| Package tests | Included dependencies, permissions, clean install/upgrade | Host-developer environment equivalence |
| Human evaluation | Caption quality, tracking failure, retouch artifacts, familiarity | Universal language/model quality |

Property tests generate bounded projects and legal commands, then assert invariant preservation and inverse equivalence. Also generate invalid commands and assert no mutation. Keep deterministic seeds in failure reports. Do not assert exact internal allocation layouts, menu strings or mocked forwarding just to inflate coverage.

Golden references use synthetic analytical results where possible. GPU floating point and lossy codecs need documented tolerances plus structural checks. A globally permissive pixel-difference threshold can conceal missing layers; compare regions/edges/time boundaries relevant to each effect.

## 3. Corpus design

### Core footage matrix

- CFR: 24, 25, 30, 50, 60 and fractional 24000/1001, 30000/1001, 60000/1001 where supported.
- VFR: actual source PTS; phone screen recordings and deliberately constructed irregular cadence.
- Resolution: small previews, 720p, 1080p, 2160p; portrait, landscape, square, odd dimensions and nonsquare pixels.
- Orientation: metadata rotations and physically rotated pixels; avoid double rotation.
- Containers/codecs: actual shipped profile matrix including H.264/H.265 input only where decoder/legal availability is qualified; open VP8/VP9/AV1 candidates, PCM/FLAC/Opus/AAC as qualified.
- Images: PNG alpha, JPEG orientation, very large dimensions, malformed headers, bounded SVG.
- Audio: 44.1/48/96kHz as supported, mono/stereo/multichannel mapping, silence, impulses, clipped peaks, long streams.
- Color: limited/full range, Rec.709 SDR, sRGB images, tagged PQ/HLG inputs, missing/contradictory metadata.
- Typography: RTL, CJK, combining marks, emoji, multiline text, missing fonts and deliberately long names.
- Storage: local SSD, slow removable disk, denied portal grant, moved media, low disk space, read-only directory.

### Adversarial media/project cases

Truncated files, corrupt indexes, huge durations, excessive streams/layers/nesting, integer overflow times, NaN effect values, oversized LUT/model metadata, path traversal/symlinks, ZIP bombs, hostile SVG external references, malformed subtitle encodings, journal corrupt suffix and stale worker results.

Synthetic fixtures are CC0/original. Real human/phone fixtures need written consent and redistributable rights or private CI storage with public generator equivalents. Never commit arbitrary customer videos or downloaded CapCut sample assets.

## 4. Performance budgets

Measure cold/warm paths separately and publish machine details. P95 uses repeated samples; do not quote p95 from one run. A reduced-resolution preview is not a full-quality 4K claim.

### Proposed reference tiers

| Tier | Hardware class to procure/identify | Intended qualification |
|---|---|---|
| L | 4-core/8-thread laptop CPU, 8GB RAM, integrated GPU, SSD | 1080p proxy editing; CPU captions on a smaller qualified model |
| M | 8-core CPU, 16GB RAM, Intel/AMD integrated or midrange discrete GPU, NVMe | 1080p full-quality common effects, proxy-assisted 4K |
| H | 12+ CPU cores, 32GB+ RAM, 12GB+ VRAM discrete GPU, NVMe | Heavy local models, multi-layer 4K and restoration qualification |

These are planning classes, not guaranteed minimum specs. Name exact machines/GPUs/drivers before publishing requirements. A model fitting in VRAM does not guarantee acceptable latency; shared-memory and driver overhead matter.

### Initial acceptance budgets on tier M, local SSD, qualified media

| Path | Proposed target | Measurement boundary |
|---|---|---|
| Pointer/selection feedback | p95 <=50ms | Event receipt to visible selection/drag feedback, excluding media decoding |
| UI frame during timeline pan | p95 <=16.7ms at 60Hz | 10,000 clips with virtualized visible region |
| Warm proxy seek | p95 <=200ms | Request to correctly identified frame presentation |
| Cold long-GOP original seek | p95 <=750ms target | Codec/range explicitly recorded; show buffering if longer |
| Two-layer 1080p30 basic playback | <=1% dropped frames over 5 minutes after warmup | Qualified transforms/text; record audio underruns separately |
| AV sync | <=1 output video frame error end-to-end; tighter operator/sample checks internally | Flash/impulse at start, middle and end of 60-minute render |
| Autosave durability | <=2 seconds undurable edits during ordinary load | Crash-injection evidence; manual Save forces flush |
| Open small saved project | <=3 seconds before editable UI | Cached metadata, 100 clips; background probing allowed with explicit state |
| Idle/background growth | No unbounded memory/disk growth | Two-hour edit/job cycle and repeated project open/close |

If a target fails, profile and document the path; do not lower quality silently while continuing to quote the full-quality number. A changed target requires an ADR with hardware/quality tradeoffs.

### Resource policies

- Account cache sizes globally; reserve disk before long render/proxy/model jobs where possible.
- Preview and audio get higher priority than background analysis; avoid CPU/GPU oversubscription.
- Bound decoded-frame caches by bytes and active temporal window, not just number of assets.
- Never copy every decoded frame through Rust-owned CPU memory if a qualified native/GPU path can retain it.
- Worker OOM/crash produces a failed job and readable recovery, not a hung modal or corrupted project.
- Cancellation reaches worker/pipeline and job-owned temp cleanup; cancellation latency is measured per stage.

## 5. AI evaluation

An inference process returning a file is not enough to release its feature.

| Family | Evaluation | Release behavior on uncertainty |
|---|---|---|
| Speech recognition | WER/CER and timing errors by language/accent/noise; human correction burden | Always editable, review warning, no transcription accuracy guarantee |
| Alignment/diarization | Word boundary offsets, overlapping speech, speaker confusion | Unknown speaker labels and manual correction |
| Translation | Bilingual human adequacy/terminology review | Preserve source; flag unsupported language pairs |
| Denoise/separation | Speech intelligibility, artifacts, stem alignment, latency | Bypass/strength comparison; originals retained |
| Tracking/reframe | Point/box error, occlusion loss, subject switches, crop safety | Confidence/lost state and correction keys |
| Matting | Edge quality/hair/transparency plus temporal flicker | Editable mask and honest failure examples |
| Interpolation | Cut handling, occlusion artifacts, timing | Do not interpolate across detected cuts automatically |
| Restoration | Temporal stability, text/facial distortions, tile seams | Compare original; no factual-detail recovery claim |
| TTS/dubbing | Language/pronunciation, pacing, voice rights, temporal alignment | Explicit consent/provenance and editable timing |
| Generation/avatar | Prompt adherence, temporal artifacts, consent, runtime/cost | Review before insertion; external-provider terms explicit |

Every official pack includes exact artifact hashes and licenses, sample hardware metrics, download/disk requirements, uninstall path and known limitations. Model updates are versioned; old project renders cannot silently switch semantic model versions. Accepted generated media is retained as project media to avoid mandatory re-inference during ordinary export.

## 6. Security and privacy threat model

Assets, archives, project files, codecs, plugins, worker outputs, models and remote services are untrusted boundaries. Rust reduces classes of memory errors in Rust code; native decoders/runtimes and unsafe bindings still require defense and updates.

### Required controls

1. No arbitrary shell command interpolation from paths, metadata, captions or model names. Use argument arrays and controlled working directories.
2. Canonicalize/validate archive destinations, reject traversal, symlink escapes and resource-exhausting nested archives.
3. Hash and version model downloads, use authenticated transport, verify expected size/content, and avoid pickle/remote-code loading where a safe format is supported. Safe serialization does not prevent every runtime/resource vulnerability.
4. Separate worker output from project authority. Validate dimensions, times, paths and hashes before importing output.
5. Spawn inference/export with minimal file/network capabilities where platform packaging allows. Document any weaker process isolation; a subprocess is not inherently a sandbox.
6. Keep credentials in OS secret storage; redact logs and never put access tokens in project files or crash reports.
7. Core uses no mandatory network. Download, upload, publishing and external AI each require explicit action and destination disclosure.
8. Privacy diagnostics are opt-in and inspectable, with media/transcripts/paths excluded unless explicitly attached by the user.
9. Services enforce authorization per project, asset, revision and comment; signed links expire; test cross-tenant enumeration/access.
10. Maintain security contact, disclosure policy, supported versions, advisory monitoring and emergency dependency rebuild procedure.

Consent recording for voice/avatar workflows is a product safeguard, not proof of ownership or immunity from abuse. Hosted services need additional abuse/legal policies before launch.

## 7. Accessibility and UI qualification

Run the actual GTK surface with Orca/AT-SPI on GNOME and keyboard-only on GNOME/KDE. Do not claim screen-reader support solely because standard buttons are accessible: the custom timeline, curves, player handles and caption list need explicit semantics and alternative commands.

Acceptance matrix:
- Import, select, split, trim numerically, move to another track, edit captions, keyframe a value, save and export without mouse.
- Focus visible and stable through dialogs, pane collapse, scene selection, errors and asynchronous job completion.
- Text entry/IME cannot trigger global edits; test Japanese, Chinese, Korean and dead-key input.
- 100%, 150%, 200% scale; 1366×768 and 1024×768; long translations, RTL shell and mixed-direction captions.
- High contrast, non-color track/status identification, reduced UI motion and legible time fields.
- A hidden/collapsed pane never contains the only route to recover/save/export.

W01/W02 familiarity comparison records task completion and errors against each participant's pinned CapCut baseline. Publish only qualified workflow familiarity, not “zero relearning for everyone.”

## 8. Flatpak and native Linux release plan

### Permission defaults

Prefer Wayland with tested X11 fallback; render/audio permissions and graphics device access only as required. Use file chooser/document portals instead of blanket home/host filesystem access. Core Flatpak need not have network by default; if model download or optional services require network access in the same package, disclose it and enforce explicit app-level consent. A single package permission is not fine-grained per-feature security.

Qualify persisted document grants for referenced media across reopen/reboot. A temporary portal path must not become an invalid long-term project locator. Capture uses ScreenCast portal/PipeWire. Microphone/camera permissions and device behavior are tested in the installed package.

### GPU/media matrix

At minimum test Intel Mesa, AMD Mesa and one supported NVIDIA driver path; Wayland GNOME and KDE; X11 fallback; software rendering/decode fallback. Record exact GPUs/drivers/runtime extensions. Headless CI cannot certify actual DMA-BUF import, device permissions or driver-specific encode correctness.

### Release artifacts

- Source tag and corresponding source/build instructions, including modified native components.
- Locked Cargo/native sources and checksums; no build-time network after vendoring/fetch.
- SBOM of Rust and native dependencies with build flags and licenses.
- AppStream/desktop files, original icons, localized metadata, supported MIME/file associations.
- Checksums/signatures, changelog, known issues, supported hardware/profile matrix and migration notes.
- License notices and source fulfillment sufficient for actual GPL/LGPL/MPL components; codec patent analysis handled separately.
- Upgrade test: old project opens without loss, migration backup retained, cancelled update does not damage projects.

Native distro packages or AppImage can follow, but each becomes a separately maintained integration surface. Do not promise every Linux distribution from one successful Fedora launch.

## 9. CI stages

### Every change

- Format/lint/type/build checks for affected crates after implementation, not mid-flight while shared edits are incomplete.
- Domain and parser tests; deterministic project validation and migration fixtures.
- Small real media integration renders/decodes for affected semantics.
- License/advisory checks and changed-dependency review.

### Scheduled or dedicated runners

- Longer codec/color/audio corpus, crash injection, fuzzing, memory/resource soak.
- GPU matrix on actual hardware, driver/runtime updates, AI quality/latency samples.
- Package install/update/offline workflow.
- GUI automation plus human/AT session where tooling cannot establish semantics reliably.

### Release candidate

All supported workflows and profiles; fresh signed artifacts; documented unresolved gaps; rights/source audit; independent maintainer sign-off. A green headless suite does not override a known user-reported crash or wrong render.

### Per-release candidate scope

Run every supported scenario for the shipped scope, including the MVP's Home/project-lifecycle, relink, recovery, cancellation and export checks. A later release additionally runs the workflows its new capabilities enable. Shipping a smaller feature set never authorizes skipping data-safety, accessibility, package or rights evidence for what does ship.

## 10. Release-blocking defects

Block release for:
- Source or project data loss; undo/recovery breaks authoritative model.
- Wrong frame/range/audio sync beyond published contract on supported corpus.
- Silent missing media/effects/fonts altering export without warning/authorization.
- Export overwriting an unrelated file or cancellation deleting a prior valid output.
- Required online account/network for advertised offline editing.
- Unlicensed redistribution, noncommercial model hidden in unrestricted official pack, or missing source obligations.
- Credential/content leakage or cross-project service authorization failure.
- Keyboard/IME edits unexpectedly deleting/modifying timeline content.
- Installed package unable to execute advertised basic import/export workflow.
- Home or project lifecycle losing, misidentifying or silently replacing a saved project; Trash/Restore destroying original media.
- Export reporting success without finalized validated output, or advertised profile unavailable in the installed package.
- Advanced capability presented as working while unimplemented, or a release claim stating verified compatibility without recorded pinned-build evidence.

Cosmetic differences from CapCut are not automatically bugs; independent identity is intentional. Unfamiliar editing behavior is evaluated against the explicit UI contract and compatibility ledger.

## 11. Governance and sustainable free distribution

Recommended organization:
- One integration/release maintainer accountable for schema and cross-subsystem correctness.
- Media engineer ownership for timing/codecs/color/audio; desktop engineer for GTK/interaction/accessibility.
- Model integrator for reproducible/licensed AI packs; QA/packaging ownership for hardware/runtime evidence.
- Roles can be held by the same people; none disappears because coding agents are used.

Use public ADRs, issue reproduction templates, DCO, code of conduct and license provenance. No exclusive CLA or hidden required service. Original code remains GPL-3.0-or-later; third-party notices remain intact. Docs may be CC-BY-4.0 and original test media CC0; record exceptions explicitly.

Funding: donations, sponsorship, grants and optional paid support/hosting are compatible with a free core. Managed GPU inference, storage, bandwidth, signing, hardware and maintainer time have costs. Do not subsidize an unlimited-free-cloud promise by later locking local editing features. A self-hostable optional service is a sustainable boundary; publish operating requirements and backup procedures.

No calendar estimate is reliable before T01 and the first vertical slice. Estimate remaining work using measured implementation/review/qualification throughput, model/license gates and available maintainers. Producing code faster does not remove corpus, usability, legal or hardware qualification work.

## 12. Plan-deliverable validation versus product validation

For this research deliverable, check that all feature IDs map to tasks, all task dependencies exist, there are no unqualified cyclic prerequisites, local document links resolve, example TOML parses, fences are balanced and source/decision/evidence labels are clear.

That check proves the **plan package** is navigable and internally structured. It does not prove the future application builds or any feature passes. Product acceptance begins when implementation and the actual scenarios described above are executed.
