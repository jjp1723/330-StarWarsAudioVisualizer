// ----- Much of the following code has been taken from the in-class 'simple-audio-visualizer' activity -----
// ----- loadSoundFile, playCurrentSound, pauseCurrentSound, and setVolume methods from audio-visualizer homeworks -----

// Declaring variables
const NUM_SAMPLES = 64;
let highshelf = false;
let lowshelf = false;
let distortion = false;
let distortionAmount = 20;
let audioCtx, audioElement, analyserNode, sourceNode, biquadFilter, lowShelfBiquadFilter, distortionFilter, gainNode;

// Get reference to audio element on page
audioElement = new Audio();
        
// Create a new `AudioContext` object
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
audioCtx = new (window.AudioContext || window.webkitAudioContext); // to support Safari and mobile

// Create a node that points at the audio element
// https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaElementSource
sourceNode = audioCtx.createMediaElementSource(audioElement); 

// Create a *analyser node*
// https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode
analyserNode = audioCtx.createAnalyser();

// Get samples
analyserNode.fftSize = NUM_SAMPLES;

// Create biquad filter ----- Unused -----
// https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode
biquadFilter = audioCtx.createBiquadFilter();
biquadFilter.type = "highshelf";
// biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime);
// biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);

// Lowshelf ----- Unused -----
lowShelfBiquadFilter = audioCtx.createBiquadFilter();
lowShelfBiquadFilter.type = "lowshelf";

// Waveshaper ----- Unused -----
distortionFilter = audioCtx.createWaveShaper();

// Gain
const DEFAULTS = Object.freeze({
    gain : .5,
    numSamples : 64
})
gainNode = audioCtx.createGain();
gainNode.gain.value = DEFAULTS.gain;

// Hook up the audio nodes
sourceNode.connect(biquadFilter);
biquadFilter.connect(lowShelfBiquadFilter);
lowShelfBiquadFilter.connect(distortionFilter);
distortionFilter.connect(analyserNode);

// Connect to the destination i.e. the speakers
analyserNode.connect(gainNode);
gainNode.connect(audioCtx.destination);

// Create a new array of 8-bit integers (0-255)
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
let audioData = new Uint8Array(analyserNode.frequencyBinCount);

// loadSoundFile method
function loadSoundFile(filePath)
{
    audioElement.src = filePath;
}

// playCurrentSound method
function playCurrentSound()
{
    audioElement.play();
}

// pauseCurrentSound method
function pauseCurrentSound()
{
    audioElement.pause();
}

// setVolume method
function setVolume(value)
{
    value = Number(value); // make sure that it's a Number rather than a String
    gainNode.gain.value = value;
}

export { audioCtx, playCurrentSound, pauseCurrentSound, loadSoundFile, setVolume, analyserNode, audioData }