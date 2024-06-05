//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_TERRAIN_H
#define PPGSO_TERRAIN_H

#include <ppgso/ppgso.h>

#include "Scene.h"
#include "Object.h"

class Terrain final : public Object {
private:
    // Static resources (Shared between instances)
    std::unique_ptr<ppgso::Mesh> mesh;
    std::unique_ptr<ppgso::Shader> shader;
    std::unique_ptr<ppgso::Texture> texture;
    std::unique_ptr<ppgso::Texture> shadow_map;


public:
    Terrain(const std::string objName);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
};


#endif //PPGSO_TERRAIN_H
