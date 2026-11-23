"""Publish only verified generated synthetic summaries into the static site."""
from pathlib import Path
import json
import shutil
import pandas as pd
root = Path(__file__).resolve().parents[1]
results = root / 'research/results'
summary = json.loads((results / 'summary.json').read_text())
if summary['kind'] != 'synthetic':
    raise ValueError('This exporter requires the synthetic demonstration; real data needs separate review')
frame = pd.read_csv(results / 'results.csv')
summary['quality'] = [{'name': name, 'mae': float(group.absolute_error.mean()), 'images': len(group)} for name, group in frame.groupby('quality')]
(root / 'lib/experiment.json').write_text(json.dumps(summary, indent=2))
shutil.copyfile(results / 'results.csv', root / 'public/research-results.csv')
shutil.copyfile(results / 'count-error.png', root / 'public/count-error.png')
print('Exported synthetic results into the website')
