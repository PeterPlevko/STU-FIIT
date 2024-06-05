#pragma once
#include <string>
#include <vector>
#include <memory>
#include <fstream>

namespace ppgso {

  class Image {
  public:
    struct Pixel {
      uint8_t r, g, b;
    };

    /*!
     * Create new empty image.
     *
     * @param width - Width in pixels.
     * @param height - Height in pixels.
     */
    Image(int width, int height);

    /*!
     * Get raw access to the image data.
     *
     * @return - Pointer to the raw RGB framebuffer data.
     */
    std::vector<Pixel>& getFramebuffer();

    /*!
     * Get single pixel from the framebuffer.
     *
     * @param x - X position of the pixel in the framebuffer.
     * @param y - Y position of the pixel in the framebuffer.
     * @return - Reference to the pixel.
     */
    Pixel& getPixel(int x, int y);

    /*!
     * Set pixel on coordinates x and y
     * @param x Horizontal coordinate
     * @param y Vertical coordinate
     * @param color Pixel color to set
     */
    void setPixel(int x, int y, const Pixel& color);

    /*!
     * Set pixel on coordinates x and y
     * @param x Horizontal coordinate
     * @param y Vertical coordinate
     * @param r Red channel <0, 255>
     * @param g Green channel <0, 255>
     * @param b Blue channel <0, 255>
     */
    void setPixel(int x, int y, int r, int g, int b);

    /*!
     * Set pixel on coordinates x and y
     * @param x Horizontal coordinate
     * @param y Vertical coordinate
     * @param r Red channel <0, 1>
     * @param g Green channel <0, 1>
     * @param b Blue channel <0, 1>
     */
    void setPixel(int x, int y, float r, float g, float b);

    /*!
     * Clear the image using single color
     * @param color Pixel color to set the image to
     */
    void clear(const Pixel& color = {0,0,0});

    int width, height;
  private:
    std::vector<Pixel> framebuffer;
  };
}

