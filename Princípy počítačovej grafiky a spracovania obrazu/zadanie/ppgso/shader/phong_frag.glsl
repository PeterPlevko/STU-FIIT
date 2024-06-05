#version 330

// A texture is expected as program attribute
uniform sampler2D Texture;

uniform sampler2D ShadowMap;
uniform bool useShadow;

// Direction of light
uniform vec3 LightDirection;

// (optional) Transparency
uniform float Transparency;

// (optional) Texture offset
uniform vec2 TextureOffset;

uniform vec3 CamPos;

struct Material {
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;
};

uniform Material material;

struct Lights {
    int count;
    vec3 positions[100];
    vec3 colors[100];
    float ranges[100];
    float strengths[100];
};

uniform Lights lights;

uniform bool global_lighting_on;

// The vertex shader will feed this input
in vec2 texCoord;

// Wordspace normal passed from vertex shader
in vec3 normal3;
in vec4 normal4;

in vec3 FragPosition;
in vec3 FragPositionS;

// The final color
out vec4 FragmentColor;

void main() {

    // global
    vec3 GlobalColor = vec3(1 ,1 , 1);
    vec4 global = vec4(0, 0, 0 ,0);
    float diff = 0;
    if (global_lighting_on) {
        diff = max(dot(normal4, vec4(normalize(LightDirection), 1.0f)), 0.0f);
        global = vec4(diff * GlobalColor, 1);
    }

    // Apply shadows if shadow map is present
    if (useShadow) {
        global *= texture(ShadowMap, vec2(texCoord.x, 1.0 - texCoord.y) + TextureOffset) * 2.0f;
    }

    // Ambient
    vec3 AmbientColor = vec3(0.05f, 0.05f, 130.0f / 255.0f) * material.ambient;
    float ambientStrength = 2;
    vec4 ambient = vec4(ambientStrength * AmbientColor, 1);

    vec4 combLights = global + ambient;

    // Add up all scene lights
    for (int i = 0; i < lights.count; i++) {
        if (lights.ranges[i] > length(lights.positions[i] - FragPosition)) {

            float mult = 1 - length(lights.positions[i] - FragPosition) / lights.ranges[i];

            // Diffuse
            vec3 LightPos = lights.positions[i];
            vec3 LightDir = normalize(LightPos - FragPosition);
            vec3 LightColor = lights.colors[i];

            diff = max(dot(normal4, vec4(LightDir, 1.0f)), 0.0f);
            vec4 diffuse = vec4(diff * LightColor * material.diffuse, 1);

            // Specular
            float specularStrength = 0.5f;
            vec3 viewDir = normalize(CamPos - FragPositionS);
            vec3 reflectDir = reflect(-LightDir, normal3);
            float spec = pow(max(dot(viewDir, reflectDir), 0.0f), material.shininess);
            vec4 specular = vec4(specularStrength * spec * LightColor * material.specular, 1);

            combLights += (diffuse + specular) * mult * lights.strengths[i];
        }
    }

    // Lookup the color in Texture on coordinates given by texCoord
    // NOTE: Texture coordinate is inverted vertically for compatibility with OBJ
    vec4 out_color = texture(Texture, vec2(texCoord.x, 1.0 - texCoord.y) + TextureOffset) * combLights;

    vec3 bg = vec3(15 / 255.0, 10 / 255.0, 105 / 255.0);

    //postprocessing
    float dist = length(CamPos - FragPosition);
    float mult = max(min(dist / 50, 1), -1);

    FragmentColor = out_color + (vec4(bg, 1) - out_color) * mult;
    FragmentColor.a = Transparency;
}
