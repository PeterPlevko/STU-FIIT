//Mozne stavy v akych sa prave klavesa moze nachadzat
int OFFSTATE = 0; //klavesa nebola stlacena alebo jej hodnota uz bola zobrazena na displeji
int PRESSEDSTATE = 1; //Klavesa je prave stlacena, z tohoto stavu sa moze presunut jedine do stavu released - uvolnena
int RELEASEDSTATE = 2; //Klavesa bola stlacena a uvolnena, odosle sa pozadovana hodnota na displej a vrati sa do povodneho OFFSTATE stavu

//Hodnoty po stlaceny klaves v matici
int values[4][4] = 
{                  
  {0x00,0x01,0x02,0x03},
  {0x04,0x05,0x06,0x07},
  {0x08,0x09,0x0a,0x0b},
  {0x0c,0x0d,0x0e,0x0f}
};

//Pomocna matica pre uchovanie stavov klaves, vyslani signalu az po pusteni tlacidla a vyslanie prave jedneho signalu
int button_states[4][4] = 
{                  
  {OFFSTATE, OFFSTATE, OFFSTATE, OFFSTATE},
  {OFFSTATE, OFFSTATE, OFFSTATE, OFFSTATE},
  {OFFSTATE, OFFSTATE, OFFSTATE, OFFSTATE},
  {OFFSTATE, OFFSTATE, OFFSTATE, OFFSTATE}
};

void capture_button(int current_state, int wanted_state, int previous_state) {
    byte current_row_states[4] = {B10000000, B01000000, B00100000, B00010000};
  	for (int row = 0; row < 4; row++) {
        PORTD &= B00000011;
        PORTD |= current_row_states[row];

        if(((PIND & 8) >> 3) == wanted_state && previous_state == button_states[row][0]){
            button_states[row][0] = current_state;  
            PORTD &= B11110111;
            return;
        }
        if(((PIND & 4) >> 2) == wanted_state && previous_state == button_states[row][1]){
            button_states[row][1] = current_state; 
            PORTD &= B11111011;
            return;
        }
        if(((PINC & 32) >> 5) == wanted_state && previous_state == button_states[row][2]){
            button_states[row][2] = current_state;  
            PORTC &= B11011111;
            return;
        }
        if(((PINC & 16) >> 4) == wanted_state && previous_state == button_states[row][3]){
            button_states[row][3] = current_state;  
            PORTC &= B11101111;
            return;  
        }
    }
  	
}

void setup()
{
    DDRD = B11110000;
    PORTD = 0xff;
    DDRB = B00111111;
    PORTB = 0xff;
    DDRC = B00000001;
    PORTC = 0xff;

    Serial.begin(9600);
}

void loop()
{
  capture_button(PRESSEDSTATE, 1, OFFSTATE);
  capture_button(RELEASEDSTATE, 0, PRESSEDSTATE);
  
  for (int row = 0; row < 4; row++)
  {
    for (int column = 0; column < 4; column++)
    {
      if (button_states[row][column] == RELEASEDSTATE) {
        number(values[row][column]);
        Serial.write(values[row][column]);
        button_states[row][column] = OFFSTATE;
      }
    }
  }
}

void number(int num) {
    switch(num) {
        case 0:
            light_led(B00000100, B00000000);//nula
            break;
        case 1:
            light_led(B00011111, B00000000);//jeden
            break;
        case 2:
            light_led(B00001000, B00000001);//dva
            break;
        case 3:
            light_led(B001010, B00000000);//tri
            break;
        case 4:
            light_led(B010011, B00000000);//styri
            break;
        case 5:
            light_led(B100010, B00000000);//pat
            break;
        case 6:
            light_led(B100000, B00000000);//sest
            break;
        case 7:
            light_led(B001111, B00000000);//sedem
            break;
        case 8:
            light_led(B000000, B00000000);//osem
            break;
        case 9:
            light_led(B000010, B00000000);//devat
            break;
        case 10:
            light_led(B000001, B00000000);//A
            break;
        case 11:
            light_led(B110000, B00000000);//b
            break;
        case 12:
            light_led(B100100, B00000001);//C
            break;
        case 13:
            light_led(B011000, B00000000);//d
            break;
        case 14:
            light_led(B100000, B00000001);//E
            break;
        case 15:
            light_led(B100001, B00000001);//F
            break;
        default:
            break;
  }
  
}

void light_led(byte value_b, byte value_c)
{
    PORTB = value_b;
    PORTC = value_c & B00001111;
}

/*
Moj kod bol opat otestovany na wokwi.com, s nasledovnym diagram.json suborom a kodom uvedenym vysie


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