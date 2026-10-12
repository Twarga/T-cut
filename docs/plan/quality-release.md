# Quality, Security, Distribution, and Governance Plan

> **Status:** the targets below are **proposed qualification budgets**. They are not measured application results.
> **Links:** [product-spec.md](product-spec.md) · [implementation.md](implementation.md) (T37–T40 and each feature task) · [release-roadmap.md](release-roadmap.md) (authoritative release scope)

## At a glance

- **Quality has 9 separate tracks:** capability coverage, editorial correctness, output fidelity, interaction familiarity, performance, crash and data safety, interoperability, accessibility, licensing.
- **Release blockers:** wrong frames and lost projects. Familiar UI does not excuse either.
- **Not quality metrics:** code volume, test count, star count, percent of menu labels.
- **Every advertised capability** links to a reproducible scenario and lists its known limits.
- **Gates start at v0.1.** The full W01/W08 and W01/W02 studies apply only when transition or caption features ship.
- **MVP:** run the Home-to-export scenario and the applicable A01–A14 checks.
- **Exclusions:** record them. Never report an unexecuted workflow as passing.

## 1. Evidence for each accepted task

Attach all of this to the task:

- [ ] Feature or task ID, and the exact project revision
- [ ] Native, Rust, plugin, and model versions. Build flags. Driver, OS, runtime.
- [ ] Input corpus license and hashes. Sequence format and operations.
- [ ] Actual invocation or UI action trace. Expected behavior and observed result.
- [ ] Rendered-media properties. Independently decoded frame and audio checks where relevant.
- [ ] Performance sample count and environment, if performance is claimed.
- [ ] Remaining exclusions. User-visible fallback and error behavior.

## 2. Test layers

| Layer | Valid purpose | Does **not** prove |
|---|---|---|
| Domain unit and property tests | Rational time, graph validity, command atomicity and inverse, edit boundaries | GUI behavior, codec correctness |
| Persistence integration | Crash windows, migration, locks, archive safety | Hardware or storage never fails |
| Media integration | Seek, render, PTS, audio, effect semantics on real media | Packaged hardware performance everywhere |
| Golden and operator tests | Known transforms, color, and audio results within defined tolerances | Every GPU producing bit-identical compressed output |
| GUI and assistive-tech workflows | Focus, gestures, shortcuts, IME, real screen-reader interaction | Rendering fidelity without export inspection |
| Fuzzing | Parser and protocol bounds, malformed input, crash discovery | Absence of all vulnerabilities |
| Package tests | Included dependencies, permissions, clean install and upgrade | Host-developer environment equivalence |
| Human evaluation | Caption quality, tracking failure, retouch artifacts, familiarity | Universal language or model quality |

### Property tests

- Generate bounded projects and legal commands. Assert invariants hold and inverses restore state.
- Generate invalid commands. Assert **no mutation**.
- Keep deterministic seeds in failure reports.
- **Don't** assert internal allocation layout, menu strings, or mocked forwarding just to raise coverage.

### Golden references

- Prefer synthetic analytical results.
- GPU floating point and lossy codecs need documented tolerances **plus** structural checks.
- A global pixel-difference threshold can hide missing layers. Compare the regions, edges, and time boundaries that matter for each effect.

## 3. Corpus

### Core footage matrix

| Area | Cases |
|---|---|
| Frame rate | CFR 24, 25, 30, 50, 60. Fractional 24000/1001, 30000/1001, 60000/1001 where supported. |
| Variable frame rate | Actual source PTS. Phone screen recordings. Deliberately irregular cadence. |
| Resolution | Small previews, 720p, 1080p, 2160p. Portrait, landscape, square, odd sizes, non-square pixels. |
| Orientation | Metadata rotation and physically rotated pixels. **Avoid double rotation.** |
| Containers and codecs | The shipped profile matrix. H.264 and H.265 input only where decoder and legal availability is qualified. Open VP8, VP9, AV1 candidates. PCM, FLAC, Opus, AAC as qualified. |
| Images | PNG alpha, JPEG orientation, very large dimensions, malformed headers, bounded SVG. |
| Audio | 44.1, 48, 96 kHz as supported. Mono, stereo, multichannel mapping. Silence, impulses, clipped peaks, long streams. |
| Color | Limited and full range. Rec.709 SDR. sRGB images. Tagged PQ and HLG inputs. Missing or contradictory metadata. |
| Typography | RTL, CJK, combining marks, emoji, multiline text, missing fonts, deliberately long names. |
| Storage | Local SSD, slow removable disk, denied portal grant, moved media, low disk space, read-only directory. |

### Adversarial cases

