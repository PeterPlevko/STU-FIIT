#version 330
// A texture is expected as program attribute
uniform sampler2D Texture;

// The vertex shader fill feed this input
in vec2 texCoord;

// The final color
out vec4 FragmentColor;

void main(void)
{
/*
  // Example filters
  float[25] kernel = float[] (
            1.0,  4.0,  6.0,  4.0, 1.0,
            4.0, 16.0, 24.0, 16.0, 4.0,
            6.0, 24.0, 36.0, 24.0, 6.0,
            4.0, 16.0, 24.0, 16.0, 4.0,
            1.0,  4.0,  6.0,  4.0, 1.0);
*/

  float[25] kernel = float[] (
            0.0,  1.0,  1.0,  1.0, 1.0,
           -1.0,  0.0,  1.0,  1.0, 1.0,
           -1.0, -1.0,  0.0,  1.0, 1.0,
           -1.0, -1.0, -1.0,  0.0, 1.0,
           -1.0, -1.0, -1.0, -1.0, 0.0);

  int index = 0;
  vec4 color = vec4(0);
  float factor = 1.0;
  float bias = 0.0;

  for (int i = -2; i <= 2; i++) {
    for (int j = -2; j <= 2; j++) {
      vec2 shift = vec2(i,j) / textureSize(Texture,0);
      color += kernel[index++] * texture(Texture, vec2(texCoord.x, 1.0 - texCoord.y) + shift);
    }
  }
  FragmentColor = color / factor + vec4(bias, bias, bias, 1);
}