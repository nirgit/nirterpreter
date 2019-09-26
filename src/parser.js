const {isNumber, isString} = require('./utils')
const createLexer = require('./lexer')

const isDefine = token => token === 'define'


const createNumberType = number => ({type: 'value', value: number})
const createStringType = str => ({type: 'value', value: str})
const createDefineType = (varName, parsedExp) => ({type: 'word', name: varName, value: parsedExp})


/**
 * expressions:
 * 39
 * "hello"
 * >(3, 7)
 * define(x, 5)
 * define(y, +(x, 27))
 * 
 * 
 * @param {*} expressionStr 
 */
function parseExpression(expressionStr) {
    const lexer = createLexer(expressionStr)
    while (!lexer.eof()) {
        const token = lexer.getNextToken()
        if (isNumber(token)) {
            return createNumberType(token)
        }
        if (isString(token)) {
            return createStringType(token)
        }
        if (isDefine(token)) {
            return createDefineType(lexer.getNextToken(), parseExpression(lexer.getRestInScope()))
        }

        return {
            type: 'apply',
            operator: {type: 'word', name: token},
            args: expressionStr.substr(token.length+1, expressionStr.length).split(',').map(parseExpression)
        }
    }
}

module.exports = parseExpression
