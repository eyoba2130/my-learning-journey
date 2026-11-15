# Simulation and Modeling

## Chapter 1: Basic Concepts and Tools

An introduction to what models and simulations are, how to judge their quality, how systems are described and classified, the main simulation approaches, and how to choose a simulation tool.

## Table of Contents

- [Learning Objectives](#learning-objectives)
- [1. System, Model and Simulation](#1-system-model-and-simulation)
- [2. Why Model Instead of Experimenting Directly?](#2-why-model-instead-of-experimenting-directly)
- [3. The Modeling and Simulation Workflow](#3-the-modeling-and-simulation-workflow)
- [4. Four Quality Concepts](#4-four-quality-concepts)
- [5. System State](#5-system-state)
- [6. Classifying Systems](#6-classifying-systems)
- [7. Simulation Approaches](#7-simulation-approaches)
- [8. Deterministic vs Stochastic Models](#8-deterministic-vs-stochastic-models)
- [9. Evolution of Simulation Software](#9-evolution-of-simulation-software)
- [10. Selecting a Simulation Tool](#10-selecting-a-simulation-tool)
- [Key Takeaways](#key-takeaways)
- [Review Questions](#review-questions)

## Learning Objectives

After this chapter you should be able to:

- Define modeling and simulation and explain their relationship.
- Distinguish validity, credibility, tractability, and verification.
- Describe system state and identify causal systems.
- Classify static, dynamic, discrete, continuous, deterministic, and stochastic systems.

---

## 1. System, Model and Simulation

| Term | Definition |
|------|------------|
| **System** | Interacting components considered together within a defined boundary |
| **Model** | A purpose-specific, simplified representation of a system |
| **Simulation** | Experimenting with a model to understand behavior or evaluate alternatives |

- A simulation may represent behavior over time, or investigate scenarios without explicitly modeling time.
- **Relationship:** real system -> model -> experiments -> evidence for decisions.

### What does a model contain?

| Element | Meaning | Example |
|---------|---------|---------|
| **Entities** | Objects of interest | Students, network packets |
| **Attributes** | Properties of entities | Software needs, packet size |
| **Resources** | Facilities with limited capacity | Computers |
| **Activities** | Operations that take time | A computer session |
| **Events** | Occurrences that can change the state | An arrival or departure |

---

## 2. Why Model Instead of Experimenting Directly?

- Experiments on the real system may be costly, disruptive, unsafe, or impossible.
- A proposed system may not exist yet.
- A model allows controlled comparison of alternative designs.
- Results depend on assumptions: **simulation is evidence, not a guarantee**.

> **Class prompt:** Which laboratory details matter for studying waiting time?

---

## 3. The Modeling and Simulation Workflow

1. Define the decision and the performance measures.
2. Develop a conceptual model and collect appropriate data.
3. Implement the computational model.
4. **Verify** the implementation and **validate** it for the intended use.
5. Design experiments, run the model, and analyze uncertainty.
6. Document assumptions, communicate limitations, and revise when needed.

---

## 4. Four Quality Concepts

Each one asks a different question.

| Concept | Question |
|---------|----------|
| **Verification** | Did we implement the conceptual model correctly? |
| **Validity** | Is the model adequate for its intended purpose? |
| **Credibility** | Do decision-makers have justified confidence in the model and results? |
| **Tractability** | Can we build, execute, and analyze it with the available resources? |

A model can be correctly coded but unrealistic, or realistic but too costly to run.

### Verification: build the model correctly

- Check code and equations against the conceptual specification.
- Use unit tests, event traces, and simplified cases with known results.
- Test **invariants**: occupied computers must stay between 0 and capacity.
- Check **boundary cases**: no arrivals, one computer, zero waiting space.
- *Example defect:* releasing the same computer twice creates an impossible capacity.

### Validity and validation: fitness for purpose

- **Validity** is the adequacy of the model for a specified application.
- **Validation** is the process of assessing that adequacy using evidence.
- Compare simulated outputs with relevant observations where available.
- Ask domain experts to assess assumptions and expected behavior.
- Evaluate more than one measure: waiting time, queue length, and utilization.
- Validation for capacity planning does not automatically validate failure prediction.

### Credibility: justified confidence

- Support confidence with transparent assumptions, validation evidence, and documentation.
- Explain uncertainty, limitations, and the range of intended application.
- Involve stakeholders, but do not treat their agreement as proof of validity.
- An attractive animation alone does not establish model quality.

### Tractability: practical manageability

- Consider development time, memory, execution time, and analytical complexity.
- More detail can make a model harder to calibrate, debug, and interpret.
- Use the **simplest representation that adequately answers the question**.
- *Example:* model session lengths rather than every keystroke for capacity planning.
- Trade-off: sufficient realism versus available computational and human resources.

### Activity: diagnose model quality

| Case | Main concern |
|------|--------------|
| A. Code is error-free, but all students are assumed to need identical session times | **Validity** |
| B. The model agrees with observations, but staff cannot inspect its assumptions | **Credibility** |
| C. A highly detailed model requires six months for one scenario | **Tractability** |
| D. A departure event sometimes produces negative queue lengths | **Verification** |

---

## 5. System State

- **State** summarizes the relevant information about the system at a given time.
- Together with the model rules and future inputs, it supports determining future behavior.
- In a stochastic model, future behavior also involves random inputs or transitions.
- A state is usually a **collection of variables**, not a single output statistic.
- Choosing state variables depends on the model purpose and assumptions.

### Choosing a sufficient laboratory state

- Possible state: queue order, busy/free status, and scheduled completion times.
- Queue length alone may be insufficient to determine the next departure.
- For general session durations, remaining service information may be needed.
- **State variable:** number waiting now.
- **Performance measure:** average waiting time over the experiment.

> **Discussion:** Why is average waiting time not a complete system state? (Hint: it is a summary of past results and does not tell you what happens next.)

### Causal systems

A **causal system** does not depend on actual future inputs. Its output at a given time is determined by present and past inputs only. (The slides state this in the key takeaways.)

---

## 6. Classifying Systems

### Static vs dynamic

| | Static | Dynamic |
|---|--------|---------|
| Memory | Memoryless | Has memory or state linking past and future |
| Output depends on | Only the present input | Present input and the state |
| Example | Monte Carlo estimation of an area using independent random points | A waiting queue that depends on earlier arrivals and completions |

- A static simulation model does not explicitly represent evolution through time.
- A static *system* and a static *simulation model* are related but distinct terms.
- **Dynamic does not mean random:** a dynamic system can be deterministic.

### Dimensions of classification

| Dimension | Options |
|-----------|---------|
| Time representation | Continuous time or discrete time |
| State representation | Continuous-valued or discrete-valued |
| Randomness | Deterministic or stochastic |
| Relationships | Linear or nonlinear |
| Parameters / rules | Time-invariant or time-varying |

These are **separate dimensions**; a system can belong to several categories at once.

### Time domain vs state values

| Term | Meaning |
|------|---------|
| **Continuous time** | Variables are defined at every modeled instant `t` |
| **Discrete time** | Variables are defined at indexed instants `k` |
| **Continuous state** | Values vary over an interval, such as tank volume |
| **Discrete state** | Values are distinct categories or counts, such as queue length |

- A queue can have a discrete state while arrivals occur at arbitrary real-valued times.
- Do not equate discrete time with discrete-event simulation.

### Linear vs nonlinear

- Linear models satisfy **superposition**: additivity and scaling of inputs and initial states.
- Nonlinear examples include squared terms, saturation, and threshold effects.
- Nonlinearity and randomness are different properties.

---

## 7. Simulation Approaches

### Discrete-event simulation (DES)

- State changes at distinct **events**, such as arrivals and departures.
- The **event calendar** stores events and their scheduled times.
- The **simulation clock** can jump to the earliest pending event.
- Suitable for queues, packet networks, and production lines.
- Event times need not be equally spaced.

#### Worked event trace: one computer

Assume one computer, an unlimited queue, and first-come, first-served access.

| Time | Event | Effect |
|------|-------|--------|
| t = 0 | Student A arrives | Starts a 4-minute session |
| t = 1 | Student B arrives | Waits because the computer is occupied |
| t = 4 | A finishes | B starts a 3-minute session |
| t = 7 | B finishes | The computer becomes free |

**Waiting times:** A = 0 minutes, B = 3 minutes (B arrived at t = 1 and started at t = 4).
Between events, the busy/free state and queue length do not change.

### Continuous simulation

- Represents continuously evolving state variables, often with differential equations.
- Tank example: `dV/dt = q_in - q_out`
- If net inflow is 2 liters/minute and `V(0) = 10` liters, then `V(t) = 10 + 2t`.
- At 5 minutes, `V = 20` liters, provided tank constraints do not intervene.
- Numerical solvers approximate solutions when analytic solutions are unavailable.
- The numerical time grid does not make the underlying physical model discrete-time.

### Hybrid models

Hybrid models combine continuous evolution and discrete changes.
*Example:* tank volume evolves continuously, while a switch turns the pump on or off.

| Choose | When |
|--------|------|
| **Discrete-event** | Events drive the important state changes |
| **Continuous** | Rates and continuous trajectories are central |
| **Hybrid** | Both are necessary for the study objective |

---

## 8. Deterministic vs Stochastic Models

| | Deterministic | Stochastic |
|---|---------------|------------|
| Randomness | No random variables in the specification | Random inputs, transitions, or parameters |
| Same inputs and initial conditions | Always give the same trajectory | Can give different outcomes |
| Example | Students arrive exactly 5 minutes apart and use a computer for 8 minutes | Arrival times and session durations vary randomly |

- Deterministic does **not** imply simple, linear, or static. Complex deterministic models can be sensitive to initial conditions.
- Different random-number streams can produce different outcomes.
- A **fixed seed** makes an implemented random sequence reproducible, but the model type is still stochastic.
- **One run is one possible realization**, not the full range of expected behavior.

### Analyzing stochastic simulation output

- Use multiple independent **replications** where appropriate.
- Report averages together with variability and uncertainty.
- Control random seeds deliberately, for reproducibility and experiment design.
- Consider initialization effects and **warm-up** for steady-state studies.
- Define the run length, stopping rule, and performance measures before comparing alternatives.

> **Discussion:** Why might the lowest waiting time in one run be misleading? (Because one run is just one random realization.)

---

## 9. Evolution of Simulation Software

- Early computer simulations required substantial general-purpose programming.
- In the early 1960s, dedicated languages appeared:

| Language | Contribution |
|----------|--------------|
| **GPSS** | Process-oriented, block-based view of entities moving through a system |
| **SIMSCRIPT** | General-purpose discrete-event model building |
| **SIMULA** | Helped establish simulation-oriented and object-oriented programming ideas |

- These developments reduced the need to implement all simulation mechanisms manually.

---

## 10. Selecting a Simulation Tool

- Match the tool to the modeling paradigm and the study objective.
- Check support for event scheduling, continuous solvers, or hybrid behavior.
- Assess data import, experiment management, and output analysis.
- Consider extensibility, reproducibility, cost, training, and execution resources.
- Prefer tools that make assumptions and implementation inspectable.
- A familiar interface does not compensate for an inappropriate model.

---

## Key Takeaways

- Modeling simplifies a system for a defined purpose; simulation experiments with the model.
- Verification, validity, credibility, and tractability address different quality concerns.
- State summarizes the information needed for future model evolution.
- Causal systems do not depend on actual future inputs.
- Time, state, randomness, and linearity are distinct classification dimensions.
- Software supports modeling; it does not establish correctness or usefulness by itself.

## Review Questions

1. Define system, model, and simulation. How are they related?
2. List the five elements of a model with one example each.
3. Give three reasons to model instead of experimenting on the real system.
4. Distinguish verification, validity, credibility, and tractability with an example for each.
5. Why can a correctly coded model still be a poor model?
6. What is system state? Why is average waiting time not a complete state?
7. What is a causal system?
8. Differentiate static and dynamic systems. Can a dynamic system be deterministic?
9. Explain why discrete time is not the same as discrete-event simulation.
10. Complete the event trace: two students arrive at t = 0 and t = 2 with 5- and 4-minute sessions on one computer. What are the waiting times?
11. When would you choose discrete-event, continuous, or hybrid simulation?
12. Why is a single run of a stochastic simulation not enough?
13. List four factors to consider when selecting a simulation tool.

## License

For educational use.