# GENORA engineering lab review

## Design and implementation

The homepage previously contained several consecutive text sections covering the problem, method, evidence, and limitations. It now uses a labeled DNA schematic, three problem cards, and three learning pathways. The detailed explanations remain available in the learning sections, references, research lab, and engineering case. The illustrations reuse GENORA’s educational drawing system. The new process diagrams are ordered lists with explicit stage names so their meaning is available in text.

The screening lab retains the existing probability model, hypothetical comparison, CSV download, and result handling. It adds definitions beside the inputs and a labeled, patterned bar for the composition of positive results. The figure is omitted for an empty positive group, where the text explains the undefined predictive value.

The production build accepts a base path. Images, video, and downloads use the same build-time value as the application, so local hosting at the domain root and GitHub Pages hosting under `/genora/` can use the same source.

## Source checks for this revision

| Topic | Source and scope |
| --- | --- |
| DNA and inheritance | [MedlinePlus on DNA](https://medlineplus.gov/genetics/understanding/basics/dna/) and [inheritance patterns](https://medlineplus.gov/genetics/understanding/inheritance/inheritancepatterns/) support the introductory distinction between hereditary material and patterns of inheritance. The Punnett square uses a hypothetical single autosomal locus. |
| Prenatal screening | [ACOG on prenatal genetic diagnostic tests](https://www.acog.org/womens-health/faqs/prenatal-genetic-diagnostic-tests) distinguishes estimating likelihood from testing for specific conditions. The numerical inputs in GENORA are illustrative. |
| Imaging | NIH’s [ultrasound](https://www.nibib.nih.gov/sites/default/files/Ultrasound%20Fact%20Sheet%20508.pdf) and [MRI](https://www.nibib.nih.gov/sites/default/files/2022-05/Fact-Sheet-Magnetic-Resonance-Imaging-MRI.pdf) fact sheets support the acquisition and image-formation explanations. [Nikon’s microscopy reference](https://www.microscopyu.com/microscopy-basics/useful-magnification-range) explains why enlarging an image does not necessarily resolve additional detail. |
| Cerebral palsy and disability | [CDC’s risk-factor explainer](https://www.cdc.gov/cerebral-palsy/risk-factors/index.html) distinguishes risk factors from a confirmed individual cause. [WHO on disability and health](https://www.who.int/news-room/fact-sheets/detail/disability-and-health) documents barriers such as stigma and discrimination. |
| Portfolio context | [KMITL’s official program page](https://bme.kmitl.ac.th/bachelor-of-engineering-b-eng-in-biomedical-engineering-international-program/) lists Healthcare Information Technology. The project illustrates technical themes and makes no course-equivalence claim. |

## Verification method

Run `npm test` to reproduce the screening checks. The Engineering Lab page gives numeric reference cases. For the exact-count case, 200 of 1,000 people have the condition and 75% of those 200 screen positive. Of the other 800, 87.5% screen negative. That gives 150 true positives, 100 false positives, 700 true negatives, and 50 false negatives. PPV is 150/250 and NPV is 700/750. The suite also tests probability endpoints, invalid inputs, undefined result groups, and CSV consistency.

## Limitations and future work

The model treats prevalence, sensitivity, and specificity as fixed assumptions for a hypothetical population. The imaging explanations show general engineering concepts, and the separate computer-vision experiment uses synthetic images. Clinical sensitivity, diagnostic performance, and real-world educational outcomes were not measured. Participant usability testing, a full claim-by-claim source audit of legacy material, clinical review, and manual screen-reader testing remain future work.

## Files changed

| Area | Files |
| --- | --- |
| Homepage and shared visual design | `app/components/GenoraHome.tsx`, `app/globals.css` |
| Engineering and simulator | `app/components/EngineeringOverview.tsx`, `app/components/PortfolioCase.tsx`, `app/components/FamilyScreening.tsx` |
| Public assets and GitHub Pages build | `app/components/AnimatedLessons.tsx`, `app/page.tsx`, `lib/visuals.ts`, `lib/public-asset.ts`, `next.config.ts`, `.github/workflows/deploy-pages.yml` |
| Automated tests | `tests/science.test.ts`, `tests/browser/core.spec.ts` |
| Documentation | `README.md`, `docs/engineering-lab-review.md` |

## Executed verification

| Check | Result |
| --- | --- |
| Vitest | 14 passed, including the independent 1,000-person example |
| Python research tests | 4 passed |
| ESLint and Next.js build-time TypeScript check | Passed |
| Next.js static export with `NEXT_PUBLIC_BASE_PATH=/genora` | Passed |
| Playwright against the prefixed production export | 6 passed, including keyboard focus, case navigation, animations, CSV, theme, and the screening figure |
| Responsive sweep | All 13 sections inspected at 375, 768, and 1440 px without horizontal overflow |
| Automated accessibility | No axe WCAG A/AA violations on the sampled homepage, screening, microscopy, and Engineering Lab states at 375 and 1440 px. The browser suite also scanned the caregiver page. |
| Asset and error sweep | 12 linked assets returned successful responses, and no page exceptions were recorded |

The exact-count test uses a numeric tolerance because JavaScript can represent an expected count of 150 as 150.00000000000003. The model was left intact. The local deployment check reproduced the repository path using the production export. GitHub Actions did not run this revision.
