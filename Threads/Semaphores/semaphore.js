const {Semaphore} = require('async-mutex');

const semaphore = new Semaphore(2);

async function accessResource(threadName) {
    const [value, release] = await semaphore.acquire();
console.log(`${threadName} acquired the semaphore`);

await new Promise(resolve => setTimeout(resolve,1000));
console.log(`${threadName} releasing the semaphore`);
release();
}

async function main() {
    accessResource('Thread 1');
    accessResource('Thread 2');
    accessResource('Thread 3');
}

main();