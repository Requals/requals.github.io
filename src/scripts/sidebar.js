function setupSidebar(){
    const sidebar = document.querySelector(".sidebar");
    sidebar.innerHTML = sidebarHTML;
}

const topics = {
    "Home": "https://requals.github.io",
    "About": "https://requals.github.io/about",
    "Projects": "https://requals.github.io/projects"
};
let sidebarHTML = "";

for(topic in topics){
    sidebarHTML += `<a href="${topics[topic]}"><span>${topic}</span></a>`
}


if(document.readyState === "complete") {
    setupSidebar();
} else {
    document.addEventListener("DOMContentLoaded", () => {
        setupSidebar();
    })
}