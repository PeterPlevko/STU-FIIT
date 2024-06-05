//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_VOLCANO_H
#define PPGSO_VOLCANO_H

#include <ppgso/ppgso.h>
#include "Scene.h"
#include "Object.h"

class Volcano final : public Object {
private:
    bool isBurst = true;
    float flag = 0;
    bool isSending = true;

    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;


public:
    Volcano(bool burst, glm::vec3 position);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
};


#endif
