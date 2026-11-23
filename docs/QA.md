# Quality assurance — 2026-11-10

Passed: strict TypeScript; six Vitest tests; four pytest tests; ESLint; Next.js production static export. Synthetic pipeline executed on nine generated images. Overall count MAE 3; isolated MAE 0, low-contrast MAE 0, overlap MAE 9 (three samples per category). Outputs are retained with exact dependency lock files. These data validate the synthetic experiment only.

Browser QA blocked: sites-preview status returned `preview relay unavailable: No such file or directory`; the mandated cua_repl.js tool is not exposed. Per managed Sites workflow, no alternate preview server or browser-control path was started. Supplied Playwright/axe tests have NOT run. Manual keyboard, real mobile, screenshot, screen reader, contrast, and WCAG 2.2 AA verification remain incomplete. Code includes skip link, semantic controls, focus indicators, large text, reduced motion, equivalent diagram text, responsive layouts, and accessible results. These are implementation properties, not a conformance certification.

Source URL audit: see reference-audit.json. An HTTP success verifies reachability, not full claim review. No clinician reviewed this copy. Authentic medical images and licenses are not verified or bundled; the synthetic schematic is original GENORA content, CC BY 4.0. Real microscopy experiment remains incomplete.

Navigation uses named client-side sections with hash links; all eleven sections are implemented. Static export files and public-download targets are checked programmatically. Browser behavior remains unverified. No backend or paid API is used. Publishing tooling is unavailable locally (Sites source/build helper scripts absent); no hosted URL is claimed. Netlify and Cloudflare setup instructions are provided.

Release checklist: run Playwright and axe in a supported environment; manually keyboard-test every tool; verify color contrast and text resizing in both themes; obtain clinical content review; audit citation relevance and recency; acquire and annotate licensed authentic images; deploy and test the static export.

Security: npm production audit initially found vulnerable transitive PostCSS; a compatible override was installed. Final production audit returned zero vulnerabilities. This is a point-in-time audit, not a security guarantee.

Final static download-target check passed. All six current reference URLs returned HTTP 200; the broken original ISUOG URL is retained in audit history. Synthetic result display is generated from research/results by research.export_site, not invented values.

Illustrated development update: original labeled SVGs now cover selected gestational milestones from week 4 to week 40, with distinct early embryonic illustrations and a weeks 5–8 comparison. MedlinePlus development reference returned HTTP 200 on 2026-11-10. No third-party medical images are reused. Browser validation remains unavailable in this managed environment.

Visual atlas update: thirty labeled schematics now cover all ten non-home sections; homepage cards also display scientific illustrations. Three licensed microscopy images and one 3D ultrasound image were downloaded, visually inspected for relevance and visible identifiers, and recorded with SHA-256 hashes, source, attribution, license, scale and limitations. Image assets are local. The original 3D-ultrasound source description and image specify 21 weeks (filename says 20); display metadata explains this discrepancy. Enlarge dialogs use native dialog focus handling and Escape support, but browser execution remains unverified. Images were not added to the synthetic research evaluation.
