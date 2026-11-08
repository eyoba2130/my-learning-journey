# 🔌 Chapter 2: Arduino Nano Hardware Architecture and Pin Configuration

> Part of the **⚡ Arduino Engineering Masterclass** · Module 1: *Understanding Arduino and Architecture*

![Board](https://img.shields.io/badge/board-Arduino%20Nano-00979D)
![MCU](https://img.shields.io/badge/MCU-ATmega328P-blue)
![Logic](https://img.shields.io/badge/logic%20level-5V-orange)
![Level](https://img.shields.io/badge/level-beginner-brightgreen)

The Arduino Nano is a small, breadboard-friendly board built around the **ATmega328P**. This chapter explains what is on the board, what every pin does, and the electrical limits you must respect so you never damage the board or your components.

---

## 📑 Table of Contents

| # | Topic |
|---|-------|
| 2.1 | [Arduino Nano Board Overview](#21-arduino-nano-board-overview) |
| 2.2 | [ATmega328P Microcontroller](#22-atmega328p-microcontroller) |
| 2.3 | [Digital Pins (D0–D13)](#23-digital-pins-d0d13) |
| 2.4 | [Analog Pins (A0–A7)](#24-analog-pins-a0a7) |
| 2.5 | [PWM Pins](#25-pwm-pins) |
| 2.6 | [TX and RX Pins](#26-tx-and-rx-pins) |
| 2.7 | [SPI Pins](#27-spi-pins) |
| 2.8 | [I2C Pins](#28-i2c-pins) |
| 2.9 | [Reset Pin](#29-reset-pin) |
| 2.10 | [VIN, 5V, 3.3V and GND](#210-vin-5v-33v-and-gnd) |
| 2.11 | [Pin Current and Voltage Limitations](#211-pin-current-and-voltage-limitations) |
| 2.12 | [Arduino Nano and Arduino Uno Comparison](#212-arduino-nano-and-arduino-uno-comparison) |
| 2.13 | [Practical Pin Identification](#213-practical-pin-identification) |
| ✅ | [Chapter Summary](#-chapter-summary) · [Quiz](#-review-quiz) · [Checklist](#-chapter-checklist) |

---

## 2.1 Arduino Nano Board Overview

The classic Nano is a compact board (about **18 × 45 mm**) with 30 pins in two rows, designed to plug straight into a breadboard or be soldered onto a custom PCB.

### 📋 Key specifications

| Feature | Value |
|---------|-------|
| Microcontroller | ATmega328P (8-bit AVR) |
| Operating (logic) voltage | 5 V |
| Recommended input voltage (VIN) | 7–12 V |
| Digital I/O pins | 14 (D0–D13) |
| PWM pins | 6 (D3, D5, D6, D9, D10, D11) |
| Analog input pins | 8 (A0–A7) |
| Clock speed | 16 MHz |
| Flash memory | 32 KB (about 2 KB used by the bootloader) |
| SRAM | 2 KB |
| EEPROM | 1 KB |
| DC current per I/O pin | 20 mA recommended, 40 mA absolute maximum |
| USB connector | Mini-B on the classic Nano (newer variants may use Micro-USB or USB-C) |

> 💡 **Clones:** many low-cost Nano boards use a **CH340** USB-to-serial chip instead of the original **FT232RL**. They work the same for programming, but you may need to install a CH340 driver on your computer. Always check your own board's documentation.

### 🧱 Main parts of the board

| Part | Function |
|------|----------|
| ATmega328P | The microcontroller that runs your sketch |
| USB connector | Power and programming |
| USB-to-serial chip | Converts USB data to the UART signals the ATmega328P understands |
| Voltage regulator | Converts VIN (7–12 V) to a stable 5 V |
| 16 MHz crystal/resonator | Provides the clock signal |
| Reset button | Restarts the program |
| LEDs | Power (PWR), serial activity (TX/RX) and a user LED on **D13** |
| ICSP header | Direct programming and SPI access (6 pins) |

---

## 2.2 ATmega328P Microcontroller

The ATmega328P is the "brain" of the Nano. It is an 8-bit AVR RISC microcontroller that integrates everything needed on a single chip:

```
┌──────────────────── ATmega328P ────────────────────┐
│  CPU (AVR 8-bit, 16 MHz)                           │
│  ├─ Flash 32 KB ......... program storage          │
│  ├─ SRAM 2 KB ........... variables at run time    │
│  └─ EEPROM 1 KB ......... saved settings           │
│                                                    │
│  Peripherals                                       │
│  ├─ Digital I/O ports (B, C, D)                    │
│  ├─ 10-bit ADC (analog to digital converter)       │
│  ├─ 3 Timers/Counters (generate PWM and timing)    │
│  ├─ UART (serial), SPI and I2C (TWI) interfaces    │
│  └─ External and pin-change interrupts             │
└────────────────────────────────────────────────────┘
```

| Block | What it does for you |
|-------|----------------------|
| **Flash** | Holds your compiled sketch and the bootloader (kept without power) |
| **SRAM** | Holds variables while the program runs (cleared at power off) |
| **EEPROM** | Holds small saved settings (kept without power) |
| **ADC (10-bit)** | `analogRead()` returns values from **0 to 1023** |
| **Timers** | Produce PWM (`analogWrite()`), and drive `delay()`, `millis()` and `tone()` |
| **UART / SPI / I2C** | Communicate with the PC, sensors, displays and radios |

> 🧠 The Nano exposes **8 analog inputs** because it uses a surface-mount version of the chip. A DIP-package ATmega328P (as on the Uno) exposes only 6.

---

## 2.3 Digital Pins (D0–D13)

A digital pin works in one of two states:

| State | Voltage | Value in code |
|-------|---------|---------------|
| HIGH | about 5 V | `HIGH` / `1` |
| LOW | about 0 V | `LOW` / `0` |

### Modes

```cpp
pinMode(pin, OUTPUT);        // drive LEDs, relays (through a driver), etc.
pinMode(pin, INPUT);         // read a signal (needs an external pull-up or pull-down)
pinMode(pin, INPUT_PULLUP);  // read a button using the internal pull-up resistor
```

### Example: button on D2 and LED on D13

```cpp
const int BUTTON = 2;
const int LED = 13;

void setup() {
  pinMode(BUTTON, INPUT_PULLUP);  // pressed = LOW
  pinMode(LED, OUTPUT);
}

void loop() {
  digitalWrite(LED, digitalRead(BUTTON) == LOW ? HIGH : LOW);
}
```

### ⚠️ Special notes

- **D0 (RX) and D1 (TX)** are shared with USB serial. Avoid using them for other purposes while uploading code or using the Serial Monitor.
- **D2 and D3** support external interrupts (`attachInterrupt()`).
- **D13** is connected to the on-board LED, so an external load on D13 can affect that LED.
- The analog pins **A0–A5** can also work as digital pins (numbered D14–D19).

---

## 2.4 Analog Pins (A0–A7)

Analog pins read a voltage between **0 V and 5 V** (by default) and convert it to a number with the 10-bit ADC.

```
value = analogRead(A0);        // 0 to 1023
voltage = value * (5.0 / 1023.0);
```

| Reading | Voltage |
|---------|---------|
| 0 | 0 V |
| 512 | about 2.5 V |
| 1023 | about 5 V |

### Example: read a potentiometer

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  int raw = analogRead(A0);
  float volts = raw * (5.0 / 1023.0);
  Serial.print("Raw: ");
  Serial.print(raw);
  Serial.print("  Volts: ");
  Serial.println(volts, 2);
  delay(200);
}
```

### ⚠️ Special notes

- **A6 and A7 are analog input only.** They cannot be used as digital pins, cannot output a signal, and have no internal pull-up.
- **A4 and A5** are also the I2C pins (SDA and SCL); do not use them for sensors if you need I2C.
- The **AREF** pin sets an external reference voltage for the ADC (advanced use).
- Never apply more than 5 V to an analog pin.

---

## 2.5 PWM Pins

PWM (Pulse Width Modulation) simulates an analog output by switching a pin ON and OFF very fast. The Nano has **6 PWM pins**, marked with a **~** on many boards:

| PWM pin | Timer | Default frequency |
|:-------:|:-----:|:-----------------:|
| D3 | Timer2 | about 490 Hz |
| D5 | Timer0 | about 980 Hz |
| D6 | Timer0 | about 980 Hz |
| D9 | Timer1 | about 490 Hz |
| D10 | Timer1 | about 490 Hz |
| D11 | Timer2 | about 490 Hz |

`analogWrite(pin, value)` accepts values from **0 to 255**:

| Value | Duty cycle |
|:-----:|:----------:|
| 0 | 0% |
| 64 | 25% |
| 127 | 50% |
| 191 | 75% |
| 255 | 100% |

### Example: fade an LED on D9

```cpp
const int LED = 9;

void setup() {
  pinMode(LED, OUTPUT);
}

void loop() {
  for (int v = 0; v <= 255; v++) { analogWrite(LED, v); delay(5); }
  for (int v = 255; v >= 0; v--) { analogWrite(LED, v); delay(5); }
}
```

> ⚠️ Timer0 is also used by `millis()` and `delay()`, so changing its frequency affects timing. The `Servo` library uses Timer1 and disables PWM on D9 and D10.

---

## 2.6 TX and RX Pins

**UART** is the serial interface used to talk to the computer and to modules such as Bluetooth and GPS.

| Pin | Name | Function |
|:---:|:----:|----------|
| D1 | **TX** | Transmit data from the Nano |
| D0 | **RX** | Receive data into the Nano |

**Wiring rule:** always cross the connection.

```
Nano TX (D1) ───► RX of module
Nano RX (D0) ◄─── TX of module
Nano GND     ─────  GND of module   (common ground)
```

```cpp
void setup() {
  Serial.begin(9600);        // start UART at 9600 baud
  Serial.println("Hello from Nano");
}
void loop() {}
```

### ⚠️ Notes

- The USB connection uses the same UART, so a device on D0/D1 can block uploads. Disconnect it while uploading.
- To keep the hardware serial free for debugging, use the `SoftwareSerial` library on other pins for a second device.
- Both sides must use the same baud rate and the same logic voltage (5 V vs 3.3 V).

---

## 2.7 SPI Pins

**SPI** is a fast, 4-wire serial bus used by SD cards, displays, and the **nRF24L01** radio (used later in the RC project).

| Signal | Nano pin | Role |
|--------|:--------:|------|
| **SS** (Slave Select / CS) | D10 | Selects which device is active |
| **MOSI** | D11 | Master Out, Slave In |
| **MISO** | D12 | Master In, Slave Out |
| **SCK** | D13 | Clock |

The same signals are also available on the **ICSP header**.

```cpp
#include <SPI.h>

void setup() {
  SPI.begin();
  pinMode(10, OUTPUT);       // chip select
}
void loop() {}
```

> ⚠️ SPI uses D10–D13, so D13 (and its on-board LED) is shared with the clock line. Each extra SPI device needs its own chip-select pin.

---

## 2.8 I2C Pins

**I2C** (also called TWI) is a 2-wire bus that lets many devices share the same two lines, each with a unique address. Typical devices: **MPU6050**, OLED/LCD displays, real-time clocks.

| Signal | Nano pin |
|--------|:--------:|
| **SDA** (data) | A4 |
| **SCL** (clock) | A5 |

```
Nano A4 (SDA) ──┬── SDA of all devices
Nano A5 (SCL) ──┼── SCL of all devices
5V / GND ───────┴── power for all devices
```

- I2C lines need **pull-up resistors**. Most sensor modules already include them.
- Use the **Wire** library.

### 🔎 I2C scanner (finds device addresses)

```cpp
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
  Serial.println("Scanning...");
  for (byte addr = 1; addr < 127; addr++) {
    Wire.beginTransmission(addr);
    if (Wire.endTransmission() == 0) {
      Serial.print("Device found at 0x");
      Serial.println(addr, HEX);
    }
  }
  Serial.println("Done.");
}

void loop() {}
```

> 💡 An MPU6050 usually appears at address `0x68` (or `0x69` if its AD0 pin is high).

---

## 2.9 Reset Pin

The **RST** pin restarts the microcontroller. It is **active LOW**: pulling it to GND resets the board.

- The on-board **reset button** connects RST to GND.
- There are two RST pins on the Nano header; they are connected together.
- Uploading a sketch also triggers a reset through the USB-to-serial chip so the bootloader can run.

**Unexpected resets** are a classic problem (covered in Chapter 11). Common causes:

| Cause | Fix |
|-------|-----|
| Motor or servo drawing current from the Nano's 5 V | Use a separate supply and share GND |
| Voltage drops from weak or thin wires | Use thicker wires, add a decoupling capacitor |
| Electrical noise on RST | Keep RST wiring short; avoid floating connections |

---

## 2.10 VIN, 5V, 3.3V and GND

### 🔋 Power pins

| Pin | Direction | Description |
|-----|:---------:|-------------|
| **VIN** | Input | Unregulated supply, **7–12 V recommended**, goes through the on-board regulator |
| **5V** | Output (or input) | Regulated 5 V. An output when powered through USB or VIN. Can be used as an input for a clean regulated 5 V supply |
| **3V3** | Output | 3.3 V output with **limited current** (about 50 mA on the original Nano; check your board) |
| **GND** | Reference | Ground (0 V). Several GND pins are provided |

### ⚡ Powering options

```
USB (5 V) ───────────────► 5V rail ─► Nano
7–12 V battery ─► VIN ─► [regulator] ─► 5V rail ─► Nano
Regulated 5 V ─► 5V pin ────────────► Nano   (bypasses the regulator)
```

### ✅ Rules

- Do **not** feed power into VIN and 5V at the same time from different sources.
- When using separate supplies (for example for motors), **connect the grounds together**.
- Do not power motors, servos or other high-current loads from the 3V3 pin or from an I/O pin.
- Check the current capability of the 5V pin for your power source before adding many modules.

---

## 2.11 Pin Current and Voltage Limitations

| Parameter | Limit |
|-----------|-------|
| Logic level | **5 V** |
| Voltage on any I/O pin | 0 V to about 5 V (never exceed VCC + 0.5 V) |
| Recommended current per I/O pin | **20 mA** |
| Absolute maximum per I/O pin | **40 mA** |
| Total current through all pins | about 200 mA maximum for the chip |
| 3V3 pin | about 50 mA (original Nano) |
| VIN recommended | 7–12 V |

### 🧮 Example: LED resistor

For a red LED (about 2 V forward voltage) at 10 mA from a 5 V pin:

```
R = (5 V − 2 V) / 0.010 A = 300 Ω   →  use 330 Ω (standard value)
```

### 🚫 Do not

- Connect a motor, relay coil, buzzer or high-power LED directly to a pin. Use a **transistor, MOSFET or driver**.
- Connect 5 V signals to **3.3 V devices** without a level shifter or voltage divider.
- Short an output pin to GND or 5 V.
- Apply a voltage to a pin while the Nano is unpowered.

---

## 2.12 Arduino Nano and Arduino Uno Comparison

Both boards use the **same microcontroller** (ATmega328P), so code written for one almost always runs on the other. The differences are mostly physical.

| Feature | Arduino Nano | Arduino Uno |
|---------|:------------:|:-----------:|
| Microcontroller | ATmega328P | ATmega328P |
| Clock speed | 16 MHz | 16 MHz |
| Flash / SRAM / EEPROM | 32 KB / 2 KB / 1 KB | 32 KB / 2 KB / 1 KB |
| Logic level | 5 V | 5 V |
| Digital I/O | 14 | 14 |
| PWM pins | 6 | 6 |
| Analog inputs | **8 (A0–A7)** | **6 (A0–A5)** |
| Size | **about 18 × 45 mm** | about 68.6 × 53.4 mm |
| USB connector | Mini-B (varies by version) | USB Type-B |
| Power jack | **No** (use VIN or USB) | Yes (barrel jack) |
| Breadboard use | **Plugs in directly** | Needs jumper wires |
| Shields | Not compatible | Compatible |
| Best for | Compact projects, RC, drones, custom PCBs | Learning, prototyping with shields |

**Which one to use?**

- 🧪 **Uno** for learning and quick experiments (easy headers, shield support).
- 🚁 **Nano** for small, lightweight builds such as the RC transmitter/receiver and the drone controller later in the masterclass.

---

## 2.13 Practical Pin Identification

### 🗺️ Classic Nano pinout (USB connector at the top)

```
              ┌──────[ USB ]──────┐
       D13 ── │ ●               ● │ ── D12
       3V3 ── │ ●               ● │ ── D11 ~ (MOSI)
       REF ── │ ●               ● │ ── D10 ~ (SS)
   A0 (D14) ─ │ ●               ● │ ── D9  ~
   A1 (D15) ─ │ ●               ● │ ── D8
   A2 (D16) ─ │ ●               ● │ ── D7
   A3 (D17) ─ │ ●               ● │ ── D6  ~
 A4 (SDA)   ─ │ ●               ● │ ── D5  ~
 A5 (SCL)   ─ │ ●               ● │ ── D4
   A6 (in)  ─ │ ●               ● │ ── D3  ~ (INT1)
   A7 (in)  ─ │ ●               ● │ ── D2    (INT0)
        5V  ─ │ ●               ● │ ── GND
       RST  ─ │ ●               ● │ ── RST
       GND  ─ │ ●               ● │ ── D0 (RX)
       VIN  ─ │ ●               ● │ ── D1 (TX)
              └───────────────────┘
        (SCK = D13, MISO = D12, MOSI = D11)
```

### 🗂️ Complete pin function table

| Pin | Functions |
|:---:|-----------|
| D0 | RX (UART) |
| D1 | TX (UART) |
| D2 | Digital, external interrupt INT0 |
| D3 | Digital, **PWM**, external interrupt INT1 |
| D4 | Digital |
| D5 | Digital, **PWM** |
| D6 | Digital, **PWM** |
| D7 | Digital |
| D8 | Digital |
| D9 | Digital, **PWM** |
| D10 | Digital, **PWM**, SPI **SS** |
| D11 | Digital, **PWM**, SPI **MOSI** |
| D12 | Digital, SPI **MISO** |
| D13 | Digital, SPI **SCK**, on-board LED |
| A0–A3 | Analog input, or digital D14–D17 |
| A4 | Analog input / digital D18 / I2C **SDA** |
| A5 | Analog input / digital D19 / I2C **SCL** |
| A6, A7 | **Analog input only** |

> ⚠️ Pin positions can vary between manufacturers and clones. Always confirm with the labels printed on **your** board.

### 🧪 Practical exercises

**Exercise 1: Identify the parts**
1. Locate the ATmega328P, USB connector, reset button, crystal, regulator and ICSP header.
2. Find the power pins (VIN, 5V, 3V3, GND) and write down their positions.

**Exercise 2: Find pins with a multimeter**
1. Power the Nano through USB.
2. Set the multimeter to DC voltage and place the black probe on GND.
3. Measure the **5V** pin (expected about 5 V) and the **3V3** pin (expected about 3.3 V).
4. Use continuity mode to confirm that all GND pins are connected.

**Exercise 3: Test every digital pin**

```cpp
// Blinks pins D2 to D12 one after another (connect an LED + 330 ohm resistor to each pin you test)
void setup() {
  for (int p = 2; p <= 12; p++) pinMode(p, OUTPUT);
}

void loop() {
  for (int p = 2; p <= 12; p++) {
    digitalWrite(p, HIGH); delay(200);
    digitalWrite(p, LOW);
  }
}
```

**Exercise 4: Read all analog pins**

```cpp
void setup() {
  Serial.begin(9600);
}

void loop() {
  for (int i = 0; i < 8; i++) {
    Serial.print("A");
    Serial.print(i);
    Serial.print("=");
    Serial.print(analogRead(i));
    Serial.print("  ");
  }
  Serial.println();
  delay(500);
}
```

Touch A0 to 5V and then to GND with a jumper wire and watch the values change (floating pins give unstable readings, which is normal).

**Exercise 5: Find an I2C device.** Connect an MPU6050 to A4/A5, 5V and GND, then run the [I2C scanner](#-i2c-scanner-finds-device-addresses).

---

## 📝 Chapter Summary

- The Nano uses the **ATmega328P** (16 MHz, 32 KB Flash, 2 KB SRAM, 1 KB EEPROM) and runs at **5 V logic**.
- It has **14 digital pins**, **6 PWM pins** (D3, D5, D6, D9, D10, D11) and **8 analog inputs** (A6 and A7 are input only).
- **D0/D1** are UART, **D10–D13** are SPI, and **A4/A5** are I2C.
- **VIN** takes 7–12 V; the **5V** pin is regulated; the **3V3** pin gives only a small current.
- Respect the limits: **20 mA recommended / 40 mA maximum per pin**, and never connect motors or relays directly to a pin.
- The Nano and the Uno share the same MCU. The Nano is smaller, has 2 extra analog inputs and has no power jack.

---

## ❓ Review Quiz

1. How many PWM pins does the Nano have, and which are they?
2. Which Nano pins are used for I2C?
3. Which two analog pins cannot be used as digital pins?
4. What is the recommended and the maximum current per I/O pin?
5. What is the recommended input voltage range for VIN?
6. Name the four SPI pins and their Nano pin numbers.
7. Why should D0 and D1 be avoided while uploading code?
8. Give two differences between the Nano and the Uno.

<details>
<summary>📖 Show answers</summary>

1. Six: D3, D5, D6, D9, D10, D11.
2. A4 (SDA) and A5 (SCL).
3. A6 and A7.
4. 20 mA recommended, 40 mA absolute maximum.
5. 7–12 V.
6. SS = D10, MOSI = D11, MISO = D12, SCK = D13.
7. They are shared with the USB serial (UART) connection, so a connected device can interfere with the upload.
8. For example: the Nano is smaller (about 18 × 45 mm), has 8 analog inputs instead of 6, has no power jack, and does not accept shields.

</details>

---

## ✅ Chapter Checklist

- [ ] I can name all major parts of the Nano board
- [ ] I can list the ATmega328P specifications
- [ ] I can identify D0–D13 and A0–A7 on my board
- [ ] I know which pins support PWM
- [ ] I know the TX/RX, SPI and I2C pins by heart
- [ ] I understand VIN, 5V, 3V3 and GND, and how to power the board safely
- [ ] I know the current and voltage limits of the pins
- [ ] I ran the pin test, analog read and I2C scanner sketches
- [ ] I can explain the differences between the Nano and the Uno

---

## 📁 Suggested Files for This Chapter

```text
Chapter2_Arduino_Nano/
├── README.md
├── Codes/
│   ├── ch02_button_led/
│   ├── ch02_analog_read/
│   ├── ch02_pwm_fade/
│   ├── ch02_i2c_scanner/
│   └── ch02_pin_test/
└── Circuits/
    └── ch02_led_resistor_wiring.png
```

---

## 🛡️ Safety Reminder

⚠️ Disconnect power before changing wiring, never exceed 5 V on any pin, use a resistor with every LED, and use drivers for motors and relays.

<p align="center">
  ⬅️ <a href="../README.md">Back to the Masterclass</a>
</p>