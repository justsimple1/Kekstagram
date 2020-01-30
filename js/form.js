'use strict';
(function() {
    let uploadHashTags = document.querySelector(".upload-overlay .upload-form-hashtags");
    uploadHashTags.setAttribute("minlength",2);
    uploadHashTags.setAttribute("maxlength",20);
    uploadHashTags.setAttribute("required","required");
    uploadHashTags.setAttribute("pattern","#[0-9a-z]+");

    uploadHashTags.addEventListener("invalid", function () {
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
})();