# Research proposal
Question: How reliably can basic computer vision identify and count chromosome-like objects in public metaphase images?
Hypothesis: isolated high-contrast objects yield lower count error than overlapping and low-contrast objects.
Background: chromosomes can overlap in metaphase; connected components measure connected foreground regions, not biological chromosome identity. Cytogenetic interpretation requires expert analysis. MedlinePlus Genetics provides introductory genetics context; a peer-reviewed segmentation literature audit remains pending.

Methods: acquire licensed de-identified images; record provenance; obtain independently reviewed manual counts; freeze parameters; evaluate held-out images by quality stratum. The implemented synthetic experiment is a controlled demonstration, not evidence of performance on real microscopy. Seeds 42–44 and intended instance count 18 are deterministic.

Criteria: absolute count error, MAE by quality category, mask IoU only when reference masks exist. Report sample size, all failures, threshold settings, and annotation ambiguity. Do not optimize on evaluation images. No clinical diagnostic claim.
