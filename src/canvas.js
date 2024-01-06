import * as utils from './utils.js';

// Declaring let variables
let ctx, canvasWidth, canvasHeight, middleY, middleX, analyserNode, audioData;
let linearGradientJedi, linearGradientSith, radialGradientJedi, radialGradientSith, maxRadius;

// Declaring constant variables used for drawing the audio bars
const barWidth = 12;
const barHeightMax = 100;
const padding = 12;

// Lightsaber Image used with audio bars
const lightsaberImage = new Image();
lightsaberImage.src = "media/png/Lightsaber-Small.png";

// Crest image animated in the center of the canvas
const crestImage = new Image();
crestImage.src = "media/png/Crest_-_Jedi.png";

// Ships array and image to be displayed and moved across the canvas
let ships;
const shipImage = new Image();
shipImage.src = "media/png/Ship_-_Delta-7.png";

// Stars array for the starfield effect
let stars;

function setupCanvas(canvasElement,analyserNodeRef, dataRef)
{
	// Create drawing context
	ctx = canvasElement.getContext("2d");

    // Set canvas width and height, as well as middle values and the max radius for the crest images
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
    middleX = canvasWidth / 2;
    middleY = canvasHeight / 2;
    maxRadius = canvasHeight / 4;

    // Populating the "ships" and "stars" using their respective utility method
    ships = utils.makeShips(3, canvasWidth, canvasHeight);
    stars = utils.makeStars(4000, canvasWidth, canvasHeight);
	
	// Draw black background
	ctx.save();
        ctx.fillStyle = "black";
        ctx.globalAlpha = 0.1;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
    
	// Create a linear gradient for light-side music
	linearGradientJedi = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{percent:0,color:"black"}, {percent:.2,color:`rgba(0, 255, 255, 1)`}, {percent:.4,color:`rgba(0, 0, 255, 1)`}, {percent:.6,color:`rgba(0, 0, 160, 1)`}, {percent:.8,color:"black"}]);

	// Create a radial gradient for light-side music
	radialGradientJedi = utils.getRadialGradient(ctx, canvasWidth / 2, canvasHeight / 2, canvasHeight / 16, canvasWidth / 2, canvasHeight / 2, canvasHeight, [{percent:0,color:"black"}, {percent:.2,color:`rgba(0, 255, 255, 1)`}, {percent:.4,color:`rgba(0, 0, 255, 1)`}, {percent:.6,color:`rgba(0, 0, 160, 1)`}, {percent:.8,color:"black"}]);

    // Create a linear gradient for dark-side music
    linearGradientSith = utils.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{percent:0,color:"black"}, {percent:.2,color:`rgba(220, 20, 60, 1)`}, {percent:.4,color:`rgba(255, 0, 0, 1)`}, {percent:.6,color:`rgba(130, 0, 0, 1)`}, {percent:.8,color:"black"}]);

	// Create a radial gradient for dark-side music
	radialGradientSith = utils.getRadialGradient(ctx, canvasWidth / 2, canvasHeight / 2, canvasHeight / 16, canvasWidth / 2, canvasHeight / 2, canvasHeight, [{percent:0,color:"black"}, {percent:.2,color:`rgba(220, 20, 60, 1)`}, {percent:.4,color:`rgba(255, 0, 0, 1)`}, {percent:.6,color:`rgba(130, 0, 0, 1)`}, {percent:.8,color:"black"}]);

	// Reference to the analyser node
	analyserNode = analyserNodeRef;
	// Analyser data
	audioData = dataRef;
}

