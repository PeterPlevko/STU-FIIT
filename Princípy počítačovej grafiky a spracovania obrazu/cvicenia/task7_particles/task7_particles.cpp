// Task 7 - Dynamically generate objects in a 3D scene
//        - Implement a particle system where particles have position and speed
//        - Any object can be a generator and can add objects to the scene
//        - Create dynamic effect such as fireworks, rain etc.
//        - Encapsulate camera in a class

#include <iostream>
#include <vector>
#include <map>
#include <list>

#define GLM_ENABLE_EXPERIMENTAL

#include <glm/glm.hpp>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtx/euler_angles.hpp>
#include <glm/gtx/transform.hpp>

#include <ppgso/ppgso.h>

#include <shaders/color_vert_glsl.h>
#include <shaders/color_frag_glsl.h>

const unsigned int SIZE = 512;

class Camera {
public:
    // TODO: Add parameters
    glm::vec3 camPosition{5, 5, 5};
    glm::vec3 look_at{0, 0, 0};

    glm::mat4 viewMatrix;
    glm::mat4 projectionMatrix;

    /// Representaiton of
    /// \param fov - Field of view (in degrees)
    /// \param ratio - Viewport ratio (width/height)
    /// \param near - Distance of the near clipping plane
    /// \param far - Distance of the far clipping plane
   Camera(float fov = 45.0f, float ratio = 2.0f, float near = 0.0001f, float far = 1000.0f) {
        // TODO: Initialize perspective projection (hint: glm::perspective)
        projectionMatrix = glm::perspective((ppgso::PI) * fov / 180.0f, ratio, near, far);
        update();
    }

    /// Recalculate viewMatrix from position, rotation and scale
    void update() {
        // TODO: Update viewMatrix (hint: glm::lookAt)
        viewMatrix = glm::lookAt(camPosition, look_at, {0, 0, 1});
    }
};

/// Abstract renderable object interface
class Renderable; // Forward declaration for Scene
using Scene = std::list<std::unique_ptr<Renderable>>; // Type alias

class Renderable {
public:
    // Virtual destructor is needed for abstract interfaces
    virtual ~Renderable() = default;

    /// Render the object
    /// \param camera - Camera to use for rendering
    virtual void render(const Camera &camera) = 0;

    /// Update the object. Useful for specifing animation and behaviour.
    /// \param dTime - Time delta
    /// \param scene - Scene reference
    /// \return - Return true to keep object in scene
    virtual bool update(float dTime, Scene &scene) = 0;

    virtual std::pair<bool, glm::vec3> is_skull() = 0;
};

/// Basic particle that will render a sphere
/// TODO: Implement Renderable particle
class Skull_Particle final : public Renderable {
    // Static resources shared between all particles
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;

    // TODO: add more parameters as needed
    glm::vec3 speed;
    glm::vec3 color = {1, 0.8 ,0.6};
    glm::vec3 rotation;
    glm::vec3 scale;
    glm::mat4 modelMatrix;
    float alive;

public:

    glm::vec3 position;

    /// Construct a new Particle
    /// \param p - Initial position
    /// \param s - Initial speed
    /// \param c - Color of particle
    Skull_Particle(glm::vec3 p, glm::vec3 s, glm::vec3 c, glm::vec3 r) {
        // First particle will initialize resources
        if (!shader) shader = std::make_unique<ppgso::Shader>(color_vert_glsl, color_frag_glsl);
        if (!mesh) mesh = std::make_unique<ppgso::Mesh>("skull.obj");

        position = p;
        speed = s;
        scale = c;
        rotation = r;
        alive = 10;
    }

    bool update(float dTime, Scene &scene) override {
        // TODO: Animate position using speed and dTime.
        // - Return true to keep the object alive
        // - Returning false removes the object from the scene
        // - hint: you can add more particles to the scene here also

        alive -= dTime;

        if (alive < 0) {
            return false;
        }

        position += speed * dTime;
        modelMatrix = glm::mat4(1.f);
        modelMatrix = glm::scale(modelMatrix, scale);
        modelMatrix = translate(modelMatrix, position);
        modelMatrix = rotate(modelMatrix, rotation.x, glm::vec3(1, 0, 0));
        modelMatrix = rotate(modelMatrix, rotation.y, glm::vec3(0, 1, 0));
        modelMatrix = rotate(modelMatrix, rotation.z, glm::vec3(0, 0, 1));

        return true;
    }

    void render(const Camera &camera) override {
        // TODO: Render the object
        // - Use the shader
        // - Setup all needed shader inputs
        // - hint: use OverallColor in the color_vert_glsl shader for color
        // - Render the mesh
        shader->use();
        shader->setUniform("ProjectionMatrix", camera.projectionMatrix);
        shader->setUniform("ViewMatrix", camera.viewMatrix);
        shader->setUniform("ModelMatrix", modelMatrix);
        shader->setUniform("OverallColor", color);
        mesh->render();
    }

    std::pair <bool, glm::vec3> is_skull() override {

        std::pair <bool, glm::vec3> values;
        values.first = true;
        values.second = position;
        return values;
    }
};

class Covid_Particle final : public Renderable {
    // Static resources shared between all particles
    static std::unique_ptr<ppgso::Mesh> mesh;
    static std::unique_ptr<ppgso::Shader> shader;

