import args, { OptionDefinition } from 'command-line-args';

export function parse() {
    const opt: Array<OptionDefinition> = [
        {
            name: 'help', alias: 'h', type: Boolean,
        },
        {
            name: 'version', alias: 'v', type: Boolean
        }
    ];

    return args(opt);
}