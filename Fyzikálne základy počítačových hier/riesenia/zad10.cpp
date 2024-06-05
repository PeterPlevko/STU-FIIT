#include <stdio.h>
#include <math.h>
#include <GL/gl.h>
#include <GL/glut.h>

FILE *file = NULL;

/* variables */
const float alfa = -0.6f;
const float v0 	 =  1.4f;
const float g  	 =  9.81;

float L_x = 2.5f;
float L_y = 1.5f;

float XNPix;
float YNPix;

float proj_const = 0.6f;
float base_const = 0.5f;

float ratio;

const int step = 25;

const float Lmax = 20.0;

float t = 0.0;

bool first = false;

bool out = false;

float old = 0.0;

double twicePi = 2.0 * 3.142;
double r = 0.075;

typedef struct MassPoint
{
	float x  = 0.0f;
	float y  = 0.0f;
	float vx = 0.0f;
	float vy = 0.0f;

}MASSPOINT;

MASSPOINT p;

void update(const int val)
{
	// convert to miliseconds

	float tm = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);
	if ( !first )
	{
		old = tm;
		first = true;
	}
	float dTime = tm - old;
	old = tm;

	t += dTime;

	if (p.x + r >  base_const * L_x) p.vx *= -1;
	if (p.x - r < -base_const * L_x) p.vx *= -1;
	if (p.y + r >  base_const * L_x * ratio) p.vy *= -1;
	if (p.y - r < -base_const * L_x * ratio) p.vy *= -1;

	p.x += (p.vx * dTime);
	p.y += (p.vy * dTime);

	glutPostRedisplay();
	glutTimerFunc(step, update, val+1);
}

void resize(int width, int height)
{
	glViewport(0, 0, width, height);
	glMatrixMode( GL_PROJECTION );

	if ( !width )
		width++;

	glLoadIdentity();
    ratio = ((float)height) / width;
	gluOrtho2D(-(proj_const * L_x) , proj_const * L_x , -(proj_const * L_x * ratio) , proj_const * L_x * ratio);
}

void screenSize()
{
	XNPix = 1080;
	YNPix = 720;
}

void procedure()
{
	glClear( GL_COLOR_BUFFER_BIT );
	glColor3f( 0.22, 0.38, 0.55 );

	glMatrixMode( GL_MODELVIEW );

	// Base where the pool ball is located
	glLoadIdentity();

	glBegin(GL_TRIANGLES);
        glVertex2f(-base_const*L_x, -base_const*L_x*ratio);
        glVertex2f( base_const*L_x, -base_const*L_x*ratio);
        glVertex2f(-base_const*L_x,  base_const*L_x*ratio);

        glVertex2f( base_const*L_x,  base_const*L_x*ratio);
        glVertex2f( base_const*L_x, -base_const*L_x*ratio);
        glVertex2f(-base_const*L_x,  base_const*L_x*ratio);
    glEnd();

    // Pool ball
    glColor3f( 0.45, 0.11, 0.08 );
	glLoadIdentity();

	glBegin( GL_TRIANGLE_FAN );
    glVertex2f( p.x, p.y );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (p.x + (r * cos(i * twicePi / 20))), (p.y + (r * sin(i * twicePi / 20)))
            );
    }
    glEnd();

	glutSwapBuffers();
}

int main (int argc, char *argv[])
{
	p.x =  0.3f * L_x;
	p.y = -0.1f * L_y;

	p.vx = v0 * cos(alfa);
	p.vy = v0 * sin(alfa);

	screenSize();
	glutInit(&argc, argv);
	glutInitDisplayMode( GLUT_DOUBLE );
	glutInitWindowSize( XNPix, YNPix );
	glutInitWindowPosition(200, 150);
	glutCreateWindow("OpenGL: Triangle");
	glutDisplayFunc(procedure);
	glClearColor(1.0, 0.34, 0.39, 1.0);
	glutReshapeFunc(resize);

	old = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);

	glutTimerFunc(step, update, 0);
	glutMainLoop();

	fclose(file);

	return 0;
}
