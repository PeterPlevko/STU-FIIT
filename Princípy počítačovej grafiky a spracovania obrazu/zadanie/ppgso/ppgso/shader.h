#pragma once
#include <string>
#include <memory>

#include <GL/glew.h>
#include <glm/glm.hpp>

#include "texture.h"

namespace ppgso {

  class Shader {
  public:

    /*!
     * Compile and manage an GLSL program and its inputs.
     *
     * @param vertex_shader_code - String containing the source of the vertex shader.
     * @param fragment_shader_code - String containing the source of the fragment shader.
     */
    Shader(const std::string &vertex_shader_code, const std::string &fragment_shader_code);

    ~Shader();

    /*!
     * Set up the program for use in OpenGL state.
     */
    void use() const;

    /*!
     * Get OpenGL attribute location for for the input specified by "name"
     *
     * @param name - Name of the shader program input variable.
     * @return - OpenGL attribute location number.
     */
    GLuint getAttribLocation(const std::string &name) const;

    /*!
     * Get OpenGL uniform location for for the input specified by "name"
     *
     * @param name - Name of the shader program input variable.
     * @return - OpenGL attribute location number.
     */
    GLuint getUniformLocation(const std::string &name) const;

    /*!
     * Get OpenGL program identifier number.
     *
     * @return - OpenGL program identifer number.
     */
    GLuint getProgram() const;

    /*!
     * Set a floating point value as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param value - Value to set input to.
     */
    void setUniform(const std::string &name, float value) const;

    void setUniform(const std::string &name, int value) const;

    /*!
     * Set a vector as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param vector - Vector to set input to.
     */
    void setUniform(const std::string &name, glm::vec2 vector) const;

    /*!
     * Set a vector as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param vector - Vector to set input to.
     */
    void setUniform(const std::string &name, glm::vec3 vector) const;

    /*!
     * Set a vector as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param vector - Vector to set input to.
     */
    void setUniform(const std::string &name, glm::vec4 vector) const;

    /*!
     * Set texture as an input for the shader program variable "name"
     * OpenGL texture id needs to be set when dealing with multiple textures.
     *
     * @param name - Name of the shader program uniform input variable.
     * @param texture - Texture to set input to.task6_bezier_surface
     * @param id - Texture ID to use when multi-texturing (0 is default).
     */
    void setUniform(const std::string &name, const Texture &texture, const int id = 0) const;

    /*!
     * Set matrix as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param matrix - Matrix to set input to.
     */
    void setUniform(const std::string &name, glm::mat4 matrix) const;

    /*!
     * Set matrix as an input for the shader program variable "name"
     *
     * @param name - Name of the shader program uniform input variable.
     * @param matrix - Matrix to set input to.
     */
    void setUniform(const std::string &name, glm::mat3 matrix) const;

  private:
    GLuint program;
  };

}

