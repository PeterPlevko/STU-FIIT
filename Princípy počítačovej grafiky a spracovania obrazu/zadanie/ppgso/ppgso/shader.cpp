#include <iostream>
#include <sstream>

#include <GL/glew.h>
#include <glm/glm.hpp>
#include <glm/gtc/type_ptr.hpp>

#include "texture.h"
#include "shader.h"


ppgso::Shader::Shader(const std::string &vertex_shader_code, const std::string &fragment_shader_code) {
  // Create shaders
  auto vertex_shader_id = glCreateShader(GL_VERTEX_SHADER);
  auto fragment_shader_id = glCreateShader(GL_FRAGMENT_SHADER);
  auto result = GL_FALSE;
  auto info_length = 0;

  // Compile vertex shader
  auto vertex_shader_code_ptr = vertex_shader_code.c_str();
  glShaderSource(vertex_shader_id, 1, &vertex_shader_code_ptr, nullptr);
  glCompileShader(vertex_shader_id);

  // Check vertex shader log
  glGetShaderiv(vertex_shader_id, GL_COMPILE_STATUS, &result);
  if (result == GL_FALSE) {
    glGetShaderiv(vertex_shader_id, GL_INFO_LOG_LENGTH, &info_length);
    std::string vertex_shader_log((unsigned int) info_length, ' ');
    glGetShaderInfoLog(vertex_shader_id, info_length, nullptr,
                       &vertex_shader_log[0]);
    std::stringstream msg;
    msg << "Error Compiling Vertex Shader ..." << std::endl;
    msg << vertex_shader_log;
    throw std::runtime_error(msg.str());
  }

  // Compile fragment shader
  auto fragment_shader_code_ptr = fragment_shader_code.c_str();
  glShaderSource(fragment_shader_id, 1, &fragment_shader_code_ptr, nullptr);
  glCompileShader(fragment_shader_id);

  // Check fragment shader log
  glGetShaderiv(fragment_shader_id, GL_COMPILE_STATUS, &result);
  if (result == GL_FALSE) {
    glGetShaderiv(fragment_shader_id, GL_INFO_LOG_LENGTH, &info_length);
    std::string fragment_shader_log((unsigned long) info_length, ' ');
    glGetShaderInfoLog(fragment_shader_id, info_length, nullptr,
                       &fragment_shader_log[0]);
    std::stringstream msg;
    msg << "Error Compiling Fragment Shader ..." << std::endl;
    msg << fragment_shader_log << std::endl;
    throw std::runtime_error(msg.str());
  }

  // Create and link the program
  auto program_id = glCreateProgram();
  glAttachShader(program_id, vertex_shader_id);
  glAttachShader(program_id, fragment_shader_id);
  glBindFragDataLocation(program_id, 0, "FragmentColor");
  glLinkProgram(program_id);

  // Check program log
  glGetProgramiv(program_id, GL_LINK_STATUS, &result);
  if (result == GL_FALSE) {
    glGetProgramiv(program_id, GL_INFO_LOG_LENGTH, &info_length);
    std::string program_log((unsigned long) info_length, ' ');
    glGetProgramInfoLog(program_id, info_length, nullptr, &program_log[0]);
    std::stringstream msg;
    msg << "Error Linking Shader Program ..." << std::endl;
    msg << program_log;
    throw std::runtime_error(msg.str());
  }
  glDeleteShader(vertex_shader_id);
  glDeleteShader(fragment_shader_id);

  program = program_id;
  use();
}

ppgso::Shader::~Shader() {
  glDeleteProgram( program );
}

void ppgso::Shader::use() const {
  glUseProgram(program);
}

GLuint ppgso::Shader::getAttribLocation(const std::string &name) const {
  use();
  return (GLuint) glGetAttribLocation(program, name.c_str());
}

GLuint ppgso::Shader::getUniformLocation(const std::string &name) const {
  use();
  return (GLuint) glGetUniformLocation(program, name.c_str());
}

void ppgso::Shader::setUniform(const std::string &name, const Texture &texture, const int id) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniform1i(uniform, id);
  texture.bind(id);
}

void ppgso::Shader::setUniform(const std::string &name, glm::mat4 matrix) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniformMatrix4fv(uniform, 1, GL_FALSE, value_ptr(matrix));
}

void ppgso::Shader::setUniform(const std::string &name, glm::mat3 matrix) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniformMatrix3fv(uniform, 1, GL_FALSE, value_ptr(matrix));
}

void ppgso::Shader::setUniform(const std::string &name, float value) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniform1f(uniform, value);
}

void ppgso::Shader::setUniform(const std::string &name, int value) const {
    use();
    auto uniform = getUniformLocation(name.c_str());
    glUniform1i(uniform, value);
}

GLuint ppgso::Shader::getProgram() const {
  return program;
}

void ppgso::Shader::setUniform(const std::string &name, glm::vec2 vector) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniform2fv(uniform, 1, value_ptr(vector));
}

void ppgso::Shader::setUniform(const std::string &name, glm::vec3 vector) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniform3fv(uniform, 1, value_ptr(vector));
}

void ppgso::Shader::setUniform(const std::string &name, glm::vec4 vector) const {
  use();
  auto uniform = getUniformLocation(name.c_str());
  glUniform4fv(uniform, 1, value_ptr(vector));
}
