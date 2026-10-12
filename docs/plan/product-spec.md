# t-cut Product Specification

> **Status:** planning baseline, 2026-10-12. No application is built yet.
> **Name:** public name **t-cut**. Crates, binaries and paths use the `tcut-*` prefix (earlier drafts said `lce-*`). Naming does not establish trademark clearance.
> **Versions and MVP acceptance:** [release-roadmap.md](release-roadmap.md).

## At a glance

- **What:** a free, open-source, Rust-led video editor for Linux.
- **Who:** creators moving from CapCut Desktop (Windows/macOS) to Linux. Also educators, offline creators, and contributors.
- **Core promise:** import, edit, caption, save safely, and export, with no account, ads, watermark, subscription, or feature unlocks.
- **Familiarity bar:** the MVP follows the CapCut Desktop layout and navigation. A generic four-pane editor is not enough.
- **Not claimed:** identical CapCut behavior, a parity percentage, or any release date.

## 1. Users and outcome

**Primary user:** a creator on Linux editing short-form social videos, tutorials, interviews, and longer YouTube projects.

**Secondary users:**

- Educators.
- Privacy-conscious offline creators.
- Contributors extending the app.

**Outcome:** import personal footage, arrange and polish a timeline, add captions, save safely, and export a reliable result using recognizable controls.

**Interface clarification (2026-10-12):**

- The MVP must closely follow the complete CapCut Desktop layout: Home and project cards, creating and opening projects, editor states, settings, relinking, and export.
- The reference is the [screenshot-backed study](../research/research.md). The acceptance rules are the [fidelity contract](../research/fidelity-contract.md).
- Unverified details stay marked as proposed. They are not claimed identical.

## 2. Global constraints

These rules apply to every plan in this package.

**Product and license**

- [ ] Core editing is free, open source, offline-capable, account-free, ad-free, and watermark-free.
- [ ] Original code is planned as GPL-3.0-or-later. This is a recommendation, not a license change to existing repos.
- [ ] A GPL program can be sold by downstream redistributors. The gratis policy is not a restriction added to the GPL.

**Engineering**

- [ ] Rust owns project state and edit semantics. Audited native libraries and isolated model workers are allowed.
- [ ] Target: Linux x86_64, with Wayland and X11 both supported. Linux aarch64 follows only after the same gates pass.
- [ ] Preview and export use the same versioned edit and effect semantics.
- [ ] Unsupported operations fail visibly. They never silently disappear.

**Assets and data**

- [ ] The app has its own branding, icons, artwork, and redistributable assets.
- [ ] No CapCut resource extraction or copied proprietary code.
- [ ] Original media is never modified by editing.
- [ ] Save and export never overwrite unrelated files without explicit user authorization.
- [ ] Official bundled model packs need documented redistribution and commercial-use rights. Zero price is not a substitute for a compatible license.

**Privacy and AI**

- [ ] No media leaves the device without an explicit destination and consent.
- [ ] AI failure never silently switches to a cloud provider.

**Claims**

- [ ] "Familiar" means recognizable layout, terminology, command placement, and behavior. Pixel identity and legal clearance are not asserted.
- [ ] No feature is "complete" from a menu entry, source-line count, screenshot, mock result, or unexercised test.
- [ ] No deadline, complete CapCut parity percentage, or universal real-time 4K claim before qualification.

## 3. Evidence labels

Use these labels in issues and parity records.

| Label | Meaning | Evidence needed |
|---|---|---|
| **D** documented | Cited upstream docs state the behavior. | The citation. |
| **V** visual | Inspected public screenshot. | Source, dimensions, cohort. Not an executed observation. |
| **O** observed | An identified app build was exercised. | OS, build, date, inputs, output. |
| **P** proposed | Our own product or engineering decision. | The decision record. |
| **G** gate | Evidence or qualification still needed. | The gate's test. |

**Read these carefully:**

- Official marketing establishes a capability claim, not measured quality.
- CapCut desktop, mobile, and web are separate references.
- A how-to article about another editor does not establish a CapCut feature. See [sources](sources.md).
- The research covers 28 public images, split by cohort and app state. It is layout evidence, not proof of one app's behavior.
- Exact defaults, gestures, and undocumented menus need a pinned CapCut Desktop build before any compatibility claim.

## 4. Product boundaries

### Required local product

- Local projects and assets. No account.
- Timeline editing, playback, recording, compositing, typography, color, audio, captions, and export.
- Original reusable effects, templates, transitions, and title styles.
- Optional downloadable local model packs, with honest hardware and language coverage.
- Visible diagnostics, recovery, keyboard remapping, accessibility, and localized UI.
- Open project format and documented editorial interchange.

### Full-scope optional subsystems

Tracked as requirements, never silently dropped. Each has its own runtime, license, infrastructure, and acceptance gate. The local product must work when they are absent.

- Cloud sync, team review, collaboration, and authorized social publishing.
- Script-to-video, generative video and image workflows, advanced inpainting, consent-based voice cloning, and avatars.
- CapCut draft import, for versions and constructs that can be lawfully and reliably read.
- Photo and cover composition tied to videos. Not a Photoshop replacement.

A stable local-editor release is not marketed as full-platform parity.

### Deliberate non-goals

- Redistributing CapCut's asset catalog, voices, templates, music, fonts, proprietary models, branding, or executables.
- Bypassing subscriptions, account controls, encryption, or provider API restrictions.
- Rewriting every codec, GUI library, inference runtime, or OS API in Rust.
- A browser, Android, or iOS app in the initial Linux program. Creator capabilities can exist on Linux without cloning mobile navigation.
- Promising identical generative outputs, undocumented service behavior, or social-platform approval.

