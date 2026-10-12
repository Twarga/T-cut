# t-cut: CapCut Desktop Interface Research

Research date: **2026-10-12**. Product name chosen by the user: **t-cut**.

## At a glance

- **Goal:** the whole app should feel close to CapCut Desktop for existing users. That means Home, opening projects, the editor, settings, and export. A generic four-pane editor is not enough.
- **Evidence:** 28 public screenshots, plus official help and dated third-party guides.
- **Limit:** no CapCut executable was run. Screenshots show captured states only.
- **Result:** the earlier plan missed Home, the two-level tool navigation, and the export layout. This study fixes those.
- **Next:** the [fidelity contract](fidelity-contract.md) turns findings into t-cut requirements and acceptance checks.

## 1. What this study establishes

The user wants the whole application to look and operate close enough to CapCut Desktop that its users recognize Home, project opening, the editor, settings, and export.

**Method:**

- Directly inspected **28 public screenshots**.
- Read official help and tutorials, plus dated third-party desktop references, for less visible behavior.
- Each screenshot has a source, image dimensions, and a fetched-byte fingerprint in the [screenshot index](screenshot-index.md) and the [machine-readable manifest](reference-manifest.json).

**Limits:**

- Screenshots show appearance in captured states only. They do not show hover timing, drag physics, every menu item, or the latest release.
- Some tutorial behavior is documented but not reproduced.
- This report does **not** count as runtime testing.

### Evidence labels

| Label | Meaning |
|---|---|
| **V** | Directly visible in an inspected screenshot |
| **D** | Described in a cited page or tutorial. Not exercised here. |
| **[INFERENCE]** | Interpretation the images alone cannot prove |
| **P** | Proposed t-cut behavior or design decision |
| **U** | Unresolved evidence gap |

Screenshot references such as **S03** point to the index. Labels from screenshots are evidence, not a list of wording, premium markers, or assets to copy.

### Chosen reference family

