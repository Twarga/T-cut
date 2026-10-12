# Engineering Qualification and First Editable Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the selected Rust/Linux stack, then deliver import → edit → save/reopen → export with real media and exact timing.
**Architecture:** [architecture.md](architecture.md), particularly ownership, rational time, immutable render snapshots and durable saves.
**Tech Stack:** Rust 1.96.0 initial pin, GTK4 Rust 0.10, GLib 0.21, GStreamer/GES Rust 0.24, GTK sink 0.14; GTK >=4.14 and native GStreamer/GES >=1.26.
**Spec:** [product-spec.md](product-spec.md), F01–F04/F09/F29/F30/F36; parent tasks T01–T09 in [implementation.md](implementation.md).

## Global Constraints

Apply the product spec's Global Constraints. This is a plan, not an already-created application. All shell commands below are **future implementation instructions** unless explicitly listed as observed. No package installation, model download, or new application repository creation has been performed for this planning deliverable.

Do not start by drawing forty disabled feature tabs. Start with real media, correct time, reversible edits and reliable output. Styling cannot resolve a faulty renderer.

This starter is engineering qualification and the first safe edit/export slice, not the whole v0.1 release. The finalized [MVP contract](release-roadmap.md) also requires real Home/project lifecycle, basic geometry/text/audio slices, settings, relink/recovery and installed-package acceptance. Its version boundaries supersede older milestone shorthand.

## A. Observed local prerequisite state

During this research session:

| Check | Observed result | Consequence |
|---|---|---|
| `rustc --version` | 1.96.0 | Usable starting compiler available |
| `cargo --version` | 1.96.0 | Cargo available |
| `pkg-config --modversion gstreamer-1.0` | 1.28.7 | Native GStreamer development metadata found |
| `gst-launch-1.0 --version` | GStreamer 1.28.7 | GStreamer CLI available |
| `pkg-config` for gtk4 and gst-editing-services-1.0 | Packages not found in search path | Need development packages/runtime SDK; does not prove runtime absent |
| `ges-launch-1.0 --version` | Rejected as timeline input | Not a supported version query; do not infer GES version from it |

A supplementary `libges-1.0` pkg-config query also failed, but the inspected bindings correctly request **`gst-editing-services-1.0`**; use that name for the real build prerequisite.

Earlier research rendered a GES CLI timeline with a transparent title and decoded it. The nominal four-second 30fps case yielded 121 frames/4.033333 seconds. That proves a basic installed render path, **not** frame-exactness, Rust integration, speed ramps, or production readiness. T01 must explain and resolve or reject that behavior.

## B. New repository and reproducible dependency setup

- [ ] Create `linux-creator-editor/` as a new sibling project, not inside or replacing `photocraft/`. Confirm intended path before executing shell initialization.
- [ ] Add `LICENSE` (GPL-3.0-or-later), SPDX headers, `README.md`, `.gitignore`, `rust-toolchain.toml` and root `Cargo.toml`. Do not move existing research repositories.
- [ ] Select a maintained Flatpak SDK/runtime satisfying native floors; record exact runtime branch/commit and offline source hashes. Native development on Fedora is useful, but does not replace package qualification.
- [ ] Resolve and lock the matched dependency families below; inspect `cargo tree -d` for duplicate GLib families and check advisories before freezing the lockfile.

Proposed initial root manifest, with only the first real crates present:

