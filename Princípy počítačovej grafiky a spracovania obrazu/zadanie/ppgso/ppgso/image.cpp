#include <algorithm>
#include "image.h"

uint8_t clamp(float value) {
  return (uint8_t) (std::min(std::max(value, 0.0f), 1.0f) * 255.0f);
}

ppgso::Image::Image(int width, int height) : width{width}, height{height} {
  framebuffer.resize((size_t) (width * height));
}

std::vector<ppgso::Image::Pixel>& ppgso::Image::getFramebuffer() {
  return framebuffer;
}

ppgso::Image::Pixel& ppgso::Image::getPixel(int x, int y) {
  return framebuffer[x+y*width];
}

void ppgso::Image::setPixel(int x, int y, const Image::Pixel& color) {
  framebuffer[x+y*width] = color;
}

void ppgso::Image::clear(const ppgso::Image::Pixel &color) {
  framebuffer = std::vector<Pixel>(framebuffer.size(), color);
}

void ppgso::Image::setPixel(int x, int y, int r, int g, int b) {
  setPixel(x,y,{(uint8_t)r, (uint8_t)g, (uint8_t)b});
}

void ppgso::Image::setPixel(int x, int y, float r, float g, float b) {
  setPixel(x,y,{clamp(r), clamp(g), clamp(b)});
}
