# Computer Vision and Image Processing: Study Notes

A simple, easy-to-read summary of the course slides (Chapters 1–4, 156 slides).

**Lab tools:** MATLAB and Python (OpenCV)
**Grading:** Assignments 15% · Midterm 20% · Lab 15% · Final 50%

## Table of Contents

1. [Chapter 1: Introduction](#chapter-1-introduction)
2. [Chapter 2: Digital Image Basics](#chapter-2-digital-image-basics)
3. [Chapter 3: Image Operations](#chapter-3-image-operations)
4. [Chapter 4: Noise, Restoration, Zooming, Transformations](#chapter-4-noise-restoration-zooming-transformations)
5. [Exam Hints](#exam-hints)

---

## Chapter 1: Introduction

- **Computer vision (CV)** teaches computers to *understand* images and videos, not just measure them.
- **Image processing (IP)** improves or changes images (quality, noise, preparation for analysis). CV uses IP as a step.
- **Applications:** medical imaging (MRI), face/iris/fingerprint recognition, OCR and license plate readers, self-driving cars, robots, surveillance, panoramas, special effects, military, AR.

## Chapter 2: Digital Image Basics

- **Pixel** = picture element, the smallest unit of an image.
- **Resolution** = number of pixels. Example: 1280 × 1024 = 1,310,720 pixels ≈ 1.3 megapixels.
- **An image is a matrix** (rows × columns) of numbers.
  - Grayscale: 0 = black, 255 = white, values in between are shades of gray.
  - Color: three numbers (R, G, B), each 0–255.

| Color  | RGB value       |
|--------|-----------------|
| White  | (255, 255, 255) |
| Black  | (0, 0, 0)       |
| Red    | (255, 0, 0)     |
| Yellow | (255, 255, 0)   |

### Color models

| Model | Type        | Used for          |
|-------|-------------|-------------------|
| RGB   | Additive    | Screens           |
| CMYK  | Subtractive | Printing          |
| HSL   | Human-style | Describing colors |

HSL = **H**ue (the color), **S**aturation (how pure or strong), **L**ightness (how bright).

### File formats

| Format | Compression | Notes                      |
|--------|-------------|----------------------------|
| JPEG   | Lossy       | Small files, most cameras  |
| PNG    | Lossless    | Web images                 |
| GIF    | Lossless    | Limited colors, animation  |
| TIFF   | None        | Very large files           |

### Units

Cameras use pixels, scanners use **ppi**, printers use **dpi**.

### Matrix review

Addition, multiplication, transpose, determinant and inverse are needed for image math.

## Chapter 3: Image Operations

### Image enhancement

Makes an image clearer by removing noise, sharpening, and fixing contrast.

- **Histogram:** a graph of how many pixels have each brightness.
- **Histogram equalization:** flattens the histogram to improve contrast. Downside: it can amplify noise in dark areas.

### Edge detection

Finds sudden changes in intensity, which are object boundaries.

- **Edge types:** step, ramp, roof, line (spike).
- **Stages:** filtering → differentiation → detection.
- **Algorithms:** Sobel, Prewitt, Roberts, Laplacian, **Canny** (the best known).
- **Canny steps:** grayscale → reduce noise → gradient → non-maximum suppression → double threshold → hysteresis tracking.
- **Canny goals:** good detection, good localization, only one response per edge.

### Image stitching

Joins overlapping photos into a panorama:

capture → find features (SIFT/SURF) → match → align → blend → adjust

### Image classification

Gives a whole image one label (cat, dog, panda).

- **Steps:** dataset → features → train model → evaluate → deploy.
- **Models:** SVM, decision trees, random forests, CNNs (most popular today).
- **Metrics:** accuracy, precision, recall, F1.

## Chapter 4: Noise, Restoration, Zooming, Transformations

### Noise

Random wrong pixel values, caused by low light, sensor heat, transmission errors, or scanning problems.

- **Salt-and-pepper:** random black and white dots.
- **Shot (Poisson):** graininess from too few photons.
- **Signal-independent:** simply added, B = A + N.
- **Signal-dependent:** varies with the gray level.
- **Removal:** linear, median, average and adaptive filters; wavelet transform.

### Deblurring

Removes blur from camera shake, motion, or being out of focus.

**Model:** `G = HF + N`

| Symbol | Meaning                       |
|--------|-------------------------------|
| G      | Blurred image                 |
| H      | Blur (point spread function)  |
| F      | Original true image           |
| N      | Noise                         |

**Methods:** Wiener filter, regularized filter, blind deconvolution.

### Zooming

- **Pixel replication:** copy pixels. Simple but blurry.
- **Zero-order hold:** put the average of two neighbors between them.
- **K-times zooming:** fill in k−1 evenly spaced values between neighbors.

### Transformations

Translation (move), scaling (resize), rotation, affine transform, image pyramids, all done with matrices.

### Segmentation

Divides an image into meaningful regions.

- **Semantic:** label pixels by class. **Instance:** separate each individual object.
- **Approaches:** edge-based (discontinuity) and region-based (similarity).
- **Thresholding:** a pixel is object if `f > T`, otherwise background.
  - **Simple:** one fixed T.
  - **Otsu:** picks T automatically between the two histogram peaks.
  - **Adaptive:** a different T for each area of the image.
- **Challenges:** noisy boundaries, cluttered scenes.

### Classification challenges and machine learning

- **Challenges:** viewpoint, scale, deformation, occlusion, lighting, background clutter, variation within a class.
- **Golden rule:** never train on your test data. Keep training and test sets separate.
- **Machine learning types:** supervised (labeled data), unsupervised (unlabeled data), reinforcement (learning from mistakes).

### Image compression

Makes files smaller. **Lossy** drops some detail; **lossless** keeps everything.

## Exam Hints

- Labs use **MATLAB** and **Python (OpenCV)**.
- Reading assignments to study yourself: matrix inverse, video noise, ML/CNN concepts.