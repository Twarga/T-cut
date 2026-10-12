# t-cut Interface and Interaction Contract

> **Spec:** [product-spec.md](product-spec.md)
> **Precedence:** the **2026-10-12 [screenshot-backed research](../research/research.md)** and the [fidelity contract](../research/fidelity-contract.md) override this document's earlier generic layouts.
> **Proposals:** every dimension and default is a proposal unless tied to an observed reference.
> **Target:** close whole-application CapCut Desktop familiarity. Not just four editor panes.

## At a glance

- **Home is MVP.** Projects dashboard, create, open, rename, duplicate, Trash and Restore, missing-media flow.
- **Layout:** familiar workbench. Library left, player center, inspector right, timeline below, Export top right.
- **Look:** original icons, system typography, independent colors. **No** copied logo, icons, thumbnails, or branding.
- **Timeline:** three separate systems. Snap, main-track magnet, linked selection.
- **Edits:** one drag gesture = one undo transaction. Escape cancels.
- **Every drag** has a keyboard alternative.
- **Export** freezes a revision. Output is written to a temp file, then published after validation.
- **Canonical IDs:** UI01–UI24 states and A01–A14 scenarios, from the [fidelity contract](../research/fidelity-contract.md).

## 0. Home and project lifecycle (MVP)

The first screen is a recognizable project dashboard:

- Left navigation.
- A prominent **Create project** area.
- A **Projects** heading, with project search, view, and Trash controls.
- Thumbnail cards.

**Flows:**

- Create a project → straight into the empty editor.
- Open a recent or local project → back to its saved work.
- Working **Rename**, **Duplicate**, **Move to Trash / Restore**.
- Return Home, settings, and the missing-media flow.

**Never include:** mandatory login, fake Pro controls, or unsupported AI-service cards.

The earlier SVG lacks Home and some control locations. Treat it as history, not a layout spec.

## 1. Familiar workbench, independent look

Official desktop guides describe the broad pattern. Keep these locations:

- Library and tools on the left.
- Player in the center.
- Contextual properties on the right.
- Multitrack timeline below.
- Export at the upper right.

**Keep these task names:** Media, Audio, Text, Captions, Effects, Transitions, Filters, Adjustment, Split, Speed, Mask, Keyframe, Export.

**Do not copy:**

- CapCut's logo or icon silhouettes
- Proprietary thumbnails or promo illustrations
- Animations, type treatment, or the complete branded look

**Do use:** an original icon set with provenance, system UI type, and independent semantic colors.

**Test familiarity by task performance, not pixel matching.** Legal sources: [sources.md](sources.md).

### Regions

| Region | Contents | Always-available command |
|---|---|---|
| Project bar | Main menu, project name, save state, layout and shortcut access, Export | Open, save, export via menu and shortcuts |
| Library | Horizontal main-tool categories, an inner vertical category list, content area | Import. Local files first. |
| Player | Sequence or source preview, safe areas, overlay handles, quality and aspect selection | Play and pause, time entry, frame step |
| Inspector | Contextual fields, keyframe diamonds, reset, animation and effects | Show the selected object's editable properties |
| Timeline toolbar | Select, undo and redo, split and edit tools, snapping, magnet, linkage, zoom, visible modes | Mode names and current state |
| Timeline | Ruler, playhead, named track headers, clips, waveforms, keyframes | Keyboard clip navigator. Time-based editing. |
| Status and jobs | Proxy, model, and export status. Recoverable errors. Cancel. | Open job details. **Never hide a failure.** |

### Initial pane geometry (proposed)

- **Capture size:** compare the first fidelity prototype at the chosen reference capture size. Then test logical workspaces at **1366×768** and **1280×720**. Screenshot pixels do not establish logical units.
- **Title bar:** match the reference's compact bar. Find the logical height with a real GTK prototype. The earlier 44 px figure is **not** observed fact.
- **Reference ratios** (screenshot S03, approximate, with gutters): library 34%, player 35%, inspector 29% of full width. Use as a comparison only. Not fixed ratios. Users resize, and other screenshots differ.
- **Timeline height:** resizable. S03 gives roughly the lower third. Other captures show taller timelines. Set minimums through the real UI and scaling checks.
- **Player:** takes the remaining width. Protect **360 logical px** before collapsing secondary panes.

