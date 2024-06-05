//
// Created by samue on 25-Nov-21.
//

#ifndef PPGSO_FISHSPAWN_H
#define PPGSO_FISHSPAWN_H

#include <glm/glm.hpp>
#include "Scene.h"
#include "Object.h"


class FishSpawn final : public Object {
private:
    glm::vec3 color;

    std::vector<glm::vec3> path_points;
    bool isFish;
    double interval;
    double time_interval;

    double elapsed_time = 0;

    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;

public:

    FishSpawn(std::vector<glm::vec3> path_points, double interval, double time_interval);

    bool update(Scene &scene, float dt) override;
    void render(Scene &scene) override;
};


#endif //PPGSO_FISHSPAWN_H
