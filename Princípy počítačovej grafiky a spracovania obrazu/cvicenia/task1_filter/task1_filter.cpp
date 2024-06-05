// Task 1 - Load a 512x512 image lena.raw
//        - Apply specified per-pixel transformation to each pixel
//        - Save as result.raw
#include <fstream>
#include <iostream>
#include <vector>

// Size of the framebuffer
const unsigned int SIZE = 512;

// A simple RGB struct will represent a pixel in the framebuffer
struct Pixel {
  // TODO: Define correct data type for r, g, b channel
  unsigned char r, g, b;
};

int main()
{
  // Initialize a framebuffer
      auto framebuffer = new Pixel[SIZE][SIZE];

  // TODO: Open file lena.raw (this is 512x512 RAW GRB format)
    std::ifstream image_in_stream("lena.raw", std::ios::binary);

  // TODO: Read data to framebuffer and close the file
    image_in_stream.read(reinterpret_cast<char *>((unsigned char *) framebuffer), static_cast<std::streamsize>(SIZE * SIZE * 3));
    image_in_stream.close();

  // Traverse the framebuffer
  for (unsigned int y = 0; y < SIZE; y++) {
    for (unsigned int x = 0; x < SIZE; x++) {
//        int rndm = (rand() % 70);
//        framebuffer[x][y].r = (unsigned char) ((rndm + framebuffer[x][y].r) > 255 ? 255 : (rndm + framebuffer[x][y].r));
        framebuffer[x][y].r =  (unsigned char) (1.5*framebuffer[x][y].r);
        framebuffer[x][y].g =  (unsigned char) (1.5*framebuffer[x][y].g);
        framebuffer[x][y].b =  (unsigned char) (1.5*framebuffer[x][y].b);
    }
  }

  // TODO: Open file result.raw
  std::ofstream image_out_stream("result.raw", std::ios::binary);
  std::cout << "Generating result.raw file ..." << std::endl;

  // TODO: Write the framebuffer to the file and close it
    image_out_stream.write(reinterpret_cast<const char *>(framebuffer), static_cast<long long int>(SIZE * SIZE * 3));
    image_out_stream.close();

  std::cout << "Done." << std::endl;
  delete[] framebuffer;
  return EXIT_SUCCESS;
}
