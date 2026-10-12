# Engineering Qualification and First Editable Export Plan

> **For agentic workers:** in the app repository, follow the `tcut-version-workflow` skill and the matching file in `docs/versions/`. Steps use checkboxes (`- [ ]`).

## At a glance

- **Goal:** prove the Rust/Linux stack, then ship import → edit → save/reopen → export with real media and exact timing.
- **Scope:** this is the engineering starter and first safe edit/export slice. It is **not** the whole v0.1 release. The [MVP contract](release-roadmap.md) also needs Home, basic geometry/text/audio, settings, relink/recovery, and installed-package acceptance.
- **Architecture:** [architecture.md](architecture.md). Key ideas: ownership, rational time, immutable render snapshots, durable saves.
- **Spec:** [product-spec.md](product-spec.md) features F01–F04, F09, F29, F30, F36. Parent tasks T01–T09 in [implementation.md](implementation.md).
- **Stack:** Rust 1.96.0 (initial pin). Planned family: GTK4 Rust 0.10, GLib 0.21, GStreamer/GES Rust 0.24, GTK sink 0.14. Native floors: GTK ≥4.14, GStreamer/GES ≥1.26. As of 2026-10-12 a newer matched family also exists (gtk4 0.11, glib 0.22, gstreamer 0.25, gst-plugin-gtk4 0.15); T01 selects one family and records it in the engine ADR.
- **Known open issue:** a nominal 4-second, 30 fps render produced **121 frames (4.033333 seconds)**. T01 must explain and fix it, or reject the engine.

> **Rule:** this is a plan, not a created app. Every shell command below is a **future instruction**, unless it is listed as observed. No packages were installed, no models downloaded, and no repo created.

Start with real media, correct time, reversible edits, and reliable output. Don't start by drawing forty disabled feature tabs. Styling can't fix a broken renderer.

## A. Observed local state

Checked during the research session:

| Check | Observed result | Consequence |
|---|---|---|
| `rustc --version` | 1.96.0 | Usable starting compiler |
| `cargo --version` | 1.96.0 | Cargo available |
| `pkg-config --modversion gstreamer-1.0` | 1.28.7 | GStreamer dev metadata found |
| `gst-launch-1.0 --version` | GStreamer 1.28.7 | GStreamer CLI available |
| `pkg-config` for gtk4 and gst-editing-services-1.0 | Not found in search path | Need dev packages or a runtime SDK. Does not prove the runtime is absent |
| `ges-launch-1.0 --version` | Rejected as timeline input | Not a version query. Don't infer the GES version from it |

- A `libges-1.0` pkg-config query also failed. The inspected bindings request **`gst-editing-services-1.0`**. Use that name for the real build prerequisite.
- An earlier research render of a GES CLI timeline with a transparent title decoded fine. But it gave 121 frames / 4.033333 s for the nominal 4 s, 30 fps case.
- That proves a basic installed render path. It does **not** prove frame-exactness, Rust integration, speed ramps, or production readiness.

## B. Repository and dependency setup

- [ ] Work in the separate app repository `tcut-editor/` (prepared as a starter folder with `AGENTS.md`, skills and version plans). Do not put app code in the planning/website repository and do not touch `photocraft/`. Confirm the path before running shell setup.
- [ ] Add `LICENSE` (GPL-3.0-or-later), SPDX headers, `README.md`, `.gitignore`, `rust-toolchain.toml`, and root `Cargo.toml`. Don't move existing research repos.
- [ ] Pick a maintained Flatpak SDK or runtime that meets the native floors. Record the exact runtime branch, commit, and offline source hashes. Native Fedora dev is useful, but it does not replace package qualification.
- [ ] Lock the matched dependency families below. Run `cargo tree -d` to catch duplicate GLib families. Check advisories before freezing the lockfile.

**Proposed root manifest.** Only the first real crates are listed:

```toml
[workspace]
members = [
  "apps/tcut-desktop",
  "crates/tcut-core",
  "crates/tcut-engine",
]
resolver = "3"

[workspace.package]
edition = "2024"
rust-version = "1.96"
license = "GPL-3.0-or-later"
version = "0.1.0"

[workspace.dependencies]
gtk = { package = "gtk4", version = "0.10", features = ["v4_14"] }
glib = "0.21"
gio = "0.21"
gst = { package = "gstreamer", version = "0.24", features = ["v1_26"] }
ges = { package = "gstreamer-editing-services", version = "0.24", features = ["v1_26"] }
gst-video = { package = "gstreamer-video", version = "0.24", features = ["v1_26"] }
gst-audio = { package = "gstreamer-audio", version = "0.24", features = ["v1_26"] }
gst-pbutils = { package = "gstreamer-pbutils", version = "0.24", features = ["v1_26"] }
serde = { version = "1", features = ["derive"] }
serde_json = "1"
thiserror = "2"
```

