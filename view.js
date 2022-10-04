export {
    uiInit,
    uiMenuUp,
    uiMenuDown,
    uiMenuEnter,
    uiUpdateMessage,
    uiUpdateMessageTimed,
    uiUpdateMessage2
}

let inner_container,
    menuItems,
    menuIndex,
    ui_message,
    ui_message2,
    ui_message_backup,
    timeout;

const uiInit = () => {
    inner_container = document.querySelector("#inner_container");
    ui_message  = document.querySelector("#ui_message");
    ui_message2 = document.querySelector("#ui_message2");
    menuItems = new Map();
    menuIndex = 0;
    timeout = null;
    indexMenuItems();
    menuItemAddHighLight(0);
}

const indexMenuItems = () => {
    let i = 0;
    for ( let child of inner_container.children ) {
        if ( child.nodeName === "A") {
            menuItems.set(i, child);
            i++;
        }
    }
}

const menuItemAddHighLight = (index) => {
    const item = menuItems.get(index)
    item.className = "highlighted";
    item.textContent = "*" + String(item.textContent);
}

const menuItemRemoveHighLight = (index) => {
    const item = menuItems.get(index);
    item.className = "";
    item.textContent = item.textContent.substring(1);
}

const uiMenuUp = () => {
    if ( menuIndex > 0 ) {
        menuItemRemoveHighLight(menuIndex);
        menuIndex = menuIndex - 1;
        menuItemAddHighLight(menuIndex);
    }
}

const uiMenuDown = () => {
    if ( menuIndex < menuItems.size - 1 ) {
        menuItemRemoveHighLight(menuIndex);
        menuIndex = menuIndex + 1;
        menuItemAddHighLight(menuIndex);
    }
}

const uiMenuEnter = () => {
    window.location.href = menuItems.get(menuIndex).attributes["href"].value;
}

const uiUpdateMessage = (msg) => {
    // update the backup string, if there is a timer going on
    if ( timeout !== null ) {
        ui_message_backup = msg;

    // if there is no timer going on, ui is free to be updated
    } else {
        ui_message.innerText = msg;
    }
}

const uiUpdateMessageTimed = (msg) => {
    // a timer is going do not back up the ui_message
    if ( timeout === null ) {
        ui_message_backup = ui_message.innerText;
    } else {
        clearTimeout(timeout);
    }

    ui_message.innerText = msg;
    timeout = setTimeout(() => {
        ui_message.innerText = ui_message_backup;
        timeout = null;
    }, 2500);
}

const uiUpdateMessage2 = (msg) => {
    ui_message2.innerText = msg;
}