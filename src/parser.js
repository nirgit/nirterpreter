const {isNumber, isString} = require('./utils')
const createLexer = require('./lexer')

const isDefine = token => token === 'define'
const isOperator = (token, expressionStr) => expressionStr[token.length] === '('
const isVariable = (token, expressionStr) => expressionStr.substr(token.length).trim() === ''

const createNumberType = number => ({type: 'value', value: number})
const createStringType = str => ({type: 'value', value: str})
const createDefineType = (varName, parsedExp) => ({type: 'word', name: varName, value: parsedExp})
const createVarType = varName => ({type: 'word', name: varName})

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
        if (isOperator(token, expressionStr)) {
            return {
                type: 'apply',
                operator: {type: 'word', name: token},
                args: expressionStr.substr(token.length + 1, expressionStr.length).split(',').map(parseExpression)
            }
        }
        if (isVariable(token, expressionStr)) {
            return createVarType(token)
        }
        throw new Error('Syntax error: ' + token + '\n at:' + expressionStr)
    }
}

module.exports = parseExpression
