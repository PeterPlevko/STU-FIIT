#version 330
in vec3 vertexColor;

// The final color
out vec4 FragmentColor;

// Additional overall color when not using per-vertex Color input
uniform vec3 OverallColor;

void main() {
    vec3 LightColor = vec3(0.1f, 0.1f, 170f / 255f);

    float ambientStrength = 0.2f;
    vec3 ambient = ambientStrength * LightColor;

    vec3 result = ambient * OverallColor;
    FragmentColor = vec4(result, 1.0f);
}
