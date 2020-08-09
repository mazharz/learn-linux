The other big family of distros are those which are derived from redhat. Fedora is what people usually use on their desktops. Here we see `dnf` which is the successor of `yum`. You may want to look into `yum` for yourself, because chances are that you may need to interact with a redhat or centos server (which still use `yum`). `dnf` is the future but we can't fully get rid of our past, it's worth learning anyway.

# GUI

Depending on your distribution/desktop you may or may not have GUI front-ends to your package manager. Especially in case of something like OpenSUSE, you would have a well-crafted graphical package manager front-end but in other distros you may not have one. This is fine because we almost always end up using the terminal anyway. So it's not a determining factor, if you have one, then it's there, you may use it for a while, but you'll eventually come to the understanding that it's not worth wasting time on. The main reason for that is that when in command-line, you see all the things that go wrong and you will understand them more clearly.

# /etc/dnf

As you can guess pretty easily, the configuration files for `dnf` package manager are here.

# /etc/yum.repos.d

But here are the repository configuration files. [Here](https://docs.fedoraproject.org/en-US/quick-docs/repositories/) is the official documentation on repositories that I recommend you read.

# rpm fusion

[RPM Fusion](https://rpmfusion.org/) provides software that the Fedora Project or Red Hat doesn't want to ship. You need it to be able to play common multimedia files (fedora officially doesn't support non-free software) or to be able to install graphic drivers.

# Checking for updates

```bash
$ sudo dnf check-update
```

# Updating (and upgrading)

```bash
$ sudo dnf upgrade
```

<p class="note">You can also use <code>$ sudo dnf update</code> but that's an alias for the <code>upgrade</code> command.</p>

# Install

```bash
$ sudo dnf install gimp
```

# Remove

```bash
$ sudo dnf remove gimp
```

# removing the orphan packages

```bash
$ sudo dnf autoremove
```

# Search

```bash
$ dnf search gimp
```

<p class="note">You may want to run <code>search</code> command with <code>sudo</code> because it checks the metadata before searching, so it will download the metadata (which is a couple of megabytes) again. But that same metadata is previously cached for the root user.</p>

# Seeing the metadata of a package

```bash
$ dnf info gimp
```

Comparable to `apt`'s `show` option.

# Listing

```bash
$ dnf list --installed
```

```bash
$ dnf list --upgrades
```

# Download-only

```bash
$ sudo dnf install --downloadonly gimp
```

# rpm

Similar to `dpkg` that we saw before, take a look into `rpm` for yourself.

# Conclusion

As you can see, once you learn one package manager, the others are literally doing the same thing with a different syntax (or in this case mostly the same syntax). There are fundamental differences on how these package managers work and why one is better than the other but to be honest, for regular users, it doesn't really matter that much.
