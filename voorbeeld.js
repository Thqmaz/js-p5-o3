
const init = async () => {
    const data = await getDataFromAPI();
}

const getDataFromAPI = () => {
    const url = 'https://urltomyfavoriteapi.com'

    const result = fetch(url)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));

    return result;
}

init();