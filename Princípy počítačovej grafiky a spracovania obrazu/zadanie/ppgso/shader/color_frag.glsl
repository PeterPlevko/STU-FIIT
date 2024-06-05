#version 330
in vec3 vertexColor;

// The final color
out vec4 FragmentColor;

// Additional overall color when not using per-vertex Color input
uniform vec3 OverallColor;

void main() {
  // Just pass the color to the output
  FragmentColor = vec4(vertexColor + OverallColor, 1.0f);
}
