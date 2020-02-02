"use strict";
(function() {
    window.load = function(onSuccess) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener("load", function () {
            if(xhr.status==200){
                onSuccess(xhr.response);
            }
            else {
                console.log("Произоша ошибка"+xhr.status+" "+xhr.statusText);
            }
        })
        xhr.open('GET', "https://js.dump.academy/kekstagram/data");
        xhr.send();}
})();

(function() {
    window.upload = function(data, onSuccess) {
        let xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.addEventListener("load", function () {


        })
        xhr.open('POST', "https://js.dump.academy/kekstagram/data");
        xhr.send(data);}
})();