#pragma once
#include "image.h"

namespace ppgso {
namespace image {
/*!
 * Load BMP image from file. Only uncompressed RGB format is supported.
 *
 * @param bmp - File path to a BMP image.
 */
  ppgso::Image loadBMP(const std::string &bmp);

/*!
 * Save as BMP image.
 * @param image - Image to save.
 * @param bmp - Name of the BMP file to save image to.
 */
  void saveBMP(ppgso::Image &image, const std::string &bmp);

}
}