```toml
[workspace]
members = [
  "apps/lce-desktop",
  "crates/lce-core",
  "crates/lce-engine",
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

The sink is initially built/installed as a native GStreamer plugin from the matched `gst-plugin-gtk4` 0.14 family, not assumed to appear because `gtk4` is in Cargo.toml. Record its feature set (`waylandegl`, selected X11 GL path, `dmabuf`) and license. An in-process static registration is an alternative only after ownership and licensing review; do not link two copies accidentally.

`rust-toolchain.toml`:

```toml
[toolchain]
channel = "1.96.0"
components = ["rustfmt", "clippy"]
profile = "minimal"
```

Development prerequisite commands, to run only when beginning implementation:

```sh
pkg-config --modversion gtk4 gstreamer-1.0 gst-editing-services-1.0
gst-inspect-1.0 gtk4paintablesink
gst-inspect-1.0 compositor
gst-inspect-1.0 audiomixer
cargo tree -d
```

Fedora package families from upstream binding documentation include `gstreamer1-devel`, `gstreamer1-plugins-base-devel`, `gst-editing-services-devel`, with `gtk4-devel` for GTK development. Plugin availability/restricted codecs varies by configured repository. Debian/Ubuntu equivalents include `libgtk-4-dev`, `libgstreamer1.0-dev`, `libgstreamer-plugins-base1.0-dev`, `libges-1.0-dev`. Check repository versions against chosen floors before installing; an old LTS default may be too old. Do not enable external codec repositories automatically or silently change system packages.

## C. Qualification corpus and expected results

Create original fixtures with generated visuals/audio, plus consented phone samples where generation cannot emulate hardware quirks. Each fixture manifest includes license, generator command, hash and intended timing. Use image-frame sequence labels as an independent oracle; not a renderer-derived label that shares the bug under test.

| Fixture | Inputs and operation | Required result |
|---|---|---|
| Q01 exact duration | 120 uniquely numbered source frames at 30fps; render full source | Exactly 120 decoded output frames; labels 0 through 119 |
| Q02 trim | Same source; range `[1,3)` seconds | Exactly 60 output frames; labels 30 through 89 |
| Q03 adjacent clips | Red clip `[0,2)`, blue clip `[2,4)` | Red frame 59, blue frame 60; no black/duplicate boundary |
| Q04 fractional rate | 30000/1001 numbered-frame source, repeated splits/undo | Same frame identities and rational duration as unsplit source |
| Q05 alpha title | White outlined text over two colored clips | Background remains visible; title does not become opaque white plane |
| Q06 audio timing | Flash frames with sample-positioned impulses | Known flash/impulse alignment after cuts, resample and export |
| Q07 VFR | Deliberately irregular PTS, unique frame content | Selected source frame follows PTS intervals; proxy mapping matches |
| Q08 reverse/freeze | Reverse selected range, then hold one frame | Descending labels then repeated chosen frame for defined duration |
| Q09 ramp | Piecewise rate with analytically known integral | Output maps to expected source times within specified frame selection rule |
| Q10 nesting | Same edits flat and in child sequence | Equivalent decoded pixels/audio within operator/codec tolerance |
| Q11 ownership | Rapid seek/window resize/open-close while playing | No GTK/GES thread violations, stale frame acceptance or deadlock |
| Q12 color | Known SDR patches and tagged HDR sample | Correct documented interpretation; unsupported path explicitly blocked |

Qualification runner outputs JSON fields: `scenario`, `backend_version`, `plugins`, `input_hashes`, `output_frames`, `first_frame_id`, `last_frame_id`, `audio_offset_samples`, `failures`, `elapsed`, `peak_memory`, `gpu_path`. Record all failures; do not reduce a result to a single boolean hiding hard-path gaps.

- [ ] Build the Rust qualification example with real GES objects on one owning context.
- [ ] Add actual GTK sink preview and exercise Q11 visibly.
- [ ] Decode generated files independently with ffprobe/FFmpeg or a second qualified reader, then inspect first/boundary/last images and audio samples.
- [ ] Diagnose the known 121-frame endpoint result with stream PTS/EOS/range evidence. No blanket “drop the last frame” patch without establishing the interval contract and checking all rates.
- [ ] Complete `docs/adr/0001-media-engine.md`: tested paths, unresolved failures, custom-element requirements, accepted version set and backend decision.

Example independent output inspection commands, after the example creates its file:

```sh
ffprobe -v error -count_frames -select_streams v:0 \
  -show_entries stream=codec_name,r_frame_rate,avg_frame_rate,nb_read_frames,duration \
  -of json target/qualification/q01.webm
