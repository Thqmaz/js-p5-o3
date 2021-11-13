function removeDuplicatesObjectsArray(array, prop) {
    return array.filter((element, index, array) => array.findIndex(item => (item[prop] === element[prop])) === index);
}

function removeDuplicatesArray(array) {
    return [...new Set(array)];
}

function requireExistence(array, prop, value) {
    return array.filter(item => item[prop] === value);
}

function capitalize(str) {
    return str.substr(0, 1).toUpperCase() + str.substr(1, str.length).toLowerCase();
}

export { removeDuplicatesObjectsArray, removeDuplicatesArray, requireExistence, capitalize };