﻿var container = document.querySelector("#unity-container");
var canvas = document.querySelector("#unity-canvas");
var loadingBar = document.querySelector("#unity-loading-bar");
var progressBarFull = document.querySelector("#unity-progress-bar-full");
var fullscreenButton = document.querySelector("#unity-fullscreen-button");
var warningBanner = document.querySelector("#unity-warning");

function isFullscreen()
{
    return document.fullscreenElement !== null && document.fullscreenElement
        || document.webkitFullscreenElement !== null && document.webkitFullscreenElement
        || document.msFullscreenElement !== null && document.msFullscreenElement;
}

function rebuildFullscreenGUI()
{
    if (isFullscreen()) {
        document.getElementById("unity-fullscreen-button").style.backgroundImage="url('TemplateData/fullscreen-button-in.png')";
    }
    else {
        document.getElementById("unity-fullscreen-button").style.backgroundImage="url('TemplateData/fullscreen-button-out.png')";
    }
}

function unityShowBanner(msg, type) {
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
    }
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == 'error') div.style = 'background: red; padding: 10px;';
    else {
        if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
        setTimeout(function() {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
}

function toggleFullscreen() {
    if (isFullscreen()) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else {
            alert("Full screen is not supported by this browser.");
        }
    }
    else {
        var element = document.getElementById("unity-container");
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            alert("Full screen is not supported by this browser.");
        }
    }
}

function confirmUnload(event) {
    return confirm("All unsaved progress will be lost.");
}

var buildUrl = "Build";
var loaderUrl = buildUrl + "/Side_Responsive.loader.js";
var config = {
    dataUrl: buildUrl + "/Side_Responsive.data.unityweb",
    frameworkUrl: buildUrl + "/Side_Responsive.framework.js.unityweb",
    codeUrl: buildUrl + "/Side_Responsive.wasm.unityweb",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Digitalpharm Co., Ltd.",
productName: "ToyProject",
productVersion: "1.0",
showBanner: unityShowBanner,
};

// By default Unity keeps WebGL canvas render target size matched with
// the DOM size of the canvas element (scaled by window.devicePixelRatio)
// Set this to false if you want to decouple this synchronization from
// happening inside the engine, and you would instead like to size up
// the canvas DOM size and WebGL render target sizes yourself.
//config.matchWebGLToCanvasSize = false;

if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    // Mobile device style: fill the whole browser client area with the game canvas
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
    document.getElementsByTagName('head')[0].appendChild(meta);
    container.className = "unity-mobile";

    // To lower canvas resolution on mobile devices to gain some
    // performance, uncomment the following line:
    //config.devicePixelRatio = 1;

    unityShowBanner('WebGL builds are not supported on mobile devices.');
}

loadingBar.style.display = "block";

var script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFull.style.width = 100 * progress + "%";
    }).then((unityInstance) => {
        loadingBar.style.display = "none";

        // If you want to warn the player before they close the tab,
        // uncomment the following:
        //window.onbeforeunload = confirmUnload;
    }).catch((message) => {
        alert(message);
    });
};
document.body.appendChild(script);

document.onfullscreenchange = rebuildFullscreenGUI;
