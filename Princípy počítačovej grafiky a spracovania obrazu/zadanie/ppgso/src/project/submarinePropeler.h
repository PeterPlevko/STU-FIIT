//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_SUBMARINE_PROPELER_H
#define PPGSO_SUBMARINE_PROPELER_H

#include <ppgso/ppgso.h>
#include "Scene.h"
#include "Object.h"

class SubmarinePropeler final : public Object {
private:
    std::list< std::unique_ptr<Object> > parts;

    glm::mat4 offset;
    float rotationZ = -0.01;
    float rotSpeed = .08f;

    float distanceX = 0.85;
    float distanceY = 0;
    float distanceZ = 0;

    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;


public:
    SubmarinePropeler();

    bool update(Scene &scene, float dt) override;

    void updateModel(Scene &scene, glm::vec3 rot, glm::vec3 sc, float speed, glm::mat4 translateMatrix);

    void render(Scene &scene) override;

private:
};


#endif
