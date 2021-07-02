import { fore } from './color.js';

export function error(err: string, msg: string): void {
    return console.log(`[${fore.red}Error${fore.reset}]: ${err}: ${msg}`);
}