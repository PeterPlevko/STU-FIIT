#include <stdio.h>
#include <GL/gl.h>
#include <GL/glut.h>
#include <GL/glu.h>
#include <math.h>

const int step = 25;

const float Lmax = 10.0f;

float t 	= 0.0f;
float old 	= 0.0f;

float period 	= 5.0f;
float threshold = 5.0f;

bool first = false;
bool second = false;

double twicePi = 2.0 * 3.142;
double radius = 0.30;

float ratio;

float velocity = 0.05;

typedef struct Force
{
	float x = 0.0f;
	float y = 0.0f;
}
FORCE;

typedef struct Object
{
	float x 		= 0.0f;
	float y 		= 0.0f;
	float vx 		= 0.0f;
	float vy 		= 0.0f;
	float ax 		= 0.0f;
	float ay		= 0.0f;
	float m 		= 1.0f;
	float k 		= 0.5f;
	float act_x 	= 0.0f;
	float act_y 	= 0.0f;
	float act_vx 	= 0.0f;
	float act_vy	= 0.0f;
}
OBJECT;

OBJECT o1;
FORCE F;

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

	if ( t >= threshold )
	{
		int c = (int)(((int)threshold % (int)(period * 4)) / period);
		switch( c )
		{
			case 1:										// (F, 0) -> (0, F)
				F.y = F.x;
				F.x = 0.0f;
				break;
			case 2:										// (0, F) -> (-F, 0)
				F.x = -F.y;
				F.y = 0.0f;
				break;
			case 3:										// (-F, 0) -> (0, -F)
				F.y = F.x;
				F.x = 0.0f;
				break;
			case 0:										// (0, -F) -> (F, 0)
				F.x = -F.y;
				F.y = 0.0f;
				second = true;
				break;
			default:
				printf("Something is wrong!\n");
				break;
		}
		threshold += period;
	}

	t += dTime;

	if ( !second )
	{
		o1.ax = (F.x / o1.m);
    	o1.ay = (F.y / o1.m);
	}
	else
	{
		o1.ax = (F.x - (o1.k * o1.vx)) / o1.m;
		o1.ay = (F.y - (o1.k * o1.vy)) / o1.m;
	}

    o1.act_x = o1.x + (o1.vx * dTime) + (0.5f * o1.ax * pow(dTime, 2));
    o1.act_y = o1.y + (o1.vy * dTime) + (0.5f * o1.ay * pow(dTime, 2));

    o1.act_vx = o1.vx + (o1.ax * dTime);
    o1.act_vy = o1.vy + (o1.ay * dTime);

    o1.x 	= o1.act_x;
    o1.y 	= o1.act_y;
    o1.vx 	= o1.act_vx;
    o1.vy 	= o1.act_vy;

    //printf("%f %f\n", o1.act_x, o1.act_y);

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
    gluOrtho2D(-1.0*Lmax, 1.0*Lmax, -1.0*Lmax*ratio, 1.0*Lmax*ratio);
}

void procedure()
{
    glClear(GL_COLOR_BUFFER_BIT);
    glColor3f(0.9453, 0.8125, 0.5859);

    glBegin( GL_TRIANGLE_FAN );
    glVertex2f( o1.act_x, o1.act_y );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (o1.act_x + (radius * cos(i * twicePi / 20))), (o1.act_y + (radius * sin(i * twicePi / 20)))
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
		F.x = atof(argv[2]);
		if ( atof(argv[3]) >= 0 && atof(argv[3]) < 1 )
			o1.k = atof(argv[3]);
	}

    glutInit(&argc, argv);
    glutInitDisplayMode(GLUT_DOUBLE);
    glutInitWindowSize(800, 800);
    glutInitWindowPosition(200, 150);

    glutCreateWindow("Zadanie 8");
    glutDisplayFunc(procedure);
    glClearColor(0.6953, 0.9023, 0.9062, 0.0);

    glutReshapeFunc(resize);

    old = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);

    glutTimerFunc(step, update, 0);
    glutMainLoop();
    return 0;
}