- **GTK sink:** built or installed as a native GStreamer plugin from the matched `gst-plugin-gtk4` 0.14 family. Don't assume it appears just because `gtk4` is in `Cargo.toml`.
- **Record:** the feature set (`waylandegl`, the chosen X11 GL path, `dmabuf`) and the license.
- **Alternative:** static in-process registration. Only after ownership and license review. Don't link two copies by accident.

**`rust-toolchain.toml`:**

```toml
[toolchain]
channel = "1.96.0"
components = ["rustfmt", "clippy"]
profile = "minimal"
```

**Dev prerequisite commands.** Run these only when implementation begins:

```sh
pkg-config --modversion gtk4 gstreamer-1.0 gst-editing-services-1.0
gst-inspect-1.0 gtk4paintablesink
gst-inspect-1.0 compositor
gst-inspect-1.0 audiomixer
cargo tree -d
```

**Package names by distro:**

- **Fedora:** `gstreamer1-devel`, `gstreamer1-plugins-base-devel`, `gst-editing-services-devel`, and `gtk4-devel`.
- **Debian/Ubuntu:** `libgtk-4-dev`, `libgstreamer1.0-dev`, `libgstreamer-plugins-base1.0-dev`, `libges-1.0-dev`.
- **Check first:** repo versions against the chosen floors. An old LTS default may be too old.
- **Codecs:** plugin availability depends on the repo. Don't enable external codec repos automatically. Don't silently change system packages.

## C. Qualification corpus

**Fixtures:**

- Generate original visuals and audio.
- Add consented phone samples where generation can't copy hardware quirks.
- Each fixture manifest records: license, generator command, hash, intended timing.
- Use **image-frame sequence labels** as the oracle. Don't use a renderer-derived label, because it shares the bug under test.

| Fixture | Inputs and operation | Required result |
|---|---|---|
| Q01 exact duration | 120 uniquely numbered source frames at 30 fps; render the full source | Exactly 120 decoded output frames; labels 0 through 119 |
| Q02 trim | Same source; range `[1,3)` seconds | Exactly 60 output frames; labels 30 through 89 |
| Q03 adjacent clips | Red clip `[0,2)`, blue clip `[2,4)` | Red frame 59, blue frame 60; no black or duplicate boundary |
| Q04 fractional rate | 30000/1001 numbered-frame source, repeated splits and undo | Same frame identities and rational duration as the unsplit source |
| Q05 alpha title | White outlined text over two colored clips | Background stays visible; title is not an opaque white plane |
| Q06 audio timing | Flash frames with sample-positioned impulses | Known flash/impulse alignment after cuts, resample, and export |
| Q07 VFR | Deliberately irregular PTS, unique frame content | Selected source frame follows PTS intervals; proxy mapping matches |
| Q08 reverse/freeze | Reverse a selected range, then hold one frame | Descending labels, then the chosen frame repeated for the defined duration |
| Q09 ramp | Piecewise rate with an analytically known integral | Output maps to the expected source times under the specified frame-selection rule |
| Q10 nesting | Same edits flat and in a child sequence | Equivalent decoded pixels and audio within operator/codec tolerance |
| Q11 ownership | Rapid seek, window resize, and open/close while playing | No GTK/GES thread violations, no stale frame accepted, no deadlock |
| Q12 color | Known SDR patches and a tagged HDR sample | Correct documented interpretation. Unsupported path explicitly blocked |

**Runner output.** JSON fields: `scenario`, `backend_version`, `plugins`, `input_hashes`, `output_frames`, `first_frame_id`, `last_frame_id`, `audio_offset_samples`, `failures`, `elapsed`, `peak_memory`, `gpu_path`.

- Record every failure.
- Never collapse the result into one boolean. That hides hard-path gaps.

**Tasks:**

- [ ] Build the Rust qualification example with real GES objects on one owning context.
- [ ] Add the actual GTK sink preview. Exercise Q11 visibly.
- [ ] Decode the generated files with ffprobe/FFmpeg or a second qualified reader. Inspect first, boundary, and last images, and the audio samples.
- [ ] Diagnose the known 121-frame endpoint result using stream PTS, EOS, and range evidence. **No blanket "drop the last frame" patch.** First establish the interval contract and check all rates.
- [ ] Complete `docs/adr/0001-media-engine.md`: tested paths, unresolved failures, custom-element requirements, accepted version set, and the backend decision.

