const store = new Map();

const fib = (value) => {
    if (store.has(value)) {
        return store.get(value);
    }
    let result = 0;
    for (let i = 1; i <= value; i++) {
        result += i;
        store.set(i, result);
    }
    store.set(value, result);
    return result;

}