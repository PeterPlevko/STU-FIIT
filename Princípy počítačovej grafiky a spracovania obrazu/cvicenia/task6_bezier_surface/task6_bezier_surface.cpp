// Task 6 - Generate a Bezier surface of variable density with UV coordinates.
//        - Confine the Bezier data and associated methods into a reusable class.
//        - Define a modelMatrix that uses position, rotation and scale.
//        - Render the generated mesh with texturing applied.
//        - Animate rotation.

#include <iostream>
#include <vector>

#define GLM_ENABLE_EXPERIMENTAL

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtx/euler_angles.hpp>
#include <glm/gtx/transform.hpp>

#include <ppgso/ppgso.h>

#include <shaders/texture_vert_glsl.h>
#include <shaders/texture_frag_glsl.h>

const unsigned int SIZE = 512;

// Object to represent Bezier patch
class BezierPatch {
private:
    // 3D vectors define points/vertices of the shape
    std::vector<glm::vec3> vertices;

    // Texture coordinates
    std::vector<glm::vec2> texCoords;

    // Define our face using indexes to 3 vertices
    struct face {
        GLuint v0, v1, v2;
    };

    // Define our mesh as collection of faces
    std::vector<face> mesh;

    // These will hold the data and object buffers
    GLuint vao, vbo, tbo, ibo;
    glm::mat4 modelMatrix{1.0f};

    glm::vec3 getPoint(glm::vec3 p1, glm::vec3 p2, float t) {
        glm::vec3 tmp = {p1.x - (p1.x - p2.x) * t, p1.y - (p1.y - p2.y) * t, p1.z - (p1.z - p2.z) * t};
        return tmp;
    }


    // Loop through all points, create n-1 new points that are in the middle or something
    glm::vec3 bezierRec(std::vector<glm::vec3> points, float t) {

        if (points.size() == 2) {
            return getPoint(points.at(0), points.at(1), t);
        }

        std::vector<glm::vec3> new_points;

        for (int i = 0; i < points.size() - 1; i ++) {
            new_points.emplace_back(getPoint(points.at(i), points.at(i+1), t));
        }

        return bezierRec(new_points, t);
    }

    glm::vec3 bezierPoint(const glm::vec3 controlPoints[4], float t) {
        // TODO: Compute 3D point on bezier curve
        std::vector<glm::vec3> points;

        points.emplace_back(controlPoints[0]);
        points.emplace_back(controlPoints[1]);
        points.emplace_back(controlPoints[2]);
        points.emplace_back(controlPoints[3]);

        return bezierRec(points, t);
//        return {};
    }

    ppgso::Shader program{texture_vert_glsl, texture_frag_glsl};
    ppgso::Texture texture{ppgso::image::loadBMP("lena.bmp")};
public:
    // Public attributes that define position, color ..
    glm::vec3 position{0, 0, 0};
    glm::vec3 rotation{0, 0, 0};
    glm::vec3 scale{1, 1, 1};

    BezierPatch(const glm::vec3 controlPoints[4][4]) {
        bezierPatch(controlPoints);
    }

