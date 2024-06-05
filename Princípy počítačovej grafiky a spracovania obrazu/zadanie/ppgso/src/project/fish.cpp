//
// Created by Matej on 14. 11. 2021.
//

#include "Fish.h"
#include "FishTail.h"
#include <glm/gtc/random.hpp>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>
#include <shaders/diffuse_vert_glsl.h>
#include <shaders/diffuse_frag_glsl.h>
#include <shaders/phong_frag_glsl.h>
#include <shaders/phong_vert_glsl.h>

// Static resources
std::unique_ptr<ppgso::Mesh> Fish::mesh;
std::unique_ptr<ppgso::Texture> Fish::texture;
std::unique_ptr<ppgso::Shader> Fish::shader;

Fish::Fish(Scene &scene, std::vector<glm::vec3> path_points, float total_time_interval) {
    // Set random scale speed and rotation
    this->position = path_points.at(0);

    std::vector<glm::vec3> newPoints;
    newPoints.emplace_back(path_points.at(0));
    newPoints.emplace_back(path_points.at(1));
    for (int i = 2; i < path_points.size() - 1; ++i) {
        auto tmp = path_points.at(i) + random_vec3(-1.0, 1.0);
        newPoints.emplace_back(tmp);
    }
    newPoints.emplace_back(path_points.at(path_points.size()-1));
    this->path_points = newPoints;

    this->total_time_interval = total_time_interval;

    offset = random_vec3(-0.3, 0.3);

    current_time_interval = 0;

    rotation = {3*ppgso::PI/2, 0,0};
    scale = {0.4, 0.4, 0.4};

    auto part = std::make_unique<FishTail>();
    parts.push_back(move(part));

    // Initialize static resources if needed
    if (!shader) shader = std::make_unique<ppgso::Shader>(phong_vert_glsl, phong_frag_glsl);
    if (!texture) texture = std::make_unique<ppgso::Texture>(ppgso::image::loadBMP("textures/fish.bmp"));
    if (!mesh) mesh = std::make_unique<ppgso::Mesh>("models/fishBody.obj");
}

glm::vec3 Fish::random_vec3(float mini, float maxi) {
    return {((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini,
            ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini,
            ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini};
}

bool Fish::update(Scene &scene, float dt) {

    current_time_interval += dt;

    glm::vec3 new_position = bezierRec(path_points, current_time_interval / total_time_interval);

    auto deltaPos = glm::normalize(position - (new_position + offset));
    position = new_position + offset;

    rotation.y = atan2(deltaPos.x, deltaPos.z);

    // Generate modelMatrix from position, rotation and scale
    generateModelMatrix();

    if (current_time_interval >= total_time_interval) {
        isAlive = false;
    }

    for ( auto& obj : parts ) {
        auto part = dynamic_cast<FishTail*>(obj.get());
        part->updateModel(scene, position, rotation, scale, isAlive);
    }


    return isAlive;
}

void Fish::render(Scene &scene) {
    for ( auto& obj : parts ) {
        auto part = dynamic_cast<FishTail*>(obj.get());
        part->render(scene);
    }

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

glm::vec3 Fish::getPoint(glm::vec3 p1, glm::vec3 p2, float t) {
    glm::vec3 tmp = {
            p1.x - (p1.x - p2.x) * t,
            p1.y - (p1.y - p2.y) * t,
            p1.z - (p1.z - p2.z) * t
    };
    return tmp;
}

glm::vec3 Fish::bezierRec(std::vector<glm::vec3> points, float t) {

    if (points.size() == 2) {
        return getPoint(points.at(0), points.at(1), t);
    }

    std::vector<glm::vec3> new_points;

    for (int i = 0; i < points.size() - 1; i++) {
        new_points.emplace_back(getPoint(points.at(i), points.at(i + 1), t));
    }

    return bezierRec(new_points, t);
}
