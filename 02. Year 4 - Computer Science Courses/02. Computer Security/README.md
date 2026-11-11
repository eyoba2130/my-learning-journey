# Computer Security: Course Notes

Study notes based on a 162-slide Computer Security course. They cover the basics of protecting computers and networks: what to protect, who and what threatens it, how data is encrypted, how networks are secured, and which tools enforce security.

Each chapter has its own folder with a README that summarizes the slides, lists key terms, and ends with review questions.

## Table of Contents

| # | Chapter | Slides | Main topics |
|---|---------|--------|-------------|
| 1 | [Introduction to Computer Security](./01-introduction/README.md) | 1-25 | Assets, threats, vulnerabilities, risk, controls, security goals, attacks, policies, mechanisms |
| 2 | [Computer Threats](./02-computer-threats/README.md) | 26-52 | Malicious code, attack classes, program flaws |
| 3 | [Cryptography and Encryption Techniques](./03-cryptography/README.md) | 53-111 | Ciphers, DES, AES, public-key cryptography, RSA |
| 4 | [Network Security](./04-network-security/README.md) | 112-142 | Vulnerabilities, threats, attacks, security protocols, wireless security |
| 5 | [Security Mechanisms](./05-security-mechanisms/README.md) | 143-162 | Firewalls, proxy servers, IDS/IPS, VPN |

## How the Chapters Connect

```
Ch 1  What are we protecting, and what are the goals? (CIA + authentication + non-repudiation)
  |
Ch 2  What can go wrong? (malware, attacks, programming flaws)
  |
Ch 3  How do we protect the data itself? (cryptography)
  |
Ch 4  How do we protect the network and its traffic? (protocols, wireless)
  |
Ch 5  Which tools enforce all of this? (firewall, proxy, IDS/IPS, VPN)
```

## Key Ideas to Remember

- **Security goals:** authentication, confidentiality, integrity, non-repudiation, and availability.
- **Threat vs vulnerability vs attack:** a threat is something that *could* cause harm, a vulnerability is a *weakness*, and an attack is an *action* that exploits a weakness.
- **No silver bullet:** use layered defense and detect problems quickly.
- **Encryption is the strongest tool, but not the only one:** it protects data, while firewalls, IDS/IPS, and VPNs protect the network around it.

## Study Tips

1. Read the chapter README first, then go back to the slides for diagrams (DES, AES, and S-boxes are mostly visual).
2. Practice the worked examples in Chapter 3 by hand before checking the answers.
3. Be able to explain, in one sentence each: virus vs worm vs Trojan, IDS vs IPS, symmetric vs asymmetric encryption.

## Repository Structure

```
computer-security-notes/
├── README.md
├── 01-introduction/README.md
├── 02-computer-threats/README.md
├── 03-cryptography/README.md
├── 04-network-security/README.md
└── 05-security-mechanisms/README.md
```

## Source and Notes

These notes summarize the course slides (PowerPoint exported to PDF). Where the slides are outdated or simplified, the chapter READMEs add a short **Modern note** so the notes stay accurate.

## License

For educational use.