//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_DecorationPiller_H
#define PPGSO_DecorationPiller_H

#include <ppgso/ppgso.h>

#include "Scene.h"
#include "Object.h"

class DecorationPiller final : public Object {
private:
    // Static resources (Shared between instances)
    std::unique_ptr<ppgso::Mesh> mesh;
    std::unique_ptr<ppgso::Shader> shader;
    std::unique_ptr<ppgso::Texture> texture;


public:
    int mode;

    DecorationPiller(int mode, glm::vec3 pos, glm::vec3 rot, glm::vec3 sc);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
};


#endif //PPGSO_TERRAIN_H
