# GENORA
Understanding Life Before Birth.

A Next.js / TypeScript static educational platform and independent Python research pipeline. No backend, accounts, paid services, personal health data, or analytics.

## Setup
Node 22+ and Python 3.11+ recommended.
```sh
npm ci
npm run dev
npm run typecheck
npm test
npm run lint
npm run build
python -m venv .venv
.venv/bin/pip install -r research/requirements.txt
.venv/bin/python -m pytest research
.venv/bin/python -m research.pipeline --demo --output research/results
.venv/bin/python -m research.export_site
```
`out/` is the public static website. Python runs locally, never on static hosting.

## Review draft

This source package is the family information draft prepared on the
`github-review-draft` branch. It includes the lavender topic pages and the
animated lessons. The public website is managed separately.

To preview the ZIP on Windows, macOS, or Linux:

1. Extract the ZIP and open a terminal in the folder containing `package.json`.
2. Install Node.js 22 or later, then run `npm ci`.
3. Run `npm run dev` and open [http://localhost:3000/](http://localhost:3000/).
4. Stop the local server with Ctrl+C when finished.

The website does not require Python. Python is used for the research experiment.
On Windows, use `.venv\Scripts\python -m pip install -r research/requirements.txt`
and `.venv\Scripts\python -m pytest research` after creating the virtual environment.

Use “See how Genora was built” for the engineering case study. Review the
personal passage on About and confirm the contribution statements before
publication. The participant usability study is proposed and has not been run.
Verification details and content review items are in
`docs/family-preview-review.md`.

## Repository
- app/: responsive frontend, educational modules, SVG tools and accessible controls
- lib/: probability calculations, inheritance logic and structured content/reference database
- tests/: Vitest math tests and Playwright interaction/accessibility checks
- research/: image validation, segmentation, evaluation, notebook and generated results
- datasets/: provenance and acquisition requirements
- docs/portfolio/: project rationale, methods, limitations and KMITL thematic alignment
- public/: downloadable methodology and verified synthetic results only

## Browser tests
`npm run test:e2e` uses Playwright and axe. If Chromium is unavailable, install it with `npx playwright install chromium` in a compatible environment. See docs/QA.md for actual session checks and limitations. Tests are supplied even where the current environment cannot execute them.

## Deployment
See docs/DEPLOYMENT.md for Netlify and Cloudflare Pages. The exported site uses client-side educational sections and hash links; it needs no paid backend. Preferences are memory-only. Provider request logs are outside application control.

## Evidence and limitations
This project is NOT a medical device or clinical decision-support system. No clinician review has occurred. Source records include audit status; medical content requires professional review before clinical use. Three sourced microscopy figures and a 3D fetal ultrasound example are included with individual licenses and provenance in docs/IMAGE-CREDITS.md. Each section includes original labeled schematic illustrations. The adjustable synthetic viewer remains a separate demonstration. Real microscopy evaluation is incomplete. Synthetic counts cannot diagnose aneuploidy. No public source-code URL is configured; all code is included locally.

Code: MIT (LICENSE). Original diagrams and generated synthetic images: CC BY 4.0, attribution GENORA. Third-party scientific image licenses and attributions are listed separately in docs/IMAGE-CREDITS.md.
