
(function($) {
  $.fn.twitter = function(options){
    
    var settings = $.extend({user: "al3xandr3", count: 2}, options),
    
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
      var $this = $(this); //holds a reference to the current element
      
      $.ajax({
	url: "http://twitter.com/status/user_timeline/" + settings.user + 
             ".json?count="+ (settings.count+1) +"&callback=?",
	dataType: 'json',
	success: function (data) {
	  $this.html(""); //clean previous html
          
	  $.each(data, function (i, item) {
            
            //text
            $this.hide().append("<p id=" + item.id + ">" + replaceURLWithHTMLLinks(item.text) + 
			      "&nbsp&nbsp</p>").fadeIn('slow');
            
            //date
            if (typeof prettyDate(item.created_at) !== "undefined") {
	      $("<br>").appendTo("#" + item.id); //line break
              $("<a>" + prettyDate(item.created_at) + "</a>").attr( { //link on the date
		'href':   ('http://twitter.com/' + settings.user + '/status/' + item.id),
		'target': '_blank'
              }).css("font-size", "75%").appendTo("#" + item.id);
            }
          });}
      });
    });
  };
})(jQuery);

// How to use:
// When you have for example: <div id='twitter'></div>, then:
// $(function() {
//   $('#twitter').twitter({'user':'al3xandr3','count':3});
// });

// Depends on: 
// <script type="text/javascript" src="http://code.jquery.com/jquery-latest.pack.js"></script>
