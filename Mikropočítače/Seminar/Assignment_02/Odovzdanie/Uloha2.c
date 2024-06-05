//HD-A103
/*
       A -
       F| |B
       G -
       E| |C
       D - . DP
*/


int pinA = 2;
int pinB = 3;
int pinC = 4;
int pinD = 5;
int pinE = 6;
int pinF = 7;
int pinG = 8;
int pinDP = 9;

void setup() {
  // initialize the digital pins as outputs.
  pinMode(pinA, OUTPUT);
  pinMode(pinB, OUTPUT);
  pinMode(pinC, OUTPUT);
  pinMode(pinD, OUTPUT);
  pinMode(pinE, OUTPUT);
  pinMode(pinF, OUTPUT);
  pinMode(pinG, OUTPUT);
  pinMode(pinDP, OUTPUT);
}

void show_number(int pinAval, int pinBval, int pinCval, int pinDval, int pinEval, int pinFval, int pinGval, int pinDPval) {
  digitalWrite(pinA, pinAval);
  digitalWrite(pinB, pinBval);
  digitalWrite(pinC, pinCval);
  digitalWrite(pinD, pinDval);
  digitalWrite(pinE, pinEval);
  digitalWrite(pinF, pinFval);
  digitalWrite(pinG, pinGval);
  digitalWrite(pinDP, pinDPval);
  delay(1000);
}

void loop() {
  show_number(HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, LOW, LOW); //0
  show_number(LOW, HIGH, HIGH, LOW, LOW, LOW, LOW, LOW); //1
  show_number(HIGH, HIGH, LOW, HIGH, HIGH, LOW, HIGH, LOW); //2
  show_number(HIGH, HIGH, HIGH, HIGH, LOW, LOW, HIGH, LOW); //3
  show_number(LOW, HIGH, HIGH, LOW, LOW, HIGH, HIGH, LOW); //4
  show_number(HIGH, LOW, HIGH, HIGH, LOW, HIGH, HIGH, LOW); //5
  show_number(HIGH, LOW, HIGH, HIGH, HIGH, HIGH, HIGH, LOW); //6
  show_number(HIGH, HIGH, HIGH, LOW, LOW, LOW, LOW, LOW); //7
  show_number(HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, HIGH, LOW); //8
  show_number(HIGH, HIGH, HIGH, HIGH, LOW, HIGH, HIGH, LOW); //9
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH); //Decimal point
}
