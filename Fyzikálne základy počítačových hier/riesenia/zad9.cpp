#include <stdio.h>
#include <math.h>

FILE *file1 = NULL;
FILE *file2 = NULL;
FILE *file3 = NULL;

const float dt  =  0.005f;
const float g   =  9.81f;
const float max =  10.0f;

float C     =  0.5f;
float S     =  1.0f;
float t     =  0.0f;
float m     =  1.0f;
float So    =  1.3f;
float T     =  295.0f;
float e     =  2.71828f;
float M     =  0.029f;
float R     =  8.314f;
float z_0   =  10000.0f;
float v_0   = -5.0f;
float v_inf =  0.0f;
float k_0   =  0.0f;

void AnalyticalMethod()
{
    float v_t1, v_t2;

    t = 0;

    while( t < max )
    {
        t += dt;
        v_t1 = v_0 - (v_inf * tanh((g * t) / v_inf));
        v_t2 = 1 - (v_0 / v_inf) * tanh((g * t) / v_inf);

        fprintf(file1, "%f %f\n", t, -(v_t1 / v_t2));
    }
}

void EulerMethod()
{
    float v_this, v_next;

    t = 0;

    v_this = v_next = v_0;

    while( t < max )
    {
        t += dt;
    
        v_next = v_this + dt * (-g + (k_0 * pow(v_this, 2)));
        v_this = v_next;

        fprintf(file2, "%f %f\n", t, -v_next);
    }
}

void EulerMethodNew()
{
    float v_this, v_next, k, fv, z_next;

    t = 0;

    v_this = v_next = v_0;
    k = (M * g) / (R * T);

    while( t < max )
    {
        t += dt;
    
        fv = -g - ((k_0 * pow(e, -(z_0 * k)) * (v_this*abs(v_this))));
        v_next = v_this + (dt * fv);
        v_this = v_next;

        z_next = z_0 + dt * v_this;
        z_0 = z_next;

        fprintf(file3, "%f %f\n", t, -v_next);
    }
}

int main (int argc , char **argv)
{
    file1 = fopen("data9_1.tmp", "w");
    file2 = fopen("data9_2.tmp", "w");
    file3 = fopen("data9_3.tmp", "w");

    v_inf = sqrt((2.0f * (m * g)) / (So * (S * C)));
    k_0   = (0.5f * (So * (C * S))) / m;

    EulerMethod();
    AnalyticalMethod();
    EulerMethodNew();

    fclose(file1);
    fclose(file2);
    fclose(file3);

    return 0;
}