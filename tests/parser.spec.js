const parser = require('../src/parser')

describe('parser', () => {
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

    it('should parse a simple operator expression with simple arguments', () => {
        const expression = '>(3, 7)'
        const syntaxTree = parser(expression)

        expect(syntaxTree).toEqual({
            type: 'apply',
            operator: {type: 'word', name: '>'},
            args: [
                {type: 'value', value: 3},
                {type: 'value', value: 7}
            ]
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