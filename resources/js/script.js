const accessDOM = () => {

    return {
        profilebar: document.getElementsByClassName(`profile-sidebar`)[0],
        sidebar: document.getElementsByClassName(`sidebar`)[0],
        smallProfilePic: document.getElementsByClassName(`profile-pic`)[0],
        largeProfilePic: document.getElementsByClassName(`profile-pic`)[1],
        back: document.getElementsByClassName(`back`)[0],
        name: document.querySelector(`.edit input[name='username']`),
        status: document.querySelector(`.edit input[name='status']`)
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

const initialUserProfile = () => {
    accessDOM().smallProfilePic.src = whatsappData.user.profilePicUrl;
    accessDOM().largeProfilePic.src = whatsappData.user.profilePicUrl;
    accessDOM().name.value = whatsappData.user.name;
    accessDOM().status.value = whatsappData.user.status;
};

const initialUserData = () => {
    initialUserProfile();
};

(() => {
    initialUIEvents();
    initialUserData();
})();