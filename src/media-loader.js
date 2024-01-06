// Data file location
const url = "data/media.json";

// crestImages and shipImages arrays
let crestImages = [];
let shipImages = [];

// Fetch function to load the media from 'media.json'
function loadMediaFetch()
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

        // Get reference to the track select
        const trackSelect = document.querySelector("#trackSelect");
        trackSelect.innerHTML = "";

        // Pushing the crest image file locations to the crestImages array
        for(let i of json[keys[0]].imageList)
        {
            crestImages.push(`media/png/Crest_-_${i}.png`);
        }

        // Pushing the ship image file locations to the shipImages array
        for(let i of json[keys[1]].imageList)
        {
            shipImages.push(`media/png/Ship_-_${i}.png`);
        }

        // Adding the audio track names to the tracklist
        for(let i of json[keys[2]].trackList)
        {
            const option = document.createElement("option");
            
            let htmlI = i.replace(" ", "_");
            for(let j = 0; j < i.length; j++){ htmlI = htmlI.replace(" ", "_"); }
            
            option.value = `media/mp3/${htmlI}.mp3`;
            option.text = i;
            trackSelect.appendChild(option);
        }
    
        // console.log(crestImages);
        // console.log(shipImages);
        // console.log(trackSelect.innerHTML);
    }

    // Call fetchPromise() and add a .catch() to it
    fetchPromise()
    .catch(e => {
        console.log(`In catch with e = ${e}`);
    });
}

export { loadMediaFetch, crestImages, shipImages };