# Architecture and reproducibility
Next.js exports a static React interface. Tailwind is configured; design tokens and responsive component styles are in app/globals.css. State and calculations run in the browser. No health information is requested or transmitted by application code. There is no runtime Python service.

Screening: TP=N×p×sensitivity; FN=N×p×(1−sensitivity); TN=N×(1−p)×specificity; FP=N×(1−p)×(1−specificity). PPV=TP/(TP+FP); NPV=TN/(TN+FN). Zero denominators return undefined. Counts are expectations, not observations. Inputs are validated as finite and bounded. CSV uses controlled numeric values.

Pipeline: validate supported 8-bit image → grayscale → adaptive histogram contrast enhancement → Gaussian denoise → Otsu/adaptive/fixed inverse threshold → morphological opening → connected-component area filter → contour overlay. Area threshold is 40 pixels, Gaussian kernel 3×3, opening 3×3. No learned model is justified for this baseline.

Run `python -m research.pipeline --demo --method otsu --output research/results`. Other methods: adaptive, fixed. Real manifest: `python -m research.pipeline --manifest datasets/manifest.json --output research/real-results`. Manifest format and provenance in datasets/README.md. Preserve pixel scaling; thresholds are not calibrated physical measurements.

Outputs: per-image CSV, grouped MAE CSV, summary JSON, count-error PNG, segmentation and contour overlays, generated input masks and manifest. The notebook reads these exports. Reference counts for synthetic objects come from generation; real images require manually annotated references. Masks evaluate foreground segmentation, not instance separation.

After the synthetic run, `python -m research.export_site` copies verified results and graph to public/ and generates lib/experiment.json. Rebuild the website to display them. The exporter rejects non-synthetic result summaries.
