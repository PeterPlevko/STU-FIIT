#include <stdio.h>
#include <math.h>
#include <GL/gl.h>
#include <GL/glut.h>

FILE *file = NULL;

/* variables */
float alfa 		=  45.0;
float alfa_rad 	=  0.0;
float h0		=  2.0;
float v0		=  6.0;
float phi		=  90.0;
float phi_rad	=  0.0;
float d 		=  0;
float gnd 		= -2.0f;

const float g 	=  9.81;
const float fr 	=  0.01;

float HH = 0.0;
float LL = 0.0;

float XNPix;
float YNPix;

float p1StartX = -(d * 0.5);
float p2StartX =  (d * 0.5);

const int step = 25;

const float Lmax = 20.0;
const float p_size = 6.0f;
const float a_size = 2.0f;

float t = 0.0;

bool first = false;

bool out = false;

float old = 0.0;

double twicePi = 2.0 * 3.142;

typedef struct MassPoint
{
	float posX 		= 0.0;
	float posY 		= 0.0;
	float posZ 		= 0.0;
	float xOff 		= 0.0;
	float yOff 		= 0.0;
	float zOff 		= 0.0;
	float radius 	= 1.0;
	int segments	= 16;
	int rings		= 16;
}
MASSPOINT;

MASSPOINT p1, p2;

float calcDist()
{
	float tmp1 = (v0 * cos(alfa)) / g;
	float tmp2 = (v0 * sin(alfa)) + sqrt(pow(v0, 2) * pow(sin(alfa), 2) + (2 * g * h0));

	return tmp1 * tmp2;
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

	if ( p1.posY - p1.radius > gnd || p1.posX == p1StartX )
	{
		p1.posX = p1.xOff + (v0 * cos(alfa_rad) * cos(phi_rad) * t);
		p1.posY = p1.yOff + (v0 * sin(alfa_rad) * t) - 0.5*g*pow(t, 2);
		p1.posZ = p1.zOff + (v0 * cos(alfa_rad) * sin(phi_rad) * t);
	}
	
	fprintf(file, "%f %f %f %f\n", p1.posX, p1.posY, p2.posX, p2.posY);

	glutPostRedisplay();
	glutTimerFunc(step, update, val+1);
}

void resize(int width, int height)
{
	glViewport(0, 0, width, height);
	glMatrixMode( GL_PROJECTION );

	GLfloat aspect = (GLfloat)width / (GLfloat)height;

	if ( !width )
		width++;

	glLoadIdentity();
    glOrtho(-(LL*1.1), LL*1.1, -(HH*1.1), HH*1.1, 0.1f, 100.0f);
}

void procedure()
{
	glClear( GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT );

	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();
	gluLookAt
	(
		 10.0f,  9.0f,  10.0f,
		 0.0f,  gnd,   0.0f,
		 0.0f,  1.0f,  0.0f
	);

	glPushMatrix();
		glColor3f( 0.22, 0.38, 0.55 );
		glTranslatef( p1.posX, p1.posY, p1.posZ );
		glRotatef( 90.0f, 1.0f, 0.0f, 0.0f );
		glRotatef( 20 * t, 0.0, 0.0f, 1.0f );
		glutWireSphere( p1.radius, p1.segments, p1.rings );
	glPopMatrix();

	glBegin( GL_TRIANGLES );
		glColor3f( 0.22, 0.55, 0.38 );
		glVertex3f( -p_size, gnd, -p_size );
		glVertex3f( -p_size, gnd,  p_size );
		glVertex3f(  p_size, gnd, -p_size );

		glVertex3f(  p_size, gnd,  p_size );
		glVertex3f( -p_size, gnd,  p_size );
		glVertex3f(  p_size, gnd, -p_size );
	glEnd();

	glBegin( GL_LINES );
		// x axis
		glColor3f( 1.0f, 0.0f, 0.0f );
		glVertex3f( 0.0f, 0.0f, 0.0f );
		glVertex3f( a_size, 0.0f, 0.0f );

		// y axis
		glColor3f( 0.0f, 1.0f, 0.0f );
		glVertex3f( 0.0f, 0.0f, 0.0f );
		glVertex3f( 0.0f, a_size, 0.0f );

		// z axis
		glColor3f( 0.0f, 0.0f, 1.0f );
		glVertex3f( 0.0f, 0.0f, 0.0f );
		glVertex3f( 0.0f, 0.0f, a_size );
	glEnd();

	glutSwapBuffers();
}

void screenSize()
{
	LL = d;
	HH = 2 * (((pow(v0, 2) * pow(sin(alfa_rad), 2)) / (2 * g)) + h0);

	if ( LL >= HH )
	{
		XNPix = 1080;
		YNPix = XNPix * HH / LL;
	}
	else
	{
		YNPix = 640;
		XNPix = YNPix * LL / HH;
	}
}

int main (int argc, char *argv[])
{
	file = fopen("data6.tmp", "w");

	if ( argc > 1 )
	{
		v0 		= atof(argv[1]);
		alfa 	= atof(argv[2]);
		phi		= atof(argv[3]);
		h0 		= atof(argv[4]);
	}

	alfa_rad = alfa * (M_PI / 180);
	phi_rad = phi * (M_PI / 180);

	p1.posX = p1.xOff = p1StartX;
	p1.posY = p1.yOff = h0;
	p1.posZ = p1.zOff = 0.0f;

	p2.posX = p2.xOff = p2StartX;
	p2.posY = p2.yOff = gnd;

	d = calcDist();

	p1.posX = p1.xOff = p1StartX;
	p1.posY = p1.yOff = h0;

	p2.posX = p2.xOff = p2StartX;
	p2.posY = p2.yOff = gnd;

	screenSize();

	glutInit(&argc, argv);
	glutInitDisplayMode( GLUT_DOUBLE );
	glutInitWindowSize( XNPix, YNPix );
	glutInitWindowPosition(200, 150);
	glutCreateWindow("OpenGL: Triangle");
	glutDisplayFunc(procedure);
	glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
	glutReshapeFunc(resize);

	old = (float)(glutGet( GLUT_ELAPSED_TIME ) * 0.001);

	glutTimerFunc(step, update, 0);

	glClearDepth(1.0f);

	glEnable( GL_LIGHTING );
	glEnable( GL_COLOR_MATERIAL );
	glEnable( GL_DEPTH_TEST );

	glDepthFunc(GL_LEQUAL);

	glColorMaterial( GL_FRONT_AND_BACK, GL_EMISSION );
	glutMainLoop();

	fclose(file);

	return 0;
}
