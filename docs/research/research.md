# t-cut: Detailed CapCut Desktop Interface Research

Research date: **2026-10-12**. User-selected product name: **t-cut**.

## 1. What this study establishes

The user wants the whole application to look and operate closely enough to CapCut Desktop that its existing users recognize Home, project opening, the editor, settings and export. A generic four-pane video editor does not satisfy that requirement.

This study directly inspected **28 public screenshots** and used official help/tutorials plus dated third-party desktop references to examine less visible behavior. Each screenshot has a direct source, image dimensions and fetched-byte fingerprint in the [screenshot index](screenshot-index.md) and [machine-readable manifest](reference-manifest.json). The [fidelity contract](fidelity-contract.md) converts findings into t-cut requirements and acceptance scenarios.

**Limit:** no CapCut executable was installed or exercised. Screenshots establish appearance in captured states, not hover timing, drag physics, all menu contents or the behavior of the latest release. Some tutorial behavior is documented but not independently reproduced. This report does not call that runtime testing.

### Evidence notation

- **V:** directly visible in an inspected screenshot.
- **D:** explicitly described in a cited page/tutorial, not exercised here.
- **[INFERENCE]:** interpretation that the images alone cannot prove.
- **P:** proposed t-cut behavior/design decision.
- **U:** unresolved evidence gap.

Screenshot references such as S03 refer to the index. Labels quoted from screenshots are evidence, not a recommendation to copy all product wording, premium markers or content assets.

### Chosen reference family

