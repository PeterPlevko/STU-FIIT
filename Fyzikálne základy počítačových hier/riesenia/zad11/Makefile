CC	= gcc  -std=gnu99  -Wall  -c
LD	= gcc  -std=gnu99  -Wall
OPT	= -O2
INC	=
LLFLAGS	= -lm -lGL -lGLU -lglut

BIN	= i.x

$(BIN):	biliard.o  dalsia_zrazka.o  Makefile
	$(LD) $(OPT)  biliard.o  dalsia_zrazka.o  $(LLFLAGS) -o $(BIN)

biliard.o:  biliard.c  pocty.h  Makefile
	$(CC) $(INC) $(OPT) biliard.c

dalsia_zrazka.o:  dalsia_zrazka.c  pocty.h  Makefile
	$(CC) $(INC) $(OPT) dalsia_zrazka.c

#  Prikaz  make clean  vymaze vsetky subory s priponami  .o  a subor i.x .
#  Obcas sa to moze zist, ale moze to viest ku nestastnemu zmazaniu niecoho,
#  tak tuto funcnost radsej vykomentuvam.

#clean:
#	rm   *.o  i.x
