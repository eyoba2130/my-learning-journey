# Chapter 2: Computer Threats

> Slides 26-52

## Overview

A computer threat is anything deliberate, unintended, or caused by natural disaster that results in data loss, data manipulation, or physical destruction of hardware. Threats fall into two groups:

- **Physical threats:** damage to hardware or theft of a system or hard disk holding critical data.
- **Non-physical threats:** attacks on data and software by corrupting data or exploiting software errors.

## 1. Malicious Code

Malicious code is harmful code designed to create or exploit vulnerabilities. It can cause back doors, security breaches, data theft, and other damage. Common types: **viruses, worms, Trojan horses, and spyware**.

### Virus

- Self-replicating code that attaches to a program to execute.
- Spreads through documents and file downloads.
- **Needs human action** to spread (for example, running an infected application).
- Cannot be controlled remotely.
- Often modifies itself after infection and hides in the operating system, which makes it harder for antivirus software to detect.

### Worm

- A stand-alone program that spreads copies of itself across a network.
- Exploits flaws in computer security and needs **no human action** to spread.
- Does not need to attach to another program.
- Symptoms: slow system, unfamiliar icons, degraded performance, applications opening unexpectedly, random emails sent or received.
- Can be controlled remotely.

### Trojan horse

- Does **not** replicate itself.
- A hidden piece of code that steals important information from the user.
- Can be controlled remotely.

### Spyware

- Malicious software that gathers data from a device and sends it to third parties without consent.
- Targets internet usage, credit card and bank details, and credentials that could be used to spoof identities.

### Virus vs Worm vs Trojan Horse

| | Virus | Worm | Trojan horse |
|---|-------|------|--------------|
| Replicates | Yes | Yes | No |
| Needs a host program or human action | Yes | No | Relies on the user installing it |
| Remote control | No | Yes | Yes |
| Spread rate | Moderate | Fastest | Slowest |
| Main goal | Modify or damage data | Consume resources and slow the system | Capture information |

## 2. Classes of Network Attacks

### Reconnaissance attacks

The attacker surveys a network and gathers data for a later attack, such as open ports on servers and firewalls and IP addresses.

- Methods: **packet sniffers, ping sweeps (ICMP), port scans, information queries.**
- **Logical reconnaissance:** done in the digital space (ping sweeps, port scans).
- **Physical reconnaissance:** observing locations, cameras, door locks, guards.

### Access attacks

- Exploit weaknesses in authentication, FTP, and web services to reach accounts or confidential databases.
- **Password attacks** are the most common: sniffing clear-text passwords or repeated login attempts.

### Denial of Service (DoS) attacks

- Legitimate users cannot reach a system or service because it is overloaded or crashed.
- Two main categories:
  1. **Buffer overflow attacks:** consume disk space, memory, or CPU time.
  2. **Flood attacks:** saturate the target with traffic.

## 3. Program Flaws (Non-malicious)

A **flaw** is a mistake in hardware or software that can become a security risk. Developers fix flaws with updates and patches. Three common non-malicious programming errors:

### Buffer overflow

A memory reference goes beyond the declared boundary. Example: for `int arr[5]`, writing `arr[5] = 22` writes into the memory next to the array, since some compilers (such as C) do not check bounds. That adjacent memory may hold other data or code.

### Incomplete mediation

Input is not fully checked. Example: a URL with date and phone parameters that the server never validates. Impossible values (like `1800Feb30` or `1Aardvark2Many`) can crash the program or produce wrong results. The fix is to validate input on the server side.

### Time-of-check to time-of-use (TOCTTOU)

An attacker exploits the gap between the moment access is **checked** and the moment the result is **used**, changing something in between (a "bait and switch"). Also called a serialization or synchronization flaw.

### Controls against program flaws

- Proper input validation.
- Preserve the operating system command structure.
- Keep operations within memory buffer boundaries.
- Protect external control of file names, paths, and data.
- Control code generation (code injection).
- Initialize variables properly.
- Apply proper error handling.

Additional practices: software engineering techniques, information hiding and encapsulation, modularity, mutual suspicion, and confinement.

## Key Terms

`malicious code` `virus` `worm` `Trojan horse` `spyware` `reconnaissance` `access attack` `DoS` `buffer overflow` `incomplete mediation` `TOCTTOU` `input validation`

## Review Questions

1. What is the difference between physical and non-physical threats?
2. Compare a virus, a worm, and a Trojan horse in terms of replication, spread, and remote control.
3. Name the four methods of reconnaissance attacks.
4. What is a password attack, and how can a packet sniffer help it?
5. What are the two categories of DoS attacks?
6. Explain a buffer overflow using the `arr[5] = 22` example.
7. Why is incomplete mediation dangerous, and how do you prevent it?
8. What does TOCTTOU stand for, and why is the gap between check and use a problem?