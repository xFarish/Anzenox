import { anzenRead } from './read.js';
import { error } from '../utils/error.js';

export async function execute(path: string): Promise<void | never> {
    try {
        const buf = await anzenRead(path);

        const wasmModule = new WebAssembly.Module(buf);
        const wasmInstance = new WebAssembly.Instance(wasmModule);
        const main = wasmInstance.exports['main'] as CallableFunction;

        console.log(main().toString());
    } catch (e) {
        error('ERR', 'There was an error while executing the bytecodes');
        error((e as Error).name, (e as Error).message);
        return process.exit();
    }
}