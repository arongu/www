export { generateHtmlRow, generateHtmlTable }

const generateHtmlRow = (key, value) => {
    const row = document.createElement("tr");
    const column_left = document.createElement("td");
    const colum_right = document.createElement("td");

    column_left.innerText = key;
    colum_right.innerText = value;

    row.appendChild(column_left);
    row.appendChild(colum_right);

    return row;
}

const generateHtmlTable = (object, keys) => {
    const table = document.createElement("table");

    for ( let key of keys ) {
        table.appendChild(generateHtmlRow(key, object[key]));
    }

    return table;
}
