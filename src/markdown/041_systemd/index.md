Defining systemd is a rather difficult task. I am not an expert and I don't know that much about it either. But from what I know, it handles the system and services. It also provides an init system. Init is the process that starts the main processes of the system. If you are on a systemd machine (which is highly probable) then executing a `ps aux` will show you that the process with PID (Process ID) one, is in fact, systemd. So let's see some commands that help us get information about our system.

# systemctl

`System` `C`on`t`ro`l` is the main command to be interacting with systemd. Executing it on it's own will result in the list of units in our OS:

```bash
$ systemctl
```

And to get more information on a specific unit:

```bash
$ systemctl status <unit>
```

For example:

```bash
$ systemctl status sshd
● sshd.service - OpenSSH server daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; disabled; vendor preset: disabled)
     Active: inactive (dead)
       Docs: man:sshd(8)
             man:sshd_config(5)
```

Let's say, we wanted to start the ssh daemon service:

```bash
$ sudo systemctl start sshd
[sudo] password for john:
$ systemctl status sshd
● sshd.service - OpenSSH server daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; disabled; vendor preset: disabled)
     Active: active (running) since Sat 2020-08-15 19:12:06 +0430; 4s ago
       Docs: man:sshd(8)
             man:sshd_config(5)
   Main PID: 82397 (sshd)
      Tasks: 1 (limit: 19005)
     Memory: 2.1M
        CPU: 8ms
     CGroup: /system.slice/sshd.service
             └─82397 sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups

Aug 15 19:12:06 f3d0r4 systemd[1]: Starting OpenSSH server daemon...
Aug 15 19:12:06 f3d0r4 sshd[82397]: Server listening on 0.0.0.0 port 22.
Aug 15 19:12:06 f3d0r4 sshd[82397]: Server listening on :: port 22.
Aug 15 19:12:06 f3d0r4 systemd[1]: Started OpenSSH server daemon.
```

Similarly, to stop it:

```bash
$ sudo systemctl stop sshd
[sudo] password for john:
$ systemctl status sshd
● sshd.service - OpenSSH server daemon
     Loaded: loaded (/usr/lib/systemd/system/sshd.service; disabled; vendor preset: disabled)
     Active: inactive (dead)
       Docs: man:sshd(8)
             man:sshd_config(5)

Aug 15 19:12:06 f3d0r4 systemd[1]: Starting OpenSSH server daemon...
Aug 15 19:12:06 f3d0r4 sshd[82397]: Server listening on 0.0.0.0 port 22.
Aug 15 19:12:06 f3d0r4 sshd[82397]: Server listening on :: port 22.
Aug 15 19:12:06 f3d0r4 systemd[1]: Started OpenSSH server daemon.
Aug 15 19:13:04 f3d0r4 systemd[1]: Stopping OpenSSH server daemon...
Aug 15 19:13:04 f3d0r4 sshd[82397]: Received signal 15; terminating.
Aug 15 19:13:04 f3d0r4 systemd[1]: sshd.service: Succeeded.
Aug 15 19:13:04 f3d0r4 systemd[1]: Stopped OpenSSH server daemon.
```

There are times that you make some change in the service (or some program does it for you), maybe that you change the port which ssh uses to start it's server on. Then you need to restart the service:

```bash
$ sudo systemctl restart sshd
```

When you restart a service, if it's not already started, it'll just be started. But if it's already started, it will be executing a `stop` and `start` respectively. There are also `reload` and `daemon-reload` which you can look up in the man page.

But what if you want to start some services on boot? Then you can enable them:

```bash
$ sudo systemctl enable sshd
```

Which will create some symbolic link so systemd knows that you want to start this particular unit on boot. The reverse of `enable` is obviously `disable`, so you can use that to reverse this operation by deleting that symlink file. There is an option `--now` with both of these commands that will cause the unit to be `started` and `stopped` as well (respectively for `enable` and `disable`).

And if you just want to check if the service is enabled or not:

```bash
$ systemctl is-enabled <unit>
```

Further reading:

- `systemctl mask <unit>`
- `systemctl unmask <unit>`
- `systemctl help <unit>`

# journalctl

Systemd also keeps a journal. AKA the logs of the units. But if you think that this is familiar, you are absolutely right. We talked about it before, in the "System state information" chapter.

# Conclusion

So that's the basics of systemd. More than what I knew for a considerable amount of time. You don't need to master it, but the more you know about it, the more comfortable you get for controlling and getting information about your system.