Use the dark desktop editor from [CapCut's PC/Mac walkthrough](https://www.capcut.com/resource/how-to-use-capcut-on-pc) as the provisional structural baseline. It supplies a coherent sequence of Home, empty editor, clip selection, captions, music, AI-media and export images. The page displays Oct 10, 2026, but does not supply the app build behind each image. Call it **cohort A**, not “CapCut version X.”

Supplemental screenshots provide color, audio, speed, menus and settings. Keep their provenance separate. Only S28 visibly states **Current version 8.11**; it does not prove that S01–S27 came from that version. [CapCut's own help](https://www.capcut.com/help/capcut-ui-update-changes) says updates can move or reorganize controls.

## 2. Findings that correct the previous plan

| Earlier simplification | Actual reference evidence | Required correction |
|---|---|---|
| Start directly in a four-pane editor | S01 shows a distinct Home/project dashboard | Home and project lifecycle belong in the MVP |
| Generic left tool rail | S02–S06 show horizontal icon-and-label tool categories above the left workspace, plus an inner vertical category list | Implement two levels of navigation, not one vertical toolbar |
| Narrow library beside oversized preview | S03's library and Player occupy similar widths | Match the reference's density/proportions before imposing generic defaults |
| Undo/redo in the title bar | S03 shows undo/redo at the left of the timeline toolbar | Put editing history controls in their familiar location |
| One generic Inspector tab set | S02 Details, S03 Video, S05 Text and S06 audio controls differ | Build an object-aware inspector state system |
| Left tool tab determines right settings | S03 Filters left with Video right; S04 Transitions left with AI stylize right | Library browsing and selected-object inspector are independent |
| Export as a list of fields | S07 is a large centered two-column modal | Preserve preview/settings/footer structure |
| All CapCut screenshots can be combined | S11, S13–S14, S22–S28 expose different cohorts/workspaces | Track variants; do not create an invented hybrid |

The earlier `ui-layout.svg` remains a generic historical concept, not the visual fidelity target. Its three top-level column widths, title-bar controls and lack of Home are insufficient for this clarified request.

## 3. Home and project dashboard

Primary visual evidence: S01. Supplemental card actions: S24–S25. Official lifecycle documentation: [delete projects](https://www.capcut.com/help/delete-history-task), [open/modify history projects](https://www.capcut.com/help/modify-history-task).

### 3.1 Overall structure

**V:** Home uses a dark background with three main horizontal zones:

1. A narrow left navigation/account column.
2. A broad central creation/projects area.
3. A promotional card area in the upper right, present in S01 but not identical in every Home capture.

The left column contains the brand near its top, an account/profile card, a membership promotion, then the Video editing section. S01 visibly lists Home, Templates and Spaces, with AI design below a divider. A promotional tile sits near the lower left.

The main area begins with a very large **Create project** tile. Under it are creation shortcuts: AI video maker, Script to video and Record screen in S01. A **More tools** row follows, with smaller icon cards and labels. **Projects** appears lower down, with project thumbnails arranged horizontally in a grid.

**V:** the Projects header's right side includes a search control, view-mode control/dropdown, Trash and Project sync. Cards show a preview thumbnail, project name and a compact metadata line with a size-like value and duration. The size-like label has abbreviated units; the screenshot alone does not establish whether it measures project metadata, all media, or something else.

### 3.2 Important layout details

- The Create project action is a broad tile, not a small toolbar button.
- The project grid is below creation tools, not a left-side file tree.
- Card metadata sits below thumbnails rather than appearing as a large overlay on top of the image.
- Project controls align with the Projects heading, not with the global window controls.
- Home settings/version affordances live toward the upper-right chrome; S28 explicitly shows a Settings tooltip.
- The dashboard's hierarchy survives the absence of a logged-in account. Official help discusses local projects created while logged out; it does not make sign-in necessary to understand local editing.

### 3.3 Project actions and opening

**V, S24:** a project-card context menu has Rename, Duplicate and Delete; Delete displays a Backspace hint in that screenshot. The menu is small, dark, rounded and anchored near the card. Do not infer additional menu items from this capture.

**D:** official history help describes selecting a project/history item to continue editing. Desktop tutorials describe opening a recent project from Home and returning through Menu > Back to homepage. Exact single-click versus double-click and focus behavior remain U for the selected current reference build.

**V, S25:** Delete leads to a centered confirmation over a dimmed Home background, titled **Move to Trash?** with OK and Cancel. Its message says items will be deleted after 30 days. This is a captured policy statement, not a universal retention guarantee or an instruction for t-cut to auto-delete work.

**P for t-cut:** preserve recognizable Home geometry, project cards and those management actions. Local projects do not need an account. Rename changes display name; Duplicate creates a distinct editable project identity; Move to Trash does not delete external source media. Use an explicit t-cut retention policy rather than copying the screenshot's promise. A Trash/Restore view is required, but its exact CapCut visual treatment is U.

### 3.4 Free/open-source adaptation

t-cut should not show fake Join Pro buttons, unsupported AI cards, copied promotions, or a cloud capacity indicator backed by no service. Preserve the primary navigation and project-management structure; remove monetization surfaces and defer unimplemented feature cards. Document that intentional difference. Do not replace the Home screen with an unrelated minimal file chooser merely because some optional tools are missing.

## 4. Creating a project and entering the editor

**D:** the official PC walkthrough says launch CapCut, select Create project, then Import. It does not describe a compulsory multi-step setup wizard before entering the editor.

**V, S02/S09:** the new editor state already has a project name, an empty Player, a media Import drop target, project Details and an empty timeline. S09 is still empty despite surrounding article wording about uploading; it must not be cataloged as a successfully imported-media state.

**P for t-cut:** Create project immediately opens a valid local project in this familiar empty-editor state. Name and sequence settings remain editable through the title/project Details flow. An Open project command supplements recent cards for portable local files, using the Linux file chooser. It is a t-cut requirement, not a claim that the reference has an identically located Open project button.

Mandatory states to design independently: no recent projects, opening in progress, missing project file, incompatible project version, locked project, read-only project and opening failure. None can be replaced with a permanently spinning loader.

## 5. Editor frame and proportional geometry

### 5.1 Title/application bar

**V, S03:** left-to-right groups are brand, Menu dropdown, autosave status/time, centered project title, layout/shortcut-like controls, Pro, Share, Export and OS window controls. The bright Export action has the strongest action emphasis. Exact meanings of every unlabeled top-right glyph remain U without tooltips; S23 proves a layout menu for its own cohort.

**V:** ordinary undo/redo icons are above the timeline, not in this bar. The title can change between screenshots without changing the workspace structure. The autosave timestamp is a status, not the project's duration.

**P:** t-cut preserves Menu, save state, title, layout/shortcut access and Export grouping. It omits Pro and uses no compulsory Share service. Linux titlebar/window controls follow the toolkit/window-manager contract without pretending to be a Windows-native window.

### 5.2 Three upper work regions and lower timeline

The three upper regions are library, Player and contextual properties. Narrow gutters separate them. The timeline spans almost the whole width underneath. Its toolbar is a distinct horizontal band above the ruler/track body.

The table below contains **visual estimates from S03**, not pixel-perfect measurements or GTK constants. Source image size was independently decoded as 1919×1079; no OS scaling or original logical dimensions are known.

| Area | Approximate proportion of the full screenshot | Interpretation |
|---|---|---|
| Library including its category list | About 34% of width | Much larger than a thin navigation rail |
| Player pane | About 35% of width | Similar width to library in this capture |
| Inspector | About 29% of width | Large enough for sliders, numeric fields and keyframe controls |
| Title/application bar | About 5% of height | Compact window-level chrome |
| Upper editing region | About 63% of height | Library/player/inspector share the same general vertical extent |
| Timeline, including its toolbar | About 31% of height | Editing area, not a tiny decorative strip |
| Home left navigation in S01 | About 15% of width | Separate dashboard geometry; not editor geometry |

Gutters account for the remainder. S10 and S21 visibly give more height to the timeline; S15 has a narrower inspector and more visible top categories. These are evidence of layout variation, not a basis for one immutable width formula.

**P:** initial fidelity work should compare at the same captured window size and then establish resizing constraints. A single 300px library default from the earlier plan must not override this reference. Preserve panel order and control density at laptop sizes, while accessibility scaling can require intentional adaptations.

## 6. Library and tool navigation

### 6.1 Horizontal top categories

**V, S02–S10:** visible order begins **Media, Audio, Text, Stickers, Effects, Transitions, Captions, Filters**, followed by an overflow arrow. Icons sit above short labels. The selected category uses accent color on icon/label. This row occupies the top of the library region, not the full application width.

**V, S15/S21:** a wider/denser visible category row also includes Adjustment, Templates and AI avatar. Do not assume S03 lacks those features just because its row overflows. Conversely, do not claim every screenshot contains the same visible order.

### 6.2 Inner vertical categories

The second navigation level changes with the top category:

| Selected category | Visible examples | Main content form |
|---|---|---|
| Media | Import, Media, Subprojects, Yours, AI media, Spaces, Library, Dreamina | Import drop target, media grid or AI form |
| Filters | Favorites, Filters, Featured, NEW, Hits, Life, Photo Booth, Landscape and more | Search field plus thumbnail grid |
| Transitions | Favorites, Transitions, Trending, NEW, Hits, Overlay, Light, Movement, Blur, Basic, Mask, Slide | Search field plus thumbnail grid |
| Audio | Import, Yours, AI music, Music and genre/category items, Sound effects | Search field plus music rows |
| Text | Add text, AI packaging, Yours, Text effects, Text template, Auto captions, Local captions in S10 | Default text tile or relevant collection |
| Captions | Auto captions, Templates, AI packaging, Auto lyrics, Add captions, AI emojis in S05 | Caption-generation form |

Catalog category names and proprietary assets are version/content-dependent. t-cut should preserve this navigation pattern and high-value familiar terms, not copy a provider's live catalog or imply access to it.

### 6.3 Media and catalog cards

**V, S15/S21:** loaded media can show a compact Import/Record/search row, a thumbnail with duration and an Added badge, filename beneath, and a separate generation tile. The preview image in the bin is not necessarily the selected timeline frame.

**V, S03/S04:** filters/transitions use repeated thumbnail cards in a grid, title underneath, premium-like badges near an upper corner and download glyphs near a lower corner. **V, S06:** music instead uses horizontal rows with cover art, track title, artist/duration, favorite and download/add actions.

**P:** implement separate MediaGrid, PresetGrid and AudioList views sharing selection/focus/download states. Do not force audio into the same square-card layout as filters. Download buttons need a real local asset pack and state, not a decorative cloud icon.

## 7. Player and canvas

**V:** the Player pane has a heading/header, dark letterbox area, fitted image and a transport strip at its bottom. The current time is accent-colored; total duration is secondary. A play triangle sits near the center, with Full, fit/framing, Ratio and fullscreen-like controls toward the right in cohort A.

Selected visual objects display a white rectangular boundary with handles, plus a circular rotation control below. S05/S10 show a selected text box; S03 shows selected video bounds. These are distinct selection overlays over the rendered image.

**V, S12:** portrait media occupies a narrow central rectangle with black surrounding canvas inside the Player. This does not prove whether the project is portrait or the media has a portrait transform; project/canvas aspect and source bounds must remain separate concepts.

**P:** t-cut preserves the transport hierarchy, time placement, selected-object handles and ratio access. Overlay guides never burn into export. Dragging a handle and changing a numeric inspector field must edit the same transform. User text entry must not be intercepted by timeline playback/split shortcuts.

**U:** the exact Full control menu, zoom options, double-click player behavior, scrubbing audio policy and fullscreen shortcut are not established by these pictures.

## 8. Contextual right panel

### 8.1 Nothing selected: Details

**V, S02:** heading **Details**; rows **Name**, **Path**, **Aspect ratio**, **Resolution**, **Frame rate**, **Imported media**, **Proxy**, **Arrange layers**. Captured values include Original, Adapted, 30.00fps, Stay in original location, Turned off and Turned on. A **Modify** button sits at the lower right.

These values are the sample project's state, not immutable defaults. The path is Windows-specific and must not be copied into Linux UI. S11 uses alternate wording, including Saved/Ratio/Import material/Free layer.

**D:** [Primal Video's desktop guide](https://primalvideo.com/guides/capcut-for-pc-mac-tutorial/) describes Modify for name, media-copy policy, aspect, resolution and frame rate. It identifies its written material as an AI-assisted video summary; use it as secondary behavior evidence, not pixel truth.

### 8.2 Video selected

**V, S03:** main tabs **Video, Speed, Animation, Adjust, AI stylize**. Within Video: **Basic, Remove BG, Mask, Retouch**. Other media/clip types can expose Audio as another top-level tab, as S21 demonstrates.

Basic includes an expandable Transform group. Visible rows: Scale slider/value, Uniform scale toggle, Position X/Y fields, Rotate numeric field and dial, alignment controls, and a collapsible Blend group. Reset and keyframe/navigation controls sit to the right of groups/rows. S15 visibly shows the **Add keyframe** tooltip at the transform controls.

**V, S08:** scrolled Basic content includes Auto reframe, aspect ratio, image stabilization, camera moving speed and Apply, followed by other feature rows. The inspector scrolls independently; not all controls fit in the first viewport.

**P:** keep primary tabs/subtabs stable for a selected object. Do not put every property into one giant unstructured form. Preserve expansion/scroll context where appropriate; avoid jumping to the top while the user adjusts a field.

### 8.3 Text and captions selected

**V, S05:** tabs include Text, Animation, Tracking, Text to speech; an overflow control follows. Text has Basic, Bubble and Effects. Visible content: editable text area, AI writer row, Font selector, Font size slider/value, style buttons, case buttons, Color and Save as preset.

The left pane can show Auto captions while the right pane edits a selected text object. A category click is not evidence that a different timeline object was selected.

**P:** share typography controls between text and captions but preserve caption timing/language/speaker and batch-edit state. A multiline field must support IME and normal text shortcuts. The exact placement of a full caption list, Find/Replace and batch editing in the current cohort remains U; a 2023 official desktop masterclass documents those workflows but is not current screenshot proof.

### 8.4 Audio selected

**V, S06/S16:** audio-only selection exposes **Basic, Voice changer, Speed**. Basic has Volume, Fade in and Fade out sliders with numeric values/units and diamond controls. Lower sections include normalization, voice enhancement, translation, noise reduction, isolation and channel controls in S16.

**V, S06:** Voice changer has **Voice filters, Voice characters, Speech to song**; filter tiles appear in a grid with Original, selected outline, availability/download indications, followed by Pitch and Timbre sliders.

Different screenshots say Normalize loudness versus Loudness normalization, Reduce noise versus Noise reduction, and Isolate voice versus Vocal isolation. Treat these as variants, not duplicate controls that all belong in one panel.

### 8.5 Speed

**V, S21:** top-level Speed, subtabs **Standard, Curve, Velocity effects**. Standard shows speed slider with **1.41x**, a duration change **22.4s → 15.9s**, Change audio pitch, Smooth slow-mo and Reset. The selected clip has a speed badge.

**D:** [official desktop speed guide](https://www.capcut.com/resource/how-to-speed-up-a-video) distinguishes uniform Standard speed from Curve ramps. Its mobile section uses **Normal**. Do not silently import a mobile/web Normal label as proof of desktop naming.

**U:** full current native Curve editor, all curve-point actions and preset ordering are not established by a raw cohort-A screenshot. Also distinguish speed curves from property keyframe easing; they change different things.

### 8.6 Color

**V, S17–S20:** top-level **Adjust**, subtabs **Basic, HSL, Curves, Color wheel, Mask**. Save as preset and Apply to all sit near the footer.

- **Basic:** Color group with Temp, Tint, Saturation; a Lightness section heading followed by Exposure and Contrast. Do not mistake the Lightness heading for a proven slider.
- **HSL:** color-range circles, eyedropper, Hue/Saturation/Brightness sliders, numeric fields and diamond controls.
- **Curves:** All and Luma controls, reset/eyedropper, graph with diagonal line and endpoint handles. This is a tonal curve, not a speed curve.
- **Color wheel:** Primary dropdown, Intensity, visible Shadows/Middle grey wheels with channel values; lower Tint/Offset headings partly visible. Do not invent everything below the crop.

Source: [official color-grading walkthrough](https://www.capcut.com/resource/capcut-color-grading). t-cut should separate the three meanings of “curve”: color mapping, property animation easing, and playback speed.

## 9. Timeline in detail

### 9.1 Structure

**V:** horizontal toolbar, ruler, track headers on the left, clips in lanes, vertical playhead and bottom horizontal scrollbar. Text/overlay clips appear above main video; separate music appears below in the inspected projects. Video contains repeated thumbnails; audio has a waveform; text clips show text labels. Selected clips have a bright outline.

A **Cover** control appears beside the start of the main visual track in multiple captures. It is not a general track-name field. The main track does not necessarily occupy the first/top lane.

The playhead has a small top handle and a thin line across track lanes. Ruler tick spacing changes with timeline zoom; the screenshot cannot prove zoom-step increments or frame quantization.

### 9.2 Toolbar grouping

Left: selection-mode control/dropdown, undo/redo, cut/trim-related controls, delete and additional clip tools depending on selected content.

Right: microphone/recording affordance, a group of toggle icons, additional view controls, fit-like control, minus, slider and plus. Exact tooltip names must be captured for the selected build rather than guessed from silhouettes.

**D:** dated desktop tutorials distinguish Main track magnet, Auto snapping and Linkage. Official PC prose confirms magnet/snapping concepts but not every default. The 2024 tutorial descriptions say magnet closes gaps on the main track; snapping aligns nearby edges; linkage makes attached upper elements follow main content. This does not resolve every case involving locked tracks, detached audio or retiming.

### 9.3 Context menus and compounds

**V, S22, dated TourBox cohort:** Copy, Cut, disabled attribute operations, Delete with Backspace, Deactivate clip, Group, Ungroup, Show keyframe animation, Create compound clip with Alt+G, Undo compound clip, Pre-process, Sync video to sound, Range submenu and Link to media. Enabled/disabled state depends on this particular selection.

[D, TourBox](https://www.tourboxtech.com/en/news/capcut-what-is-a-compound-clip.html) describes grouping clips into a compound and undoing the compound. Supplemental desktop tutorials describe double-clicking to enter its internal timeline and an arrow to return. Current breadcrumb appearance remains U.

**P:** keep contextual actions and visible shortcut hints. A selection group and a compound are different entities; do not make two labels invoke the same operation. Hide or clearly explain unavailable actions rather than permitting no-op commands. Exact menu order for a current reference needs observation.

### 9.4 Layout presets

**V, S23:** a top-right layout menu contains Default layout, Transcript-based editing, Media first, Player first, Adjustment first and Timeline first. Default is checked; Timeline first is highlighted in that dated capture.

This proves those labels in that source cohort, not all modern variants. t-cut MVP needs a resizable default layout and reset. Additional presets can follow; preserving user pane sizes must not require a paid feature.

## 10. Export and post-export

**V, S07:** dimmed editor behind a centered dark modal. Title Export near upper left. Left column contains output preview and Edit cover affordance. Right column begins Name and Export to with folder button, then enabled Video section and rows Resolution, Bit rate, Codec, Format, Frame rate, Optical flow and Color space. Settings area scrolls. Footer left shows duration/estimated size; footer right has Export and Cancel.

The captured values **8K, HEVC, mp4, 30fps, Rec.709 SDR** are selected options in an example. They are neither defaults to copy nor proof that t-cut supports them. The article's red outlines/arrows are annotations.

**P:** reproduce the dialog hierarchy and familiar order while showing only qualified export choices. Keep project save separate from rendering. Show progress, cancellation, success/open-folder and actionable failure states. **U:** exact current CapCut progress, completion/share, overwrite and failed-export dialog layouts were not established by this screenshot collection.

## 11. Global settings, project settings and shortcuts

These are three separate surfaces. Do not merge them because all contain form fields.

### Global Settings

**V, S26:** Settings title; tabs **Draft, Edit, Performance, General**. General selected. Language list with current selection mark; Notification section; Software update options; beginning of Right-click menu section; bottom Save/Cancel. A tall content region and clipped lower content indicate more than the initial visible controls.

[D, official language help](https://www.capcut.com/help/how-to-switch-languages-in-capcut): Settings > General > Language, select language, restart if prompted. The language choice is device-specific.

A [Feb-2024 Windows settings tutorial](https://it-future-technology.tistory.com/9), investigated by the research agent, shows **Project/Edit/Performance/Language**, Korean text and Windows paths. It documents project/download/cache locations; stepping/image duration/loudness/frame rate/timecode; hardware encoding/decoding; GPU interface; proxies and output device. Its older tab names must not overwrite S26's official General-tab reference.

**P:** t-cut can use the newer four-tab grouping, familiar layout and local settings scope, while documenting Linux differences. Flatpak updates belong to the package manager; do not draw an Automatic updates toggle that cannot control the installed package. Cache cleanup never deletes original media or required generated assets.

### Project Modify

**V:** entry button in Details (S02). **D:** project name, aspect/resolution/rate, media-copy policy and proxy choices in desktop tutorials. **U:** a readable complete current native Modify dialog was not found. Do not publish a fabricated screenshot-equivalent layout for it.

P: specify required fields and safe behavior now; keep exact tab order/geometry gated on a better reference. Current project settings must not silently become defaults for every future project.

### Shortcuts

**D:** desktop tutorials describe Menu > Help > Shortcuts or a top-right shortcut control, presets, grouped commands, editable bindings and Save. Official desktop subtitle help confirms Ctrl+B/Cmd+B for its scope. Historical S22 proves several bindings for that context.

**U:** the complete current shortcut dialog, preset ordering, conflict presentation, all default mappings and tooltips. A low-resolution thumbnail is not sufficient evidence. t-cut must still provide remapping and conflict detection; mark its exact layout P until directly observed.

## 12. Missing media and recovery

**V, S27:** dialog titled **Link media**, explanatory sentence, table columns Name/Last path/Duration, linked count **0/1 media linked**, **Link media when selecting a folder** checkbox, Link media and Cancel buttons. [The Windows missing-media guide](https://www.downloadsource.net/how-to-fix-media-lost-in-capcut-pc-project-media-not-found/n/23192/) documents restoring moved/renamed source links and the difference between missing footage and missing project data.

The research agent also inspected that guide's editor failure screenshot: red Media lost bin item, Media Not Found preview and missing strip in the timeline. That supports an error-state family, not permission to erase the clip and re-import without preserving edits.

**P:** t-cut needs a file identity-aware relink list and an honest missing-media state. Keep edits/positions while locating replacements. Cancel returns to the project with missing status; it does not abandon the project or silently export red placeholders.

**U:** no readable current crash-recovery prompt, previous-version recovery dialog or complete Trash/Restore screen was established. t-cut's reliability features remain required, but their detailed presentation is a proposed design, not a claim of exact CapCut replication.

## 13. Separate AI workspaces

**V, S12:** AI media creation can live inside the dark editor's left Media hierarchy; it has prompt, model, duration and ratio controls. The timeline/player/inspector remain present.

**V, S13–S14:** AI video maker is a separate light workspace with its own window header. Its landing has creation cards and a right-side form. Its storyboard has a Script/Scenes/Elements/Music vertical rail, scene/script list and preview, with Edit more and Export near the top.

Do not merge this light storyboard into the MVP timeline editor or call it a main-editor theme variant. It is a distinct task flow. The screenshots do not establish whether all internals are native or embedded web content.

## 14. Visual language and density

### Direct observations

- Predominantly dark neutral editor panels with slightly lighter headers/fields and narrow gutters.
- Accent color on selected tool labels, some toggles and primary actions.
- Compact icon-plus-label library tabs; most timeline controls are icon-based.
- Repeated inspector anatomy: section label, optional enable checkbox/disclosure, reset, parameter row, numeric value/stepper, keyframe controls.
- Rounded input/card/section corners, thin selected borders and restrained panel separation.
- Secondary text is dimmer; asset thumbnails and preview carry most color/content.
- Premium/availability/download marks coexist with controls in CapCut; t-cut must reinterpret capability/download states without copying monetization.

### Not measurable from this collection alone

Exact font family, UI font size, logical pixel dimensions, corner-radius tokens, OS scaling, default panel split ratios, animation durations and hover delays. Screenshot image pixels are not CSS/GTK logical units. Do not invent precise hex values or 1px specifications from a scaled/compressed image.

### t-cut decision

P: match region hierarchy, density, grouping, control locations and state transitions closely; use independently authored icons/content and a maintainable native style system. No legal clearance is asserted by changing the logo. If accessibility scaling demands a difference, document it and retain the same conceptual navigation rather than making controls unusably small.

## 15. Reference gaps and how to close them

| Gap | Evidence obtained | Needed before claiming exactness |
|---|---|---|
| Cohort-A app build | Coherent official screenshots, no version label | About/version capture from the same session as reference screens |
| Full Menu | Closed Menu shown; several routes tutorial-documented | Expanded menu and each relevant submenu at readable resolution |
| Project Modify modal | Details/Modify visible; fields described | Full modal capture including both/all tabs and validation states |
| Shortcut editor | Routes/preset editing described | Readable dialog, conflict state and active default profile |
| Trash and Restore | Delete menu/confirmation visible; restoration documented | Trash empty/populated, selection, restore and permanent-delete states |
| Native speed Curve | Standard and Curve tab visible | Curve presets, custom graph, controls and their tooltips |
| Clip/text animation | Tabs visible, historical behavior described | Current object-specific In/Out/Combo or Loop panels |
| Drag/snap/link exactness | Static icons plus dated descriptions | Recorded gesture scenarios with starting/ending clip positions |
| Export progress/failure | Export setup modal visible | Active/cancelled/failed/completed/overwrite states |
| Crash recovery | Reliability need clear; no readable direct UI | Real recovery prompt or explicitly original t-cut design |

No need to stop all work while these gaps remain: Home, empty editor, library, primary inspector states and export structure are well enough documented to create a grounded design specification. Do not fill the gaps with invented claims.

## 16. Plain-language conclusion

CapCut familiarity comes from more than four panels. Users expect a particular Home screen, two levels of tool navigation, project Details before selection, different controls after selection, a recognizable timeline toolbar, and a two-column export window.

For t-cut, the MVP must include that complete application journey. It can contain fewer tools, but it must not require users to learn a different route for creating, opening, editing, saving and exporting a project. The implementation acceptance rules are in [fidelity-contract.md](fidelity-contract.md).

## 17. Research-package validation

Validated on 2026-10-12 after integrating the UI addendum into the existing plan:

- 11 Markdown files checked; all 42 local Markdown links resolve and code fences balance.
- 28 screenshot manifest records have unique IDs/URLs, positive decoded dimensions, SHA-256 fingerprints, source pages and evidence labels.
- Screenshot IDs mentioned in the three research documents resolve to manifest entries.
- The fidelity contract contains 24 unique screen-state rows and 14 unique acceptance scenarios.
- All 40 feature-family IDs and all 40 ordered implementation-task headings remain present.

This validates the research package and its references, not an implemented editor. Public screenshot inspection and image decoding were performed; no CapCut executable, new t-cut application build or interactive t-cut acceptance scenario was run.
