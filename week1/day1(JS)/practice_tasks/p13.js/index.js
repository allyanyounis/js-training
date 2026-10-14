// fibonacci(n). fibonacci(10) → 55.
function fibonacci(n) {
    if (n <= 1) {
        return n;
    }

    let a = 0;
    let b = 1;

    for (let i = 2; i <= n; i++) {
        let next = a + b;
        a = b;
        b = next;
    }

    return b;
}

console.log(fibonacci(10)); // 55