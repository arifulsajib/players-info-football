// fetch data function
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    displayData(data.player);
}

// function display Data
const displayData = (players) => {
    const searchResults = document.getElementById("search-results");

    // clear previous
    clearPrevious("search-results");
    clearPrevious("specific-player");

    if (players === null) {
        showError("result-error", true);
    } else {
        showError("result-error", false);
        for (const player of players) {
            // get all details from data
            let playerImgUrl = "";
            if (player.strThumb === null) {
                playerImgUrl = "https://www.thesportsdb.com/images/noneSquare.png";
            } else {
                playerImgUrl = player.strThumb;
            }
            const playerName = player.strPlayer;

            // set player data 
            if (player.strSport === "Soccer") {
                const playerID = player.idPlayer;
                const div = document.createElement("div");
                div.classList.add("col-lg-4");
                div.classList.add("col-md-6");
                div.innerHTML = `
                <div class = "card h-100" onclick = "getPlayerDetails(${playerID})">
                    <img src = "${playerImgUrl}" class = "card-img-top" height = "200">
                    <div class = "card-body">
                        <h5 class = "card-title text-center"> ${playerName} </h5> 
                    </div> 
                </div>
                `;
                searchResults.appendChild(div);
            }
        }
    }

}

// function to get specific player details
const getPlayerDetails = async (playerID) => {
    const response = await fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupplayer.php?id=${playerID}`);
    const data = await response.json();
    console.log(data);
}
// function to display specific player details


// function show or hide error
const showError = (errorId, isShow) => {
    if (isShow === true) {
        document.getElementById(errorId).style.display = "block";
    } else {
        document.getElementById(errorId).style.display = "none";
    }
}

// clear previous
const clearPrevious = (fieldId) => {
    document.getElementById(fieldId).textContent = "";
}


// Search button click handler
document.getElementById("btn-search").addEventListener("click", () => {
    const searchText = document.getElementById("search-input").value;
    if (searchText == "") {
        showError("empty-error", true);
        // clear previous
        clearPrevious("search-results");
        clearPrevious("specific-player");
    } else {
        showError("empty-error", false);
        fetchData(`https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=${searchText}`);

        // clear search field
        document.getElementById("search-input").value = "";
    }
});



/*
const div = document.createElement("div");
div.classList.add("col-lg-5");
div.classList.add("col-md-8");
div.classList.add("mx-auto");
div.innerHTML = `
        <div class = "card">
            <img src = "${imgUrl}" class = "card-img-top" height = "200" >
            <div class = "card-body">
                <h5 class = "card-title text-center"> ${mealName} </h5>
                <p class="mt-2 mb-1">Details Instruction:</p>
                <textarea class="w-100" rows="6" readonly>${mealInstruction}</textarea>
            </div> 
        </div>
        `;
specificMeal.appendChild(div);

// scroll to specfic section
document.getElementById('specific-meal-section').scrollIntoView();
*/