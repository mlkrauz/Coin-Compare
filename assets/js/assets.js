//class for easy handling of coinGecko API
//not all API calls are supported.
var resetButton = document.getElementById('coin_comparison_reset_button');
var searchButton = document.getElementById('coin_comparison_search_button')


//HOW TO USE:
var coinGeckoAPI_Instance = new coinGeckoAPI();
coinGeckoAPI_Instance.getListOfAllCoins().then( data => {
    //create a function here to store the returned data, or
    //call a new function: 
    //dataHandler(data) { var listOfAllCoins = data; }
    //note that data => { } is the same thing as function(data){ } that we used in the homework.
    console.log(data);
});


coinGeckoAPI_Instance.getCoinDataFULL("bitcoin").then( data => { console.log(data); });
coinGeckoAPI_Instance.getCoinPriceData("bitcoin", 2).then (data => { console.log(data); });
coinGeckoAPI_Instance.getCoinPriceData("cardano","7").then( data => { console.log(data); });

var resetButton = document.getElementById('coin_comparison_reset_button');
var searchButton = document.getElementById('coin_comparison_search_button')
const marketLeaderEL = document.getElementById('Market_Leaders');

//calls and stores bitcoin price data as an object so it can be used in the graph. 
var bitcoinPrices;
const bitArray = new Array(6);
coinGeckoAPI_Instance.getCoinPriceData("bitcoin","7").then(data => bitcoinPrices = data).then(() => {console.log(bitcoinPrices)
   
    //respones are given by hours - so every array index goes up +23 per day.
  bitArray[0] = bitcoinPrices.prices[0][1].toFixed(2);
  bitArray[1] = bitcoinPrices.prices[23][1].toFixed(2);
  bitArray[2] = bitcoinPrices.prices[46][1].toFixed(2);
  bitArray[3] = bitcoinPrices.prices[69][1].toFixed(2);
  bitArray[4] = bitcoinPrices.prices[92][1].toFixed(2);
  bitArray[5] = bitcoinPrices.prices[115][1].toFixed(2);
  bitArray[6] = bitcoinPrices.prices[138][1].toFixed(2);

});

var EthPrices;
const ethArray = new Array(6);
coinGeckoAPI_Instance.getCoinPriceData("ethereum","7").then(data => EthPrices = data).then(() => {console.log(EthPrices)
   
  ethArray[0] = EthPrices.prices[0][1].toFixed(2);
  ethArray[1] = EthPrices.prices[23][1].toFixed(2);
  ethArray[2] = EthPrices.prices[46][1].toFixed(2);
  ethArray[3] = EthPrices.prices[69][1].toFixed(2);
  ethArray[4] = EthPrices.prices[92][1].toFixed(2);
  ethArray[5] = EthPrices.prices[115][1].toFixed(2);
  ethArray[6] = EthPrices.prices[138][1].toFixed(2);
});

var BinancePrices;
const bnbArray = new Array(6);
coinGeckoAPI_Instance.getCoinPriceData("binancecoin","7").then(data => BinancePrices = data).then(() => {console.log(BinancePrices)
   
  bnbArray[0] = BinancePrices.prices[0][1].toFixed(2);
  bnbArray[1] = BinancePrices.prices[23][1].toFixed(2);
  bnbArray[2] = BinancePrices.prices[46][1].toFixed(2);
  bnbArray[3] = BinancePrices.prices[69][1].toFixed(2);
  bnbArray[4] = BinancePrices.prices[92][1].toFixed(2);
  bnbArray[5] = BinancePrices.prices[115][1].toFixed(2);
  bnbArray[6] = BinancePrices.prices[136][1].toFixed(2);
});

//checks to make sure fetchedData is stored in array. 
console.log(bitArray);

//queries the result.html comparison searchbar. 
var inputValue = document.querySelector(".coin_comparison_searchbar");
var obj;
//data for a desired coin is pulled on click. 
searchButton.addEventListener('click',function(FindCoin){
  var searchInput = $(".coin_comparison_searchbar").val()
  console.log('"'+searchInput+'"');
  
  //converts the input into text readable in the array.
  JSON.stringify(searchInput);

  //exectutes the API call using the user-selected search input.
  coinGeckoAPI_Instance.getCoinDataFULL(searchInput).then( data => { console.log(data); });
  coinGeckoAPI_Instance.getCoinPriceData(searchInput, 2).then (data => { 
      console.log(data); 
      
      var MarketCap = data.market_caps[0][1].toFixed(2);
      var Price = data.prices[0][1].toFixed(2);
      var Volume = data.total_volumes[0][1].toFixed(2)
      console.log(MarketCap+" "+Price);

    
      //string literal to append data to the table.
      tableBodyEl.innerHTML += `
    <tr>  
        <td>${searchInput}</td>  
        <td>${Price}</td> 
        <td>${MarketCap} </td> 
        <td>${Volume} </td> 
    </tr> `;
})

//gets the day of the week, and appends it to the chart. 

    //appends new data to the table. 
    var resetButton = document.getElementById('coin_comparison_reset_button');
    const tableBodyEl = document.querySelector('tbody');

    //clears coin comparison data when selected. 
    resetButton.addEventListener('click',function(){
        $("tbody").empty();
    });

  })



