function qs(selector) {
    return document.querySelector(selector);
}

function onTouch(elementSelector, callback) {
    let element = qs(elementSelector);
    element.addEventListener("touchend", callback());
    element.addEventListener("click", callback());
}

export { qs, onTouch }