import { anzenRead } from './read.js';
import { error } from '../utils/error.js';
export async function execute(path) {
    try {
        const buf = await anzenRead(path);
        const wasmModule = new WebAssembly.Module(buf);
        const wasmInstance = new WebAssembly.Instance(wasmModule);
        const main = wasmInstance.exports['main'];
        console.log(main().toString());
    }
    catch (e) {
        error('ERR', 'There was an error while executing the bytecodes');
        error(e.name, e.message);
        return process.exit();
    }
}
