# GENORA methodology
Educational static frontend and local research pipeline. Screening counts are mathematical expectations using TP=Nps, FN=Np(1-s), TN=N(1-p)c, FP=N(1-p)(1-c). PPV=TP/(TP+FP); NPV=TN/(TN+FN).

Image analysis uses grayscale conversion, CLAHE, Gaussian denoise, thresholding, morphology, connected components and contour overlays. Compare counts with independently annotated references; evaluate mask IoU only with reference masks. Overlap and noisy backgrounds are known failure modes. Synthetic demonstrations are not clinical validation. No diagnosis is provided.

Dataset provenance, scripts, tests and portfolio documentation are included in the source checkout. Sourced educational image credits are available in image-credits.md. Real-image research evaluation and clinical editorial review remain pending.
