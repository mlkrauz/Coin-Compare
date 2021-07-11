

//class for easy handling of coinGecko API
//not all API calls are supported.

class coinGeckoAPI {

    //private vars
    #baseURL;
    #coinGeckoSimpleList;

    constructor() {
        //code to be performed on object creation
        //The pound symbol (#) is used in JS to denote a private variable/method.

        this.#baseURL = "https://api.coingecko.com/api/v3";
        this.#coinGeckoSimpleList = this.#listOfAllCoins();

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
    async getCoinDataFULL(coinName, localization = false, tickers = false, marketData = true) {
        
        if (typeof localization != "boolean" ||
            typeof tickers != "boolean" ||
            typeof marketData != "boolean") {
                throw 'getCoinDataFULL Error: Parameter is not a boolean!';
            }

        let apiResponse = await fetch(this.#baseURL + "/coins/" + coinName + "?localization=" + localization +
            "&tickers=" + tickers + "&market_data=" + marketData + 
            "&community_data=true&developer_data=true&sparkline=true"
            );

        let apiData = await apiResponse.json();
        return apiData;
    }

    //returns price, market cap, and volume data. Dates are in ISO format. Values are in USD.
    async getCoinPriceData(coinName, days) {

        let apiResponse = await fetch(this.#baseURL + "/coins/" + coinName + "/market_chart?vs_currency=usd&days=" + days);
        
        let apiData = await apiResponse.json();
        var modifiedAPI = apiData;

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


    
    //get the list of all coins.
    //this is returned as an array of objects, formatted as:
    getListOfAllCoins() {
        return this.#coinGeckoSimpleList;
    }

    //#endregion publicMethods
}


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