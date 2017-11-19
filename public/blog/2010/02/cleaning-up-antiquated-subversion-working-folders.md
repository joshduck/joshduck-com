title: Cleaning up uncommitted subversion working folders
date: 2010-02-27 12:25
excerpt: 
categories: uncategorized

Today I stumbled across an unused working folder in a dark and dusty corner of one of our development servers. The directory had a couple of dozen un-checked in changes. Some were from barely a month ago while others dated back years. Not wanting to discard any important modifirations I cobbled together a bash command to show me when each file was last modified (the file's mtime).<!--more-->
<pre lang="bash">for CHANGED in $(svn status | sed "s/^.......//" | awk "/.\./"); do
    echo $CHANGED;
    ls -l "$CHANGED";
done | cat > changes.txt</pre>
The `sed ` naively removes the first nine characters from the file status from the `svn status` output, which should just leave the file name.

The `awk` removes all files and paths without an extension - this was necessary because I later fed the output through `ls`, and I didn't want any folder listings.

The `cat` allows me to direct the output to a file. If you aren't piping to a file then you can omit that part.

Finally, `ls -l` shows the mtime of the file. To show the atime I could have used `ls -lu`, though the results of this were a little inconsistant for me (some times were after the mtime, which seemed counter-intuative). I used `ls` because I couldn't seem to find a replacement for `stat` that was available on a vanilla Solaris install.

If you're on a Linux box the following should work just as well (without trying to filter by extension):
<pre lang="bash">for CHANGED in $(svn status | sed "s/^.......//"); do
   stat "$CHANGED";
done | cat > changes.txt</pre>
Of course, I'm still new to bash coding so if you have a script that simplifies this I'd love to hear about it.