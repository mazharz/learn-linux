Aha! The third question, How! Just like any other operating system, Linux can be installed on different hardware architectures, but unlike other operating systems, Linux can be installed on almost every one of them :) Here we focus on the most common, which is x86_64 (the architecture of most of our PCs and laptops). We have these options to install Linux:


- Virtualization
- Live USB/DVD
- Dual boot
- As the only operating system

# Virtualization

This is the easiest and most secure method to install Linux. You will install Linux inside your current operating system. So you have all the tools you need with Linux running at the same time. If you're not familiar with this, think of it like this. Imagine an airplane simulation game. You see a window that clones the real-world conditions. The same thing happens when using virtualization with the only difference that what you do is actually exactly the same as a real system. You would run a computer inside another one. The good thing about virtualization is that it's extremely safe. For instance, the storage of the virtualized system is just a file inside your current operating system, so if you mess everything up, you have just messed up one file. Another useful feature of this is that you can have multiple operating systems running at the same time. For example, I wanted to connect to my friend's server that was a Windows machine. To do so, I installed a virtual machine and installed Windows on it, which meant I had my own Linux operating system for everything I needed and an instance of Windows running for that specific task. You can even run another version of the same operating system for test purposes so this isn't just a solution to install Linux. Basically, run any operating system on any operating system. The only downside to this approach is that it's not as fast as a standalone system, because first, you are running it inside your current operating system and second, the resources are virtualized, for example, in case of graphic's card, you are only giving a tiny amount of virtualized graphical resource to that operating system.

# Live USB/DVD

After virtualization, this is the safest option. Remember when you install Windows, you insert a DVD or bootable USB and you boot from that? Well in Linux you can do exactly that to boot up a live operating system. A live operating system is exactly the same as a real operating system with the only difference that your changes are not kept after reboot (kind of like read-only). This is particularly useful if you need an operating system with you all the time, for instance, I have a bootable Ubuntu with me all the time, so when I need a Linux, I can just find a computer, insert the USB and boot from it :) voila! You may have noticed that this is not an installation method, but I thought I should mention it here so you'll have an idea of its use cases. Hell! To learn Linux you can just boot up a live USB and try out whatever you need, reboot, and you're back where you were, no change to your current operating system.

# Dual Boot

This one is a risky method to install Linux. Many things can go wrong. So I wouldn't recommend this because I have seen many people lose their data because of a tiny mistake in partitioning or bootloader installation. If you know what you're doing, it's a great way to have Linux and other operating systems on the same system, but because you're reading this, you probably don't know what you need to know yet. I'm still going to guide you in a later chapter, but I strongly suggest that you use virtualization for now and then you can come back to dual boot later when you have the skills to survive a disaster, if one occurs.

# As the only operating system

This one is my favorite. And I think it's pretty self-explanatory. Just install Linux on a computer that's not your main one (or in my case that is). But I don't think that's possible for everybody. To s/he who has an extra computer lying around, this is the best option though.

# Conclusion

So this tiny chapter outlines the options we have. In the next one, we'll actually begin the installation process and get a Linux ready for the rest of our journey.

