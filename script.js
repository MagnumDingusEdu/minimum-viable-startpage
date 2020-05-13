const NAME = "Vividh";
const WELCOME_MESSAGE_TEMPLATE = ["night", "morning", "afternoon", "evening"];

// All shortcuts are in a `SHORTCUT_STARTER+shortcutKey` format. 
// So, for example, pressing `tab+q` would redirect you to https://google.com/?q=q
const SHORTCUT_STARTER = 'shift'

// How much time (in milliseconds) you have to press shortcutKey after pressing SHORTCUT_STARTER.
// Also change --SHORTCUT_TIMEOUT in styles.css if you change this option.
const SHORTCUT_TIMEOUT = 10000;

// The groups of links are generated from this object. Edit it to edit the page's contents.
// shortcutKey must hold an all-lowercase single button. Theoretically should work with values like `esc` and `f1`,
// but intended to be used with just regular latin letters.
const MASTER_MAP = [{
        "groupName": "Development",
        "items": [
            { "name": "Github", "shortcutKey": "g", "url": "https://github.com/MagnumDingusEdu" },
            { "name": "DigitalOcean", "shortcutKey": "d", "url": "https://cloud.digitalocean.com/login" },
            { "name": "Google Analytics", "shortcutKey": "z", "url": "https://analytics.google.com/analytics/web/#/p230033160/reports/home?params=_u..nav%3Dga1-experimental" },
            { "name": "Firebase Console", "shortcutKey": "f", "url": "https://console.firebase.google.com/u/0/project/iqinstitute-388d9/overview" },
            { "name": "G Cloud Console", "shortcutKey": "c", "url": "https://console.cloud.google.com/compute/instances?authuser=1&folder=&organizationId=&project=compact-record-267216&instancessize=50" }
        ]
    },
    {
        "groupName": "Entertainment",
        "items": [
            { "name": "Youtube", "shortcutKey": "y", "url": "https://www.youtube.com/" },
            { "name": "Reddit", "shortcutKey": "r", "url": "https://reddit.com/r/popular" },
            { "name": "Spotify", "shortcutKey": "s", "url": "https://open.spotify.com/" },
            { "name": "Amazon", "shortcutKey": "a", "url": "https://amazon.in" },
            { "name": "Typing Test", "shortcutKey": "t", "url": "https://10fastfingers.com/typing-test/english" },

        ]
    },
    {
        "groupName": "Personal",
        "items": [
            { "name": "PiHole", "shortcutKey": "p", "url": "https://pihole.magnum.wtf" },
            { "name": "Cockpit", "shortcutKey": "k", "url": "https://cockpit.magnum.wtf" },
            { "name": "Speedtest", "shortcutKey": "e", "url": "https://fast.com" },
            { "name": "Google Drive", "shortcutKey": "v", "url": "https://drive.google.com" },
            { "name": "Connection Stats", "shortcutKey": "i", "url": "https://ifconfig.me" }


        ]
    }
]

let $container = document.getElementById("content");
let getUrl = {};

let $shortcutDisplayList = document.getElementsByClassName("shortcut");
let listeningForShortcut = false;
let listenerTimeout;

function setupWelcomeMessage() {
    let curHours = new Date().getHours();
    curHours = Math.floor(curHours / 6); // Simply dividing current hours by 6 proves to be a good enough aproximation.
    if (curHours == 4) curHours = 3;
    let welcome = "Good " + WELCOME_MESSAGE_TEMPLATE[curHours] + ", " + NAME;
    document.getElementById("welcome-string").innerHTML = welcome;
}

function setupGroups() {
    for (let i = 0; i < MASTER_MAP.length; i++) {
        let curGroupData = MASTER_MAP[i];

        let group = document.createElement("div");
        group.className = "group";
        $container.appendChild(group);

        let header = document.createElement("h1");
        header.innerHTML = curGroupData.groupName;
        group.appendChild(header);

        for (let j = 0; j < curGroupData.items.length; j++) {
            let curItemData = curGroupData.items[j];

            let pContainer = document.createElement("p");
            group.appendChild(pContainer);

            let link = document.createElement("a");
            link.innerHTML = curItemData.name;
            link.setAttribute("href", curItemData.url);
            pContainer.appendChild(link);

            let shortcutDisplay = document.createElement("span");
            shortcutDisplay.innerHTML = curItemData.shortcutKey;
            shortcutDisplay.className = "shortcut";
            shortcutDisplay.style.animation = "none";
            pContainer.appendChild(shortcutDisplay);

            getUrl[curItemData.shortcutKey] = curItemData.url
        }
    }
}

function shortcutListener(e) {
    let key = e.key.toLowerCase();

    if (listeningForShortcut && getUrl.hasOwnProperty(key)) {
        window.location = getUrl[key];
    }

    if (key === SHORTCUT_STARTER) {
        clearTimeout(listenerTimeout);
        listeningForShortcut = true;

        // Animation reset
        for (let i = 0; i < $shortcutDisplayList.length; i++) {
            $shortcutDisplayList[i].style.animation = "none";
            setTimeout(function() { $shortcutDisplayList[i].style.animation = ''; }, 10);
        }

        listenerTimeout = setTimeout(function() { listeningForShortcut = false; }, SHORTCUT_TIMEOUT);
    }
}

function main() {
    setupWelcomeMessage();
    setupGroups();
    document.addEventListener('keyup', shortcutListener, false);
}

main();