title: Abusing the Cache: Tracking Users without Cookies
date: 2010-01-29 12:02
excerpt: 
categories: javascript, php, programming

I've been doing a little bit of research into ways to misuse browser history and cache and came across a very simple technique for tracking users without the need for cookies. Firstly, a [demo](http://joshduck.com/random/tracker.php). If you watch the HTTP requests you'll see that there are no cookies being used.

<!--more-->To track a user I make use of three URLs: the container, which can be any website; a shim file, which contains a unique code; and a tracking page, which stores (and in this case displays) requests. The trick lies in making the browser cache the shim file indefinitely. When the file is requested for the first - and only - time a unique identifier is embedded in the page. The shim embeds the tracking page, passing it the unique ID every time it is loaded. See the [source code](http://joshduck.com/random/tracker.phps) _(thanks to Nathan for pointing out the date error)_.

One neat thing about this method is that JavaScript is not strictly required. It is only used to pass the message and referrer to the tracker. It would probably be possible to replace the iframes with CSS and images to gain JS-free HTTP referrer logging but would lose the ability to store messages so easily.  

As to how useful this actually is; the only use cases I can really think of are not exactly legitimate. The most obvious is to track users who won't accept cookies. This does have advantages over cookies too; namely that this kind of tracking is completely silent. Virus scanners which search for an delete tracking cookies won't affect sites using this method. Likewise, manually clearing cookies won't work.

The most practical implementation would be to use this in concert with cookies to make tracking IDs more sticky, so they could outlast a user clearing their cookies. I've also been looking into adapting the link colour hack to store custom values in the browser history (this is easily doable). Combining these three techniques would mean a user would have to simultaneously clear their cache, their history and their cookies to circumvent tracking.