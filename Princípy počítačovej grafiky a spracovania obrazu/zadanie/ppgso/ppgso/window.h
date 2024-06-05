#pragma once
#include <string>
#include <map>

#include <GL/glew.h>
#include <GLFW/glfw3.h>

namespace ppgso {
  /*!
   * Simple GLFW wrapper used for managing a single window and its events.
   */
  class Window {
  private:
    // Singleton classes to wrap glew and glfw initialization
    class glfwInstance {
    protected:
      glfwInstance();
      ~glfwInstance();
    public:
      static glfwInstance &Init();
    };

    class glewInstance {
    private:
      glewInstance();
    public:
      static glewInstance &Init();
    };

    // Map of windows and associated glfw windows for event propagation
    static std::map<GLFWwindow*, Window*> windows;

    // Static callback functions for glfw
    static void glfw_error_callback(int error, const char *description);
    static void glfw_key_callback(GLFWwindow *window, int key, int scanCode, int action, int mods);
    static void glfw_cursor_pos_callback(GLFWwindow *window, double cursorX, double cursorY);
    static void glfw_mouse_button_callback(GLFWwindow *window, int button, int action, int mods);
    static void glfw_window_refresh_callback(GLFWwindow *window);

  protected:
    GLFWwindow *window;
  public:
    const std::string title;
    int width, height;

    /*!
     * Open new Window and initialize OpenGL 3.3 context
     * @param title Window title to show in the title bar
     * @param width Horizontal size of the window
     * @param height Vertical size of the window
     */
    Window(std::string title, int width, int height);

    virtual ~Window();

    /*!
     * Virtual method to be called when there is nothing else to do.
     */
    virtual void onIdle() {}

    /*!
     * Virtual method to be called when the window content needs update, for example after window resize.
     */
    virtual void onRefresh() {}

    /*!
     * Virtual method to be called when keyboard event is generated.
     * @param key Code of the key that changed state, see GLFW_KEY_* macros for key codes
     * @param scanCode System specific scancode of the key
     * @param action GLFW_PRESS, GLFW_RELEASE or GLFW_REPEAT
     * @param mods Bit field describing which modifier keys were held down, see GLFW_MOD_* macros
     */
    virtual void onKey(int key, int scanCode, int action, int mods) {};

    /*!
     * Virtual method to be called when cursor event is generated
     * @param cursorX
     * @param cursorY
     */
    virtual void onCursorPos(double cursorX, double cursorY) {};

    /*!
     * Virtual method to be called when a mouse button is pressed
     * @param button The mouse button that was pressed or released, see GLFW_MOUSE_BUTTON_* macros
     * @param action One of GLFW_PRESS or GLFW_RELEASE
     * @param mods Bit field describing which modifier keys were held down, see GLFW_MOD_* macro
     */
    virtual void onMouseButton(int button, int action, int mods) {};

    /*!
     * Restore OpenGL Viewport
     */
    void resetViewport();

    /*!
     * Resize Window to new size
     * @param width Horizontal size in pixels
     * @param height Vertical size in pixels
     */
    void resize(int width, int height);

    /*!
     * Hide mouse cursor
     */
    void hideCursor();

    /*!
     * Show mouse cursor
     */
    void showCursor();

    /*!
     * Close the window
     */
    void close();

    /*!
     * This function processes events in the event queue. Processing events will cause the window virtual functions associated with those events to be called.
     * @return Will be true if the Window is about to be closed
     */
    bool pollEvents();

    /*!
     * Limit FPS to vsync which is usually 60 FPS
     * @param limit - When true GLFW window refresh rate will use vsync
     */
    void fpsLimit(bool limit);
  };
}