- Truncated files. Corrupt indexes. Huge durations.
- Excessive streams, layers, or nesting.
- Integer-overflow times. NaN effect values.
- Oversized LUT or model metadata.
- Path traversal and symlinks. ZIP bombs.
- Hostile SVG external references. Malformed subtitle encodings.
- Corrupt journal suffix. Stale worker results.

### Fixture rules

- Synthetic fixtures: CC0 or original.
- Real human or phone fixtures: written consent and redistributable rights, **or** private CI storage with public generator equivalents.
- **Never** commit arbitrary customer videos or downloaded CapCut sample assets.

## 4. Performance budgets

### Measurement rules

- Measure cold and warm paths **separately**. Publish machine details.
- P95 needs repeated samples. Never quote P95 from one run.
- A reduced-resolution preview is **not** a full-quality 4K claim.

### Reference tiers (proposed)

| Tier | Hardware class to procure or identify | Intended qualification |
|---|---|---|
| L | 4-core / 8-thread laptop CPU, 8 GB RAM, integrated GPU, SSD | 1080p proxy editing. CPU captions on a smaller qualified model. |
| M | 8-core CPU, 16 GB RAM, Intel or AMD integrated or midrange discrete GPU, NVMe | 1080p full-quality common effects. Proxy-assisted 4K. |
| H | 12+ CPU cores, 32 GB+ RAM, 12 GB+ VRAM discrete GPU, NVMe | Heavy local models. Multi-layer 4K and restoration qualification. |

- These are **planning classes**, not minimum specs.
- Name exact machines, GPUs, and drivers before publishing requirements.
- A model that fits in VRAM is not guaranteed acceptable latency. Shared memory and driver overhead matter.

### Acceptance budgets (tier M, local SSD, qualified media)

| Path | Proposed target | Measurement boundary |
|---|---|---|
| Pointer and selection feedback | P95 ≤50 ms | Event receipt to visible selection or drag feedback. Excludes media decoding. |
| UI frame during timeline pan | P95 ≤16.7 ms at 60 Hz | 10,000 clips, virtualized visible region |
| Warm proxy seek | P95 ≤200 ms | Request to correct frame presented |
| Cold long-GOP original seek | P95 ≤750 ms target | Record codec and range. Show buffering if longer. |
| Two-layer 1080p30 basic playback | ≤1% dropped frames over 5 minutes after warmup | Qualified transforms and text. Record audio underruns separately. |
| AV sync | ≤1 output video frame error end to end. Tighter operator and sample checks internally. | Flash or impulse at start, middle, and end of a 60-minute render |
| Autosave durability | ≤2 seconds of undurable edits during normal load | Crash-injection evidence. Manual Save forces a flush. |
| Open small saved project | ≤3 seconds to editable UI | Cached metadata, 100 clips. Background probing allowed, with explicit state. |
| Idle and background growth | No unbounded memory or disk growth | Two-hour edit and job cycle. Repeated project open and close. |

**If a target fails:** profile it and document the path. Don't silently lower quality while still quoting the full-quality number. Changing a target needs an ADR that states the hardware and quality tradeoffs.

### Resource policies

- Account for cache sizes globally.
- Reserve disk before long render, proxy, or model jobs where possible.
- Preview and audio outrank background analysis. Avoid CPU and GPU oversubscription.
- Bound decoded-frame caches by **bytes** and active time window. Not just by asset count.
- Don't copy every decoded frame through Rust-owned CPU memory if a qualified native or GPU path can keep it.
- Worker OOM or crash → failed job and readable recovery. Never a hung modal or a corrupted project.
- Cancellation reaches the worker and pipeline, and cleans up job-owned temp files. Measure cancellation latency per stage.

## 5. AI evaluation

**Rule:** a process that returns a file is not enough to release a feature.

| Family | Evaluation | Release behavior on uncertainty |
|---|---|---|
| Speech recognition | WER and CER, timing errors by language, accent, and noise. Human correction burden. | Always editable. Review warning. No accuracy guarantee. |
| Alignment and diarization | Word boundary offsets, overlapping speech, speaker confusion | Unknown speaker labels. Manual correction. |
| Translation | Bilingual human adequacy and terminology review | Keep the source. Flag unsupported language pairs. |
| Denoise and separation | Speech intelligibility, artifacts, stem alignment, latency | Bypass and strength comparison. Originals kept. |
| Tracking and reframe | Point or box error, occlusion loss, subject switches, crop safety | Confidence and lost state. Correction keys. |
| Matting | Edge quality (hair, transparency), temporal flicker | Editable mask. Honest failure examples. |
| Interpolation | Cut handling, occlusion artifacts, timing | **Don't** interpolate across detected cuts automatically. |
| Restoration | Temporal stability, text and facial distortion, tile seams | Compare with the original. **No** factual-detail recovery claim. |
| TTS and dubbing | Language, pronunciation, pacing, voice rights, temporal alignment | Explicit consent and provenance. Editable timing. |
| Generation and avatar | Prompt adherence, temporal artifacts, consent, runtime and cost | Review before insertion. External-provider terms stated. |

