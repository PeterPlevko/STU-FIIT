int led0 = 2;
int led1 = 3;
int led2 = 4;
int led3 = 5;
int led4 = 6;
int led5 = 7;
int led6 = 8;
int led7 = 9;

int first_minute = 0;

void setup() {
  // initialize the digital pins as outputs.
  pinMode(led0, OUTPUT);
  pinMode(led1, OUTPUT);
  pinMode(led2, OUTPUT);
  pinMode(led3, OUTPUT);
  pinMode(led4, OUTPUT);
  pinMode(led5, OUTPUT);
  pinMode(led6, OUTPUT);
  pinMode(led7, OUTPUT);
  
  //  0 s -  12 s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  
  // 12 s -  24 s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  
  // 24 s -  36 s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  
  // 36 s -  48 s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  
  // 48 s -  60 s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
}

void show_number(int led0val, int led1val, int led2val, int led3val, int led4val, int led5val, int led6val, int led7val, int timeout) {
  digitalWrite(led0, led0val);
  digitalWrite(led1, led1val);
  digitalWrite(led2, led2val);
  digitalWrite(led3, led3val);
  digitalWrite(led4, led4val);
  digitalWrite(led5, led5val);
  digitalWrite(led6, led6val);
  digitalWrite(led7, led7val);
  delay(timeout);
}

void loop() {
  if(first_minute == 0){
    delay(60000);
    first_minute = 1;
  }

  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, HIGH, 1000); //PB0
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, HIGH, LOW, 1000); //PB1
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, LOW, HIGH, LOW, LOW, 1000); //PD2
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, LOW, HIGH, LOW, LOW, LOW, 1000); //PD3
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, LOW, HIGH, LOW, LOW, LOW, LOW, 1000); //PD4
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, LOW, HIGH, LOW, LOW, LOW, LOW, LOW, 1000); //PD5
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(LOW, HIGH, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD6
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
  show_number(HIGH, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 1000); //PD7
  show_number(LOW, LOW, LOW, LOW, LOW, LOW, LOW, LOW, 500); //lights off 0.5s
}