    // Initialize object data buffers
    void bezierPatch(const glm::vec3 controlPoints[4][4]) {

        vertices = {};
        mesh = {};
        // Generate Bezier patch points and incidences
        unsigned int PATCH_SIZE = 10;
        for (unsigned int i = 0; i < PATCH_SIZE; i++) {

            float t = i * (1.f / PATCH_SIZE);
            glm::vec3 temp[4];
            for (unsigned int k = 0; k < 4; k++) {
                temp[k] = (bezierPoint(controlPoints[k], t));
            }

            for (unsigned int j = 0; j < PATCH_SIZE; j++) {
                // TODO: Compute points on the bezier patch
                // HINT: Compute u, v coordinates
                float t2 = j * (1.f / PATCH_SIZE);
                vertices.push_back(bezierPoint(temp, t2));
                texCoords.emplace_back(t, 1 - t2);
            }
        }
        // Generate indices
        for (unsigned int i = 1; i < PATCH_SIZE; i++) {
            for (unsigned int j = 1; j < PATCH_SIZE; j++) {
                // TODO: Compute indices for triangle 1
                face triangle1;
                triangle1.v0 = i + PATCH_SIZE * (j - 1);
                triangle1.v1 = (i - 1) + PATCH_SIZE * j;
                triangle1.v2 = (i - 1) + PATCH_SIZE * (j - 1);
                mesh.push_back(triangle1);

                // TODO: Compute indices for triangle 2
                face triangle2;
                triangle2.v0 = i + PATCH_SIZE * (j - 1);
                triangle2.v1 = (i - 1) + PATCH_SIZE * j;
                triangle2.v2 = i + PATCH_SIZE * j;
                mesh.push_back(triangle2);
            }
        }

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

        // Copy texture positions to gpu
        glGenBuffers(1, &tbo);
        glBindBuffer(GL_ARRAY_BUFFER, tbo);
        glBufferData(GL_ARRAY_BUFFER, texCoords.size() * sizeof(glm::vec2), texCoords.data(), GL_STATIC_DRAW);

        // Set vertex program inputs
        auto texCoord_attrib = program.getAttribLocation("TexCoord");
        glEnableVertexAttribArray(texCoord_attrib);
        glVertexAttribPointer(texCoord_attrib, 2, GL_FLOAT, GL_FALSE, 0, 0);

        // Copy indices to gpu
        glGenBuffers(1, &ibo);
        glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, ibo);
        glBufferData(GL_ELEMENT_ARRAY_BUFFER, mesh.size() * sizeof(face), mesh.data(), GL_STATIC_DRAW);

    };

    // Clean up
    ~BezierPatch() {
        // Delete data from OpenGL
        glDeleteBuffers(1, &ibo);
        glDeleteBuffers(1, &tbo);
        glDeleteBuffers(1, &vbo);
        glDeleteVertexArrays(1, &vao);
    }

    // Set the object transformation matrix
    void update() {
        // TODO: Compute transformation by scaling, rotating and then translating the shape
        modelMatrix = glm::mat4(1.f);
        modelMatrix = translate(modelMatrix, glm::vec3(0, 0, 0));
        modelMatrix = rotate(modelMatrix, rotation.x, glm::vec3(1, 0, 0));
        modelMatrix = rotate(modelMatrix, rotation.y, glm::vec3(0, 1, 0));
        modelMatrix = rotate(modelMatrix, rotation.z, glm::vec3(0, 0, 1));
        modelMatrix = translate(modelMatrix, position);
        modelMatrix = glm::scale(modelMatrix, scale);
    }

    // Draw polygons
    void render() {
        // Update transformation and color uniforms in the shader
        program.use();

        // Initialize projection
        // Create projection matrix (field of view (radians), aspect ratio, near plane distance, far plane distance)
        // You can think of this as the camera objective settings
        auto projection = glm::perspective((ppgso::PI / 180.f) * 60.0f, 1.0f, 0.1f, 10.0f);
        program.setUniform("ProjectionMatrix", projection);

        // Create view matrix (translate camera a bit backwards, so we can see the geometry)
        // This can be seen as the camera position/rotation in space
        auto view = glm::translate(glm::mat4{}, {0.0f, 0.0f, -3.0f});
        program.setUniform("ViewMatrix", view);

        // Set model position
        program.setUniform("ModelMatrix", modelMatrix);

        // Bind texture
        program.setUniform("Texture", texture);

        glBindVertexArray(vao);
        // TODO: Use correct rendering mode to draw the result
        glDrawElements(GL_TRIANGLES, (GLsizei) mesh.size() * 3, GL_UNSIGNED_INT, nullptr);
    };
};

class BezierSurfaceWindow : public ppgso::Window {
private:
    // Define 16 control points
//        glm::vec3 controlPoints[4][4]{
//            {{-1, 1,   0}, {-0.5, 1,   0}, {.5, 1,   0}, {1, 1,   0},},
//            {{-1, .5,  0}, {-0.5, .5,  1}, {.5, .5,  1}, {1, .5,  0},},
//            {{-1, -.5, 0}, {-0.5, -.5, 1}, {.5, -.5, 1}, {1, -.5, 0},},
//            {{-1, -1,  0}, {-0.5, -1,  0}, {.5, -1,  0}, {1, -1,  0},},
//    };
    glm::vec3 controlPoints[4][4] {
            {{-1, 1,   0}, {-0.3, 1,   0.5}, {0.3, 1,   0.5}, {1, 1,   0},},
            {{-1, .3,  0.5}, {-0.3, .3,  .5}, {.3, .3,  .5}, {1, .3,  0.5},},
            {{-1, -.3, 0.5}, {-0.3, -.3, .5}, {.3, -.3, .5}, {1, -.3, 0.5},},
            {{-1, -1,  0}, {-0.3, -1,  0.5}, {.3, -1,  0.5}, {1, -1,  0},},
    };

    BezierPatch bezier{controlPoints};
public:
    BezierSurfaceWindow() : Window{"task6_bezier_surface", SIZE, SIZE} {
        // Initialize OpenGL state
        // Enable Z-buffer
        glEnable(GL_DEPTH_TEST);
        glDepthFunc(GL_LEQUAL);
        //glPolygonMode( GL_FRONT_AND_BACK, GL_LINE );
    }

    void onIdle() final {
        // Set gray background
        glClearColor(.1f, .1f, .1f, 1.0f);

        // Clear depth and color buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Move and Render shape
        auto time = (float) glfwGetTime();

        controlPoints[1][1].z += sin(time) / 100;
        controlPoints[1][2].z += sin(time) / 100;
        controlPoints[2][1].z += sin(time) / 100;
        controlPoints[2][2].z += sin(time) / 100;

        bezier.bezierPatch(controlPoints);

        bezier.rotation = {-ppgso::PI/2, 0, time};
        bezier.position = {0, 0, sin(time)};
        bezier.update();
        bezier.render();
    }
};

int main() {
    // Create new window
    auto window = BezierSurfaceWindow{};

    // Main execution loop
    while (window.pollEvents()) {}

    return EXIT_SUCCESS;
}
