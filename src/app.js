import { parseArguments } from "./cmdparser.js";
import { handleRequest } from "./requesthandler.js";

const request = parseArguments(process.argv.slice(2))
let result = await handleRequest(request)

console.log(`Status: ${result.status}`)
console.log('\nContent:\n')
console.log(result.content)
