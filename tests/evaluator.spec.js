const evaluate = require('../src/evaluator')

describe('evaluator', () => {
    it('should evaluate a simple number expression', () => {
        const expression = '13'
        const result = evaluate(expression)

        expect(result).toEqual(13)
    })

    it('should evaluate a simple string expression', () => {
        const expression = '"Hello Birrr"'
        const result = evaluate(expression)

        expect(result).toEqual("Hello Birrr")
    })

    it('should evaluate a simple variable binding expression', () => {
        const expression = 'x'
        const result = evaluate(expression)

        expect(result).toEqual(undefined)
    })

    it('should evaluate a simple operator expression with simple arguments', () => {
        const expression = '>(3, 7)'
        const result = evaluate(expression)

        expect(result).toEqual(false)

        const expression2 = '<(9, 27)'
        const result2 = evaluate(expression2)

        expect(result2).toEqual(true)
    })

    it('should evaluate an "if" statement', () => {
        const expression = 'if(>(3, 2), do("yes"))'

        expect(evaluate(expression)).toEqual("yes")
    })
})