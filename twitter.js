//needs:
//<script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>

(function($) {
  $.fn.twitter = function(options){

    var settings = jQuery.extend({user: "al3xandr3", count: 3}, options),

        // source: http://stackoverflow.com/questions/37684/replace-url-with-html-links-javascript
        replaceURLWithHTMLLinks = function (text) {
          var exp = /(\b(https?|ftp|file):\/\/[\-A-Z0-9+&@#\/%?=~_|!:,.;]*[\-A-Z0-9+&@#\/%=~_|])/ig;
          return text.replace(exp,"<a href='$1' target='_blank'>$1</a>"); 
        },
  
    
        // source: http://ejohn.org/blog/javascript-pretty-date/
        // slightly modified, so errors are likelly my fault
        prettyDate = function (time) {
	  var date = new Date((time || "")),
	  diff = (((new Date()).getTime() - date.getTime()) / 1000),
	  day_diff = Math.floor(diff / 86400);
          
	  if ( isNaN(day_diff) || day_diff < 0 )
	  {
	    return;
	  } 
	  
	  return day_diff === 0 && (
	    diff < 60 && "just now" ||
	      diff < 120 && "1 minute ago" ||
	      diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
	      diff < 7200 && "1 hour ago" ||
	      diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||     
	    day_diff === 1 && "Yesterday" ||
	    day_diff < 7 && day_diff + " days ago" ||
	    day_diff < 31 && Math.floor( day_diff / 7 ) + " weeks ago" ||
	    day_diff < 365 && Math.floor( day_diff / 31 ) + " months ago" || 
	    Math.floor( day_diff / 365 ) + " years ago";
	};

  return this.each(function(){
    $.ajax({
      url: "http://twitter.com/status/user_timeline/" + settings.user + 
           ".json?count="+ settings.count +"&callback=?",
      dataType: 'json',
      success: function (data) {
        $.each(data, function (i, item) {
          
          //text
          $("#twitter").append("<p id=" + item.id + ">" + replaceURLWithHTMLLinks(item.text) +"</p>");
          
          //date
          if (typeof prettyDate(item.created_at) !== "undefined") {
            $("<i>&nbsp&nbsp<a>" + prettyDate(item.created_at) + "</a></i>").attr( {
              'href':   ('http://twitter.com/al3xandr3/status/' + item.id),
              'target': '_blank'
            }).css("font-size", "85%").appendTo("#" + item.id);
          }
        });}
    });

    return this;
  });
};
})(jQuery);

// How to use:
// pick an element to inject the twitted information into
// input as argument to twitter, the user and number of twits to get
//$(function() {
  $("body").prepend("<div id='twitter'></div>");
  $('#twitter').twitter({'user':'joao','count':10});
//});
