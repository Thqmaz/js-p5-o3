import "./style.scss";
import * as data from './data.json';

import { capitalize } from "./functions";
import { getData, getLanguages, getAccents, getAccentsForLanguage, getGenders, getAgeBrackets } from "./api";

let blocked;

//let data;
let languages;
let accents;
let genders;
let ages;


window.addEventListener('load', async () => {
    blocked = false;

    createForm();

    //data = await getData();
    // if (data.length > 0) {
    //     data.forEach((object) => {
    //         if (object.alias === '' || object.alias === undefined) {
    //             object.alias = object.voiceName.split('_')[1].toLowerCase();    // if no alias exists, take a slice from the voicename
    //         }

    //         //const warning = object.alias === '' || object.voiceName === '' || object.alias === undefined || object.voiceName === undefined ? 'WARNING' : '';
    //         //const warning = object.alias === 'omazh' || object.alias === 'zahar' ? 'WARNING' : '';
    //         //console.log(`${warning}   alias: ${object.alias}   voicename: ${object.voiceName}`);
    //     });
    // }

    //console.log(data);

    // let test = fetch(data)
    //     .then(res => console.log(res));

    //console.log(test);

    languages = await getLanguages(data);
    console.log(languages);


    if (languages.length > 0) {
        populate('language', languages);
    }

    accents = await getAccents();
    if (accents.length > 0) {
        populate('accent', accents);
    }

    genders = await getGenders();
    if (genders.length > 0) {
        populate('gender', genders);
    }

    ages = await getAgeBrackets();
    if (ages.length > 0) {
        populate('age', ages);
    }
});

function populate(id, data, selected = null) {
    const combobox = document.getElementById(id);
    const event = new CustomEvent('populate', { detail: { data: data, selected: selected } });
    combobox.dispatchEvent(event);
}

function unpopulate(id) {
    const combobox = document.getElementById(id);
    const event = new CustomEvent('unpopulate');
    combobox.dispatchEvent(event);
}

function createForm() {
    const form = document.createElement('form');
    const h1 = document.createElement('h1');
    const textarea = document.createElement('textarea');

    form.setAttribute('action', '');
    form.setAttribute('method', 'post');
    form.setAttribute('id', 'myform');

    h1.innerHTML = 'Text-to-speech API';

    textarea.setAttribute('id', 'textarea');
    textarea.setAttribute('placeholder', 'Add text here');

    form.appendChild(h1);
    form.appendChild(createComboBox('language'));
    form.appendChild(createComboBox('accent'));
    form.appendChild(createComboBox('gender'));
    form.appendChild(createComboBox('age'));
    form.appendChild(createComboBox('name'));
    form.appendChild(textarea);
    form.appendChild(createButton('send'));

    document.getElementById('container').appendChild(form);
}

function createButton(id) {
    const button = document.createElement('button');
    switch (id) {
        case 'send':
            button.setAttribute('id', id);
            button.innerHTML = capitalize(id);
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const textarea = document.getElementById('textarea');
                const text = textarea.value.trim();
                textarea.value = '';
                if (!blocked) {
                    console.log('start');
                    //const wav = await getTextConvertedToWav(text);
                    console.log('stop');
                }
            });
            break;
    }
    return button;
}

function createComboBox(id) {
    const div = document.createElement('div');
    const label = document.createElement('label');
    const select = document.createElement('select');
    const option = document.createElement('option');

    label.setAttribute('for', id);
    label.innerHTML = capitalize(id);

    option.setAttribute('value', '');
    option.setAttribute('selected', 'selected');
    option.innerHTML = 'Choose ' + id.toLowerCase();

    select.setAttribute('id', id);
    select.appendChild(option);

    select.addEventListener('mousedown', () => {
        select.style.backgroundColor = null;
        console.log('mousedown');
    });

    select.addEventListener('populate', (event) => {
        const values = event.detail.data;
        const selected = event.detail.selected;
        values.forEach((value) => {
            if (value !== undefined && value !== '') {
                const option = document.createElement('option');
                option.setAttribute('value', value);
                option.innerHTML = capitalize(value);
                select.appendChild(option);
            }
        });
        select.selectedIndex = selected !== null ? selected : select.selectedIndex;
    });

    select.addEventListener('unpopulate', (event) => {
        const options = Array.from(select.options);
        options.shift();
        options.forEach((option) => {
            option.parentNode.removeChild(option);
        });
    });

    select.addEventListener('change', async (event) => {
        const index = select.selectedIndex;
        const value = select.options[index].value;
        console.log(index, value);

        switch (id) {
            case 'language':
                if (index === 0) {
                    console.log('language deselected');
                } else {
                    console.log('lang: ' + value);
                    unpopulate('accent');               // remove current list of accents
                    //accents = await getAccentsForLanguage(value);  // reload accents for this language only
                    populate('accent', accents, 1);
                }
                break;
            case 'accent':
                if (index === 0) {
                    console.log('accent deselected');
                } else {

                }
                break;
        }

        // select.style.backgroundColor = index === 0 ? '#ffcccc' : select.style.backgroundColor;

        // //console.log('change');
        // switch (id) {
        //     case 'language':
        //         //console.log('lang: ' + value);
        //         filtered.options.language = value;
        //         filtered.result = search(filtered.result);
        //         //setOptions('accent', searchResult, document.getElementById('accent'));
        //         break;
        //     case 'accent':
        //         console.log('accent: ' + value);
        //         filtered.options.accent = value;
        //         filtered.result - search(filtered.result);
        //         break;
        //     case 'gender':
        //         //console.log('gender: ' + value);
        //         filtered.options.gender = value;
        //         break;
        //     case 'age':
        //         //console.log('age: ' + value);
        //         filtered.options.age = value;
        //         break;
        //     case 'name':
        //         //console.log('name: ' + value);
        //         filtered.options.name = value;
        //         break;
        // }
    });

    div.appendChild(label);
    div.appendChild(select);
    return div;
}

