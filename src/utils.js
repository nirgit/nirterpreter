const isNumber = char => !Number.isNaN(Number(char))
const isQuotes = char => char === '"'
const isString = str => str && typeof str === 'string' && str[0] === '"'

module.exports = {
    isNumber,
    isQuotes,
    isString
}
