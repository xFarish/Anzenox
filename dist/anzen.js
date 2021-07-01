import { main } from './bundle.cjs';

process.on('unhandledRejection', (err) => {
    console.log(`[\x1b[31mError: ERR\x1b[0m]: ${err.message}`);
    process.exit(1);
});

main();