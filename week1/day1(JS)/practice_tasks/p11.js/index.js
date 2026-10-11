// sumDigits(n). 4821 → 15.


function sumDigits(n) {
    let sum = 0;

    while (n > 0) {
        let digit = n % 10;
        sum = sum + digit;
        n = (n - digit) / 10;
    }

    return sum;
}

console.log(sumDigits(4821)); // 15