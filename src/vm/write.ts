import { promises, existsSync } from 'fs';
import { error } from '../utils/log.js';

export async function anzenWrite(path: string, buf: Buffer | Uint8Array): Promise<void | never> {
    try {
        if (!path.toString().endsWith('.anc')) {
            error('ERR', 'The file must ends with \'.anc\'.');
            return process.exit(1);
        }

        else if (!existsSync(path)) {
            error('ERR', 'The path specified is ERR.');
            return process.exit(1);
        }
    
        else if ((await promises.stat(path)).isDirectory()) {
            error('ERR', 'The path given is a directory. Expected a file.');
            return process.exit(1);
        }

        else {
            const file = await promises.open(path, 'w');
            await promises.write(file, buf, 0);
        }
    } catch (e) {
        error('ERR', 'There was an error while writing the file.');
        error((e as Error).name, (e as Error).message);
        return process.exit(1);
    }
}