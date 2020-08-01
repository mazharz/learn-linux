This is something we do almost everyday without noticing it. We open our file manager, start navigating and try our best to find what we're looking for. In command line, we have tools to do just this for us, because as you know, command line doesn't have an easy-to-understand interface and using `cd` and `ls` repeatedly is definitely a poor solution.

# find

Lucky for us, the command name is impossible to forget. So let's start with the most easy way to use it:

```bash
$ find . -name "Queen"
./hard_disk/Music/Queen
```

What just happened? First, we give the starting point of our search, which is `.` (current directory). This means that `find` will try to go in all the subdirectories of the starting point we give it to. So here, everything inside the home directory will be searched (if you execute it for yourself, you should see it take some considerable time). After our starting point, we give `find` some expression to evaluate and show us files or dirs based on that threshold. Above, we gave it the `-name` option which searches for files or dirs with that exact name. Meaning that the file or dir should be exactly "Queen" to be shown to us, and something like "Queen band" would not be returned. To solve that, we can use something called `regex` which we haven't learned yet, but here, we can briefly see it in action.

```bash
$ find . -name "*Queen*"
./hard_disk/Music/Queen
./hard_disk/Music/Queen/(1982) Hot Space/11 Queen - Under Pressure.mp3
./hard_disk/Music/Queen/(1976) A Day at the Races/06 Queen - Somebody to Love.mp3
./hard_disk/Music/Queen/(1975) A Night at the Opera/09 Queen - Love Of My Life.mp3
./hard_disk/Music/Queen/(1975) A Night at the Opera/11 Queen - Bohemian Rhapsody.mp3
...
```

What happens here is that `find` will give us any file or directory that has "Queen" in it, no matter where it is in the name. But pay attention, the place in which the files or directories are won't matter here. What I mean is that the above output is given to us because there is a "Queen" in file names not because that they were in the "Queen" directory (this should be obvious but I thought I should mention it anyway). Similarly, we can filter files that begin or end with the phrase "Queen":

```bash
$ find . -name "Queen*"
./hard_disk/Music/Queen
./hard_disk/work/some_project/.../zoneinfo/Australia/Queensland
$ find . -name "*Queen"
./hard_disk/Music/Queen
./hard_disk/Music/Queen/(1973) Queen
```

Ok that makes sense. But take a look at this:

```bash
$ find . -name "queen"
$
```

It returns nothing! The reason is that the option `-name` is case-sensitive, meaning that it will search for "queen" and not "Queen" or "QuEeN". But there is another option:

```bash
$ find . -iname "QuEeN"
./hard_disk/Music/Queen
```

And you can use those stars (regexes) with `-iname` too. Go ahead and try it for yourself. BUT! But `find` is more than just a find-based-on-name tool! In fact it's way much more. Let's see another example:

```bash
$ find . -amin 1
./.local/share/TelegramDesktop
...
```

What the hell is this? `-amin` is described in the man page as "File was last accessed n minutes ago". So you see how much power we are starting to feel! You can do almost anything you want with `find`. Let's see another useful option:

```bash
$ find . -size +2G
./VirtualBox VMs/ubuntu/ubuntu.vdi
./VirtualBox VMs/win10/win10.vdi
```

What we're saying is: "give me files that are bigger than 2G in size". And that is just plain awesome, don't you think? Go ahead and read the man page for yourself to get even more cool stuff! But I should warn you about one of the "ACTIONS" which find has. There is a `-delete` action which you can append to your command and that will delete all those files that match your expression. Beware of this because you don't always know for sure what will be found, and if you make a tiny mistake you can end up deleting a lot of stuff. Before we go on to the next command, I should remind you that all the above commands were executed with their starting point set to the current directory (`.`). But you can use any other path you want. In fact one of the most useful ones is root (`/`). Sometimes I find myself too lazy to search for a file and I put the burden on poor `find`. I end up executing something like this:

```bash
$ sudo find / -iname "*something*"
```

First, I prepend `sudo` so `find` has all the permissions it needs to read the files and hence find them for me (we'll talk about `sudo` soon). Moreover, I use `-iname` so if there are upper-case letters in the name, `find` won't ignore them. And then the stars will make sure that find will `find` files containing that desired phrase for you (that sentence had too many “f” sounds).

# locate

I don't know if you noticed or not, but `find` could take forever. To be honest that's understandable, since it has to scan every single file on the disk. What if we could have an indexed list of all the files so that we would read only a single source (which is way faster). Well that's exactly what `locate` does:

```bash
$ locate Queen
/home/john/hard_disk/Music/Queen/(1978) Jazz/03 Queen - Jealousy.mp3
...
```

Notice the speed? It's too fast compared to `find` and that is because it keeps a database of all the files and directories. What? A database? So how frequently does `locate` update it's database? Let's create a new file with a unique name:

```bash
$ touch thisfileisveryunique
$ ls thisfileisveryunique -l
-rw-rw-r-- 1 john john 0 Mar  4 10:18 thisfileisveryunique
$ locate thisfileisveryunique
$
```

Now execute this:

```bash
$ sudo updatedb
[sudo] password for john: 
$ locate thisfileisveryunique
/home/john/thisfileisveryunique
$
```

We first update the database which `locate` uses, then we use `locate` again and this time, it works! Proving that I'm not lying. The most useful option here is the `-i` which makes locate ignore case (case-insensitive search).

# Conclusion

You may not use `find` and `locate` too much on a desktop machine and that's totally fine. But the moment you are left alone with a dark command-line-only server, you find yourself desperately trying to navigate back and forth to different locations and finding files. There, `find` will do you a favor. And `locate` is mostly useful for preventing an unnecessary high disk usage every time you try to find something. Use them both and spend some time with them because chances are, you will need them one day and that day you will thank yourself for preparing in advance. But that's not all. In fact, there's more. If you're feeling adventurous, you should try `fzf` and see what a beauty that is :) With that in mind, let's move on to the next chapter.

