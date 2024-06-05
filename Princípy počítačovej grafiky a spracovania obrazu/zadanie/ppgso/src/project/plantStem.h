//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_PlantStem_H
#define PPGSO_PlantStem_H

#include <ppgso/ppgso.h>

#include "Scene.h"
#include "Object.h"
#include "Fish.h"

class PlantStem final : public Object {
private:
    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;

public:
    PlantStem(glm::vec3 pos, glm::vec3 rot);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;

private:
    glm::vec3 random_vec3 (float mini, float maxi);
};


#endif //PPGSO_Fish_H
