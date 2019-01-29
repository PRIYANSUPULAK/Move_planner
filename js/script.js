
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    $wikiElem.text("");
    $nytElem.text("");


var streetStr = $('#street').val();
var cityStr = $('#city').val();
var address = streetStr+', '+cityStr;
var cat = 'cat1.jpg';
 $('#greeting').text('So, You want to live at ' + address + ' ?');
 var streetViewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='+address+'&key=your_key';

var nytimesUrl= 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+cityStr+'&sort=newest&api-key=your_key';

$.getJSON(nytimesUrl, function(data){
  articles = data.response.docs;
  for(var i=0;i<articles.length;i++)
  {
    $nytHeaderElem.text('New York Times Articles about '+cityStr);
    var article = articles[i];
    $nytElem.append('<li class="article">'+ '<a href = "'+article.web_url+'">'+article.headline.main+'</a>'
                              +'<p>'+article.snippet+'</p></li>' );

  }
}).error(function(e){
    $nytHeaderElem.text("NEW YORK Times Articles could not be found");
});

var wikiUrl = 'https://en.wikipediazddfdvd.org/w/api.php?action=opensearch&search='+cityStr+'&format=json&callback=wikiCallback';

//Handling Error with JSON-P request
var wikiResponseTimeout = setTimeout(function(){
  $wikiElem.text("No response from wikiedia");
},8000);



$.ajax({
  url: wikiUrl,
  dataType:'jsonp',
  success: function(response){
      var articleList=response[1];

      for(var i=0;i<articleList.length;i++)
      {
        articleStr=articleList[i];
        var url = 'https://en.wikipedia.org/wiki/'+articleStr;
        $wikiElem.append('<li><a href = "'+url+'">'+articleStr+'</a></li>');
      }
      clearTimeout(wikiResponseTimeout);
  }

});

$body.append('<img class="bgimg" src="'+streetViewUrl+'">');

return false;
};

$('#form-container').submit(loadData);

// loadData();
