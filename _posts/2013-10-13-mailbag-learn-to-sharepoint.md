---
layout: post
title: "Reader Mailbag: So You Want to SharePoint"
category: 
tags: []
---
{% include JB/setup %}

# Reader Mailbag

It's that time again! That time where I pull a message out of the Bag of Lost Souls and help one lucky individual overcome their technical impediments.

Today's email is from José:

<p class="letter">My client is panicking and needs to pull every version of every file from their SharePoint site, and there are hundreds of thousands of entries in the version histories! Can you help me come up with a solution in C#?</p>

José and I had the following conversation:

<p class="dialog"><strong>[M]</strong> <span>Hello, José!</span></p>

<p class="dialog"><strong>[J]</strong> <span>Hi! Is this about the SharePoint question I sent in? Because that was like two months ago.</span></p>

<p class="dialog"><strong>[M]</strong> <span>Yeah, I spent a few weeks brushing up on my Spanish. You know, I studied Spanish in high school! Which was barely even 15 years ago!</span></p>

<p class="dialog"><strong>[J]</strong> <span>That's... great, I guess? Look, I already solved this particular problem, so...</span></p>

<p class="dialog"><strong>[M]</strong> <span>All right, here we go! ¿Cómo puedo ayudarte?</span></p>

<p class="dialog"><strong>[J]</strong> <span>Um, I don't actually speak Spanish? I'm named after my mother's father, who was from Argentina and imigrated with his family when he was 8.</span></p>

<p class="dialog"><strong>[M]</strong> <span>¿Tienes preguntas sobre la Shara-Punta?</span></p>

<p class="dialog"><strong>[J]</strong> <span>"Shara-Punta"? There's no way that's right. Like I said, I already solved the problem. Look, here's the code I wrote:</span></p>

{% highlight csharp %}
using Microsoft.SharePoint.Client;

/* ... snip ... */

var sharePointUrl = ""; // Your SharePoint URL here

var clientContext = new ClientContext(sharePointUrl);
var website = clientContext.Web;
var files = website.GetFolderByServerRelativeUrl("Pages").Files;

clientContext.Load(files);
clientContext.ExecuteQuery();

foreach (var file in files) {
    clientContext.Load(file, f => f.Versions);
    clientContext.ExecuteQuery();

    foreach (var version in file.Versions) {
        clientContext.Load(version, v => v.Url);
        clientContext.ExecuteQuery();

        var fileQueryString = string.Format("/{0}?PageVersion={1}", file.Name, version);
        var fileInformation = Microsoft.SharePoint.Client.File.OpenBinaryDirect(clientContext, fileQueryString);

        var localFilename = string.Format(@"C:\tmp\{0}-{1}", file.Name, version.ID);

        using (var stream = fileInformation.Stream) {
            using (var fileOut = System.IO.File.OpenWrite(filename)) {
                stream.CopyTo(fileOut);
            }
        }
    }
}
{% endhighlight %}

<p class="dialog"><strong>[M]</strong> <span>No estoy seguro que uh, este código ... what? I mean, ¿qué?</span></p>

<p class="dialog"><strong>[J]</strong> <span>Yeah, the only tricky part was I had to keep calling <code>clientContext.ExecuteQuery()</code> for every server-side operation I wanted to do, otherwise I didn't have access to the objects I wanted.</span></p>

<p class="dialog"><strong>[M]</strong> <span>¡De verdad!</span></p>

<p class="dialog"><strong>[J]</strong> <span>Also, I had to download the SharePoint Client Object Model Redistributable for the version of SharePoint I have installed, <a href="http://www.microsoft.com/en-us/download/details.aspx?id=21786">2010</a>.</span></p>

<p class="dialog"><strong>[M]</strong> <span>¡Fabuloso!</span></p>

<p class="dialog"><strong>[J]</strong> <span>So, uh, if you don't mind, I have newer problems that I have to go solve...</span></p>

<p class="dialog"><strong>[M]</strong> <span>When you need help with those, feel free to submit to the Mailbag! "El Bago de Mail"!</p>

<p class="dialog"><strong>[J]</strong> <span>*** has gone offline</span></p>

<br/>

## Results

My helpfulness transcends the boundaries of language. It's really the new international currency.

Do you have a question for my mailbag? I don't doubt it.