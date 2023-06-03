const topics = {
    "About": "https://requals.github.io/about",
    "Projects": "https://requals.github.io/projects"
};
let sidebarHTML = "";

for(topic in topics){
    sidebarHTML += `<a href="${topics[topic]}"><span>${topic}</span></a>`
}

document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.innerHTML = sidebarHTML;
})