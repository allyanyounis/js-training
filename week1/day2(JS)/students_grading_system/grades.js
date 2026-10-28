// Build: student grades report (grades.js). Create 10 students as { name, class: "A" or "B", scores: [math, science, english] }. Print with console.table:
// ☐ Each student's average (1 decimal) and letter grade (reuse Sunday's grade).
// ☐ The top 3 students.
// ☐ The average for each class.
// ☐ How many students got each grade.
// ☐ The student with the biggest gap between best and worst subject.
// ☐ No loops; every function under 10 lines.

// Sunday's grade function (reuse this)
const getGrade = (average) => {
    if (average >= 90) return "A";
    if (average >= 80) return "B";
    if (average >= 70) return "C";
    if (average >= 60) return "D";
    return "F";
};


// Students data // array of object , each object contains 
// 3 properties name, class, scores(array)
const students = [
    { name: "Ali", class: "A", scores: [85, 90, 80] },
    { name: "Sara", class: "B", scores: [95, 88, 92] },
    { name: "Ahmed", class: "A", scores: [70, 75, 80] },
    { name: "Ayesha", class: "B", scores: [60, 65, 70] },
    { name: "Usman", class: "A", scores: [90, 85, 95] },
    { name: "Hina", class: "B", scores: [78, 82, 80] },
    { name: "Bilal", class: "A", scores: [55, 60, 65] },
    { name: "Zara", class: "B", scores: [88, 90, 85] },
    { name: "Hamza", class: "A", scores: [72, 68, 75] },
    { name: "Noor", class: "B", scores: [92, 94, 90] }
];


// Calculate average and grade
const studentReport = students.map((student) => {
    const total = student.scores.reduce((sum, score) => sum + score, 0);
    const average = Number((total / student.scores.length).toFixed(1));  // means keep 1 digit after decimal. "85.0"

    return {
        name: student.name,
        class: student.class,
        average: average,
        grade: getGrade(average)
    };
});


// Print result
console.table(studentReport);


// Find top 3 students
const topStudents = studentReport
    .sort((a, b) => b.average - a.average)
    .slice(0, 3);


// Print top 3
console.table(topStudents);


// The average for each class.
const classAverage = (className) => {
    const classStudents = studentReport.filter(
        (student) => student.class === className
    );

    const total = classStudents.reduce(
        (sum, student) => sum + student.average, 
        0
    );

    return Number((total / classStudents.length).toFixed(1));
};


const classReport = [
    {
        class: "A",
        average: classAverage("A")
    },
    {
        class: "B",
        average: classAverage("B")
    }
];

console.table(classReport);


// How many students got each grade.
 const gradeCount = studentReport.reduce((count, student) => {
    count[student.grade] = (count[student.grade] || 0) + 1;
    return count;
}, {});


console.table(
    Object.entries(gradeCount).map(([grade, students]) => ({
        grade,
        students
    }))
);

// The student with the biggest gap between best and worst subject.

const biggestGap = students.map((student) => {

    const best = student.scores.reduce((max, score) => {
        return score > max ? score : max;
    }, student.scores[0]);

    const worst = student.scores.reduce((min, score) => {
        return score < min ? score : min;
    }, student.scores[0]);

    return {
        name: student.name,
        gap: best - worst
    };

}).sort((a, b) => b.gap - a.gap)[0];


console.table([biggestGap]);