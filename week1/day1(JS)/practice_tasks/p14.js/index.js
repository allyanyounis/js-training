// capitalizeWords(s). "learn javascript today" → "Learn Javascript Today".
function capitalizeWords(s) {
    let result = "";
    let capitalizeNext = true;

    for (let i = 0; i < s.length; i++) {
        let ch = s[i];

        if (ch === " ") {
            result += ch;
            capitalizeNext = true;
        } else {
            if (capitalizeNext) {
                result += ch.toUpperCase();
                capitalizeNext = false;
            } else {
                result += ch;
            }
        }
    }

    return result;
}

console.log(capitalizeWords("learn javascript today"));
// Learn Javascript Today