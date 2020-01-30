'use strict';

const MAX_NUMBER_IMAGE = 26;
const MAX_VALUE_RESIZE = 105;
const MIN_VALUE_RESIZE = 30;
const MAX_RANGE_PIN = 450;
const MIN_RANGE_PIN = 0;

function getRandomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

let simillarListElement = document.querySelector(".pictures");
let similarPictureTemplate = document.querySelector("#picture-template").content.querySelector(".picture");
//picture.js
for (let i=1;i < MAX_NUMBER_IMAGE; i++ ){
    let pictureTemp = similarPictureTemplate.cloneNode(true);
    pictureTemp.querySelector("img").src = "photos/"+i+".jpg";
    pictureTemp.querySelector(".picture-likes").textContent =  getRandomInteger(15,200);
    pictureTemp.querySelector(".picture-comments").textContent = getRandomInteger(1,15);
    simillarListElement.appendChild(pictureTemp);
}

