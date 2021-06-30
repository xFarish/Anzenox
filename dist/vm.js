import { parse } from './utils/args.js';
async function main() {
    console.log(parse(process.argv.slice(2)));
}
main();
