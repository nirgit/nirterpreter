const {isNumber, isString} = require('./utils')
const createLexer = require('./lexer')

const isOperator = lexer => lexer.peek() === '('
const isVariable = (token, expressionStr) => expressionStr.trim() === token

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
        if (isOperator(lexer)) {
            const argsStr = lexer.getRestInScope()
            const opArgs = []
            let argToken = ''
            let argPos = 0
            let depth = 0
            // console.log(`processing argsStr: "${argsStr}"`)
            while (argPos < argsStr.length) {
                if (argsStr[argPos] === ',' && depth === 0) {
                    opArgs.push(argToken)
                    argToken = ''
                    argPos++
                    continue
                } else if (argsStr[argPos] === '(') {
                    depth++
                } else if (argsStr[argPos] === ')') {
                    depth--
                    if (depth < 0) {
                        throw new SyntaxError('too many closing parenthesis')
                    }
                }
                argToken = argToken + argsStr[argPos]
                argPos++
            }
            if (argToken !== '') {
                opArgs.push(argToken)
            }
            if (depth > 0) {
                throw new SyntaxError('unclosing parenthesis')
            }
            return {
                type: 'apply',
                operator: {
                    type: 'word', 
                    name: token
                },
                args: opArgs.map(parseExpression)
            }
        }
        if (isVariable(token, expressionStr)) {
            return createVarType(token)
        }
        throw new Error('Syntax error: ' + token + '\n at:' + expressionStr)
    }
}

module.exports = parseExpression
