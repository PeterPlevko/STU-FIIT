#include <stdio.h>
#include <GL/gl.h>
#include <GL/glut.h>
#include <GL/glu.h>

const int step = 25;

const float Lmax = 10.0;

float ratio;

float velocity = 0.05;

typedef struct Object
{
    float diffX = 0.0;
    float diffY = 0.0;
}
OBJECT;

OBJECT t1, t2;

void update(const int val)
{
    if (t1.diffX + 0.8 > 0.5*Lmax*ratio || t1.diffX - 0.8 < -0.5*Lmax*ratio)
        velocity = -velocity;

    t1.diffX += velocity;

    t2.diffX += 0.02;
    t2.diffY += 0.02;

    glutPostRedisplay();
    glutTimerFunc(step, update, val+1);
}

void resize(int width, int height)
{
    glViewport(0, 0, width, height);
    glMatrixMode(GL_PROJECTION);

    if ( !width )
        width++;

    glLoadIdentity();
    ratio = ((float)height) / height;
    gluOrtho2D(-0.5*Lmax, 0.5*Lmax, -0.5*Lmax*ratio, 0.5*Lmax*ratio);
}

void procedure()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.9453, 0.8125, 0.5859);

    glBegin(GL_TRIANGLES);
        glVertex2f(-0.8 + t1.diffX, -0.8 + t1.diffY);
        glVertex2f( 0.8 + t1.diffX, -0.8 + t1.diffY);
        glVertex2f( 0.0 + t1.diffX,  0.8 + t1.diffY);
    glEnd();

    glColor3f(0.9257, 0.5351, 0.457);

    glBegin(GL_TRIANGLES);
        glVertex2f(-1.0 + t2.diffX, -0.8 + t2.diffY);
        glVertex2f( 1.0 + t2.diffX, -0.8 + t2.diffY);
        glVertex2f(-1.0 + t2.diffX,  0.8 + t2.diffY);

        glVertex2f( 1.0 + t2.diffX,  0.8 + t2.diffY);
        glVertex2f( 1.0 + t2.diffX, -0.8 + t2.diffY);
        glVertex2f(-1.0 + t2.diffX,  0.8 + t2.diffY);
    glEnd();

    
    glutSwapBuffers();
}

int main(int argc, char **argv)
{
    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE);
    glutInitWindowSize(640, 640);
    glutInitWindowPosition(200, 150);

    glutCreateWindow("Hello world");
    glutDisplayFunc(procedure);
    glClearColor(0.6953, 0.9023, 0.9062, 0.0);

    glutReshapeFunc(resize);
    glutTimerFunc(step, update, 0);
    glutMainLoop();
    return 0;
}