const parse = require('./parser')

const ifOpeartor = function(ast, env) {
    const predicate = ast.args[0]
    const thenStmt = ast.args[1]
    if (evaluateAST(predicate, env)) {
        return evaluateAST(thenStmt)
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






const languageOperations = {}

languageOperations["if"] = ifOpeartor
languageOperations["do"] = doOperation






function evaluate(input) {
    const ast = parse(input)
    return evaluateAST(ast)
}

function evaluateAST(ast, env = []) {
    if (!ast) return
    if (ast.type === 'value') {
        if (typeof ast.value === 'string') {
            return ast.value.substring(1, ast.value.length - 1)
        }
        return ast.value
    }
    if (ast.type === 'word') {
        for (let i=env.length - 1; i >= 0; i--) {
            if (env[i][ast.name] !== undefined) {
                return env[i][ast.name]
            }
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
            return ast.args[0].value > ast.args[1].value
        }
        case '<': {
            return ast.args[0].value < ast.args[1].value
        }
        default: {
            break;
        }
    }
    if (languageOperations[func]) {
        return languageOperations[func](ast, env)
    }
    return null
}


module.exports = evaluate
