import { promises, existsSync } from 'fs';
import { error } from '../utils/error.js';

export async function anzenRead(path: string): Promise<Buffer | string | never> {
    try {
        if (!path.endsWith('.anc') || !path.endsWith('.an')) {
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
            if (path.toString().endsWith('.anc')) {
                return await promises.readFile(path);
            } else if (path.toString().endsWith('.an')) {
                return await promises.readFile(path, 'utf8');
            } else {
                error('ERR', 'An unknown error occured');
                return process.exit(1);
            }
        }
    } catch (e) {
        error('ERR', 'There was an error while reading the file.');
        error((e as Error).name, (e as Error).message);
        return process.exit(1);
    }
}