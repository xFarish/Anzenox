import args from 'command-line-args';
export function parse() {
    const opt = [{
            name: 'help', alias: 'h', type: Boolean
        }];
    return args(opt);
}
