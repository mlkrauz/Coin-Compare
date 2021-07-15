

class coinRankingAPI {

    #baseURL;
    #key;

    constructor() {
        this.#baseURL = "https://api.coinranking.com/v2";
        this.#key = "coinranking4aa5d6e1d6af3eae74fe26c693f35a6ae47613d5b6c5c812";
    }

    async getSearchSuggestions(searchText) {

        let apiCall = this.#baseURL + "/search-suggestions?query=" + searchText;
        console.log(apiCall);
        let apiResponse = await fetch(apiCall, {
            headers: {
                'x-access-token': this.#key
            }
        });

        let apiData = await apiResponse.json();

        return apiData;
    }

}


//test
//coinRankingInstance = new coinRankingAPI();
//console.log(coinRankingInstance.getSearchSuggestions("bit"));