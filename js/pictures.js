'use strict';

let comments = [ "Всё отлично!",
"В целом всё неплохо. Но не всё.",
 "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
" Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. ",
 "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.",
 "Лица у людей на фотке перекошены, как будто их избивают.", "Как можно было поймать такой неудачный момент?! "];

let descriptions = [ "Тестим новую камеру!",
"Затусили с друзьями на море",
 "Как же круто тут кормят",
 "Отдыхаем...",
 "Цените каждое мгновенье. Цените тех, кто рядом с вамии отгоняйте все сомненья. Не обижайте всех словами...... ", "Вот это тачка!"
];
const MAX_NUMBER_IMAGE = 26;
function getRandomInteger(min, max) {
    // случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

document.querySelector(".gallery-overlay").classList.remove("hidden");

let simillarListElement = document.querySelector(".pictures");
let similarPictureTemplate = document.querySelector("#picture-template").content.querySelector(".picture");

for (let i=1;i < MAX_NUMBER_IMAGE; i++ ){
    let pictureTemp = similarPictureTemplate.cloneNode(true);
    pictureTemp.querySelector("img").src = "photos/"+i+".jpg",
    pictureTemp.querySelector(".picture-likes").textContent =  getRandomInteger(15,200),
    pictureTemp.querySelector(".picture-comments").textContent = getRandomInteger(1,15)
    simillarListElement.appendChild(pictureTemp);
}

document.querySelector(".gallery-overlay-image").src = "photos/"+1+".jpg";
document.querySelector(".gallery-overlay-controls-like .likes-count").textContent = getRandomInteger(15, 200);
document.querySelector(".gallery-overlay-controls-comments").innerHTML = '<li class="social__comment social__comment--text">\n' +
    '<img class="social__picture" src="photos/' +
     getRandomInteger(1, 26) +'.jpg"\n' +
    'alt="Аватар комментатора фотографии"\n' +
    'width="35" height="35">\n' +
    '<p class="social__text">'+comments[getRandomInteger(0, 6)]+'</p>\n' +
    '</li>';
document.querySelector(".gallery-overlay-image").insertAdjacentHTML('afterend','<p>'+descriptions[getRandomInteger(0,4)]+'<p>');