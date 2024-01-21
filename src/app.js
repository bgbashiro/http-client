import { parseArguments } from "./cmdparser.js";

const args = await parseArguments(process.argv.slice(2))
console.log(args)
