//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_SharkTop_H
#define PPGSO_SharkTop_H

#include <ppgso/ppgso.h>

#include "Scene.h"
#include "Object.h"
#include "Fish.h"

class SharkTop final : public Object {
private:
    glm::vec3 offset;
    float rotationZ = 0;
    float rotSpeed = .04f;


    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;

public:
    SharkTop(glm::vec3 pos, glm::vec3 rot, float freq);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
    glm::vec3 random_vec3 (float mini, float maxi);
};


#endif
