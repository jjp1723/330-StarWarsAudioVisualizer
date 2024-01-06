/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';
import * as media from './media-loader.js';
import * as presets from './presets-loader.js'

// crestImages and shipImages arrays; will be populated by the media-loader
let crestImages ;
let shipImages;

// drawParams to be passed to the canvas script
const drawParams = {
    showGradient    : true,
    gradientStyle   : "linear",
    showBars        : true,
    showCircles     : true,
    distortCircles  : false,
    showShips       : true,
    shipCount       : 3,
    showStars       : true,
    starCount       : 1000,
    showNoise       : false,
    showInvert      : false,
    showEnboss      : false,
    forceStyle      : "Jedi_",
    crestImage      : "media/png/Crest_-_Jedi.png",
    shipImage       : "media/png/Ship_-_Delta-7.png"
};

// Default song
    const DEFAULTS = Object.freeze({
        sound1  :  "media/mp3/Jedi_-_The_Force.mp3"
});

function init()
{
    // Getting references to all of the checkboxes, buttons, and selects after the page loads
    const gradientCB = document.querySelector("#gradientCB");
    const barsCB = document.querySelector("#barsCB");
    const shipCB = document.querySelector("#shipCB");
    const shipCount = document.querySelector("#shipCount");
    const shipButton = document.querySelector("#shipButton")
    const circlesCB = document.querySelector("#circlesCB");
    const distortCB = document.querySelector("#distortCB");
    const starsCB = document.querySelector("#starsCB");
    const starCount = document.querySelector("#starCount");
    const starButton = document.querySelector("#starButton")
    const noiseCB = document.querySelector("#noiseCB");
    const invertCB = document.querySelector("#invertCB");
    const enbossCB = document.querySelector("#enbossCB");
    const fsButton = document.querySelector("#fsButton");
    const playButton = document.querySelector("#playButton");
    const trackSelect = document.querySelector("#trackSelect");
    const gradientSelect = document.querySelector("#gradientSelect");

    // Load the media to the crestImages array, the shipImages array, and the track select
    media.loadMediaFetch();
    crestImages = media.crestImages;
    shipImages = media.shipImages;

    // Load the app presets, which will update the drawParams to the preset values
    presets.loadPresetsFetch(drawParams);

	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);

    // Load the default sounds to the audio element
    audio.loadSoundFile(DEFAULTS.sound1);

    // Get reference to the canvas element and call the setUp functions
	let canvasElement = document.querySelector("canvas");
	setupUI(canvasElement);
    canvas.setupCanvas(canvasElement, audio.analyserNode, audio.audioData);

    // Call the app loop
    loop();
}

function setupUI(canvasElement)
{
    // Add onclick event to the full screen button
    fsButton.onclick = e =>
    {
        console.log("init called");
        utils.goFullscreen(canvasElement);
    };

    // Add onclick event to the play button
    playButton.onclick = e =>
    {
        //console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

        // Check if context is in suspended state (autoplay policy)
        if(audio.audioCtx.state == "suspended")
        {
            audio.audioCtx.resume();
            playButton.className = "button is-danger is-rounded is active";
        }
        
        //console.log(`audioCtx.state after = ${audio.audioCtx.state}`);

        if(e.target.dataset.playing == "no")
        {
            // If the track is currently paused, play it
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
            playButton.className = "button is-danger is-rounded is active";
        }
        else
        {
            // If the track is currently playing, pause it
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
            playButton.className = "button is-success is-rounded is active";
        }
    }

    // Volume slider & label
    let volumeSlider = document.querySelector("#volumeSlider");
    let volumeLabel = document.querySelector("#volumeLabel");

    // Add oninput event to the slider
    volumeSlider.oninput = e => {
        // Set the gain
        audio.setVolume(e.target.value);

        // Update value of label to match value of slider
        volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
    }

    // Attempted to implement autoplay feature when a track ends
    // audio.audioCtx.onended = e =>
    // {
    //     console.log("ended");
    //     let options = trackSelect.getElementsByTagName('option');
    //     let index = Math.floor(Math.random() * options.length);
    //     trackSelect.selectedIndex = index;
    // }

    // Add onchange event to track select
    trackSelect.onchange = e =>
    {
        // Load the sound file associated with the selected option
        audio.loadSoundFile(e.target.value);

        // Pause the update the play button
        playButton.dataset.playing = "no";

        // Set the forceStyle parameter based on the selected option
        let newMedia = e.target.value.split('-');
        let force = newMedia[0].split('/');
        drawParams.forceStyle = force[2];

        // Setting the crestImage and shipImage parameters based on the forceStyle parameter
        switch(drawParams.forceStyle)
        {
            case "Jedi_":
                drawParams.crestImage = crestImages[0];
                drawParams.shipImage =  shipImages[0];
                break;
            
            case "Republic_":
                drawParams.crestImage = crestImages[1];
                drawParams.shipImage = shipImages[1];
                break;

            case "Rebellion_":
                drawParams.crestImage = crestImages[2];
                drawParams.shipImage = shipImages[2];
                break;

            case "New_Republic_":
                drawParams.crestImage = crestImages[3];
                drawParams.shipImage = shipImages[3];
                break;

            case "Sith_":
                drawParams.crestImage = crestImages[4];
                drawParams.shipImage = shipImages[4];
                break;
            
            case "CIS_":
                drawParams.crestImage = crestImages[5];
                drawParams.shipImage = shipImages[5];
                break;

            case "Empire_":
                drawParams.crestImage = crestImages[6];
                drawParams.shipImage = shipImages[6];
                break;

            case "First_Order_":
                drawParams.crestImage = crestImages[7];
                drawParams.shipImage = shipImages[7];
                break;

            default:
                drawParams.crestImage = crestImages[0];
                drawParams.shipImage = shipImages[0];
                break;
        }

        console.log(drawParams.forceStyle);
    }

    // Add onchange event to gradient select to update the gradientStyle parameter
    gradientSelect.onchange = e =>
    {
        drawParams.gradientStyle = e.target.value;
    };

    // Add onclick event to the ship button to update the shipCount parameter
    shipButton.onclick = () => 
    {
        shipButton.className = "button is-info is-small is-loading";
        if(Number(parseInt(shipCount.value)))
        {
            drawParams.shipCount = parseInt(shipCount.value);
        }
        shipButton.className = "button is-info is-small";
    };

    // Add onclick event to the star button to update the starCount parameter
    starButton.onclick = () => 
    {
        starButton.className = "button is-info is-small is-loading";
        if(Number(parseInt(starCount.value)))
        {
            drawParams.starCount = parseInt(starCount.value);
        }
        starButton.className = "button is-info is-small";
    };

    // Add onchange checkbox functions
    gradientCB.onchange = () => { drawParams.showGradient = gradientCB.checked; };
    barsCB.onchange = () => { drawParams.showBars = barsCB.checked; };
    circlesCB.onchange = () => { drawParams.showCircles = circlesCB.checked; };
    distortCB.onchange = () => { drawParams.distortCircles = distortCB.checked; };
    shipCB.onchange = () => { drawParams.showShips = shipCB.checked; };
    starsCB.onchange = () => { drawParams.showStars = starsCB.checked; };
    noiseCB.onchange = () => { drawParams.showNoise = noiseCB.checked; };
    invertCB.onchange = () => { drawParams.showInvert = invertCB.checked; };
    enbossCB.onchange = () => { drawParams.showEnboss = enbossCB.checked; };
}

function loop()
{
    requestAnimationFrame(loop);

    // Draw on the canvas based on the current parameters
    canvas.draw(drawParams);
}

export {init};