#include <iostream>
#include <fstream>
#include <sstream>
#include "image_bmp.h"

namespace ppgso {
  namespace image {

// Structs for reading/writing BMP files
#pragma pack(2)
    typedef struct /**** BMP file header structure ****/
    {
      unsigned short bfType;      /* Magic number for file */
      unsigned int bfSize;        /* Size of file */
      unsigned short bfReserved1; /* Reserved */
      unsigned short bfReserved2; /* ... */
      unsigned int bfOffBits;     /* Offset to bitmap data */
    } BITMAPFILEHEADER;

    typedef struct /**** BMP file info structure ****/
    {
      unsigned int biSize;         /* Size of info header */
      int biWidth;                 /* Width of image */
      int biHeight;                /* Height of image */
      unsigned short biPlanes;     /* Number of color planes */
      unsigned short biBitCount;   /* Number of bits per pixel */
      unsigned int biCompression;  /* Type of compression to use */
      unsigned int biSizeImage;    /* Size of image data */
      int biXPelsPerMeter;         /* X pixels per meter */
      int biYPelsPerMeter;         /* Y pixels per meter */
      unsigned int biClrUsed;      /* Number of colors used */
      unsigned int biClrImportant; /* Number of important colors */
    } BITMAPINFOHEADER;
#pragma pack()

    Image loadBMP(const std::string &bmp) {
      BITMAPFILEHEADER bmpFileHeader = {};
      BITMAPINFOHEADER bmpInfoHeader = {};

      std::ifstream input_file(bmp, std::ios::binary);

      // Check headers
      if (!input_file.is_open()) {
        std::stringstream msg;
        msg << "Could not open BMP file. " << bmp;
        throw std::runtime_error(msg.str());
      }

      input_file.read((char *) &bmpFileHeader, sizeof(BITMAPFILEHEADER));
      input_file.read((char *) &bmpInfoHeader, sizeof(BITMAPINFOHEADER));

      if (bmpFileHeader.bfType != 19778) {
        std::stringstream msg;
        msg << "BMP file does not contain supported BMP format. " << bmp;
        throw std::runtime_error(msg.str());
      }

      if (bmpInfoHeader.biBitCount != 24) {
        std::stringstream msg;
        msg << "BMP file does not contain supported bit count. " << bmp;
        throw std::runtime_error(msg.str());
      }

      if (bmpInfoHeader.biCompression != 0) { // BI_RGB only
        std::stringstream msg;
        msg << "BMP file does not use expected compression method. " << bmp;
        throw std::runtime_error(msg.str());
      }

      int width = bmpInfoHeader.biWidth;
      int height = abs(bmpInfoHeader.biHeight);
      bool flipped = bmpInfoHeader.biHeight < 0;

      if (width == 0 || height == 0) {
        std::stringstream msg;
        msg << "BMP file does not contain any data. " << bmp;
        throw std::runtime_error(msg.str());
      }

      Image image{width, height};
      auto &framebuffer = image.getFramebuffer();

      // Load data
      input_file.seekg(bmpFileHeader.bfOffBits, input_file.beg);

      // BMP uses padding for rows
      unsigned int row_padded = (width * sizeof(Image::Pixel) + 3) & (~3);

      for (int j = 0; j < height; j++) {
        auto row_data = std::vector<Image::Pixel>(row_padded);
        input_file.read((char *) row_data.data(), row_padded);
        for (int i = 0; i < width; i++) {
          auto pixel = row_data[i];
          std::swap(pixel.r, pixel.b);
          if (flipped) {
            framebuffer[i + j * width] = pixel;
          } else {
            framebuffer[i + (height - 1 - j) * width] = pixel;
          }
        }
      }
      input_file.close();

      return image;
    }

    void saveBMP(ppgso::Image &image, const std::string &bmp) {
      auto width = image.width;
      auto height = image.height;
      auto &framebuffer = image.getFramebuffer();

      unsigned int row_padded = (width * sizeof(Image::Pixel) + 3) & (~3);

      BITMAPFILEHEADER bmpFileHeader = {};
      bmpFileHeader.bfType = 19778;
      bmpFileHeader.bfSize = row_padded * height + 122;
      bmpFileHeader.bfReserved1 = 0;
      bmpFileHeader.bfReserved2 = 0;
      bmpFileHeader.bfOffBits = 122;

      BITMAPINFOHEADER bmpInfoHeader = {};
      bmpInfoHeader.biSize = 108;
      bmpInfoHeader.biWidth = width;
      bmpInfoHeader.biHeight = height;
      bmpInfoHeader.biPlanes = 1;
      bmpInfoHeader.biBitCount = 24;
      bmpInfoHeader.biCompression = 0;
      bmpInfoHeader.biSizeImage = row_padded * height;
      bmpInfoHeader.biXPelsPerMeter = 2835;
      bmpInfoHeader.biYPelsPerMeter = 2835;
      bmpInfoHeader.biClrUsed = 0;
      bmpInfoHeader.biClrImportant = 0;

      std::ofstream output_file(bmp, std::ios::binary);

      if (!output_file.is_open()) {
        std::stringstream msg;
        msg << "Could not open BMP file for writing. " << bmp;
        throw std::runtime_error(msg.str());
      }

      output_file.write((char *) &bmpFileHeader, sizeof(BITMAPFILEHEADER));
      output_file.write((char *) &bmpInfoHeader, sizeof(BITMAPINFOHEADER));

      // Prepare BRG output data by swapping RGB to BRG and mirroring along height
      output_file.seekp(bmpFileHeader.bfOffBits, output_file.beg);

      for (int j = 0; j < height; j++) {
        auto output_row = std::vector<Image::Pixel>(row_padded);
        for (int i = 0; i < width; i++) {
          auto pixel = framebuffer[i + (height - 1 - j) * width];
          std::swap(pixel.r, pixel.b);
          output_row[i] = pixel;
        }
        output_file.write((char *) output_row.data(), row_padded);
      }

      output_file.close();
    }
  }
}