function draw(params = {})
{
    // Populating the audioData array with the frequency data from the analyserNode
	analyserNode.getByteFrequencyData(audioData);

    // Declaring a percent variable that will be used to animate visual elements based on the audio data
    let percent = audioData[3] / 255;
		


    // ----- Gradients -----

	// Draw gradient
	if(params.showGradient)
    {
        // Checking is the current track style is "light side" or "dark side" based on the forceStyle parameter
        if(params.forceStyle == "Jedi_" || params.forceStyle == "Republic_" || params.forceStyle == "Rebellion_" || params.forceStyle == "New_Republic_")
        {
            // Drawing a linear or radial gradient based on the gradientStyle parameter
            if(params.gradientStyle == "linear")
            {
                ctx.save();
                    ctx.fillStyle = linearGradientJedi;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.restore();
            }
            else if(params.gradientStyle == "radial")
            {
                ctx.save();
                    ctx.fillStyle = radialGradientJedi;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.restore();
            }
        }
        else if(params.forceStyle == "Sith_" || params.forceStyle == "CIS_" || params.forceStyle == "Empire_" || params.forceStyle == "First_Order_")
        {
            // Drawing a linear or radial gradient based on the gradientStyle parameter
            if(params.gradientStyle == "linear")
            {
                ctx.save();
                    ctx.fillStyle = linearGradientSith;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.restore();
            }
            else if(params.gradientStyle == "radial")
            {
                ctx.save();
                    ctx.fillStyle = radialGradientSith;
                    ctx.globalAlpha = 0.3;
                    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                ctx.restore();
            }
        }
    }
    // If there is no valid forceStyle parameter provided, a black backround is drawn instead
    else
    {
        ctx.save();
            ctx.fillStyle = "black";
            ctx.globalAlpha = 0.1;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();
    }



    // ----- Stars -----

    // If the starCount parameter is updated at any point, generate more stars to be drawn on the canvas
    if(params.starCount != stars.length){ stars = utils.makeStars(params.starCount, canvasWidth, canvasHeight); }

    // Starfield effect
    if(params.showStars)
    {
        ctx.save();
            ctx.fillStyle = "white";
            ctx.globalAlpha = 1;
            utils.drawStars(ctx, stars, canvasWidth, canvasHeight, percent);
        ctx.restore();
    }



    // ----- Ships -----

    // If the shipCount parameter is updated at any point, generate more ships to be drawn on the canvas
    if(params.shipCount != ships.length){ ships = utils.makeShips(params.shipCount, canvasWidth, canvasHeight); }

    // Drawing the ships
	if(params.showShips)
    {
        ctx.save();
            shipImage.src = params.shipImage;
            utils.drawShips(ctx, shipImage, ships);
        ctx.restore();
    }

    // Moving the ships with the utility function
    utils.moveShips(ships, canvasWidth, percent, params.forceStyle);



    // ----- Bars -----

	// Drawing bars
	if(params.showBars)
    {
        ctx.save();
            // Checking is the current track style is "light side" or "dark side" based on the forceStyle parameter
            if(params.forceStyle == "Jedi_" || params.forceStyle == "Republic_" || params.forceStyle == "Rebellion_" || params.forceStyle == "New_Republic_")
            {
                ctx.fillStyle = `rgba(0, 255, 0, 0.8)`;
            }
            else if(params.forceStyle == "Sith_" || params.forceStyle == "CIS_" || params.forceStyle == "Empire_" || params.forceStyle == "First_Order_")
            {
                ctx.fillStyle = `rgba(255, 0, 0, 0.8)`;
            }
            ctx.strokeStyle = `rgba(255, 255, 255, 0.4)`;
            ctx.translate(padding + 10, canvasHeight - 70);

            // Loop through data and draw
            for(let i = 0; i < audioData.length; i++)
            {
                let a = audioData[i];
                let barPercent = a / 255;
                if(barPercent < 0.01) barPercent = 0.01;

                ctx.save();
                    ctx.scale(1, -1);
                    ctx.fillRect(0, 0, barWidth, barHeightMax * barPercent);
                    ctx.strokeRect(0, 0, barWidth, barHeightMax * barPercent);
                ctx.restore();

                // Draw lightsaber hilts beneath the audio bars
                ctx.drawImage(lightsaberImage, -4, 0);

                ctx.translate(padding + barWidth, 0);
            }
        ctx.restore();
    }

    

    // ----- Crests -----

    // Draw normal crests
	if(params.showCircles && !params.distortCircles)
    {
        //
        ctx.save();
            ctx.globalAlpha = 0.8;

            //Selecting the correct crest based on the current song
            crestImage.src = params.crestImage;

            // Drawing the crest
            let circleRadius = percent * maxRadius;
            ctx.beginPath();
                ctx.drawImage(crestImage, middleX - circleRadius, middleY - circleRadius, circleRadius * 2, circleRadius * 2);
            ctx.closePath();
        ctx.restore();
    }
    
	// Draw distorted crests
	if(params.showCircles && params.distortCircles)
    {
        ctx.save();
            // Lowering the alpha values to enhance the visual effect
            ctx.globalAlpha = 0.5;

            //Selecting the correct crest based on the current song
            crestImage.src = params.crestImage;

            // Looping through the audio data to draw the crests
            for(let i = 0; i < audioData.length; i++)
            {
                // Drawing the crest
                let percent = audioData[i] / 255;
                let circleRadius = percent * maxRadius;
                ctx.beginPath();
                    ctx.drawImage(crestImage, middleX - circleRadius, middleY - circleRadius, circleRadius * 2, circleRadius * 2);
                ctx.closePath();
            }
        ctx.restore();
    }



    // ----- Noise + Invert + Enboss -----

	// Grabbing all of the pixels on the canvas and put them in the data array
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width;

	// Render noise effect
    for(let i = 0; i < length; i += 4)
    {
        if(params.showNoise && Math.random() < 0.05)
        {
            utils.renderNoise(data, i);
        }
    }

    // Render invert effect with utility function
    if(params.showInvert)
    {
        utils.invertColors(data);
    }

    // Render enboss effect
    // - From AV Homeworks
    if(params.showEnboss)
    {
        for(let i = 0; i < length; i++)
        {
            if(i % 4 == 3) continue;
            data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
    }
	
	// D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

export { setupCanvas, draw };