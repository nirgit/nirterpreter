const createLexer = require('../src/lexer')

describe('Lexer', () => {
    const expression = "+(a, 10)"

    it(`should return the tokens one at a time for the expression "${expression}"`, () => {
        const lexer = createLexer(expression)
        const tokens = []
        while (!lexer.eof()) {
            tokens.push(lexer.getNextToken())
        }
        expect(tokens).toEqual(['+', 'a', '10'])
    })
})

