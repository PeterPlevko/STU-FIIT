#pragma once

#include <memory>

#include <glm/glm.hpp>
#include <ppgso/ppgso.h>

/*!
 * Simple camera object that keeps track of viewMatrix and projectionMatrix
 * the projectionMatrix is by default constructed as perspective projection
 * the viewMatrix is generated from up, position and back vectors on update
 */
class Camera {
public:
    enum MODE { FOLLOW, STATIONARY, MOVING };
    MODE mode = FOLLOW;

    bool firstFollow = true;

    glm::vec3 position{0, 0, 0};
    glm::vec3 positionOffset{0, 0, 0};
    glm::vec3 offset{0, 2.5, 0};
    glm::vec3 rotation{0, 0, 0};

    glm::vec3 startPos;
    glm::vec3 destPos;
    glm::vec3 startPosLookAt;
    glm::vec3 destPosLookAt;
    float t;

    float distanceY = 2;
    float distanceZ = 5;

    glm::vec3 submarinePos;

    glm::vec3 up{0, 1, 0};

    glm::mat4 viewMatrix;
    glm::mat4 projectionMatrix;

    /*!
     * Create new Camera that will generate viewMatrix and projectionMatrix based on its position, up and back vectors
     * @param fow - Field of view in degrees
     * @param ratio - Viewport screen ratio (usually width/height of the render window)
     * @param near - Distance to the near frustum plane
     * @param far - Distance to the far frustum plane
     */
    Camera();

    /*!
     * Update Camera viewMatrix based on up, position and back vectors
     */
    void update();

    void moveTo(const glm::vec3 &pos, const glm::vec3 &rot);

};

