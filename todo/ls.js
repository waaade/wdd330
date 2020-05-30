function readFromLS(key) {
    let item = localStorage.getItem(key);
    return JSON.parse(item);    
 }

function writeToLS(key, data) { 
    localStorage.setItem(key, JSON.stringify(data));
}

export { readFromLS, writeToLS }