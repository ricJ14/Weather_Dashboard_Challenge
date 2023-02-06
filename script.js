const weatherAPIURL = "https://api.openweathermap.org";
const weatherAPIKey = "61c5953a2a598f26f6304c521b1884a1";
let searchHistory = []

let searchInput = $("#search-input");
let searchForm = $("#search-form");
let searchHistoryContainer = $("#history")

function fetchCoord(search){
    let queryURL = `${weatherAPIURL}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherAPIKey}`

    fetch (queryURL).then(function(data){
        return data.json()
    }).then(function(response){
        if(!response[0]){
            alert("Location not found")
        } else{
            if(searchHistory.indexOf(search) !== -1){
                return
            }
            searchHistory.push(search);

            localStorage.setItem("search-history", JSON.stringify(searchHistory));
            
            searchHistoryContainer.html("")

            for(let i = 0; i < searchHistory.length; i++){
                let btn = $("<button>");
                btn.attr("type", "button") 
                btn.addClass("history-btn btn-history")

                btn.attr("data- search", searchHistory[i])
                searchHistoryContainer.append(btn)
            }

        }
    })
}

function submitSearchForm(event){
    event.preventDefault();
    let search = (searchInput.val().trim())

    fetchCoord(search)
}

searchForm.on("submit", submitSearchForm);