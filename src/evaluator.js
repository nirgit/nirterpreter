const parse = require('./parser')

const ifOpeartor = function(ast, env) {
    const predicate = ast.args[0]
    const thenStmt = ast.args[1]
    if (evaluateAST(predicate, env)) {
        return evaluateAST(thenStmt, env)
    }
    return undefined
}

const doOperation = function(ast, env) {
    const statements = ast.args
    let i = 0
    for (; i < statements.length - 1; i++) {
        evaluateAST(statements[i], env)
    }
    return evaluateAST(statements[i], env)
}

const defineOperation = function(ast, env) {
    const varToken = ast.args[0]
    const varValue = evaluateAST(ast.args[1], env)
    env[varToken.name] = varValue
}

const whileOperation = function(ast, env) {
    const whilePred = ast.args[0]
    const whileBody = ast.args[1]

    while (evaluateAST(whilePred, env)) {
        evaluateAST(whileBody, env)
    }
}

const printOperation = function(ast, env) {
    console.log(evaluateAST(ast.args[0], env))
}


const languageOperations = {}

languageOperations["if"] = ifOpeartor
languageOperations["do"] = doOperation
languageOperations["define"] = defineOperation
languageOperations["while"] = whileOperation
languageOperations["print"] = printOperation






function evaluate(input) {
    const ast = parse(input)
    return evaluateAST(ast)
}

function evaluateAST(ast, env = {}) {
    if (!ast) return
    if (ast.type === 'value') {
        if (typeof ast.value === 'string') {
            return ast.value.substring(1, ast.value.length - 1)
        }
        return ast.value
    }
    if (ast.type === 'word') {
        if (env[ast.name] !== undefined) {
            return env[ast.name]
        }
        return undefined
    }
    if (ast.type === 'apply') {
        return evaluateApply(ast, env)
    }
    throw new Error('Syntax error for: ', input)
}

function evaluateApply(ast, env) {
    if (!ast) return
    const func = ast.operator.name
    switch (func) {
        case '>': {
            const left = evaluateAST(ast.args[0], env)
            const right = evaluateAST(ast.args[1], env)
            return left > right
        }
        case '<': {
            const left = evaluateAST(ast.args[0], env)
            const right = evaluateAST(ast.args[1], env)
            return left < right
        }
        case '+': {
            const varToken = ast.args[0]
            const varValue = evaluateAST(varToken, env)
            const incValue = evaluateAST(ast.args[1], env)
            return varValue + incValue
        }
        default: {
            break;
        }
    }
    if (languageOperations[func]) {
        return languageOperations[func](ast, env)
    }
    throw new Error(`"${func}" is not defined`)
}


module.exports = evaluate
