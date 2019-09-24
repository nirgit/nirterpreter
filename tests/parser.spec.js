const parser = require('../src/parser')

describe('parser', () => {
    it('should parse the simple expression', () => {
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