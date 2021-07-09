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
    #listOfAllCoins() {

        fetch(this.#baseURL + "/coins/list")
        .then( function(response) {
            return response.json();
        })
        .then( function(data) {
            return data;
        })
    }

    //#endregion privateMethods

    //#region publicMethods

    getListOfAllCoins() {
        return this.#coinGeckoSimpleList;
    }

    //#endregion publicMethods
}



var coinGeckoAPI_Instance = new coinGeckoAPI();
