//
// Router definitions
//

class Router {
    static #currentRouter;

    // Initiates the router.
    static initiateRouter() {
        // If no RouterController is found, create an instance.
        if(!Router.#currentRouter) {
            Router.#currentRouter = new RouterController();
        }
        return Router.#currentRouter;
    }
}

class RouterController {

    createDocument() {

        const routes = this.routes;
        const base = this.base;

        // Notifies the user of an error.
        function notifyError(error) {
            if(typeof error === "string") {
                document.querySelector(".error").innerHTML = error
                throw new Error(error)
            }
            document.querySelector(".error").innerHTML = error.toString();
        }

        // Checks for an error.
        function findInitErrors() {
            if(!routes || !base) {
                notifyError("RouterController: No route/base provided!")
            }
        }

        findInitErrors();

        // Retrieves the route to a path.
        function getRoute() {
            // Get the URL without fragments or query strings.
            let url = window.location.origin + window.location.pathname;
            let urlRoute = url.replace(base,"");

             // If the route is not found, 404.
             if(!Object.keys(routes).includes(urlRoute)){
               notifyError("404 Not Found")
             }

            let result = routes[urlRoute]
            
            return result;
        }

        // Replaces the current document with another document.
        function createDocument(route) {
            // Evil magic. Fetches the page and uses DOMParser to parse a document.
            fetch(`src/pages/${route}`).then(response => response.text()).then(
                text => {
                    const parser = new DOMParser();
                    let htmlDoc = parser.parseFromString(text,"text/html");
                    document.body.innerHTML = htmlDoc.body.innerHTML;
                    document.head.innerHTML = htmlDoc.head.innerHTML;
                }
            );
        }
        
        // Finally create the document. Retrieves the route, retrieves the document, then creates the document.
        createDocument(getRoute())
    }
}

//
// Begin routing
//

const router = Router.initiateRouter();

// The home page/base URL of the site.

// For live server stuff
// router.base = "https://127.0.0.1/404.html"
router.base = "https://requals.github.io"

// Routing "requests" to pages.
router.routes = {
    "/about": "about.html",
    "/projects": "projects.html"
}
router.createDocument();