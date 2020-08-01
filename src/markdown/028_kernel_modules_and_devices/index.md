Don't be afraid of the title. It's no big deal. In fact, this is another relatively short chapter. Let's dive in:

# lspci

```bash
$ lspci
...
00:02.0 VGA compatible controller: Intel Corporation UHD Graphics 630 (Mobile)
...
00:16.0 Communication controller: Intel Corporation Cannon Lake PCH HECI Controller (rev 10)
...
01:00.1 Audio device: NVIDIA Corporation GP106 High Definition Audio Controller (rev a1)
...
```

Simply lists the PCI devices. If you have ever opened a computer case, you have definitely seen one of those long slots that you usually attach your graphics card to. That is a PCI device. You can use this command to check if your PCI devices are detected or not.

# lsusb

Obvious enough, lists the USB devices. Note that USB devices include some internal connections that use the same USB standard.

```bash
$ lsusb
...
Bus 001 Device 003: ID 2516:003b Cooler Master Co., Ltd. MasterKeys Pro L
Bus 001 Device 005: ID 0bda:b023 Realtek Semiconductor Corp. Bluetooth Radio 
...
```

# lsmod and modinfo

Now let's get to the kernel modules. Simple, yet powerful little knowledge that we could use to our advantage.

"Kernel modules are pieces of code that can be loaded and unloaded into the kernel upon demand. They extend the functionality of the kernel without the need to reboot the system." -Arch wiki

Simply, to list the kernel modules we can use `lsmod`:

```bash
$ lsmod
Module                  Size  Used by
...
bluetooth             581632  31 btrtl,btintel,btbcm,bnep,btusb,rfcomm
snd_seq_midi           20480  0
intel_rapl_perf        20480  0
videodev              208896  3 videobuf2_v4l2,uvcvideo,videobuf2_common
...
```

If you want, you can use `modinfo` to get more information on the modules:

```bash
$ modinfo bluetooth
filename:       /lib/modules/5.3.0-42-generic/kernel/net/bluetooth/bluetooth.ko
alias:          net-pf-31
license:        GPL
version:        2.22
description:    Bluetooth Core ver 2.22
author:         Marcel Holtmann <marcel@holtmann.org>
srcversion:     61987611EE4B3C6A24FA0C8
depends:        ecdh_generic
retpoline:      Y
intree:         Y
name:           bluetooth
...
```

Since I'm using a laptop, I have a bluetooth built-in, so depending on either if you're using a virtual machine or that you have a PC without a bluetooth, you may not have this module loaded and that's fine.

# rmmod

Now let's remove a module:

```bash
$ lsmod | grep video
video           49152   0

$ sudo rmmod video
```

Nothing happens really. But if you re-run the lsmod there would be no video module since we detached it.

```bash
$ lsmod | grep video
$
```

# modprobe

And to load that module again:

```bash
$ sudo modprobe video
$ lsmod | grep video
video           49152   0
```

Here you may not see a clear effect but I just wanted to let you know that it's that easy to load/unload a kernel module so if someday you need to do it, you'll be confident enough to dive right in.

<p class="note">Note: If you take a look at <code>rmmod</code>'s man page you'll see that it advises you to use <code>modprobe -r</code> instead, since that's a more intelligent command.</p>

# Conclusion

I agree. Too abstract and vague of a chapter this was. You probably won't need it but if you do, you'll know it's no big deal just because it deals with kernel.