**Collapse order as width shrinks:**

1. Collapse the library browser first. Keep a labeled open-library button.
2. Collapse the inspector into a focusable drawer.
3. In focus mode, keep at most one secondary drawer open.

**Other widths:**

- At **1024×768**: show player and timeline, plus the selected drawer. **Don't** squeeze all four panes into unreadable columns.
- At high text scale: pick focus mode from available content width, not screen resolution.
- Below a usable editing width: offer maximize or focus mode. Menus and save or export stay operable. **Never** trap an unsaved project behind minimum-window-size rules.

**Layout memory:** save layout per workspace, not per project file. Portable projects must not carry another monitor's coordinates. Provide **Reset workspace**.

## 2. Original design tokens

- Define tokens in `apps/tcut-desktop/resources/tokens.css`. Component styles consume them.
- GTK CSS is **not** browser CSS. Use supported GTK constructs and generated named colors. Don't assume arbitrary web layout APIs.

| Token family | Initial proposal | Purpose |
|---|---|---|
| Spacing | 4, 8, 12, 16, 24 logical px | Dense, consistent grouping |
| Typography | System sans. 12 metadata, 14 controls, 16 section labels. | Scales with system settings. Tabular time digits. |
| Surfaces | Canvas, panel, raised, hover, selected | Separate regions. **No** decorative gradients. |
| Text | Primary, secondary, disabled, on-accent | Measured contrast. Disabled text must still be understandable. |
| Semantic | Accent, focus, warning, error, success | Errors and selection also use labels or shapes. |
| Borders | Divider, interactive, focus | Focus stays visible, independent of selection. |
| Motion | None, short feedback | Respect reduced motion. Playback is content, not decoration. |
| Tracks | Video, audio, captions, effects | Labels and icons stay when colors look alike. |

**Theme and contrast:**

- Dark workspace is the default. System, light, and high-contrast themes are supported.
- **Don't** hard-code a copied brand cyan.
- Text: 4.5:1 contrast. Critical control and focus boundaries: 3:1.
- These are design goals, checked with native desktop tools. They are **not** an automatic claim of full WCAG web conformance.

**Trim handles:** small handles may have larger invisible hit areas. Adjacent handles must stay distinguishable. When zoom makes a clip too small to drag safely, numeric trim and move controls are the alternative.

## 3. Shared components

- **ActionButton:** command ID, label, icon, shortcut, enabled state, and the reason when disabled. Icon-only actions need accessible names and tooltips. Tooltips are **not** the only explanation of a blocked action.
- **ParameterField:** value, unit, range, mixed-selection state, reset, keyframe state, validation, commit and cancel. Invalid input stays editable. **Never** clamp silently without an explanation.
- **TimeField:** shows frame time or decimal seconds. Accepts an explicit timebase. Reports invalid frames and unsupported drop-frame labels.
- **AssetTile:** name, thumbnail, duration and type, local/proxy/model status, license detail. Selecting is separate from inserting.
- **ClipView:** clip ID, name, track, start and end, selected, locked, missing, and proxy status. Renders only visible content. The accessible representation is **not** a screenshot.
- **JobRow:** stage, measurable progress or an indeterminate indicator, cancel or retry, output details, failure cause. **Never** invent remaining time before a meaningful estimate exists.
- **Modal:** only for irreversible external operations, overwrite authorization, and settings that need a decision. Ordinary editing stays in panels and popovers.

**State coverage:** every component supports empty, loading, ready, selected, disabled, error, focus, hover, long label, and high contrast, where they apply.

**Focus:** returns to the invoking command after a drawer or dialog closes.

## 4. Selection, focus, and edit transactions

- **Selection** is project editing state. **Focus** is widget state.
- Moving focus to the inspector does **not** deselect the clip.
- Track locks block every mutation path: shortcuts, scripts, inspector fields, and multi-selection commands.

