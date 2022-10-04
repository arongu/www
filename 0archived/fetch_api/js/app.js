// ! never forget th .js extension or MIME TYPE will be blocked
import { dom__render_json , dom__remove_uls } from './dom.js';
import { httpHandler, jsonHandler } from './json.js';

// =============================================================
// BUSINESS LOGIC
// =============================================================
const onSuccess = (jsonData) => {
    dom__render_json(jsonData);
}

const onError = (error) => {
    console.error('error', error);
}


const buttonOne = document.getElementById('one');
const buttonTwo = document.getElementById('two');

buttonOne.addEventListener('click', () => {
    fetch('fetch.txt')
        .then(response => httpHandler(response))
        .then(response => jsonHandler(response, onSuccess, onError))
        .catch(error => console.error(error))
});

buttonTwo.addEventListener('click', dom__remove_uls);
