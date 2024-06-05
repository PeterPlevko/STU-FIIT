// Example gl_scene
// - Introduces the concept of a dynamic scene of objects
// - Uses abstract object interface for Update and Render steps
// - Creates a simple game scene with Player, Asteroid and Space objects
// - Contains a generator object that does not render but adds Asteroids to the scene
// - Some objects use shared resources and all object deallocations are handled automatically
// - Controls: LEFT, RIGHT, "R" to reset, SPACE to fire

#include <iostream>
#include <map>
#include <list>
#include <chrono>
#include <thread>
#include <ppgso/ppgso.h>
#include "Camera.h"
#include "Scene.h"
#include "Terrain.h"
#include "Submarine.h"
#include "Volcano.h"
#include "FishSpawn.h"
#include "Fish.h"
#include "DecorationPiller.h"
#include "Bubble.h"
#include "SharkBottom.h"
#include "SharkTop.h"
#include "PlantStem.h"
#include "PlantLight.h"

const unsigned int SIZE = 900;

/*!
 * Custom windows for our simple game
 */
class SceneWindow : public ppgso::Window {
private:
    float time = (float) glfwGetTime();

    Scene scene;

    unsigned char* readBMP(char* filename)
    {
        int i;
        FILE* f = fopen(filename, "rb");
        unsigned char info[54];

        // read the 54-byte header
        fread(info, sizeof(unsigned char), 54, f);

        // extract image height and width from header
        scene.imgWidth = *(int*)&info[18];
        scene.imgHeight = *(int*)&info[22];

        // allocate 3 bytes per pixel
        int size = 3 *  scene.imgWidth *  scene.imgHeight;
        unsigned char* data = new unsigned char[size];

        // read the rest of the data at once
        fread(data, sizeof(unsigned char), size, f);
        fclose(f);

        for(i = 0; i < size; i += 3)
        {
            // flip the order of every 3 bytes
            unsigned char tmp = data[i];
            data[i] = data[i+2];
            data[i+2] = tmp;
        }

        return data;
    }

