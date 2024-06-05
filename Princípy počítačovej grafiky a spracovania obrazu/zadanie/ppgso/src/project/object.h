#pragma once

#include <memory>
#include <list>
#include <map>

#include <glm/glm.hpp>

// Forward declare a scene
class Scene;

/*!
 *  Abstract scene object interface
 *  All objects in the scene should be able to update and render
 *  Generally we also want to keep position, rotation and scale for each object to generate a modelMatrix
 */
class Object {
public:
    // Define default constructors as this is an abstract class
    Object() = default;

    Object(const Object &) = default;

    Object(Object &&) = default;

    virtual ~Object() {};

    /*!
     * Update Object parameters, usually used to update the modelMatrix based on position, scale and rotation
     *
     * @param scene - Reference to the Scene the object is rendered in
     * @param dt - Time delta for animation purposes
     * @return true to delete the object
     */
    virtual bool update(Scene &scene, float dt) = 0;

    /*!
     * Render the object in the scene
     * @param scene
     */
    virtual void render(Scene &scene) = 0;


    /*!
     * Event to be called when the object is clicked
     * @param scene
     */
    virtual void onClick(Scene &scene) {};

    // Object properties
    glm::vec3 position{0, 0, 0};
    glm::vec3 rotation{0, 0, 0};
    glm::vec3 scale{1, 1, 1};
    glm::mat4 modelMatrix{1};

protected:
    /*!
     * Generate modelMatrix from position, rotation and scale
     */
    void generateModelMatrix();
};

