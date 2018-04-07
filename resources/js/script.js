const accessDOM = () => {

    return {
        profilebar: document.getElementsByClassName(`profile-sidebar`)[0],
        sidebar: document.getElementsByClassName(`sidebar`)[0],
        smallProfilePic: document.getElementsByClassName(`profile-pic`)[0],
        largeProfilePic: document.getElementsByClassName(`profile-pic`)[1],
        back: document.getElementsByClassName(`back`)[0],
        displayName: document.querySelector(`[name='displayName']`),
        about: document.querySelector(`[name='about']`),
        chats: document.querySelectorAll(`.chats li`),
        chatWindowName: document.querySelector(`.chat .chat-window_name`),
        chatWindowPhoto: document.querySelector(`.chat img`),
        details: document.querySelector(`.chat .details`),
        clickedList(event) { return event.path.find(x => x.localName === 'li') }
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

const changeListColor = event => {

    Array.from(accessDOM().chats).forEach(x => x.style.background = '#fff');
    accessDOM().clickedList(event).style.background = '#d8d8d8';
};

const userClicksChat = event => {

    for (let userOrGrp of whatsappData.communication[accessDOM().clickedList(event).getAttribute('data-type')]) {

        if (userOrGrp.name === accessDOM().clickedList(event).getAttribute('data-name')) {

            changeListColor(event);

            accessDOM().chatWindowPhoto.src = userOrGrp.profilePicUrl;
            accessDOM().chatWindowName.innerText = userOrGrp.name;

            if (userOrGrp.lastSeen) {

                accessDOM().details.innerText = `Last Seen on ${userOrGrp.lastSeen}`;
            } else if (userOrGrp.members) {

                accessDOM().details.innerText = userOrGrp.members
                    .map(x => x.inUserContact ? x.name : x.contactNumber)
                    .reduce((x, y) => `${x}, ${y}`);

            }

            

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
    accessDOM().displayName.value = whatsappData.userData.name;
    accessDOM().about.value = whatsappData.userData.about;
};

(() => {

    initializeUIEvents();
    initializeProfileData();
})();