Variable scope, closure; The old "var"; Function object, NFE; Object methods, "this"; Function binding; Arrow functions revisited; Modules, introduction; Export and Import.



Variable scope

In JavaScript, we mainly have:
1. Global Scope
2. Function Scope
3. Block Scope

CLOSURE:
Closure is an inner function that has access to the outer function's variables even after the outer function has finished executing.

4. Function Object in JavaScript
First understand this:
In JavaScript, functions are also objects.

This means a function can:
- have properties
- store data
- be assigned to variables
- be passed as values



Simple function:
function work(){
}
Name comes first.
NFE: Name function expression
const job = function doWork(){
}
Variable comes first, function has its own name.


What is an Object Method?
An object method is a function stored inside an object.

Example:
const person = {
    name: "Meow",
    age: 2,
    speak: function(){
        console.log("I am speaking!");
    }
}

THIS :
this refers to the object that calls the function.

