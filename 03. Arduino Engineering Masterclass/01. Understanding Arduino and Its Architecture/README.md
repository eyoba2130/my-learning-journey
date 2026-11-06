# Understanding Arduino and Its Architecture

> **Chapter 1** of my Arduino learning notes: a beginner-friendly introduction to what Arduino is, how it works inside, and how to run your first program.

![Level](https://img.shields.io/badge/level-beginner-brightgreen)
![Platform](https://img.shields.io/badge/platform-Arduino%20Uno-00979D)
![Language](https://img.shields.io/badge/language-C%2FC%2B%2B-blue)

---

## Table of Contents

| # | Topic | What you will learn |
|---|-------|---------------------|
| 1.1 | [What is Arduino?](#11-what-is-arduino) | The platform, its purpose and why it is popular |
| 1.2 | [What is a Microcontroller?](#12-what-is-a-microcontroller) | CPU, memory and I/O on one chip |
| 1.3 | [Arduino Working Principle](#13-arduino-working-principle) | From writing code to running it on the board |
| 1.4 | [Input, Processing and Output](#14-input-processing-and-output) | The basic flow of every Arduino project |
| 1.5 | [Digital Pins and Analog Pins](#15-digital-pins-and-analog-pins) | HIGH/LOW signals and 0-1023 readings |
| 1.6 | [PWM (Pulse Width Modulation)](#16-pwm-pulse-width-modulation) | Faking analog output with duty cycle |
| 1.7 | [Arduino Memory](#17-arduino-memory-flash-sram-eeprom) | Flash, SRAM and EEPROM |
| 1.8 | [Programming Fundamentals](#18-arduino-programming-fundamentals) | `setup()`, `loop()` and key functions |
| 1.9 | [Power Supply Basics](#19-arduino-power-supply-basics) | USB, barrel jack, VIN and current limits |
| 1.10 | [Common Beginner Mistakes](#110-common-arduino-beginner-mistakes) | What goes wrong and how to fix it |
| 1.11 | [Practical Experiment: LED Blinking](#111-practical-experiment-led-blinking) | Your first circuit and sketch |
| 1.12 | [Chapter Review and Quiz](#112-chapter-review-and-quiz) | Summary and self-check questions |

---

## 1.1 What is Arduino?

Arduino is an open-source electronics platform made of easy-to-use hardware and software. It reads sensors, makes decisions in code and controls outputs such as LEDs and motors. It was created in Italy in 2005 for students.

**Why it is popular:** affordable, easy to learn, open source and backed by a large community. The Arduino IDE runs on Windows, macOS and Linux.

## 1.2 What is a Microcontroller?

A microcontroller is a tiny computer on a single chip. It contains a **CPU**, **memory** and **I/O ports**, and it is built to do one dedicated job. The Arduino Uno uses the **ATmega328P**.

| Microcontroller | Microprocessor |
|---|---|
| CPU, memory and I/O on one chip | CPU only; memory and I/O are external |
| Low power, low cost | Faster, uses more power |
| Runs one program, no OS | Runs an operating system |

## 1.3 Arduino Working Principle

1. **Write** a sketch in the Arduino IDE.
2. **Upload** it to the board over USB.
3. **Store**: the chip saves the program in Flash memory.
4. **Run**: `setup()` runs once, then `loop()` repeats forever while the board has power.

## 1.4 Input, Processing and Output

```
INPUT (sensors, buttons)  ->  PROCESSING (your code)  ->  OUTPUT (LEDs, motors, buzzer)
```

| Type | Examples | Function |
|---|---|---|
| Digital input | Push button, switch | `digitalRead()` |
| Analog input | Potentiometer, light or temperature sensor | `analogRead()` |
| Digital output | LED, relay, buzzer | `digitalWrite()` |
| PWM output | LED brightness, motor speed | `analogWrite()` |

## 1.5 Digital Pins and Analog Pins

| | Digital pins (D0-D13) | Analog pins (A0-A5) |
|---|---|---|
| Values | HIGH (5 V) or LOW (0 V) | 0 to 1023 (10-bit), for 0-5 V |
| Used for | Buttons, LEDs, relays | Sensors and knobs |
| Functions | `digitalRead()`, `digitalWrite()` | `analogRead()` |

Set the pin mode first with `pinMode()`. Pins D0 and D1 are used for USB serial communication.

## 1.6 PWM (Pulse Width Modulation)

PWM switches a pin ON and OFF very quickly. The **duty cycle** is the percentage of time the pin is ON, and it is used to dim LEDs and control motor speed. Use `analogWrite(pin, 0-255)` on pins marked `~` (3, 5, 6, 9, 10 and 11 on the Uno).

| analogWrite value | Duty cycle |
|---|---|
| 0 | 0% |
| 64 | 25% |
| 127 | 50% |
| 191 | 75% |
| 255 | 100% |

## 1.7 Arduino Memory (Flash, SRAM, EEPROM)

| Memory | Size (Uno) | Keeps data without power? | Use |
|---|---|---|---|
| Flash | 32 KB | Yes | Program code |
| SRAM | 2 KB | No | Variables while running |
| EEPROM | 1 KB | Yes | Saved settings (about 100,000 write cycles) |

## 1.8 Arduino Programming Fundamentals

```cpp
void setup() {
  // runs once at start
}

void loop() {
  // repeats forever
}
```

| Function | Purpose |
|---|---|
| `pinMode()` | Set a pin as INPUT or OUTPUT |
| `digitalWrite()` | Set a pin HIGH or LOW |
| `digitalRead()` | Read HIGH or LOW from a pin |
| `analogRead()` | Read 0-1023 from A0-A5 |
| `analogWrite()` | PWM output from 0 to 255 |
| `delay()` | Pause for a number of milliseconds |

## 1.9 Arduino Power Supply Basics

- **USB (5 V):** easiest option for learning and uploading code.
- **DC barrel jack:** recommended input of 7-12 V.
- **VIN / 5V pins:** VIN accepts 7-12 V; the 5V pin outputs 5 V.

| Limit | Value |
|---|---|
| Logic level | 5 V |
| Recommended current per I/O pin | 20 mA |
| Absolute maximum per I/O pin | 40 mA |

> **Warning:** never power a motor directly from a pin. Use a transistor or driver.

## 1.10 Common Arduino Beginner Mistakes

1. Using an LED without a resistor.
2. Selecting the wrong board or port.
3. Forgetting a semicolon `;`.
4. Forgetting `pinMode()`.
5. Loose or wrong wiring (check GND and pin numbers).
6. Powering a motor directly from a pin.

**Quick fixes:** read the error message, check board and port, re-check wiring, test with the Blink example, and use the Serial Monitor.

## 1.11 Practical Experiment: LED Blinking

**Components:** Arduino Uno, USB cable, 1 LED, 1 x 220 ohm resistor, 2 jumper wires, breadboard (optional).

**Circuit:** `Pin 13 -> 220 ohm resistor -> LED (long leg) -> GND`

```cpp
const int LED = 13;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, HIGH);  // LED ON
  delay(500);
  digitalWrite(LED, LOW);   // LED OFF
  delay(500);
}
```

**Result:** the LED turns ON for 0.5 s and OFF for 0.5 s, repeatedly. Try changing `delay(500)` to `delay(100)` to blink faster.

## 1.12 Chapter Review and Quiz

**Summary**
- Arduino is an open-source board plus easy software.
- A microcontroller packs CPU, memory and I/O on one chip.
- Digital pins give HIGH or LOW; analog pins read 0-1023.
- PWM fakes analog output with duty cycle (0-255).
- Flash holds code, SRAM holds variables, EEPROM holds settings.

**Quiz**
1. Which chip does the Arduino Uno use?
2. What are the two logic levels of a digital pin?
3. What value range does `analogWrite()` accept?
4. Which keeps data without power: Flash or SRAM?
5. Why must an LED have a resistor?

<details>
<summary>Show answers</summary>

1. ATmega328P
2. HIGH (5 V) and LOW (0 V)
3. 0 to 255
4. Flash (EEPROM also keeps data)
5. It limits current to protect the LED and the pin

</details>

---

## Repository Contents

```
.
├── README.md                 # This file
└── blink/
    └── blink.ino             # LED blink sketch (section 1.11)
```

## Getting Started

1. Install the [Arduino IDE](https://www.arduino.cc/en/software).
2. Connect your Arduino Uno with a USB cable.
3. In **Tools**, choose the correct **Board** and **Port**.
4. Open `blink/blink.ino` and click **Upload**.

## Contributing

Suggestions and corrections are welcome. Open an issue or submit a pull request.

## License

Choose a license for your repository (for example MIT) and add a `LICENSE` file.