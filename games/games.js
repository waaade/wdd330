//Different URLs could be used to search for developers, etc. but we'll stick with just games
const baseURL = 'https://api.rawg.io/api/games?';

export default class Games {
    constructor() {
        displayMenu();
    } 
} 

// Displays the main menu
function displayMenu() {
    let body = document.getElementById("mainbody");
    body.innerHTML = "";

    let upcoming = document.createElement("div");
    upcoming.className = "divbutton";
    upcoming.innerHTML = "<p>See Popular Upcoming Games</p>";
    upcoming.addEventListener("click", showFuture);
    body.appendChild(upcoming);

    let recent = document.createElement("div");
    recent.className = "divbutton";
    recent.innerHTML = "<p>See Popular Recently Released Games</p>";
    recent.addEventListener("click", showNew);
    body.appendChild(recent);

    let critics = document.createElement("div");
    critics.className = "divbutton";
    critics.innerHTML = "<p>See Highest-Rated Games This Year</p>";
    critics.addEventListener("click", showAcclaimed);
    body.appendChild(critics);

    let byName = document.createElement("div");
    byName.innerHTML = "<input type='text' id='byname' placeholder='Search for a game'></input>";
    let go = document.createElement("button");
    go.className = "tinybutton";
    go.innerHTML = "Search";
    go.addEventListener("click", searchByName);
    byName.appendChild(go);
    body.appendChild(byName);
}

//implementation thoughts for localstorage: have a namesOfLists (or a list of names of lists, if you will)
//Then have the actual lists, each list a json string from an array
// Displays a local list of games
function displayList(listName) {

}

function searchByName() {
    let text = document.getElementById("byname").value;
    if (text != "") {
        text = text.split(' ').join('+'); //Replace spaces with + https://stackoverflow.com/questions/3794919/replace-all-spaces-in-a-string-with
        const query = baseURL + "search='" + text + "'";
        console.log(query);
        search(query);
    }
    else {
        window.alert("Please enter some text and try searching again.");
    }
   
}

// Queries for new releases
function showNew() {
    let month
    let query = baseURL + "dates=" + getLastMonth() + "," + getToday() + "&ordering=-added";
    console.log(query);
    search(query);
}

// Queries for popular upcoming games
function showFuture() {
    const dates = getTodayAndNextYear();
    console.log(dates[0]);
    const query = baseURL + "dates=" + dates[0] + "," + dates[1] + "&ordering=-added";
    console.log(query);
    search(query);
}

//Show the highest rated games for the current year
function showAcclaimed() {
    const query = baseURL + "dates=" + getYearStart() + "," + getToday() + "&ordering=-rating";
    console.log(query);
    search(query);
}

// Displays a list of lists, plus the create list button with its name field
function displayCustomLists() {

}

// Create a list in localstorage
function createList(name) {

}

function search(url) {
    document.getElementById("mainbody").innerHTML = "";
    fetch(url, {
    method: 'GET'
})
    .then(response=>response.json())
    .then(data => { console.log(data)
        let gameList = document.createElement("div");
        gameList.innerHTML = "<h1>Search Results</h1>";
        let back = document.createElement("div");
        back.className = "divbutton";
        back.innerHTML = "<p>Back</p>";
        back.addEventListener("click", displayMenu);
        gameList.appendChild(back);
        data.results.forEach(result => {
            let game = document.createElement("div");
            game.className = "gameItem";
            game.innerHTML = `<h3>${result.name}</h3>`
            gameList.append(game);
        })
        document.getElementById("mainbody").appendChild(gameList);
    })
    .catch(error=>console.log("Error getting game data."));
}

//Returns an array with today's date and the date one year from now.
function getTodayAndNextYear() {
    let theDate = new Date();
    //Note: thanks to https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd for saving me a bit of time here
    let curDate = theDate.toISOString().split('T')[0];
    console.log(curDate);
    theDate.setFullYear(theDate.getFullYear() + 1);
    //https://stackoverflow.com/questions/8609261/how-to-determine-one-year-from-now-in-javascript
    let futureDate = theDate.toISOString().split('T')[0];
    console.log(futureDate);

    return [curDate, futureDate];
}

//Return today's date in YYYY-MM-DD format
function getToday() {
    let theDate = new Date();
    return theDate.toISOString().split('T')[0];
}

function getLastMonth() {
    let theDate = new Date();
    theDate.setDate(0); //set day to first day of month
    theDate.setMonth(theDate.getMonth() - 1);
    return theDate.toISOString().split('T')[0];
}

//Returns Jan 1 of current year in YYYY-MM-DD format
function getYearStart() {
    let theDate = new Date();
    theDate.setMonth(0);
    theDate.setDate(0);
    return theDate.toISOString().split('T')[0];
}