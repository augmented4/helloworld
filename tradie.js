// pageinit is fired whenever a page loads
// for the first time

// cache the body for DOM data  
var jqDocBod = $(document.body);



$(document).bind('pageinit',function(event){
    
   var pageId = event.target.id;
   
   switch(pageId) {
    
    case "splashScreen":
	
	delayedTransition("#splashScreenTwo");
	break;
    case "splashScreenTwo":
	delayedTransition("#homescreen");
	break;
    case "homescreen":
	injectCategories();
	break;
    case "map":
	showTestMapData();
	break;
    case "branch":
	
	break;
    
   }
    
});

$(document).bind('pagechange',function(event){
    
   var pageId = event.target.id;
   
   switch(pageId) {
    
    case "splashScreen":
	
	
	break;
    case "splashScreenTwo":
	
	break;
    case "homescreen":
	
	break;
    case "map":
	console.log('pagechanged to ' + pageId);
	createMap();
	break;
    case "branch":
	
	break;
    
   }
   console.log('pagechange: ' + pageId);
});

function delayedTransition(pageId) {
    setTimeout(function(){
	$.mobile.changePage(pageId);
    },1000);    
}




      
function injectCategories() {
            
    var jqxhr = $.ajax({
	url: "http://tradiecard.co.nz/custom_google_locator/mobile_pages/homescreen_json",
	dataType: "json",
	context: document.body
    })
    .done(function(data) {
    
	// data: [{ Category { name, id}}, ...]
	
	jqCategoriesUl = $('#categories');
	
	//console.log(data);
	
	for(var key in data) {
	    // store category info for map branch lookup
	    $(this).data('catId', key);
	    $(this).data('catName', data[key]);
	    jqCategoriesUl.append('<li><a href="#map">' + $(this).data('catName') + '</a></li>');	    
	}

	// enhance the categories
	jqCategoriesUl.listview('refresh');
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
	    console.log("request failed: jqXHR");
	    console.log(jqXHR);
	    console.log("errorThrown=", errorThrown);
    })
    .always(function() {
	    console.log("request completed");
    });
            
			
};