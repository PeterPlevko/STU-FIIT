#ifndef _PPGSO_SCENE_H
#define _PPGSO_SCENE_H

#include <memory>
#include <map>
#include <list>

#include "Object.h"
#include "Camera.h"
#include "Submarine.h"

/*
 * Scene is an object that will aggregate all scene related data
 * Objects are stored in a list of objects
 * Keyboard and Mouse states are stored in a map and struct
 */
class Scene {
  public:
    /*!
     * Update all objects in the scene
     * @param time
     */
    void update(float time);

    /*!
     * Render all objects in the scene
     */
    void render();

    /*!
     * Pick objects using a ray
     * @param position - Position in the scene to pick object from
     * @param direction - Direction to pick objects from
     * @return Objects - Vector of pointers to intersected objects
     */
    std::vector<Object*> intersect(const glm::vec3 &position, const glm::vec3 &direction);

    // Camera object
    std::unique_ptr<Camera> camera;

    // All objects to be rendered in scene
    std::list< std::unique_ptr<Object> > objects;

    glm::vec3 waterCurrent = {0,0,0};

    int imgHeight;
    int imgWidth;
    unsigned char* heightFramebuffer;

    // Keyboard state
    std::map< int, int > keyboard;

    // Lights, in this case using only simple directional diffuse lighting
    glm::vec3 lightDirection{-1.0f, -1.0f, -1.0f};
    bool global_lighting_on = true;

    struct Lights {
        int count;
        glm::vec3 positions[100];
        glm::vec3 colors[100];
        float ranges[100];
        float strengths[100];
    };

    Lights lights;

    int cave_lights = 15;

    // Store cursor state
    struct {
      double x, y;
      bool left, right;
    } cursor;

    void setTargetPosition(const glm::vec3 &position, const glm::vec3 &rotation);

    float getHeight(float x, float y);
};

#endif // _PPGSO_SCENE_H
