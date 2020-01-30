'use strict';

(function () {
    let uploadOverlay = document.querySelector(".upload-overlay");
    let uploadResizeControls = uploadOverlay.querySelector(".upload-resize-controls-value");
    let uploadOverlayImage = uploadOverlay.querySelector(".effect-image-preview");

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
})();