# Modeling and Simulation

## Chapter 2: Modeling and Simulation Approaches

This chapter shows how simulation models are classified (by time, state behavior, and randomness) and compares the three classical worldviews used to build discrete-event simulations.

## Table of Contents

- [Learning Objectives](#learning-objectives)
- [2.1 Classification of Models](#21-classification-of-models)
- [2.2 Static and Dynamic Models](#22-static-and-dynamic-models)
- [2.3 Continuous and Discrete Models](#23-continuous-and-discrete-models)
- [Hybrid Models](#hybrid-models)
- [2.4 Deterministic and Stochastic Models](#24-deterministic-and-stochastic-models)
- [2.5 Simulation Worldviews](#25-simulation-worldviews)
- [Comparison of the Three Approaches](#comparison-of-the-three-approaches)
- [Reading Assignment: Continuous Simulation](#reading-assignment-continuous-simulation)
- [Practice Quizzes](#practice-quizzes)
- [Key Takeaways](#key-takeaways)

## Learning Objectives

After this chapter you should be able to:

- Classify models by time, state behavior, and randomness.
- Distinguish static from dynamic models.
- Compare continuous and discrete-event models.
- Explain deterministic and stochastic behavior.
- Compare the three discrete-event simulation worldviews.

---

## 2.1 Classification of Models

Simulation models can be classified along **three main dimensions**:

| Classification basis | Categories | Main question |
|----------------------|------------|---------------|
| **Time** | Static or dynamic | Does the model represent changes over time? |
| **State behavior** | Continuous or discrete | How do the system's state variables change? |
| **Randomness** | Deterministic or stochastic | Does the model include random inputs or behavior? |

---

## 2.2 Static and Dynamic Models

### Static models

- Represent a system **without explicitly describing its evolution over time**.
- May represent a snapshot, or a calculation in which time is not a model variable.
- *Example:* calculating the total classroom capacity of a university from the number of rooms and seats per room.

### Dynamic models

- Represent **how a system's state changes over time**.
- Their description includes rules governing changes and interactions between components.
- *Example:* simulating how the number of students waiting at a registration office changes throughout the day.

---

## 2.3 Continuous and Discrete Models

### Continuous models

- State variables can change **continuously** over time.
- *Example:* the level of liquid flowing into or out of a tank.

### Discrete (discrete-event) models

- State variables change **at identifiable event times** and remain unchanged between those events.
- Simulation time itself can still be continuous: events need not occur at whole-number times.
- *Example:* the number of students in a registration queue changes when a student arrives or begins service.

| | Continuous | Discrete-event |
|---|-----------|----------------|
| State changes | Smoothly, all the time | Only at event times |
| Between events | State keeps changing | State stays constant |
| Example | Liquid level in a tank | Registration queue length |

---

## Hybrid Models

A hybrid model **combines both types of behavior**: it includes continuous and discrete dynamics.

*Example: a temperature-controlled room*

- Room temperature evolves **continuously**.
- A thermostat switches heating on or off at **threshold events**.

---

## 2.4 Deterministic and Stochastic Models

### Deterministic models

- Contain **no random variation** in their specified behavior.
- Given the same initial conditions and inputs, they produce the same results.
- *Example:* every registration transaction takes exactly five minutes, and students arrive at fixed intervals.

### Stochastic models

- Include **random variables or probabilistic behavior**.
- Activity durations, for example, may be sampled from a probability distribution instead of being a constant.
- Different random draws can produce different results.
- *Example:* student arrival times and registration durations vary randomly.

> **Important:** this distinction concerns **randomness, not time**. Both deterministic and stochastic models can describe systems that evolve over time.

---

## 2.5 Simulation Worldviews

For discrete-event simulation, the three classical worldviews are:

1. Event-scheduling approach
2. Process-interaction approach
3. Activity-scanning approach

They differ mainly in whether the model is organized around **events**, **entity life cycles**, or **activities and their enabling conditions**.

### 2.5.1 Event-Scheduling Approach

Focuses on **events that change the system state**.

- A **future event list (FEL)** stores scheduled events in time order.
- The simulation advances its clock to the next event, executes that event's logic, updates the state, and schedules more events when necessary.

**Typical execution sequence:**

1. Initialize the simulation clock and state variables.
2. Schedule the initial events.
3. Select the earliest event from the future event list.
4. Advance the clock to its scheduled time.
5. Execute the event and update the system.
6. Schedule any resulting future events.
7. Repeat until the stopping condition is reached.

*Example, registration office events:* student arrival and registration completion. An arrival may increase the queue length, while a completion may release a registration officer and allow another student to receive service.

### 2.5.2 Process-Interaction Approach

Describes the **life cycle of an entity** as it moves through the system.

- A process is a time-ordered sequence of events, activities, and delays, including requests for resources.
- Processes interact when they compete for limited resources.

**Illustrative student process:**

```
Arrive
  |
Request a registration officer
  |
Wait if all officers are busy
  |
Receive registration service
  |
Release the officer
  |
Leave
```

> **Note:** the modeler describes the student's **complete journey** rather than writing separate routines for every event. Waiting occurs when a required resource is occupied by another process.

### 2.5.3 Activity-Scanning Approach

Focuses on **activities and the conditions that allow them to begin**.

- The simulation checks these conditions and executes activities whose conditions are satisfied.

**Illustrative activity: Start registration**

| Part | Content |
|------|---------|
| **Conditions** | At least one student is waiting **AND** a registration officer is available |
| **Actions** | Remove a student from the queue, assign the officer, begin registration |

> **Note:** in a basic implementation, the clock advances in **time steps** and activity conditions are scanned.
>
> The related **three-phase approach** combines event scheduling with conditional activity scanning: it processes scheduled events first, and then checks enabled activities.

---

## Comparison of the Three Approaches

| Approach | Main focus | Registration-office interpretation |
|----------|------------|------------------------------------|
| **Event scheduling** | Events and their effects on state | What happens when a student arrives or finishes registration? |
| **Process interaction** | An entity's life cycle | What steps does each student follow? |
| **Activity scanning** | Activities and enabling conditions | Under what conditions can registration begin? |

---

## Reading Assignment: Continuous Simulation

The slides assign **continuous simulation** as a reading topic and give no further content. A starting point:

- Continuous simulation represents continuously evolving state variables, often with differential equations.
- Tank example: `dV/dt = q_in - q_out`. With a net inflow of 2 liters/minute and `V(0) = 10`, the volume is `V(t) = 10 + 2t`, so `V = 20` liters at 5 minutes.
- Numerical solvers approximate the solution when no analytic solution exists.

---

## Practice Quizzes

### Quiz 1

1. A university calculates its total classroom capacity from the number of rooms and seats per room. Why is this a static model?
   A. It includes random inputs
   B. It does not explicitly represent changes over time
   C. Its state changes at event times
   D. It follows each student's journey
2. A registration queue changes only when a student arrives or begins service. Which model best represents it?
   A. Continuous  B. Static  C. Discrete-event  D. Hybrid
3. A modeler describes a student's complete journey rather than writing separate routines for each event. Which approach is being used?
   A. Activity scanning  B. Event scheduling  C. Continuous modeling  D. Process interaction
4. A ____________ model does not explicitly describe changes over time.
5. Explain the difference between deterministic and stochastic models.

### Quiz 2

1. Which model represents changes over time?
   A. Static  B. Dynamic  C. Deterministic  D. A & B  E. None
2. Which is a static model?
   A. Tracking queue length  B. Simulating student arrivals  C. Calculating total classroom capacity  D. Tracking room temperature
3. Which model contains probabilistic behavior?
   A. Static  B. Deterministic  C. Stochastic  D. Continuous only
4. Which approach follows an entity's complete journey?
   A. Activity scanning  B. Process interaction  C. Event scheduling  D. Static modeling
5. What are the three main approaches to discrete-event simulation? Define each.

<details>
<summary>Answers (try the quizzes first)</summary>

**Quiz 1:** 1. B, 2. C, 3. D, 4. static, 5. A deterministic model has no random variation, so the same inputs always give the same results. A stochastic model includes random variables, so different random draws can give different results.

**Quiz 2:** 1. B (Dynamic), 2. C, 3. C, 4. B, 5. Event scheduling (events and their effects on state, using a future event list), process interaction (the life cycle of an entity through the system), and activity scanning (activities and the conditions that allow them to begin).

</details>

---

## Key Takeaways

- Models are classified by **time** (static/dynamic), **state behavior** (continuous/discrete), and **randomness** (deterministic/stochastic).
- Static models ignore time evolution; dynamic models describe how state changes over time.
- Discrete-event models change state only at event times; continuous models change continuously; hybrid models combine both.
- Deterministic vs stochastic is about randomness, **not** about time.
- The three DES worldviews organize the model around **events**, **entity life cycles**, or **activities and conditions**.

## License

For educational use.