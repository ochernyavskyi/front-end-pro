const store = new Map();

function* fib  (value) {
    if (store.has(value)) {
        return store.get(value);
    }
    let result = 0;
    for (let i = 1; i <= value; i++) {
        result += i;
        yield store.set(i, result);
    }
    store.set(value, result);
    return result;

}

let a = fib(3);
console.log (a.next());
console.log (a.next());
console.log (a.next());
console.log (a.next());