**Drag lifecycle:**

1. Pointer down: record the pre-edit snapshot and the candidate gesture.
2. Move past a small logical-px threshold: enter a draft gesture. Show ghost positions and affected clips.
3. Draft updates coalesce at display cadence. They do **not** add undo history or journal records.
4. Pointer release: validate the final edit. Commit **one** transaction.
5. Escape: cancel the draft. Restore the exact pre-edit state.
6. Losing pointer capture cancels safely. **No** accidental far-away drop.
7. A rejected edit explains why: locked clip, collision, duration, or missing source. **No** partial changes.

**Selection gestures:**

- Click: select one clip.
- Ctrl-click: toggle membership.
- Shift-click: extend a range in track order.
- Marquee: uses intersection. Additive needs an explicit modifier.
- Multi-select inspector: shows common editable properties. Shows a mixed value when they differ.
- Numeric change: sets the value on all eligible selected objects as **one** undo transaction. Unsupported objects are listed **before** any partial apply.

## 5. Timeline: three separate systems

### Snap

- **Default:** on (proposed).
- **Targets:** playhead, eligible clip edges, sequence markers, in and out points.
- **Frame grid:** the final quantization constraint. Not an independent mode.
- **Captions and keyframes** snap within their own editing lanes.
- **Threshold:** initial 6 logical px, converted to time at the current zoom.
- **Nearest wins.** Ties: playhead first, then explicit markers, then clip boundaries.
- Show a guide and a target label. Use hysteresis so close targets don't flicker.
- Snapping moves the dragged edge or the whole clip. It never stretches a moved clip on its own.
- Provide a visible temporary-disable modifier, and let users remap it.

### Main-track magnet

- **Default:** on in the familiar profile. Show a visible indicator. Add a preference.
- **Main track:** exactly one video track is designated main.
- **Insert at a boundary:** pushes downstream main-track clips.
- **Insert inside a main clip:** splits that clip at the insertion point first.
- **Trim or delete on main:** closes or opens time.
- **Other tracks** move only through explicit link or anchor rules, or an explicit all-tracks ripple command.
- An independent music bed never shrinks by surprise.
- If an operation would violate a locked member of an affected link group: reject the transaction and name the blocker.
- Users can turn magnet **off** for intentional gaps.

### Links and anchors

Keep three relationships separate:

- **AV pair:** video and its extracted or associated audio share source timing. Moving keeps alignment. Slip and trim update both, unless explicitly detached.
- **Selection group:** selecting one selects the group when Linked selection is on. This is **not** a source-time relationship.
- **Follow anchor:** a caption, B-roll, or overlay records an anchor clip and a timeline offset. A main-track move carries it. It does **not** inherit the anchor's scale, color, or duration automatically.

**Rules:**

- Turning off Linked selection changes selection expansion, **not** the stored links.
- Unlink changes the model and is undoable.
- Show link and anchor badges. Explain dependencies in the move preview.
- Ripple across an anchor interval must keep offsets, or ask for an explicit detach decision. **Never** invent a new anchor silently.

## 6. Operations and edge rules

| Action | Contract | Failure or edge behavior |
|---|---|---|
| Move | Keeps duration and source map. Track change is explicit. | Reject an incompatible or locked destination. |
| Trim head or tail | Changes the source window and sequence duration together. | Can't exceed available source, except an explicit still or freeze policy. |
| Split | Splits eligible selected clips at the interior playhead. Keeps animation evaluation. | Exact endpoint is a no-op, with an explanation. No zero-length child. |
| Delete | Removes selected items. Honors the magnet policy. | Undo restores IDs, timing, links, and effects. |
| Ripple delete | Removes the interval and shifts participating material. | A locked crossing rejects the edit atomically. |
| Roll | Moves the shared boundary. Sequence duration unchanged. | Needs source handles on both sides. |
| Slip | Moves the source interval. The clip stays put on the timeline. | Show source in and out previews and exact bounds. |
| Slide | Moves the selected clip and adjusts its immediate neighbors. | Reject if either neighbor lacks handles. |
| Duplicate | New IDs, same parameters, explicit placement. | Links copy within the duplicate set. **Never** point at the originals by accident. |
| Paste attributes | User picks transform, color, audio, effects, or animation families. | Validate units and time domains. One undo operation. |
| Split compound | Splits the parent mapping. The child sequence stays editable. | Never flatten without an explicit render command. |

