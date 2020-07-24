//execute hash tag command
function sidebarVideoFilter() {
    chrome.tabs.executeScript({
        file: "/scripts/sidebar-remove-all-videos.js"
    });
}

//run script when subject loaded up
window.addEventListener('load', (event) => {
    sidebarVideoFilter();
});
