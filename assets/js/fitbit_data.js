function drawVisualization() {
  // The "rangeParam" is the part of the URL that specifies what cells
  // in the spreadsheet are used for the chart's data.
  var rangeParam = "range=A2:B";

  // The "keyParam" is the part of the URL that identifies your Google Doc.
  var keyParam = "key=0Am9WY63yePDPdFVzaFVyNzBPRVhZY2UxeEtQZEtDcEE";

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
    "height": 400,
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