    // TODO: add more parameters as needed
    glm::vec3 position;
    glm::vec3 speed;
    glm::vec3 color = {0, 1 ,0};
    glm::vec3 rotation;
    glm::vec3 scale;
    glm::mat4 modelMatrix;
    float alive;

public:
    /// Construct a new Particle
    /// \param p - Initial position
    /// \param s - Initial speed
    /// \param c - Color of particle
    Covid_Particle(glm::vec3 p, glm::vec3 s, glm::vec3 c, glm::vec3 r) {
        // First particle will initialize resources
        if (!shader) shader = std::make_unique<ppgso::Shader>(color_vert_glsl, color_frag_glsl);
        if (!mesh) mesh = std::make_unique<ppgso::Mesh>("covid.obj");

        position = p;
        speed = s;
        scale = c;
        rotation = r;
        alive = 3;
    }

    bool update(float dTime, Scene &scene) override {
        // TODO: Animate position using speed and dTime.
        // - Return true to keep the object alive
        // - Returning false removes the object from the scene
        // - hint: you can add more particles to the scene here also

        alive -= dTime;

        if (alive < 0) {
            return false;
        }

        position += speed * dTime;
        modelMatrix = glm::mat4(1.f);
        modelMatrix = glm::scale(modelMatrix, scale);
        modelMatrix = translate(modelMatrix, position);
        modelMatrix = rotate(modelMatrix, rotation.x, glm::vec3(1, 0, 0));
        modelMatrix = rotate(modelMatrix, rotation.y, glm::vec3(0, 1, 0));
        modelMatrix = rotate(modelMatrix, rotation.z, glm::vec3(0, 0, 1));

        return true;
    }

    void render(const Camera &camera) override {
        // TODO: Render the object
        // - Use the shader
        // - Setup all needed shader inputs
        // - hint: use OverallColor in the color_vert_glsl shader for color
        // - Render the mesh
        shader->use();
        shader->setUniform("ProjectionMatrix", camera.projectionMatrix);
        shader->setUniform("ViewMatrix", camera.viewMatrix);
        shader->setUniform("ModelMatrix", modelMatrix);
        shader->setUniform("OverallColor", color);
        mesh->render();
    }

    std::pair <bool, glm::vec3> is_skull() override {

        std::pair <bool, glm::vec3> values;
        values.first = false;
        values.second = position;
        return values;
    }
};

// Static resources need to be instantiated outside of the class as they are globals
std::unique_ptr<ppgso::Mesh> Skull_Particle::mesh;
std::unique_ptr<ppgso::Shader> Skull_Particle::shader;
std::unique_ptr<ppgso::Mesh> Covid_Particle::mesh;
std::unique_ptr<ppgso::Shader> Covid_Particle::shader;

class ParticleWindow : public ppgso::Window {
private:
    // Scene of objects
    Scene scene;

    // Create camera
    Camera camera = {120.0f, (float) width / (float) height, 1.0f, 400.0f};

    // Store keyboard state
    std::map<int, int> keys;
public:
    ParticleWindow() : Window{"task7_particles", SIZE, SIZE} {
        // Initialize OpenGL state
        // Enable Z-buffer
        glEnable(GL_DEPTH_TEST);
        glDepthFunc(GL_LEQUAL);
    }

    void onKey(int key, int scanCode, int action, int mods) override {
        // Collect key state in a map
        keys[key] = action;
        if (keys[GLFW_KEY_SPACE]) {
            // TODO: Add renderable object to the scene
            glm::vec3 position = random_vec3(2, 5);
            glm::vec3 speed = random_vec3(-3, 3);
            glm::vec3 scale = sameRandom_vec3(0.25, 0.5 );
            glm::vec3 rotation = random_vec3(-ppgso::PI, ppgso::PI);
            scene.push_back(std::make_unique<Skull_Particle>(position, speed, scale, rotation));
        }

        if (keys[GLFW_KEY_C]) {
            for (auto& i : scene) {
                auto obj = i.get();
                auto drop = obj->is_skull();

                if (drop.first) {
                    for (int i = 0; i < 20; i++) {
                        glm::vec3 position = drop.second;
                        glm::vec3 speed = random_vec3(-3, 3);
                        glm::vec3 scale = {0.5, 0.5, 0.5};
                        glm::vec3 rotation = random_vec3(-ppgso::PI, ppgso::PI);
                        scene.push_back(std::make_unique<Covid_Particle>(position, speed, scale, rotation));
                    }
                }
            }
        }
    }

    glm::vec3 random_vec3 (float mini, float maxi) {
        return {((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini, ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini, ((float) rand() / RAND_MAX) * (maxi - mini) + mini};
    };

    glm::vec3 sameRandom_vec3 (float mini, float maxi) {
        float sur = ((float) rand() / (float) RAND_MAX) * (maxi - mini) + mini;
        return { sur, sur, sur};
    };

    void onIdle() override {
        // Track time
        static auto time = (float) glfwGetTime();
        // Compute time delta
        float dTime = (float) glfwGetTime() - time;
        time = (float) glfwGetTime();

        // Set gray background
        glClearColor(.1f, .1f, .1f, 1.0f);

        // Clear depth and color buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        // Update all objects in scene
        // Because we need to delete while iterating this is implemented using c++ iterators
        // In most languages mutating the container during iteration is undefined behaviour
        auto i = std::begin(scene);
        while (i != std::end(scene)) {
            // Update object and remove from list if needed
            auto obj = i->get();
            if (!obj->update(dTime, scene))
                i = scene.erase(i);
            else
                ++i;
        }

        // Render every object in scene
        for (auto &object: scene) {
            object->render(camera);
        }
    }
};

int main() {
    // Create new window
    auto window = ParticleWindow{};

    // Main execution loop
    while (window.pollEvents()) {}

    return EXIT_SUCCESS;
}
