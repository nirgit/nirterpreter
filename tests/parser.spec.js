const parser = require('../src/parser')

describe.only('parser', () => {
    it('should parse a simple number expression', () => {
        const expression = '13'
        const syntaxTree = parser(expression)

        expect(syntaxTree).toEqual({
            type: 'value',
            value: 13
        })
    })

    it('should parse a simple string expression', () => {
        const expression = '"Hello Birrr"'
        const syntaxTree = parser(expression)

        expect(syntaxTree).toEqual({
            type: 'value',
            value: '"Hello Birrr"'
        })
    })

    it.skip('should parse the simple expression', () => {
        const expression = "+(a, 10)"
        const syntaxTree = parser(expression)

        const expectedParseTree = {
            type: "apply",
            operator: {type: "word", name: "+"},
            args: [
                {type: "word", name: "a"},
               {type: "value", value: 10}
            ]
        }
        expect(syntaxTree).toEqual(expectedParseTree)
    })
})