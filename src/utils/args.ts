import args, { OptionDefinition } from 'command-line-args';

export function parse() {
    const opt: Array<OptionDefinition> = [{
        name: 'help', alias: 'h', type: Boolean
    }];

    return args(opt);
}