//
// Created by Matej on 14. 11. 2021.
//

#include "SharkTop.h"

#include <shaders/phong_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>

// Static resources
std::unique_ptr<ppgso::Mesh> SharkTop::mesh;
std::unique_ptr<ppgso::Texture> SharkTop::texture;
std::unique_ptr<ppgso::Shader> SharkTop::shader;

SharkTop::SharkTop(glm::vec3 pos, glm::vec3 rot, float freq){
    position = pos;
    rotation = rot;
    rotSpeed = freq;
    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(phong_vert_glsl, phong_frag_glsl);
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/shark.bmp"));
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/sharkTop.obj");
}

bool SharkTop::update(Scene &scene, float dt) {

    if (rotationZ <= -ppgso::PI/2) {
        rotSpeed = rotSpeed*-1;
    }
    if (rotationZ >= 0.5) {
        rotSpeed = rotSpeed*-1;
    }
    rotationZ += rotSpeed;

    rotation.x = rotationZ;

    // Generate modelMatrix from position, rotation and scale
    generateModelMatrix();

    return true;
}

void SharkTop::render(Scene &scene) {
    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);
    shader->setUniform("CamPos", scene.camera->position);
    shader->setUniform("global_lighting_on", scene.global_lighting_on);

    shader->setUniform("material.ambient", {0.05f, 0.05f, 0.05f});
    shader->setUniform("material.diffuse", {0.8f, 0.8f, 0.8f});
    shader->setUniform("material.specular", {0.9f, 0.9f, 0.9f});
    shader->setUniform("material.shininess", 32.0f);

    shader->setUniform("lights.count", 1);
    for (int i = 0; i < 1; i++) {
        shader->setUniform("lights.positions[" + std::to_string(i) + "]", scene.lights.positions[i]);
        shader->setUniform("lights.colors[" + std::to_string(i) + "]", scene.lights.colors[i]);
        shader->setUniform("lights.ranges[" + std::to_string(i) + "]", scene.lights.ranges[i]);
        if (scene.lights.strengths[i] < 0) {
            shader->setUniform("lights.strengths[" + std::to_string(i) + "]", 0.0f);
        }
        else {
            shader->setUniform("lights.strengths[" + std::to_string(i) + "]", scene.lights.strengths[i]);
        }
    }

    // render mesh
    shader->setUniform("ModelMatrix", modelMatrix);
    shader->setUniform("Texture", *texture);
    mesh->render();
}
