// countVowels(s). "Lahore Pakistan" → 6.

function countVowels(s) {
    let count = 0;

    for (let i = 0; i < s.length; i++) {
        let ch = s[i].toLowerCase();

        if (
            ch === "a" ||
            ch === "e" ||
            ch === "i" ||
            ch === "o" ||
            ch === "u"
        ) {
            count++;
        }
    }

    return count;
}

console.log(countVowels("Lahore Pakistan")); // 6