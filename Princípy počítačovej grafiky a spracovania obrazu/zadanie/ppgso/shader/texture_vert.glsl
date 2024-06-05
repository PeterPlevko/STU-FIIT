#version 330
// The inputs will be fed by the vertex buffer objects
layout(location = 0) in vec3 Position;
layout(location = 1) in vec2 TexCoord;

// Matrices as program attributes
uniform mat4 ProjectionMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ModelMatrix;

// This will be passed to the fragment shader
out vec2 texCoord;

void main() {
  // Copy the input to the fragment shader
  texCoord = TexCoord;

  // Calculate the final position on screen
  gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(Position, 1.0);
}
