// Task 5 - Draw a 2D shape using polygons and animate it
//        - Encapsulate the shape using a class
//        - Use color_vert/frag shader to display the polygon
//        - Animate the object position, rotation and scale.

#include <iostream>
#include <utility>
#include <vector>

#define GLM_ENABLE_EXPERIMENTAL

#include <glm/glm.hpp>
#include <glm/gtx/matrix_transform_2d.hpp>
#include <glm/gtx/euler_angles.hpp>
#include <ppgso/ppgso.h>

#include <shaders/color_vert_glsl.h>
#include <shaders/color_frag_glsl.h>

const unsigned int SIZE = 512;

// Object to represent 2D OpenGL shape
class Shape {
private:
    // 2D vectors define points/vertices of the shape
    std::vector<glm::vec3> vertices = {
            {0, 0, 0},
            {0.01, 0.05, 0},
            {0.01, 0.4, 0},
            {0.04, 0.385, 0},
            {0.02, 0.42, 0},
            {0, 0.5, 0},
            {-0.02, 0.42, 0},
            {-0.04, 0.385, 0},
            {-0.01, 0.4, 0},
            {-0.01, 0.05, 0},
    };

    // Structure representing a triangular face, usually indexes into vertices
    struct Face {
        int a, b, c;
    };

    // Indices define triangles that index into vertices
    std::vector<Face> mesh = {
            {0, 1, 2},
            {2, 3, 4},
            {2, 4, 5},
            {2, 5, 0},
            {5, 6, 8},
            {6, 7, 8},
            {5, 8, 0},
            {8, 9, 0},
    };

    // Program to associate with the object
    ppgso::Shader program = {color_vert_glsl, color_frag_glsl};

    // These will hold the data and object buffers
    GLuint vao, vbo, cbo, ibo;
    glm::mat4 modelMatrix{1.0f};
public:

    void Setup(std::vector<glm::vec3> new_vert, std::vector<Face> new_mesh) {
        vertices = new_vert;
        mesh = new_mesh;
    }

    // Public attributes that define position, color ..
    glm::vec3 position{0, 0, 0};
    glm::vec3 rotation{0, 0, 0};
    glm::vec3 scale{1, 1, 1};
    glm::vec3 color{1, 0, 0};

    // Initialize object data buffers
    Shape() {
        // Copy data to OpenGL
        glGenVertexArrays(1, &vao);
        glBindVertexArray(vao);

        // Copy positions to gpu
        glGenBuffers(1, &vbo);
        glBindBuffer(GL_ARRAY_BUFFER, vbo);
        glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(glm::vec3), vertices.data(), GL_STATIC_DRAW);

        // Set vertex program inputs
        auto position_attrib = program.getAttribLocation("Position");
        glEnableVertexAttribArray(position_attrib);
        glVertexAttribPointer(position_attrib, 3, GL_FLOAT, GL_FALSE, 0, 0);

        // Copy mesh indices to gpu
        glGenBuffers(1, &ibo);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ibo);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, mesh.size() * sizeof(Face), mesh.data(), GL_STATIC_DRAW);

        // Set projection matrices to identity
        program.setUniform("ProjectionMatrix", glm::mat4{1.0f});
        program.setUniform("ViewMatrix", glm::mat4{1.0f});
    };

    // Clean up
    ~Shape() {
        // Delete data from OpenGL
        glDeleteBuffers(1, &ibo);
        glDeleteBuffers(1, &cbo);
        glDeleteBuffers(1, &vbo);
        glDeleteVertexArrays(1, &vao);
    }

    // Set the object transformation matrix
    void update() {
        modelMatrix = glm::mat4(1);
        modelMatrix = glm::translate(modelMatrix, position);
        modelMatrix = glm::rotate(modelMatrix, rotation.x,  glm::vec3(1, 0, 0));
        modelMatrix = glm::rotate(modelMatrix, rotation.y,  glm::vec3(0, 1, 0));
        modelMatrix = glm::rotate(modelMatrix, rotation.z,  glm::vec3(0, 0, 1));
        modelMatrix = glm::scale(modelMatrix, scale);
    }

    // Draw polygons
    void render() {
        // Update transformation and color uniforms in the shader
        program.use();
        program.setUniform("OverallColor", color);
        program.setUniform("ModelMatrix", modelMatrix);

        glBindVertexArray(vao);
        glDrawElements(GL_TRIANGLES, (GLsizei) mesh.size() * 3, GL_UNSIGNED_INT, 0);
    };
};

class ShapeWindow : public ppgso::Window {
private:
    Shape shape1, shape2, shape3;
public:
    ShapeWindow() : Window{"task4_2dshapes", SIZE, SIZE} {
        shape1.color = {1, 0, 0};
        shape2.color = {0, 1, 0};
        shape3.color = {0, 0, 1};
    }

    void Setup() {
//        shape1.Setup({
//                 {0, 0, 0},
//                 {0.01, 0.05, 0},
//                 {0.01, 0.4, 0},
//                 {0.04, 0.385, 0},
//                 {0.02, 0.42, 0},
//                 {0, 0.5, 0},
//                 {-0.02, 0.42, 0},
//                 {-0.04, 0.385, 0},
//                 {-0.01, 0.4, 0},
//                 {-0.01, 0.05, 0},
//         }, {
//                 {0, 1, 2},
//                 {2, 3, 4},
//                 {2, 4, 5},
//                 {2, 5, 0},
//                 {5, 6, 8},
//                 {6, 7, 8},
//                 {5, 8, 0},
//                 {8, 9, 0},
//         });
//
//        shape2.Setup({
//                 {0, 0, 0},
//                 {0.01, 0.05, 0},
//                 {0.01, 0.4, 0},
//                 {0.04, 0.385, 0},
//                 {0.02, 0.42, 0},
//                 {0, 0.5, 0},
//                 {-0.02, 0.42, 0},
//                 {-0.04, 0.385, 0},
//                 {-0.01, 0.4, 0},
//                 {-0.01, 0.05, 0},
//         }, {
//                 {0, 1, 2},
//                 {2, 3, 4},
//                 {2, 4, 5},
//                 {2, 5, 0},
//                 {5, 6, 8},
//                 {6, 7, 8},
//                 {5, 8, 0},
//                 {8, 9, 0},
//         });
//
//        shape3.Setup({
//                             {-0.1, -0.1, 0},
//                             {0.1, -0.1, 0},
//                             {0.1, 0, 0},
//                             {0.15, 0.025, 0},
//                             {0.1, 0.05, 0},
//                             {0.1, 0.1, 0},
//                             {-0.1, 0.1, 0},
//                     }, {
//                             {0, 1, 2},
//                             {2, 3, 4},
//                             {4, 5, 6},
//                             {6, 0, 2},
//                             {2, 4, 6},
//                     });
    }

    void onIdle() {
        // Set gray background
        glClearColor(.1f, .1f, .1f, 1.0f);
        // Clear depth and color buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Move and Render shape\    // Get time for animation
        auto delta_t = (float) glfwGetTime();

        // Manipulate rotation of the shape
        shape1.rotation.z = - delta_t * 0.4f;
        shape2.rotation.z = - delta_t * 0.05f;

        shape3.scale.y = abs(sin(delta_t)) * 0.5;
        shape3.position.x = sin(delta_t) * 0.2;

        // Update and render each shape
        shape1.update();
        shape2.update();
        shape3.update();

        shape1.render();
        shape2.render();
        shape3.render();
    }
};

int main() {
    // Create our window
    auto window = ShapeWindow{};
    window.Setup();

    // Main execution loop
    while (window.pollEvents()) {}

    return EXIT_SUCCESS;
}
