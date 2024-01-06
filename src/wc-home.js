const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<section class="section has-background-dark">
    <div class="container">
        <div class="column">  
            <div class="hero is-large is-black p-2">
                <div class="hero-head">
                    <p class="title">
                        Star Wars Audio Visualiser Home
                    </p>
                    <p class="subtitle">
                        Listen to various Star Wars soundtracks with a dynamic visualizer
                    </p>
                    <p style="float:left;width:50%">
                        You can use the Star Wars Audio Visualiser in the "App" tab and use it to listen to one of several Star Wars tracks, including at least one track representing one of the major factions across all three eras of Star Wars.  Depending on the track you choose, the visuals will change in accordance to the faction the given soundtrack is associated with.
                        You will be able to customise some elements of the visualizer, such as which elements will be drawn on the screen as well as the amount of certain elements.
                    </p>
                    <img class="p-3" style="float:right;width:50%" src="media/png/Crest_-_Rebellion.png" alt="Rebel Crest">
                </div>
            </div>
        </div>
    </div>
</section>
`;

class WCHome extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){ 
        this.render();
    }

    disconnectedCallback(){
        this.onclick = null;
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }

    static get observedAttributes(){
        return;
    }

    render(){
        
    }
}

customElements.define('wc-home', WCHome);