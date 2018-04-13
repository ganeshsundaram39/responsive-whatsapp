// DOM manipulation

// Single object for accessing DOM elements
const accessDOM = () => {
    return {
        profilebar: document.getElementsByClassName('profile-sidebar')[0],
        sidebar: document.getElementsByClassName('sidebar')[0],
        smallProfilePic: document.getElementsByClassName('profile-pic')[0],
        largeProfilePic: document.getElementsByClassName('profile-pic')[1],
        backFromProfile: document.querySelector('.profile-sidebar .back'),
        backFromChat: document.querySelector('.chat .back'),
        displayName: document.querySelector('[name="displayName"]'),
        about: document.querySelector('[name="about"]'),
        chats: document.querySelectorAll('.chats li'),
        chatWindowName: document.querySelector('.chat .chat-window_name'),
        chatWindowPhoto: document.querySelector('.chat img'),
        details: document.querySelector('.chat .details'),
        chatSection: document.querySelector('.chat-section'),
        unreadMessage: document.querySelector('.chats .col-3 div'),
        chat: document.querySelector('.chat')
    }
};

// Show or hide side bar
const sidebar = {
    show() {
        accessDOM().sidebar.classList.remove('d-none');
        accessDOM().sidebar.classList.add('d-block');
    },
    hide() {
        accessDOM().sidebar.classList.remove('d-block');
        accessDOM().sidebar.classList.add('d-none');
    }
};

// Show or hide profile bar
const profilebar = {
    show() {
        accessDOM().profilebar.classList.remove('d-none');
        accessDOM().profilebar.classList.add('d-block');
    },
    hide() {
        accessDOM().profilebar.classList.add('d-none');
        accessDOM().profilebar.classList.remove('d-block');
    }
};

// Show or hide chat section
const chat = {
    show() {
        accessDOM().chat.classList.remove('d-none');
        accessDOM().chat.classList.add('d-block');
    },
    hide() {
        accessDOM().chat.classList.add('d-none');
        accessDOM().chat.classList.remove('d-block');
    }
};

// Show or hide message indicator
const messageIndicator = {

    show(event) {
        event.currentTarget.children[2].children[2].classList.remove('d-none');
        event.currentTarget.children[2].children[2].classList.add('d-inline-block');
    },
    hide(event) {
        event.currentTarget.children[2].children[2].classList.remove('d-inline-block');
        event.currentTarget.children[2].children[2].classList.add('d-none');
    }
};

// Show profile bar if sidebar is open
const profilebarVisibility = event => {

    sidebar.hide();
    profilebar.show();
};

// Show sidebar if profile bar is open
const sidebarVisibilityFromProfile = event => {

    profilebar.hide();
    sidebar.show();
};

// For small devices 
// Show sidebar if Chat is open
const sidebarVisibilityFromChat = event => {

    if (window.innerWidth < 768) {
        chat.hide();
        sidebar.show();
    }
};

// hide unread message indicator if it is found
const hideNewMessageIndicator = event => {

    // Check if message indicator exist
    if (event.currentTarget.children[2].children[2]) {

        messageIndicator.hide(event);
    }
}

// Change background color if user clicks one of the whatsapp contact (li)
const changeListColor = event => {

    // Turn all contacts to white color to remove previous clickED color #d8d8d8 
    Array.from(accessDOM().chats).forEach(x => x.style.background = '#fff');

    // then set color #d8d8d8 to clicked contact or group
    event.currentTarget.style.background = '#d8d8d8';
};

