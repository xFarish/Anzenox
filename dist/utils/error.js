import { fore } from '../utils/color.js';
export function error(err, msg) {
    return console.log(`[${fore.red}Error: ${err}${fore.reset}]: ${msg}`);
}
