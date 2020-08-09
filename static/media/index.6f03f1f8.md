Debian-based distributions, including Ubuntu, Mint, ... all use the same package manager named `apt`. Here is to all those distros :)

# GUI

Before jumping in, let's take a moment and acknowledge that people thought about making this easier by providing a graphical software. Search in your programs and if you have one, mess with it a bit, but don't get attached because we will be leaving it soon :(

# /etc/apt

Here is the directory that holds the configuration files for a typical apt-based system. The `repo.d` in there holds the additional repositories that are added via the `add-apt-repository` command. Most important file is the `/etc/apt/sources.list` which holds the main repositories. Typically, it starts like this:

```
# sources.list
#deb cdrom:[Ubuntu 13.10 _Saucy Salamander_ - Release i386 (20131016.1)]/ saucy main restricted

# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://ch.archive.ubuntu.com/ubuntu/ saucy main restricted
deb-src http://ch.archive.ubuntu.com/ubuntu/ saucy main restricted
#...
```

As [Ubuntu docs](https://help.ubuntu.com/community/Repositories/CommandLine) explains:

- `deb`: These repositories contain binaries or precompiled packages. These repositories are required for most users.
- `deb-src`: These repositories contain the source code of the packages. Useful for developers.
- [http://archive.ubuntu.com/ubuntu](http://archive.ubuntu.com/ubuntu): The URI (Uniform Resource Identifier), in this case a location on the internet. See the official mirror list or the self-maintained mirror list to find other mirrors.
- `saucy` is the release name or version of your distribution.
- `main` & `restricted` are the section names or components. There can be several section names, separated by spaces.

# third-party repositories

There are repositories maintained by regular people (not the official developers) that can be useful to install a specific piece of software. These repositories can't be trusted because anyone can make one! But when you install something and get the repository from a trusted source, it can be useful. For instance when you want to install `mongodb` you add the repository setup by mongodb so that can't really be malicious (unless you're paranoid). The syntax is like this:

```bash
$ sudo add-apt-repository <repo>
```

Always make sure to check the validity of such repositories if you want to be safe (it's definitely safer than installing any .exe file like I used to do when I had Windows). Also, check the `/etc/apt/repo.d` directory after you add one (whenever, there's no pressure).

# Updating

Update doesn't mean update, it means updating the metadata (remember the previous chapter where we talked about metadata? Oh... good times :P). So you would run this:

```bash
$ sudo apt update
```

And it would mean to fetch the latest metadata about packages, their updated info and more.

# Actually updating

```bash
$ sudo apt upgrade
```

This one actually upgrades the system in it entirety (even the third-party repositories (obviously)).

# Installing something

Obvious!

```bash
$ sudo apt install gimp
```

# Removing something

Obvious!

```bash
$ sudo apt remove gimp
```

# Shredding something

This one not only removes the package, it also removes it's configuration files and basically it's consequences.

```bash
$ sudo apt purge gimp
```

# Getting rid of the remaining useless tools

When package managers install a package, they usually install some other stuff! Remember shared libraries? That's one example. Other times, some packages are front-ends to other command-line utilities. When you remove a package, through some conservative acts, some of these stuff still remain in the system. So to get rid of the orphan packages, we can do this:

```bash
$ sudo apt autoremove
```

# Searching for something

Someone told you that there is a program called Inkscape which edits vector files (like svg), you want to know if your package manager provides such a package:

```bash
$ apt search inkscape
```

Yay! it does!

# Seeing the metadata of a package

```bash
$ apt show inkscape
```

The package must be installed though.

# Listing

To list the installed packages:

```bash
$ apt list --installed
```

Or to list the upgradables (usually you do this after executing a `$ sudo apt update` to see what packages are available for upgrade):

```bash
$ apt list --upgradable
```

# Download-only

To download the package only and not install it (basically cache it):

```bash
$ sudo apt install --download-only
```

# Other stuff you can do

I deliberately refused to talk about these, because I think you don't need them right away, you can learn them whenever you feel the need for them.

- `dpkg -i pkg.deb`
- `dpkg-reconfigure tzdata`
- `dpkg --contents pkg_name.deb`
- `dpkg -s pkg_name`
- `dpkg -L pkg_name`
- `dpkg -S /somefile/somewhere`

# Conclusion

Now is the time to install some stuff. Search for famous programs in Linux, see which of them do you like, install them and use them. Intentionally install some rubbish ones and delete them :) Use your knowledge to practice it and stick it in your mind so you won't forget about it. So it becomes intrinsic.
