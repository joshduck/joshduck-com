title: Dead Zend: "We can't be bothered" is not a valid excuse.
date: 2011-01-28 02:59
excerpt: 
is_published: false
categories: php

I had a client send me a copy of their website for testing purposes today. Some of it used off-the-shelf commercial PHP components which were encoded with a product called Zend Guard. I'm generally not a fan of encoding files, but headed off to get the relevant extensions from the Zend website. After installing the extension I found Apache throwing a bunch ominous errors when trying to decode a file with the extension<!--more-->

> The encoded file has format major ID 1, whereas the Loader expects 4
Hoping I just missed a configuration variable I decided to check out [what Zend had to say](http://forums.zend.com/viewtopic.php?p=29916#p29916) about the error.
> Files to runon PHP 5.3 must be re-encoded from the original source for 5.3\. 5.2 encoded files will not run.
Er... what? It turns out that Zend have decided to couple their PHP encoder and optimizer together and directly encode PHP interpreter instructions rather than develop a pesky intermediate format. It's common knowledge that the PHP interpreter has undergone massive, sweeping changes in every major revision. I can't imagine what thought process went on at Zend that made them think it was OK to encourage users to distribute byte code for such an interpreter?.

Zend's lack of forsight means that millions of lines of distributed code are now locked to a version of PHP that has now reached its end of life. I can't tell if their supposed solution of "re-encoding" the code is stupid or just lazy. What exactly do they think an encoder is for if not to **stop people accessing the source code? **Thousands of developers are simply expected to track down a new copy of the encrypted code through potentially shelved products, defunct companies or AWOL freelancers.

Not surprisingly, the [product page](http://www.zend.com/en/products/guard/) for Zend Guard doesn't mention the limitations. It actually tries to claim the complete opposite.
> The only product that provides with [sic] protection for object oriented programs created with PHP 4 or PHP 5
The frustrating thing is that this is not meant to be some fly-by-night company. Zend have styled themselves as the "official" PHP company. Ironically Zend competitor IonCube has no issue running their PHP 5.2 encoded files on PHP 5.3 installs.