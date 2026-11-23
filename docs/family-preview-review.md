# Genora family information preview

Prepared on the branch `github-review-draft` from the existing site source.

## Preview

Open http://127.0.0.1:4190/ while the local preview server is running.
The portfolio case is http://127.0.0.1:4190/#how-genora-was-built.
The simulator controls are http://127.0.0.1:4190/#prenatal-testing-lab?focus=simulator-controls.

For a fresh checkout, install dependencies with npm ci, then run npm run dev and open http://localhost:3000/.
The production output is in out/. This update is prepared for review, with no production deployment or GitHub push performed. The ZIP is built from the local review branch and excludes Git history, installed dependencies, build outputs, credentials and temporary files.

## Changes

The homepage introduces three family questions and links to the existing genetics, prenatal testing, and caregiver pages.
The mission uses the supplied text. About includes the supplied first-person motivation about living with cerebral palsy.
Family FAQs cover inheritance, uncertainty, choices about testing, and support that respects individual preferences.
The existing screening calculation now powers a fictional family example and two fixed worked populations. Detailed equations are available in a disclosure.
The engineering page describes the information need, processing, output design, verification and limits. It also displays the archived synthetic overlap input, thresholded image and component overlay.

## Executed verification

- Production build, integrated TypeScript checks, and ESLint passed on 22 November 2026.
- Ten unit tests passed, covering existing inheritance behavior and the extended screening checks.
- Population 10,000, prevalence 0.1%, sensitivity 99%, specificity 99.9% produced expected TP 9.9, FP 9.99, TN 9980.01 and FN 0.1. PPV displayed as 49.77%.
- The same test at prevalence 1% produced expected TP 99, FP 9.9, TN 9890.1 and FN 1. PPV displayed as 90.91%.
- Empty positive and negative result groups display an undefined-value explanation.
- Endpoint probabilities and supported population limits conserve the population total. Invalid inputs are rejected by the calculation or clamped by the controls.
- CSV output matches the shared calculation and labels probability proportions explicitly.
- Six repository browser tests passed on 22 November 2026. They cover all three family paths, topic deep links, simulator focus, worked values, undefined values, input clamping, CSV and checklist downloads, all three video clips and their explanations, fictional case feedback, theme switching, visible keyboard focus, and larger text at phone width.
- The automated accessibility scan passed for the tested caregiver page state.
- Additional browser checks passed for all three question paths, existing topic deep links, CSV download, portfolio images, undefined results and browser errors.
- Desktop and phone layout screenshots were reviewed.

## Review before publication

Confirm the About wording represents the personal account you want to share publicly.
The portfolio explicitly identifies AI assistance and asks you to confirm which design, code, illustration, research and testing activities you personally completed.
The proposed participant usability study is labeled planned. No study with families or clinicians has been conducted.
Clinical content has not been professionally reviewed. The examples use hypothetical population assumptions. The research images are synthetic, and the counting pipeline has not been validated on real microscopy.


## Source package

This request included an instruction file. No source ZIP was attached, so work continued from the existing GENORA checkout and previously prepared family information draft.
The package contains package.json, package-lock.json, the app and data files, scientific image credits, animated WebM clips, research scripts and outputs, and the existing static hosting settings.
Extract the package, open a terminal in its genora folder, run npm ci, then npm run dev. Use http://localhost:3000/ for that fresh preview.
The .openai/hosting.json file retains the original Site identifier and static output configuration. It contains no authentication credential. Publishing or pushing requires separate action after your review.

## Review decisions

Confirm which tasks you personally performed before presenting the portfolio contribution statement in an application.
The first-person passage is based only on your supplied statement about living with cerebral palsy and observing assumptions and blame.
The planned usability study has not been conducted. Automated browser checks do not substitute for a participant study or clinical review.
The scientific content distinguishes cerebral palsy, inherited conditions, and disability, with links to CDC, MedlinePlus and WHO. ACOG screening references are retained. Its patient FAQ could not be directly fetched during this pass, so clinical editorial review remains pending.
