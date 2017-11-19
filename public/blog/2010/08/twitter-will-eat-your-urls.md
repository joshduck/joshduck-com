title: Twitter will eat your URLs
date: 2010-08-28 18:26
excerpt: 
categories: uncategorized

My [HTML periodic table ](http://joshduck.com/periodic-table.html) has been getting a lot of attention on Twitter over the last few days. Because the page has a relatively short URL a lot of people have been tweeting the actual URL rather that using a  URL shortening service. This has been good for me because shorteners remove the HTTP referrer and stop me from seeing where my Twitter traffic comes from. 

A peek at my error logs did reveal one potential problem though. I've had well over a thousand hits to invalid URLs like [http://joshduck.com/perio](http://joshduck.com/perio). These are obviously URLs which have run up against Twitter's infamous 140 character limit and have been truncated. This results in wasted traffic for me and a waste of time for my visitors so I decided to push a quick fix. <!--more-->

I was already redirecting 404's to a custom PHP page, so I added a check which redirects anyone who gets a 404 after accessing a truncated URL to the correct page. To stop similar problems from happening in the future I've added a short script that looks at static pages and blog posts on my site and tries to match them against any the requested URL when serving a 404 page. These URLs are then used to display a list of suggested links to the user. The script also does a little regex magic (read: hackery) to find the titles of the suggested links. Now URLs like [http://joshduck.com/photo](http://joshduck.com/photo) or [http://joshduck.com/blog/201](http://joshduck.com/blog/201) will give visitors a push in the right direction.

The actual script I use is specific to the code I use for my own site, but I've supplied a generic version of the script below.

<pre lang="php">
<?php
$request_path = $_SERVER['REQUEST_URI'];

// Special case: redirect anyone trying to get to periodic-table.html straight there.
if (strlen($request_path) > 2 && strpos('/periodic-table.html', $request_path) === 0) {
	header('Location: /periodic-table.html');
	die();
}

// Check static files.
$suggestions = array();
foreach (glob('/*.html') as $file) {
	$url = '/' . $file;
	if (strpos($url, $request_path) === 0) {
		$content = file_get_contents($file);
		if (preg_match('/<title>([^<]+)/i', $content, $matches)) {
			$title = $matches[1];
		} else {
			$title = $url;
		}
		$suggestions[$url] = $title;	
	}
}
</pre>