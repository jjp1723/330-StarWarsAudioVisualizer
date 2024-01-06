// Why are the all of these ES6 Arrow functions instead of regular JS functions?
// No particular reason, actually, just that it's good for you to get used to this syntax
// For Project 2 - any code added here MUST also use arrow function syntax



// ----- makeColor, getRandom, getRandomColor, getLinearGradient, and goFullScreen methods are from Audio-Visualizer Homeworks -----
// ----- makeStars and drawStars methods referenced from 'https://www.youtube.com/watch?v=CSoZPdhNwjY'

// MakeColor method
// - From AV Homeworks
const makeColor = (red, green, blue, alpha = 1) =>
{
    return `rgba(${red},${green},${blue},${alpha})`;
};

// GetRandom method
// - From AV Homeworks
const getRandom = (min, max) =>
{
    return Math.random() * (max - min) + min;
};

// GetRandomColor method - From AV Homeworks
const getRandomColor = () =>
{
    const floor = 35; // so that colors are not too bright or too dark 
    const getByte = () => getRandom(floor,255-floor);
    return `rgba(${getByte()},${getByte()},${getByte()},1)`;
};

// GetLinearGradient method - returns a linear gradient with color stops
// - From AV Homeworks
const getLinearGradient = (ctx,startX,startY,endX,endY,colorStops) =>
{
    let lg = ctx.createLinearGradient(startX,startY,endX,endY);
    for(let stop of colorStops)
    {
        lg.addColorStop(stop.percent,stop.color);
    }
    return lg;
};

// GetRadialGradient method - returns a linear gradient with color stops
const getRadialGradient = (ctx, startX, startY, startR, endX, endY, endR, colorStops) =>
{
    let rg = ctx.createRadialGradient(startX, startY, startR, endX, endY, endR);
    for(let stop of colorStops)
    {
        rg.addColorStop(stop.percent,stop.color);
    }
    return rg;
};

// MakeStars method - returns an array of "stars" for the starfield effect
// - Referenced from 'https://www.youtube.com/watch?v=CSoZPdhNwjY' (not exact copy)
const makeStars = (count, maxX, maxY) =>
{
    const stars = [];
        for (let i = 0; i < count; i++)
        {
            const star = 
            {
                x   : Math.random() * maxX,
                y   : Math.random() * maxY,
                z   : Math.random() * maxX
            };
            stars.push(star);
        }
    return stars;
};

// DrawStars method - draws the "stars" on the canvas and moves them slightly
// - Referenced from 'https://www.youtube.com/watch?v=CSoZPdhNwjY' (not exact copy)
const drawStars = (ctx, stars, maxX, maxY, speed) =>
{
    let x, y, midX = maxX / 2, midY = maxY / 2;
    for(let star of stars)
    {
        x = (star.x - midX) * (maxX / star.z);
        x = x + midX;

        y = (star.y - midY) * (maxX / star.z);
        y = y + midY;

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.closePath();
        
        star.z -= speed;
        if(star.z <= 0)
        {
            star.z = Math.random() * maxX;
        }
    }
};

// MakeShips method - returns an array of "ships" which trackes their positions on the screen
const makeShips = (count, maxX, maxY) =>
{
    const ships = [];
    for (let i = 0; i < count; i++)
    {
        const ship = 
        {
            x       : (maxX / (count + 1)) * i,
            y       : ((maxY - 45) / (count + 2)) * i,
            speed   : Math.random() * 4 + 1
        };
        ships.push(ship);
    }
    return ships;
};

// DrawShips method
const drawShips = (ctx, image, ships) =>
{
    for(let ship of ships)
    {
        ctx.drawImage(image, ship.x, ship.y, 75, 45);
    }
};

// MoveShips method - moves the "ships" and resets their position when they move off the screen
const moveShips = (ships, maxX, speed, style) =>
{
    for(let ship of ships)
    {
        if(style == "Jedi_" || style == "Republic_" || style == "Rebellion_" || style == "New_Republic_")
        {
            ship.x += ship.speed * speed;
        }
        else if(style == "Sith_" || style == "CIS_" || style == "Empire_" || style == "First_Order_")
        {
            ship.x -= ship.speed * speed;
        }
        if(ship.x > maxX + 15) ship.x = -90;
        if(ship.x < -90) ship.x = maxX + 15;
    }
};

// RenderNoise method
const renderNoise = (data, index) =>
{
    data[index] = 128;
    data[index + 1] = 128;
    data[index + 2] = 128;
}

// InvertColors method
const invertColors = (data) =>
{
    for(let i = 0; i < data.length; i += 4)
    {
        let red = data[i], green = data[i + 1], blue = data[i + 2];
        data[i] = 255 - red;
        data[i + 1] = 255 - green;
        data[i + 2] = 255 - blue;
    }
};

// GoFullScreen method
// - From AV Homeworks
const goFullscreen = (element) => {
    if (element.requestFullscreen)
    {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullscreen)
    {
        element.mozRequestFullscreen();
    }
    else if (element.mozRequestFullScreen)
    { // camel-cased 'S' was changed to 's' in spec
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen)
    {
        element.webkitRequestFullscreen();
    }
};

export { makeColor, getRandomColor, getLinearGradient, getRadialGradient, goFullscreen, makeStars, drawStars, invertColors, makeShips, drawShips, moveShips, renderNoise };