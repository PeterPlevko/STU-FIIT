//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_SharkBottom_H
#define PPGSO_SharkBottom_H

#include <ppgso/ppgso.h>

#include "Scene.h"
#include "Object.h"
#include "Fish.h"

class SharkBottom final : public Object {
private:
    glm::vec3 offset;
    float rotationZ = -0.01;
    float rotSpeed = .02f;

    float distanceX = 0;
    float distanceY = -0.01;
    float distanceZ = 0.22;

    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;

public:
    SharkBottom(glm::vec3 pos, glm::vec3 rot);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
    glm::vec3 random_vec3 (float mini, float maxi);
};


#endif //PPGSO_Fish_H
