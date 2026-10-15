
For today's **React fundamentals (JSX, Components, Props, Lists, Rendering)** before building the product catalog, these are the important terms/concepts you should understand:

### Terms we will cover one by one:

For today's **React fundamentals (JSX, Components, Props, Lists, Rendering)** before building the product catalog, these are the important terms/concepts you should understand:

### Terms we will cover one by one:

1. **React Component**
2. **Functional Component**
3. **JSX (JavaScript XML)**
4. **Component Naming Rules (Why Capital Letters?)**
5. **Props**
6. **Children Prop**
7. **Component Composition**
8. **State (basic introduction)**
9. **Hooks (what and why)**
10. **useState Hook**
11. **Re-rendering in React**
12. **Virtual DOM**
13. **Conditional Rendering**
14. **Rendering Lists**
15. **Keys in Lists**
16. **Pure Components / Keeping Components Pure**
17. **Component File Structure**
18. **Import and Export Components**
19. **Data Flow in React (Parent → Child)**
20. **Mapping Data into UI**
21. **Event Handling (click, change, etc.)**
22. **Children vs Props difference**
23. **Reusable Components**
24. **Product Catalog Architecture**
   - Header component
   - ProductGrid component
   - ProductCard component
   - Price component
   - Badge component
   - Rating component
   - Footer component

1. **React Component**
What is a Component?
A component is a small, reusable piece of UI (user interface) in React.
Think of a website like a LEGO building:
- Each LEGO block = a component
- Many components combine to make a complete website

2. **Functional Component**

- Normal function returns data
- React component function returns UI

A functional component is a JavaScript function that returns JSX (UI).
In simple words:
Function + JSX = React Component
Example:
function Header() {
  return (
    <h1>My Store</h1>
  );
}

Why is it called "Functional"?
Because it is created using a normal JavaScript function.
Normal JavaScript function:
function addNumbers() {
  return 5 + 5;
}

console.log(addNumbers());

Output:
10

React functional component:
function Header() {
  return <h1>My Store</h1>;
}

Output:
My Store

The only difference is:
- Normal function returns data
- React component function returns UI
3. **JSX (JavaScript XML)**

JSX stands for JavaScript XML ( eXtensible markup language).

Key Details

• Definition: It is a syntax extension for JavaScript that lets you write HTML-like markup directly inside your JavaScript or TypeScript code.



Before JSX (or without JSX), developers had to create UI using JavaScript DOM methods, which required more code.
Example: You want to create this UI:
<h1>My Store</h1>
<p>Welcome to our shop</p>

Without JSX (pure JavaScript)
You would write:
const heading = document.createElement("h1");
heading.textContent = "My Store";

const paragraph = document.createElement("p");
paragraph.textContent = "Welcome to our shop";

document.body.appendChild(heading);
document.body.appendChild(paragraph);

Many lines just to create simple UI.
With JSX (React)
You simply write:
function Home() {
  return (
    <>
      <h1>My Store</h1>
      <p>Welcome to our shop</p>
    </>
  );
}

Much cleaner and easier to understand.
But one correction:
JSX did not replace writing HTML files exactly.
In traditional websites:
HTML → Structure
CSS → Styling
JavaScript → Behavior

In React:
JSX → Structure (HTML-like)
CSS → Styling
JavaScript → Logic + Behavior

Everything is combined into components.


4. **Component Naming Rules (Why Capital Letters?)**

Why?
Because React uses the first letter to understand:
- Capital letter → This is a React component
- Lowercase letter → This is a normal HTML element

Correct:
function ProductCard() {
  return <h2>Product</h2>;
}

Using it:
<ProductCard />

Wrong:
function productCard() {
  return <h2>Product</h2>;
}

Using it:
<productCard />

5. **Props**
Props are data that we pass from one component to another component.
In simple words:
Props make components dynamic and reusable.
A component is like a template, and props are the information you give to that template.


Another example:
A student ID card template.
The university does not create a new ID card design for every student.
They create one template:
Name: ______
Roll No: ______
Department: ______

Then they fill different data:
Student 1:
Name: Ali
Roll No: 101
Department: CS

Student 2:
Name: Sara
Roll No: 102
Department: AI

The ID card design = Component
The student information = Props
Same idea in React:
Component = Template
Props = Changing information

6. **Children Prop**