ffmpeg -v error -i target/qualification/q01.webm -f null -
```

Frame count is necessary but insufficient: a duplicated frame and a missing frame can preserve the count. Check labels/PTS and audio alignment as well.

## D. First domain behavior tests

Define public domain APIs in `lce-core` before UI code mutates state. Initial types: `Time`, `FrameRate`, `TimeRange`, `Project`, `Sequence`, `Track`, `Clip`, `Command`, `EditError`. Constructors validate invariants. No GLib types enter this crate.

- [ ] Time tests: normalize 2/4 to 1/2; reject denominator zero; compare 1/3 + 1/6 to 1/2; reject checked arithmetic overflow; map frame 30000 at 30000/1001 to exactly 1001 seconds.
- [ ] Split tests: split two-second clip at one second; source intervals partition without gap/overlap; boundary split rejected; undo restores original ID and state; redo restores stable child identities according to stored operation.
- [ ] Lock tests: multi-clip move affecting one locked dependency rejects the entire transaction, leaving all positions unchanged.
- [ ] Animation split test: an interpolated property has the same value at sample points before and after clip split, including split boundary.
- [ ] Journal tests: partial trailing record ignored, earlier committed records replayed once, checksum failure not silently skipped, snapshot/journal rotation cannot duplicate commands.

For every test, verify the behavioral failure before implementation, then implement the smallest domain behavior, run the targeted test, and exercise the consuming path. Do not retain tests that only assert a menu string, wrapper forwarding or file layout.

## E. First end-to-end product slice

After qualification passes, implement T02–T08 in this exact dependency order:

1. Exact domain model and durable save/recovery; exercise headlessly.
2. Import/probe local media and selected stream descriptors.
3. Native workbench with real preview/playback and source/sequence mode.
4. Clip insert/split/trim/move/delete with one-transaction undo and keyboard alternatives.
5. Immutable export snapshot and headless export worker.
6. GUI export destination/progress/cancel using that same worker.
7. Reopen/collect/relink/offline scenario runner and initial package.
8. Full snapping/magnet/linkage mode matrix before adding complicated creator effects.

### Concrete acceptance project

Use 12 seconds of numbered 30fps video, 12 seconds of owned spoken audio and one still image.

- [ ] Import all three without network access.
- [ ] Create a 1920×1080/30fps sequence; insert video `[0,12)`.
- [ ] Split at 4 and 8 seconds, remove middle with explicit ripple, leaving output source ranges `[0,4)` then `[8,12)`.
- [ ] Add still-image overlay during sequence `[1,3)` and a manually authored title through the qualified text path when T18 is available; do not make title a prerequisite of the initial bare editing slice.
- [ ] Apply a simple fade only after that operator is qualified; unsupported optional effects are not silently included in the initial acceptance result.
- [ ] Save, close, reopen; compare all clip/source intervals and edit history invariants.
- [ ] Export eight seconds at 30fps: **240 decoded frames**, with source frame 119 followed by 240 at the cut (before overlays), and correct audio policy.
- [ ] Cancel a second export; confirm first export remains intact and project editable.
- [ ] Terminate during a later save and recover the last durable revision.

The initial voice audio must be linked or explicitly edited to match the video cut; keeping an independent twelve-second audio bed would legitimately extend the sequence. Assert the intended link/ripple state and explicit export range rather than guessing timeline duration from video alone.

## F. Starter review checkpoints

| Checkpoint | Evidence required | Stop condition |
|---|---|---|
| Dependency gate | Matched GLib family, plugin discovered, native floors met, licenses inventoried | Unresolved ABI/license/runtime mismatch |
| Engine gate | Q01–Q12 reports and real preview evidence | Timing, retime, ownership or output correctness unresolved |
| Model gate | Behavioral tests + kill/recover trace | Partial edits, drift or lost durable changes |
| Workbench gate | Actual familiar import/edit workflow | Fake frames, mouse-only critical edits, text shortcut collisions |
| Export gate | Full decoded output + frame/audio oracle | Preview/export disagreement or corrupt publication |
| Package gate | Same workflow in installed sandbox | Host-only dependencies or lost portal access |

Only then expand creator feature tasks. This ordering does not shrink the full product scope; it prevents the rest of the project from depending on an unqualified foundation.
