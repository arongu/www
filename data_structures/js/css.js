// script to load the proper css file, so everything can be tweaked for each browser
const chrome  = "chrome";
const firefox = "firefox";
const other   = "other";

const css_chrome  = "chrome.css";
const css_firefox = "firefox.css";

const getAgent = () => {
    const agent = navigator.userAgent.toString().toLowerCase();
    if ( agent.includes(firefox)) return firefox;
    if ( agent.includes(chrome)) return chrome;
    return other;
}

const selectCSS = () => {
    const stylesheet = document.querySelector("#stylesheet");
    const agent = getAgent();
    stylesheet.href = agent === chrome ? css_chrome : css_firefox;
}

selectCSS();