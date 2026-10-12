# t-cut Interface and Interaction Contract

Spec: [product-spec.md](product-spec.md). The **2026-10-12 [screenshot-backed research](../research/research.md)** and [fidelity contract](../research/fidelity-contract.md) refine this document and take precedence over its earlier generic layout proposals. All dimensions/defaults remain proposals unless tied to an observed reference. The target is close whole-application CapCut Desktop familiarity, not just four editor panes.

## 0. Home and project lifecycle are MVP requirements

The first screen is a recognizable project dashboard: left navigation, prominent Create project area, Projects heading, project search/view/Trash controls and thumbnail cards. Creating a project leads directly into the empty editor; opening a recent/local project returns to its saved work. Include working Rename, Duplicate, Move to Trash/Restore, return Home, settings and missing-media flows. No mandatory login, fake Pro controls or unsupported AI-service cards.

Use the new fidelity contract's UI01–UI24 states and A01–A14 scenarios. The earlier SVG lacks Home and several correct control locations; it is historical, not a pixel/layout specification.

## 1. Familiar workbench, independent appearance

Official desktop guides document the broad pattern: library/tools left, player center, contextual properties right, multitrack timeline below, Export at the upper right. Preserve these locations. Preserve recognizable task names: Media, Audio, Text, Captions, Effects, Transitions, Filters, Adjustment, Split, Speed, Mask, Keyframe, Export.

Do not recreate CapCut's logo, icon silhouettes, proprietary thumbnails, promotional illustrations, animations, type treatment, or complete branded appearance. Use an original icon set with provenance, system UI typography, and independent semantic colors. Familiarity is tested by task performance, not pixel matching. See legal sources in [sources.md](sources.md).

### Regions and responsibilities

| Region | Contents | Always-available command |
|---|---|---|
| Project bar | Main menu, project name, save state, layout/shortcut access, Export | Open/save/export through menu and shortcuts |
| Library | Horizontal main-tool categories above an inner vertical category list and content area | Import; local files first |
| Player | Sequence/source preview, safe areas, overlay handles, quality and aspect selection | Play/pause, time entry, frame step |
| Inspector | Contextual fields, keyframe diamonds, reset, animation/effects | Show selected object's editable properties |
| Timeline toolbar | Select, undo/redo, split/edit tools, snapping, magnet, linkage, zoom and visible modes | Mode names and current state |
| Timeline | Ruler, playhead, named track headers, clips/waveforms/keyframes | Keyboard clip navigator and time-based editing |
| Status/jobs | Proxy/model/export status, recoverable error, cancel | Open job details; never conceal failure |

### Proposed initial pane geometry

- Compare the first fidelity prototype at the chosen reference capture size, then test 1366×768 and 1280×720 logical workspaces. Screenshot pixels do not establish logical units.
- Match the reference's compact title/application bar; determine logical height through a real GTK prototype rather than treating the earlier 44px proposal as observed fact.
- In primary screenshot S03, library/Player/inspector visually occupy approximately 34%/35%/29% of full width, with gutters. Use these as a reference comparison, not universal fixed ratios; user resizing and other screenshots differ.
- Keep timeline height resizable. Primary S03 devotes roughly the lower third to it; other captures show larger timelines. Establish usable minimums through the actual interface and scaling checks.
- Player consumes remaining width; protect 360 logical pixels before collapsing secondary panes.
- At narrower widths collapse the library browser first; preserve a labeled open-library button. Collapse the inspector to a focusable drawer next. Keep at most one secondary drawer open in focus mode.
- At 1024×768 show player/timeline plus selected drawer; do not compress all four panes into unreadable columns.
- At high text scaling use available content width, not physical screen resolution, to choose focus mode.
- Below a usable editing width offer maximize/focus mode, while menus and save/export remain operable. Never trap an unsaved project behind minimum-window-size rules.
- Save layout per workspace, not per project file; portable projects do not carry another monitor's coordinates. Provide Reset workspace.

## 2. Original design tokens

Define tokens in `apps/lce-desktop/resources/tokens.css`, consumed by component styles. GTK CSS is not browser CSS: use supported GTK constructs and generated named colors, not assume arbitrary web layout APIs.

