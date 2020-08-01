There are two kinds of human beings, those who know what Linux is and those who don't. The latter thinks that Linux is an operating system! Yes, that's right, Linux is not an operating system, it's just a kernel. I think this is complicated enough for you to stop reading this book :) But don't worry, you're gonna learn what a kernel is in just a few seconds.

# What is a kernel?
> The kernel is a computer program that is the core of a computer's operating system, with complete control over everything in the system.
- Wikipedia

Not surprisingly, our dear friend Wikipedia is right (like I'm one to tell otherwise). Think of the kernel as a mom in the household. She controls everything, the flow of life. A kernel handles resources like CPU or RAM and assigns them to the programs that need them. Take a look at the list below:

* Programs
* Kernel
* Hardware

What I mean by this list is that hardware is the bottommost layer in a computer, then on top of that sits the kernel which controls the hardware. Programs sit on top and are what we, as users, interact with. Ok, but this doesn't seem to help us, now you may think that kernel is the operating system and other programs are stuff like a music player that you install yourself. So let me clarify furthermore, this is a better-detailed list of the layers in a modern computer:

* User program
* System program
* Kernel
* Hardware

Now I can tell you that the operating system includes a kernel and a bunch of other system programs.

> An operating system (OS) is system software that manages computer hardware, software resources, and provides common services for computer programs.
- Wikipedia

Our friend, wiki, uses "common services" to describe those system programs that I just talked about. These are usually those background services that we don't really know about that much :) Let's introduce our next guest, GNU!

# GNU's Not Unix
GNU is short for "GNU's Not Unix", an abbreviation that repeats itself (recursive). GNU is the majority of those system programs that make up the rest of our operating system which you call Linux. This exact reason is why some people call it GNU/Linux instead. To be honest, this is still a silly unresolved issue, there is a war between the left and right!

I was going to give you a brief history of how these two projects (GNU and Linux) came to existence but I realized that a better approach was for you to watch two documentaries that interview the creators of GNU and Linux. These two documentaries are called [Revolution OS](https://www.imdb.com/title/tt0308808/) and [The Code](https://www.imdb.com/title/tt0315417/). Go ahead watch them, then come back and continue reading.

<p class="note">reader finishes watching the aforementioned documentaries</p>

Now we know what we're dealing with, a big program called Linux and lots of little programs that are parts of a big project called GNU. Now let me introduce you to something that simplifies these for you, a distro!

# Distribution
A distribution (or distro) is just a gathering of some programs including Linux, GNU utilities and a bunch more. You see, if you wanted to install a "Linux" operating system from scratch, you would've needed to take a week off, learn to configure and compile software, then do it all by yourself. That's not an attractive approach. So came the distros. Individuals, groups of people or companies started to do just this. They gathered Linux, GNU tools, compiled them, put them all together, added some other programs to fill in the voids and made it all into a ready-to-install package called distro. Today, we have hundreds of distros just because anyone can make one. But that doesn't mean all of which are worthy of attention. Some are just a hobby, others are designed for specific purposes. However, there are some famous general-purpose ones that are definitely worth checking out. Below, you’ll see some of them, which I tried and liked:

* Ubuntu
* Debian
* Fedora
* OpenSUSE
* CentOS
* RHEL
* Arch
* Gentoo

But of course, as I said, this is just a personal preference. Instead you should search and see for yourself how many are there and just get an idea about distros. Go ahead and open your search engine, search for "Linux distribution - Wikipedia" and open the first link, on the right (under the history section), you’ll find the graph of Linux distributions. You'll notice that Debian and Redhat are the father to most distros. The important thing to know about them is that they have their own package managers (which we'll learn about later). For instance, Ubuntu, which is derived from Debian, shares the same package manager (namely "apt"). This means that if we learn "apt" we pretty much get familiar with the process of managing packages on all the Debian siblings. Oh, and before I forget, did you know that Android is also a Linux distribution? Take a look at the bottom of that graph.

# Conclusion
Linux is just a kernel. GNU is almost all the system programs. Distribution is the collection of these. Is that a straightforward conclusion? :D See you in the next chapter whenever you're ready.

