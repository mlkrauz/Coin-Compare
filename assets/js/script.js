const coinGeckoAPI_Instance = new coinGeckoAPI();
const tableInsertion = $("#coinListTable");
const searchButton = $("#searchButton");
const modalDiv = $("#modalDiv");

var tableHeaderFooter = `<tr>
    <th><abbr title="Rank">Rank</abbr></th>
    <th>Image</th>
    <th><abbr title="Name">Name</abbr></th>
    <th><abbr title="Symbol">Symbol</abbr></th>
    <th><abbr title="Price">Price</abbr></th>
    <th><abbr title="Market Cap">Market Cap</abbr></th>
    <th><abbr title="Results">Results</abbr></th>
</tr>`;

//note to mark: use .empty() to remove the page of 100 coins, if time permits a page selector





coinGeckoAPI_Instance.get100coinsByMarketCapRank(1).then (data => {
    //create a function here to store the returned data,
    //or
    //call a new function:
    /* 
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
    }); */
    
    console.log(data);

    var tableHeader = $(`<thead>
        ${tableHeaderFooter}
    </thead>`);
    tableInsertion.append(tableHeader);

    for (var i = 0; i < data.length; i++) {
        var currentData = data[i];
        var newRow = $(`<tr></tr>`);
        var newButton = $(`<button class="button is-link">Compare</button>`);
        var newRowContent = $(`
            <td>${currentData.market_cap_rank}</td>
            <td><img src="${currentData.image}" width="40" height="40"></td>
            <td>${currentData.name}</td>
            <td>${currentData.symbol}</td>
            <td>$${currentData.current_price}</td>
            <td>$${currentData.market_cap}</td>
            <td></td>`);

        newRowContent.eq(12).append(newButton);
        newRow.append(newRowContent);
        tableInsertion.append(newRow);

        newButton.click({parameter_currentData: currentData}, function(event) {
            let currentData = event.data.parameter_currentData;
            const coinID = currentData.id;

            location.assign("./results.html?id=" + coinID);
        });
    }

    var tableFooter = $(`<tfoot>
        ${tableHeaderFooter}
    </tfoot>`);
    tableInsertion.append(tableFooter);

});

searchButton.click(function() {
    modalDiv.addClass("is-active");
});

$(".delete").click(function() {
    modalDiv.removeClass("is-active");
})