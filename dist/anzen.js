import { main } from './bundle.cjs';

process.on('unhandledRejection', (err) => {
    console.log(`[\x1b[31mError\x1b[0m]: ERR: ${err.message}`);
    process.exit(1);
});

main();