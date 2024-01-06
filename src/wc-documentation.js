const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<section class="section has-background-dark">
    <div class="container">
        <div class="px-1 py-1">
            <div class="has-background-black mr-1 p-1"> 
                <div class="is-large p-4">
                    <!-- Row #1 -->
                    <div class="title has-text-light">
                        Star Wars Audio Visualiser Documentation (WIP)
                    </div>
                    
                    <!-- Row #2  -->
                    <div class="box mt-2">
                        <h2 class="subtitle has-text-weight-bold mb-0">
                            Project Requirements
                        </h2>
                        <a href="https://github.com/tonethar/IGME-330-Spring-2022/blob/main/projects/p2.md">https://github.com/tonethar/IGME-330-Spring-2022/blob/main/projects/p2.md</a>
                        
                        <hr>

                        <h2 class="subtitle has-text-weight-bold mb-0">
                            Resources
                        </h2>
                        <ul>
                            <li>
                                audio.js Code: <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/demo-web-audio-1.md">Web Audio 1 - <i>Build a Simple Audio Visualizer</i></a> |
                                <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-1.md">HW - Audio Visualizer I</a> |
                                <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-2.md">HW - Audio Visualizer II</a> |
                                <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-3.md"> HW - Audio Vizualiser III</a>
                            </li>
                            <li>
                                utils.js Code: <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-1.md">HW - Audio Visualizer I</a> |
                                <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-2.md">HW - Audio Visualizer II</a> |
                                <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-3.md"> HW - Audio Vizualiser III</a>
                            </li>
                            <li>
                                canvas.js Enboss Code: <a href="https://github.com/tonethar/IGME-330-Master/blob/master/notes/HW-AV-2195-3.md"> HW - Audio Vizualiser III</a>
                            </li>
                            <li>
                                Starfield Code Referenced: <a href="https://www.youtube.com/watch?v=CSoZPdhNwjY">https://www.youtube.com/watch?v=CSoZPdhNwjY</a>
                            </li>
                            <li>
                                Font: <a href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Press+Start+2P&family=Silkscreen&display=swap">Orbitron</a>
                            </li>
                            <li>
                                Brand Icon Source: <a href="https://logos-world.net/star-wars-logo/">https://logos-world.net/star-wars-logo/</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://www.pinclipart.com/maxpin/iJibmh/">Jedi Order</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://starwars.fandom.com/wiki/Republic_crest">Galactic Republic</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://www.pikpng.com/downpngs/TbmxRT_star-wars-rebellion-rebel-alliance-logo-red-clipart/">Rebellion</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://swgalaxy.fandom.com/wiki/New_Republic_Defense_Forces?file=New_Republic_Army_Symbol_%2528From_Raising_of_the_Flag_on_Coruscant_Victory%2529.png">New Republic</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://www.logolynx.com/topic/sith">Sith Order</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://starwarsrebels.fandom.com/wiki/Confederacy_of_Independent_Systems">Confederacy of Independent Systems (CIS)</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://www.pngkey.com/maxpic/u2a9o0y3y3a9i1a9/">Galactic Empire</a>
                            </li>
                            <li>
                                Crest Image: <a href="https://commons.wikimedia.org/wiki/File:Emblem_of_the_First_Order.svg">The First Order</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://www.pinterest.com/pin/delta7-aetherspriteclass-light-interceptor-by-nym182--377950593734217617/">Delta-7</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://www.gmbinder.com/share/-LjXHbVGLWPwmc1HjAQ_">ARC-170</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://www.pngitem.com/middle/iboRTmo_transparent-star-wars-x-wing-png-star-wars/">X-Wing</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://wobbly_g.artstation.com/projects/nzBwX">MG-100 Starfortess</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://starwars.fandom.com/wiki/Scimitar">Scimitar</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://vsbattles.fandom.com/wiki/Vulture_Droid">Vulture Droid</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://www.pngitem.com/middle/hwimhJb_tie-fighter-star-wars-png-download-image-star/">Tie Fighter</a>
                            </li>
                            <li>
                                Ship Image: <a href="https://starwars.fandom.com/wiki/TIE/dg_starfighter">Tie Dagger</a>
                            </li>
                            <li>
                                Decorative Image: <a href="https://taichaole.blogspot.com/2018/04/lightsaber-hilt.html">Lightsaber Hilt</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=HcZ9kQ1h-ZY">The Force Theme</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=eyHOUMWw5_M">Leia's Theme</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=oSXeOY_Ad4U">Luke and Leia's Theme</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=sP_gXu3s8E0">Begun The Clone War Has (Attack of the Clones Imperial March)</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=i5chHfK6sCc">Star Wars: The Clone Wars - Intro</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=trYeKG17hYc">Throne Room</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=BEi9WB18vwE">Yub Nub</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=s6ARh_5D8YM">Maul and Savage vs Sidious</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=RaEzKRngCyY">Darth Vader's Rade (Hope)</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=M6ZGZSezfVw&t=41s">Droid Army March</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=QDyMcV5Akwk">General Grievous's Theme</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=-C2wCcuKmLI">Imperial Suite</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=TouCl6yp13A">Empire Day</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=-bzWSJG93P8">Imperial March</a>
                            </li>
                            <li>
                                Music: <a href="https://www.youtube.com/watch?v=85oW_RSFr24">First Order March</a>
                            </li>
                        </ul>
                        
                        <hr>

                        <h2 class="subtitle has-text-weight-bold mb-0">
                            JS Libraries
                        </h2>
                        <ul>
                            <li>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas</a>
                            </li>
                            <li>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API">Web Audio</a>
                            </li>
                            <li>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Fetch</a>
                            </li>
                            <li>
                                <a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a>
                            </li>
                            <li>
                                <a href="https://bulma.io">Bulma</a>
                            </li>
                        </ul>
                        
                        <hr>

                        <h2 class="subtitle has-text-weight-bold mb-0">
                            Noteworthy
                        </h2>
                        <ul>
                            <li>
                                -Mobile Friendly: This project utilized Bulma styling to create a "mobile-first" application, most evident in the navigation bar, as in screen resolutions under 1024px, it is replaced with a hamburger menu
                            </li>
                            <li>
                                -Coding Standards Met: This project utilizes six ES6 modules and four web components, and all code follows class naming standards
                            </li>
                            <li>
                                -User Experience: All page states are communicated to the user through on-screen messages, spinning loading wheels, and bolded fonts
                            </li>
                            <li>
                                -Fetch utilized to load app data from external json files
                            </li>
                        </ul>
                        
                        <hr>

                        <h2 class="subtitle has-text-weight-bold mb-0">
                            Grading
                        </h2>
                        Requirements Met:
                        <ul>
                            <li>
                                -All required pages - <i>Home, App, Documentation</i> - have been completed
                            </li>
                            <li>
                                -More than three controls provided and are well labeled & positioned
                            </li>
                            <li>
                                -More than five utility functions utilized in js files
                            </li>
                            <li>
                                -App presets loaded from an external file via 'fetch()'
                            </li>
                            <li>
                                -Embedded font utilized
                            </li>
                        </ul>
                        <br>
                        Above & Beyond:
                        <ul>
                            <li>
                                -App media loaded from an external file via 'fetch()'
                            </li>
                            <li>
                                -Multiple visual themes that change dynamically based on the track currently selected
                            </li>
                            <li>
                                -Dynamic controls that give the user greater influence on the visuals are present; entering a custom amount for ship count and star count via text input.
                            </li>
                            <li>
                                -Utilized visual effect not discussed in class or any class-related work (starfield).
                            </li>
                        </ul>

                        <br>
                        <h2 class="subtitle has-text-weight-bold mb-0">
                            TO DO
                        </h2>
                        <ol>
                            <li>
                                Improve visual styling of web pages.
                            </li>
                            <li>
                                Implement autoplay for when a given track finishes playing.
                            </li>
                            <li>
                                Add bass and treble sliders.
                            </li>
                            <li>
                                Add screen flash effect tied to volume levels.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
`;

class WCDocumentation extends HTMLElement{
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

customElements.define('wc-documentation', WCDocumentation);