**Every official pack includes:**

- Exact artifact hashes and licenses
- Sample hardware metrics
- Download and disk requirements
- An uninstall path
- Known limitations

**Versioning:**

- Model updates are versioned.
- An old project's render **cannot** silently switch to a new semantic model version.
- Accepted generated media is kept as project media. This avoids re-running inference during ordinary export.

## 6. Security and privacy

### Threat model

Assets, archives, project files, codecs, plugins, worker outputs, models, and remote services are **untrusted boundaries**.

- Rust removes some classes of memory errors in Rust code.
- Native decoders, runtimes, and unsafe bindings still need defense and updates.

### Required controls

1. No arbitrary shell interpolation from paths, metadata, captions, or model names. Use argument arrays and controlled working directories.
2. Canonicalize and validate archive destinations. Reject traversal, symlink escapes, and resource-exhausting nested archives.
3. Hash and version model downloads. Use authenticated transport. Verify expected size and content. Avoid pickle and remote-code loading where a safe format exists. Safe serialization does **not** prevent every runtime or resource vulnerability.
4. Keep worker output separate from project authority. Validate dimensions, times, paths, and hashes before importing output.
5. Spawn inference and export with minimal file and network capability, where platform packaging allows. Document any weaker isolation. **A subprocess is not inherently a sandbox.**
6. Keep credentials in the OS secret store. Redact logs. Never put access tokens in project files or crash reports.
7. The core uses **no** mandatory network. Download, upload, publishing, and external AI each need an explicit action and a disclosed destination.
8. Privacy diagnostics are opt-in and inspectable. Media, transcripts, and paths are excluded unless the user explicitly attaches them.
9. Services enforce authorization per project, asset, revision, and comment. Signed links expire. Test cross-tenant enumeration and access.
10. Maintain a security contact, a disclosure policy, supported versions, advisory monitoring, and an emergency dependency-rebuild procedure.

**Note:** consent recording for voice and avatar work is a product safeguard. It is **not** proof of ownership or immunity from abuse. Hosted services need abuse and legal policies before launch.

## 7. Accessibility and UI qualification

- Test the **actual GTK surface** with Orca and AT-SPI on GNOME. Keyboard-only on GNOME and KDE.
- Standard buttons being accessible is **not** enough. The custom timeline, curves, player handles, and caption list need explicit semantics and alternative commands.

### Acceptance matrix

- [ ] Without a mouse: import, select, split, trim numerically, move to another track, edit captions, keyframe a value, save, export.
- [ ] Focus stays visible and stable through dialogs, pane collapse, scene selection, errors, and async job completion.
- [ ] Text entry and IME cannot trigger global edits. Test Japanese, Chinese, Korean, and dead-key input.
- [ ] Scale 100%, 150%, 200%. Sizes 1366×768 and 1024×768. Long translations, RTL shell, mixed-direction captions.
- [ ] High contrast. Track and status identified by more than color. Reduced UI motion. Legible time fields.
- [ ] A hidden or collapsed pane never holds the only route to recover, save, or export.

**Familiarity study (W01/W02):** record task completion and errors against each participant's pinned CapCut baseline. Publish only qualified workflow familiarity. **Never** claim "zero relearning for everyone."

## 8. Flatpak and native Linux release

### Permission defaults

- Prefer Wayland, with a tested X11 fallback. Grant render, audio, and graphics device access only as required.
- Use file chooser and document portals. **No** blanket home or host filesystem access.
- The core Flatpak needs no network by default.
- If model download or optional services need network in the same package: disclose it and enforce explicit app-level consent. One package permission is **not** fine-grained per-feature security.

### Portals and grants

- Test persisted document grants for referenced media across reopen and reboot.
- A temporary portal path must **never** become a long-term project locator.
- Capture uses the ScreenCast portal and PipeWire.
- Test microphone and camera permissions and device behavior in the **installed** package.

### GPU and media matrix

- **Minimum:** Intel Mesa, AMD Mesa, one supported NVIDIA driver path.
- **Sessions:** Wayland on GNOME and KDE. X11 fallback. Software rendering and decode fallback.
- Record exact GPUs, drivers, and runtime extensions.
- Headless CI **cannot** certify DMA-BUF import, device permissions, or driver-specific encode correctness.

### Release artifacts

