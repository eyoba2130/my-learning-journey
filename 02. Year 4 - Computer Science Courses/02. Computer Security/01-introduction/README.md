# Chapter 1: Introduction to Computer Security

> Slides 1-25

## Overview

Computer security is the process of detecting and preventing unauthorized use of a computer or its resources. This chapter defines the basic vocabulary, the goals every secure system aims for, the types of attacks, and the difference between policies and mechanisms.

## 1. Basic Concepts

- **Computer security, network security, and information security** are often used interchangeably, but they differ in focus:

| Term | Focus |
|------|-------|
| Network security | Protecting the boundaries of an organization and data in transmission. Starts with authenticating users, then a firewall enforces access policies. |
| Information security | Protecting data from malware and mistakes by people inside the organization, often using data loss prevention (DLP) techniques. |

- **Assets** are the items you value: hardware, software, data, people, processes, or combinations of these. To decide what to protect, identify what has value and to whom.
- A big danger today comes from **internal threats**, not only outsiders.

### What to secure (basic checklist)

- Physical security: motion alarms, door access systems, humidity and temperature sensors.
- A unique user ID and password for everyone with access.
- Screen savers that lock the display when the user is away.
- Password-protected networks (especially wireless) and routers.

## 2. Threats, Vulnerabilities, Risks, Controls

| Term | Meaning | Example |
|------|---------|---------|
| **Threat** | Something that could harm an asset | Floods, malware, ransomware, threat actors |
| **Vulnerability** | A weak point in hardware or software | Unauthorized access through a flaw |
| **Risk** | The potential for harm to systems or the business | Organizations mitigate, transfer, accept, or avoid risks |
| **Control** | A measure that reduces risk | Locks, training, antivirus, firewalls |

A **risk assessment** is often the first line of defense, and it helps establish a baseline of the attack surface.

### Types of controls

- **Access controls:** guards, locks, fences.
- **Procedural controls:** security awareness training, incident response plans.
- **Technical controls:** multi-factor authentication, antivirus, firewalls.
- **Compliance controls:** privacy laws, security frameworks and standards.

## 3. Goals of Computer Security (Security Services)

1. **Authentication:** verify the identity of sender and receiver.
2. **Confidentiality (secrecy):** only authorized people can read the content.
3. **Integrity:** the data was not altered in transit.
4. **Non-repudiation:** neither sender nor receiver can falsely deny sending or receiving a message.
5. **Availability and reliability:** systems and services stay accessible to authorized users.

## 4. Security Attacks

A security attack is an unauthorized attempt to steal, damage, or expose data from an information system.

### Passive attacks

- Try to learn information without changing the system.
- Hard to detect because nothing is altered, but prevention is possible.
- Two forms: **release of message content** and **traffic analysis** (guessing the nature of communication from message frequency and length, even if encrypted).

### Active attacks

- Alter system resources or affect their operation.
- Hard to prevent completely.
- Four classes:

| Class | Idea | Example |
|-------|------|---------|
| Interruption | Make a resource unavailable | Destroying hardware, cutting a cable, disabling a file system |
| Interception | An unauthorized party gains access | Eavesdropping |
| Modification | An unauthorized party changes data | Altering a message |
| Fabrication | An unauthorized party inserts fake data | Forged messages |

## 5. Security Policies and Mechanisms

- **Security policy:** a statement of what is and is not allowed.
- **Security mechanism:** a method, tool, or procedure that enforces a policy by detecting, preventing, or recovering from attacks.

Common mechanisms from the slides: encipherment, digital signatures, access control, data integrity, authentication exchange, traffic padding, notarization (a trusted third party), and routing control.

## 6. Prevention, Detection, Deterrence

- **Prevention:** policies, awareness programs, and access control, built early. The security policy is the foundation for everything else.
- **Detection:** no system is unbreakable, so use layered defense and detect compromise quickly. **Intrusion detection systems (IDS)** monitor activity and alert responsible people. Telling normal from malicious activity is "more of an art than a science", and an IDS needs tuning.
- **Deterrence:** discourage attackers through visible consequences and controls.

## Key Terms

`asset` `threat` `vulnerability` `risk` `control` `confidentiality` `integrity` `availability` `non-repudiation` `passive attack` `active attack` `policy` `mechanism` `IDS`

## Review Questions

1. What is the difference between network security and information security?
2. Explain threat, vulnerability, and risk with one example each.
3. List the five security goals and describe each in one sentence.
4. Why are passive attacks hard to detect, and why are active attacks hard to prevent?
5. Name the four classes of active attacks and give an example of each.
6. What is the difference between a security policy and a security mechanism?
7. Why does the chapter recommend a "defense in layers" strategy?