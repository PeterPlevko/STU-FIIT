#pragma once
#define GLM_ENABLE_EXPERIMENTAL
#include <glm/glm.hpp>
#include <glm/gtc/random.hpp>
#include <glm/gtx/compatibility.hpp>

#include "mesh.h"
#include "shader.h"
#include "image.h"
#include "image_bmp.h"
#include "image_raw.h"
#include "texture.h"
#include "window.h"

namespace ppgso {
  /*!
   * PI constant as defined in glm for float.
   */
  const float PI = glm::pi<float>();
}

