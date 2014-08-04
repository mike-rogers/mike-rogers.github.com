---
layout: post
title: "FitBit, Google Charts, and Frenetic Pacing"
category: 
tags: []
---

## Impetus

A few months ago I invested in a [FitBit pedometer](http://www.fitbit.com/one) to help me answer the questions everyone asks themselves:

* How many steps do I take per day?
* How many stairs do I climb per day?
* How many steps do I ta... wait, I already asked that one.
* How many ... hang on, I can do this...
* What kind of idiot pays $100 for a pedometer?

The data acquisition thus began.

## Findings

Wow, really? I mean, I knew I was sedentary, but ... hunh.

The [FitBit](http://www.fitbit.com/) site is actually pretty wonderful if you're sitting at a browser with a mouse and only want to deal with a specific subset of data.

What I *really* wanted was an automated way to look at my two-week trend on my phone.

## Phone It Up in Phone Town

### Step One: ACQUIRE DATA

FitBit's API seemed daunting, and I only wanted to spend like 30 minutes getting the data I wanted. Luckily, someone has some pretty nice instructions to [synchronize your FitBit data to a Google Docs spreadsheet](http://quantifiedself.com/2013/02/how-to-download-fitbit-data-using-google-spreadsheets/).

After stepping through the linked post I was able to sync my data and set up a nightly update, keeping my data up-to-date.

### Step Two: CREATE GRAPH

BUT HOW TO DISPLAY.

If you want a simple chart you can add one onto the Google Docs spreadsheet itself. Personally, I wanted a trend line so I could, as my back felt better, verify my step count was getting higher. Excel has a great trendline using a rolling average over a given amount of data points, but I'm far too lazy to occassionally download the Google Doc into Excel. Instead, I turned to the [Google Chart API](https://developers.google.com/chart/).

**Note**: You will need to share your spreadsheet to use it as a data source for the Google Chart API.

It turns out the JavaScript isn't overly complex:

{% highlight html %}
  <script type="text/javascript" src="http://www.google.com/jsapi"></script>
  <script type="text/javascript"> 
    google.load('visualization', '1', {packages: ['corechart']});
  </script>
<!-- ... -->
<body>
  <!-- ... -->

  <div id="visualization"></div>

  <!-- ... -->
</body>
<script type="text/javascript" src="fitbit-data.js"></script>
<script>drawVisualization();</script>
{% endhighlight %}

{% highlight javascript %}
function drawVisualization() {
  // The "rangeParam" is the part of the URL that specifies what cells
  // in the spreadsheet are used for the chart's data.
  var rangeParam = "range=A2:B";

  // The "keyParam" is the part of the URL that identifies your Google Doc.
  var keyParam = "key=[Your Key Here, without the brackets]";

  var url = "https://docs.google.com/spreadsheet/ccc";

  // The 'query' is written in Google Chart API's Query language. You can
  // find more information here:
  // https://developers.google.com/chart/interactive/docs/queries
  var query = new google.visualization.Query(url + "?" + keyParam + "&" + rangeParam);
  query.setQuery("select A, B where dateDiff(now(), A) > 1 order by A desc limit 15");
  // The 'where' clause is meant to remove the latest entry, since chances are high that it
  // will be '0 steps', which throws off the trend. The '0 steps' is due to the fact
  // that I synchronize between midnight and 1:00 a.m.

  // Send the query with a callback function.
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();

  // ColumnChart options. See:
  // https://developers.google.com/chart/interactive/docs/gallery/columnchart
  var options = {
    "title": "Mike's Steps",
    "hAxis": {
      "slantedText": true,
      "slantedTextAngle": 90
    },
    "vAxis": {
      "title": "Steps",
      "minValue": 0
    },
    "legend": {
      "position": "none"
    },
    "trendlines": {
      0: {}
    }
  };
  visualization = new google.visualization.ColumnChart(document.getElementById('visualization'));
  visualization.draw(data, options);
}
{% endhighlight %}

### Step Three: OPTIMIZE

<div id="visualization"></div>

At the time of this writing, my steps are increasing at a good pace. Give me a few weeks; I'll injure my back again and we can get back to normal.

## Conclusions

By standing on the shoulders of giants I have built a monument to laziness. Look on my works, ye Active, and despair!

<p class="aside"><strong>Aside</strong>: Incidentally, my wife has <em>no problem</em> doubling or tripling my daily step count. She'll often check her count at some point in the day and, with a note of surprise in her voice, say "huh! 23,000 steps!" Someday I will top her step count and immediately be arrested for running down the street shouting about how I finally beat my wife.</p>

<script type="text/javascript">
  (function () {
    $.getScript("http://www.google.com/jsapi").done(function () {
      var callback = function () {
        drawVisualization();
      };

      google.load('visualization', '1', {packages: ['corechart'], callback: callback});
    });
  })();
</script>
<script type="text/javascript" src="/assets/js/fitbit-data.js"></script>
