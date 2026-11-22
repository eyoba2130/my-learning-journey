# Unit 2: Digital Image Fundamentals

> Slides 24-59 | 4 hours

## Digital Images

Electronic snapshots taken of a scene or scanned from documents (photographs, manuscripts, printed text, artwork). Key properties:

- **Pixel resolution:** the number of pixels the image contains.
- **Color representation:** colors are represented using different color models.
- **Image formats:** stored in specific file formats.
- **Compression and editing:** images can be compressed and edited.
- **Metadata:** extra information such as camera settings, date and time, geolocation, and author.

## Geometric Primitives

Points, lines, rays, planes, circles, polygons, and shapes.

## Lighting

Images cannot exist without light. Two kinds of light source:

| Source | Description |
|--------|-------------|
| **Point light source** | Originates at a single location (a small bulb), possibly at infinity (the Sun) |
| **Area light source** | For example a ceiling fluorescent fixture; modeled as a finite rectangular area emitting light equally in all directions |

## Color

### Additive and subtractive colors

- **Additive:** red, green, and blue mix to give cyan, magenta, yellow, and white.
- **Subtractive:** cyan, magenta, and yellow mix to give red, green, blue, and black.

| Term | Meaning |
|------|---------|
| **Primary colors (of light)** | Cannot be made by mixing other colors: red, green, blue (RGB) |
| **Composite (secondary) colors** | Made by mixing two primaries: cyan, magenta, yellow |
| **Complementary colors** | Two colors that give white light when mixed (for example red and cyan) |

### Color models

| Model | Type | Used for | How colors form |
|-------|------|----------|-----------------|
| **RGB** | Additive | Computers, televisions, electronics | Light waves added together |
| **CMYK** | Subtractive | Painting and printing | Absorbing wavelengths of visible light |

## Pixels

- **Pixel = picture element:** the smallest unit of a digital image that can be displayed.
- Pixels store color information; color values are vectors.
- A pixel sits at location `(x, y)` and has a value or color `c`.

### Resolution

- Resolution is the number of pixels in an image (pixel count), and the amount of detail.
- *Example:* a 1280 x 1024 monitor has 1,310,720 pixels, about 1.31 megapixels.

| Device | Unit |
|--------|------|
| Digital cameras | Pixels |
| Scanners | ppi (pixels per inch) |
| Printers | dpi (dots per inch) |

## Image File Formats

| Format | Compression | Notes |
|--------|-------------|-------|
| **JPEG / JPG** | Lossy (some detail lost) | Small files; most digital cameras use it |
| **GIF** | Lossless | Good for the web and animation; limited color range, not for printing or photography |
| **PNG** | Lossless | For web images |
| **TIFF** | Uncompressed | Very large files |

## What is an Image?

- An image is a function `f(x, y)` of two coordinates (horizontal and vertical). Its value at a point is the pixel value there.
- In practice it is a **2D array (matrix) of numbers** in rows and columns, usually from 0 to 255.
- 1 byte = 8 bits, so values run from 0 to 2^8 - 1 = 255.

### Grayscale and color pixels

| Type | Representation |
|------|----------------|
| **Grayscale** | One value, 0 (black) to 255 (white); values between are shades of gray |
| **Color (RGB)** | Three values (R, G, B), each 0 to 255 |

| Color | RGB value |
|-------|-----------|
| White | (255, 255, 255) |
| Black | (0, 0, 0) |
| Pure red | (255, 0, 0) |
| Yellow | (255, 255, 0) |

## Review of Matrices and Vectors

An **m x n matrix** has m rows and n columns.

- **Addition and subtraction:** add or subtract corresponding entries.
- **Multiplication:** work across a row of the first matrix and down a column of the second, multiply element by element, and add the products. The result goes in the matching position.
- **Transpose** `A^T`: rows become columns and columns become rows (an m x n matrix becomes n x m).
- **Determinant** `det(A)`, `|A|`:
  - 2 x 2: `det = ad - bc` for `[[a, b], [c, d]]`
  - 3 x 3: expand along a row or column
- **Inverse:** a reading assignment (standard result: `A^-1 = adj(A) / det(A)`; for a 2 x 2 matrix, `A^-1 = 1/(ad - bc) * [[d, -b], [-c, a]]`).

> The slides show the 3 x 3 determinant and inverse formulas as images. The forms above are the standard ones.

## HSL Color Model ("the human way of understanding colors")

| Component | Meaning |
|-----------|---------|
| **Hue** | The actual color, as a position on the color wheel, in degrees (0 to 360): 0 = red, 120 = green, 240 = blue |
| **Saturation** | The strength or purity of a color; the amount of gray mixed in (0% gray, 100% vibrant) |
| **Lightness (luminance)** | How bright or dark the color is; how much white or black is mixed in |

## Key Terms

`pixel` `resolution` `ppi` `dpi` `RGB` `CMYK` `additive` `subtractive` `JPEG` `PNG` `GIF` `TIFF` `matrix` `transpose` `determinant` `HSL` `metadata`

## Review Questions

1. What is a pixel? How many pixels does a 1920 x 1080 image have?
2. Differentiate additive (RGB) and subtractive (CMYK) color models and say where each is used.
3. What are primary, secondary, and complementary colors?
4. Compare JPEG, GIF, PNG, and TIFF.
5. Why do pixel values range from 0 to 255?
6. Give the RGB values for white, black, red, and yellow.
7. Transpose a 2 x 3 matrix and compute the determinant of `[[2, 1], [5, 3]]`.
8. Explain hue, saturation, and lightness.