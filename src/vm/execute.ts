import { anzenRead } from './read.js';
import { error } from '../utils/log.js';

export async function execute(path: string): Promise<void | never> {
    try {
        if (!path.endsWith('.anc')) {
            error('ERR', 'Unable to execute source file');
            return process.exit(1);
        }

        const buf = await anzenRead(path) as Buffer;

        const wasmModule = new WebAssembly.Module(buf);
        const wasmInstance = new WebAssembly.Instance(wasmModule, {});

        const main = wasmInstance.exports['main'] as () => void;

        return main();
    } catch (e) {
        error('ERR', 'There was an error while executing the bytecodes');
        error((e as Error).name, (e as Error).message);
        return process.exit();
    }
}