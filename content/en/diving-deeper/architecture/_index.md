---
title: "Architecture"
weight: 2
---

## General

The software for AVR is designed around a pub/sub messaging system to exchange data
throughout the system. This allows software modules to operate independently of each
other, and to communicate with each other over a network.

A pub/sub messaging system is a system that allows clients to publish data to "topics"
and clients can subscribe to incoming messages on defined topics. Think of how email
works for example. You sending an email to someone is like publishing data to a topic
(their email address), and you subscribe to all messages on a topic (your email
address). However, a pub/sub system allows multiple clients to subscribe to the same
topic.

With that in mind, the core principles of AVR software architecture are as follows:

1. Data exchange must happen through the MQTT broker.
2. All MQTT data must be JSON encoded.
3. All modules are run as containers.

Because of all of the hardware components of AVR (PCC, FCC, thermal camera, etc.), what
this generally means is that each module acts as a hardware to MQTT adapter. For
example, the FCM module publishes telemetry data over MQTT and feeds fake GPS data from
MQTT to the FCC.

This modular, open system makes it simple to add new modules or functionality to AVR.
The GUI for example is 100% based on consuming MQTT data.

## Modules

Here is a description of the modules in AVR and what they all do.

![Module Flowchart](module-flow.jpg)

Browse the modules under
[AVR-VMC/modules](https://github.com/bellflight/AVR-VMC/tree/main/modules) to learn more
about what each one does.
