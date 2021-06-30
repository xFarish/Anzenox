import { promises, existsSync } from 'fs';
import { error } from '../utils/error.js';
export async function anzenRead(path) {
    try {
        if (!path.toString().endsWith('.anc')) {
            error('INVALID', 'The file must ends with \'.anc\'.');
            return process.exit(1);
        }
        else if (!existsSync(path)) {
            error('INVALID', 'The path specified is invalid.');
            return process.exit(1);
        }
        else if ((await promises.stat(path)).isDirectory()) {
            error('INVALID', 'The path given is a directory. Expected a file.');
            return process.exit(1);
        }
        else {
            return await promises.readFile(path);
        }
    }
    catch (e) {
        error('ERR', 'There was an error while reading the file.');
        error(e.name, e.message);
        return process.exit();
    }
}
