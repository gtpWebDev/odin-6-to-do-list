import "./styles.css"
import Icon from './icon.png';
import { checkModuleBundling } from "../other.js";

const main = document.querySelector("body")
const jsLinkCheck = document.createElement("p")
jsLinkCheck.textContent = "If this text shows and is red, js is linked and webpack is bundling css files"
main.appendChild(jsLinkCheck)

const fontCheck = document.createElement("p")
fontCheck.setAttribute("id","fontCheck")
fontCheck.textContent = "If this text is fancy, webpack is successfully bundling fonts"
main.appendChild(fontCheck)

const domObject = checkModuleBundling();
main.appendChild(domObject);

const imageCheck = document.createElement("p")
imageCheck.textContent = "If a heart shows below, webpack is bundling images"
main.appendChild(imageCheck)

const myIcon = new Image();
myIcon.src = Icon;
main.appendChild(myIcon);
