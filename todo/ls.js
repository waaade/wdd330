export const name = "ls";

function readFromLS(key) {
    let item = localStorage.getitem(key);
    return JSON.parse(item);    
 }

function writeToLS(key, data) { 
    localStorage.setItem(key, JSON.stringify(data));
}