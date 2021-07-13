var coinGeckoAPI_Instance = new coinGeckoAPI();
coinGeckoAPI_Instance.get100coinsByMarketCapRank(1).then (data => {
    //create a function here to store the returned data,
    //or
    //call a new function: 
    //dataHandler(data) { var listOfAllCoins = data; }
    //note that data => { } is the same thing as function(data){ } that we used in the homework.
    console.log(data);
});