//voices = await getDataListVoices();
    // filtered = { options: {}, result: [] };
    // filtered.options = { language: '', accent: '', gender: '', age: '', name: '' };
    // filtered.result = search(voices);
    // updateCombos(search);

// function search(data) {
//     let temp = data.slice(0);

//     temp = document.getElementById('language').selectedIndex !== 0 ? temp.filter(item => item.language === searchOptions.language) : temp;
//     temp = document.getElementById('accent').selectedIndex !== 0 ? temp.filter(item => item.accent === searchOptions.accent) : temp;
//     temp = document.getElementById('gender').selectedIndex !== 0 ? temp.filter(item => item.gender === searchOptions.gender) : temp;
//     temp = document.getElementById('age').selectedIndex !== 0 ? temp.filter(item => item.age === searchOptions.age) : temp;
//     temp = document.getElementById('name').selectedIndex !== 0 ? temp.filter(item => item.name === searchOptions.name) : temp;

//     // console.log('temp');
//     // console.log(temp.length);
//     // console.log(temp);
//     // console.log('');
//     // console.log('data');
//     // console.log(data.length);

//     return temp;
// }

// const playWaveURL = async (url) => {
//     const context = new AudioContext();
//     const source = context.createBufferSource();
//     const audioBuffer = await fetch(url)
//         .then(res => res.arrayBuffer())
//         .then(ArrayBuffer => context.decodeAudioData(ArrayBuffer));
//     source.buffer = audioBuffer;
//     source.connect(context.destination);
//     source.start();
// };

// function updateCombos() {
//     const combos = ['language', 'accent', 'gender', 'age', 'name'];

//     combos.forEach((combo) => {
//         setOptions(combo, filtered, document.getElementById(combo));
//     });
// }

// function setOptions(type, data, select) {
//     let temp = [];
//     let array = [];
//     switch (type) {
//         case 'language':
//             //console.log();    

//             //temp = [...new Map(data.map(item => [item['language'], item])).values()];                           // make unique
//             temp.forEach(function (obj) {                                                                       // loop thrue languages
//                 if (obj.language !== '' && obj.language !== undefined) {                                        // remove empty, undefined
//                     array.push({ label: obj.language, id: obj.language });                // prepare object for select-options
//                 }
//             });
//             break;
//         case 'accent':
//             temp = [...new Map(data.map(item => [item['accent'], item])).values()];     // make unique
//             //console.log(temp);

//             temp.forEach(function (obj) {                                               // loop thrue languages                        
//                 if (obj.accent !== '' && obj.accent !== undefined) {                   // remove empty, neutral, undefined
//                     array.push({ label: capitalize(obj.accent), id: obj.accent.toLowerCase() });                                    // prepare object for select-options
//                 }
//             });
//             break;
//         case 'gender':
//             array.push({ label: 'Female', id: 'female' });
//             array.push({ label: 'Male', id: 'male' });
//             break;
//         case 'age':
//             array.push({ label: 'Child', id: 'child' });
//             array.push({ label: 'Adult', id: 'adult' });
//             array.push({ label: 'Senior', id: 'senior' });
//             break;
//         case 'name':
//             temp = data;
//             temp.forEach(function (obj) {                                               // loop thrue languages                        
//                 //if (obj.voiceName !== '' && obj.voiceName !== undefined) {                   // remove empty, neutral, undefined
//                 array.push({ label: obj.voiceName, id: obj.voiceName.toLowerCase() });                                    // prepare object for select-options
//                 //}
//             });
//             break;
//     }

//     // array.forEach(obj => {
//     //     const option = document.createElement('option');
//     //     option.setAttribute('value', obj.id);
//     //     option.innerHTML = capitalize(obj.label);
//     //     select.appendChild(option);
//     // });

//     select.style.backgroundColor = select.selectedIndex === 0 ? '#ffcccc' : '#e1eec7';

//     // #ffcccc roodachtig
//     // #e1eec7 groenachtig
// }