- [ ] Source tag, plus corresponding source and build instructions, including modified native components
- [ ] Locked Cargo and native sources with checksums. No build-time network after vendoring or fetch.
- [ ] SBOM of Rust and native dependencies, with build flags and licenses
- [ ] AppStream and desktop files. Original icons. Localized metadata. Supported MIME and file associations.
- [ ] Checksums and signatures. Changelog. Known issues. Supported hardware and profile matrix. Migration notes.
- [ ] License notices and source fulfillment for the real GPL, LGPL, and MPL components. Codec patent analysis handled separately.
- [ ] Upgrade test: an old project opens without loss, the migration backup is kept, and a cancelled update does not damage projects.

Native distro packages or an AppImage can follow. Each is a separately maintained integration. **Don't** promise every Linux distribution from one successful Fedora launch.

## 9. CI stages

### Every change

- Format, lint, type, and build checks for affected crates, **after** implementation. Not mid-flight while shared edits are incomplete.
- Domain and parser tests. Deterministic project validation and migration fixtures.
- Small real-media renders and decodes for the affected semantics.
- License and advisory checks. Review of changed dependencies.

### Scheduled or dedicated runners

- Longer codec, color, and audio corpus. Crash injection. Fuzzing. Memory and resource soak.
- GPU matrix on real hardware. Driver and runtime updates. AI quality and latency samples.
- Package install, update, and offline workflow.
- GUI automation, plus a human and assistive-tech session where tooling can't establish semantics reliably.

### Release candidate

- Every supported workflow and profile.
- Fresh signed artifacts.
- Documented unresolved gaps.
- Rights and source audit.
- Independent maintainer sign-off.
- **A green headless suite does not override** a known user-reported crash or wrong render.

### Scope rule

- Run every supported scenario for the shipped scope. For the MVP, that includes Home and project lifecycle, relink, recovery, cancellation, and export.
- Later releases also run the workflows their new capabilities enable.
- **Shipping fewer features never skips** data-safety, accessibility, package, or rights evidence for what does ship.

## 10. Release-blocking defects

Block the release for any of these:

- Source or project data loss. Undo or recovery that breaks the authoritative model.
- Wrong frame, range, or audio sync beyond the published contract on the supported corpus.
- Silent missing media, effects, or fonts that change the export without warning or authorization.
- Export overwrites an unrelated file. Cancellation deletes a prior valid output.
- A required online account or network for advertised offline editing.
- Unlicensed redistribution. A noncommercial model in an unrestricted official pack. Missing source obligations.
- Credential or content leakage. Cross-project service authorization failure.
- Keyboard or IME input unexpectedly deletes or changes timeline content.
- The installed package cannot run the advertised basic import and export workflow.
- Home or project lifecycle loses, misidentifies, or silently replaces a saved project. Trash or Restore destroys original media.
- Export reports success without a finalized, validated output. Or an advertised profile is missing from the installed package.
- An advanced capability is presented as working while unimplemented. Or a release claims verified compatibility without recorded pinned-build evidence.

**Note:** cosmetic differences from CapCut are **not** bugs by default. Independent identity is intentional. Unfamiliar editing behavior is judged against the explicit UI contract and the compatibility ledger.

## 11. Governance and sustainable free distribution

### Roles

Recommended organization. Roles can be held by the same people. None disappears because coding agents are used.

- **Integration and release maintainer:** accountable for schema and cross-subsystem correctness.
- **Media engineer:** timing, codecs, color, audio.
- **Desktop engineer:** GTK, interaction, accessibility.
- **Model integrator:** reproducible and licensed AI packs.
- **QA and packaging:** hardware and runtime evidence.

### Open governance

- Public ADRs. Issue reproduction templates. DCO. Code of conduct. License provenance.
- **No** exclusive CLA. **No** hidden required service.
- Original code stays GPL-3.0-or-later. Third-party notices stay intact.
- Docs may be CC-BY-4.0. Original test media may be CC0. Record exceptions explicitly.

### Funding

- Donations, sponsorship, grants, and optional paid support or hosting are compatible with a free core.
- Managed GPU inference, storage, bandwidth, signing, hardware, and maintainer time all cost money.
- **Don't** subsidize an unlimited-free-cloud promise by later locking local editing features.
- A self-hostable optional service is a sustainable boundary. Publish its operating requirements and backup procedure.

### Calendar

No calendar estimate is reliable before T01 and the first vertical slice.

- Estimate from measured throughput: implementation, review, and qualification.
- Factor in model and license gates, and how many maintainers are available.
- Writing code faster does **not** remove corpus, usability, legal, or hardware qualification work.

## 12. Plan validation versus product validation

**For this research deliverable, check that:**

- Every feature ID maps to a task.
- Every task dependency exists. No unqualified cyclic prerequisites.
- Local document links resolve.
- Example TOML parses.
- Code fences are balanced.
- Source, decision, and evidence labels are clear.

**What this proves:** the plan package is navigable and internally structured.

**What it does not prove:** that the future app builds, or that any feature passes. Product acceptance starts only once implementation and the scenarios above are actually executed.
