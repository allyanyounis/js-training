// isPrime(n); test with 1, 2, 17, 21.

function isPrime(n) {
    if (n <= 1) {
        return false;
    }

    for (let i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}
console.log(isPrime(1));  // false
console.log(isPrime(2));  // true
console.log(isPrime(23));  // true
console.log(isPrime(17)); // true
console.log(isPrime(21)); // false