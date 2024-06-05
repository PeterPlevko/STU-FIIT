//
// Created by Matej on 14. 11. 2021.
//

#include "DecorationPiller.h"
#include <glm/gtc/random.hpp>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <shaders/diffuse_vert_glsl.h>
#include <shaders/diffuse_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>
#include <shaders/phong_frag_glsl.h>

// Static resources
//std::unique_ptr<ppgso::Mesh> Terrain::mesh;
//std::unique_ptr<ppgso::Texture> Terrain::texture;
//std::unique_ptr<ppgso::Shader> Terrain::shader;

DecorationPiller::DecorationPiller(int mode, glm::vec3 pos, glm::vec3 rot, glm::vec3 sc) {
    // Set random scale speed and rotation
    position = pos;
    rotation = rot;
    scale = sc;

    this->mode = mode;

    if (mode == 0)
        if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/pillar.obj");

    if (mode == 1)
        if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/pillarTop.obj");

    if (mode == 2)
        if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/pillarBroken.obj");

    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(phong_vert_glsl, phong_frag_glsl);
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/marble.bmp"));

}

bool DecorationPiller::update(Scene &scene, float dt) {
    // Generate modelMatrix from position, rotation and scale
    generateModelMatrix();

    return true;
}

void DecorationPiller::render(Scene &scene) {
    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);
    shader->setUniform("CamPos", scene.camera->position);
    shader->setUniform("global_lighting_on", scene.global_lighting_on);

    shader->setUniform("material.ambient", {0.05f, 0.05f, 0.05f});
    shader->setUniform("material.diffuse", {0.7f, 0.7f, 0.65f});
    shader->setUniform("material.specular", {0.9f, 0.9f, 0.9f});
    shader->setUniform("material.shininess", 32.0f);

    shader->setUniform("lights.count", scene.lights.count);
    for (int i = 0; i < scene.lights.count; i++) {
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

