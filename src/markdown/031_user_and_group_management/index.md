---
layout: post
title: Chapter Thirty one - User and group management
pathToImage: ../../pic.jpg
---

Time to learn this. To be honest, this is not needed that much since most distributions have some user and group management embedded in them (sometimes, you install a program that needs some special permissions so a group is created with those permissions and your user will be part of that group so you can use that specific program properly). BUT here is the but: You will need to learn this if you plan to use something like arch linux (which won't do that for you), or if you install something outside your package manager, you often need to handle these manually.

## Let's add a new user

We have two commands to do so, `useradd` and `adduser`. Some distributions don't provide `adduser`, the reason is that `adduser` is just a front-end for the other. So here, we won't use it, instead we learn the more important main programs.

<p class="note">Note: In fact, <code>adduser</code> is just a perl script, if your distribution provides it, you can see it by finding it first: <code>$ which adduser</code> and then opening it with a text editor (or just <code>less</code> it).</p>

So let's add a new user:

```bash
$ useradd someone
useradd: Permission denied.
useradd: cannot lock /etc/passwd; try again later.
```

What `useradd` is struggling with is obvious, it can't open the `/etc/passwd` (which is the file containing user information) because it doesn't have the permission to do so. By now you should know to prepend it with `sudo` for it to run properly:

```bash
$ sudo useradd someone
```

After entering your password, the new user will be created. How can we be sure? Just take a quick look at the `/etc/passwd`. at the end of the file, you should see your user created with its properties which we'll see in the next chapter.

Before trying to change to the new user, we should set a password for it, so:

```bash
$ sudo passwd someone
New password:
Retype new password:
passwd: password updated successfully
```

And now we can change to that user in our command line:

```bash
$ whoami
john
$ su someone
Password:
$ whoami
someone
```

Now two important options of `useradd` are:

- `--create-home` or `-m`
- `--shell` or `-s`

The first is obviously setting a home for that user in the `/home` directory. In fact if you look now you'll see that `someone` doesn't have a home :( The second one is for setting the default shell of the user. It defaults to `bash` in most distros but if you need to set it to something else (like `zsh`) you certainly can. But this is not a big deal to set any of them, later, these can be altered, but if you know from the beginning, that's how you set them.

<p class="note">Note for curious ones: There is a command which I won't demonstrate. It's name is <code>chpasswd</code> which sets the passwords of users in batches. This isn't useful for normal users but it's a time saver for system administrators.</p>

## Let's modify that user

Now that `someone` has no home, we should help him. So let's make a directory in `/home` like this:

```bash
$ sudo mkdir /home/someone
[sudo] password for john:
$ ls /home
john someone
```

And then modify someone to assign a home to it:

```bash
$ sudo chown someone:someone /home/someone
$ sudo usermod --home /home/someone someone
[sudo] password for john:
$ su someone
$ whoami
someone
$ cd ~
$ pwd
/home/someone
$ exit
$ whoami
john
$ sudo usermod --shell /bin/bash someone
```

First, we change the directory ownership (because we used `sudo` to create it, it is owned by `root`). Then we assign it to `someone` and we change our user to it and finally we prove that it is assigned by going home (`~`). While we're at it, let's change the shell to `bash` for our own good. We do that in the last command above. By default, `useradd` sets the shell to `/bin/sh` which is a symbolic link to `dash` shell (on debian-based distros). Now you can even log out of your desktop and then you will have two users, you can login with `someone` BUT you won't be able to use `sudo` anymore. So re-login using the `john` (john is my VM’s default user, yours may be different) user after you test it. Why won't you be able to use `sudo`?

## sudoers!

There are those who are trustworthy and those who are not. Because we own our computer, are we the most trustworthy? No, `root` is the most trustworthy because she knows much more and does much more for our benefit. After `root`, we are the most trustworthy. Distributions know that and pre-configure our operating system so that we are able to use `sudo` by default. But if we want to add our own user and trust him, we should explicitly say so. How?

There is a file called sudoers file. You don't care where it is, because you never open it with your own editor and the reason is there is a mechanism to check for errors so you won't mess up the file. That is why we always use this command:

```bash
$ sudo visudo
```

Ironically you need `sudo` to change `sudo`'s configuration. But to think it through, it is in fact, THE RIGHT WAY! Only privileged people should be able to change the permissions of the elite! Obviously not in the real world, but in the dictatorship of Linux. Sort of like an unfair society, but that is the way with Linux. If you execute that command the file should be opened in a command line editor like `nano` or `vim`. But since you are not acquainted with those yet, you can use a trick to change the editor. You can use this command:

```bash
$ sudo EDITOR=gedit visudo
```

Later, I'll tell you to go learn one of those command-line editors because you really need to :) At least `nano`. Anyway, notice in the file, that there are lines like this:

```bash
something ALL=(ALL:ALL) ALL
```

This is how you tell `sudo` which users are permitted to use it. In my case, because I didn't touch Ubuntu's default configuration, it's something like this:

```bash
# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo   ALL=(ALL:ALL) ALL
```

The comments are pretty clear (lines that start with a hash). Let's add our `someone` user to this file so s/he will be able to run commands with `sudo`. Go ahead and add the line below to the end of the file:

```bash
someone ALL=(ALL) ALL
```

Save it and close the editor. You may see some warnings in your terminal, don't worry, those have nothing to do with what we did, those are just your graphical editor's minor issues. If you were to work with command line editors you wouldn't be seeing any of those. Anyway, now we can change to the `someone` user and use `sudo`:

```bash
$ su someone
Password:
$ whoami
someone
$ sudo ls
[sudo] password for someone:
Desktop Documents Downloads Music Pictures Public Templates Videos
$ exit
```

You can use `Ctrl+d` or `exit` to go back to your regular user.

<p class="note">Note: you may be wondering why our regular user (<code>john</code> in my case) has <code>sudo</code> permissions but isn't in the sudoers file. That is because <code>john</code> is in the group .... guess it. Hint: look above when we saw the original content of the sudoers file. Go ahead and use your knowledge from the previous chapter to figure out which groups <code>john</code> belongs to. (answer: the group "sudo").</p>

## Let's add a new group

```bash
$ sudo groupadd somegroup
```

Seems to run without any error. The group is indeed created but you may be wondering how could we be sure? We can take a quick look at the `/etc/group` file. It should be at the very end of the file. We will see these files in the next chapter in detail. Now is time to add our `someone` user to the `somegroup` group! (I'm sure you are loving my naming conventions). There are multiple ways to do that, the most basic one is to use our `usermod` command:

```bash
$ groups someone
someone : someone
$ sudo usermod -g somegroup someone
$ groups someone
someone : somegroup
```

We can also use the `-G` to add the user to multiple groups. Notice how the initial group (`someone`) is no longer in the `someone` user's groups (remember we said that every user belongs to its own group as well?). Another method is to use the `gpasswd` command like so:

```bash
$ sudo gpasswd -a someone sudo
Adding user someone to group sudo
$ groups someone
someone : somegroup sudo
```

Why on earth would we use another command when we can use just our dear `usermod` command? Because gpasswd doesn't replace the groups, it just adds to them. But using `usermod` we should provide all groups we want the user to belong to (which is tedious).

## Wanna change a group's name?

```bash
$ sudo groupmod -n bettername somegroup
$ groups someone
someone : bettername sudo
```

## Wanna remove a user or group?

```bash
$ sudo userdel someone
userdel: group someone not removed because it is not the primary group of user someone.
$ sudo groupdel bettername
```

The error that `userdel` generates is not affecting it's duty. It does delete the `someone` user but it keeps the `someone` group because we changed the primary group by setting the group via `usermod`. Now we remove the `someone` group manually and create a new user called `jane` to show this:

```bash
$ sudo groupdel someone
```

Now check both `/etc/passwd` and `/etc/group` to make sure they are both deleted. Then:

```bash
$ sudo useradd jane
$ tail -n 1 /etc/passwd
jane:x:1003:1004::/home/jane:/bin/sh
$ tail -n 1 /etc/group
jane:x:1004:
```

Now if you delete `jane`:

```bash
$ sudo userdel jane
```

You will see that in both files, both the user and the group are deleted. So remember these notes:

- A user, when created, creates its own group with the same name
- When using `usermod` to change the groups of a user, it overwrites it all. So you are better off using `gpasswd` instead
- If you replace a user's initial group (which has the same name), it will not be deleted because it is no longer the primary group to which the user belongs to

## Conclusion

Obviously, there are more to users and groups, but this is enough for a regular user, in fact it's more than enough. So we call this a `good enough` point at which we can stop. The next lesson will be about the files and how users and groups are stored in the operating system.

