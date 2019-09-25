const createLexer = require('./lexer')

/**
 * expressions:
 * 39
 * "hello"
 * >(3, 7)
 * define(x, 5)
 * define(y, +(x, 27))
 * 
 * 
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
            operation: token,
            arguments: expressionStr.substr(token+1, expressionStr.length).split(',').map(parseExpression)
        }
    }
}

module.exports = parseExpression
