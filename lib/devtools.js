export function delay(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {
    }
}

export function simulateApiCall(data, delay = 1000) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}