This chapter's name may be a bit misleading. First because we control our system through different modules and programs and second because you may think that this is a big deal. Here you will learn a few basic system control commands.

# hostname

Simply executing it shows us the hostname (our computer's name):

```bash
$ hostname
u6untu
```

And some useful options:

```bash
$ hostname -i
127.0.1.1
$ hostname -f
u6untu
$ hostname -a

$
```

The first one shows us the IP address of our host, then the FQDN (Fully Qualified Domain Name) and then the alias (which in ubuntu's case is empty because the developers didn't set it). These won't matter much in a laptop or a regular home PC, but when you're dealing with clusters of servers, the story is totally different. But since these are mainly network concepts I will skip over them :/ Sorry! One thing you can do is to change your hostname:

```bash
$ sudo hostname new-host-name
```

You may notice that after a reboot, your hostname changes back to what it was before. That's totally okay, because the `hostname` command changes the hostname only temporarily. In order to change our hostname permanently, we can use `hostnamectl`:

```bash
$ sudo hostnamectl set-hostname new-host-name
```

# shutdown

Too self-explanatory name!

```bash
$ shutdown
$ shutdown -P
$ shutdown -H
$ shutdown -r
```

First and second commands are the same (`-P` is the default option), they will both poweroff the machine completely. Third is Halt, which depending on your system may or may not be the same as poweroff. Basically ["Halting involves stopping all CPUs on the system. Powering off involves sending an ACPI command to signal the PSU to disconnect main power"](https://serverfault.com/a/191541). Lastly, the `-r` `r`eboots.

<p class="note">Note: In some distros, you should execute shutdown with a sudo prefixing it, because it is considered that only superusers should be able to shut the system down. However, in a more general sense, if you have the ability to shutdown by the graphical interface, then there is no point in limiting the command line utilities. This is due to the fact that multi-user machines should not allow non-admin users to be able to shut the system down. But nowadays, our desktop or laptop computers are mostly used by a single user.</p>

Additionally, we can tell shutdown to execute it's commands in future:

```bash
$ shutdown 9:30
$ shutdown 22:22
$ shutdown +15 "going down in 15m due to upgrade"
$ shutdown -c
$ shutdown now
$ shutdown +0
```

The first two commands will register a pending shutdown to occur in the time they are given. Third command is what used to happen in multi-user systems, the admin would tell the other users that s/he'll shutdown (reboot) in 15 minutes or so (other users received the message in their terminals). The fourth command will `c`ancel the pending shutdown command. Meaning that if you regret your scheduled shutdown, just execute a `shutdown -c` and it'll `c`ancel the shutdown event. And the last two commands are the same as executing shutdown with no time argument.

# reboot

Too lazy to type the whole `shutdown -r` ? There's a shortcut:

```bash
$ reboot
```

<p class="note">Note: You might be asking if reboot is the exact same as <code>shutdown -r</code>. And to answer your question, first we can find the executables by using the <code>which</code> command and then see if they give us any information themselves (using a simple <code>ls -l</code>).</p>

```bash
$ which reboot
/usr/sbin/reboot
$ which shutdown
/usr/sbin/shutdown
$ ls -l /usr/sbin/reboot /usr/sbin/shutdown 
lrwxrwxrwx 1 root root 14 Feb  6 18:15 /usr/sbin/reboot -> /bin/systemctl
lrwxrwxrwx 1 root root 14 Feb  6 18:15 /usr/sbin/shutdown -> /bin/systemctl
```

As you can see, they're both soft links to `systemctl` which is the system control command that `systemd` provides. We will see that in later chapters.

# Conclusion

As I promised this one was a simple, brief chapter :) See you in the next one.

