Ahh! Here we are, I can't remember how many times I promised you to teach you about package management, but we are finally here. Let's start by talking about the concepts first.

# WTF is a package?
It could be anything! But it usually is a program. Other common packages may be fonts, themes, extensions for certain programs, ... So in summary, anything :D But why the hell should we even care about packages? To answer that, I will first tell you a tale of Windows.

# How Windows users handle this kind of thing!
Let's say I'm a Windows user (which I was) and I decide to install a program, let us say `gimp`. The best possible solution would be to go to my favorite search engine (aka. Google) and type the name of the program. The first result will highly likely be the official website. I go to the website, head over to the downloads section and download the version that matches my operating system (x64 version). Then after the download finishes, I double (or single) click the installation suite and follow the on-screen instructions to get it installed, in some cases I even may restart my computer after it's installed.

That's all good! easy and straight forward, but there are a couple of problems with it. The biggest one is updating process. The general idea is that security issues are fixed with new versions of different software, so it's crucial to update everything every once in a while. But following this method, updating is a pain in the lower back!!! You have to update Windows itself, then go ahead and head to the "Programs and features" in control panel and update every piece of software you have individually. To be fair some software developers are aware of this and provide self updating features to their programs. But still, you have to rely on the developer's good will and even in that case, you may not open that piece of software for a long time for it to be able to update itself. So let's agree that this isn't the best way to update our software.

Another problem with this approach is that every piece of software must provide everything within itself. Meaning that if both Photoshop and gimp are using a certain library, the library must be included in both their packages and is installed with both of them (duplication). This is called a static library, it is baked into the program at compile time and chances are it'll be installed on our computer a couple of times.

Those are the two major problems with manual program installation. Let's address them with package management.

# How Linux/Unix users handle this kind of thing!
We use package managers. A package manager handles software installation, deletion, updation, ... for us.

Now if I want to install gimp, I don't go over all those steps, I just execute one command and it'll be installed automatically! Like this:

```bash
$ sudo apt install gimp
```

Or:

```bash
$ sudo dnf install gimp
```

Each distribution has a team of package maintainers and all they do is making sure the package manager is correctly handling all these stuff behind the scenes. So they may go ahead and download `gimp` from it's official website, compile it for us, and then package it up real nice. We all thank them for their great work :) And since they are doing this all the time, all we need to do to update every single program (along with our operating system) is to execute only one command, like this:

```bash
$ sudo apt update; sudo apt upgrade
```

Or:

```bash
$ sudo dnf update
```

These commands will query for the packages having newer versions, and if so, they will donwload and install them accordingly. So we won't need to worry about maintaining our programs manually. However, it's not all unicorn and rainbows. Not every single piece of software is available through the package manager. Mostly safe and free software are provided by the distributions and every distro has it's own policies on what to include and what not. Additional to that, there are other package managers that cover even more applications, `snap` and `flatpak` are two good examples. But there may be times that even those won't provide the program that we want, in that very rare but still possible case, we must do it manually. Usually the manual way is avoided, but when necessary, one must download the program, compile it and install it by hand (which is different for each program but is not that hard, there usually is a readme file on how to do all that).

Additionally, because package managers have control over all the packages, they use shared libraries (or dynamic) instead of static libraries. Meaning that there is one version of a certain library installed (there are exceptions for having more but those are less common). This causes less storage usage. Installing an Ubuntu takes up only 7G of storage, and that's including a browser like `firefox` and an office suite like `libreoffice`. Compare that to a fresh installation of Windows that takes a couple of times more. This isn't just about storage. This has other implications. When a library is updated and a security bug is fixed within it, that means every piece of software that uses that library is now safer. But in the static approach each and every single copy of that library must be updated accordingly. So you see how beautiful is package management and why do we care so much about it in the Linux community (usually users brag about their distro's package manager and compare it to other distros for entertainment!).

# WTF is a repository?
In order for a package manager to work, it needs to contact a remote server for the compiled and ready-to-install packages that it provides. Distributions provide their servers and software repositories to satisfy exactly this matter. A repository is a set of packages along with some metadata about them.

# metadata
Data is something that has value in it. A picture is data. Meta data is data about data. So metadata for a picture can be it's dimensions (1920x1080), size on disk (1MB), and other properties like with what apreture it was shot or the shutter speed or the model of the camera it was shot with. Packages have some metadata as well. For example, the metadata for `gimp` package is like this:

```bash
$ sudo dnf info gimp
[sudo] password for john: 
Last metadata expiration check: 1:42:12 ago on Sat 08 Aug 2020 10:59:45 AM +0430.
Installed Packages
Name         : gimp
Epoch        : 2
Version      : 2.10.20
Release      : 1.fc32
Architecture : x86_64
Size         : 113 M
Source       : gimp-2.10.20-1.fc32.src.rpm
Repository   : @System
From repo    : updates
Summary      : GNU Image Manipulation Program
URL          : http://www.gimp.org/
License      : GPLv3+ and GPLv3
Description  : GIMP (GNU Image Manipulation Program) is a powerful image composition and
             : editing program, which can be extremely useful for creating logos and other
             : graphics for web pages. GIMP has many of the tools and filters you would expect
             : to find in similar commercial offerings, and some interesting extras as well.
             : GIMP provides a large image manipulation toolbox, including channel operations
             : and layers, effects, sub-pixel imaging and anti-aliasing, and conversions, all
             : with multi-level undo.
```

Metadata is different for different package managers, for instance `apt`'s metadata might be different and that's natural.

So you can either update the metadata (information of packages) or the actual packages which we will do in the chapters to come. It should sound logical that we must update the metadata before updating the packages themselves because we need to know the latest information about them to be able to update them to the latest version (version is itself a metadata you know). This is sometimes done automatically in some package managers, and sometimes it should be separate commands (which again, we'll discuss accordingly for each package manager).

# WTF is a mirror?
Simply a copy of a repository. Different groups or individuals can host their own mirror of a repository. This way every single user doesn't have to download the data from the limited number of servers that the distribution provides. There are numerous number of mirrors around the globe, and naturally using one that is closer to you can be faster and more efficient.

# Conclusion
So that's the general idea of a package manager. It's super useful and important to understand, in fact it's one of the major knowledge gaps that must be filled in order to operate a Linux machine appropriately. Software develoeprs are familiar with this, namely `npm`, `yarn`, `pip` and others are super famous package managers for developers (is it obvious or should I publicly declare that I use `npm` everyday?). Good news is that if you are already familiar with one of these, the next chapters will be extremely easy to go through.