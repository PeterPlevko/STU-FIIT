#include <stdio.h>
#include <math.h>

// makro na vypocet stvorca cisla
#define SQ(x) ((x)*(x))

typedef struct s_point {

	double x;
	double y;

} S_POINT;

// globalna premenna -- max. 100 uchytnych bodov
S_POINT points[100];

// globalna premenna -- pocet uchytnych bodov
int numPoints = 0;

// pomocna funkcia pre vypocet vzdialenosti medzi pomocnymi bodmi i a j
double vzdialenost(int i, int j)
{
	// dopis telo funkcie
	return sqrt(SQ(points[i - 1].x - points[j - 1].x) + SQ(points[i - 1].y - points[j - 1].y));
}

int main()
{
	// sem napis svoje riesenie
	int n;
	scanf("%d", &n);

	// nacitanie uchytnych bodov
	for (int i = 0; i < n; i++) {
		scanf("%lf %lf", &points[i].x, &points[i].y);
	}

	// nacitanie a spracovanie poradovych cisel do konca vstupu
	int pt1, pt2;
	double dlzka = 0;
	scanf("%d", &pt1);
	while (scanf("%d", &pt2) > 0) {
		dlzka += vzdialenost(pt1, pt2);
		numPoints++;
		pt1 = pt2;
	}

	// vypis vysledku
	printf("%.4lf", dlzka);
	printf(" %.4lf\n", dlzka / numPoints);

	return 0;
}