Children Prop = Content inside a component having opening and closing tag
Imagine a component like a box.
Anything you put inside that box = children

Example:
<Card>
  <h1>Title</h1>
  <p>Some text</p>
</Card>

Here, "Title" and "text" are children.

Usage:
function Card(props) {
  return (
    <div className="card">
      {props.children}  {/* Shows whatever is inside */}
    </div>
  );
}

7. **Component Composition**

Component Composition = Building complex UIs by combining smaller components.
Think of it like building a house:

Foundation = Header
Walls = Product Cards
Roof = Footer


Example:
<App>
  <Header />
  <ProductGrid />
  <Footer />
</App>

This is composition.

8. **State (basic introduction)**

State is data that belongs to a component and can change over time.
Props = External data (passed from parent)
State = Internal data (managed by component itself)

Example:
- A shopping cart: items inside = state
- A counter: number shown = state
- A toggle switch: on/off = state



9. **Hooks (what and why)**

Hooks = Special functions that let functional components use React features like state and lifecycle.
Before hooks, we used Class Components.
Now we use Functional Components + Hooks (simpler and better).

Common Hooks:
- useState → For managing state
- useEffect → For side effects (API calls, etc.)
- useContext → For context/theme
5. Hooks
Hooks are special React functions that let functional components use React features like state, effects, refs, context, memoization, etc. React docs include hooks such as useState, useEffect, useContext, useRef, and others. (legacy.reactjs.org)
Hook

Use
**useState**
Manage changing data

**useEffect**
Run side effects after render

**useRef**
Store value/reference without re-render

**useContext**
Share data without prop drilling
Prop drilling (also known as "threading props" or "component chaining") is the process of passing data from a parent component down to deeply nested child components through multiple layers of intermediate components

**useMemo**
Cache calculated value

**useCallback**
Cache function

Easy line:
State is the value. Hook is the tool to manage React features.



10. **useState Hook**

useState is used to add state to functional components.
Syntax:
const [variable, setVariable] = useState(initialValue);

Example:
function Counter() {
  const [count, setCount] = useState(0);  // 0 is initial value
  
  function increment() {
    setCount(count + 1);  // Updates state
  }
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Add 1</button>
    </div>
  );
}

When setCount changes, React re-renders the component.

11. **Re-rendering in React**
Re-rendering means React runs a component again to create an updated UI when data changes.
means it notice state changes.

12. **Virtual DOM**

Virtual DOM is a lightweight copy of the real DOM that React keeps in memory to efficiently update the UI.
Simple words:
React does not directly change the real webpage every time.
It first creates a small copy, checks what changed, and then updates only that part.


13. **Conditional Rendering**
Conditional rendering is showing or hiding UI based on certain conditions.
In simple words:
Show something if condition is true, otherwise show something else.

Example:
function Welcome({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  } else {
    return <h1>Please log in.</h1>;
  }
}


14. **Rendering Lists** 
It is used to covert array into list items having keys and value by using map function.
Example:
function ProductList({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}

15. **Keys in Lists**
Keys are special strings that help React identify which items have changed, are added, or are removed in a list.
Every item in a list should have a unique key.

Correct:
{products.map(p => <li key={p.id}>{p.name}</li>)}

Why needed?
Without keys, React doesn't know which item moved or changed,
so it might update the wrong item or not update at all.


16. **Pure Components / Keeping Components Pure**

A pure component means a component that gives the same output when it receives the same input.
Simple words:
Same data → Same UI
The component should not secretly change things outside itself.
Real Life Example
Think of a calculator.
Input:
2 + 2

Every time you calculate:
Result = 4


17. **Component File Structure**
Components are organized into files, typically one file per component.

18. **Import and Export Components**
Components are imported and exported using ES6 import/export syntax.
Example:
import Header from './Header';  // Import
export default Header;    // Export

19. **Data Flow in React (Parent → Child)**
Real Life Example
Imagine a teacher and student.
Teacher gives information:
Teacher
   |
   ↓
Student

Student receives the information.
The student does not randomly take information back from the teacher.
React works similarly.
Data flows downwards from parent components to child components via props.

20. **Mapping Data into UI**
We use map() to convert arrays into lists of components.

21. **Event Handling (click, change, etc.)**
Event handlers are functions passed to JSX elements to handle user interactions.
22. **Children vs Props difference**
23. **Reusable Components**