| Token family | Initial proposal | Purpose |
|---|---|---|
| Spacing | 4, 8, 12, 16, 24 logical px | Dense, consistent grouping |
| Typography | system sans; 12 metadata, 14 controls, 16 section labels | Scale with system settings; tabular time digits |
| Surfaces | canvas, panel, raised, hover, selected | Separate regions without decorative gradients |
| Text | primary, secondary, disabled, on-accent | Measured contrast; disabled must still be understandable |
| Semantic | accent, focus, warning, error, success | Error/selection also use labels/shapes |
| Borders | divider, interactive, focus | Visible focus independent of selection |
| Motion | none, short feedback | Respect reduced motion; playback is content, not decoration |
| Tracks | video, audio, captions, effects | Labels/icons remain when colors are indistinguishable |

Dark workspace is initial default; system/light/high-contrast themes are supported. Do not hard-code a copied brand cyan. Text targets 4.5:1 normal contrast; critical control/focus boundaries target 3:1. These are design goals assessed with native desktop tooling, not an automatic claim of full WCAG web conformance.

Small trim handles may have enlarged invisible hit regions, but adjacent handles must remain distinguishable. Numeric trim/move controls provide an alternative when zoom makes a clip too small to drag safely.

## 3. Shared component contracts

- **ActionButton:** command ID, label, icon, shortcut, enabled state and reason. Icon-only actions have accessible names and tooltips; tooltips are not the only explanation of a blocked operation.
- **ParameterField:** value/unit/range, mixed-selection state, reset, keyframe state, validation, commit/cancel. Invalid input stays editable and never silently clamps without explanation.
- **TimeField:** display frame time or decimal seconds; accept explicit timebase; parsing reports invalid frames and unsupported drop-frame labels.
- **AssetTile:** name, thumbnail, duration/type, local/proxy/model status, license detail; selection is separate from insertion.
- **ClipView:** clip ID, name, track, start/end, selected/locked/missing/proxy status; renders only visible content; accessible representation is not a screenshot.
- **JobRow:** stage, measurable progress or indeterminate indicator, cancel/retry, output details, failure cause. Never fabricate remaining time before a meaningful estimate exists.
- **Modal:** reserve for irreversible external operations, overwrite authorization, and explicit settings that require a decision. Ordinary editing remains in panels/popovers.

Every component supports empty, loading, ready, selected, disabled, error, focus, hover, long-label, and high-contrast states where applicable. Focus returns to the invoking command after a drawer/dialog closes.

## 4. Selection, focus, and editing transactions

Selection is project editing state; keyboard focus is widget state. Moving focus to an inspector does not deselect its clip. Track locks prevent every mutation path, including shortcuts, scripts, inspector fields, and multi-selection commands.

1. Pointer down records the pre-edit snapshot and candidate gesture.
2. Movement beyond a small logical-pixel threshold enters a draft gesture; display ghost positions and affected clips.
3. Draft updates are coalesced at display cadence; they do not each append undo history or journal records.
4. Pointer release validates the final edit and commits one transaction.
5. Escape cancels the draft and restores the exact pre-edit state.
6. Loss of pointer capture cancels safely; it does not commit an accidental far-away drop.
7. A rejected edit explains the blocking locked clip, collision, duration, or missing source without partial changes.

Click selects one clip. Ctrl-click toggles membership; Shift-click extends a track-order range. Marquee selection uses intersection, with an explicit additive modifier. Multi-selection inspector shows common editable properties and a mixed value when they differ. Numeric changes set the chosen value on all eligible selected objects as one undo transaction; unsupported objects are enumerated before applying a partial subset.

## 5. Timeline modes: three separate systems

### Snap

Proposed default on. Candidate targets: playhead, eligible clip edges, sequence markers, in/out points; frame grid is the final quantization constraint, not an independent mystery mode. Captions and keyframes snap within their appropriate editing lanes.

Threshold: initial six logical pixels, converted to time at current zoom. Resolve nearest target first; ties prefer playhead, then explicit markers, then clip boundaries. Show a guide and target label. Use hysteresis to prevent flickering between close targets. Snapping moves the dragged edge or whole clip; it does not independently stretch a moved clip. Provide a visible temporary-disable modifier and remapping.

### Main-track magnet

Proposed default on in the familiar profile, with a visible indicator and preference. Exactly one video track is designated main. An insertion at a boundary pushes downstream main-track clips; insertion inside a main clip first splits that clip at the insertion point. Trim/deletion closes or opens time on the main track.

Other tracks move only through explicit link/anchor rules or an explicit all-tracks ripple command. An independent music bed does not mysteriously shorten. If the operation would violate a locked member of an affected link group, reject the transaction and identify the blocker. The user can turn magnet off for intentional gaps.

