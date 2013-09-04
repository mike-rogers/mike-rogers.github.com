---
layout: post
title: "Reader Mailbag: So You Want to Excel"
category: 
tags: []
---
{% include JB/setup %}

# Reader Mailbag

Once in a while I like to dip into the vast amounts of mail I receive (mostly fanmail addressed to my luxurious beard) and see if I can't help some random lost soul who is dealing with a programmatic problem, trapped in a metaphorical bog like that horse from "The NeverEnding Story" in what had to be one of the most traumatic movie scenes from my childhood.

<p class="aside"><strong>Aside</strong>: The name of the horse in that movie was "Artax", not to be confused with the Tolkienian "Lord of All Horses", Shadowfax. I don't want to brag, but I met the horse that played "Shadowfax". I asked if he was going to reprise his role in future Tolkien-inspired movies; he replied in the negative.</p>

Today's question is from Elizabeth:

<p class="letter">I need to pull some data from an Excel spreadsheet programatically. Could you please help me understand a good way to do this? What language should I choose? Are there frameworks out there to help me?</p>

I found Elizabeth on Jabber and we had the following dialog:

<p class="dialog"><strong>[M]</strong> <span>Hello, Elizabeth. Can I call you Liz?</span></p>

<p class="dialog"><strong>[E]</strong> <span>No, you certainly may not.</span></p>

<p class="dialog"><strong>[M]</strong> <span>That's great. So, Liz, I hear you have an issue with reading Excel data. Would you care to elaborate?</span></p>

<p class="dialog"><strong>[L]</strong> <span>Well, I guess that I just... wait, is that an 'L'? My name is Elizabeth, not "Liz".</span></p>

<p class="dialog"><strong>[M]</strong> <span>Ignore that. Let's talk about Excel!</span></p>

<p class="dialog"><strong>[L]</strong> <span>Um, I have an Excel document and I want to programmatically skim data out of it and put it in a database or something so I can look at historical trends, maybe even write up a web-based application.</span></p>

<p class="dialog"><strong>[M]</strong> <span>That's a terrible idea. You should totally just write some VBA and put a graph in your spreadsheet.</span></p>

<p class="dialog"><strong>[L]</strong> <span>I'm not sure the Excel spreadsheet will be able to manage the amount of historical data I want to deal with.</span></p>

<p class="dialog"><strong>[M]</strong> <span>Sure it can. It's <em>Excel</em>. Now, open up the macro editor...</span></p>

<p class="dialog"><strong>[L]</strong> <span>How about I just Google "<a href="http://www.google.com/search?q=C%23+parse+excel">C# parse excel</a>"? Look, the second result talks about using the spreadsheet file as an OLE DB data source. Can't I just use that?</span></p>

<p class="dialog"><strong>[M]</strong> <span>Yeah, if you're an idiot. If you want managed code and not VBA I highly recommend <a href="http://poi.apache.org/">Apache's POI</a> project, which parses MS Office files in the relative comfort of a JVM.</span></p>

<p class="dialog"><strong>[L]</strong> <span>Java? But look, right here there's sample code:</span></p>

{% highlight csharp %}
var provider = "Microsoft.ACE.OLEDB.12.0";
var filename = "MySpreadsheet.xls";
var properties = "Excel 12.0";
var connectionString = string.Format("Provider={0};Data Source={1};Extended Properties={2};",
    provider,
    filename,
    properties);

using (var adapter = new OleDbDataAdapter("SELECT * FROM [Page1$]", connectionString))
{
   var ds = new DataSet();

   adapter.Fill(ds, "myTable");

   DataTable data = ds.Tables["myTable"];

   foreach (DataRow row in data.Rows)
   {
      var cellData = row[0].ToString();
      
      /**
       * Do something with the cell data
       **/
   }
}      
{% endhighlight %}

<p class="dialog"><strong>[M]</strong> <span>Huh? That's not Java at all!</span></p>

<p class="dialog"><strong>[L]</strong> <span>And all I have to do is add a reference to <code>System.Data.DataSetExtensions</code>, which I installed via a download <a href="http://www.microsoft.com/en-us/download/details.aspx?id=23734">from Microsoft's site</a>!</span></p>

<p class="dialog"><strong>[M]</strong> <span>I don't think you're going to want to mix VBA, Java, <em>and</em> C#. Your cause might be hopeless.</span></p>

<p class="dialog"><strong>[L]</strong> <span>I uh, I think I'm gonna go now?</span></p>

<p class="dialog"><strong>[M]</strong> <span>Well, Laurie, good luck. I hope you fix your MS Access problem.</span></p>

<br/>

## Results

Poor programmer. Unfortunately some of these younger programmers get a bad idea in their heads and there's nothing you can do about it. I'm sure she'll be back after creating some abomination in Java while rewriting half of POI even though it's *right there* and licensed pretty freely.

Tune in next time on Reader Mailbag when we start taking our ADHD medication.
