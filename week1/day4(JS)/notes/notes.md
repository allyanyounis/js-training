1) Browser environment
inclued all things, window page , dev tools , node js is server environment

2) WINDOW means all things including tab data and all the things.

3) Specs (Specifications)
Basic idea:
Specs are official rules and documents that define how web technologies should work.
Simple words:
Specs are like a rule book that tells browsers: "If JavaScript uses this feature, it should behave like this."

Real-life example:
Imagine traffic rules.
A traffic rule says:
- Red light = stop
- Green light = go
- Speed limit = 60 km/h
Every driver follows the same rules.
Similarly:
Web specs are traffic rules for browsers.
They tell:
- How HTML should work
- How CSS should work
- How JavaScript features should behave
Why do we need specs?
Different browsers exist:
- Chrome
- Firefox
- Safari
- Edge
Without common rules:
Chrome might understand JavaScript differently from Firefox.
Specs make sure:
Same JavaScript code
        ↓
Chrome
Firefox
Safari
        ↓
Same expected behavior

4) DOM : when web page is loaded, then browser creates DOM , so that JS can find, read and change HTML contents.

Tree of DOM template:

Document
│
└── html (Root Element)
    │
    ├── head
    │   │
    │   ├── title
    │   │
    │   ├── meta
    │   │
    │   └── link (CSS files)
    │
    └── body
        │
        ├── header
        │   │
        │   ├── h1
        │   └── nav
        │
        ├── main
        │   │
        │   ├── section
        │   │   │
        │   │   ├── h2
        │   │   └── p
        │   │
        │   └── div
        │       │
        │       ├── img
        │       └── button
        │
        └── footer
            │
            └── p


5)  getElement* and querySelector* are DOM methods used by JavaScript to find HTML elements inside the DOM tree.

we use css selector direcrtly in query selector.Example : #idname, .classname, tagname.

| Method                             | Finds                          |

| getElementById()                   | One element by id              |
| getElementsByClassName()           | Multiple elements by class     |
| getElementsByTagName()             | Multiple elements by tag       |
| querySelector()                    | First matching CSS selector    |
| querySelectorAll()                 | All matching CSS selectors     |

Example :

Yes, you can think of it as a shorter and more flexible way of doing the same job, but it is not exactly an "overwrite" of getElement.
A better way to say:
querySelector() is a modern, flexible alternative to many getElement* methods because it uses CSS selectors to find elements.

Example:
Using getElementById()
HTML:
<h1 id="title">Hello</h1>

JavaScript:
const heading = document.getElementById("title");

Same thing using querySelector():
const heading = document.querySelector("#title");

Here:
- #title means ID selector
- It finds the same element

6) 
1. Event Bubbling
Meaning:
The event starts from the element that was clicked and moves upward to its parents.
Direction:
button
  ↓
div
  ↓
body
  ↓
document

The child gets the event first.

2. Event Capturing
Meaning:
The event starts from the top parent and travels down to the element that was clicked.
Direction:
document
   ↓
body
   ↓
div
   ↓
button

The parent receives the event first.

3)  Event Delegation
Basic idea:
Event delegation means adding one event listener to a parent element instead of adding separate event listeners to every child element.
Simple words:
"Let the parent handle events for all its children."

It works because of event bubbling.
Real-life example:
Imagine a classroom.
There are 30 students.
Teacher wants to know when a student stands up.
Without event delegation:
Teacher gives every student a separate rule:
Ali → tell me when you stand
Ahmed → tell me when you stand
Sara → tell me when you stand
...
(30 rules)

Too much work.
With event delegation:
Teacher gives one rule to the class:
"Anyone who stands up, I will know."

Only one listener is needed.
Classroom (Parent)
      |
      ├── Student 1
      ├── Student 2
      └── Student 3

The classroom handles all student actions.

think about this:
Without Event Delegation
You have 100 buttons:
<button>Delete 1</button>
<button>Delete 2</button>
<button>Delete 3</button>
...

Without delegation:
button1.addEventListener("click", deleteTask);
button2.addEventListener("click", deleteTask);
button3.addEventListener("click", deleteTask);

You create 100 listeners.
With Event Delegation
You give the parent one listener:
list.addEventListener("click", (event) => {
    deleteTask(event.target);
});




7) Rendering :
A user sitting in front of the browser cannot see variables in computer memory.

Rendering is the bridge:

text
  Raw Data in JavaScript Array
            │
            ▼  (Rendering Process)
  Creates HTML elements: <li>, <input>, <span>
            │
            ▼
  Browser paints pixels on your screen!