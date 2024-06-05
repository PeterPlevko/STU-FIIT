#include "Scene.h"

void Scene::update(float time) {
  // Use iterator to update all objects so we can remove while iterating
  auto i = std::begin(objects);

  while (i != std::end(objects)) {
    // Update and remove from list if needed
    auto obj = i->get();
    if (!obj->update(*this, time))
      i = objects.erase(i); // NOTE: no need to call destructors as we store shared pointers in the scene
    else
      ++i;
  }

    camera->update();
}

void Scene::render() {
  // Simply render all objects
  for ( auto& obj : objects )
    obj->render(*this);
}

void Scene::setTargetPosition(const glm::vec3 &position, const glm::vec3 &rotation) {
    camera->moveTo(position, rotation);
}

float Scene::getHeight(float x, float z) {
    //invert
    x = x * 10;
    z = z * 10;
    int j = (x + 539.7) *  3.7947001;
    int i = (-1*z + 614.7) * 3.7947001;

    if (j < 0)
        j = 0;
    if (i < 0)
        i = 0;
    if (j > imgWidth - 1)
        j = imgWidth - 1;
    if (i > imgHeight - 1)
        i = imgHeight - 1;

    float color =  heightFramebuffer[3 * (i * imgWidth + j)] + heightFramebuffer[3 * (i * imgWidth + j) + 1] + heightFramebuffer[3 * (i * imgWidth + j) + 2];
    return ((color) * 0.3310595- 75.6565)/10;
}

std::vector<Object*> Scene::intersect(const glm::vec3 &position, const glm::vec3 &direction) {
  std::vector<Object*> intersected = {};
  for(auto& object : objects) {
    // Collision with sphere of size object->scale.x
    auto oc = position - object->position;
    auto radius = object->scale.x;
    auto a = glm::dot(direction, direction);
    auto b = glm::dot(oc, direction);
    auto c = glm::dot(oc, oc) - radius * radius;
    auto dis = b * b - a * c;

    if (dis > 0) {
      auto e = sqrt(dis);
      auto t = (-b - e) / a;

      if ( t > 0 ) {
        intersected.push_back(object.get());
        continue;
      }

      t = (-b + e) / a;

      if ( t > 0 ) {
        intersected.push_back(object.get());
        continue;
      }
    }
  }

  return intersected;
}
