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
(function () {

    let simillarListElement = document.querySelector(".pictures");
    let similarPictureTemplate = document.querySelector("#picture-template").content.querySelector(".picture");
    let form = document.querySelector('#upload-select-image');
        form.addEventListener('submit', function (evt) {
        window.upload(new FormData(form), function (response) {
        })
        evt.preventDefault();
        document.querySelector(".upload-overlay").classList.add('hidden');
    })

    function renderMiniature(data){
        let pictureTemp = similarPictureTemplate.cloneNode(true);
        pictureTemp.querySelector("img").src = data.url;
        pictureTemp.querySelector(".picture-likes").textContent = data.likes;
        pictureTemp.querySelector(".picture-comments").textContent = data.comments.length ;
        return pictureTemp;

    }

    window.load( function (backend) {
        let fragment = document.createDocumentFragment();
        for (let i=1;i < MAX_NUMBER_IMAGE; i++ ) {
            fragment.appendChild(renderMiniature(backend[i]))
            simillarListElement.appendChild(fragment);
        }});
})();
