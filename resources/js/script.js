const accessDOM = () => {

    return {
        profilebar: document.getElementsByClassName(`profile-sidebar`)[0],
        sidebar: document.getElementsByClassName(`sidebar`)[0],
        smallProfilePic: document.getElementsByClassName(`profile-pic`)[0],
        largeProfilePic: document.getElementsByClassName(`profile-pic`)[1],
        back: document.getElementsByClassName(`back`)[0],
        name: document.querySelector(`[name='displayName']`),
        about: document.querySelector(`[name='about']`),
        chats: document.querySelectorAll(`.chats li`)
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

const userClicksChat = event => {

    const targetLi = event.path.find(x => x.localName === 'li');

    for (let user of whatsappData.communication[targetLi.getAttribute('data-type')]) {
        if (user.name === targetLi.getAttribute('data-name')) {
            
            
            break;
        }
    }
    event.stopPropagation();
};

const initializeUIEvents = () => {

    accessDOM().smallProfilePic.onclick = profilebarVisibility;
    accessDOM().back.onclick = sidebarVisibility;

    for (let chat in accessDOM().chats) {
        accessDOM().chats[chat].onclick = userClicksChat;
    }
};


const initializeProfileData = () => {

    accessDOM().largeProfilePic.src = whatsappData.userData.profilePicUrl;
    accessDOM().name.value = whatsappData.userData.name;
    accessDOM().about.value = whatsappData.userData.about;
};

(() => {

    initializeUIEvents();
    initializeProfileData();
})();