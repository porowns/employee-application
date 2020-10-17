
var fetch = require('node-fetch')

const getQuote = async () => {
    url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    return fetch(url)
        .then(res => res.json())
}

module.exports = { getQuote }