**Collisions with magnet off:**

- An insert drop on an occupied area offers an explicit **Insert** or **Overwrite** action, with a preview. **Never** replace content silently.
- A simple move on a non-overlapping editorial track rejects collisions unless overwrite mode is on.
- Compositing overlap uses separate layers or tracks. **No** ambiguous same-lane ordering.

**Keyboard parity:** every drag action has a keyboard command. Examples: Move to time, Trim by frames, Set source in and out, Move to track.

## 7. Player and inspector

**Player:**

- Shows **Source** or **Sequence**. The active mode is named visibly.
- Clicking a bin preview does **not** replace sequence playback during an edit.
- Playhead and time display share one transport state.
- Scrubbing mutes audio by default, until a separate audio-scrub option is qualified.
- Transform handles use sequence display coordinates. They account for letterboxing, pixel aspect ratio, rotation metadata, and UI scale.
- Guides and safe areas are overlays. **Never** burned into the output.

**Inspectors:**

- **Video:** Basic or Transform, Mask, Speed, Tracking or Stabilization. Audio and Adjustment groups as applicable.
- **Audio:** gain, pan, fades, automation, processing. Keep loudness analysis separate from playback gain.
- **Text and caption:** editable content, typography, timing, style, animation, language, speaker.
- **No selection:** sequence properties and a project summary. **Never** stale clip values.
- **Unsupported or missing effect:** keep its stored configuration visible, with a repair or remove action. Block export if silently dropping it would change the output.
- **Numeric field while playing:** one committed edit when the field is completed. Live preview is a draft state.

## 8. Keyframes and speed curves

**Diamond states** beside an animatable property:

- Not animated.
- Animated, but no key at this time.
- Key at the current time.

The accessible label includes the property, the action, and the time. Buttons jump to the previous and next key.

**Interpolation:** linear by default. Hold and cubic easing are explicit.

**First key:** preserves the existing value outside the animated region.

**Split:** keeps evaluation on both halves. Insert evaluated boundary values and split the interpolation segments. **Don't** drop keys on one side. Keys belong to a declared time domain (see [architecture.md](architecture.md)).

**Curve editor:**

- Drag, or type numeric time, value, and tangent.
- Speed ramps show the output duration, source range, and audio policy **before** commit.
- Zero speed is a **freeze segment**, not a division by zero.
- Reverse is an explicit mode or segment. Never a curve crossing zero unnoticed.

## 9. Captions and transcript editing

- The caption list and the timeline refer to the **same** caption objects.
- Double-click opens text editing.
- **Enter** adds a newline in the multiline editor. **Ctrl+Enter** commits.
- **Escape** first cancels IME preedit, per toolkit behavior. A second Escape can close the editor.
- Global editing shortcuts **never** intercept composing text.

**Caption data:**

- Manual and generated provenance, speaker, language, start and end, word timing, style reference.
- Confidence is advisory. It is **not** permission to discard speech.
- Warn about unreadable durations and line lengths. Don't impose a guessed CapCut minimum duration as a hard file-format rule.

**Splitting a caption:**

- At an interior time, split words by their timing.
- No word timing → ask for a text split position, or keep the text selected for correction.
- **Never** copy the full sentence into both blocks silently.

**Style:** "Apply style to all" is explicit and undoable.

**Per-word highlight timing:** survives text corrections when unambiguous. Otherwise mark it for review.

**Transcript deletions:** propose time ranges. The user reviews the waveform and video previews, plus link and ripple effects, before applying.

**Filler and silence detection:** **never** remove clips automatically just because a model is confident.

## 10. Shortcuts

- Every shortcut appears in menus and is searchable in Preferences.
- Proposed Linux mapping uses Ctrl. This is **not** a macOS port spec.

