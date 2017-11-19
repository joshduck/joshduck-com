title: Dynamically define subdomains with Apache
date: 2010-07-14 01:36
excerpt: 
categories: programming

When I need to develop multiple sites at once I often find defining multiple Apache Vhosts and host files entries to be time consuming. Thankfully, with a little Apache magic it’s possible to automatically create a new subdomain for each project I start.<!--more-->

## Apache Config

The easiest way to create dynamic subdomains is with the **mod_vhost_alias**. This module can be enabled in the conf/httpd.conf file by adding or uncommenting the following line.
<pre lang="conf">LoadModule vhost_alias_module modules/mod_vhost_alias.so</pre>
Now I can define a single VirtualHost record that will work for all of our development domains. This can be either in the conf/httpd.conf file or in an included config file like conf/extra/vhost.conf.
<pre lang="conf"><VirtualHost *:80>
     UseCanonicalName Off
     VirtualDocumentRoot C:\Users\Josh\Projects\%-3\
     VirtualScriptAlias C:\Users\Josh\Projects\%-3\
</VirtualHost></pre>
The magic in this step is the **%-3** wildcard. This will substitute the third last part of the hostname into the document root. So www.**project-1**.example.com would map to the path C:\Users\Josh\Projects\**project-1**\ on my development machine.

The wildcard can contain either positive or negative numbers to refer to parts of the hostname counting from either the start or end, respectively. The module document contains [some examples](http://httpd.apache.org/docs/2.0/mod/mod_vhost_alias.html#interpol). I find that using the third last part of the hostname is a good choice as the domain will work with or without a "www" prefix.

## Creating a loopback host

This Apache vhost magic isn't too useful without some way of pointing each dynamically created hostname to 127.0.0.1\. Unfortunately the Window’s host file can only be used to add absolute aliases; wildcards just won't work.

I could create a wildcard DNS entry against a domain I control, but it would be easier to just piggyback on the hard work of others. A quick Google turned up the following hosts which map back to 127.0.0.1.

*   hexxie.com
*   smackaho.st
*   42foo.com
So once the vhost magic is set up project-1.hexxie.com or even lots.oflots.of.subdomains.project-1.42foo.com will load the project stored in C:\Users\Josh\Projects\project-1\.