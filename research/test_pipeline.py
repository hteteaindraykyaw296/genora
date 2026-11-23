import numpy as np
import pytest
from research.pipeline import synthetic, segment, iou, load_image, evaluate

def test_isolated_objects_count():
    image, mask, count = synthetic()
    result = segment(image)
    assert result['count'] == count
    assert iou(result['mask'], mask) > .85

def test_overlap_is_an_evaluated_failure():
    image, _, count = synthetic(quality='overlap')
    assert segment(image)['count'] < count

def test_masks_and_empty_image():
    assert iou(np.zeros((2, 2)), np.zeros((2, 2))) == 1
    assert segment(np.full((100, 100), 255, dtype=np.uint8))['count'] == 0
    with pytest.raises(ValueError):
        iou(np.zeros((2, 2)), np.zeros((3, 3)))

def test_invalid_images(tmp_path):
    with pytest.raises(ValueError):
        load_image(tmp_path / 'missing.png')
    with pytest.raises(ValueError):
        segment(np.zeros((2, 2), dtype=float))
    with pytest.raises(ValueError):
        segment(np.zeros((20, 20), dtype=np.uint8), 'unknown')
