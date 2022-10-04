// =============================================================
// HTML render
// =============================================================
export  { dom__render_json, dom__remove_uls };

const dom__render_json = (jsonList) => {
    for ( const jsonObj of jsonList ) {
        const newUl = document.createElement('ul');
        newUl.setAttribute('class', 'new-ul');

        for ( const key of Reflect.ownKeys(jsonObj) ) {
            const newLi = document.createElement('li');
            newLi.textContent = jsonObj[key];
            newLi.setAttribute('class', 'new-li');
            newUl.appendChild(newLi);
        }

        document.body.appendChild(newUl);
    }
}

const dom__remove_uls = () => {
    const uls = document.querySelectorAll('ul.new-ul');
    for ( let i = 0; i < uls.length; i++ ) {
        const ul = uls[i];
        document.body.removeChild(ul);
    }
}
