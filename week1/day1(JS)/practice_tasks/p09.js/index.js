// isPalindrome(s) ignoring case and spaces. "Never odd or even" → true.
function isPalindrome(s) {
    let left = 0;
    let right = s.length-1;

    while (left < right) {
        if (s[left] === " ") {
            left++;
            continue;
        }

        if (s[right] === " ") {
            right--;
            continue;
        }

        if (s[left].toLowerCase() !== s[right].toLowerCase()) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}

console.log(isPalindrome("how are you")); // false
console.log(isPalindrome("Never odd or even")); // true