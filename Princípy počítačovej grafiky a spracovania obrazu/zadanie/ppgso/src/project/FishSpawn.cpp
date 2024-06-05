//
// Created by samue on 25-Nov-21.
//

#include "FishSpawn.h"
#include "Fish.h"
#include <shaders/diffuse_vert_glsl.h>
#include <shaders/diffuse_frag_glsl.h>
#include <shaders/phong_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>

// Static resources
std::unique_ptr<ppgso::Mesh> FishSpawn::mesh;
std::unique_ptr<ppgso::Texture> FishSpawn::texture;
std::unique_ptr<ppgso::Shader> FishSpawn::shader;

FishSpawn::FishSpawn(std::vector<glm::vec3> path_points, double interval, double time_interval) {

    this->path_points = path_points;
    this->interval = interval;
    this->time_interval = time_interval;
    this->elapsed_time = -interval;
    this->isFish = false;

    position = path_points.at(0);
    scale = {0.6,0.6,0.6};
    rotation = {3*ppgso::PI/2, 0 , 0};
    color = {1,0.79,0.86};

    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(phong_vert_glsl, phong_frag_glsl);
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/sasanka.bmp"));
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/sasanka.obj");
}

bool FishSpawn::update(Scene &scene, float dt) {

    elapsed_time += dt;
    if (elapsed_time > interval) {
        elapsed_time -= interval;

        for (int i = 0; i < 10; ++i) {

            auto fish = std::make_unique<Fish>(scene, path_points, time_interval);
            scene.objects.push_back(move(fish));
        }

    }

    generateModelMatrix();

    return true;
}

void FishSpawn::render(Scene &scene) {
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
//    shader->setUniform("Transparency", 0f);
//    shader->setUniform("OverallColor", color);
    shader->setUniform("Texture", *texture);
    mesh->render();
}

