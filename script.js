window.onload = function() {
 document.getElementById("search-input").focus();
};
var searchString;
  //console.log("2");
$("#search-input").keyup(function(event){
  if(event.key === 13)
    search();
});

  $("#search-button").on("click", function() {
     event.preventDefault();
    search();
  });
function search() {
  searchString = $("#search-input").val();
    if(searchString !== ""){
    //console.log(searchString);
  //console.log(searchString);
  var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchString + "&limit=10&format=json&callback=?";
    //Wikipedia API ajax call
    $.ajax({
      type:"GET",
      url:url,
      async:false,
      dataType: "json",
      success: function(data){
       // Get heading console.log(data[1][0]);
       // Get description console.log(data[2][0]);
       // Get link console.log(data[3][0]);
        //console.log(data[1].length);
        if(data[1].length == 0)
          showError(searchString);
        else{
        $('#output').html('');
     for(var i=0;i<data[1].length;i++){
        $('#output').append("<div class = \"container-fluid\"><div class = \"row\"><div class =\"col-xs-1\"></div><div class = \"result-block col-xs-10\" style=\"background-color: white;\"><li><a class = \"result\" href= "+data[3][i]+" target = \"_blank\"><p style = \"color:black;font-size: 130%;font-weight: bold;font-family: 'Russo One', sans-serif;\">" +data[1][i] +"</p><p style = \"color: black;font-family: 'Istok Web', sans-serif;\">"+data[2][i]+"</p></li></a></div><div class =\"col-xs-1\"></div></div></div><br>");
     }
      }
      },
      error: function(errorMessage){
        alert("Error while fetching results. Please reload and try again");
      }
      }
    );
    }
    else {
      alert("Please enter a search keyword");
    }
}
function showError(searchString) {
  //console.log("Function Called");
	$("#output").html( "<div class='error'><div style = 'background-color:white;color: black;'><p>Your search <span class='keyword'>" + searchString + "</span> did not match any documents.</p> <p>Suggestions:-</p><li>Make sure that all words are spelled correctly.</li><li>Try different keywords.</li><li>Try more general keywords.</li><li>Try different number of keywords</li></div></div> ");
}
