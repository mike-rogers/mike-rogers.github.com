---
layout: post
title: "Jekyll and PDUs for Fun and Profit"
category: 
tags: []
---

# TLDR;

I made a thing! Look at [this thing I made](/pages/pdu.html)!

# PDUs

Part of being a professional in the software engineering field is keeping abreast of the latest software whosits and thingers. Kajiggers. Softwares. There are so many kajiggers that I sometimes (often) lose track of what I'm trying to learn.

To that end, I've been thinking of a way to track Professional Development Units using a non-intrusive, publicly accessible (WHAT IF I LOSE MY PHONE INTERROBANG) way, and thanks to a pointer from [Matt Swanson](http://mdswanson.com/blog/2013/11/13/some-tools-i-like.html) I think we finally have a match.

# Jekyll

This site uses a fantastic and simple engine called [Jekyll](http://jekyllrb.com/). In fact, those [GitHub](https://github.com/)s have a feature called [Pages](http://pages.github.com/) that uses Jekyll as its backbone.

Jekyll recently added a new [data files feature](http://jekyllrb.com/docs/datafiles/) (thanks, Matt!) that allows an author to create semi-dynamic content using YAML files as data sources.

DATA SOURCES, YOU SAY? Sounds like a flimsy excuse to over-engineer something!

# Composition

First I needed to set up a YAML file to act as the data source. I've started off with something simple:

{% highlight yaml %}
- type: research
  name: Circuits.IO
  href: "http://www.circuits.io/"
  description: "Wanted to make a couple of PCBs but couldn't find a decent free tool to generate the Gerber files. Jon Fuller pointed me here. Thanks, Jon!"
  status: "Done"
  output:
    - { name: "Raspberry Pi XBee Expansion", href: "http://www.circuits.io/circuits/5543" }
    - { name: "Pong Switch", href: "http://www.circuits.io/circuits/5505" }
{% endhighlight %}

Man, that looks terrible. I don't mean the structure or format, just the way this theme is highlighting the code. Someone should fix that.

Awful display notwithstanding, this YAML has all the obvious, important bits to help me remember what I've done and why, and what state it's in.

Next, let's build the template (using Jekyll's templating system, [Liquid](https://github.com/shopify/liquid/wiki/liquid-for-designers)) that will display this datasource in a board-like fashion:

{% highlight html %}
{% raw %}
	<tbody>
		{% for item in site.data.pdu %}
		<tr>
			{% if item.status == "Doing" %}
			<td></td>
			{% elsif item.status == "Done" %}
			<td></td>
			<td></td>
			{% endif %}
			
			<td>
				<div class="pdu pdu_{{item.type}}">
					<div class="pdu_name">
						{% if item.href %}
						<a href="{{ item.href }}">
							{{ item.name }}
						</a>
						{% else %}
						<strong>{{ item.name }}</strong>
						{% endif %}
					</div>
					<div class="pdu_description">
						{{ item.description }}
					</div>
					{% if item.output %}
					<ul class="pdu_output">
						{% for link in item.output %}
						<li>
							<a href="{{ link.href }}">
								{{ link.name }}
							</a>
						</li>
						{% endfor %}
					</ul>
					{% endif %}
				</div>
			</td>
			
			{% if item.status == "To Do" %}
			<td></td>
			<td></td>
			{% elsif item.status == "Doing" %}
			<td></td>
			{% endif %}
		</tr>
		{% endfor %}
	</tbody>
{% endraw %}
{% endhighlight %}

And finally a little bit of CSS to make it look less like a pile of crap (unlike whatever template I'm using to highlight code. seriously):

{% highlight css %}

.dialog strong {
    display: inline-block;
    width: 5em;
    float: left;
    height: 100%;
}

table.pdu_board td {
    border-style: none solid;
}

table.pdu_board tbody tr {
    border: none;
}

div.pdu {
    width: 200px;
    height: 150px;
    border: 1px solid black;
    padding: 1em;
    margin: 1em;
}

div.pdu_book {
    background-color: lightcyan;
}

div.pdu_blog {
    background-color: lightsalmon;
}

div.pdu_project {
    background-color: khaki;
}

div.pdu_research {
    background-color: lavender;
}

div.pdu_key {
    padding: 0.25em;
    border: 1px solid black;
    width: 6em;
    text-align: center;
    display: inline-block;
}

{% endhighlight %}

# Output

And what does that look like? Click [this link](/pages/pdu.html). Or not. You know, whatever. It looks good. Trust me.

# Conclusion

My hope is that, since it's Git and YAML, the simplicity of managing PDUs will overcome my basic laziness.

![... but when I do...]({{ site.url }}/assets/images/pdu-meme.jpg)
