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

    it('should parse a simple variable binding expression', () => {
        const expression = 'x'
        const syntaxTree = parser(expression)

        expect(syntaxTree).toEqual({
            type: 'word',
            name: 'x'
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

    it('should parse an operator expression with expression arguments', () => {
        const expression = 'foo(a, 8)'
        const syntaxTree = parser(expression)

        expect(syntaxTree).toEqual({
            type: 'apply',
            operator: {type: 'word', name: 'foo'},
            args: [
                {type: 'word', name: 'a'},
                {type: 'value', value: 8}
            ]
        })
    })

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

    it('should pass', () => {
        const expression = '>(x, y)'
        debugger
        const syntaxTree = parser(expression)
        expect(syntaxTree).toEqual({
            type: 'apply',
            operator: {type: 'word', name: '>'},
            args: [
                {type: 'word', name: 'x'},
                {type: 'word', name: 'y'}
            ]
        })
    })

    it('should parse the little program', () => {
        const expression = `
            do(
                define(x, 5), 
                define(y, 18),
                while(>(x, y2), do(
                    print(x),
                    define(x, +(x, 1))
                )),
                if(>(x, 2), do(
                    print("hurray")
                ))
            )
        `
        const syntaxTree = parser(expression)

        // console.log(JSON.stringify(syntaxTree, null, 4))
    })
})