#include <stdio.h>
#include <math.h>
#include <GL/gl.h>
#include <GL/glut.h>

FILE *file = NULL;

/* variables */
const float v0 	=  9.0;
const float h0 	=  4.0;
const float g 	=  9.81;
const float mh 	= -2.0;
const float delay = 1.25;

const int step = 25;

const float Lmax = 20.0;

float t = 0.0;

bool first = false;

float old = 0.0;

double twicePi = 2.0 * 3.142;
double radius = 0.30;

typedef struct MassPoint
{
	float x = 0.0;
	float y = 0.0;
	float posX = 0.0;
	float posY = 0.0;
}
MASSPOINT;

MASSPOINT p1, p2;

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

	p1.posY = h0 + v0*t - 0.5*g*pow(t, 2);

	if ( p1.posY < mh )
		p1.posY = mh;

	if ( t > delay )
		p2.posY = h0 - 0.5*g*pow((t - delay), 2);
	
	if ( p2.posY < mh )
		p2.posY = mh;

	fprintf(file, "%f %f %f\n", t, p1.posY, p2.posY);

	glutPostRedisplay();
	glutTimerFunc(step, update, val+1);
}

void resize(int width, int height)
{
	glViewport(0, 0, width, height);
	glMatrixMode(GL_PROJECTION);

	if ( !width )
		width++;

	const float ratio = ((float)height) / width;

	float mat[16];

	for (int ii = 0; ii < 16; ii++)
		mat[ii] = 0.0;
	
	mat[0] = 2.0 / Lmax;
	mat[5] = 2.0 / (Lmax * ratio);
	mat[10] = 1.0;
	mat[15] = 1.0;
	
	glLoadMatrixf(mat);
}

void procedure()
{
	glClear( GL_COLOR_BUFFER_BIT );
	glColor3f( 0.22, 0.38, 0.55 );

	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();

	glTranslatef( p1.posX, p1.posY, 0.0 );

	glBegin( GL_TRIANGLE_FAN );
    glVertex2f( p1.x, p1.y );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (p1.x + (radius * cos(i * twicePi / 20))), (p1.y + (radius * sin(i * twicePi / 20)))
            );
    }
    glEnd();

	glLoadIdentity();
	glTranslatef( p2.posX, p2.posY, 0.0 );

	glBegin( GL_TRIANGLE_FAN );
    glVertex2f( p2.x, p2.y );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (p2.x + (radius * cos(i * twicePi / 20))), (p2.y + (radius * sin(i * twicePi / 20)))
            );
    }
    glEnd();

	glutSwapBuffers();
}

int main (int argc, char **argv)
{
	file = fopen("data3.tmp", "w");

	p1.posX = -2.0;
	p2.posX =  2.0;

	p1.posY = h0;
	p2.posY = h0;

	glutInit(&argc, argv);
	glutInitDisplayMode( GLUT_DOUBLE );
	glutInitWindowSize(1080, 1080);
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
