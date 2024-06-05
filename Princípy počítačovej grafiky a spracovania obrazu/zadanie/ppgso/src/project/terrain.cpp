//
// Created by Matej on 14. 11. 2021.
//

#include "Terrain.h"
#include <glm/gtc/random.hpp>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <shaders/diffuse_vert_glsl.h>
#include <shaders/diffuse_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>
#include <shaders/phong_frag_glsl.h>

Terrain::Terrain(const std::string objName) {
    // Set random scale speed and rotation
    position = {0, 0, 0};
    rotation = {3*ppgso::PI/2, 0, 0};
    scale = {2, 2, 2};

    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(phong_vert_glsl, phong_frag_glsl);
    if (!shadow_map) shadow_map = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("maps/shadowMap.bmp"));
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/terrain.bmp"));
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>(objName);
}

bool Terrain::update(Scene &scene, float dt) {

    // Generate modelMatrix from position, rotation and scale
    generateModelMatrix();

    return true;
}

void Terrain::render(Scene &scene) {
    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);
    shader->setUniform("CamPos", scene.camera->position);
    shader->setUniform("global_lighting_on", scene.global_lighting_on);

    shader->setUniform("material.ambient", {0.19125f, 0.0735f, 0.0225f});
    shader->setUniform("material.diffuse", {0.35038f, 0.29f, 0.7828f});
    shader->setUniform("material.specular", {0.256777f, 0.137622f, 0.086014f});
    shader->setUniform("material.shininess", 12.8f);

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
    shader->setUniform("Texture", *texture, 0);
    shader->setUniform("ShadowMap", *shadow_map, 1);
    shader->setUniform("useShadow", true);
    mesh->render();
}

