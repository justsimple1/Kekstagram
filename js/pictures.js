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

for (let i=1;i < MAX_NUMBER_IMAGE; i++ ){
    let pictureTemp = similarPictureTemplate.cloneNode(true);
    pictureTemp.querySelector("img").src = "photos/"+i+".jpg";
    pictureTemp.querySelector(".picture-likes").textContent =  getRandomInteger(15,200);
    pictureTemp.querySelector(".picture-comments").textContent = getRandomInteger(1,15);
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

document.querySelector(".gallery-overlay-close").addEventListener("click", function() {
    document.querySelector(".gallery-overlay").classList.add("hidden");
})

let uploadOverlay = document.querySelector(".upload-overlay");
let uploadResizeControls = uploadOverlay.querySelector(".upload-resize-controls-value");
let uploadOverlayImage = uploadOverlay.querySelector(".effect-image-preview");
let uploadHashTags = uploadOverlay.querySelector(".upload-form-hashtags");

document.querySelector("#upload-file").addEventListener("change", function() {
    // document.querySelector(".gallery-overlay").classList.remove("hidden")
    uploadOverlay.classList.remove("hidden")
    // document.querySelector(".gallery-overlay").classList.remove("hidden")

    });

document.querySelector("#upload-cancel").addEventListener("click", function() {
    uploadOverlay.classList.add("hidden");
})

uploadOverlay.querySelector(".upload-resize-controls-button-inc").addEventListener("click", function () {
    let uploadResizeControlsValue = parseFloat(uploadResizeControls.value);
    if(uploadResizeControlsValue < MAX_VALUE_RESIZE) {
        uploadResizeControls.setAttribute("value", uploadResizeControlsValue + 25 + "%");
        uploadOverlayImage.style.transform = "scale(" + (uploadResizeControlsValue + 25) / 100 + ")";
    }
})


uploadOverlay.querySelector(".upload-resize-controls-button-dec").addEventListener("click", function () {
    console.log("test222");
    let uploadResizeControlsValue = parseInt(uploadResizeControls.value);
    if(uploadResizeControlsValue > MIN_VALUE_RESIZE) {
        uploadResizeControls.setAttribute("value", uploadResizeControlsValue - 25 + "%");
        uploadOverlay.querySelector(".effect-image-preview").style.transform = "scale(" + (uploadResizeControlsValue - 25) / 100 + ")";
    }
})
let initialProportion = 0.2;
document.querySelector(".upload-effect-controls").addEventListener("click", function(evt) {

    if(evt.target.value=="sepia"){
        uploadOverlayImage.setAttribute("data-filter-name", "sepia");
        uploadOverlayImage.style.filter = "sepia("+1*initialProportion+")";
    } else if(evt.target.value=="chrome"){
        uploadOverlayImage.setAttribute("data-filter-name", "grayscale");
        uploadOverlayImage.style.filter = "grayscale("+1*initialProportion+")";
    } else if(evt.target.value=="phobos") {
        uploadOverlayImage.setAttribute("data-filter-name", "blur");
        uploadOverlayImage.style.filter = "blur("+20*initialProportion+"px)";
    } else if(evt.target.value=="heat") {
        uploadOverlayImage.setAttribute("data-filter-name", "brightness");
        uploadOverlayImage.style.filter = "brightness("+20*initialProportion+")";
    } else if(evt.target.value=="marvin") {
        uploadOverlayImage.setAttribute("data-filter-name", "invert");
        uploadOverlayImage.style.filter = "invert("+1*initialProportion+")";
    } else if(evt.target.value=="none") {
        uploadOverlayImage.setAttribute("data-filter-name", "none");
        uploadOverlayImage.style.filter = "none";
    }
})
uploadHashTags.setAttribute("minlength",2);
uploadHashTags.setAttribute("maxlength",20);
uploadHashTags.setAttribute("required","required");
uploadHashTags.setAttribute("pattern","#[0-9a-z]+");

uploadHashTags.addEventListener("invalid", function (evt) {
    if(uploadHashTags.validity.tooShort){
        uploadHashTags.setCustomValidity("длинна поля, должна быть более 2-ух символов");
    }else if(uploadHashTags.validity.valueMissing) {
        uploadHashTags.setCustomValidity("Вам нужно указать хеш тег")
    }else if(uploadHashTags.validity.patternMismatch) {
        uploadHashTags.setCustomValidity("Хеш тэг начинается с символа #")
    uploadHashTags.value.split()
    }else{
        uploadHashTags.setCustomValidity("")
    }
})

let effectLevelPin = document.querySelector(".upload-effect-level-pin");

effectLevelPin.addEventListener("mousedown", function(evt) {
    evt.preventDefault();
    let nameFilter = uploadOverlayImage.getAttribute("data-filter-name");
    let startCords = {
        x : evt.clientX
    }

    function onMouseMove(moveEvt){
        let shift = {
            x: startCords.x - moveEvt.clientX
        }
        startCords = {
            x : moveEvt.clientX
        }

        let moveDifference = effectLevelPin.offsetLeft - shift.x;
        let proportion = (moveDifference/MAX_RANGE_PIN).toFixed(2);
        initialProportion = proportion;

        if(moveDifference > MIN_RANGE_PIN && moveDifference < MAX_RANGE_PIN){
            effectLevelPin.style.left = (moveDifference) + "px";
            uploadOverlay.querySelector(".upload-effect-level-val").style.width = moveDifference + "px";

            if(nameFilter=="sepia"){
                uploadOverlayImage.style.filter = "sepia("+1*proportion+")";
            }else if(nameFilter=="grayscale"){
                uploadOverlayImage.style.filter = "grayscale("+1*proportion+")";
            }else if(nameFilter=="blur"){
                uploadOverlayImage.style.filter = "blur("+20*proportion+"px)";
            }else if(nameFilter=="brightness"){
                uploadOverlayImage.style.filter = "brightness("+20*proportion+")";
            }else if(nameFilter=="invert"){
                uploadOverlayImage.style.filter = "invert("+1*proportion+")";
            }else if(nameFilter=="invert"){
                uploadOverlayImage.style.filter = "none";
            }
        }
    }
    function onMouseUp(){
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
    }
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp)
})
