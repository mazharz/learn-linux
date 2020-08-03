Humans have memories, two types of them actually. Short-term and Long-term. Think of short-term memory as RAM and long-term as hard disks. We covered the hard disk realm, so it's time to talk a bit about the RAM realm. When we say memory in the world of computers however, we always mean the RAM (Random Access `Memory`). When you're in windows, you right-click in your "my computer" or "this pc" and hit the properties button to see the amount of RAM your computer has. In Linux however, we usually use `free` to check everything memory related.

# free

```bash
$ free
              total        used        free      shared  buff/cache   available
Mem:       16258968     2824452     8859128      822012     4575388    12332152
Swap:       8196092           0     8196092
```

This is my personal laptop. As you can see it's not too easy reading in bytes, so naturally, we try that sneaky `-h` option:

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           15Gi       2.7Gi       8.5Gi       780Mi       4.3Gi        11Gi
Swap:         7.8Gi          0B       7.8Gi
```

Perfect! Now we know that my laptop has a 16G RAM (of course it's not literally 16, 15 and a bit). Of that 16, about 2.7G is used right and 8.5G is totally free. That's enough, forget about the rest of those columns, we won't need them here. But pay attention to that second line, `Swap`. What the hell is `Swap`?

<p class="note">You can also use other tools to monitor your RAM (or CPU or even bandwidth) usage. Your desktop environment provides one for sure, but you can also use command-line programs like <code>htop</code>.</p>

# Swap

Swap is a backup memory. Think of a ship. A ship has many passengers on it, the ship has a motor which is fast and efficient and carries a lot of stuff too. But there are emergency boats attached to this ship, right? I'm sure you're picturing titanic. So anyway, swap is literally those emergency boats. Your computer has a certain amount of RAM, but what if that RAM is filled with water (or programs)? Then you use some other less fast, less efficient option to survive, so that your computer doesn't crash, so that you'll be able to get away with having less RAM for a task that requires more.

Swap could be a partition on your disk or a file on it. So right now, you should know that since disks are way less fast, using swap should always be thought of as the emergency solution. We will be creating a swap partition and then a file.

## Swap partition

Let's execute a `free` on my fedora VM (doesn't make a single difference what distro it is):

```bash
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       966Mi       2.0Gi        14Mi       908Mi       2.6Gi
Swap:         2.0Gi          0B       2.0Gi
```

It already has some swap, 2G in fact. This is automatically created at the time of the installation, you can see the swap in the `lsblk` output:

```bash
$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda                               8:0    0  20G  0 disk 
├─sda1                            8:1    0   1G  0 part /boot
└─sda2                            8:2    0  19G  0 part 
  ├─fedora_localhost--live-root 253:0    0  17G  0 lvm  /
  └─fedora_localhost--live-swap 253:1    0   2G  0 lvm  [SWAP]
sdb                               8:16   0   4G  0 disk 
└─sdb1                            8:17   0   4G  0 part 
```

So let's add some more swap. We'll be using our previously created virtual disk. Let's go ahead and make a swap partition on it. Let's use `gdisk` to do what we did before with a small twist at the end, we need to set the flag for a "Linux swap" not "Linux filesystem". 

```bash
$ sudo gdisk /dev/sdb
[sudo] password for john: 
GPT fdisk (gdisk) version 1.0.5

Partition table scan:
  MBR: protective
  BSD: not present
  APM: not present
  GPT: present

Found valid GPT with protective MBR; using GPT.

Command (? for help): o
This option deletes all partitions and creates a new protective MBR.
Proceed? (Y/N): Y

Command (? for help): n
Partition number (1-128, default 1): 
First sector (34-8388574, default = 2048) or {+-}size{KMGTP}: 
Last sector (2048-8388574, default = 8388574) or {+-}size{KMGTP}: 
Current type is 8300 (Linux filesystem)
Hex code or GUID (L to show codes, Enter = 8300): 8200
Changed type of partition to 'Linux swap'

Command (? for help): w

Final checks complete. About to write GPT data. THIS WILL OVERWRITE EXISTING
PARTITIONS!!

Do you want to proceed? (Y/N): Y
OK; writing new GUID partition table (GPT) to /dev/sdb.
The operation has completed successfully.
[john@localhost ~]$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
...
sdb                               8:16   0   4G  0 disk 
└─sdb1                            8:17   0   4G  0 part 
```

See? We used `8200` instead of the default (8300) so the partition type is a "Linux swap". Now this is just a partition, we haven't done anything to make it a swap partition, shall we?

```bash
$ sudo mkswap /dev/sdb1
mkswap: /dev/sdb1: warning: wiping old ext4 signature.
Setting up swapspace version 1, size = 4 GiB (4293894144 bytes)
no label, UUID=2a40559e-d84a-4bd7-9082-0129e9607841
$ sudo swapon /dev/sdb1
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       972Mi       2.0Gi        14Mi       909Mi       2.6Gi
Swap:         6.0Gi          0B       6.0Gi
$ sudo swapoff /dev/sdb1
$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       971Mi       2.0Gi        14Mi       909Mi       2.6Gi
Swap:         2.0Gi          0B       2.0Gi
```

See how easy it is? We made a swap with `mkswap` command, then turned it on with `swapon`. Whenever we want we can easily turn it off by `swapoff` command (of course it must be empty, which it is now). Now for the file swap:

## Swap file

```bash
$ sudo fallocate -l 1G ~/swap
[john@localhost ~]$ sudo dd if=/dev/zero of=~/swap count=1024 bs=1MiB
1024+0 records in
1024+0 records out
1073741824 bytes (1.1 GB, 1.0 GiB) copied, 0.80819 s, 1.3 GB/s
[john@localhost ~]$ sudo chmod 600 ~/swap
[john@localhost ~]$ sudo mkswap ~/swap
Setting up swapspace version 1, size = 1024 MiB (1073737728 bytes)
no label, UUID=1c617bc9-3b2a-41c7-a066-196c8ebcceee
[john@localhost ~]$ sudo swapon ~/swap
[john@localhost ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       975Mi       1.2Gi        14Mi       1.7Gi       2.6Gi
Swap:         3.0Gi       0.0Ki       3.0Gi
```

Again, easy! We first allocated 1G to a file named `~/swap` then used `dd` to fill it with zero bytes and then used `chmod` to make it accessible only by root (which is owner becuase we made the file using commands prepended `sudo`). Then we made a swap using `mkswap` and finally turned it on as before. Now let's turn the partition on as well so that we have a huge amount of swap:

```bash
$ sudo swapon /dev/sdb1
[john@localhost ~]$ free -h
              total        used        free      shared  buff/cache   available
Mem:          3.8Gi       966Mi       1.2Gi        14Mi       1.7Gi       2.6Gi
Swap:         7.0Gi       0.0Ki       7.0Gi
[john@localhost ~]$ lsblk
NAME                            MAJ:MIN RM SIZE RO TYPE MOUNTPOINT
sda                               8:0    0  20G  0 disk 
├─sda1                            8:1    0   1G  0 part /boot
└─sda2                            8:2    0  19G  0 part 
  ├─fedora_localhost--live-root 253:0    0  17G  0 lvm  /
  └─fedora_localhost--live-swap 253:1    0   2G  0 lvm  [SWAP]
sdb                               8:16   0   4G  0 disk 
└─sdb1                            8:17   0   4G  0 part [SWAP]
```

Now we have 7G of swap! The default 2G partition that fedora made for us, the 4G partition swap that we made for ourselves and finally the 1G swap file.

# Conclusion

That's it! Memory and swap is now owned by our knowledge :)