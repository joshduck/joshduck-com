title: Optimising for Iteration
date: 2017-02-28 02:54
excerpt: 
categories: uncategorized

![Mark Zuckerberg in front of a Move Fast poster](http://joshduck.com/blog/wp-content/uploads/2017/02/move-fast.jpg)

Late last year I left Facebook, but I still like to follow what's happening inside the company's multicoloured walls. So last week I watched with interest with Mark Zuckerberg laid out a [long-term vision for Facebook](https://www.facebook.com/notes/mark-zuckerberg/building-global-community/10154544292806634?pnref=story) that focused on building meaningful communities and influencing the real world.

This plan seems to be both a reaction to the US election and resulting political drama, and an attempt to capitalise on the more serious tone that Facebook discussions can take compared to networks like Instagram and Snapchat.

Whether this approach will work as a product is an open question. It might take Facebook some time to get right. But they have repeatedly shown a willingness to push an idea until it either runs out of steam or takes flight. Even successful products like Messenger or Ads have seen years of continual iteration.

## Technology choices that matter

It's tempting to chalk up Facebook's ability to to ship products quickly to the company's size. And of course a lot of engineers can write a lot of code. But the Mythical Man-Month has remained a cliche in our industry for a good reason: it's easy to drown in the overhead of communication and technical debt.

Facebook has remained nimble despite it's size, not because of it. And this nimbleness has required deliberate cultural and technical choices. Many of these choices -- like monorepos, or a reluctance to ditch PHP -- are at odds with industry best practices, but have been the right call for a company optimising for speed.

### Homogenous tech stack

Shipping a product at Facebook is as simple as committing JavaScript and PHP files to a monorepo. Engineers don't have to worry about setting up continuous integration, hosting, deployment, configuring databases, or caching layers. These common elements are already built and are well maintained. Engineers just only to worry about building the unique parts of their product, and when they change teams they can reuse their knowledge on different products.

### Continuous, gradual, code improvement

A homogenous stack doesn’t have to mean a static one. Engineers at Facebook often use automated [codemod tools](https://github.com/facebook/jscodeshift) to update all the consumers of an abstraction as it changes. This drops the incremental cost of maintaining additional products close to zero.

### Small, flexible primitives

The common abstractions that are available to engineers are fine grained and can be composed in novel ways. The [prototype for Timeline](http://www.businessinsider.com.au/facebook-timeline-began-as-a-hackathon-project-2012-1) was built in a single night by reusing existing abstractions.

Many mature products are backed by standalone services, like a [fast index](https://research.fb.com/publications/unicorn-a-system-for-searching-the-social-graph/) for Search, or [custom storage systems](https://code.facebook.com/posts/820258981365363/building-mobile-first-infrastructure-for-messenger/) for Messenger. But even for these products the business logic lives primarily in the PHP codebase, and can be changed with relative ease.

### Focusing on impact, not the code

Each organisation, and even the company as a whole, has an overarching goal and set of metrics that use to guide their work. Shipping a project means nothing if it doesn't make the product and corresponding metrics better.

Teams are steered away from thinking something is "done" when the initial release is ready to roll. Facebook Search took years to [get to two billion daily searches](https://techcrunch.com/2016/07/27/facebook-will-make-you-talk/) after the launch of Graph Search. They got there by improving the product in response to user feedback instead of doubling down on the original product vision.

## Takeaways

Being able to quickly iterate on products is just one quality that defines a code base. Other organisations might prioritise performance, or code size, or stability. But the important thing is to choose something that fits the needs of that organisation. Optimising for the wrong dimension can lead to wasted effort, or even worse, hurt the products they build.

When working with a new code base I like to ask myself how the abstractions and team structures facilitate iteration. Could we build and ship a project without spinning up a new project and team? Does the code we write today becomes an asset or a liability in the future? And how could we reduce the number of cross team interactions that have to happen to ship a product? Often with a little careful planning we can leave our future selves in a much better state.

_<small>Image credit: [Mike Deerkoski](https://www.flickr.com/people/87677022@N00?rb=1)</small>
_