### Linked selection and follow anchors

Do not conflate three relationships:

- **AV pair:** video and extracted/associated source audio share source timing; moving keeps alignment. Slip/trim updates both unless explicitly detached.
- **Selection group:** selecting one selects the group when Linked selection is on; it is not a source-time relationship.
- **Follow anchor:** caption/B-roll/overlay records an anchor clip and timeline offset; a main-track move carries it. It does not automatically inherit the anchor's scale, color, or duration.

Disabling Linked selection changes selection expansion, not the stored links. Unlink changes the model and is undoable. Show link/anchor badges and explain dependencies in the move preview. Ripple across an anchor interval must preserve offsets or ask for an explicit detach decision; never invent a new anchor silently.

## 6. Operations and edge rules

| Action | Contract | Failure/edge behavior |
|---|---|---|
| Move | Preserve duration and source map; track change explicit | Reject incompatible/locked destination |
| Trim head/tail | Change source window and sequence duration coherently | Cannot exceed available source except explicit still/freeze policy |
| Split | Selected eligible clips at interior playhead; preserve animation evaluation | Exact endpoint is a no-op with explanation; no zero-length child |
| Delete | Remove selected items, honoring visible magnet policy | Undo restores IDs, timing, links, and effects |
| Ripple delete | Remove interval and shift participating material | Locked-crossing edit rejected atomically |
| Roll | Move adjacent shared boundary without sequence duration change | Source handles required on both sides |
| Slip | Move source interval without moving clip in timeline | Show source in/out previews and exact bounds |
| Slide | Move selected clip while adjusting immediate neighbors | Reject if either neighbor lacks handles |
| Duplicate | New IDs, same parameters, explicit placement | Links copied within duplicate set, never pointing accidentally to originals |
| Paste attributes | User chooses transform/color/audio/effects/animation families | Units/time domains validated; one undo operation |
| Split compound | Split parent mapping; child sequence remains editable | Never flatten without explicit render command |

Collision policy with magnet off: an insertion drop on an occupied area offers an explicit Insert/Overwrite action with a preview; it must not silently replace existing content. A simple move on a nonoverlap editorial track rejects collisions unless overwrite mode is selected. Compositing overlap is represented through separate layers/tracks, not ambiguous same-lane ordering.

Every drag action has Move to time, Trim by frames, Set source in/out, Move to track, or equivalent keyboard-accessible command.

## 7. Player and inspector

Player may show Source or Sequence; its mode is visibly named. Clicking bin preview does not silently replace sequence playback during an edit. Playhead and time display share one transport state. Scrubbing mutes audio by default until a separate audio-scrub option is qualified.

- Transform handles use sequence display coordinates and account for letterboxing, pixel aspect ratio, rotation metadata, and UI scale.
- Guides/safe areas are overlays, not burned into output.
- Video inspector: Basic/Transform, Mask, Speed, Tracking/Stabilization; Audio and Adjustment groups as applicable.
- Audio inspector: gain, pan, fades, automation, processing; separate loudness analysis from playback gain.
- Text/caption inspector: editable content, typography, timing, style, animation, language/speaker.
- No selection: sequence properties and project summary, never stale clip values.
- Unsupported/missing effect: keep its stored configuration visible with a repair/remove action; block export if silently omitting it would change output.
- Changing a numeric field while playing is one committed edit at field completion; live preview is a draft state.

## 8. Keyframes and speed curves

A diamond beside an animatable property shows: not animated, animated but no key here, key at current time. Accessible label includes property, action, and time. Buttons move to previous/next key. Default interpolation is linear; hold and cubic easing are explicit.

Adding the first key preserves the preexisting value outside the animated region. Splitting must preserve evaluation on both halves: insert evaluated boundary values and split interpolation segments, rather than dropping keys on one side. Keys belong to a declared time domain; see architecture.

Curve editor supports dragging and numeric time/value/tangent editing. Speed ramps display output duration, source range, and audio policy before commit. Zero speed is represented as a freeze segment, not division by zero. Reverse is an explicit mode/segment, not a curve crossing zero unnoticed.

## 9. Captions and transcript editing

Caption list and timeline refer to the same caption objects. Double-click opens text editing. Enter adds a newline in a multiline editor; Ctrl+Enter commits; Escape first cancels IME preedit according to toolkit behavior, then a subsequent cancellation can close the editor. Global editing shortcuts never intercept composing text.

