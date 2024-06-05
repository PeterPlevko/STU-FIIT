// tlacidla start a stop
int button_start = A2;
int button_stop  = A3;

// Hodnoty ON a OFF -> podla pripojenia ku katode alebo anode, tlacidlo ma byt aktivne v log. 0
int on = 0;
int off = 1;
int button_pressed = 0;

// Pomocna premma po stlaceni STOP
int stopped = 0;

// Zadane Premenne
int MIN10 = 0;
int MIN1  = 0;
int SEC10 = 0;
int SEC1  = 0;

// LED segmenty P1.0 - P1.7
int S7  = 8; //G
int S6  = 2; //F
int S5  = 3; //E
int S4  = 4; //D
int S3  = 5; //C
int S2  = 6; //B
int S1  = 7; //A
int DP  = 1; //DP

// DISP 1-4 pin
int DISP1 = 10;
int DISP2 = 11;
int DISP3 = 12;
int DISP4 = 13;

// 1 perioda = 1s/50hz = 20ms => 1 segment = 20/4 = 5ms
int freq = 50;
int segm = 4;
int delay_ms = 1000/(freq*segm);

// Pocitadlo sekund
int seconds = 3597;

void setup() {
    // tlacidla
    // Nastavenie pinov tlacidiel ako vstupne piny
    pinMode(button_start, INPUT_PULLUP);
    pinMode(button_stop, INPUT_PULLUP);
  
    // Nastavenie P1.0 az P1.7 ako vystupne piny
    pinMode(S7, OUTPUT);
    pinMode(S6, OUTPUT);
    pinMode(S5, OUTPUT);
    pinMode(S4, OUTPUT);
    pinMode(S3, OUTPUT);
    pinMode(S2, OUTPUT);
    pinMode(S1, OUTPUT);
    
    // Nastavenie DISP (lubovolne piny) ako vystupne piny
    pinMode(DISP1, OUTPUT);
    pinMode(DISP2, OUTPUT);
    pinMode(DISP3, OUTPUT);
    pinMode(DISP4, OUTPUT);
}

void loop(){
    
  if(stopped == 0){ 
      seconds += 1;
      if(seconds > 60*60 - 1){
        seconds = 0;
      }
  }

  for(int cycle = 0 ; cycle < freq ; cycle++){
    if(digitalRead(button_start) == button_pressed){
       	seconds = 0;
        stopped = 0;
    }
    
    if(digitalRead(button_stop) == button_pressed){
        stopped = 1;
    }

    MIN10 = (seconds/600)%10;
    MIN1  = (seconds/60)%10;
    SEC10 = (seconds%60)/10;
    SEC1  = seconds%10;

    number(SEC1);
    digitalWrite(DISP4, 1);
    delay(delay_ms);
    digitalWrite(DISP4, 0);

    number(SEC10);
    digitalWrite(DISP3, 1);
    delay(delay_ms);
    digitalWrite(DISP3, 0);

    number(MIN1);
    digitalWrite(DISP2, 1);
    delay(delay_ms);
    digitalWrite(DISP2, 0);

    number(MIN10);
    digitalWrite(DISP1, 1);
    delay(delay_ms);
    digitalWrite(DISP1, 0); 
  }
}

void number(int num) {
  switch(num) {
    case 0:
      light_led(on, on, on, on, on, on, off);//nula
      break;
    case 1:
      light_led(off, on, on, off, off, off, off);//jeden
      break;
    case 2:
      light_led(on, on, off, on, on, off, on);//dva
      break;
    case 3:
      light_led(on, on, on, on, off, off, on);//tri
      break;
    case 4:
      light_led(off, on, on, off, off, on, on);//styri
      break;
    case 5:
      light_led(on, off, on, on, off, on, on);//pat
      break;
    case 6:
      light_led(on, off, on, on, on, on, on);//sest
      break;
    case 7:
      light_led(on, on, on, off, off, off, off);//sedem
      break;
    case 8:
      light_led(on, on, on, on, on, on, on);//osem
      break;
    case 9:
      light_led(on, on, on, on, off, on, on);//devat
      break;
    default:
      break;
  }
  
}

void light_led(int V1, int V2, int V3, int V4, int V5, int V6, int V7)
{
  digitalWrite(S1, V1);
  digitalWrite(S2, V2);
  digitalWrite(S3, V3);
  digitalWrite(S4, V4);
  digitalWrite(S5, V5);
  digitalWrite(S6, V6);
  digitalWrite(S7, V7);
}

/*
Overene a funkcne riesenie na wokwi.com s diagram.json suborom uvedenym nizsie pre arduino uno
{
  "version": 1,
  "author": "Anonymous maker",
  "editor": "wokwi",
  "parts": [
    { "type": "wokwi-arduino-uno", "id": "uno", "top": 193.34, "left": -129.34, "attrs": {} },
    {
      "type": "wokwi-membrane-keypad",
      "id": "keypad1",
      "top": -170.53,
      "left": -41.9,
      "attrs": {}
    },
    { "type": "wokwi-7segment", "id": "sevseg1", "top": 249.84, "left": -225.94, "attrs": {} }
  ],
  "connections": [
    [ "uno:2", "keypad1:C2", "green", [ "v0" ] ],
    [ "uno:3", "keypad1:C1", "green", [ "v0" ] ],
    [ "uno:4", "keypad1:R4", "green", [ "v0" ] ],
    [ "uno:5", "keypad1:R3", "green", [ "v0" ] ],
    [ "uno:6", "keypad1:R2", "green", [ "v0" ] ],
    [ "uno:7", "keypad1:R1", "green", [ "v0" ] ],
    [ "uno:5V", "sevseg1:COM.1", "red", [ "v37.86", "h-5.66" ] ],
    [ "uno:8", "sevseg1:D", "green", [ "v-73.64", "h-309.33", "v294", "h54.67" ] ],
    [ "uno:9", "sevseg1:E", "green", [ "v-66.3", "h-293.33", "v280.67", "h34.67" ] ],
    [ "uno:10", "sevseg1:G", "green", [ "v-57.64", "h-1.16" ] ],
    [ "uno:11", "sevseg1:F", "green", [ "v-47.64", "h-0.33" ] ],
    [ "uno:12", "sevseg1:A", "green", [ "v-38.97", "h-2.16" ] ],
    [ "uno:13", "sevseg1:B", "green", [ "v-31.64", "h-3.99" ] ],
    [ "uno:A0", "sevseg1:C", "green", [ "v16.53", "h-262.99" ] ],
    [ "keypad1:C3", "uno:A5", "green", [ "v20.94", "h46.09", "v213.53", "h-29.68" ] ],
    [ "keypad1:C4", "uno:A4", "green", [ "v13.28", "h44.25", "v226.73", "h-45.59" ] ]
  ]
}
*/