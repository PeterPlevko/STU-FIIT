#pragma once
#include "image.h"

namespace ppgso {
  namespace image {
/*!
 * Load RAW image from file. Only uncompressed RGB format is supported.
 *
 * @param raw - File path to a RAW image.
 */
  ppgso::Image loadRAW(const std::string &raw, int width, int height);

/*!
 * Save as RAW image.
 * @param image - Image to save.
 * @param raw - Name of the RAW file to save image to.
 */
  void saveRAW(ppgso::Image &image, const std::string &raw);
 }
}
