+++
title = "Connect to Oxford Eduroam on Linux"
published = 2026-10-07
description = ""
image = ""
tags = []
category = ""
draft = false
lang = ""
+++

# Connect to Oxford Eduroam on Linux

The [official guide](https://www.ox.ac.uk/staff/it/services/wifi/eduroam) and [cat.eduroam.org](https://cat.eduroam.org/) both fails to provide a working Wi-Fi configuration on Linux and it took me a couple of ours to make it.

This guide assumes NetworkManager. It should work on any linux but I only did this with NixOS 26 KDE.

## Steps

1. Create the separate Wi-Fi password on the [university website](https://register.it.ox.ac.uk/self/remote_access) . This step is the same across all platforms.

2. Connect to `eduroam` in the NetworkManager GUI. A dialog should pop up.

3. Go to the *Wi-Fi* tab.

4. Set the mode to *Infrastructure* .

5. Set security to *WPA2/WPA3 Enterprise* and identity verification to *PEAP* .

6. Set PEAP version to automatic and inner authentication to *MSCHAPv2* .

7. Use the university SSO (like `abcd1234@OX.AC.UK` , note the ***capitalization*** ) for username and the password created in step 1.

8. Set domain to `OX.AC.UK` .

If everything goes well we should be connected.

## Common Traps

- Do ***not*** configure an anonymous identity.

- Do ***not*** download and select the certificate from university website, ***even though the official guide tells you to do so*** . Leave it blank.

- It is weird but the Wi-Fi username is indeed ***case-sensitive*** , both the local part and the domain part.
