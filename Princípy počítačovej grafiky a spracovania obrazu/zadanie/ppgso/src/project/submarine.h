//
// Created by Matej on 14. 11. 2021.
//

#ifndef PPGSO_SUBMARINE_H
#define PPGSO_SUBMARINE_H

#include <ppgso/ppgso.h>
#include "Scene.h"
#include "Object.h"

class Submarine final : public Object {
private:
    std::list< std::unique_ptr<Object> > parts;

    float BASIC_ROTATION_X = 3*ppgso::PI/2;
    float BASIC_ROTATION_Y = ppgso::PI;
    float BASIC_ROTATION_Z = 0;

    int nightTimingFix = 0;

    float speed = 0.0f;
    float rot_speed = 0.04f;
    // Static resources (Shared between instances)
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;
    static std::unique_ptr<ppgso::Texture> texture;


public:
    Submarine(Scene &scene);

    bool update(Scene &scene, float dt) override;

    void render(Scene &scene) override;


private:


    bool checkCollisions(Scene &scene, float dt);
};


#endif
