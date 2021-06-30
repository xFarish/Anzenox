export function parse(args: any, { "--": doubleDash, alias, boolean, default: defaults, stopEarly, string, unknown, }: {
    "--"?: boolean | undefined;
    alias?: {} | undefined;
    boolean?: boolean | undefined;
    default?: {} | undefined;
    stopEarly?: boolean | undefined;
    string?: any[] | undefined;
    unknown?: ((i: any) => any) | undefined;
}): {
    _: never[];
};