## 5. Feature registry

Each row is a deliverable family, not one checkbox for every edge case. Tasks are defined in [implementation](implementation.md). States start **planned**. A release records sub-capabilities and exceptions one by one.

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
| F36 | CapCut-familiar Home, create/open/manage projects, editor layout, inspector, settings, toolbar, keyboard profile and contextual actions | T04,T09,T37 | D/V/O/P separated; the local application workflow begins in MVP |
| F37 | Accessibility, UI scaling, high contrast, reduced motion, localization, keyboard-only workflows | T37 | Native AT-SPI/Orca verification |
| F38 | Privacy, safe imports, untrusted templates/models, provenance, no forced telemetry | T38 | Threat model and permissions |
| F39 | Linux packaging, GPU matrix, reproducible artifacts, notices and source availability | T39 | Flatpak first; audited release |
| F40 | Contributor onboarding, governance, issue templates, sustainability, public parity ledger | T40 | No hidden proprietary core |

## 6. Reference workflows

Each workflow has a prepared corpus project and a screen recording or annotated trace. A headless run can cover the timeline. Interaction still needs the real GUI.

| ID | Workflow | Checks |
|---|---|---|
| W01 | Quick vertical edit | Import three phone clips, trim, reorder, set 9:16, add a transition and music, export H.264/AAC when that profile exists. |
| W02 | Captions | Transcribe an interview, fix a name, split a caption, restyle all captions, highlight words, export video and SRT separately. |
| W03 | Motion | Add a title, keyframe position and opacity, edit easing, attach to a track, verify exported motion. |
| W04 | Speed | Freeze a frame, ramp speed down and up, keep speech pitch on constant-speed parts, inspect variable-speed audio transitions. |
| W05 | Compositing | Layer a cutout over video, correct mask edges, add chroma-key footage and a LUT, compare preview and export. |
| W06 | Podcast | Two cameras and a separate mic. Sync, alternate angles, remove reviewed pauses, duck music, export with no end drift. |
| W07 | Resilience | Save, move sources, reopen and relink, kill the app during an edit or save, recover without changing originals. |
| W08 | Offline | Network off. Open, edit, run an installed caption model, export. No account or service prompt blocks work. |
| W09 | Accessible edit | Do W01 with keyboard and Orca. Select clips by named items and exact time fields, not pointer-only drags. |
| W10 | Template | Replace footage and text slots in an original template. Keep timing rules. Export and report license provenance. |
| W11 | Collaboration | Edit one project offline on two devices. Sync and resolve a branch conflict without overwriting either version. |
| W12 | Generative insert | Request an optional local generation. Cancel and retry. Inspect provenance. Insert the accepted result as normal editable media. |

## 7. Familiarity acceptance

This is a directional usability check, not a market claim.

- [ ] Recruit at least five people who use CapCut Desktop regularly, including one keyboard-heavy creator.
- [ ] Each participant does the task on a pinned CapCut build for a baseline, then on t-cut, with the same prepared media.
- [ ] At least 4 of 5 finish W01 and W02 with no tutorial or moderator hints.
- [ ] Median completion time is at most 1.25x each participant's baseline. Exclude the environment check and model-download or transcription time.
- [ ] Record wrong-control picks, mode errors, unexpected timeline movement, and recovery help.
- [ ] A familiar-looking layout with different drag, split, selection, or undo rules **fails** the gate.
- [ ] Conflicts with accessibility or Linux window-manager shortcuts are documented and remappable. Not hidden.
- [ ] Unavoidable differences go in a searchable migration page, not a forced onboarding tour.

## 8. Release claims

Track five kinds of parity separately: **capability**, **quality**, **performance**, **interoperability**, and **services**. One percentage hides more than it shows.

| Release | Claim allowed |
|---|---|
| Research build | Only qualified capabilities enabled. Not a production recommendation. |
| v0.1 local alpha | The roadmap MVP scenario, W07, and offline core editing pass. Full W01 and W08 are not required before transitions and installed caption models ship. |
| v0.2 everyday alpha | Full timeline modes and static editing with manual captions pass. |
| v0.3 creator beta, v0.4 AI beta | Exercise W01–W10 where the required capabilities ship. Record each excluded workflow and the feature that will own it. Never call a subset a full pass. |
| v1.0 stable local editor | Supported local workflows, corpus and hardware gates, and package and migration gates pass. No release-blocking data-loss, security, timing, or rights defects. |
| Post-1.0 service releases | W11 and W12, and their external prerequisites, qualify independently. |

**Rules**

- No phase drops a requested family. A blocked family stays visible, with its prerequisite and owner.
- Provider-specific features can stay unavailable without credentials or legal rights. Track the equivalent local workflow separately, where feasible.

## 9. Open decisions with gates

These are **not** permission to invent facts.

- **Public name, domain, app ID:** maintainer trademark and domain review before signed releases. Source uses the `tcut` prefix meanwhile.
- **Exact CapCut reference build and defaults:** capture legally obtained app behavior before calling any profile "verified."
- **GES hard paths:** reverse, ramped audio, nesting, color, render endpoints, and zero-copy must pass T01.
- **GPU and model performance:** benchmark chosen checkpoints on real reference hardware. A README throughput number is not our benchmark.
- **Social API approvals and managed-service funding:** external dependencies. Never required for local editing.
