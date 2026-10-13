// reverseString(s) without .reverse(). "hello" → "olleh".

function reverseString(s) {
    let length = 0;

    // find string length manually
    for (let char of s) {
        length++;
    }

    let reversed = "";

    // reverse manually
    for (let i = length - 1; i >= 0; i--) {
        reversed += s[i];
    }

    return reversed;
}

console.log(reverseString("aramis")); // "simara"