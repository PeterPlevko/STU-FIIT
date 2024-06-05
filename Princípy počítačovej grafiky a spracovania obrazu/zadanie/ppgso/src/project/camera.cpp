#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>

#include "Camera.h"
#include <glm/gtx/euler_angles.hpp>

Camera::Camera() {

    float fow = 90.0f, ratio = 1.9001f, near = 0.0001f, far = 10000.0f;

    projectionMatrix = glm::perspective((ppgso::PI / 180.0f) * fow, ratio, near, far);

    position = positionOffset = {0, distanceY, -distanceZ};
}

void Camera::update() {
    if (mode == MOVING) {
        if (t < 900) {
            t++;
            auto result = glm::lerp(startPos, destPos, t / 900.0f);
            position.x = result.x;
            position.y = result.y;
            position.z = result.z;
            auto result1 = glm::lerp(startPosLookAt, destPosLookAt, t / 900.0f);
            submarinePos.x = result1.x;
            submarinePos.y = result1.y;
            submarinePos.z = result1.z;
        }
    }
    viewMatrix = glm::lookAt(position, submarinePos + offset, up);
}

void Camera::moveTo(const glm::vec3 &pos, const glm::vec3 &rot) {
    if (mode == FOLLOW) {
        if (firstFollow) {
            firstFollow = false;
            submarinePos = pos;
            positionOffset = {0, distanceY, -distanceZ};
            position = submarinePos + positionOffset;
            rotation = {0, 0, 0};
        }
        auto deltaPos = submarinePos - pos;
        submarinePos = pos;

        glm::vec3 deltaRot;
        deltaRot.x = (distanceZ * sin(rotation.y * -1)) - (distanceZ * sin(rot.y * -1));
        deltaRot.z = (distanceZ * -cos(rotation.y * -1)) - (distanceZ * -cos(rot.y * -1));

        rotation = rot;

        position -= deltaRot;
        position -= deltaPos;
    } else {
        firstFollow = true;
    }
}