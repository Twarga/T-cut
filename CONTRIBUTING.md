# Contributing to T-cut

**Current scope:** planning documents, original brand assets and a static coming-soon website. The video editor is not implemented. Do not open an issue expecting an installable app.

## Choose one task

| Interest | Useful contribution |
|---|---|
| Product | Review the [release scope](docs/plan/release-roadmap.md) for missing requirements or conflicting dependencies |
| Linux/media | Review [Phase 0](docs/plan/starter-plan.md) and its independently measurable timing fixtures |
| UI | Compare the [fidelity contract](docs/research/fidelity-contract.md) with its cited reference cohort |
| Website | Improve readable content, responsive layout, keyboard behavior or truthful status |
| Identity | Review the [brand guide](docs/brand/brand-guidelines.md) and [design system](docs/brand/design-system.md) |

## Before a pull request

1. Read the relevant contract. Keep edits focused on one user-visible result.
2. Open an issue first for backend, project-format, license or brand changes. Small corrections need no preliminary issue.
3. Keep third-party rights and sources explicit. Do not commit arbitrary footage, model checkpoints or CapCut assets.
4. Verify the actual changed path. Screenshot website changes in dark/light and at a narrow width; check keyboard, reduced motion and JavaScript-disabled fallback when relevant.
5. Update affected docs and the changelog after behavior is verified. Do not claim unexecuted tests or label planned capabilities as shipped.

Use plain language in issues and descriptions. Explain the problem, what changed and the evidence. Follow respectful, technical discussion; harassment and discriminatory conduct are not acceptable.

## Local website preview

```sh
python3 -m http.server 8000 --directory docs
```

Open `http://localhost:8000/`. No Node packages or Rust compilation are required for the site.

GitHub Pages publishes `main` → `/docs`. Normal asset links are relative; the 404 page’s base targets `/T-cut/` so nested missing paths still load the site assets.

## Project boundaries

- The editor remains Linux-first and Rust-led; the static website is not a browser-based editor.
- Shared UI values live in `docs/assets/tokens.css`. Do not introduce competing hardcoded component colors.
- The site must work without remote fonts, analytics or a signup service.
- Tests, benchmarks and compatibility claims must identify their actual inputs/runtime and observed result.
- Source media and saved projects belong to users. A feature that risks their files requires explicit safety and recovery evidence.

## License and sign-off

Contributions to original project material follow GPL-3.0-or-later. Third-party exceptions keep their licenses and notices. Contributors must have the right to submit the material.

Sign commits using `git commit -s` to certify the [Developer Certificate of Origin](https://developercertificate.org/). A sign-off is provenance, not a copyright assignment.

Pull requests should state the relevant task/contract, actual verification, limitations and any changed dependencies or assets. A maintainer reviews integration before merge.
