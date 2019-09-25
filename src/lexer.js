const {isNumber, isQuotes} = require('./utils')

function createLexer(input) {
    let position = 0

    const eof = () => input.length <= position

    const skipAllWhiteSpaces = () => {
        while (!eof() && input[position] === ' ') {
            position++
        }
    }

    function getNextToken() {
        if (eof()) return null
        skipAllWhiteSpaces()
        let char = input[position++]
        if (isNumber(char)) {
            const token = [char]
            while (!eof() && isNumber(input[position])) {
                token.push(input[position++])
            }
            return parseInt(token.join(''), 10)
        }
        if (isQuotes(char)) {
            const token = ['"']
            while(!eof() && !isQuotes(input[position])) {
                token.push(input[position++])
            }
            token.push('"')
            return token.join('')
        }
        if (char === '(' || char === ',') {
            // return the next argument token
            skipAllWhiteSpaces()
            const token = []
            while (!eof() && input[position] !== ')' && input[position] !== ',') {
                token.push(input[position++])
            }
            if (input[position] === ')') {
                position++
            }
            return token.join('')
        }
        // otherwise it's probably an operation
        const token = [char]
        while (!eof() && input[position] !== '(') {
            token.push(input[position++])
        }
        return token.join('')
    }

    function getRestInScope() {
        // todo
    }

    return {
        eof,
        getNextToken,
        getRestInScope
    }
}

module.exports = createLexer
