//import { getJSON, getLocation } from './utilities.js';
import QuakesController from './quakesController.js';
let controller = new QuakesController(document.getElementById("quakeList"));

let main = document.getElementsByTagName("main")[0];
let input = document.createElement("input");
input.type = "number";
input.placeholder = "Enter Radius in km";
input.id = "radius";
let button = document.createElement("button");
button.addEventListener("click", () => {
    submitRadius();
})
button.innerHTML = "SUBMIT";
main.appendChild(input);
main.appendChild(button);
let listen =  e => {
    document.getElementsByTagName("main")[0].style.display = "none";
    this.getQuakeDetails(e.target.dataset.id);
}
function submitRadius() {
    let radius =  document.getElementById("radius").value;
    controller.init(radius);
}