---
layout: post
title: Chapter Four - Install Linux on a virtual machine
pathToImage: ../../pic.jpg
---

Let's install Linux, shall we? So go ahead and fire up your search engine and search for your favorite distribution. If you don't have a clue, watch the lessons 6 to 9 to see what desktop environment you like, so you'll download the distribution that offers you that desktop environment. Here I'm going to use the Ubuntu gnome. What you are going to download is an ISO file that can be used to burn USB/DVD or directly fed into virtualization software. So search for the official website of your distribution of choice and then navigate to the download page. You are looking for a desktop version or workstation. In the case of Ubuntu, you'll need to go to [ubuntu.com](http://ubuntu.com/), click on the "download" from the top bar and then "ubuntu desktop". The rest of the downloading process should be pretty straight forward. Meanwhile, you can download your virtualization program, you can use either of these two:

- Virtualbox
- VMware player

Choose either one that you're familiar with, or if not, just download the first. Here I'm going to use Virtualbox because it's easier to install on Linux and is also available on Mac (VMware player doesn't have a Mac version at the time of writing). So download the software and install it (I'm going to assume you know how to do that).

## Creating the virtual machine

1. Launch Virtualbox and click on the "New" button.
1. Specify a name for your virtual machine (which doesn't matter at all).
1. Choose "Linux" as OS type and finally choose your distribution's name (or choose the closest match).
1. The next page is going to ask you how much RAM you want to give to your virtual machine. Depending on how much RAM you have in total, give it just enough to run. 1G should work but 2G would be better if you can.
1. The page after that is going to ask you about the hard disk, this is where your operating system is going to be stored as a file. Just choose the default which is for creating a virtual hard disk now (if you had installed a virtual machine and had an existing file, you could recover that VM (Virtual Machine)).
1. On the next page, select the type of file you want, the default should be just fine.
1. Then choose if the whole disk should be occupying the size (which you'll give in the next page) or it should grow only as needed. Dynamic saves you some disk, but static is a bit faster.
1. And now enter the amount of disk you want to create, this depends on your computer as well, 15G would be nice but you're always welcome to give it more.
1. You'll notice that the VM is added and the setup finishes.
1. Now we need to start it (do it).
1. It'll ask you to put in a disk, here you would give it the address of that ISO file we downloaded before. Once you do, you'll notice that the setup begins.

##  Install Ubuntu

1. Now let's install Ubuntu as an example. On the first screen choose the default English as the language (if you're prompted).
1. Then choose "try ubuntu" just to see how the live system looks exactly the same as an installation. It'll give you the login screen and you just need to hit enter twice (the password is blank). Now you have a live Linux just like we talked about in previous chapters. You can continue to explore it but in just a few seconds, we'll have the system installed, so just go ahead and double click the "Install Ubuntu" icon on the desktop.
1. Now choose your language.
1. Accept the normal installation options, just check the "install third party..." so that mp3 plugins and stuff are installed (so you have multimedia working by default). The reason for this is that those plugins are not completely free so you need to explicitly tell Ubuntu that you are okay with them not being free (don't worry they're not gonna cost anything, remember that there is a difference between costless and free software, these are costless, but not free).
1. Now you must choose the partitioning scheme. Since we are doing this in a virtual machine, you don't need to worry about it, just hit the "erase disk and install ubuntu" option. Be careful, if you are installing Linux on your physical machine (dual boot or as the only OS), this option will remove everything on the disk you choose.
1. Now Ubuntu will tell you if you're sure with the partitioning that it'll do for you and since we don't know what that is yet, we are going to accept it as it is :)
1. Then it's time for timezone, choose yours and continue.
1. Then enter your name, username and password and again, continue.
1. And then Ubuntu will begin the installation process, after not a long time, you'll be prompted to restart the system (if you get a message about removing installation media, just hit enter). Do that and you're done.
1. Now you have a working operating system.

Now that you have a Linux installed, it's time to mess with it :D this part is my favorite. The first time, I installed Linux I was in AW for that beautiful Ubuntu red-magenta color. So what I'm trying to say is that you should try out different parts of the newly installed system before continuing so that you'll get familiar with it. If you're not in a hurry, take your time and try to do the things you do on a regular basis in your new Linux OS, for example try the software application to get new software (try downloading vlc player and watching something in it). Just keep having fun with this new thing until you get bored of it. When you feel you need to learn more and see what it's capable of, then continue with the tutorial.

## Conclusion

The next chapter will be about the dual boot. So you should skip that and continue at the next one because that is just an alternative to what you just did. Take care until then :)

