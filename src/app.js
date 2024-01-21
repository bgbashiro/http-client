import { parseArguments } from "./cmdparser.js";

const args = parseArguments(process.argv.slice(2))
console.log(args)
