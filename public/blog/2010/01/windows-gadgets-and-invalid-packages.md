title: Windows Gadgets and Invalid Packages
date: 2010-01-24 09:48
excerpt: 
categories: javascript, programming

I've recently upgraded to Windows 7 and decided to experiment with the in built gadgets. Windows gadgets are built on web technologies; each gadget is really just a couple of HTML pages glued together with JavaScript. This is good in principle but there are enough differences between the gadget environment and Internet Explorer to make testing difficult.

<!--more-->Today I started encountering the cryptic error message "This is not a valid gadget package" on a project I've been working on for the last few days. This is not the most useful of error message and had me perplexed for a little while. It turns out there are a couple of common causes for this problem:

*   Firstly, simple zipping up a folder and renaming it to  `foo.gadget ` generally won't work. Your  `gadget.xml ` manifest must be in the top level of the archive and Windows native zip handling (and most third part applications) will compress a folder, not its contents. To get around this you can zip the files from inside your gadget directory. This problem stung me the first time I tried to run my application, but is fairly easy to diagnose - just check the contents of the zip file after you've created in and before you rename it.
*   Some people have reported problems when setting the application version number to a simple value like "1" won't work. You need to use the format  `{major.minor.revision.build} `. Changing the version to 1.0.0.0 should be fine. It's possible this only affects Vista; I couldn't replicate this in Windows 7, and this wasn't the cause of the error I was encountering.
*   The gadget.xml file must be in UTF-8 (or ASCII) format. UTF-16 simply won't work. Windows 7 will warn you of an invalid manifest in this situation, which is more helpful than the generic error message I was getting.
*   Eventually I stumbled onto the solution to my problem. It turns out that if you include a zero length files in your gadget archive then it can't be installed. I'd removed some styles from a stylesheet, leaving it blank. Simply removing the file caused the problems to clear up.
All in all nothing was really learnt from this other than error messages should include information specific to the error and that there should be a debug more for gadget development.

The gadget I'm developing is very plain; meant more as an experiment than something useful, but I did build a few small tools that made development easier and that I hope to share in the near future.