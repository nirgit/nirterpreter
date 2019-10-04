const style = require('ansi-styles');
const readline = require('readline');
const evaluate = require('./evaluator')

const REPL_PROMPT = `${style.green.open}repl > ${style.green.close}`

function runREPL() {
    console.log('*'.repeat(10) + ' Nirterpreter REPL ' + '*'.repeat(10))
    console.log('\n\n')

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    promptForUserInput(rl)
}

function promptForUserInput(rl) {
    rl.question(REPL_PROMPT, expression => {
        const result = evaluate(expression)
        console.log(result)
        promptForUserInput(rl)
    })
}


runREPL()
