# Unit 3: Image Operations

> Slides 60-88 | 6 hours

Topics: image enhancement, segmentation, edge detection, classification, stitching, and recognition.

> **Note:** the classification and stitching slides (84-88) appear right after the Unit 4 title slide in the original deck, but they belong to this unit's topic list, so they are covered here.

## 1. Image Enhancement

Adjusting digital images so the results are more suitable for display or further processing: highlighting useful information and weakening or removing unwanted information.

**Applications:** noise removal, smoothing and sharpening, brightening, deblurring, color correction, filtering, and correcting poor contrast or unbalanced colors.

Enhancement techniques fall into two broad categories: **spatial domain** and **frequency domain**.

### Histogram equalization

- An **image histogram** is a graphical representation of the intensity distribution: the number of pixels (vertical axis) at each brightness value (horizontal axis).
- **Histogram equalization (HE)** adjusts contrast using the histogram: it makes the histogram flat and stretches out the intensity range.
- **Problem:** noise in dark regions can be amplified and become more visible.

## 2. Image Segmentation

Dividing an image into multiple meaningful, coherent regions that correspond to objects, boundaries, or other structures. Used in object recognition, scene understanding, medical imaging, and autonomous driving.

| Approach | Idea | Examples |
|----------|------|----------|
| **Thresholding** | Pixels above a threshold go to one segment, below to another; works when foreground and background differ clearly | Global threshold |
| **Edge-based** | Detect boundaries between regions, then segment using them | Canny, Sobel, Laplacian of Gaussian (LoG) |
| **Region-based** | Group pixels by color similarity, texture, or connectivity | Watershed (flooding a topographic surface), mean-shift |
| **Clustering-based** | Group pixels by feature similarity in color or texture space | k-means, Gaussian mixture models |
| **Deep learning** | CNNs learn end-to-end mappings to segmentation maps from labeled data | FCN, U-Net (pixel-wise semantic segmentation) |

Segmentation is hard in complex scenes, with occlusions, or under varying lighting and viewpoint. A combination of techniques often works best.

## 3. Edge Detection

An **edge** is the boundary between an object and the background, or between overlapping objects. It is a curve along a path of rapid change in image intensity. Edges occur at boundaries between regions of different color, intensity, or texture.

If edges are found accurately, all objects can be located and properties such as area, perimeter, and shape can be measured.

### Types of edges

| Edge | Description |
|------|-------------|
| **Step** | Transition between two intensity levels ideally over 1 pixel |
| **Ramp** | Gradual transition between two intensity levels |
| **Spike (line)** | A thin line |
| **Roof** | Determined by the thickness and sharpness of the line |

### Stages in edge detection

1. **Filtering:** remove noise.
2. **Differentiation:** highlight where intensity changes are significant.
3. **Detection:** localize those points and detect peaks among the edge points.

### Common algorithms

**Sobel, Canny, Prewitt, Roberts, fuzzy logic methods, and Laplacian.** The Laplacian uses second-order derivatives and is sensitive to noise, so Gaussian smoothing is applied first.

### Canny edge detector (1986)

John Canny defined three goals for a detector:

| Goal | Meaning |
|------|---------|
| **Good detection (error rate)** | Respond only to edges and find all of them |
| **Good localization** | Detected edge pixels should be as close as possible to the true edge |
| **Single response** | Do not report multiple edge pixels for one edge |

**Canny steps:**

1. Convert the image to grayscale.
2. Reduce noise (derivatives are sensitive to noise).
3. Calculate the gradient (edge intensity and direction).
4. Non-maximum suppression (thin the edges).
5. Double threshold (strong, weak, and irrelevant pixels).
6. Hysteresis edge tracking.

**MATLAB:** `BW = edge(I, method)` where method is `'sobel'` or `'canny'`.

**Edge tracing:** following the edges, usually collecting the edge pixels into a list.

## 4. Image Classification

Assigning a label to an image as a whole. Unlike object detection, it usually concerns single-object images.

**Pipeline:**

1. **Dataset preparation:** a labeled dataset (images plus class labels).
2. **Feature extraction:** handcrafted descriptors (HOG, SIFT) or features learned by CNNs (transfer learning).
3. **Model training:** SVM, decision trees, random forests, or CNNs learn to map features to labels.
4. **Model evaluation:** on a separate test set using accuracy, precision, recall, and F1 score.
5. **Deployment and prediction:** apply the model to new, unseen images.

CNNs are now the dominant approach. High performance needs large, diverse labeled data, good architecture choice, and regularization (dropout, data augmentation).

## 5. Image Stitching

Combining overlapping images into one seamless panorama.

| Step | What happens |
|------|--------------|
| **Image acquisition** | Capture overlapping images with enough overlap for alignment and blending |
| **Feature extraction** | Detect distinctive key points, for example with SIFT or SURF |
| **Feature matching** | Match features between image pairs (nearest neighbor, RANSAC, robust estimation) |
| **Image alignment** | Estimate transformations (translation, rotation, scale) using homography or affine transforms |
| **Image blending** | Remove seams with feathering, gradient-based, or multi-band blending |
| **Final adjustment** | Any needed final adjustments |

## Key Terms

`enhancement` `histogram` `histogram equalization` `segmentation` `threshold` `edge` `Sobel` `Canny` `non-maximum suppression` `hysteresis` `classification` `SIFT` `RANSAC` `homography` `stitching`

## Review Questions

1. What is image enhancement? Name three applications.
2. What does an image histogram show? How does histogram equalization improve contrast, and what is its drawback?
3. List the five segmentation approaches with one example each.
4. Define an edge and describe step, ramp, spike, and roof edges.
5. Explain the three stages of edge detection.
6. State Canny's three goals and list the Canny steps in order.
7. Why is Gaussian smoothing applied before the Laplacian?
8. List the steps of an image classification pipeline.
9. Describe the steps of image stitching.