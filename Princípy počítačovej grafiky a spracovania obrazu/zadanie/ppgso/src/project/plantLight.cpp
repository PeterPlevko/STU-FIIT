//
// Created by Matej on 14. 11. 2021.
//

#include "PlantLight.h"
#include <glm/gtc/random.hpp>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <shaders/color_vert_glsl.h>
#include <shaders/color_frag_glsl.h>
#include <shaders/phong_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>

// Static resources
std::unique_ptr<ppgso::Mesh> PlantLight::mesh;
std::unique_ptr<ppgso::Shader> PlantLight::shader;

PlantLight::PlantLight(glm::vec3 pos, glm::vec3 rot, glm::vec3 color){
    position = pos;
    rotation = rot;
    this->color = color;
    scale = {0.5f, 0.5f, 0.5f};
    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(color_vert_glsl, color_frag_glsl);
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/plantLight.obj");
}

bool PlantLight::update(Scene &scene, float dt) {
    // Generate modelMatrix from position, rotation and scale
    generateModelMatrix();

    return true;
}

void PlantLight::render(Scene &scene) {
    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);

    // render mesh
    shader->setUniform("ModelMatrix", modelMatrix);
    shader->setUniform("OverallColor", color);
    mesh->render();
}
