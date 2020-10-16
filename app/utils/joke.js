
var fetch = require('node-fetch')

const getJoke = async () => {
    url = "https://official-joke-api.appspot.com/jokes/random"
    return fetch(url)
        .then(res => res.json())
}

module.exports = { getJoke }