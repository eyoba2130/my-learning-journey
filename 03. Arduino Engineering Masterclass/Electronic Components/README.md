# Chapter 3: Electronic Components and Their Functions

A practical guide to the most common components in electronic circuits: what each one does, how to choose it, how to use it, and how to test it.

## Table of Contents

- [3.1 Resistors](#31-resistors)
- [3.2 Capacitors](#32-capacitors)
- [3.3 Diodes](#33-diodes)
- [3.4 LEDs](#34-leds)
- [3.5 Transistors](#35-transistors)
- [3.6 MOSFETs](#36-mosfets)
- [3.7 Voltage Regulators](#37-voltage-regulators)
- [3.8 Relays](#38-relays)
- [3.9 Switches and Push Buttons](#39-switches-and-push-buttons)
- [3.10 Integrated Circuits (ICs)](#310-integrated-circuits-ics)
- [3.11 Reading Component Datasheets](#311-reading-component-datasheets)
- [3.12 Component Identification and Testing](#312-component-identification-and-testing)
- [Quick Reference](#quick-reference)
- [Review Questions](#review-questions)

## Learning Objectives

After this chapter you should be able to:

- Name the common electronic components and explain what each one does.
- Calculate resistor values for LEDs, voltage dividers, and transistor bases.
- Choose between a BJT, a MOSFET, and a relay for switching a load.
- Pick the right voltage regulator and estimate its heat dissipation.
- Read a datasheet and find the ratings that matter.
- Identify and test components with a multimeter.

---

## 3.1 Resistors

**Function:** limit current, divide voltage, and set bias points. Measured in ohms (Ω).

### Key formulas

| Rule | Formula |
|------|---------|
| Ohm's law | `V = I × R` |
| Power | `P = V × I = I² × R = V² / R` |
| Series | `R_total = R1 + R2 + ...` |
| Parallel | `1/R_total = 1/R1 + 1/R2 + ...` |
| Voltage divider | `Vout = Vin × R2 / (R1 + R2)` |

### Types

- **Fixed:** carbon film, metal film (more accurate), wire-wound (high power).
- **Variable:** potentiometer, trimmer, rheostat.
- **Sensor resistors:** thermistor (temperature), LDR (light).

### Color code (4-band)

| Color | Digit | | Color | Digit |
|-------|-------|-|-------|-------|
| Black | 0 | | Blue | 6 |
| Brown | 1 | | Violet | 7 |
| Red | 2 | | Grey | 8 |
| Orange | 3 | | White | 9 |
| Yellow | 4 | | Gold | ±5% |
| Green | 5 | | Silver | ±10% |

Bands: **digit, digit, multiplier, tolerance**. Example: yellow, violet, red, gold = 47 × 100 = **4.7 kΩ ±5%**.

> **Tip:** choose a power rating at least twice the calculated dissipation. A common through-hole resistor is rated 0.25 W.

---

## 3.2 Capacitors

**Function:** store energy in an electric field, block DC, pass AC, smooth voltage, and set timing. Measured in farads (F), usually µF, nF, or pF.

### Key formulas

| Rule | Formula |
|------|---------|
| Parallel | `C_total = C1 + C2 + ...` |
| Series | `1/C_total = 1/C1 + 1/C2 + ...` |
| RC time constant | `τ = R × C` (about 63% charged after one τ) |
| Reactance | `Xc = 1 / (2π f C)` |

### Types

| Type | Polarized? | Typical use |
|------|-----------|-------------|
| Ceramic | No | Decoupling, high-frequency filtering |
| Electrolytic | **Yes** | Power supply smoothing, bulk storage |
| Tantalum | **Yes** | Compact, stable bulk capacitance |
| Film | No | Audio, timing, high-voltage applications |

### Common uses

- **Decoupling:** place a 100 nF ceramic capacitor close to each IC's power pins.
- **Filtering:** smooth rectified voltage in power supplies.
- **Coupling:** pass AC signals while blocking DC.
- **Timing:** combine with a resistor in oscillators and delay circuits.

> **Warning:** electrolytic capacitors can fail violently if connected backwards or over-voltage. Always check polarity and use a voltage rating well above the circuit voltage.

---

## 3.3 Diodes

**Function:** allow current in **one direction only** (anode to cathode).

- Silicon diode forward voltage drop: about **0.6 to 0.7 V**.
- Schottky diode forward drop: about **0.2 to 0.4 V**, and it switches fast.
- The cathode is marked with a **stripe** on the body.

### Common types

| Type | Example | Use |
|------|---------|-----|
| Rectifier | 1N4001-1N4007 | Convert AC to DC |
| Signal | 1N4148 | Fast switching, logic |
| Schottky | 1N5819 | Low-loss rectification, power supplies |
| Zener | 1N47xx series | Voltage reference, simple regulation (works in reverse breakdown) |
| Flyback (freewheeling) | 1N4007 | Protect against voltage spikes from coils |

### Rectifier configurations

- **Half-wave:** one diode.
- **Full-wave bridge:** four diodes, using both halves of the AC wave.

---

## 3.4 LEDs

**Function:** a light-emitting diode that glows when current flows in the forward direction.

### Always use a series resistor

```
R = (V_supply - V_forward) / I_LED
```

**Example:** 5 V supply, red LED (Vf about 2 V), 20 mA:
`R = (5 - 2) / 0.020 = 150 Ω`. A 220 Ω resistor is a common safe choice.

### Typical forward voltages

| Color | Vf (approx.) |
|-------|--------------|
| Red | 1.8 - 2.2 V |
| Green | 2.0 - 3.3 V |
| Blue / White | 3.0 - 3.4 V |

### Polarity

- **Anode (+):** longer leg.
- **Cathode (-):** shorter leg, flat edge on the body.

> Several LEDs can be wired in series (add their Vf values) or in parallel, but each parallel branch should have its own resistor.

---

## 3.5 Transistors

**Function:** amplify signals or act as an electronically controlled switch. This section covers the **bipolar junction transistor (BJT)**.

### Structure

- Types: **NPN** and **PNP**.
- Pins: **Base (B), Collector (C), Emitter (E)**.
- A small base current controls a larger collector current: `Ic = β × Ib` (in the active region).

### As a switch

- **Cutoff:** no base current, transistor is off.
- **Saturation:** enough base current, transistor is fully on.

**Example:** switch a 100 mA load from a 5 V logic pin with an NPN transistor.

- Required base current for saturation: about `Ic / 10 = 10 mA` (a safe rule of thumb).
- `Rb = (5 V - 0.7 V) / 10 mA ≈ 430 Ω`, so a 390 Ω to 470 Ω resistor works.

### Common parts

| Part | Type | Notes |
|------|------|-------|
| 2N2222 / BC547 / 2N3904 | NPN | General purpose |
| 2N2907 / BC557 / 2N3906 | PNP | General purpose |

> Add a **flyback diode** across any inductive load (motor, relay coil) driven by a transistor.

---

## 3.6 MOSFETs

**Function:** a voltage-controlled switch or amplifier. The gate controls the current flow almost without drawing current.

### Pins

**Gate (G), Drain (D), Source (S).**

### Types

- **N-channel:** most common; switches the low side of a load.
- **P-channel:** used for high-side switching.

### Key specifications

| Parameter | Meaning |
|-----------|---------|
| `Vgs(th)` | Gate threshold voltage where conduction begins |
| `Rds(on)` | On-resistance (lower means less heat) |
| `Id` | Maximum drain current |
| `Vds` | Maximum drain-source voltage |

### Practical notes

- Use a **logic-level MOSFET** (such as IRLZ44N) when driving the gate directly from 3.3 V or 5 V. A standard MOSFET (such as IRF540) may not turn on fully at 5 V.
- Add a **pull-down resistor** (10 kΩ) from gate to source so the MOSFET stays off while the controller starts up.
- A small series gate resistor (100 Ω) reduces ringing.
- MOSFETs are **static sensitive**. Handle with care.

### BJT vs MOSFET

| | BJT | MOSFET |
|---|-----|--------|
| Control | Current (base) | Voltage (gate) |
| Switching loss | Higher | Lower (low `Rds(on)`) |
| Best for | Small loads, analog amplifiers | Motors, LED strips, power switching |

---

## 3.7 Voltage Regulators

**Function:** provide a stable output voltage despite changes in input voltage or load.

### Linear regulators

- Examples: **7805** (5 V), **7812** (12 V), **AMS1117-3.3** (3.3 V).
- Simple and quiet, but waste the voltage difference as heat:

```
P_heat = (V_in - V_out) × I_load
```

**Example:** 12 V in, 5 V out, 500 mA gives `7 V × 0.5 A = 3.5 W`. That needs a heat sink.

- **Dropout voltage:** the minimum difference between input and output needed to regulate. LDO (low dropout) types need much less.
- **LM317 (adjustable):** `Vout = 1.25 × (1 + R2 / R1)`.

### Switching regulators

- **Buck (step-down)**, **boost (step-up)**, and **buck-boost** converters.
- Efficiency is typically 80-95%, so they run cooler, but they are noisier.

### Good practice

- Add input and output capacitors as recommended in the datasheet.
- Make sure the input voltage stays above `V_out + dropout`.

---

## 3.8 Relays

**Function:** an electrically operated switch that isolates a low-power control circuit from a high-power load.

### Parts

- **Coil:** energized to move the contacts.
- **Contacts:** **COM** (common), **NO** (normally open), **NC** (normally closed).

### Contact configurations

| Type | Meaning |
|------|---------|
| SPST | Single pole, single throw |
| SPDT | Single pole, double throw (COM, NO, NC) |
| DPDT | Double pole, double throw |

### How to drive a relay

1. Match the **coil voltage** (5 V, 12 V, 24 V).
2. Drive the coil through a **transistor or MOSFET**, since a microcontroller pin cannot supply enough current.
3. Add a **flyback diode** across the coil to absorb the voltage spike when it turns off.
4. Check the **contact rating** (for example 10 A at 250 VAC) against your load.

> **Safety:** mains voltage is dangerous. Keep high-voltage wiring separated from low-voltage electronics, and use proper enclosures.

**Solid-state relays (SSR)** have no moving parts, switch silently, and last longer, but cost more and need heat management.

---

## 3.9 Switches and Push Buttons

**Function:** make or break a connection manually.

### Switch types

| Type | Description |
|------|-------------|
| SPST | On/off |
| SPDT | Selects between two paths |
| DPDT | Switches two circuits at once |
| Toggle / slide / rocker | Common mechanical styles |

### Push buttons

- **Momentary:** active only while pressed.
- **Latching:** stays in position until pressed again.
- **NO** (normally open) or **NC** (normally closed).

### Using buttons with microcontrollers

- Use a **pull-up or pull-down resistor** so the input never floats (10 kΩ is typical, or use the internal pull-up).
- **Debounce** the signal. Mechanical contacts bounce for a few milliseconds, which can register as multiple presses. Fix it with a small capacitor (about 100 nF) or in software.

---

## 3.10 Integrated Circuits (ICs)

**Function:** many components (transistors, resistors, capacitors) miniaturized on one chip.

### Common IC families

| Family | Example | Purpose |
|--------|---------|---------|
| Timer | **555** | Oscillators, pulse generation, delays |
| Operational amplifier | LM358, LM741 | Amplifiers, filters, comparators |
| Digital logic | 74HC00, 74HC04, 74HC595 | Gates, shift registers |
| Microcontroller | ATmega328P, ESP32 | Programmable control |
| Regulator | 7805, LM317 | Power regulation |

### Packages

- **DIP:** through-hole, easy for prototyping and breadboards.
- **SOIC, QFP, QFN, BGA:** surface-mount types for compact boards.

### Pin numbering

Find the **notch or dot** on the package. Pin 1 is next to it, and numbers go **counter-clockwise** when viewed from above.

> Always add a **100 nF decoupling capacitor** between VCC and GND close to every IC.

---

## 3.11 Reading Component Datasheets

A datasheet is the official document that describes a component. Learn where to look:

| Section | What to check |
|---------|---------------|
| **Features / description** | Quick summary of what the part does |
| **Pin configuration** | Pinout and pin functions |
| **Absolute maximum ratings** | Limits that must **never** be exceeded (damage can occur) |
| **Recommended operating conditions** | Where the part works as specified |
| **Electrical characteristics** | Typical and guaranteed values (voltage, current, timing) |
| **Typical application circuit** | Reference design to copy |
| **Package dimensions** | Footprint for PCB design |
| **Graphs** | Behavior vs temperature, current, frequency |

### Tips

- "Absolute maximum" is not the same as "safe operating". Stay well inside the recommended range.
- Note **min / typ / max** columns. Design for the worst case, not the typical value.
- Always confirm you are reading the datasheet for the **exact part number and package**.

---

## 3.12 Component Identification and Testing

### Tools

- Digital **multimeter** (voltage, resistance, continuity, diode test).
- Optional: capacitance meter, LCR meter, component tester, oscilloscope.

### Identifying components

- **Resistors:** read the color bands or measure them.
- **Ceramic capacitors:** 3-digit code, for example `104` = 10 × 10⁴ pF = **100 nF**.
- **Electrolytic capacitors:** value and voltage printed on the can; a stripe marks the negative lead.
- **Diodes:** stripe marks the cathode.
- **Transistors and ICs:** read the part number printed on the body and look up the datasheet.

### Testing with a multimeter

| Component | How to test |
|-----------|-------------|
| Resistor | Remove from the circuit (or at least one lead), measure resistance, compare to the marked value |
| Capacitor | Discharge it first, then use capacitance mode; a shorted capacitor reads near 0 Ω |
| Diode | Use diode-test mode: about 0.6 V forward, "OL" in reverse |
| LED | Diode-test mode usually lights it faintly in the forward direction |
| BJT | Treat as two diodes: base-emitter and base-collector should each conduct in one direction only |
| Fuse / switch / wire | Continuity mode should beep when closed |
| Voltage regulator | Apply input power and measure the output |

### Safety and good habits

- Power off and discharge capacitors before testing in circuit.
- Never measure resistance on a powered circuit.
- Use ESD precautions with MOSFETs and ICs.
- Double-check polarity before applying power.

---

## Quick Reference

| Component | Main job | Remember |
|-----------|----------|----------|
| Resistor | Limit current, divide voltage | `V = I × R` |
| Capacitor | Store charge, filter, time | Mind polarity on electrolytics |
| Diode | One-way current | About 0.7 V drop (silicon) |
| LED | Light | Always use a series resistor |
| BJT | Switch, amplify | Needs base current and base resistor |
| MOSFET | Efficient switch | Use a logic-level type for 3.3 V / 5 V |
| Regulator | Stable voltage | Linear wastes heat, switching is efficient |
| Relay | Isolated switching | Needs a flyback diode and a driver |
| Switch | Manual control | Use pull-ups and debounce |
| IC | Complex function in one chip | Decoupling capacitor on every IC |

## Review Questions

1. A resistor has bands brown, black, orange, gold. What is its value and tolerance?
2. Calculate the resistor for a green LED (Vf = 2.2 V) powered from 9 V at 15 mA.
3. Two 10 µF capacitors are connected in series and then in parallel. What is the total capacitance in each case?
4. Why is a flyback diode needed across a relay coil?
5. A 7805 regulates 9 V down to 5 V at 300 mA. How much power does it dissipate as heat?
6. When would you choose a MOSFET over a BJT?
7. What does "logic-level MOSFET" mean?
8. What is the difference between "absolute maximum ratings" and "recommended operating conditions" in a datasheet?
9. How do you identify pin 1 on a DIP IC?
10. Describe how to test a diode with a multimeter.

## 

