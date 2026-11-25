# Unit 4: Image Noise, Restoration and Related Operations

> Slides 83, 89-154 | 4 hours

This unit covers noise and its removal, deblurring, zooming, geometric transformations, and then deeper treatments of segmentation and classification (extending Unit 3).

## 1. Image Noise

**Noise** is random speckles on a smooth surface that can seriously affect image quality. Noise means pixels have intensity values different from the correct ones (aberrant pixels).

- It is random variation of brightness or color information, usually an aspect of electronic noise.
- It is produced by the sensor and circuitry of a scanner or digital camera.
- Noise level usually increases with **exposure length**, **physical temperature**, and **camera sensitivity setting**.

**Noise can occur:** during electronic transmission, during data gathering, during scanning (damaged film), and in low-light or dark indoor photos.

**Is noise predictable?** Not exactly, because of its random nature. It is usually described by a probability distribution with a mean and standard deviation.

### Types of noise

| Type | Description |
|------|-------------|
| **Shot noise** | Randomness from photons in the scene, which are discrete and random; causes graininess |
| **Digital noise** | Randomness from the camera sensor and internal electronics |
| **Salt-and-pepper (impulse / spike) noise** | Randomly scattered white or black pixels; intensity spikes caused by transmission errors, malfunctioning sensor pixels, faulty memory, or timing errors in digitization. In MATLAB: `imnoise` |
| **Poisson noise (shot noise)** | Too few photons sensed to give reliable statistical information |

### Signal-independent vs signal-dependent noise

- **Signal-independent:** random gray levels, statistically independent of the image data, added to pixels (typical in electronic transmission). If `A` is the perfect image and `N` the noise, the noisy image is `B = A + N`.
- **Signal-dependent:** the noise level at each point depends on the gray level there.

### Ways to remove or reduce noise (in lab)

Linear filtering, median filtering, adaptive filtering, average filtering, color space conversion, and wavelet transform. *Reading assignment:* video noise.

## 2. Blurring and Deblurring

**Deblurring** removes blurring artifacts (motion blur, out-of-focus blur) to restore a sharp image.

**Causes of blur:** camera shake, fast motion, out-of-focus optics, wide-angle lens, atmospheric turbulence, short exposure (fewer photons), scattered light in confocal microscopy, and sensor noise.

### Degradation model

```
G = H F + N          (matrix form)
g(x,y) = f(x,y) * h(x,y) + n(x,y)   (* = convolution)
```

| Symbol | Meaning |
|--------|---------|
| `G` / `g` | The blurred image |
| `H` / `h` | Distortion operator, the **point spread function (PSF)**: how an optical system spreads a point of light |
| `F` / `f` | The original true image |
| `N` / `n` | Additive noise from image acquisition |

**Deblurring methods (lab):** Wiener filter, regularized filter, blind deconvolution.

```matlab
originalRGB = imread('peppers.png');
h = fspecial('motion', 50, 45);      % motion blur
filteredRGB = imfilter(originalRGB, h);
```

**Applications:** photography (low light or movement), medical imaging, astronomy, forensics.

## 3. Zooming

Enlarging a picture so details become more visible.

| Method | How it works | Pros / cons |
|--------|--------------|-------------|
| **Pixel replication (nearest neighbor)** | Copy each pixel n times row-wise and column-wise | Very simple, but the result is blurry, more so with larger zoom |
| **Zero-order hold (as described in the slides)** | Add two adjacent pixels, divide by two, and place the result between them, first row-wise, then column-wise | Smoother (this is averaging, a form of linear interpolation) |
| **K-times zooming** | For two adjacent pixels, take the difference `D`, divide by `K`, and insert `K-1` values stepping up from the smaller pixel by `D/K` each time; repeat for all rows and columns | Zooms by any factor K |

## 4. Transformation of an Image

Translation, rotation, scaling, affine transform, and image pyramids. Transformations are written as matrix-vector products, using homogeneous coordinates `(x, y, z, 1)`.

| Transform | Effect | Matrix (standard form) |
|-----------|--------|------------------------|
| **Identity** | Does nothing | Identity matrix |
| **Translation** | Moves a vector a distance in a direction | 4 x 4 identity with `tx, ty, tz` in the last column |
| **Scaling** | Scales each component by a (possibly different) scalar | Diagonal `diag(Sx, Sy, Sz, 1)` |
| **Rotation** by angle θ | Rotates the vector | 2D: `[[cos θ, -sin θ], [sin θ, cos θ]]` |

