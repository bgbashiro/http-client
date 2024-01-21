import minimist from 'minimist'
import RJSON from 'relaxed-json'

const validMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

function validateMethod(method) {
    if (!validMethods.includes(method)) {
        throw Error(`${method} is not a HTTP method`)
    }
}

function parseJSONArgument(argString) {
    if ((argString[0] == "{") && (argString[argString.length - 1] == "}")) {
        return RJSON.parse(argString)
    } else {
        return RJSON.parse("{" + argString + "}")
    }
}

function parseArguments(s) {
    const args = minimist(s, {
        alias: {
            'h': 'header',
            'b': 'body'
        }
    })

    const method = args["_"][0]
    validateMethod(method)

    const url = args["_"][1]

    const header = args['header'] ? parseJSONArgument(args['header']) : null
    const body = args['body'] ? parseJSONArgument(args['body']) : null

    return {
        method,
        url,
        header,
        body
    }
}

export { parseArguments };

