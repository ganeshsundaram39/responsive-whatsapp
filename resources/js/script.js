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
        clickedList(event) { return event.path.find(x => x.localName === 'li') },
        chatSection: document.querySelector(`.chat-section`),
        unreadMessage: document.querySelector(`.chats .col-3 div`)
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

const assignBootstrapClass = (index, currentType, previousType, bootClassName) => {

    if (index > 0) {

        if (currentType === previousType) {
            return bootClassName;
        } else {
            return '';
        }
    } else {
        return '';
    }
};

const senderHTML = (index, currentType, previousType, text, time, seen) => {

    return `<div class="d-flex justify-content-end ">
                     	<div class="self rounded position-relative ${
                    	assignBootstrapClass(index,currentType,previousType,'mt-0')
                    	}">
                   		<div class="message">${text}</div>
                   		<div class="text-muted position-absolute">${time} <img src="${seen?'./resources/img/seen.png':'./resources/img/unseen.png'}" alt="message status" width="16" height="16"></div></div>
                   		<div class="triangle-right ${
                   			assignBootstrapClass(index,currentType,previousType,'invisible')
                    	}"></div></div>`;
};

const receiverHTML = (index, currentType, previousType, text, time) => {

    return `<div class = "d-flex" >
                	  <div class = "triangle-left ${
                    	assignBootstrapClass(index,currentType,previousType,'invisible')
                    	}"></div><div class = "other rounded position-relative ${
                    	assignBootstrapClass(index,currentType,previousType,'mt-0')
                    	}">
                	    <div class = "message" >${text}</div> 
                	    <div class = 'text-muted position-absolute'>${time}</div></div></div>`;
};

const loadChat = userOrGrp => {

    if (userOrGrp.messages) {

        accessDOM().chatSection.innerHTML = '';

        for (let singleDate of userOrGrp.messages) {

            for (let m in singleDate.message) {

                if (singleDate.message[m].type === 'self') {

                    accessDOM().chatSection.insertAdjacentHTML('beforeend',
                        senderHTML(m,
                            singleDate.message[m].type,
                            m > 0 ? singleDate.message[m - 1].type : undefined,
                            singleDate.message[m].text,
                            singleDate.message[m].time,
                            singleDate.message[m].seen
                        ));

                } else if (singleDate.message[m].type === 'other') {

                    accessDOM().chatSection.insertAdjacentHTML('beforeend',
                        receiverHTML(m,
                            singleDate.message[m].type,
                            m > 0 ? singleDate.message[m - 1].type : undefined,
                            singleDate.message[m].text,
                            singleDate.message[m].time
                        ));
                }
            }
        }
    }
};

const initializeChatDOM = userOrGrp => {

    accessDOM().chatWindowPhoto.src = userOrGrp.profilePicUrl;
    accessDOM().chatWindowPhoto.alt = userOrGrp.name;
    accessDOM().chatWindowName.innerText = userOrGrp.name;

    if (userOrGrp.lastSeen) {

        accessDOM().details.innerText = `Last Seen on ${userOrGrp.lastSeen}`;
    } else if (userOrGrp.members) {

        accessDOM().details.innerText = userOrGrp.members
            .map(x => x.inUserContact ? x.name : x.contactNumber)
            .reduce((x, y) => `${x}, ${y}`);
    }

    loadChat(userOrGrp);
};

const userClicksChat = event => {

    if (accessDOM().clickedList(event).children[2].children[2]) {

        accessDOM().clickedList(event).children[2].children[2].classList.add('d-none');
    }

    for (let userOrGrp of whatsappData.communication[accessDOM().clickedList(event).getAttribute('data-type')]) {

        if (userOrGrp.name === accessDOM().clickedList(event).getAttribute('data-name')) {

            changeListColor(event);

            initializeChatDOM(userOrGrp);

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
    initializeChatDOM(whatsappData.communication.oneToOne[0]);
})();