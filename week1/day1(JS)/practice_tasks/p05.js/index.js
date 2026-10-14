// grade(score) returns A (90+), B (80–89), C (70–79), D (60–69) or F; "Invalid" outside 0–100.

function grade(score) {
    if (score < 0 || score > 100) {
        return "Invalid";
    } else if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else if (score >= 60) {
        return "D";
    } else {
        return "F";
    }
}

console.log(grade(95));   // A
console.log(grade(83));   // B
console.log(grade(72));   // C
console.log(grade(65));   // D
console.log(grade(45));   // F

console.log(grade(-10));  // Invalid