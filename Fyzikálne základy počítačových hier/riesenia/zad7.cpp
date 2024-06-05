#include <stdio.h>
#include <GL/gl.h>
#include <GL/glut.h>
#include <GL/glu.h>
#include <math.h>

const int step = 25;

const float Lmax = 10.0f;

float t 	= 0.0f;
bool out 	= false;
float old 	= 0.0f;

float period 	= 5.0f;
float threshold = 5.0f;

bool first = false;

double twicePi = 2.0 * 3.142;
double radius = 0.30;

float ratio;

float velocity = 0.05;

typedef struct Object
{
	float x 	= 0.0f;
	float y 	= 0.0f;
	float v 	= 0.0f;
	float a 	= 0.0f;
	float m 	= 1.0f;
	float F 	= 1.0f;
	float act_x = 0.0f;
	float act_v = 0.0f;
}
OBJECT;

OBJECT o1;

void update(const int val)
{
	float tm = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);
	if ( !first )
	{
		old = tm;
		first = true;
	}
	float dTime = tm - old;
	old = tm;

	if ( t >= period && !out )
	{
		out = true;
		o1.F *= -2;
		threshold += period;
	}
	else if ( t >= threshold && out )
	{
		o1.F *= -1;
		threshold += period;
	}

	t += dTime;

    o1.a = (o1.F / o1.m);

    o1.act_x = o1.x + (o1.v * dTime) + (0.5f * o1.a * pow(dTime, 2));
    o1.act_v = o1.v + (o1.a * dTime);

    o1.x = o1.act_x;
    o1.v = o1.act_v;

    printf("%f %f %f %f\n", t, o1.act_x, o1.act_v, o1.a);

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

    glBegin( GL_TRIANGLE_FAN );
    glVertex2f( o1.act_x, o1.y );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (o1.x + (radius * cos(i * twicePi / 20))), (o1.y + (radius * sin(i * twicePi / 20)))
            );
    }
    glEnd();
    
    glutSwapBuffers();
}

int main(int argc, char **argv)
{
	if ( argc > 1 )
	{
		o1.m = atof(argv[1]);
		o1.F = atof(argv[2]);
	}

	o1.F *= 0.5f;

    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE);
    glutInitWindowSize(800, 800);
    glutInitWindowPosition(200, 150);

    glutCreateWindow("Zadanie 7");
    glutDisplayFunc(procedure);
    glClearColor(0.6953, 0.9023, 0.9062, 0.0);

    glutReshapeFunc(resize);

    old = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);

    glutTimerFunc(step, update, 0);
    glutMainLoop();
    return 0;
}