Captions support manual and generated provenance, speaker, language, start/end, word timing, and style reference. Confidence is advisory, not permission to discard speech. Warn about unreadable durations/line lengths, but do not impose a guessed CapCut minimum duration as a hard file-format rule.

Split at an interior time distributes words by timing; if no word timing exists, ask for text split position or keep the text selected for correction. Do not duplicate the full sentence into both blocks silently. Apply style to all is explicit and undoable; per-word highlight timing survives text corrections when unambiguous, otherwise mark it for review.

Transcript deletions propose time ranges; user reviews waveform/video previews and link/ripple effects before applying. Filler-word and silence detection never automatically remove clips merely because a model is confident.

## 10. Shortcut baseline

All shortcuts are visible in menus and searchable in Preferences. Proposed Linux mapping uses Ctrl; this is not a macOS port specification.

| Command | Linux mapping | Evidence/status |
|---|---|---|
| Split selected at playhead | Ctrl+B | Official desktop subtitle documentation; exact selection behavior still observed-build gate |
| Play/pause | Space | Official PC resource claim; respect text focus |
| Frame back/forward | Left/Right | Official PC resource claim; only timeline/player context |
| Set range in/out | I / O | Official export help |
| Mark export range | Shift+X | Official export help; precise initial range selection must be qualified |
| Undo/redo | Ctrl+Z / Ctrl+Shift+Z | Proposed conventional mapping, not certified CapCut table |
| Save/import/export | Ctrl+S / Ctrl+I / Ctrl+E | Proposed |
| Delete selection | Delete | Proposed; visible magnet policy applies |
| Zoom timeline | Ctrl+wheel and visible +/- | Proposed; conflict checks and alternative buttons |
| Toggle keyframe editor | Configurable, initially unassigned | Alt+K appears in official resource but may conflict with desktop/window manager |

Shortcut settings detect duplicates within overlapping contexts, let users reset one mapping, export/import a versioned profile, and report unavailable platform combinations. Do not add undocumented aliases that consume text input. Do not label a complete profile “verified CapCut-compatible” before current-build observation.

## 11. Save, export, and recovery surfaces

Save project, Export media, Export captions, Collect project, and Share are different commands.

- Save state reads Saved / Saving / Unsaved / Save failed with a specific reason. Do not show Saved before durable write succeeds.
- Missing media uses an explicit offline placeholder in preview with relink controls. Final export blocks rather than rendering that placeholder unnoticed.
- Export dialog shows sequence/range, resolution, rational frame rate, container/codec, audio, color, destination, overwrite policy, and estimated size only when meaningful.
- Queue entry freezes a project revision. Later edits do not mutate an already queued export.
- Render writes a temporary sibling output and publishes it after validation. Cancellation removes that job's temporary files, not an earlier successful export.
- Failure names asset/effect/stage where possible and preserves editable project state. Retry starts a clean job; arbitrary mid-codec resume is not promised.
- On recovery, show recovered revision/time and original saved revision; offer separate recovered copy before replacing saved state.

## 12. Accessibility and localization acceptance

GTK native controls expose roles, names, values, focus and actions through AT-SPI. Custom timeline exposes an accessible clip list/tree with name, track, start/end, selection, lock, and editing actions. Virtualization cannot make selected clips inaccessible when scrolled away.

- Complete W01 and W09 from the product spec with keyboard and Orca.
- Focus stays visible in dark/light/high-contrast modes and at 200% text scale.
- Do not announce each playback frame; provide on-demand current time and throttled status.
- Translate UI strings through gettext; use plural rules and translator context.
- Test long German labels, Arabic/Hebrew RTL UI, Japanese/Chinese IME, combining marks, and mixed-direction captions.
- Timeline time still advances left-to-right in RTL shell as an explicit media-workspace convention; labels and text editors retain correct bidi behavior.
- Use locale-aware number presentation with unambiguous time/frame entry and a documented decimal separator policy.
- UI animation respects reduced-motion preferences; disabling decoration must not disable actual video playback.

## 13. Current-reference capture protocol

Before finalizing familiarity claims, record a legally obtained CapCut Desktop build: version, OS, locale, keyboard layout, account tier and relevant enabled flags. Exercise W01–W06 and record actions/outcomes, not extracted program resources. Keep reference evidence outside shipped application assets.

Maintain `docs/parity/desktop-reference.csv` with feature ID, source/build, action, observed result, LCE decision, intentional difference, and regression scenario. Changes in CapCut do not automatically force an unstable UI redesign; preserve user preferences and update the documented compatibility target.
