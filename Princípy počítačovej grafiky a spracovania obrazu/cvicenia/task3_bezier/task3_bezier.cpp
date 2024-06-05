// Task 4 - Render the letter R using OpenGL
//        - Implement a function to generate bezier curve points
//        - Generate multiple points on each bezier curve
//        - Draw lines connecting the generated points using OpenGL

#include <iostream>
#include <vector>

#include <ppgso/ppgso.h>

#include <shaders/color_vert_glsl.h>
#include <shaders/color_frag_glsl.h>

const unsigned int SIZE = 512;

class BezierWindow : public ppgso::Window {
private:

    // Control points for the bezier curves
    // First curve is 4 control points
    // Rest of the curves are 3 control points, each reusing the last curve end
    // Defines the letter "R"
//    std::vector<glm::vec2> controlPoints = {
//            {0,  -1},
//            {0,  -.3},
//            {0,  .3},
//            {0,  1},
//            {.3, 1},
//            {.5, 1},
//            {.5, .5},
//            {.5, 0},
//            {.3, 0},
//            {0,  0},
//            {.3, -.3},
//            {.5, -.5},
//            {.5, -1},
//    };

    std::vector<glm::vec2> controlPoints = {
            {25, 28},
            {24, 24},
            {62, 11},
            {63, 27},
            {70, 17},
            {82, 23},
            {72, 33},
            {94, 31},
            {95, 61},
            {76, 62},
            {88, 76},
            {61, 90},
            {51, 73},
            {49, 86},
            {20, 78},
            {25, 68},
            {4, 70},
            {2, 49},
            {20, 48},
            {4, 42},
            {14, 22},
            {25, 28}
    };

//    std::vector<glm::vec2> controlPoints = {
//            {-0.5, 0},
//            {-0.5, 0.5},
//            {0.5, 0.5},
//            {0.5, 0}
//    };

    // This will hold the bezier curve geometry once we generate it
    std::vector<glm::vec3> points;

    // GLSL Program to use for rendering
    ppgso::Shader program = {color_vert_glsl, color_frag_glsl};

    // These numbers are used to pass buffer data to OpenGL
    GLuint vao = 0, vbo = 0;

    std::vector<glm::vec2> normalize(std::vector<glm::vec2> points) {

        std::vector<glm::vec2> new_points;

        for (int i = 0; i < points.size(); i++) {
            new_points.emplace_back(((float) points.at(i).x - 50) / 50, ((float) points.at(i).y - 50) / 50);
        }

        return new_points;
    }


    glm::vec2 getPoint(glm::vec2 p1, glm::vec2 p2, float t) {
        glm::vec2 tmp = {p1.x - (p1.x - p2.x) * t, p1.y - (p1.y - p2.y) * t};
        return tmp;
    }


    // Loop through all points, create n-1 new points that are in the middle or something
    glm::vec2 bezierRec(std::vector<glm::vec2> points, float t) {

        if (points.size() == 2) {
            return getPoint(points.at(0), points.at(1), t);
        }

        std::vector<glm::vec2> new_points;

        for (int i = 0; i < points.size() - 1; i ++) {
            new_points.emplace_back(getPoint(points.at(i), points.at(i+1), t));
        }

        return bezierRec(new_points, t);
    }


    // Compute points for Bezier curve using 4 control points
    // before glm::vec2 bezierPoint(const glm::vec2 &p0, const glm::vec2 &p1, const glm::vec2 &p2, const glm::vec2 &p3, const float t) {
    glm::vec2 bezierPoint(const glm::vec2 p0, const glm::vec2 p1, const glm::vec2 p2, const glm::vec2 p3, const float t) {

        std::vector<glm::vec2> points;

        points.emplace_back(p0);
        points.emplace_back(p1);
        points.emplace_back(p2);
        points.emplace_back(p3);

        return bezierRec(points, t);
    }

    // Compute points for a sequence of Bezier curves defined by a vector of control points
    // Each bezier curve will reuse the end point of the previous curve
    // count - Number of points to generate on each curve
    void bezierShape(int count) {
        controlPoints = normalize(controlPoints);

        for (int i = 1; i < (int) controlPoints.size(); i += 3) {
            for (int j = 0; j <= count; j++) {
                // TODO: Generate points for each Bezier curve and insert them
                glm::vec2 point = bezierPoint(controlPoints.at(i-1), controlPoints.at(i), controlPoints.at(i+1), controlPoints.at(i+2), (float) j / (float) count);
                points.emplace_back(point, 0);
            }
        }
    }

public:
    BezierWindow() : Window{"task3_bezier", SIZE, SIZE} {
        // Generate Bezier curve points
        bezierShape(15);

        // Generate a vertex array object
        // This keeps track of what attributes are associated with buffers
        glGenVertexArrays(1, &vao);
        glBindVertexArray(vao);

        // Generate a vertex buffer object, this will feed data to the vertex shader
        glGenBuffers(1, &vbo);
        glBindBuffer(GL_ARRAY_BUFFER, vbo);

        // TODO: Pass the control points to the GPU
        glBufferData(GL_ARRAY_BUFFER, points.size() * sizeof(glm::vec3), points.data(), GL_STATIC_DRAW);

        // Setup vertex array lookup, this tells the shader how to pick data for the "Position" input
        auto position_attrib = program.getAttribLocation("Position");
        glVertexAttribPointer(position_attrib, 3, GL_FLOAT, GL_FALSE, 0, nullptr);
        glEnableVertexAttribArray(position_attrib);

        // Set model matrix to identity
        program.setUniform("ModelMatrix", glm::mat4{});
        program.setUniform("ViewMatrix", glm::mat4{});
        program.setUniform("ProjectionMatrix", glm::mat4{});

        // Set the color uniform
        program.setUniform("OverallColor", glm::vec3{1.0f, 1.0f, 1.0f});
    }

    ~BezierWindow() final {
        glDeleteBuffers(1, &vbo);
        glDeleteVertexArrays(1, &vao);
    }

    void onIdle() final {
        // Set gray background
        glClearColor(0.5f, 0.5f, 0.5f, 0);

        // Clear depth and color buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Draw shape
        glBindVertexArray(vao);

        // TODO: Define the correct render mode
        glDrawArrays(GL_LINE_STRIP, 0, (GLsizei) points.size());
    }
};

int main() {
    // Create our window
    BezierWindow window;

    // Main execution loop
    while (window.pollEvents()) {}

    return EXIT_SUCCESS;
}
