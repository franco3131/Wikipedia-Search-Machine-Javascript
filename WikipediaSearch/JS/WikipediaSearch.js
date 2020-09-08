$(document).ready(function(){


var html="";
  $(".text-center").keyup(function(event){
    if(event.keyCode === 13){
        $(".searchBtn").click();
    }
});
  
  $(".searchBtn").on("click",function(){
 var response = $('#string').val(); 


    var url="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions%7Cextracts%7Cinfo&titles=Main+Page&generator=search&exlimit=10&exsentences=5&rvprop=&exintro=1&inprop=url&gsrsearch="+response+"&callback=?"
//http://en.wikipedia.org/wiki/Special:Random
    
  $.getJSON(url, function(data) {
    
    for(var prop in data.query.pages){
html+="<a href='"+data.query.pages[prop].fullurl+"'target='_blank'><div class='block'>"+data.query.pages[prop].extract+"</div></a>";
    }
   
$(".text").html(html);
  html="";
 
  }, "JSONP");
  });
});