

//class for easy handling of coinGecko API
//not all API calls are supported.

class coinGeckoAPI {

    //private vars
    #baseURL;
    #coinGeckoSimpleList;
    #numOfCoins;
    #numOfPagesOf100;

    constructor() {
        //code to be performed on object creation
        //The pound symbol (#) is used in JS to denote a private variable/method.
        this.#baseURL = "https://api.coingecko.com/api/v3";
        this.#coinGeckoSimpleList = this.#listOfAllCoins();
        this.#numOfCoins = this.#coinGeckoSimpleList.then( data => { return data.length });
        this.#numOfPagesOf100 = this.#coinGeckoSimpleList.then( data => { return Math.ceil(data.length / 100) });
        
    }
    
    //#region privateMethods

    //returns an array of coin objects
    async #listOfAllCoins() {

        let apiResponse = await fetch(this.#baseURL + "/coins/list")
        let apiData = await apiResponse.json();

        return apiData;
    }

    #convertDate(_13DigitDate) {
        let _date = new Date(_13DigitDate);
        return _date.toISOString();
    }

    //#endregion privateMethods

    //#region publicMethods

    //get the full data on a coin from the API.
    //all params other than the first one are optional. You may omit them if you don't need them.
    async getCoinDataFULL(coinID, localization = false, tickers = false, marketData = true) {
        
        if (typeof localization != "boolean" ||
            typeof tickers != "boolean" ||
            typeof marketData != "boolean") {
                throw 'getCoinDataFULL Error: Parameter is not a boolean!';
            }

        let apiResponse = await fetch(this.#baseURL + "/coins/" + coinID + "?localization=" + localization +
            "&tickers=" + tickers + "&market_data=" + marketData + 
            "&community_data=true&developer_data=true&sparkline=true"
            );

        let apiData = await apiResponse.json();
        return apiData;
    }

    //returns price, market cap, and volume data. Dates are in ISO format. Values are in USD.
    async getCoinPriceData(coinID, days) {

        let apiResponse = await fetch(this.#baseURL + "/coins/" + coinID + "/market_chart?vs_currency=usd&days=" + days);
        
        let apiData = await apiResponse.json();
        var modifiedAPI = await apiData;

        for (var i = 0; i < modifiedAPI.prices.length; i++) {
            modifiedAPI.prices[i][0] = this.#convertDate(modifiedAPI.prices[i][0]);
        }
        for (var i = 0; i < modifiedAPI.market_caps.length; i++) {
            modifiedAPI.market_caps[i][0] = this.#convertDate(modifiedAPI.market_caps[i][0]);
        }
        for (var i = 0; i < modifiedAPI.total_volumes.length; i++) {
            modifiedAPI.total_volumes[i][0] = this.#convertDate(modifiedAPI.total_volumes[i][0]);
        }

        return modifiedAPI;
    }

    //gets list of 100 coins by market cap rank. Takes page number as in input. Use getListOfAllCoins.length / 100 (rounded up) to get max pages.
    async get100coinsByMarketCapRank(pageNum) {

        let apiResponse = await fetch(this.#baseURL + "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=" + 
            pageNum + "&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y");
        
        let apiData = await apiResponse.json();

        return apiData;
    }

    //Matches a search string to coin name. Returns an array of coin market data summaries. maxCount limits the search results to specified integer.
    async getNcoinsByNameSearch(maxCount, coinSearchString) {

    }
    //Matches a search string to coin name. Returns an array of coin market data summaries. maxCount limits the search results to specified integer.
    async getNcoinsBySymbolSearch(maxCount, symbolSearchString) {

    }
    
    //get the list of all coins.
    //this is returned as an array of objects, formatted as:
    async getListOfAllCoins() {
        return this.#coinGeckoSimpleList;
    }

    async getNumOfAllCoins() {
        return this.#numOfCoins;
    }

    async getnumOfPagesOf100() {
        return this.#numOfPagesOf100;
    }

    //#endregion publicMethods
}

//================================================
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
coinGeckoAPI_Instance.get100coinsByMarketCapRank(2).then (data => { console.log(data); });
coinGeckoAPI_Instance.getNumOfAllCoins().then ( data => { console.log(data); });
coinGeckoAPI_Instance.getnumOfPagesOf100().then ( data => { console.log(data); });

//Notice that in all of my calls above, I did not set the method calls to a variable.
//This is because all I'm doing is sending the outputs to the console.
//To store the results, do this:
let firstPage = coinGeckoAPI_Instance.get100coinsByMarketCapRank(1).then (data => { return data });