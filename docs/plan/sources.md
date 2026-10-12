# Research Sources and Claim Boundaries

## At a glance

- Sources prove where a claim comes from. They do not prove every claim was tested.
- Labels: **D** documented, **O** observed locally, **P** our proposal, **G** still needs qualification.
- Nothing here is a dependency to copy into the product.

Research consolidated for the 2026-10-11 planning baseline. Links below are evidence sources, not dependencies to be copied into the product. Some were read during the earlier research in this conversation; the starter crate manifests, GTK sink contract, GES ownership documentation, and selected UI evidence were checked again while preparing this plan. Dynamic `latest` documentation is not a substitute for the versions pinned during implementation.

**D:** source documents a statement. **O:** local execution/visual observation. **P:** our proposal. **G:** qualification remains required. A source link establishes provenance, not that every marketing claim was independently tested.

## 1. CapCut reference behavior

| Source | Supported claim | Limit |
|---|---|---|
| [Desktop editor](https://www.capcut.com/tools/desktop-video-editor) | D: Windows/macOS desktop product, editing/keyframe/color/caption claims | No official native Linux build listed on this page; feature quality not independently established |
| [How to use CapCut](https://www.capcut.com/resource/how-to-use-capcut) | D: desktop workbench, import/timeline/inspector/export workflows and screenshots | Marketing/tutorial page; exact build not pinned |
| [How to use CapCut on PC](https://www.capcut.com/resource/how-to-use-capcut-on-pc) | D: contextual controls and desktop task sequence | Labels can change between versions |
| [Professional PC editor](https://www.capcut.com/resource/pc-professional-video-editor) | D: high-level snapping/magnet, playback/shortcut claims | Does not define complete mode/selection semantics |
| [UI changes](https://www.capcut.com/help/capcut-ui-update-changes) | D: controls/layout can change with updates | Supports need for versioned reference capture |
| [Desktop subtitle split](https://www.capcut.com/help/split-the-subtiltes) | D: Ctrl+B Windows/Cmd+B macOS; web B differs | Exact subtitle minimum/selection behavior needs observed-build evidence |
| [Export a clip/range](https://www.capcut.com/help/export-clip-of-video) | D: I/O and Shift+X range workflow | Not a complete shortcut specification |
| [Keyframe workflow](https://www.capcut.com/resource/how-to-add-keyframes-in-capcut) | D: property diamonds, animation; Alt+K resource claim | Shortcut conflicts/version differences remain a gate |
| [Keyframe troubleshooting](https://www.capcut.com/help/keyframes-in-capcut-pc) | D: selection/context and asset limitations | Not universal animation support |
| [Recognize subtitles](https://www.capcut.com/help/how-to-recognise-subtitles) | D: platform-specific caption generation and editing | Cloud/local processing and quality not generalized |
| [Import subtitles](https://www.capcut.com/help/how-to-import-subtitles) | D: desktop SRT/TXT, web/mobile differences | Formats/style fidelity depend on platform/version |
| [Auto captions](https://www.capcut.com/help/auto-captions-in-capcut) | D: human correction needed for recognition errors | No universal accuracy guarantee |
| [Template export](https://www.capcut.com/help/use-and-export-templates-in-capcut) | D: mobile template catalog differs from desktop | Do not promise identical community catalog on Linux |
| [Project import behavior](https://www.capcut.com/help/import-a-previous-project-into-the-current-project) | D: limitations importing editable projects into others | Does not define a public supported interchange format |
| [Export troubleshooting](https://www.capcut.com/help/export-video-on-capcut) | D: desktop/web hardware/resource/network distinctions | Not a benchmark for our engine |
| [AI desktop capabilities](https://www.capcut.com/tools/desktop-ai-power) | D: script assembly, cutout, captions, reframe, retouch claims | Capability advertising, not implementations or measured parity |
| [Speed ramps](https://www.capcut.com/tools/speed-ramp) | D: editable speed-curve workflow | Marketing free/paid statements may lag current entitlement |

One official promotional screenshot was visually inspected while planning: [script-to-video/editor view](https://p16-seeyou-sg.ibyteimg.com/tos-alisg-i-2zwwjm3azk-sg/b4bf8d68662043eab1d7b76b98d8003c~tplv-2zwwjm3azk-image.image). It shows library/player/details/timeline regions. It is not redistributed as a project asset and does not prove the current exact UI. The local [wireframe](ui-layout.svg) is independently authored and conceptual.

## 2. Rust/native stack evidence

| Source | Verified planning fact | Gate |
|---|---|---|
| [GTK 0.10.1 workspace manifest](https://raw.githubusercontent.com/gtk-rs/gtk4-rs/0.10.1/Cargo.toml) | D: GLib 0.21 family, Rust 1.83 declared upstream | Project Rust 1.96 pin is our choice; resolve secure patched releases |
| [GTK 0.10.1 crate manifest](https://raw.githubusercontent.com/gtk-rs/gtk4-rs/0.10.1/gtk4/Cargo.toml) | D: native GTK feature gates including v4_14 | Native packages must satisfy chosen floor |
| [GStreamer 0.24.0 workspace manifest](https://raw.githubusercontent.com/GStreamer/gstreamer-rs/0.24.0/Cargo.toml) | D: GLib 0.21 and Rust 1.83 declared upstream | Version-family compatibility is not a compiled integration proof |
| [GES sys manifest](https://raw.githubusercontent.com/GStreamer/gstreamer-rs/0.24.0/gstreamer-editing-services/sys/Cargo.toml) | D: pkg-config name `gst-editing-services-1.0`, native feature floors | Local dev metadata absent in observed environment |
| [GTK sink 0.14.0 published manifest](https://docs.rs/crate/gst-plugin-gtk4/0.14.0/source/Cargo.toml) | D: GTK 0.10, GStreamer 0.24, MPL-2.0 and feature names | Audit exact redistributed sink source/license conditions |
| [GTK sink documentation](https://gstreamer.freedesktop.org/documentation/gtk4/index.html) | D: paintable sink, GL feature requirements; DMA-BUF needs GTK4.14 plus feature | Zero-copy depends on actual driver/format/context negotiation |
| [GES Rust API](https://gstreamer.freedesktop.org/documentation/rust/stable/latest/docs/gstreamer_editing_services/index.html) | D: GES API not thread-safe; native requirements and package families | Current online API may be newer than starter family |
| [DMA-BUF design](https://gstreamer.freedesktop.org/documentation/additional/design/dmabuf.html) | D: format/modifier/memory negotiation requirements | Hardware integration must be measured |
| [MLT framework](https://www.mltframework.org/docs/framework/) | D: producer/consumer/filter/transition architecture | Candidate fallback, not proven Rust integration |
| [MLT repository](https://github.com/mltframework/mlt) | D: existing open media engine and licensing source | Actual module/build obligations vary |
| [Kdenlive](https://github.com/KDE/kdenlive) | D: established GPL editor, MLT project reference | Not Rust application; reuse is not automatic product fit |
| [Pitivi](https://gitlab.gnome.org/GNOME/pitivi) | D: existing GTK/GES editor reference | Does not prove every requested CapCut-like path |
| [wgpu](https://github.com/gfx-rs/wgpu) | D: graphics abstraction | Does not supply codecs/audio/timeline automatically |
| [OpenTimelineIO architecture](https://opentimelineio.readthedocs.io/en/stable/tutorials/architecture.html) | D: editorial interchange model | Not a renderer or complete proprietary-effect translator |
| [Flatpak permissions](https://docs.flatpak.org/en/latest/sandbox-permissions.html) | D: sandbox permissions/portal model | Actual file persistence/capture/GPU path needs installed-package tests |
| [FFmpeg legal guidance](https://ffmpeg.org/legal.html) | D: build options/dependencies change licensing; nonfree builds can be unredistributable | Codec patents and local distribution rules are separate |
| [GStreamer licensing FAQ](https://gstreamer.freedesktop.org/documentation/frequently-asked-questions/licensing.html) | D: framework/plugin licensing distinctions | Audit actual plugins rather than assigning one license to all media code |

## 3. Local AI candidate evidence

Runtime code, model weights, voices, tokenizers and training-data/output rights are different questions. A repository license badge is insufficient for an official model pack.

| Source | Candidate capability | Important limitation |
|---|---|---|
| [whisper.cpp](https://github.com/ggml-org/whisper.cpp) | Local transcription with CPU/GPU backends | Exact model license, language/timing quality and hardware speed separately evaluated |
| [faster-whisper](https://github.com/SYSTRAN/faster-whisper) | Alternative inference implementation | Python/CTranslate2 runtime integration, not pure Rust |
| [WhisperX](https://github.com/m-bain/whisperX) | Alignment/diarization workflows | Dependent checkpoints/terms and overlapping speech limitations |
| [DeepFilterNet](https://github.com/Rikorose/DeepFilterNet) | Native speech enhancement path, Rust components | Checkpoint license and lookahead compensation |
| [Demucs](https://github.com/facebookresearch/demucs) | Source separation | Maintenance and exact weight terms must be reviewed |
| [SAM2](https://github.com/facebookresearch/sam2) | Video segmentation/tracking | Upstream Apache code/checkpoints statement; not an alpha-matting/inpainting replacement |
| [Robust Video Matting](https://github.com/PeterL1n/RobustVideoMatting) | Human alpha matting | GPL code; exact redistributed weights need a clear rights record |
| [Practical RIFE](https://github.com/hzwer/Practical-RIFE) | Frame interpolation | Verify chosen implementation/checkpoint license and temporal artifacts |
| [RIFE ncnn Vulkan](https://github.com/nihui/rife-ncnn-vulkan) | Vulkan inference integration candidate | Device coverage and packaging need qualification |
| [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) | Restoration/upscale | Code license does not automatically cover every downloaded weight |
| [Kokoro-82M](https://huggingface.co/hexgrad/Kokoro-82M) | Apache-licensed checkpoint candidate for TTS | Voice/phonemizer dependencies and language quality separately checked |
| [Piper maintained GPL project](https://github.com/OHF-Voice/piper1-gpl) | Local TTS | Voices have individual licenses |
| [OpenVoice](https://github.com/myshell-ai/OpenVoice) | Voice cloning candidate | Consent and dependent model/vocoder rights |
| [OPUS-MT en-de example](https://huggingface.co/Helsinki-NLP/opus-mt-en-de) | Specific translation pair | Do not infer all language-pair licenses from one model |
| [NLLB distilled model](https://huggingface.co/facebook/nllb-200-distilled-600M) | Translation research reference | Noncommercial weights unsuitable for unrestricted official pack |
| [XTTS-v2 license](https://huggingface.co/coqui/XTTS-v2/blob/main/LICENSE.txt) | Explains CPML restrictions | Noncommercial model/output conditions not removed by a free editor |
| [Wan2.1 T2V 1.3B](https://huggingface.co/Wan-AI/Wan2.1-T2V-1.3B) | Exact local video-generation candidate | Upstream GPU memory/runtime figures are not our benchmark |
| [LTX-Video](https://github.com/Lightricks/LTX-Video) | Generation research reference | Code and checkpoint-specific/revenue-conditioned licenses differ |
| [ONNX Rust binding](https://docs.rs/ort/latest/ort/) | Native inference integration option | Supported graph/operators/providers and binding version need qualification |
| [Candle](https://github.com/huggingface/candle) | Rust model implementation option | Not a universal loader for arbitrary checkpoints |

## 4. Compatibility and legal boundaries

- [pyCapCut](https://github.com/GuanYixuan/pyCapCut): evidence that some unencrypted draft structures can be generated/read; not an independent CapCut renderer and not universal or legally cleared interchange.
- [CapCut Material License Agreement](https://www.capcut.com/clause/material-license-agreement): platform materials/music have separate conditions; do not transplant the catalog into a competing editor.
- [CapCut Terms](https://www.capcut.com/clause/terms-of-service): contract restrictions need jurisdiction/version-specific review; “clean room” is not an automatic legal clearance.
- [17 USC 102](https://uscode.house.gov/view.xhtml?req=granuleid:USC-prelim-title17-section102&num=0&edition=prelim): US idea/method versus expression distinction. Functional workflow familiarity is different from copying expressive assets/code.
- [Copyright Office circular 31](https://www.copyright.gov/circs/circ31.pdf): ideas/methods/systems guidance.
- [15 USC 1125](https://www.govinfo.gov/content/pkg/USCODE-2024-title15/html/USCODE-2024-title15-chap22-subchapIII-sec1125.htm): false affiliation/source confusion and trade-dress principles.
- [USPTO trade-dress guidance](https://tmep.uspto.gov/RDMS/TMEP/print?href=TMEP-1200d1e835.html&version=current): overall appearance/functionality/distinctiveness analysis.

These US sources illustrate risks, not legal advice for all jurisdictions. Separate branding is necessary but not sufficient to guarantee safety. Counsel should review final name, total presentation, asset provenance, reference method, import adapter and distribution before public release.

## 5. What was actually exercised versus planned

**Observed:** official promotional screenshot; current local compiler/Cargo and GStreamer CLI/pkg-config outputs; earlier CLI GES render and decoded frame/title output. The endpoint discrepancy remains unresolved.

**Documented:** selected crate manifest compatibility, GES thread constraint, sink feature requirements, official UI workflow references and cited license/model distinctions.

**Proposed:** Rust app architecture, project format, interaction defaults, task graph, budgets, governance, package strategy and model shortlist.

**Not performed:** implementation of the new editor, Rust GUI/media integration build, current CapCut desktop interaction capture, GPU qualification, AI benchmark, source/model redistribution clearance, accessibility run, or product tests. The validation performed for this deliverable is document/coverage validation, reported in the master plan.
