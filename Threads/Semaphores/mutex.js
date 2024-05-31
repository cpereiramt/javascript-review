const { Mutex } = require('async-mutex');
const mutex = new Mutex();

async function accessResource(threadName) {
    const release = await mutex.acquire();
    console.log(`${threadName} acquired the lock`);

    // Simula o acesso ao recurso
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log(`${threadName} releasing the lock`);
    release();
}

async function main() {
    accessResource('Thread 1');
    accessResource('Thread 2');
    accessResource('Thread 3');
}

main();