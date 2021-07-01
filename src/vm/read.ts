import { promises, existsSync } from 'fs';
import { error } from '../utils/log.js';

export async function anzenRead(path: string): Promise<Buffer | string | never> {
    try {
        if (!path.endsWith('.anc') || !path.endsWith('.an')) {
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