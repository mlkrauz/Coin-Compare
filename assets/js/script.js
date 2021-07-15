var coinGeckoAPI_Instance = new coinGeckoAPI();
coinGeckoAPI_Instance.get100coinsByMarketCapRank(1).then (data => {
    //create a function here to store the returned data,
    //or
    //call a new function:
$.ajax({    
    type: "POST",
    url: "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=",
    data: "IDS="+requests,
    dataType: "json", 
success: function(response){
    var name = response;
    //Important code starts here to populate table  
    var yourTableHTML = "";
        jQuery.each(name, function(i,data) {
            $("#table").append("<tr><td>" + data + "</td></tr>");
        });
}
});
    //dataHandler(data) { var listOfAllCoins = data; }
    //note that data => { } is the same thing as function(data){ } that we used in the homework.
    console.log(data);
});