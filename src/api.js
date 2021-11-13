import apiaudio from "apiaudio";
import { removeDuplicatesArray, removeDuplicatesObjectsArray, requireExistence } from "./functions";

const api_key = process.env.API_KEY;
const url = 'https://v1.api.audio/voice';
const options = { method: 'GET', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } };

// get array with all data from API, unfiltered, 256 objects
const getData = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
    return result;
}

// get array with all languages, remove duplicates
const getLanguages = async (data) => {
    const raw = data['voices'];
    const languages = raw.map((item) => item.language);

    const unique = removeDuplicatesArray(languages);

    return unique;
}

// get array with all accents, remove duplicates
const getAccents = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'accent').map((data) => data.accent))
        .catch(err => console.error(err));
    return result;
}

// get array with accents for a specific language, remove duplicates
const getAccentsForLanguage = async (language) => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(requireExistence(response['voices'], 'language', language), 'accent').map((data) => data.accent))
        .catch(err => console.error(err));
    return result;
}

// get array with all genders
const getGenders = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'gender').map((data) => data.gender))
        .catch(err => console.error(err));
    return result;
}

// get array with all ages
const getAgeBrackets = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'ageBracket').map((data) => data.ageBracket))
        .catch(err => console.error(err));
    return result;
}

// get array with all names
const getName = async () => {
    const result = fetch(url, options)
        .then(response => response.json())
        .then(response => removeDuplicates(response['voices'], 'ageBracket').map((data) => data.ageBracket))
        .catch(err => console.error(err));
    return result;
}

export { getData, getLanguages, getAccents, getAccentsForLanguage, getGenders, getAgeBrackets, getName };