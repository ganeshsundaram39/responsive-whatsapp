const accessDOM = () => {

    return {
        profilebar: document.getElementsByClassName(`profile-sidebar`)[0],
        sidebar: document.getElementsByClassName(`sidebar`)[0],
        smallProfilePic: document.getElementsByClassName(`profile-pic`)[0],
        back: document.getElementsByClassName(`back`)[0]
    }
};

const profilebarVisibility = event => {

    accessDOM().profilebar.classList.remove(`d-none`);
    accessDOM().sidebar.classList.add(`d-none`);
};

const sidebarVisibility = event => {

    accessDOM().profilebar.classList.add(`d-none`);
    accessDOM().sidebar.classList.remove(`d-none`);
};

const initialUIEvents = () => {

    accessDOM().smallProfilePic.onclick = profilebarVisibility;
    accessDOM().back.onclick = sidebarVisibility;
};

(() => {

    initialUIEvents();
})();