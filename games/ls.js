function readFromLS(name) {
    let item = localStorage.getItem(name);
    return JSON.parse(item);    
 }

//Writes an array to localStorage. Do not use for simple strings; just use setItem for those.
function writeToLS(name, data) { 
    localStorage.setItem(name, JSON.stringify(data));
}

export { readFromLS, writeToLS }