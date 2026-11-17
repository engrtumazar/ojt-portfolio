#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>
#include "Adafruit_TCS34725.h"
#include <LiquidCrystal_I2C.h>

// ---------------- PCA9685 ----------------
Adafruit_PWMServoDriver pca = Adafruit_PWMServoDriver(0x40);

// ---------------- LCD ----------------
LiquidCrystal_I2C lcd(0x27, 16, 2);

// ---------------- COLOR SENSOR ----------------
Adafruit_TCS34725 tcs = Adafruit_TCS34725(
  TCS34725_INTEGRATIONTIME_154MS,
  TCS34725_GAIN_16X
);

// ---------------- CHANNELS ----------------
#define BASE 0
#define SHOULDER 1
#define WRIST 2
#define GRIPPER 3

// ---------------- PWM ----------------
#define SERVOMIN 150
#define SERVOMAX 600

// ---------------- POSITIONS ----------------
int basePos = 90;
int shoulderPos = 50;
int wristPos = 90;
int gripperPos = 30;

// ---------------- CONVERT ----------------
int angleToPulse(int angle) {
  return map(angle, 0, 180, SERVOMIN, SERVOMAX);
}

// ---------------- SMOOTH MOVE ----------------
void smoothMove(int ch, int &cur, int target) {

  int stepDelay = 25;
  int stepSize  = 2;

  if (cur < target) {
    for (int i = cur; i <= target; i += stepSize) {
      pca.setPWM(ch, 0, angleToPulse(i));
      delay(stepDelay);
    }
  } else {
    for (int i = cur; i >= target; i -= stepSize) {
      pca.setPWM(ch, 0, angleToPulse(i));
      delay(stepDelay);
    }
  }

  pca.setPWM(ch, 0, angleToPulse(target));
  cur = target;
}

// ---------------- SETUP ----------------
void setup() {
  Serial.begin(9600);

  pca.begin();
  pca.setPWMFreq(50);

  lcd.init();
  lcd.backlight();

  if (!tcs.begin()) {
    lcd.setCursor(0,0);
    lcd.print("Sensor Error");
    while (1);
  }

  lcd.setCursor(0,0);
  lcd.print("System Ready");

  goToCenter();
}

// ---------------- LOOP ----------------
void loop() {

  goToCenter();
  delay(1200);

  uint16_t r,g,b,c;
  tcs.getRawData(&r,&g,&b,&c);

  Serial.print("R: "); Serial.print(r);
  Serial.print(" G: "); Serial.print(g);
  Serial.print(" B: "); Serial.print(b);
  Serial.print(" C: "); Serial.println(c);

  lcd.clear();

  // ---------------- OBJECT DETECTION ----------------
  if (c < 80) {
    lcd.setCursor(0,0);
    lcd.print("No Object");
    return;
  }

  // ---------------- NORMALIZED COLOR ----------------
  float sum = r + g + b;
  float rn = r / sum;
  float gn = g / sum;
  float bn = b / sum;

  bool isRed   = (rn > gn && rn > bn && rn > 0.40);
  bool isGreen = (gn > rn && gn > bn && gn > 0.40);
  bool isBlue  = (bn > rn && bn > gn && bn > 0.20);

  if (!isRed && !isGreen && !isBlue) {
    lcd.setCursor(0,0);
    lcd.print("Unknown");
    return;
  }

  // ---------------- PICK ----------------
  gripObject();

  // ---------------- SORT ----------------
  if (isRed) {
    lcd.setCursor(0,0);
    lcd.print("Color: RED");
    moveToBin(30,100,120);
  }

  else if (isGreen) {
    lcd.setCursor(0,0);
    lcd.print("Color: GREEN");
    moveToBin(90,100,100);
  }

  else if (isBlue) {
    lcd.setCursor(0,0);
    lcd.print("Color: BLUE");
    moveToBin(150,100,80);
  }

  // ---------------- DROP ----------------
  releaseObject();

  // ---------------- RETURN ----------------
  goToCenter();
}

// ---------------- CENTER ----------------
void goToCenter() {
  smoothMove(BASE, basePos, 90);
  smoothMove(SHOULDER, shoulderPos, 50);
  smoothMove(WRIST, wristPos, 90);
  smoothMove(GRIPPER, gripperPos, 30);
}

// ---------------- GRIP ----------------
void gripObject() {
  smoothMove(GRIPPER, gripperPos, 0);
  delay(800);
}

// ---------------- RELEASE ----------------
void releaseObject() {
  smoothMove(GRIPPER, gripperPos, 30);
  delay(800);
}

// ---------------- MOVE WITH LIFT FIRST ----------------
void moveToBin(int b, int s, int w) {

  // 🔼 STEP 1: LIFT FIRST (avoid hitting sensor)
  smoothMove(SHOULDER, shoulderPos, 30); 
  smoothMove(WRIST, wristPos, 60);
  delay(300);

  // 🔁 STEP 2: ROTATE BASE
  smoothMove(BASE, basePos, b);
  delay(300);

  // 🔽 STEP 3: LOWER TO BIN
  smoothMove(SHOULDER, shoulderPos, s);
  smoothMove(WRIST, wristPos, w);
}