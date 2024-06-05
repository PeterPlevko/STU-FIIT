//
// Created by Matej on 14. 11. 2021.
//

#include "Bubble.h"
#include <glm/gtc/random.hpp>

#include <shaders/color_vert_glsl.h>
#include <shaders/color_frag_glsl.h>
#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <glm/gtx/euler_angles.hpp>


// Static resources
std::unique_ptr<ppgso::Mesh> Bubble::mesh;
std::unique_ptr<ppgso::Texture> Bubble::texture;
std::unique_ptr<ppgso::Shader> Bubble::shader;

Bubble:: Bubble(glm::vec3  position, float timeAlive, float minSc, float maxSc, float rndPos) {
    // Set random scale speed and rotation
    this->position = position;
    auto rndmPos = random_vec3(-rndPos, rndPos);
    this->position.x += rndmPos.x;
    this->position.y += rndmPos.y;
    this->position.z += rndmPos.z;

    rotation = random_vec3(-0.1, 0.1);
    scale = sameRandom_vec3(minSc, maxSc);

    color = {0.6,0.85,0.92};

    time = timeAlive;
    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(color_vert_glsl, color_frag_glsl);
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/sphere.obj");
}

glm::vec3 Bubble::random_vec3 (float mini, float maxi) {
    return {((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini,((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini,  ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini};
}


glm::vec3 Bubble::sameRandom_vec3 (float mini, float maxi) {
    float sur = ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini;
    return { sur, sur, sur};
}

bool Bubble::update(Scene &scene, float dt) {
    auto speed = random_vec3(0.005, 0.005);
    translateMatrix[3][0] += scene.waterCurrent.x;
    translateMatrix[3][1] += speed.y;
    translateMatrix[3][2] += scene.waterCurrent.z;

    if (time < 0)
        return false;

    time--;
    // Generate modelMatrix from position, rotation and scale
//    generateModelMatrix();
    modelMatrix =
            translateMatrix
            * glm::orientate4(rotation)
            * glm::scale(glm::mat4(1.0f), scale);

    return true;
}

void Bubble::render(Scene &scene) {
    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);

    // render mesh
    shader->setUniform("ModelMatrix", modelMatrix);
//    shader->setUniform("Transparency", 0f);
    shader->setUniform("OverallColor", color);
    mesh->render();
}

Bubble::Bubble(glm::mat4 translateMatrix, float timeAlive, float minSc, float maxSc, float rndPos) {
    auto rndmPos = random_vec3(-rndPos, rndPos);
    translateMatrix[3][0] += rndmPos.x;
    translateMatrix[3][1] += rndmPos.y;
    translateMatrix[3][2] += rndmPos.z;
    this->translateMatrix = translateMatrix;

    rotation = random_vec3(-0.1, 0.1);
    scale = sameRandom_vec3(minSc, maxSc);

    color = {0.6,0.85,0.92};

    time = timeAlive;
    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(color_vert_glsl, color_frag_glsl);
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/sphere.obj");
}

