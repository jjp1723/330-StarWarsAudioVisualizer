// Data file location
const url = "data/presets.json";

// Fetch function to load the media from 'presets.json'
function loadPresetsFetch(drawParams = {})
{
    const fetchPromise = async() =>
    {
        let response = await fetch(url);

        if (!response.ok)
        {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let json = await response.json();
        const keys = Object.keys(json)

        // Get reference to the gradient select element
        const gradientSelect = document.querySelector("#gradientSelect");
        gradientSelect.innerHTML = "";

        // Add the gradient options to the select
        for(let i of json[keys[0]].gradientList)
        {
            const option = document.createElement("option");
            
            let htmlI = i.split(" ")[0];
            option.value = `${htmlI.toLowerCase()}`;
            option.text = i;
            gradientSelect.appendChild(option);
        }

        // Check all preset checkboxes
        for(let i of json[keys[1]].checkList)
        {
            document.querySelector(`#${i}`).checked = true;
        }

        // Set preset text input values
        for(let i = 0; i < json[keys[2]].textList.length; i++)
        {
            document.querySelector(`#${json[keys[2]].textList[i]}`).value = json[keys[2]].textValues[i];
        }
    
        // console.log(crestImages);
        // console.log(shipImages);
        // console.log(trackSelect.innerHTML);

        // Update the drawParams based on the preset data
        drawParams.showGradient = gradientCB.checked;
        drawParams.showBars = barsCB.checked;
        drawParams.showCircles = circlesCB.checked;
        drawParams.distortCircles = distortCB.checked;
        drawParams.showShips = shipCB.checked;
        drawParams.showStars = starsCB.checked;
        drawParams.showNoise = noiseCB.checked;
        drawParams.showInvert = invertCB.checked;
        drawParams.showEnboss = enbossCB.checked;
        drawParams.shipCount = parseInt(shipCount.value);
        drawParams.starCount = parseInt(starCount.value);
    }

    // Call fetchPromise() and add a .catch() to it
    fetchPromise()
    .catch(e => {
        console.log(`In catch with e = ${e}`);
    });
}

export { loadPresetsFetch };