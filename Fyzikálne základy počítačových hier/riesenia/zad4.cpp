#include <stdio.h>
#include <math.h>
#include <GL/gl.h>
#include <GL/glut.h>

FILE *file = NULL;

/* variables */
float alfa 	=  45;
float v0	=  6.0;
float vt 	= -1.0;
float d1 	=  0;

const float g 	=  9.81;
const float gnd = -1.0;

float p1StartX = -(d1 * 0.5);
float p2StartX =  (d1 * 0.5);

const int step = 25;

const float Lmax = 20.0;

float t = 0.0;

bool first = false;

bool out = false;

float old = 0.0;

double twicePi = 2.0 * 3.142;
double radius = 0.30;

typedef struct MassPoint
{
	float posX = 0.0;
	float posY = 0.0;
	float xOff = 0.0;
	float yOff = 0.0;
}
MASSPOINT;

MASSPOINT p1, p2;

void calcDist()
{
	while ( 1 )
	{
		while ( p1.posX <= p2.posX )
		{
			p1.posX = p1.xOff + (v0 * cos(alfa * ( M_PI / 180 )) * t);
			p1.posY = p1.yOff + (v0 * sin(alfa * ( M_PI / 180 )) * t) - 0.5*g*pow(t, 2);

			p2.posX = p2.xOff + vt * t;
			t += 0.001;
		}
		printf("d1: %f p1.x: %f p2.x: %f\n", d1, p1.posX, p2.posX);
		if ( p1.posY < gnd )
		{
			t = 0;
			break;
		}

		d1 += 0.01;

		p1StartX = -(d1 * 0.5);
		p2StartX =  (d1 * 0.5);

		p1.posX = p1.xOff = p1StartX;
		p1.posY = p1.yOff = gnd;

		p2.posX = p2.xOff = p2StartX;
		p2.posY = p2.yOff = gnd;

		printf("d1: %f p1: %f p2: %f\n", d1, p1.posX, p2.posX);
	}
}

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

	if ( p1.posY > gnd || p1.posX == p1StartX )
	{
		p1.posX = p1.xOff + (v0 * cos(alfa * ( M_PI / 180 )) * t);
		p1.posY = p1.yOff + (v0 * sin(alfa * ( M_PI / 180 )) * t) - 0.5*g*pow(t, 2);
	}

	if ( p2.posX > p1.posX )
	{
		p2.posX = vt * t + p2.xOff;
	}
	else if ( !out )
	{
		out = true;
		printf("\nd1: %f\nd2: %f\n", d1, (d1 * 0.5) + p1.posX);

		float a_d1 = 2 * (
			(2* v0 * sin(alfa * ( M_PI / 180 ))) / g) *
			(v0 * cos(alfa * ( M_PI / 180 )) + vt);

		printf("\nanalyticky odvodena hodnota: %f\n", a_d1);
	}
	
	fprintf(file, "%f %f %f %f\n", p1.posX, p1.posY, p2.posX, p2.posY);

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
    glVertex2f( p1.posX, p1.posY );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (p1.posX + (radius * cos(i * twicePi / 20))), (p1.posY + (radius * sin(i * twicePi / 20)))
            );
    }
    glEnd();

	glLoadIdentity();
	glTranslatef( p2.posX, p2.posY, 0.0 );

	glBegin( GL_TRIANGLE_FAN );
    glVertex2f( p2.posX, p2.posY );
    for (int i = 0; i <= 20; i++)
    {
        glVertex2f (
            (p2.posX + (radius * cos(i * twicePi / 20))), (p2.posY + (radius * sin(i * twicePi / 20)))
            );
    }
    glEnd();

	glutSwapBuffers();
}

int main (int argc, char *argv[])
{
	file = fopen("data4.tmp", "w");

	if ( argc > 1 )
	{
		v0 = atof(argv[1]);
		alfa = atof(argv[2]);
		vt = atof(argv[3]);
	}

	p1.posX = p1.xOff = p1StartX;
	p1.posY = p1.yOff = gnd;

	p2.posX = p2.xOff = p2StartX;
	p2.posY = p2.yOff = gnd;

	calcDist();

	p1.posX = p1.xOff = p1StartX;
	p1.posY = p1.yOff = gnd;

	p2.posX = p2.xOff = p2StartX;
	p2.posY = p2.yOff = gnd;

	printf("%f\n", d1);

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