- **Structural baseline:** the dark desktop editor in [CapCut's PC and Mac walkthrough](https://www.capcut.com/resource/how-to-use-capcut-on-pc).
- It shows a coherent sequence: Home, empty editor, clip selection, captions, music, AI media, and export.
- The page is dated Oct 10, 2026. It does not name the app build behind each image.
- Call this **cohort A**, not "CapCut version X".

**Version evidence:**

- Only **S28** visibly states **Current version 8.11**. That does not prove S01–S27 came from that version.
- [CapCut's help](https://www.capcut.com/help/capcut-ui-update-changes) says updates can move or reorganize controls.
- Supplemental screenshots cover color, audio, speed, menus, and settings. Track their provenance separately.

## 2. Findings that correct the earlier plan

| Earlier simplification | Actual reference evidence | Required correction |
|---|---|---|
| Start directly in a four-pane editor | S01 shows a distinct Home and project dashboard | Home and project lifecycle belong in the MVP |
| Generic left tool rail | S02–S06 show horizontal icon-and-label categories above the left workspace, plus an inner vertical category list | Build two levels of navigation, not one vertical toolbar |
| Narrow library beside an oversized preview | S03's library and Player occupy similar widths | Match the reference's density and proportions before generic defaults |
| Undo and redo in the title bar | S03 shows undo and redo at the left of the timeline toolbar | Put editing history controls where users expect them |
| One generic inspector tab set | S02 Details, S03 Video, S05 Text, and S06 Audio all differ | Build an object-aware inspector state system |
| Left tool tab sets the right settings | S03: Filters left, Video right. S04: Transitions left, AI stylize right. | Library browsing and the selected-object inspector are independent |
| Export as a list of fields | S07 is a large centered two-column modal | Keep the preview, settings, and footer structure |
| All CapCut screenshots can be combined | S11, S13–S14, and S22–S28 show different cohorts or workspaces | Track variants. Do not invent a hybrid. |

**Historical file:** `ui-layout.svg` is a generic concept. It is **not** the visual target. Its three column widths, title-bar controls, and missing Home are not enough for this request.

## 3. Home and project dashboard

**Evidence:** primary S01. Card actions: S24–S25. Lifecycle docs: [delete projects](https://www.capcut.com/help/delete-history-task) and [open or modify history projects](https://www.capcut.com/help/modify-history-task).

### 3.1 Overall structure

**V:** Home has a dark background and three horizontal zones:

1. A narrow left navigation and account column.
2. A broad central area for creating and listing projects.
3. A promo card area at the upper right. It appears in S01 but not in every Home capture.

**Left column (S01):** brand near the top, account card, membership promo, Video editing section. Visible links: Home, Templates, and Spaces. AI design sits below a divider. A promo tile is near the bottom.

**Main area (S01):**

- A very large **Create project** tile.
- Shortcuts below it: AI video maker, Script to video, Record screen.
- A **More tools** row with smaller icon cards.
- **Projects** lower down, with thumbnails in a horizontal grid.

**Projects header (V):** search, view-mode control, Trash, and Project sync. Cards show a thumbnail, a name, and a compact metadata line with a size-like value and a duration. The size label uses abbreviated units. The screenshot does not show what it measures.

### 3.2 Layout details

- Create project is a broad tile, not a small toolbar button.
- The project grid sits below the creation tools. There is no left file tree.
- Card metadata sits below the thumbnail, not over the image.
- Project controls align with the Projects heading, not the window controls.
- Settings and version affordances sit at the upper right. S28 shows a Settings tooltip.
- The hierarchy still works without a logged-in account. Official help covers local projects created while logged out.

### 3.3 Project actions and opening

**V, S24 (card context menu):** Rename, Duplicate, Delete. Delete shows a Backspace hint. The menu is small, dark, rounded, and anchored to the card. Do not infer other items from this capture.

**D (opening):** official help says to select a project or history item to keep editing. Tutorials say to open a recent project from Home and return with Menu, then Back to homepage. Single-click versus double-click and focus behavior are **U** for the reference build.

**V, S25 (Delete):** a centered confirmation over a dimmed Home. Title: **Move to Trash?** Buttons: OK and Cancel. Message: items are deleted after 30 days. This is a captured policy statement. It is not a general retention promise, and t-cut should not auto-delete work.

**P for t-cut:**

- Keep the Home layout, project cards, and management actions.
- Local projects need no account.
- **Rename** changes the display name.
- **Duplicate** creates a separate editable project identity.
- **Move to Trash** does not delete external source media.
- Use an explicit t-cut retention policy. Do not copy the 30-day promise.
- A Trash and Restore view is required. Its CapCut visual treatment is **U**.

### 3.4 Free and open-source adaptation

- No fake Join Pro buttons, unsupported AI cards, copied promos, or cloud capacity meter with no service behind it.
- Keep primary navigation and project management.
- Remove monetization. Defer unbuilt feature cards.
- Record this as an intentional difference.
- Do not replace Home with a minimal file chooser just because some tools are missing.

## 4. Creating a project and entering the editor

- **D:** the official PC walkthrough says to launch CapCut, select Create project, then Import. It describes no mandatory setup wizard.
- **V, S02 and S09:** the new editor has a project name, an empty Player, an Import drop target, project Details, and an empty timeline.
- **S09 caveat:** it is empty, even though the nearby article talks about uploading. Do **not** list it as a successful import.

**P for t-cut:**

- Create project opens a valid local project in the empty editor right away.
- Name and sequence settings stay editable through the title and Details flow.
- Add an **Open project** command for portable local files, using the Linux file chooser. This supplements recent cards. It is a t-cut requirement, not a claim that the reference places it the same way.

**States to design (none may be a permanent spinner):**

- No recent projects
- Opening in progress
- Missing project file
- Incompatible project version
- Locked project
- Read-only project
- Opening failure

## 5. Editor frame and proportions

### 5.1 Title and application bar

**V, S03 (left to right):** brand, Menu dropdown, autosave status and time, centered project title, layout or shortcut-like controls, Pro, Share, Export, OS window controls. Export has the strongest action emphasis.

- Meanings of unlabeled top-right icons are **U** without tooltips. S23 shows a layout menu for its own cohort.
- Undo and redo are **not** in this bar. They sit above the timeline.
- The title changes between screenshots. The workspace structure does not.
- The autosave timestamp is a status. It is not the project's duration.

**P:** keep Menu, save state, title, layout and shortcut access, and the Export grouping. Drop Pro. No required Share service. Linux window controls follow the toolkit and window manager.

### 5.2 Three upper regions and the timeline

- Upper regions: library, Player, contextual properties. Narrow gutters separate them.
- The timeline spans nearly the full width underneath.
- The timeline toolbar is a separate band above the ruler and track body.

**Visual estimates from S03.** These are not pixel measurements or GTK constants. The source image decodes to **1919×1079**. OS scaling and logical size are unknown.

| Area | Share of full screenshot | Meaning |
|---|---|---|
| Library, including its category list | ~34% of width | Much wider than a thin rail |
| Player | ~35% of width | Similar to the library |
| Inspector | ~29% of width | Fits sliders, numeric fields, and keyframe controls |
| Title and application bar | ~5% of height | Compact window chrome |
| Upper editing region | ~63% of height | Library, Player, and inspector share this height |
| Timeline, including toolbar | ~31% of height | A real editing area, not a thin strip |
| Home left navigation (S01) | ~15% of width | Dashboard geometry, not editor geometry |

Gutters make up the rest. S10 and S21 give the timeline more height. S15 has a narrower inspector and more visible top categories. These show layout variation. They are not a basis for one fixed width formula.

**P:** compare at the same captured window size first, then set resize limits. The 300 px library default from the earlier plan must not override this reference. Keep panel order and control density at laptop sizes. Accessibility scaling may need deliberate changes.

## 6. Library and tool navigation

### 6.1 Top categories

**V, S02–S10:** the visible order starts with **Media, Audio, Text, Stickers, Effects, Transitions, Captions, Filters**, then an overflow arrow. Icons sit above short labels. The selected category uses the accent color. The row sits at the top of the library, not across the full app.

**V, S15 and S21:** a denser row also shows Adjustment, Templates, and AI avatar. S03 overflowing does **not** mean those features are missing. The visible order is not the same in every screenshot.

### 6.2 Inner vertical categories

The second level changes with the top category:

| Top category | Visible examples | Main content |
|---|---|---|
| Media | Import, Media, Subprojects, Yours, AI media, Spaces, Library, Dreamina | Import drop target, media grid, or AI form |
| Filters | Favorites, Filters, Featured, NEW, Hits, Life, Photo Booth, Landscape, more | Search field and thumbnail grid |
| Transitions | Favorites, Transitions, Trending, NEW, Hits, Overlay, Light, Movement, Blur, Basic, Mask, Slide | Search field and thumbnail grid |
| Audio | Import, Yours, AI music, Music with genre or category items, Sound effects | Search field and music rows |
| Text | Add text, AI packaging, Yours, Text effects, Text template, Auto captions, Local captions (S10) | Default text tile or a collection |
| Captions | Auto captions, Templates, AI packaging, Auto lyrics, Add captions, AI emojis (S05) | Caption-generation form |

Category names and proprietary assets change with version and content. t-cut should keep the navigation pattern and the high-value familiar terms. It must not copy a provider's catalog or imply access to it.

### 6.3 Media and catalog cards

**V, S15 and S21 (loaded media):** a compact Import, Record, and search row. Thumbnails with duration and an Added badge. Filename below. A separate generation tile. The bin preview is not always the selected timeline frame.

**V, S03 and S04 (filters and transitions):** repeated thumbnail cards in a grid. Title below. Premium-style badges near one corner. Download icons near another.

**V, S06 (music):** horizontal rows with cover art, title, artist and duration, favorite, and download or add actions.

**P:** build separate MediaGrid, PresetGrid, and AudioList views that share selection, focus, and download states. Do not force audio into square cards. Download buttons need a real local asset pack and real state. A decorative cloud icon is not enough.

## 7. Player and canvas

**V:** the Player has a header, a dark letterbox area, a fitted image, and a transport strip at the bottom.

- Current time: accent color. Total duration: secondary.
- A play triangle near the center.
- On the right, in cohort A: Full, fit or framing, Ratio, and a fullscreen-like control.

**Selection overlays:**

- A selected object shows a white rectangular boundary with handles, plus a circular rotate control below.
- S05 and S10 show a selected text box. S03 shows selected video bounds.
- These overlays sit on top of the rendered image.

**V, S12 (portrait media):** a narrow central rectangle with black around it, inside the Player. This does not show whether the project is portrait or the media has a portrait transform. Keep project canvas aspect and source bounds as separate concepts.

**P:**

- Keep the transport hierarchy, time placement, selection handles, and ratio access.
- Overlay guides never burn into the export.
- Dragging a handle and typing in an inspector field edit the same transform.
- Text entry must not trigger playback or split shortcuts.

**U:** the full Full menu, zoom options, double-click behavior, scrub audio policy, and fullscreen shortcut.

## 8. Contextual right panel

### 8.1 Nothing selected: Details

**V, S02:** heading **Details**. Rows: **Name, Path, Aspect ratio, Resolution, Frame rate, Imported media, Proxy, Arrange layers**. Sample values: Original, Adapted, 30.00fps, Stay in original location, Turned off, Turned on. A **Modify** button sits at the lower right.

- These values belong to the sample project. They are not defaults to copy.
- The path is Windows-specific. Do not copy it to Linux.
- S11 uses different wording: Saved, Ratio, Import material, Free layer.

**D:** [Primal Video's desktop guide](https://primalvideo.com/guides/capcut-for-pc-mac-tutorial/) describes Modify: name, media-copy policy, aspect, resolution, frame rate. That guide says its text is an AI-assisted summary. Use it as secondary evidence, not as pixel truth.

### 8.2 Video selected

**V, S03:** main tabs **Video, Speed, Animation, Adjust, AI stylize**. Under Video: **Basic, Remove BG, Mask, Retouch**. Other clip types can add an Audio tab (S21).

**Basic (S03):**

- An expandable Transform group.
- Scale slider and value. Uniform scale toggle.
- Position X and Y fields.
- Rotate field and dial.
- Alignment controls.
- A collapsible Blend group.
- Reset and keyframe controls to the right of rows.
- S15 shows the **Add keyframe** tooltip at the transform controls.

**V, S08 (scrolled Basic):** Auto reframe, aspect ratio, image stabilization, camera moving speed, Apply, then more rows. The inspector scrolls on its own. Not every control fits the first view.

**P:**

- Keep the primary tabs and subtabs stable for a selected object.
- Do not put every property in one long unstructured form.
- Keep scroll position when the user adjusts a field. Don't jump to the top.

### 8.3 Text and captions selected

**V, S05:** tabs: Text, Animation, Tracking, Text to speech, then an overflow menu. Text has Basic, Bubble, Effects.

Visible content: editable text area, AI writer row, Font selector, Font size, style buttons, case buttons, Color, Save as preset.

The left pane can show Auto captions while the right pane edits a selected text object. A category click does **not** prove a different timeline object was selected.

**P:** share typography controls between text and captions. Keep caption timing, language, speaker, and batch-edit state. Multiline fields must support IME and normal text shortcuts.

**U:** where the full caption list, Find and Replace, and batch editing sit in the current cohort. A 2023 official desktop masterclass documents them, but it is not current screenshot proof.

### 8.4 Audio selected

**V, S06 and S16:** audio-only selection shows **Basic, Voice changer, Speed**.

- **Basic:** Volume, Fade in, Fade out. Sliders with numeric values, units, and diamond controls.
- **Lower sections:** normalization, voice enhancement, translation, noise reduction, isolation, channel controls (S16).

**V, S06 (Voice changer):** **Voice filters, Voice characters, Speech to song**. Filter tiles in a grid: Original, selected outline, availability or download marks. Then Pitch and Timbre sliders.

Labels differ by screenshot: "Normalize loudness" vs "Loudness normalization", "Reduce noise" vs "Noise reduction", "Isolate voice" vs "Vocal isolation". Treat these as variants. Do not put them in one panel as duplicates.

### 8.5 Speed

**V, S21:** top-level Speed. Subtabs: **Standard, Curve, Velocity effects**.

- Standard: speed slider showing **1.41x**, a duration change from **22.4s to 15.9s**, Change audio pitch, Smooth slow-mo, Reset.
- The selected clip has a speed badge.

**D:** [official speed guide](https://www.capcut.com/resource/how-to-speed-up-a-video) separates uniform Standard speed from Curve ramps. Its mobile section says **Normal**. Do not use the mobile label as proof of desktop naming.

**U:** the full native Curve editor, all curve-point actions, and preset order.

Keep speed curves separate from property keyframe easing. They change different things.

### 8.6 Color

**V, S17–S20:** top-level **Adjust**. Subtabs: **Basic, HSL, Curves, Color wheel, Mask**. Save as preset and Apply to all sit near the footer.

- **Basic:** Color group with Temp, Tint, Saturation. A Lightness heading, then Exposure and Contrast. The Lightness heading is **not** a proven slider.
- **HSL:** color-range circles, eyedropper, Hue, Saturation, and Brightness sliders, numeric fields, and diamond controls.
- **Curves:** All and Luma controls, reset and eyedropper, a graph with a diagonal line and endpoint handles. This is a **tonal** curve, not a speed curve.
- **Color wheel:** Primary dropdown, Intensity, Shadows and Middle grey wheels with channel values. Tint and Offset headings are partly visible. Do not invent what sits below the crop.

Source: [official color grading walkthrough](https://www.capcut.com/resource/capcut-color-grading).

t-cut must keep three meanings of "curve" apart: color mapping, property animation easing, and playback speed.

## 9. Timeline

### 9.1 Structure

**V:**

- Horizontal toolbar, ruler, track headers at the left, clips in lanes, a vertical playhead, a bottom scrollbar.
- Text and overlay clips sit above the main video. Separate music sits below, in the inspected projects.
- Video clips show repeated thumbnails. Audio shows a waveform. Text clips show their label.
- Selected clips have a bright outline.

**Cover control:** appears beside the start of the main visual track in several captures. It is **not** a general track-name field. The main track is not always the top lane.

**Playhead:** a small top handle and a thin line across the lanes. Ruler spacing changes with zoom. The screenshot cannot show zoom steps or frame quantization.

### 9.2 Toolbar grouping

- **Left:** selection-mode control, undo and redo, cut and trim controls, delete, and clip tools that depend on what is selected.
- **Right:** a microphone or record control, a group of toggle icons, more view controls, a fit control, minus, a slider, and plus.

Tooltip names must be captured from the selected build. Do not guess them from icon shapes.

**D (magnet, snapping, linkage):** dated tutorials describe three controls. Official PC docs confirm the snapping and magnet concepts, but not every default.

- **Main track magnet:** closes gaps on the main track.
- **Auto snapping:** aligns nearby edges.
- **Linkage:** attached upper elements follow the main content.

These descriptions do **not** settle locked tracks, detached audio, or retiming.

### 9.3 Context menus and compounds

**V, S22 (dated TourBox cohort):** Copy, Cut, disabled attribute operations, Delete (Backspace), Deactivate clip, Group, Ungroup, Show keyframe animation, Create compound clip (Alt+G), Undo compound clip, Pre-process, Sync video to sound, Range submenu, Link to media. Enabled and disabled states depend on the selection.

**D:** [TourBox note](https://www.tourboxtech.com/en/news/capcut-what-is-a-compound-clip.html) describes grouping clips into a compound, and undoing it. Desktop tutorials say double-click enters its internal timeline, and an arrow returns. The current breadcrumb look is **U**.

**P:**

- Keep contextual actions and visible shortcut hints.
- A selection group and a compound are different things. Don't map two labels to one operation.
- Hide unavailable actions, or explain them. No no-op commands.
- The exact menu order needs an observed reference.

### 9.4 Layout presets

**V, S23:** the top-right layout menu lists: Default layout, Transcript-based editing, Media first, Player first, Adjustment first, Timeline first. Default is checked. Timeline first is highlighted.

This proves those labels for that cohort only. It does not prove current variants.

**t-cut MVP:** a resizable default layout and a reset. More presets can come later. Keeping user pane sizes must not require a paid feature.

## 10. Export

**V, S07:** the editor is dimmed behind a centered dark modal.

- Title **Export** at the upper left.
- **Left column:** output preview and an Edit cover control.
- **Right column:** Name and Export to (with a folder button). Then the enabled Video section: Resolution, Bit rate, Codec, Format, Frame rate, Optical flow, Color space. The settings area scrolls.
- **Footer:** duration and estimated size at left. Export and Cancel at right.

**Example values:** 8K, HEVC, mp4, 30fps, Rec.709 SDR. These are one example's selections. They are not defaults to copy, and they do not prove t-cut supports them. The red outlines and arrows in the article are annotations.

**P:**

- Reproduce the dialog hierarchy and the familiar order.
- Show only export choices that t-cut qualifies.
- Keep project save separate from rendering.
- Show progress, cancel, success with open-folder, and actionable failure.

**U:** the current CapCut progress, completion or share, overwrite, and failed-export layouts. This screenshot set does not show them.

## 11. Settings, project settings, and shortcuts

Three separate surfaces. Don't merge them just because they all have form fields.

### 11.1 Global Settings

**V, S26:** Settings title. Tabs: **Draft, Edit, Performance, General**. General is selected. It shows a language list with the current choice marked, a Notification section, Software update options, the start of the Right-click menu section, and Save and Cancel at the bottom. A tall content area with clipped content means more controls sit below.

**D, official language help:** Settings, then General, then Language. Pick a language. Restart if asked. The choice is per device.

**Older tutorial (Feb 2024, Windows):** shows Project, Edit, Performance, Language tabs, Korean text, and Windows paths. It documents project, download, and cache locations. Stepping, image duration, loudness, frame rate, and timecode. Hardware encoding and decoding. GPU interface. Proxies and output device. Its old tab names must **not** replace S26's General-tab reference.

**P:**

- Use the newer four-tab grouping, the familiar layout, and a local settings scope. Document Linux differences.
- Flatpak updates belong to the package manager. Don't draw an automatic-updates toggle that can't control the installed package.
- Cache cleanup never deletes original media or required generated assets.

### 11.2 Project Modify

- **V:** entry button in Details (S02).
- **D:** project name, aspect, resolution, rate, media-copy policy, and proxy choices.
- **U:** a readable full current native Modify dialog was not found.
- Do not publish a fake screenshot-equivalent layout for it.

**P:** specify the required fields and safe behavior now. Keep the exact tab order and geometry gated on a better reference. A current project's settings must not silently become defaults for future projects.

### 11.3 Shortcuts

**D:** tutorials describe Menu, then Help, then Shortcuts, or a top-right shortcut control. They mention presets, grouped commands, editable bindings, and Save. Official subtitle help confirms Ctrl+B and Cmd+B for its scope. S22 shows several bindings for that context.

**U:** the complete current shortcut dialog, preset order, conflict display, all default mappings, and tooltips. A low-resolution thumbnail is not enough.

t-cut must still provide remapping and conflict detection. Mark its exact layout **P** until someone observes the real one.

## 12. Missing media and recovery

**V, S27 (Link media dialog):**

- Title: **Link media**. Explanatory sentence.
- Table columns: Name, Last path, Duration.
- Linked count: **0/1 media linked**.
- Checkbox: **Link media when selecting a folder**.
- Buttons: Link media, Cancel.

**Guide (Windows):** [missing-media guide](https://www.downloadsource.net/how-to-fix-media-lost-in-capcut-pc-project-media-not-found/n/23192/). Documents restoring moved or renamed source links. Separates missing footage from missing project data.

**Failure screenshot (in that guide):** a red "Media lost" bin item, a "Media Not Found" preview, and a missing strip in the timeline. This supports an error-state family. It does **not** permit deleting the clip and re-importing it without keeping the edits.

**P:**

- Build a file-identity-aware relink list and an honest missing-media state.
- Keep edits and positions while the user finds replacements.
- Cancel returns to the project with a missing status. It does **not** abandon the project or silently export red placeholders.

**U:** no readable crash-recovery prompt, no previous-version recovery dialog, and no complete Trash and Restore screen was found. t-cut's reliability features are required. Their detailed look is a proposed design, not a copy.

## 13. Separate AI workspaces

- **V, S12:** AI media creation lives inside the dark editor's left Media section. It has prompt, model, duration, and ratio controls. Timeline, Player, and inspector stay visible.
- **V, S13–S14:** the AI video maker is a separate **light** workspace with its own header. The landing page has creation cards and a right-side form. The storyboard has a vertical rail (Script, Scenes, Elements, Music), a scene list, a preview, and Edit more and Export near the top.

**Rule:** do not merge the light storyboard into the MVP timeline editor. Do not call it a theme variant of the main editor. It is a separate task flow. The screenshots do not show whether its internals are native or embedded web content.

## 14. Visual language and density

### 14.1 Observed

- Mostly dark neutral panels, with slightly lighter headers and fields. Narrow gutters.
- Accent color on selected tool labels, some toggles, and primary actions.
- Compact icon-and-label library tabs. Most timeline controls are icons.
- Repeated inspector pattern: section label, optional checkbox or disclosure, reset, parameter row, numeric value or stepper, keyframe controls.
- Rounded input, card, and section corners. Thin selected borders. Restrained separators.
- Dimmer secondary text. Thumbnails and the preview carry most of the color.
- CapCut mixes premium, availability, and download marks with controls. t-cut must reinterpret capability and download states without copying monetization.

### 14.2 Not measurable from these images

- Exact font family and UI font size.
- Logical pixel sizes, corner-radius tokens, OS scaling.
- Default panel split ratios, animation durations, hover delays.

Image pixels are **not** CSS or GTK logical units. Do not invent hex values or 1px specs from a scaled, compressed image.

### 14.3 t-cut decision

**P:** match region hierarchy, density, grouping, control locations, and state changes closely. Use original icons and content, and a maintainable native style system. Changing the logo does not by itself clear legal risk. If accessibility scaling requires a difference, document it and keep the same navigation concept. Don't make controls unusably small.

## 15. Reference gaps and how to close them

| Gap | Evidence we have | Needed before claiming exactness |
|---|---|---|
| Cohort A build | Coherent official screenshots, no version label | About or version capture from the same session |
| Full Menu | Closed Menu shown. Several routes described in tutorials. | Expanded menu and each relevant submenu, readable |
| Project Modify modal | Details and Modify visible. Fields described. | Full modal capture with all tabs and validation states |
| Shortcut editor | Routes and preset editing described | Readable dialog, conflict state, active default profile |
| Trash and Restore | Delete menu and confirmation visible. Restore described. | Empty and populated Trash, selection, restore, permanent-delete states |
| Native speed Curve | Standard and Curve tabs visible | Curve presets, custom graph, controls, tooltips |
| Clip and text animation | Tabs visible. Historical behavior described. | Current In, Out, Combo, or Loop panels per object |
| Drag, snap, link exactness | Static icons plus dated descriptions | Recorded gesture scenarios with start and end clip positions |
| Export progress and failure | Export setup modal visible | Active, cancelled, failed, completed, overwrite states |
| Crash recovery | Reliability need is clear. No readable UI. | A real recovery prompt, or an explicit original t-cut design |

**Not blocking:** Home, the empty editor, the library, primary inspector states, and the export structure are documented well enough for a grounded design spec. Don't fill the gaps with invented claims.

## 16. Plain-language conclusion

CapCut's familiarity comes from more than four panels. Users expect:

- A particular Home screen.
- Two levels of tool navigation.
- Project Details before a selection.
- Different controls after a selection.
- A recognizable timeline toolbar.
- A two-column export window.

**For t-cut:** the MVP must include the complete application workflow. It can have fewer tools. It must **not** make users learn a different route for creating, opening, editing, saving, and exporting a project. Implementation acceptance rules: [fidelity-contract.md](fidelity-contract.md).

## 17. Research-package validation

Validated on **2026-10-12**, after the UI addendum was added to the plan:

- 11 Markdown files checked. All 42 local Markdown links resolve. Code fences balance.
- 28 screenshot manifest records. Unique IDs and URLs. Positive decoded dimensions. SHA-256 fingerprints. Source pages. Evidence labels.
- Screenshot IDs in the three research documents resolve to manifest entries.
- The fidelity contract has 24 unique screen-state rows and 14 unique acceptance scenarios.
- All 40 feature-family IDs and all 40 ordered implementation-task headings remain present.

**Scope:** this validates the research package and its references. It does **not** validate an implemented editor. Public screenshots were inspected and images decoded. No CapCut executable was run, no new t-cut build was made, and no interactive t-cut acceptance scenario was run.
