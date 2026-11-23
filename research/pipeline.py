"""Reproducible chromosome-like object counting, not diagnosis."""
import argparse
import json
from pathlib import Path
import cv2
import numpy as np
import pandas as pd
from skimage import exposure
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt


def load_image(path):
    path = Path(path)
    if not path.is_file():
        raise ValueError(f'Image not found: {path}')
    if path.stat().st_size > 32 * 1024 * 1024:
        raise ValueError('Image exceeds 32 MiB')
    im = cv2.imread(str(path), cv2.IMREAD_UNCHANGED)
    if im is None or im.size == 0 or im.ndim not in (2, 3):
        raise ValueError('Unsupported or unreadable image')
    if im.dtype != np.uint8:
        raise ValueError('Only 8-bit images are supported; convert with documented scaling first')
    if max(im.shape[:2]) > 10000:
        raise ValueError('Image dimensions exceed limit')
    return im


def segment(image, method='otsu', min_area=40, enhance=True):
    if image.dtype != np.uint8 or image.ndim not in (2, 3):
        raise ValueError('Expected an 8-bit grayscale or color image')
    if method not in ('otsu', 'adaptive', 'fixed') or min_area < 1:
        raise ValueError('Invalid segmentation parameters')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) if image.ndim == 3 else image.copy()
    if enhance:
        gray = (exposure.equalize_adapthist(gray, clip_limit=.02) * 255).astype(np.uint8)
    smooth = cv2.GaussianBlur(gray, (3, 3), 0)
    if method == 'adaptive':
        mask = cv2.adaptiveThreshold(smooth, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 35, 7)
    else:
        flag = cv2.THRESH_BINARY_INV | (cv2.THRESH_OTSU if method == 'otsu' else 0)
        _, mask = cv2.threshold(smooth, 127, 255, flag)
    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    count, labels, stats, _ = cv2.connectedComponentsWithStats(mask, 8)
    keep = [i for i in range(1, count) if stats[i, cv2.CC_STAT_AREA] >= min_area]
    clean = (np.isin(labels, keep) * 255).astype(np.uint8)
    contours, _ = cv2.findContours(clean, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    overlay = cv2.cvtColor(image, cv2.COLOR_GRAY2BGR) if image.ndim == 2 else image[:, :, :3].copy()
    cv2.drawContours(overlay, contours, -1, (80, 160, 50), 2)
    for index, contour in enumerate(contours):
        x, y, _, _ = cv2.boundingRect(contour)
        cv2.putText(overlay, str(index + 1), (x, y), cv2.FONT_HERSHEY_SIMPLEX, .4, (0, 0, 180), 1)
    return {'count': len(keep), 'mask': clean, 'overlay': overlay}


def iou(predicted, reference):
    if predicted.shape != reference.shape:
        raise ValueError('Mask shapes differ')
    a, b = predicted > 0, reference > 0
    union = np.logical_or(a, b).sum()
    return float(np.logical_and(a, b).sum() / union) if union else 1.0


def synthetic(seed=42, quality='isolated'):
    rng = np.random.default_rng(seed)
    im = np.full((400, 600), 235, dtype=np.uint8)
    mask = np.zeros_like(im)
    for i in range(18):
        x, y = 50 + (i % 6) * 100, 60 + (i // 6) * 130
        if quality == 'overlap':
            x = 60 + (i % 3) * 170 + (i % 2) * 8
            y = 65 + (i // 6) * 130
        cv2.ellipse(mask, (x, y), (9, 24), int(rng.integers(0, 180)), 0, 360, 255, -1)
    im[mask > 0] = 60 if quality != 'low-contrast' else 205
    if quality == 'low-contrast':
        im = np.clip(im.astype(float) + rng.normal(0, 8, im.shape), 0, 255).astype(np.uint8)
    return im, mask, 18


def evaluate(manifest, root, output, method):
    rows = []
    output.mkdir(parents=True, exist_ok=True)
    for record in manifest:
        image = load_image(root / record['image'])
        result = segment(image, method)
        reference = int(record['reference_count'])
        row = {'image': record['image'], 'quality': record['quality'], 'reference_count': reference,
               'predicted_count': result['count'], 'absolute_error': abs(result['count'] - reference), 'method': method}
        if record.get('mask'):
            row['mask_iou'] = iou(result['mask'], load_image(root / record['mask']))
        rows.append(row)
        stem = Path(record['image']).stem
        cv2.imwrite(str(output / f'{stem}-overlay.png'), result['overlay'])
        cv2.imwrite(str(output / f'{stem}-segmentation.png'), result['mask'])
    frame = pd.DataFrame(rows)
    frame.to_csv(output / 'results.csv', index=False)
    summary = frame.groupby('quality')['absolute_error'].agg(['mean', 'count'])
    summary.to_csv(output / 'quality-summary.csv')
    summary['mean'].plot.bar(ylabel='Mean absolute counting error', title='SYNTHETIC DEMONSTRATION — not clinical evaluation')
    plt.tight_layout()
    plt.savefig(output / 'count-error.png', dpi=160)
    plt.close()
    (output / 'summary.json').write_text(json.dumps({'kind': 'synthetic' if all(r.get('synthetic') for r in manifest) else 'external', 'method': method, 'mae': float(frame.absolute_error.mean()), 'n': len(frame)}, indent=2))
    return frame


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--demo', action='store_true')
    parser.add_argument('--manifest', type=Path)
    parser.add_argument('--method', choices=['otsu', 'adaptive', 'fixed'], default='otsu')
    parser.add_argument('--output', type=Path, default=Path('research/results'))
    args = parser.parse_args()
    if args.demo:
        root = args.output / 'inputs'
        root.mkdir(parents=True, exist_ok=True)
        manifest = []
        for quality in ['isolated', 'low-contrast', 'overlap']:
            for seed in [42, 43, 44]:
                im, mask, n = synthetic(seed, quality)
                name = f'{quality}-{seed}'
                cv2.imwrite(str(root / f'{name}.png'), im)
                cv2.imwrite(str(root / f'{name}-mask.png'), mask)
                manifest.append({'image': f'{name}.png', 'mask': f'{name}-mask.png', 'reference_count': n, 'quality': quality, 'synthetic': True})
        (root / 'manifest.json').write_text(json.dumps(manifest, indent=2))
    elif args.manifest:
        manifest = json.loads(args.manifest.read_text())
        root = args.manifest.parent
    else:
        parser.error('Supply --demo or a provenance-verified --manifest')
    frame = evaluate(manifest, root, args.output, args.method)
    print(frame.to_string(index=False))


if __name__ == '__main__':
    main()
