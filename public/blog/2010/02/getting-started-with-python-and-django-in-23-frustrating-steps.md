title: Getting started with Python and Django in 23 frustrating steps
date: 2010-02-27 14:52
excerpt: 
categories: programming, python, uncategorized

Should I or shouldn't I? Should I ditch my well-worn PHP and the frameworks I know so well to go with this new-fangled (silent-d)Jango thingy I hear the cool kids talking about? It's a big decision, as this project is going to be the big one (you know, the one that will change the world and all that).

I've worked with PHP for over six years. It has it's warts (and how) but it's very much a known quantity at this point. On the other hand, when I have used Python it's been a much more pleasant experience. The fact that this is a personal project makes the decision easier: let's ditch old mate LAMPhp go with LAMPy. It's almost dinner time and the latter sounds like it'd go well with an ale anyway. So, starting with a brand new dev box, where do I begin?<!--more-->

1.  Go to the Python website
Of course. So P-Y-T-H-O-N-DOT-C-O-M, Enter. Er. Not exactly what I was looking for (and not what you should be looking for if your boss is anywhere nearby). Let's try that again. Google to the rescue. Apparently I want DOT-O-R-G.
2.  Choose a binary
OK, so I know from listening to the fine folks over at proggit that there is an attempted Python 2 to 3 migration happening at the moment. There is no point investing my time in an outdated version so I'll grab the 3.1 download.
3.  Install Python
C:\Python31\. Hmm. Python, I know that you have a high opinion of yourself but you're not that important to me just yet. You can go play nice in Program Files with all the other programs.
4.  Download Django
Now it's Django's turn. There's the installer. Python 2.3 or higher, you say. Well logically 3 is higher than 2.3, but doesn't Python 3 have problems with it's younger siblings? Let me just check with a hit of the old Google... yup, as I thought. We'll have to go with the older version.
5.  Install Python
Python 2! It's not quite as fun when you know your downloading an outdated model.
6.  Install Django
So I've downloaded Django and now I've got an archive full of Python files. How do I install them?
7.  Read the instructions
But I hate doing that!
8.  Run setup.py
So I have to run the included setup.py file? If I launch the file from Explorer it prints something then immediately exits. Let's open up the command line, cd to the correct location and run it again.
9.  Run setup.py install
OK, I forgot the "install" argument. You could have just told my with a popup; slept after printing the error; or heaven forbid, prompted me for an action. At least it's working... can't copy!? What do you mean?
10.  Run setup.py install as an administrator
Ah, of course you can't copy to my Program Files. Time to launch a new command window as an administrator, renavigate to the archive and install.
11.  Start a Django project
You have to love the feeling you get when something works first time.
12.  Define database settings
Edit my project settings, easy enough.
13.  Run the Django server
Error: MySQLdb blah blah blah. What does that mean? Wait, Python does come with MySQL extensions right? Right!? It's not like it's one of the the most popular RDBMS on the planet.
14.  Google it
Hi Google. Yes, I'm back again. Do you know which module I want? Wow. That's a lot of results. Are these the same? I'm looking for MySQLdb, not MySQL-Python. Ah, I see. They're the same.
15.  Go to SourceForge
Why is this on SourceForge? Who's distributing it? Ah, screw it. There is a big download button. I'm sure it's safe. I mean, the button is green. Green is good. Red is bad. I didn't get this far without learning a few things.
16.  These are not the files you are looking for
What do you mean they are the C files? I want a binary installer dammit. I'm a Windows user. I'm like a ten year old who still has training wheels on his bike; I don't know anything about make files and building binaries.
17.  Get the binary
At least I know where the binaries can be downloaded... don't I? Why do the binaries stop at Python 2.5 on the SourceForge page?
18.  Google it!
Yes, Google, I know I was just here. Just tell me where I can get a binary. Please stop laughing at me.
19.  Download a binary
There are a bunch of unofficial installers. Which one do I choose? bobs-super-awesome-mysql-python-for-2.6.exe looks reputable.
20.  Install MySQLdb
Great, a proper installer this time. It looks a bit "Windows 95" but beggers can't be choosers. At least with an installer this should be eas... Hmmm, it's frozen.
21.  Think back
Wait, the other installer didn't like running as a non-priviledged user. Perhaps if I run as root. Ah-ha. That's done it.
22.  Install Python
How silly of me. It should be obvious that all the C extensions only offer win32 versions. What exactly is the point of having a 64 bit binary then? Let's reinstall Python. Joy of joys.
23.  Enjoy
Success at last. Time to revel in my new found smugness as a Pythonista:	"If the implementation is easy to explain, it may be a good idea." You tell 'em Guido.

## The Takeaways

Sarcasm is fun! Fixing things is hard. Nevertheless, there are quite a few frustrating hurdles that face those new to Python and Django.

*   If the .com variant of your website is a porn site then you have problems. Developers might know to go to the right site but think of clueless managers.
*   The Python download page should spell out the benefits and drawbacks to each binary download. Be realistic. It's better that the developer gets the version they need first time rather than having to come back later on for seconds, or thirds.
*   It's not the 90's any more. It's not acceptable to expect to be  installed to C:\ root.
*   I didn't mention it in the article but Python doesn't add itself to my PATH. Having to dig around in my computer settings to be able to easily run Python from the command line is a pain.
*   Win64 has existed for a long time now. Shouldn't it be supported by common modules?
*   Installers should be aware of restrictions introduced by Vista's UAC model. This is basic stuff. Hanging on install without displaying errors is not acceptable.
*   The MySQL module should not be a second-class citizen maintained by some third party. If you want to poach PHP developers then you have to speak their language... er, database.
*   Setup tools could be a lot friendlier by prompting the user for an operation if an argument is not provided.
*   The Django download page should make it clear that Python 3 is not supported. Dropping backwards compatibility is not actually that common in other languages.