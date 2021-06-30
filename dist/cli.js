import { readFileSync } from 'fs';
import { parse } from './utils/args.js';
export async function main() {
    const cli = parse();
    if (cli.help) {
        const { name, version } = JSON.parse(readFileSync('./package.json', 'utf8'));
        const help = [
            `${name}@${version}`,
            'Syntax:  azc [Command] [Option] [File]',
            'Example: azc exec main.azc',
            '         azc compile --optimize main.az',
            '         azc --version',
            '',
            'Command:',
            '    exec           Execute the compiled bytecode',
            '    compile        Compile the source file to bytecodes and execute it later',
            '',
            'Option:',
            '    v, version     Show the current version',
            '    h, help        Show this message',
            '    o, optimize    Optimize the speed',
            '',
            'File:',
            '    *.az           Anzen source code',
            '    *.azc          Anzen compiled bytecode'
        ];
        return console.log(help.join('\n'));
    }
}
