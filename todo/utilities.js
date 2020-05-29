export const name = "utilities";

function qs(selector) {
    return Document.querySelector(selector);
}

function onTouch(elementSelector, callback) {
    let element = qs(elementSelector);
    element.addEventListener("touchend", callback);
    element.addEventListener("click", callback);
}