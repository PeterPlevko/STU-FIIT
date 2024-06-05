#version 330
// The inputs will be fed by the vertex buffer objects
layout(location = 0) in vec3 Position;
layout(location = 1) in vec2 TexCoord;
layout(location = 2) in vec3 Normal;

// Matrices as program attributes
uniform mat4 ProjectionMatrix;
uniform mat4 ViewMatrix;
uniform mat4 ModelMatrix;

// This will be passed to the fragment shader
out vec2 texCoord;

// Normal to pass to the fragment shader
out vec3 normal3;
out vec4 normal4;

out vec3 FragPosition;
out vec3 FragPositionS;

void main() {
    // Copy the input to the fragment shader
    texCoord = TexCoord;

    // Normal in world coordinatesa
    normal4 = normalize(ModelMatrix * vec4(Normal, 0.0f));
    normal3 = normalize(Normal);

    FragPosition = vec3(ModelMatrix * vec4(Position, 1.0));
    FragPositionS = Position;

    // Calculate the final position on screen
    gl_Position = ProjectionMatrix * ViewMatrix * ModelMatrix * vec4(Position, 1.0);
}
