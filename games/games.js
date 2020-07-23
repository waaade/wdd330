import * as ls from "./ls.js";

//Different URLs could be used to search for developers, etc. but we'll stick with just games
const baseURL = 'https://api.rawg.io/api/games?';

let tempIndex = null;

export default class Games {
    constructor() {
        initializeLists();
        displayMenu();
    } 
} 

//Constructor for GameList object.
function GameList(name, displayName, items) {
    this.name = name;
    if (displayName) {
        this.displayName = displayName; //The user can change this later.
    }
    else {
        this.displayName = name;
    }
    if (items) {
        this.items = items;
    }
    else {
        this.items = null;
    }
}

//Create a default list if first time visiting. Get index from localstorage if it exists already, or create it.
//Populate lists from localstorage, based on index.
function initializeLists() {
    if (localStorage.getItem("returning")) {
        tempIndex = ls.readFromLS("index");
    }
    //first time using app. create default list
    else {
        localStorage.setItem("returning", "yes"); //The default list should only be made once, even if deleted
        const aGame = {id:24030, name:"Super Mario Bros. 3"};
        const firstList = new GameList("default", "Default List", {aGame});
        ls.writeToLS("default", firstList);
        tempIndex = [ "default" ]; //The index has the names of the lists.
        ls.writeToLS("index", tempIndex);
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
    critics.innerHTML = "<p>See Games With Best Metacritic Scores This Year</p>";
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

    let yourLists = document.createElement("div");
    yourLists.innerHTML = "<h1>Your Lists</h1>";
    let createList = document.createElement("div");
    createList.className = "specialbutton";
    createList.innerHTML = "Create New List";
    createList.addEventListener("click", showCreateListField);
    yourLists.appendChild(createList);
    tempIndex.forEach(element => {
        let listName = document.createElement("div");
        listName.className = "divbutton";
        listName.innerHTML = ls.readFromLS(element).displayName;
        //createList.addEventListener("click", displayList)
        yourLists.appendChild(listName);
    });
    body.appendChild(yourLists);
}



//implementation thoughts for localstorage: have a namesOfLists (or a list of names of lists, if you will)
//Then have the actual lists, each list a json string from an array
// Displays a local list of games
function displayList(name) {
    let list = ls.readFromLS(name);
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
    const query = baseURL + "dates=" + getYearStart() + "," + getToday() + "&ordering=-metacritic";
    console.log(query);
    search(query);
}

//Show the input field to create a list.
function showCreateListField() {
    let body = document.getElementById("mainbody");
    body.innerHTML = "<h1>Create List</h1><input id='inputname' type='text' placeholder='Name of List'></input>";
    let create = document.createElement("div");
    create.className = "tinybutton";
    create.innerHTML = "Create List";
    create.addEventListener("click", createList);
    body.appendChild(create);
    body.appendChild(getBackButton());
}

function createList() {
    let text = document.getElementById("inputname").value;
    if (text) {
        tempIndex.push(text);
        ls.writeToLS("index", tempIndex);
        let newList = new GameList(text);
        ls.writeToLS(text, newList);
        displayMenu();
    }
    else {
        window.alert("Please enter a name for the list and try again.");
    }
}

//Query the RAWG database and display the results
function search(url) {
    console.log(url);
    document.getElementById("mainbody").innerHTML = "";
    fetch(url, {
    method: 'GET'
})
    .then(response=>response.json())
    .then(data => { console.log(data)
        let gameList = document.createElement("div");
        gameList.innerHTML = "<h1>Search Results</h1>";
        gameList.appendChild(getBackButton());
        data.results.forEach(result => {
            let game = document.createElement("div");
            game.className = "gameItem";
            game.innerHTML = `<h3>${result.name}</h3>`
            gameList.append(game);
        })
        //These two if statements are for when search results have multiple pages (basically always)
        if (data.previous) {
            let prevPage = document.createElement("button");
            prevPage.className = "tinybutton";
            prevPage.innerHTML = "Previous";
            prevPage.addEventListener("click", search.bind(this, data.previous));
            gameList.append(prevPage);
        }
        if (data.next) {
            let nextPage = document.createElement("button");
            nextPage.className = "tinybutton";
            nextPage.innerHTML = "Next";
            nextPage.addEventListener("click", search.bind(this, data.next));
            gameList.append(nextPage);
        }
        document.getElementById("mainbody").appendChild(gameList);
        
    })
    .catch(error=>console.log("Error getting game data."));
}

//Get one specific game's details
function searchGameById(id) {
    const url = "https://api.rawg.io/api/games/" + id;
    fetch(url, {
        method: 'GET'
    })
    .then(response=>response.json())
    .then(data=>console.log(data))
    .catch(error=>console.log("Search by ID failed."));
}

//Show more information about a game
function showMore(game, returnURL) {
    if (returnURL) {
        
    }
}

//Returns a button that when clicked will render the main menu
function getBackButton() {
    let back = document.createElement("div");
    back.className = "tinybutton";
    back.innerHTML = "Back";
    back.addEventListener("click", displayMenu);

    return back;   
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

//Return last month in YYYY-MM-DD format
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