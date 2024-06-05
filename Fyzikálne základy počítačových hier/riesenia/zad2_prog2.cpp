#include <stdio.h>
#include <math.h>
#include <GL/gl.h>
#include <GL/glut.h>

FILE *file = NULL;

const float v_1 = 1.0;
const float v_2 = 1.5;
const float d   = 12.0;

const int step = 25;

const float Lmax = 20.0;

float old = 0.0;
float delay = 3.0;

double twicePi = 2.0 * 3.142;
double radius = 0.30;

typedef struct MassPoint
{
	float x = 0.0;
	float y = 0.0;
	float diffX = 0.0;
	float posX = 0.0;
}
MASSPOINT;

MASSPOINT p1, p2;

void update(const int val)
{
	// convert to miliseconds
	float t = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);
	float dTime = t - old;
	old = t;

	p1.diffX += (v_1 * dTime);

	if ( t > delay )
		p2.diffX += (v_2 * dTime);

	fprintf(file, "%f %f %f\n", t, p1.posX + p1.diffX, p2.posX + p2.diffX);

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

	p1.x = (-d * 0.5) + p1.diffX;

	glTranslatef( p1.diffX, 0.0, 0.0 );

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
	glTranslatef( p2.diffX, 0.0, 0.0 );

	p2.x = (-d * 0.5) + p2.diffX;

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
	file = fopen("data2.tmp", "w");

	p1.posX = -d * 0.5;
	p2.posX = -d * 0.5;

	glutInit(&argc, argv);
	glutInitDisplayMode( GLUT_DOUBLE );
	glutInitWindowSize(1080, 640);
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
