import { readFileSync } from 'fs';
import { parse } from './utils/args.js';

export async function main() {
    const { name, version } = JSON.parse(readFileSync('./package.json', 'utf8'));
    const cli = parse();

    if ((cli as any).help || !Object.keys(cli).length) {
        const help = [
            `${name}@${version}`,
            'Syntax:  azc [option] [--exac | --compile] [file]',
            'Example: azc --exec main.azc',
            '         azc --optimize --compile main.az',
            '         azc --version',
            '',
            'Option:',
            '    v, version     Show the current version',
            '    h, help        Show this message',
            '    o, optimize    Optimize the speed',
            '    e, exec        Execute the compiled bytecode',
            '    c, compile     Compile the given file to bytecode',
            '                   to be executed later.',
            '                   Use the \'--exec\' flag to execute',
            '',
            'File:',
            '    *.az           Anzen source code',
            '    *.azc          Anzen compiled bytecode'
        ];

        return console.log(help.join('\n'));
    }

    else if ((cli as any).version) {
        return console.log(`Version: ${version}`);
    }
}