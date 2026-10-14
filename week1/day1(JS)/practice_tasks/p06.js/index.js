// Print FizzBuzz from 1 to 100.

// The Rules:
// You count numbers from 1 to 100, following these 4 rules:

// If the number is divisible by 3, say "Fizz" instead of the number.
// If the number is divisible by 5, say "Buzz" instead of the number.
// If the number is divisible by both 3 and 5 (like 15, 30, 45), say "FizzBuzz".
// Otherwise, just say the normal number.


for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
    } else if (i % 3 === 0) {
        console.log("Fizz");
    } else if (i % 5 === 0) {
        console.log("Buzz");
    } else {
        console.log(i);
    }
}