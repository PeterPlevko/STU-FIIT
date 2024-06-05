//
// Created by Matej on 14. 11. 2021.
//

#include "SubmarinePropeler.h"
#include "Bubble.h"
#include <glm/gtx/euler_angles.hpp>
#include <glm/gtc/random.hpp>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <shaders/diffuse_vert_glsl.h>
#include <shaders/diffuse_frag_glsl.h>


// Static resources
std::unique_ptr<ppgso::Mesh> SubmarinePropeler::mesh;
std::unique_ptr<ppgso::Texture> SubmarinePropeler::texture;
std::unique_ptr<ppgso::Shader> SubmarinePropeler::shader;

SubmarinePropeler::SubmarinePropeler(){

    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(texture_vert_glsl, texture_frag_glsl);
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/submarine.bmp"));
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/submarinePropeller.obj");
}

void SubmarinePropeler::updateModel(Scene &scene, glm::vec3 rot, glm::vec3 sc, float speed, glm::mat4 translateMatrix) {
    scale = sc;

    offset = translateMatrix * glm::translate(glm::mat4(1.0f), {(distanceZ + distanceX) * sin(rot.y), distanceY, (distanceZ + distanceX) * cos(rot.y)});

    rotation.x = rot.x;
    rotation.y = 3*ppgso::PI/2;
    rotation.z = rot.y - ppgso::PI/2;

    if (speed >= 0)
        rotationZ += rotSpeed;
    else
        rotationZ -= rotSpeed;
    rotation.x = rotationZ;


    if (((float) rand() / (float) RAND_MAX) < 0.15) {
        auto bubble = std::make_unique<Bubble>(offset, ((float) rand() / (float) RAND_MAX) * (45 - 35) + 35, 0.035, 0.05, 0.1);
        parts.push_back(move(bubble));
    }

    update(scene, 0);
//    render(scene);
}

bool SubmarinePropeler::update(Scene &scene, float dt) {
    auto i = std::begin(parts);

    while (i != std::end(parts)) {
        auto obj = i->get();
        if (!obj->update(scene, dt))
            i = parts.erase(i);
        else
            ++i;
    }
    modelMatrix = offset * glm::orientate4(rotation) * glm::scale(glm::mat4(1.0f), scale);

    return true;
}

void SubmarinePropeler::render(Scene &scene) {
    for (auto &obj: parts) {
        auto bubble = dynamic_cast<Bubble *>(obj.get());
        bubble->render(scene);
    }

    shader->use();

    // Set up light
    shader->setUniform("LightDirection", scene.lightDirection);

    // use camera
    shader->setUniform("ProjectionMatrix", scene.camera->projectionMatrix);
    shader->setUniform("ViewMatrix", scene.camera->viewMatrix);
    shader->setUniform("CamPos", scene.camera->position);
    shader->setUniform("global_lighting_on", scene.global_lighting_on);

    shader->setUniform("material.ambient", {0.25f, 0.25f, 0.25f});
    shader->setUniform("material.diffuse", {0.4f, 0.4f, 0.4f});
    shader->setUniform("material.specular", {0.774597f, 0.774597f, 0.774597f});
    shader->setUniform("material.shininess", 76.8f);

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

