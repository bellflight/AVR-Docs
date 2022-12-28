---
title: "Flight Controller Parameters"
weight: 5
---

After configuring the AVR software on your Jetson, you need to also load custom
parameters into your flight controller as well. These settings configure how the flight
controller processes sensor input, and we need to tell it to unconditionally trust the
data the AVR software feeds it.

First, download the parameter file from the latest GitHub release:
[https://github.com/bellflight/AVR-PX4-Firmware/releases/latest](https://github.com/bellflight/AVR-PX4-Firmware/releases/latest)

![](2022-12-27-19-05-08.png)

Like flashing the flight controller firmware, you'll need to plug in the FC to your
computer with the MicroUSB cable.

Now, open QGroundControl, click the "Q" in the top left, then "Vehicle Setup" then
"Parameters" at the bottom of the list.

![](image.png)

Click on "Tools" in the top right then select "Load from file..." and select the AVR
parameter file you downloaded.

![](image1.png)

Then click "Ok" to load the parameters.

![](image2.png)

Then click "Ok" a bunch of times as QGroundControl informs you that many parameter
changes requires a vehicle reboot.

![](image3.png)

Then go back to "Tools" and select "Reboot Vehicle" at the bottom of the list to restart
the flight controller for the parameters to take effect.
