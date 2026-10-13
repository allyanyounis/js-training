// max3(a, b, c) returns the largest, without Math.max.


function max3(a, b, c) {
    if (a >= b && a >= c) {
        return a;
    } else if (b >= a && b >= c) {
        return b;
    } else {
        return c;
    }
}

console.log(max3(10, 5, 8));   // 10