    /*!
     * Reset and initialize the game scene
     * Creating unique smart pointers to objects that are stored in the scene object list
     */
    void initScene() {
        scene.objects.clear();

        scene.lightDirection = {0.25 , 1, 0.5};

        scene.heightFramebuffer = readBMP("maps/heightMap.bmp");

        // Create submarine
        auto submarine = std::make_unique<Submarine>(scene);
        scene.objects.push_back(move(submarine));


        // Create a camera
        auto camera = std::make_unique<Camera>();
        scene.camera = move(camera);

//        // Create terrain
        glm::vec3 position = {-32.2116,-2.79839,-14.8765};
        glm::vec3 rotation = {3*ppgso::PI/2, 4.31239, 0};
        glm::vec3 scale = {1,1,1};
        auto piller1 = std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller1));

        position = {-31.1406,-2.79839,-17.9196};
        auto piller2 = std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller2));

        position = {-31.6716,1.40839,-16.4};
        auto piller3 = std::make_unique<DecorationPiller>(1, position, rotation, scale);
        scene.objects.push_back(move(piller3));

        position = {-17.4406,-17.5,-8.94885};
        position.y = scene.getHeight(position.x, position.z);
        auto piller4 = std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller4));

        position = {-25.0,-17.5,-5.5865};
        position.y = scene.getHeight(position.x, position.z);
        auto piller5 = std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller5));

        position = {-25.0,-17.5,-21.8865};
        position.y = scene.getHeight(position.x, position.z);
        auto piller6 = std::make_unique<DecorationPiller>(2, position, rotation, scale);
        scene.objects.push_back(move(piller6));

        position = {-30.0,-17.5,-8.04};
        position.y = scene.getHeight(position.x, position.z);
        auto piller7 = std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller7));

        position = {-16.5,-17.5,-10.6631};
        position.y = scene.getHeight(position.x, position.z);
        auto piller8= std::make_unique<DecorationPiller>(2, position, rotation, scale);
        scene.objects.push_back(move(piller8));

        position = {-17.5,-17.5,-18.8};
        position.y = scene.getHeight(position.x, position.z);
        auto piller9= std::make_unique<DecorationPiller>(0, position, rotation, scale);
        scene.objects.push_back(move(piller9));

        auto terrain1 = std::make_unique<Terrain>("models/terrainMain.obj");
        scene.objects.push_back(move(terrain1));

        auto terrain_top = std::make_unique<Terrain>("models/terrainTop.obj");
        scene.objects.push_back(move(terrain_top));

        auto terrain2 = std::make_unique<Terrain>("models/cave.obj");
        scene.objects.push_back(move(terrain2));

        auto terrain4 = std::make_unique<Terrain>("models/walls.obj");
        scene.objects.push_back(move(terrain4));

        for (int i = 0; i < 30; ++i) {
            position = {((float) rand() / (float) RAND_MAX) * (2 * 14.48) - 14.48, 0, ((float) rand() / (float) RAND_MAX) * (53.5 - 17.8) + 17.8};
            position.y = scene.getHeight(position.x, position.z) + 0.15;
            auto volcano1 = std::make_unique<Volcano>(((float) rand() / (float) RAND_MAX) < 0.5f, position);
            scene.objects.push_back(move(volcano1));
        }

        std::vector<glm::vec3> path_points = {
                {-23.098, -3.3943, -13.731},
                {-24.098, 5.0, -13.731},
                {-10.3918, 3.7 , -1.50874},
                {-6.88563, 3.37808, 2.38699},
                {1.17977, 3.37808, 10.0213},
                {10.178, 3.46341, 1.22067}
        };

        auto fishfish = std::make_unique<FishSpawn>(path_points, 7, 40);
        scene.objects.push_back(move(fishfish));

        position = {10.178, 3.06341, 1.22067};
        rotation = {3*ppgso::PI/2,0,2*ppgso::PI/3};
        float freq = 7.0f / 250.0f;
        auto shark1 = std::make_unique<SharkBottom>(position, rotation);
        scene.objects.push_back(move(shark1));
        auto shark2 = std::make_unique<SharkTop>(position, rotation, freq);
        scene.objects.push_back(move(shark2));

        path_points = {
                {27.6946, 0.479096, 14.3793},
                {27.6946, 8.479096, 14.3793},
                {-8.5935, 8.67783, 14.1922},
                {-23.7925, 8.56439, -25.2445},
                {-2.8538, 4.35727, -35.9133}
        };

        auto fishfish1 = std::make_unique<FishSpawn>(path_points, 5, 20);
        scene.objects.push_back(move(fishfish1));

        position = {-2.8538, 4.05727, -35.9133};
        rotation = {3*ppgso::PI/2,0,2*ppgso::PI/3};
        freq = 5.0f / 250.0f;
        auto shark3 = std::make_unique<SharkBottom>(position, rotation);
        scene.objects.push_back(move(shark3));
        auto shark4 = std::make_unique<SharkTop>(position, rotation, freq);
        scene.objects.push_back(move(shark4));


        path_points = {
                {25.4596, 14.7809, -19.4188},
                {25.4596, 16.7809, -19.4188},
                {17.5688, 18.8539, -13.8048},
                {17.5688, 18.8539, -11.8048},
                {17.5688, 18.8539, -9.8048},
                {-12.2959, 18.3634, 1.07688},
                {-42.9292, -2.19771, -31.4914}
        };

        auto fishfish2 = std::make_unique<FishSpawn>(path_points, 5, 20);
        scene.objects.push_back(move(fishfish2));

        // BABY SHARK TODODODODODO
        position = {-42.9292, -2.19771, -31.4914};
        rotation = {3*ppgso::PI/2,0,4*ppgso::PI/3};
        freq = 5.0f / 250.0f;
        auto shark5 = std::make_unique<SharkBottom>(position, rotation);
        scene.objects.push_back(move(shark5));
        auto shark6 = std::make_unique<SharkTop>(position, rotation, freq);
        scene.objects.push_back(move(shark6));

        // Sub lighs
        scene.lights.positions[0] = {0, 0, 0};
        scene.lights.colors[0] = {1, 1, 1};
        scene.lights.ranges[0] = 15;
        scene.lights.strengths[0] = 3;

        scene.cave_lights = 15;
        int outside_lights = 25;
        scene.lights.count = scene.cave_lights + outside_lights + 1;

        // Cave lights
        for (int i = 0; i < scene.cave_lights; ++i) {
            position = {((float) rand() / (float) RAND_MAX) * (2 * 14.48) - 14.48, 0, ((float) rand() / (float) RAND_MAX) * (53.5 - 17.8) + 17.8};
            position.y = scene.getHeight(position.x, position.z) + 0.15;
            rotation = {3*ppgso::PI/2,0,((float) rand() / (float) RAND_MAX) * (2*ppgso::PI)};
            glm::vec3 color = {((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX)};
            while (color.x + color.y + color.z < 1.0f) {
                color = {((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX)};
            }
            auto lightStem1 = std::make_unique<PlantStem>(position, rotation);
            scene.objects.push_back(move(lightStem1));
            position.y = position.y + 0.8;
            scene.lights.positions[i+1] = position;
            scene.lights.colors[i+1] = color;
            scene.lights.ranges[i+1] = 10;
            scene.lights.strengths[i+1] = 3;
            auto light1 = std::make_unique<PlantLight>(position, rotation, color);
            scene.objects.push_back(move(light1));
        }

        // outside lights
        for (int i = 0; i < outside_lights; ++i) {
            position = {((float) rand() / (float) RAND_MAX) * (2 * 44) - 44, 0, ((float) rand() / (float) RAND_MAX) * (59.6) - 41.8};
            position.y = scene.getHeight(position.x, position.z) + 0.15;
            rotation = {3*ppgso::PI/2,0,((float) rand() / (float) RAND_MAX) * (2*ppgso::PI)};
            glm::vec3 color = {((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX)};
            while (color.x + color.y + color.z < 1.0f) {
                color = {((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX),((float) rand() / (float) RAND_MAX)};
            }
            auto lightStem1 = std::make_unique<PlantStem>(position, rotation);
            scene.objects.push_back(move(lightStem1));
            position.y = position.y + 0.8;
            scene.lights.positions[i+scene.cave_lights+1] = position;
            scene.lights.colors[i+scene.cave_lights+1] = color;
            scene.lights.ranges[i+scene.cave_lights+1] = 15;
            scene.lights.strengths[i+scene.cave_lights+1] = 3;
            auto light1 = std::make_unique<PlantLight>(position, rotation, color);
            scene.objects.push_back(move(light1));
        }
    }

public:
    bool first_mouse = true;

    /*!
     * Construct custom game window
     */
    SceneWindow() : Window{"PODMORSKY SVET", 1920/*SIZE*/, 1010/*SIZE*/} {
        //hideCursor();
        glfwSetInputMode(window, GLFW_STICKY_KEYS, 1);
//        glfwSetInputMode(window, GLFW_CURSOR, GLFW_CURSOR_DISABLED);

        // Initialize OpenGL state
        // Enable Z-buffer
        glEnable(GL_DEPTH_TEST);
        glDepthFunc(GL_LEQUAL);


        // Enable polygon culling
        glEnable(GL_CULL_FACE);
        glFrontFace(GL_CCW);
        glCullFace(GL_BACK);

        initScene();
    }

    /*!
     * Handles pressed key when the window is focused
     * @param key Key code of the key being pressed/released
     * @param scanCode Scan code of the key being pressed/released
     * @param action Action indicating the key state change
     * @param mods Additional modifiers to consider
     */
    void onKey(int key, int scanCode, int action, int mods) override {
        scene.keyboard[key] = action;

        // Reset
        if (key == GLFW_KEY_R && action == GLFW_PRESS) {
            initScene();
        }

        if (key == GLFW_KEY_1) {
            scene.camera->mode = Camera::FOLLOW;
        }

        if (key == GLFW_KEY_3) {
            scene.camera->mode = Camera::STATIONARY;
            scene.camera->position = {-17.41 , 2.42745, -3.9553};
            scene.camera->submarinePos = {-22.2458 , -1.09873, -11.0905};
        }


        if (key == GLFW_KEY_4) {
            scene.camera->mode = Camera::STATIONARY;
            scene.camera->position = {7.53655, 3.79667, 5.54343};
            scene.camera->submarinePos = {10.178, 3.06341, 1.22067};
        }

        if (key == GLFW_KEY_5) {
            scene.camera->mode = Camera::STATIONARY;
            scene.camera->position = {-2.64922, 5.56155, 11.992};
            scene.camera->submarinePos = {-1.57861, 1.10426, 22.2302};
        }

        if (scene.keyboard[GLFW_KEY_6] == GLFW_PRESS) {
            scene.camera->startPos = {-17.41 , 2.42745, -3.9553};
            scene.camera->destPos = {-2.64922, 5.56155, 11.992};
            scene.camera->startPosLookAt = {-22.2458 , -1.09873, -11.0905};
            scene.camera->destPosLookAt = {-1.57861, 1.10426, 22.2302};
            scene.camera->t = -1;

            scene.camera->mode = Camera::MOVING;
            scene.keyboard[GLFW_KEY_6] = GLFW_RELEASE;
        }

        if (scene.keyboard[GLFW_KEY_7] == GLFW_PRESS) {
            scene.camera->startPos = {7.69656, 4.88165, 7.65431};
            scene.camera->destPos = {-18.6847, 9.22027, -2.41117};
            scene.camera->startPosLookAt = {12.5157, 4.39217, 0.480123};
            scene.camera->destPosLookAt = {-22.2458 , -1.09873, -11.0905};
            scene.camera->t = -1;

            scene.camera->mode = Camera::MOVING;
            scene.keyboard[GLFW_KEY_7] = GLFW_RELEASE;
        }

        if (key == GLFW_KEY_RIGHT) {
            if (scene.waterCurrent.x >= -0.0025f)
                scene.waterCurrent.x -= 0.0008f;
        }
        if (key == GLFW_KEY_LEFT) {
            if (scene.waterCurrent.x <= 0.0025f)
                scene.waterCurrent.x += 0.0008f;
        }
        if (key == GLFW_KEY_UP) {
            if (scene.waterCurrent.z >= -0.0025f)
                scene.waterCurrent.z -= 0.0008f;
        }
        if (key == GLFW_KEY_DOWN) {
            if (scene.waterCurrent.z <= 0.0025f)
                scene.waterCurrent.z += 0.0008f;
        }

    }

    /*!
     * Handle cursor position changes
     * @param cursorX Mouse horizontal position in window coordinates
     * @param cursorY Mouse vertical position in window coordinates
     */
    void onCursorPos(double cursorX, double cursorY) override {

    }

    /*!
     * Window update implementation that will be called automatically from pollEvents
     */
    void onIdle() override {
//        std::this_thread::sleep_for(std::chrono::milliseconds(1000));

        // Compute time delta
        float dt = (float) glfwGetTime() - time;
        time = (float) glfwGetTime();

//        std::cout << "fps: " << round(1 / dt) << std::endl;

        // Set gray background
        glClearColor(15 / 255.0, 10 / 255.0, 105 / 255.0, 0);
        // Clear depth and color buffers
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

        scene.update(dt);
        scene.render();
    }
};

int main() {
    // Initialize our window
    SceneWindow window;

    // Main execution loop
    while (window.pollEvents()) {}

    return EXIT_SUCCESS;
}
