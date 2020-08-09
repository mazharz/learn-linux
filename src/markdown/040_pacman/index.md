Probably the most appropriately named `pac`kage `man`ager. It's for those who love Arch and her children.

# Repositories

In Arch herself, there are three main repositories, namely, `core`, `extra`, and `community`. But the majority of packages are somewhere called AUR (Arch User Repository). You can compare it to RPM Fusion but it's also comparable to the PPAs that you see in debian land. It's a huge collection of user created packages (so not guaranteed to be safe).

# /etc/pacman.conf

The main configuration for pacman. You can enable official repos there. I usually immediately enable colored output after Arch Installation.

# /etc/pacman.d/mirrorlist

Here are the mirrors, you can configure them (from top to bottom) so that when pacman tries to find something or install something or anything else that requires repository to be consulted, it'll go through that list one by one. There are also tools that automate the sorting of that file based on the connection speed and ...

# Updating the metadata

```bash
$ sudo pacman -Sy
```

Similar to `$ sudo apt update`.

# Upgrading

```bash
$ sudo pacman -Syu
```

Upgrades the whole system (not AUR though).

# Installation

```bash
$ sudo pacman -S gimp
```

Arch is weird, they call it `s`ynchronization for some reason. Sort of saying "body hydration process" instead of "drinking water". It's technically right, but what the hell?!

# Search

```bash
$ pacman -Ss gimp
```

# Download-only

```bash
$ sudo pacman -Sw gimp
```

# Clearing the cache

```bash
$ sudo pacman -Sc
```

# Remove

```bash
$ sudo pacman -R gimp
```

- `-s`, `--recursive`: Remove each target specified including all of their dependencies, provided that (A) they are not required by other packages; and (B) they were not explicitly installed by the user. This operation is recursive and analogous to a backwards --sync operation, and it helps keep a clean system without orphans. If you want to omit condition (B), pass this option twice.
- `-u`, `--unneeded`: Removes targets that are not required by any other packages. This is mostly useful when removing a group without using the -c option, to avoid breaking any dependencies.

```bash
$ sudo pacman -Rs gimp
```

```bash
$ sudo pacman -Rsu gimp
```

# Removing the orphan packages

```bash
$ pacman -Rns \$(pacman -Qtdq)
```

Since Arch is all about simplicity, they don't care to provide such a useful option on it's own, the user is responsible for doing all that himself/herself. This is not complaining though, it's stating the facts in a sarcastic way only :D

# Listing

List the installed packages:

```bash
$ pacman -Q
```

Also look for these two:

- `$ pacman -Qi gimp`
- `$ pacman -Ql gimp`

# Installing from file

```bash
$ sudo pacman -U ./file.tar.gz
```

# Further readings

- `pkgfile`
  - `$ sudo pkgfile --update` (to update the package repo)
  - `$ pkgfile /etc/i3/config`
- Installing from AUR manually
  - `$ git clone; makepkg -si` Installation
  - `$ git pull; makepkg -si` Updating
- AUR helpers

# Conclustion

Arch linux needs time and effort. You should be willing to read it's wiki (which is an amazing place to learn new things) and try things out yourself. You must be willing to do most of your stuff, yourself. If that's who you are, it's amazing, if not, it's gonna be less efficient than something like Fedora or Ubuntu for example. There are derived distros like Manjaro that automate some of the DIY for you, so you may want to look into those as well. But remember not to get obsessed with distros. Try a couple of different ones, and stick with one. At the end of the day, it's the same sh\*t in different clothes :)