**Example (slides):** translating `v = (10, 10, 10, 1)` by 10 units in X gives `(20, 10, 10, 1)`.
Scaling a vector by 2 doubles each coordinate.

> The slides show the matrices as images. The forms above are the standard ones.

## 5. Image Segmentation (in depth)

Finding groups of pixels that "go together": assigning a label to every pixel so pixels with the same label share certain characteristics. Segments represent objects or parts of objects, made of sets of pixels or "super-pixels". The object is what is of interest in the image; the rest is background.

| Type | Meaning |
|------|---------|
| **Complete segmentation** | A set of disjoint regions corresponding uniquely to objects in the image |
| **Partial segmentation** | Regions that are homogeneous in a chosen property (brightness, color, reflectivity, texture) |
| **Semantic segmentation** | Classifies pixels into meaningful classes (groups objects by class) |
| **Instance segmentation** | Detects each individual object, even among similar objects, and draws its boundary |

**Basic approaches:**

1. **Edge / boundary methods (discontinuity detection):** isolated points, lines, edges.
2. **Region-based methods (similarity detection):** thresholding, region growing, region splitting and merging.

**Properties used:** color (simplest, for example grayscale), texture, motion, depth.

**Challenges:** noisy boundaries (fuzzy edges) and cluttered scenes (more false positives).

**Applications:** content-based image retrieval, remote sensing, medical imaging, object detection and recognition, traffic control, video surveillance.

### Thresholding

With a threshold `T`, a binary image `g` is built from the input `f`:

```
g(i,j) = 1  if f(i,j) > T      (object)
g(i,j) = 0  if f(i,j) <= T     (background)
```

- **Global threshold:** a single `T` (object vs background).
- **Local threshold:** several thresholds when there are multiple objects.

| Method | Idea |
|--------|------|
| **Simple thresholding** | Pixels below `T` become black, above become white |
| **Otsu's binarization** | For a bimodal histogram (two peaks), automatically picks a threshold between the peaks; used for document scans |
| **Adaptive thresholding** | Splits the image into smaller portions and computes a threshold for each, for uneven lighting |

Other techniques: edge detection segmentation and clustering-based segmentation (homogeneous clusters of pixels).

## 6. Image Classification (in depth)

Assigning a label to an image from a predefined set (for example `{cat, dog, panda}`). For a `W x H` RGB image there are `W x H x 3 = N` values to classify.

**Terminology:** dataset (collection of images), data point (one image), training set, testing set.

**Principles and steps:**

- Gather a dataset with roughly the same number of examples per category (avoid class imbalance).
- Split into a **training set** and a **testing set**.
- The test set must be large enough for meaningful results and representative of the whole dataset.
- **Never train on test data.** The sets must be independent and must not overlap.

**Challenges (factors of variation):** viewpoint variation, scale variation, deformation, occlusion, illumination, background clutter, intra-class variation.

### Related concepts (reading)

Machine learning, deep learning, neural networks (NN), convolutional neural networks (CNN), artificial neural networks.

**Machine learning** teaches computers to learn from data to make decisions or predictions without being explicitly programmed. Three types:

| Type | Idea |
|------|------|
| **Supervised** | Labeled data; inputs and outputs are known (task-driven) |
| **Unsupervised** | Unlabeled data (data-driven, for example finding clusters) |
| **Reinforcement** | Learn from mistakes |

## Key Terms

`noise` `salt-and-pepper` `Poisson noise` `median filter` `deblurring` `PSF` `Wiener filter` `pixel replication` `translation` `rotation` `scaling` `semantic segmentation` `instance segmentation` `thresholding` `Otsu` `training set` `testing set` `supervised learning`

## Review Questions

1. What is image noise and what increases it?
2. Compare shot noise, digital noise, and salt-and-pepper noise.
3. Difference between signal-independent and signal-dependent noise.
4. List five noise-removal filters.
5. Explain `g = f * h + n`. What is the PSF?
6. Zoom a 2 x 2 image by 2 using pixel replication. Why is the result blurry?
7. Translate `(10, 10, 10, 1)` by 5 units in Y. What is the scaling matrix for `(2, 3, 1)`?
8. Differentiate semantic and instance segmentation.
9. Explain global, local, Otsu, and adaptive thresholding.
10. Why must the test set never overlap the training set?
11. List the challenges in image classification.
12. Compare supervised, unsupervised, and reinforcement learning.