**Inspection commands** (run after the example writes its file):

```sh
ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=codec_name,r_frame_rate,avg_frame_rate,nb_read_frames,duration \
  -of json target/qualification/q01.webm
ffmpeg -v error -i target/qualification/q01.webm -f null -
```

> **Frame count is necessary but not enough.** A duplicated frame plus a missing frame can keep the count. Check labels, PTS, and audio alignment too.

## D. First domain tests

Define the public domain APIs in `tcut-core` **before** UI code touches state.

- **Types:** `Time`, `FrameRate`, `TimeRange`, `Project`, `Sequence`, `Track`, `Clip`, `Command`, `EditError`.
- **Rule:** constructors validate invariants. No GLib types enter this crate.

- [ ] **Time:** normalize 2/4 to 1/2. Reject denominator zero. Check 1/3 + 1/6 equals 1/2. Reject checked-arithmetic overflow. Map frame 30000 at 30000/1001 to exactly 1001 seconds.
- [ ] **Split:** split a two-second clip at one second. Source intervals partition with no gap or overlap. Reject a boundary split. Undo restores the original ID and state. Redo restores stable child identities from the stored operation.
- [ ] **Lock:** a multi-clip move that touches one locked dependency rejects the whole transaction. All positions stay unchanged.
- [ ] **Animation split:** an interpolated property has the same value at sample points before and after a clip split, including the split boundary.
- [ ] **Journal:** a partial trailing record is ignored. Earlier committed records replay once. A checksum failure is never silently skipped. Snapshot and journal rotation cannot duplicate commands.

**Rule for every test:** watch it fail for the right behavioral reason first. Implement the smallest domain behavior. Run the targeted test. Exercise the consuming path.

Don't keep tests that only check a menu string, wrapper forwarding, or file layout.

## E. First end-to-end slice

After qualification passes, implement T02–T08 in this order:

1. Exact domain model and durable save/recovery. Exercise headlessly.
2. Import and probe local media, plus the selected stream descriptors.
3. Native workbench with real preview, playback, and source/sequence mode.
4. Clip insert, split, trim, move, and delete. One-transaction undo. Keyboard alternatives.
5. Immutable export snapshot and a headless export worker.
6. GUI export: destination, progress, cancel. Uses the same worker.
7. Reopen, collect, relink, and offline scenario runner. Initial package.
8. Full snapping, magnet, and linkage mode matrix. Before any complicated creator effects.

### Acceptance project

**Inputs:** 12 seconds of numbered 30 fps video, 12 seconds of owned spoken audio, and one still image.

- [ ] Import all three with no network access.
- [ ] Create a 1920×1080, 30 fps sequence. Insert video `[0,12)`.
- [ ] Split at 4 and 8 seconds. Remove the middle with explicit ripple. Output source ranges become `[0,4)` then `[8,12)`.
- [ ] Add a still-image overlay during sequence `[1,3)`. Add a manual title through the qualified text path when T18 is ready. The title is **not** a prerequisite for the bare editing slice.
- [ ] Apply a simple fade only after that operator is qualified. Unsupported optional effects are never silently included in the initial result.
- [ ] Save, close, reopen. Compare all clip and source intervals, and check the edit-history invariants.
- [ ] Export 8 seconds at 30 fps: **240 decoded frames**. Source frame 119 is followed by 240 at the cut (before overlays). Audio policy must be correct.
- [ ] Cancel a second export. The first export stays intact and the project stays editable.
- [ ] Kill the app during a later save. Recover the last durable revision.

**Audio note:** the voice audio must be linked to the video, or explicitly edited to match the cut. An independent 12-second audio bed would legitimately extend the sequence. Assert the intended link and ripple state, and the explicit export range. Don't guess the timeline duration from the video alone.

## F. Review checkpoints

| Checkpoint | Evidence required | Stop condition |
|---|---|---|
| Dependency gate | Matched GLib family, plugin discovered, native floors met, licenses inventoried | Unresolved ABI, license, or runtime mismatch |
| Engine gate | Q01–Q12 reports and real preview evidence | Timing, retime, ownership, or output correctness unresolved |
| Model gate | Behavioral tests and a kill/recover trace | Partial edits, drift, or lost durable changes |
| Workbench gate | Actual familiar import/edit workflow | Fake frames, mouse-only critical edits, text shortcut collisions |
| Export gate | Full decoded output and frame/audio oracle | Preview/export disagreement or corrupt publication |
| Package gate | The same workflow in an installed sandbox | Host-only dependencies or lost portal access |

Expand creator feature tasks **only after** these pass. This order does not shrink the product scope. It keeps the rest of the project from depending on an unqualified foundation.
