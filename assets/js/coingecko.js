//class for easy handling of coinGecko API
//not all API calls are supported.

class coinGeckoAPI {

    constructor() {
        //code to be performed on object creation

        this.baseURL = "https://api.coingecko.com/api/v3";
    }

    performCall() {

    }
    
    //returns an array of coin objects
    coinList() {
        fetch(this.baseURL + "/coins/list")
        .then( function(response) {
            console.log(response);
        })
    }



}



var coinGeckoAPI_Instance = new coinGeckoAPI();
coinGeckoAPI_Instance.coinList();

/*
class cryptoCurrency {
    constructor() {
        
    }
}
*/