| Command | Linux mapping | Evidence or status |
|---|---|---|
| Split selected at playhead | Ctrl+B | Official desktop subtitle docs. Exact selection behavior still needs an observed-build gate. |
| Play and pause | Space | Official PC resource claim. Respect text focus. |
| Frame back and forward | Left, Right | Official PC resource claim. Timeline and player context only. |
| Set range in and out | I, O | Official export help |
| Mark export range | Shift+X | Official export help. Precise initial range selection must be qualified. |
| Undo and redo | Ctrl+Z, Ctrl+Shift+Z | Proposed conventional mapping. Not a certified CapCut table. |
| Save, import, export | Ctrl+S, Ctrl+I, Ctrl+E | Proposed |
| Delete selection | Delete | Proposed. The visible magnet policy applies. |
| Zoom timeline | Ctrl+wheel, visible + and − | Proposed. Check conflicts. Provide alternative buttons. |
| Toggle keyframe editor | Configurable. Unassigned at first. | Alt+K appears in an official resource but may conflict with the desktop or window manager. |

**Shortcut settings:**

- Detect duplicates within overlapping contexts.
- Let users reset one mapping.
- Export and import a versioned profile.
- Report platform combinations that aren't available.

**Don't:** add undocumented aliases that eat text input. Don't label a profile "verified CapCut-compatible" before observing the current build.

## 11. Save, export, and recovery

**Four separate commands:** Save project, Export media, Export captions, Collect project, Share.

**Save state:** Saved, Saving, Unsaved, or Save failed, with a specific reason. **Never** show Saved before the durable write succeeds.

**Missing media:**

- Shows an explicit offline placeholder in preview, with relink controls.
- Final export **blocks**. It never renders the placeholder unnoticed.

**Export dialog shows:** sequence and range, resolution, rational frame rate, container and codec, audio, color, destination, overwrite policy, and estimated size (only when it is meaningful).

**Queue:**

- An entry freezes a project revision. Later edits never change a queued export.
- Render writes a temp sibling file, then publishes it after validation.
- Cancel removes **that job's** temp files. Never an earlier successful export.

**Failure:**

- Names the asset, effect, or stage where possible.
- Keeps the project editable.
- Retry starts a clean job. **No** promise of mid-codec resume.

**Recovery:** show the recovered revision and time, and the original saved revision. Offer a separate recovered copy **before** replacing the saved state.

## 12. Accessibility and localization

**Accessibility:**

- GTK native controls expose roles, names, values, focus, and actions through AT-SPI.
- The custom timeline exposes an accessible clip list or tree: name, track, start and end, selection, lock, and editing actions.
- Virtualization must not make selected clips inaccessible once they scroll away.
- Complete W01 and W09 from the [product spec](product-spec.md) with keyboard and Orca.
- Focus stays visible in dark, light, and high-contrast modes, and at 200% text scale.
- **Don't** announce every playback frame. Provide on-demand current time and throttled status.

**Localization:**

- Translate strings through gettext. Use plural rules and translator context.
- Test long German labels, Arabic and Hebrew RTL UI, Japanese and Chinese IME, combining marks, and mixed-direction captions.
- **Timeline** time still runs left to right in an RTL shell. This is an explicit media-workspace convention. Labels and text editors keep correct bidi behavior.
- Use locale-aware number formatting. Time and frame entry must be unambiguous. Document the decimal separator policy.

**Motion:** UI animation respects reduced-motion settings. Turning off decoration must **not** disable video playback.

## 13. Reference capture protocol

Before any familiarity claim:

1. Record a legally obtained CapCut Desktop build: version, OS, locale, keyboard layout, account tier, relevant enabled flags.
2. Run W01–W06. Record actions and outcomes. **Don't** extract program resources.
3. Keep reference evidence **outside** shipped app assets.
4. Maintain `docs/parity/desktop-reference.csv` with these columns: feature ID, source and build, action, observed result, LCE decision, intentional difference, regression scenario.

**CapCut changes** do not automatically force a UI redesign. Keep user preferences. Update the documented compatibility target instead.
