const template = document.createElement("template");
template.innerHTML = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">

<nav class="navbar has-shadow is-white">
    <!-- logo / brand -->
    <div class="navbar-brand">
        <a class="navbar-item" href="home.html">
            <img src="media/png/Star_Wars_Logo.png" alt="amiibo icon">
        </a>
        <a class="navbar-burger" id="burger">
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>

    <div class="navbar-menu" id="nav-links">
        <div id="nav-bar" class="navbar-start">
            <a id="home" class="navbar-item is-hoverable" href="home.html">
                Home
            </a>
        
            <a id="app" class="navbar-item is-hoverable" href="app.html">
                App
            </a>
        
            <a id="documentation" class="navbar-item is-hoverable" href="documentation.html">
                Documentation
            </a>
        </div> <!-- end navbar-start -->
    </div>
</nav>
`;

class WCNavbar extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback(){ 
        this.burgerIcon = this.shadowRoot.querySelector('#burger');
        this.navbarMenu = this.shadowRoot.querySelector('#nav-links');
        this.burgerIcon.addEventListener('click', () => {
            this.navbarMenu.classList.toggle('is-active');
        });
    }

    disconnectedCallback(){
    }

    attributeChangedCallback(attributeName, oldVal, newVal){
        this.render();
    }

    static get observedAttributes(){
        return ["data-page"];
    }

    render(){
        const currentPage = this.getAttribute('data-page') ? this.getAttribute('data-page') : "Nothing";
        if(currentPage) this.removeLink(currentPage);
    }

    // removeLink method - Removes the href link to the current page from the navbar
    removeLink(currentPage)
    {
        switch(currentPage)
        {
            case "Home":
                this.shadowRoot.querySelector("#nav-bar").innerHTML = `
                    <span class="navbar-item has-text-weight-bold">
                        Home
                    </span>
                
                    <a id="app" class="navbar-item is-hoverable" href="app.html">
                        App
                    </a>
                
                    <a id="documentation" class="navbar-item is-hoverable" href="documentation.html">
                        Documentation
                    </a>
                `;
                break;
                
            case "App":
                this.shadowRoot.querySelector("#nav-bar").innerHTML = `
                    <a class="navbar-item is-hoverable" href="home.html">
                        Home
                    </a>
                
                    <span class="navbar-item has-text-weight-bold">
                        App
                    </span>
                
                    <a class="navbar-item is-hoverable" href="documentation.html">
                        Documentation
                    </a>
                `;
                break;

            case "Documentation":
                this.shadowRoot.querySelector("#nav-bar").innerHTML = `
                    <a class="navbar-item is-hoverable" href="home.html">
                        Home
                    </a>
                
                    <a class="navbar-item is-hoverable" href="app.html">
                        App
                    </a>
                
                    <span class="navbar-item has-text-weight-bold">
                        Documentation
                    </span>
                `;
                break;
            
            default:
                console.log("No Page Detected");
                break;
        }
    }
}

customElements.define('wc-navbar', WCNavbar);