// Assign bootstrap classes such as invisible, mt-0 to message container in chat section
const assignBootstrapClass = (index, currentType, previousType, bootClassName) => {

    // if more than one message by same communicating party 
    // remove triangle and decrease margin for second
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

// Typical html for sender 
const senderHTML = (index, currentType, previousType, text, time, seen) => {

    return `<div class="d-flex justify-content-end">
                     	<div class="self p-1 rounded position-relative ${
                    	assignBootstrapClass(index,currentType,previousType,'mt-0')
                    	}">
                   		<div class="message">${text}</div>
                   		<div class="text-muted position-absolute">${time} <img src="${seen?'./resources/img/seen.png':'./resources/img/unseen.png'}" alt="message status" width="16" height="16"></div></div>
                   		<div class="triangle-right ${
                   			assignBootstrapClass(index,currentType,previousType,'invisible')
                    	}"></div></div>`;
};

// Typical html of receiver
const receiverHTML = (index, currentType, previousType, text, time) => {

    return `<div class = "d-flex" >
                	  <div class = "triangle-left ${
                    	assignBootstrapClass(index,currentType,previousType,'invisible')
                    	}"></div><div class = "other bg-white p-1 rounded position-relative ${
                    	assignBootstrapClass(index,currentType,previousType,'mt-0')
                    	}">
                	    <div class = "message" >${text}</div> 
                	    <div class = 'text-muted position-absolute'>${time}</div></div></div>`;
};

// Date header for messages 
const messageDateHTML = date => {

    return `<div class="d-flex justify-content-center sticky-top">
            <div class="date rounded my-2 px-2 py-1 text-center text-dark">${date}</div></div>`;
};

// Generate HTML for messages of particular date
const singleDateMessages = singleDate => {

    // Show date header
    accessDOM().chatSection.insertAdjacentHTML('beforeend', messageDateHTML(singleDate.date));

    // Loop through messages
    for (let m in singleDate.message) {

        // Check if message is by sender or receiver
        if (singleDate.message[m].type === 'self') { // sender

            // Join the HTML in the end
            accessDOM().chatSection.insertAdjacentHTML('beforeend',
                senderHTML(m,
                    singleDate.message[m].type,
                    m > 0 ? singleDate.message[m - 1].type : undefined,
                    singleDate.message[m].text,
                    singleDate.message[m].time,
                    singleDate.message[m].seen
                ));
        } else if (singleDate.message[m].type === 'other') { // receiver

            // Join the HTML in the end
            accessDOM().chatSection.insertAdjacentHTML('beforeend',
                receiverHTML(m,
                    singleDate.message[m].type,
                    m > 0 ? singleDate.message[m - 1].type : undefined,
                    singleDate.message[m].text,
                    singleDate.message[m].time
                ));
        }
    }
};

// Loop through each date and generate html for communication with particular contact
const loadChat = userOrGrp => {

    // Check if messsages are there for particular contact or group
    if (userOrGrp.messages) {

        // Clear the html of chat section 
        accessDOM().chatSection.innerHTML = '';

        // Append new Html by looping throung each date 
        for (let singleDate of userOrGrp.messages) {

            singleDateMessages(singleDate);
        }
    }
};

// Change name, profile pic and detail in the chat header 
const initializeChatDOM = userOrGrp => {

    // profile pic
    accessDOM().chatWindowPhoto.src = userOrGrp.profilePicUrl;

    // alt
    accessDOM().chatWindowPhoto.alt = userOrGrp.name;

    //	name
    accessDOM().chatWindowName.innerText = userOrGrp.name;

    if (userOrGrp.lastSeen) { // last seen detail if single contact

        accessDOM().details.innerText = `Last Seen on ${userOrGrp.lastSeen}`;

    } else if (userOrGrp.members) { // members name if group

        // map and reduce contact name or contact into single string
        accessDOM().details.innerText = userOrGrp.members
            .map(x => x.inUserContact ? x.name : x.contactNumber)
            .reduce((x, y) => `${x}, ${y}`);
    }

    // Generate HTML Of chat inside chat-section
    loadChat(userOrGrp);
};

// When user clicks contact or group
const userClicksChat = event => {

    // hide message indicator if found
    hideNewMessageIndicator(event);

    // if device is mobile hide the sidebar and show chat section
    if (window.innerWidth < 768) {

        sidebar.hide();
        chat.show();
    }

    // Two types of communication onetoone or group
    // event.currentTarget.getAttribute('data-type') gets the type of communication
    // loop through that particular type
    for (let userOrGrp of whatsappData.communication[event.currentTarget.getAttribute('data-type')]) {

        // Check if name matches with the name of contact or group stored in Whatsappdata store
        if (userOrGrp.name === event.currentTarget.getAttribute('data-name')) {

            // Change its bg color
            changeListColor(event);

            // display chat section
            initializeChatDOM(userOrGrp);

            break; // come out of the loop
        }
    }
    event.stopPropagation(); // Stop event bubbling
};


// listener for window resize event
const windowResizes = () => {

    // window width if greater than 768  
    if (window.innerWidth >= 768) {

        // show sidebar if its not visible
        if (accessDOM().sidebar.classList.contains('d-none')) {
            if (accessDOM().profilebar.classList.contains('d-none')) {

                sidebar.show();
            }
        }
        // show chat section
        chat.show();

        // window width less than 768 hide chat section when resized 
    } else if (window.innerWidth < 768) {

        // hide if sidebar or profile bar are visible 
        if (accessDOM().sidebar.classList.contains('d-block') || accessDOM().profilebar.classList.contains('d-block')) {

            chat.hide();
        }
    }
};

// Initialize all UI events
const initializeUIEvents = () => {

    // show profile bar if profile pic is clicked in sidebar
    accessDOM().smallProfilePic.onclick = profilebarVisibility;

    // show sidebar if back is clicked in profile bar
    accessDOM().backFromProfile.onclick = sidebarVisibilityFromProfile;

    // show sidebar if back is clicked in chat section
    accessDOM().backFromChat.onclick = sidebarVisibilityFromChat;

    // Responsiveness if window is resized
    window.addEventListener("resize", windowResizes);

    // assign click event listener for each contact or group
    for (let chat in accessDOM().chats) {

        accessDOM().chats[chat].onclick = userClicksChat;
    }
};

// assign profile data
const initializeProfileData = () => {

    // profile pic in profile bar
    accessDOM().largeProfilePic.src = whatsappData.userData.profilePicUrl;

    // profile pic in side bar
    accessDOM().smallProfilePic.src = whatsappData.userData.profilePicUrl;

    // display name in profile bar
    accessDOM().displayName.value = whatsappData.userData.name;

    // about in profile bar
    accessDOM().about.value = whatsappData.userData.about;
};

(() => {

    initializeUIEvents();

    initializeProfileData();

    // show first contact chat
    initializeChatDOM(whatsappData.communication.oneToOne[0]);

    // window width less than 768 hide chat
    if (window.innerWidth < 768) {

        chat.hide();
    }
})();